import {getSettingsAsync} from '../../settings/settings.js'
// import 'babel-polyfill'

// the script can deal with DOM
(async function () {
  let cfg = await getSettingsAsync()
  
  if (cfg.cfg_checkReply === false) return

  // find the replies, and append "check" button
  let lis = [].slice.call(document.querySelectorAll('#Main > div:nth-child(2) > .cell[id]'))

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
})()