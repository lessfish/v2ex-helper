// the script can deal with DOM
(function () {
  // auto jump
  let floor = ~~(location.hash.replace(/#reply/, ''))
  let lis = [].slice.call(document.querySelectorAll('#Main > div:nth-child(4) > .cell[id]'))
  
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
    setTimeout(() => {
      lis[floor - 1].scrollIntoView()
      lis[floor - 1].style.background = "#FFF9EB"
    }, 0)
  }
})()