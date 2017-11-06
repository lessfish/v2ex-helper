import 'pure-css-loader/dist/css-loader.css'
import './sass/checkConversation.scss'
import 'tingle.js/dist/tingle.min.css'
import tingle from 'tingle.js'
import {getSettingsAsync} from '../../settings/settings.js'
// import 'babel-polyfill'

(async function() {
  let cfg = await getSettingsAsync()

  if (!cfg.cfg_checkConversation) return

  let replies = [].slice.call(document.querySelectorAll("div[id^='r_']"))

  replies.forEach((item, index) => {
    let floorOwner = item.querySelector('strong a').innerHTML // 层主
    let replyContent = item.querySelector('.reply_content').innerHTML
    const pattern = /@<a href="\/member\/.+?">(.+?)<\/a>/g
    let matches = replyContent.match(pattern)

    // 只有一个 @ 时，才显示 「对话详情」
    if (!matches || matches.length !== 1) return

    // add checkConversation Btn
    item
      .querySelector('.reply_content')
      .previousElementSibling
      .insertAdjacentHTML('beforebegin',
        `<a href="javascript:;" id="checkConversationBtn">
        <i class="fa fa-comments" aria-hidden="true"></i>对话详情</a>`)

    // 层主回复的用户
    let replyUser = pattern.exec(replyContent)[1] 

    item.querySelector('#checkConversationBtn').addEventListener('click', () => {
      // loading 
      document.body.insertAdjacentHTML('beforeend', '<div class="loader loader-default is-active"></div>')

      chrome.runtime.sendMessage({
        method: 'checkConversationBtn',
        floorOwner: floorOwner,
        replyUser: replyUser,
        topicId: /\/t\/(\d+)/.exec(location.href)[1]
      }, function(response) { // result array
        let html = ''
        response.conversations.forEach(item => {
          html += `
            <div class="cell">
              <div class="left">
                <a href="//www.v2ex.com/member/${item.from}">
                  <img src="${item.avatarsUrl}" width=48 height=48 />
                </a>
              </div>
              <div class="right">
                <div class="author">
                  <strong><a href="//www.v2ex.com/member/${item.from}">${item.from}</a></strong>
                </div>
                <div class="replyContent">
                  ${item.replyContent}
                </div>
              </div>
            </div>
          `
        })

        // remove loading
        let loader = document.querySelector('body .loader')
        loader.parentNode.removeChild(loader)

        // show conversation modal 
        var modal = new tingle.modal({
          closeMethods: ['overlay', 'button', 'escape']
        })
        
        // set content
        modal.setContent(html)

        // open modal
        modal.open()
      })
    }, false)
  })
})()