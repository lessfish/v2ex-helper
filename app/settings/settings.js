const options = [
  '回复通知增强',
  '主题贴图片点击放大',
  '主题贴发图',
  '对话详情',
  '自动签到',
  '新消息提醒（弹窗模式）',
  '新消息提醒（图标提醒）',
]

let keys = [
  'checkReply',
  'zoom',
  'uploadImg',
  'checkConversation',
  'signin',
  'notificationsPopup',
  'notificationsIconShowNum',
]

const prefix = 'cfg_'

keys = keys.map(item => prefix + item)

// get settings 
function getSettingsAsync() {
  return new Promise(resolve => {
    chrome.storage.sync.get(keys, function(cfg) {
      keys.forEach(item => {
        cfg[item] = cfg[item] === undefined || cfg[item] ? true : false
      })

      resolve(cfg)
    })
  }) 
}

export {
  options, keys, getSettingsAsync
}