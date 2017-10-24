// add img when creating a new topic
(function () {
  let uploadBtn = document.createElement('input')
  uploadBtn.type = 'file'
  uploadBtn.id = 'uploadImgBtn'

  // append file upload btn
  document
    .querySelector('#content_remaining')
    .parentNode
    .appendChild(uploadBtn)

  // add trigger btn
  $('#uploadImgBtn').before('<i class="fa fa-file-image-o" aria-hidden="true" id="upload-trigger-btn"> 上传图片</i>')

  $('#upload-trigger-btn').on('click', () => {
    $('#uploadImgBtn').trigger('click')
  })

  // add listener
  document.querySelector('#uploadImgBtn').addEventListener('change', function() {
    if (!this.files[0].type.includes('image')) {
      alert('请上传正确的图片格式文件 😄')
      return
    }

    if (this.files.length === 0) return 

    // change trigger btn status
    $('#upload-trigger-btn').addClass('not-allow')
    $('#upload-trigger-btn').html(' 图片上传中...')

    let reader = new FileReader()

    reader.onload = function() {
      let res = reader.result
      let dataURL = res.split(',')[1]

      chrome.runtime.sendMessage({
        method: 'uploadImgInTopic',
        dataURL: dataURL
      }, function(response) {
        if (response.status === 1) {
          alert('请先登录微博 😄')
          window.open("https://weibo.com/")
          location.reload()
          return
        }

        // change trigger btn status
        $('#upload-trigger-btn').removeClass('not-allow')
        $('#upload-trigger-btn').html(' 上传图片')

        // 需要获取页面的全局变量 editor
        // content_scripts 无法获取页面的全局变量 editor，改用 injected_scripts
        var script = document.createElement('script')
        script.innerHTML = `
          var originVal = editor.getValue()
          editor.setValue(
            \`\$\{originVal\}![](${response.imgUrl})

\`
          )
        `
        document.body.appendChild(script)
        document.body.removeChild(script)
      })
    }

    reader.readAsDataURL(this.files[0])
  })
})()