// 一直运行在后台的 js，不能操作 DOM
// 有跨域权限，content_scripts 没有跨域权限
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case 'uploadImgInTopic':
      uploadImgInTopic(message, sendResponse)
      // 异步，直到执行 sendResponse() 方法
      return true
      break
    case 'checkConversationBtn':
      checkConversationBtn(message, sendResponse)
      return true 
      break
  }
})

// 对话详情
function checkConversationBtn(message, sendResponse) {
  let {floorOwner, replyUser, topicId} = message
  let conversations = [] // 对话详情数据，sendResponse() 返回的数据
  // 去除缓存影响，但是 api 一小时只能调用 120 次
  let api = 'https://www.v2ex.com/api/replies/show.json?topic_id=' + topicId + '&rdm=' + (+new Date) 
  
  fetch(api)
    .then(res => res.json())
    .then(results => {
      const pattern = /@<a target="_blank" href="\/member\/.+?">(.+?)<\/a>/g // 获取层主回复用户名

      // 遍历回复数据
      results.forEach(res => {
        let replyContent = res.content_rendered // 该楼层回复内容
        let matches = replyContent.match(pattern) // replyContent 中有几个 @
        let _floorOwner = res.member.username // 层主
        let avatarsUrl = res.member.avatar_normal // 层主头像

        // replyContent 中有 >=1 个 @ 时
        if (matches && matches.length >= 1) {
          let _replyUser = [] // 层主回复的用户数组
          let matching;
          
          // 遍历，找到 @ 的用户，即层主回复的用户 
          do {
            matching = pattern.exec(replyContent);
            if (matching) {
              _replyUser.push(matching[1])
            }
          } while (matching !== null)

          if ((_floorOwner === floorOwner && _replyUser.includes(replyUser)) ||
              (_floorOwner === replyUser && _replyUser.includes(floorOwner))) {
            conversations.push({from: _floorOwner, replyContent, avatarsUrl})
          } 
        }

        // 单纯的回复楼层（回复中没有 @）
        if (!matches) {
          if (( _floorOwner === floorOwner) ||
              (_floorOwner === replyUser)) {
            conversations.push({from: _floorOwner, replyContent, avatarsUrl})
          }
        }
      })

      sendResponse({conversations: conversations})
    })
}

// 主题贴添加图片
function uploadImgInTopic(message, sendResponse) {
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