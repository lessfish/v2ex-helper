// 一直运行在后台的 js，不能操作 DOM
// 有跨域权限，content_scripts 没有跨域权限
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case 'uploadImgInTopic':
      uploadImgInTopic(message, sender, sendResponse)
      // 异步，直到执行 sendResponse() 方法
      return true
      break
    case 'checkConversationBtn':
      checkConversationBtn(message, sender, sendResponse)
      return true 
      break
  }
})

// 对话详情
function checkConversationBtn(message, sender, sendResponse) {
  let {floorOwner, replyUser, url, replyNum} = message
  let conversations = [] // 对话详情数据，返回的数据
  let fetches = [] // 页面抓取
  let fetchAvatars = [] // 头像抓取
  const avatarsHash = {} // floorOwner & replyUser 头像链接的哈希 
  let pageNum = Math.ceil(replyNum / 100)

  for (let i = 1; i <= pageNum; i++) {
    fetches.push(fetch(url + '?p=' + i).then(res => res.text()))
  }

  // get floorOwner and replyUser's avatars
  fetchAvatars.push(fetch('https://www.v2ex.com/api/members/show.json?username=' + floorOwner).then(res => res.json()))
  fetchAvatars.push(fetch('https://www.v2ex.com/api/members/show.json?username=' + replyUser).then(res => res.json()))
  
  Promise.all(fetchAvatars)
    .then(results => {
      results.forEach(res => {
        avatarsHash[res.username] = res.avatar_normal
      })

      Promise.all(fetches)
        .then(results => {
          const p = /<div id="r_\d+?"[\d\D]+?<\/table>[\d\D]+?<\/div>/g // 获取整个楼层
          const pattern0 = /<div class="reply_content">([\d\D]+?)<\/div>/ // 获取回复内容
          const pattern1 = /@<a href="\/member\/.+?">(.+?)<\/a>/g // 获取层主回复用户名
          const pattern2 = /<strong><a[\d\D]+?>([\d\D]+)<\/a><\/strong>/ // 获取层主名

          results.forEach(res => {
            let cells = res.match(p)

            cells.forEach(item => {
              let replyContent = pattern0.exec(item)[1] // 该楼层回复的内容
              let matches = replyContent.match(pattern1) // replyContent 中有几个 @
              let _floorOwner = pattern2.exec(item)[1] // 层主

              // replyContent 中有 >=1 个 @ 时
              if (matches && matches.length >= 1) {
                let _replyUser = [] // 层主回复的用户数组
                let matching;
                
                // 遍历，找到 @ 的用户
                do {
                  matching = pattern1.exec(replyContent);
                  if (matching) {
                    _replyUser.push(matching[1])
                  }
                } while (matching !== null)

                if ((_floorOwner === floorOwner && _replyUser.includes(replyUser)) ||
                    (_floorOwner === replyUser && _replyUser.includes(floorOwner))) {
                  conversations.push({from: _floorOwner, replyContent, avatarsUrl: avatarsHash[_floorOwner]})
                } 
              }

              // 单纯的回复楼层（回复中没有 @）
              if (!matches) {
                if (( _floorOwner === floorOwner) ||
                    (_floorOwner === replyUser)) {
                  conversations.push({from: _floorOwner, replyContent, avatarsUrl: avatarsHash[_floorOwner]})
                }
              }
            })
          })

          sendResponse({conversations: conversations})
        })
    })
  
}

// 主题贴添加图片
function uploadImgInTopic(message, sender, sendResponse) {
  // 微博图床接口
  let api = 'http://picupload.service.weibo.com/interface/pic_upload.php?\
    mime=image%2Fjpeg&data=base64&url=0'

  let xhr = new XMLHttpRequest()
  let data = new FormData()

  // post 的数据，值为图片的 base64 编码
  // 需要去掉类似前缀 `data:image/jpeg;base64,`
  data.append('b64_data', message.dataURL)

  xhr.onerror = () => {} // todo

  xhr.onload = function () {
    try {
      const pattern = /"pid":"(.+)"/
      let data = xhr.responseText
      let imgUrlPrefix = 'https://ws2.sinaimg.cn/large/'
      let pid = data.match(pattern)[1]

      sendResponse({
        status: 0, // success
        imgUrl: imgUrlPrefix + pid
      })
    } catch(err) {
      sendResponse({
        status: 1 // unlogin
      })
    }
  }

  xhr.open('POST', api)
  xhr.send(data)
}