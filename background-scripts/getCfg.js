chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case 'getConfig':
      getConfig(sendResponse)
      return true
      break
  }
})

function getConfig(callback) {
  const keys = [
    'cfg_checkReply',
    'cfg_zoom',
    'cfg_uploadImg',
    'cfg_checkConversation',
    'cfg_signin',
    'cfg_notificationsPopup',
    'cfg_notificationsIconShowNum',
  ]

  chrome.storage.sync.get(keys, function(cfg) {
    keys.forEach(item => {
      cfg[item] = cfg[item] === undefined || cfg[item] ? true : false
    })

    callback(cfg)
  })
}