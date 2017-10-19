// 一直运行在后台的 js，不能操作 DOM
// 有跨域权限，content_scripts 没有跨域权限
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method === 'uploadImgInTopic') {
    // 微博图床接口
    let api = 'http://picupload.service.weibo.com/interface/pic_upload.php?\
              mime=image%2Fjpeg&data=base64&url=0'
    
    let xhr = new XMLHttpRequest()
    let data = new FormData()

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
    xhr.send(data);

    // 异步请求结束后，再执行 sendResponse()
    return true
  }
})