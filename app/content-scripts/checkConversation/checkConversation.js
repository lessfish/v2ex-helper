import 'pure-css-loader/dist/css-loader.css'
import 'jquery-modal/jquery.modal.min.css'
import './sass/checkConversation.scss'
import 'jquery-modal/jquery.modal.min.js'
import {getSettingsAsync} from '../../settings/settings.js'

(async function() {
  let cfg = await getSettingsAsync()

  if (!cfg.cfg_checkConversation) return

  // add conversation modal
  $('body').append('<form id="conversationModal" class="modal"></from>')

  let replies = $("div[id^='r_']")

  replies.each((index, item) => {
    let floorOwner = $(item).find('strong a').html() // 层主
    let replyContent = $(item).find('.reply_content').html()
    const pattern = /@<a href="\/member\/.+?">(.+?)<\/a>/g
    let matches = replyContent.match(pattern)

    // 只有一个 @ 时，才显示 「对话详情」
    if (!matches || matches.length !== 1) return

    // add checkConversation Btn
    $(item)
      .find('.reply_content')
      .prev()
      .before(`<a href="javascript:;" id="checkConversationBtn">
        <i class="fa fa-comments" aria-hidden="true"></i>对话详情</a>`)

    // 层主回复的用户
    let replyUser = pattern.exec(replyContent)[1] 

    $(item).find('#checkConversationBtn').on('click', () => {
      // loading 
      $('body').append('<div class="loader loader-default is-active"></div>')

      chrome.runtime.sendMessage({
        method: 'checkConversationBtn',
        floorOwner: floorOwner,
        replyUser: replyUser,
        topicId: /\/t\/(\d+)/.exec(location.href)[1]
      }, function(response) { // result array
        // console.log(response.conversations)

        let html = ''
        response.conversations.forEach(item => {
          html += `
            <div class="cell">
              <div class="left">
                <a href="https://www.v2ex.com/member/${item.from}">
                  <img src="${item.avatarsUrl}" width=48 height=48 />
                </a>
              </div>
              <div class="right">
                <div class="author">
                  <strong><a href="https://www.v2ex.com/member/${item.from}">${item.from}</a></strong>
                </div>
                <div class="replyContent">
                  ${item.replyContent}
                </div>
              </div>
            </div>
          `
        })

        $('#conversationModal').html(html)

        // remove loading
        $('body .loader').remove()

        // show conversation modal 
        $('#conversationModal').modal()
      })
    })
  })
})()