// 主题贴添加图片
export default function(message, sendResponse) {
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