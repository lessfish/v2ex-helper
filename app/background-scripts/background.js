import checkConversation from './checkConversation.js'
import uploadImgInTopic from './uploadImg.js'
import setNotifications from './setNotifications.js'
import {getSettingsAsync} from '../settings/settings.js'

// 一直运行在后台的 js，不能操作 DOM
// 有跨域权限，content_scripts 没有跨域权限
// events listener 
(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.method) {
      case 'uploadImgInTopic':
        uploadImgInTopic(message, sendResponse)
        // 异步，直到执行 sendResponse() 方法
        return true
        break

      case 'checkConversationBtn':
        checkConversation(message, sendResponse)
        return true 
        break
    }
  })
})()

// 消息提醒
(async function() {
  let cfg = await getSettingsAsync()
  setNotifications(cfg)
})()