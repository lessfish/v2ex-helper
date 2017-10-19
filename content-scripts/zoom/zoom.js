(function () {
  let lis = [].slice.call(document.querySelectorAll('.topic_content img'))
  lis.forEach(item => {
    item.dataset.action = "zoom"
  })
})()