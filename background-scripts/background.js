// 一直运行在后台的 js
// 不能操作 DOM
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // 麻痹，搞了一圈居然是因为 background.js 才有跨域权限，content_scripts 没有跨域权限
  // content_scripts 无法获取页面的全局变量 editor，改用 injected_scripts
  // 还是得好好梳理下这几个 js 的关系
  if (message.method === 'sendDataURL') {
    var api = 'http://picupload.service.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog'
    var data = {
      // 不需要 dataURL 的前缀
      b64_data: message.dataURL.replace(/.+base64,/, '')
    }

    $.ajax({
      url: api,
      async: false,
      method: "POST",
      data: data,
      dataType: "text",
      success: data => {
        let imgUrlStart = 'https://ws2.sinaimg.cn/large/'
        let imgUrlEnd = '.jpg'
        const pattern = /"pid":"(.+)"/;
        let pid = data.match(pattern)[1]

        sendResponse({
          imgUrl: imgUrlStart + pid + imgUrlEnd
        });
      }
    })

    // console.log(message.data)
    // var xhr = new XMLHttpRequest();
    // var data = new FormData();
    // data.append('b64_data', message.data);

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       var resText = xhr.responseText;
    //       var splitIndex,
    //       rs,
    //       pid;

    //       console.log(resText)
    //       console.log(xhr)
    //       // try {
    //       //   splitIndex = resText.indexOf('{"');
    //       //   rs = JSON.parse(resText.substring(splitIndex));
    //       //   pid = rs.data.pics.pic_1.pid;
    //       //   url=pid2url({
    //       //     pid: pid,
    //       //     ext: request.acceptType.toLowerCase() == 'image/gif' ? '.gif' : '.jpg'
    //       //   });
    //       //   //showMessage('图片上传成功',url);
    //       //   callback({data:url});	//回调函数
    //       //   return true;
    //       // } catch (e) {
    //       //   console.log(e);
    //       //   callback({data:null});	//上传失败
    //       //   return;
    //       // }
    //     } else {
    //       console.log(xhr);
    //       // callback({data:null});
    //     }
    //   }
    // };
    // xhr.open('POST', 'http://picupload.service.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog');
    // xhr.send(data);
  }
})