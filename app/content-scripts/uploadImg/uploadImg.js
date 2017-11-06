import './sass/uploadImg.scss'
import {getSettingsAsync} from '../../settings/settings.js'
// import 'babel-polyfill'

// Add img when creating a new topic
(async function () {
  let cfg = await getSettingsAsync()
  
  if (!cfg.cfg_uploadImg) return

  // append file upload btn and trigger btn
  document
    .getElementById('content_remaining')
    .parentNode
    .insertAdjacentHTML('beforeend',
      `
        <i class="fa fa-file-image-o" aria-hidden="true" id="uploadTriggerBtn"> 上传图片</i>
        <input type="file" id="uploadImgBtn" />
      `)

  const uploadTriggerBtn = document.getElementById('uploadTriggerBtn')
  const uploadImgBtn = document.getElementById('uploadImgBtn')

  uploadTriggerBtn.addEventListener('click', () => {
    // TODO use CustomEvent
    uploadImgBtn.click()
  })

  // add listener
  uploadImgBtn.addEventListener('change', function() {
    if (!this.files[0].type.includes('image')) {
      alert('请上传正确的图片格式文件 😄')
      return
    }

    if (this.files.length === 0) return 

    // change trigger btn status
    uploadTriggerBtn.classList.add('not-allow')
    uploadTriggerBtn.innerHTML = ' 图片上传中...'

    let reader = new FileReader()

    reader.onload = () => {
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
        uploadTriggerBtn.classList.remove('not-allow')
        uploadTriggerBtn.innerHTML = ' 上传图片'

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