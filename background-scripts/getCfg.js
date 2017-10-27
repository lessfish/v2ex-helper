chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case 'getConfig':
      getConfig(message, sender, sendResponse)
      return true
      break
  }
})

function getConfig(message, sender, sendResponse) {
  const keys = [
    'cfg_checkReply',
    'cfg_zoom',
    'cfg_uploadImg',
    'cfg_checkConversation',
    'cfg_signin'
  ]

  chrome.storage.sync.get(keys, function(cfg) {
    keys.forEach(item => {
      cfg[item] = cfg[item] === undefined || cfg[item] ? true : false
    })

    sendResponse(cfg)
  })
}