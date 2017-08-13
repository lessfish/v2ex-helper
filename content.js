// the script can deal with DOM
window.onload = function() {
  // find the replies, and append "see" button
  if (location.href.includes('notifications')) {
    let lis = [].slice.call(document.querySelectorAll('#Main > div:nth-child(2) > .cell'), 0)
    lis = lis.filter(item => item.id)

    lis.forEach(item => {
      let html = item.querySelector('table > tbody > tr > td:nth-child(2) > span.fade').innerHTML.trim()
      if (html.endsWith('回复了你') || html.endsWith('提到了你')) { // is a reply
        let nextNode = item.querySelector('table > tbody > tr > td:nth-child(2) > div.sep5')
        let parentNode = item.querySelector('table > tbody > tr > td:nth-child(2)')
        let addNode = document.createElement('a')
        addNode.style.marginLeft = '5px'
        addNode.className = 'node'
        addNode.innerHTML = '查看'
        
        let replyUrl = item.querySelector('table > tbody > tr > td:nth-child(2) > span.fade > a:nth-child(2)').href
        replyUrl = replyUrl.replace(/#reply[0-9]+/, '?isJump=1' + '$&')
        addNode.href = replyUrl

        parentNode.insertBefore(addNode, nextNode)
      }
    })
  }
  
  // scroll
  if (location.search.includes('isJump')) {
    let floor = ~~(location.hash.replace(/#reply/, ''))
    let lis = [].slice.call(document.querySelectorAll('#Main > div:nth-child(4) > .cell'), 0)
    lis = lis.filter(item => item.id)
    
    // if the floor is not in the current page, then go to the correct page
    let expPage = ~~(floor / 100) + 1 // expected page
    let curPage = ~~(lis[0].querySelector('table > tbody > tr > td:nth-child(3) > div.fr > span').innerHTML / 100) + 1

    if (curPage !== expPage) {
      let curUrl = location.href
      let newUrl = curUrl
        .replace(/isJump=1/, '$&' + '&p=' + expPage)

      location.href = newUrl
    } else {
      floor %= 100

      // jump to lis[floor - 1]
      let top = getElementTop(lis[floor - 1])
      window.scrollTo(0, top)
      lis[floor - 1].style.background = "#FFF9EB"
    }
  }

  function getElementTop(element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    return actualTop
  }
}