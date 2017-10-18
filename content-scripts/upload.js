// add img when creating a new topic
function addImgUploadBtn() {
  if (location.href.includes('new')) {
    let uploadBtn = document.createElement('input')
    uploadBtn.type = 'file'
    uploadBtn.id = 'uploadImgBtn'
    document
      .querySelector('#content_remaining')
      .parentNode
      .appendChild(uploadBtn)

    // add listener
    document.querySelector('#uploadImgBtn').addEventListener('change', function() {
      let reader = new FileReader();

      reader.onload = function() {
        let dataURL = reader.result;

        chrome.runtime.sendMessage({
          method: 'sendDataURL',
          dataURL: dataURL
        }, function(response) {
          // 需要获取页面的全局变量 editor
          setTimeout(function() {
            var script = document.createElement('script');
            script.innerHTML = `
              var originVal = editor.getValue()
              editor.setValue(
                \`\$\{originVal\}![](${response.imgUrl})

\`
              )
            `;
            document.head.appendChild(script);
            document.head.removeChild(script);
        }, 1000);
        });
      };
  
      reader.readAsDataURL(this.files[0]);
    })
  }
}