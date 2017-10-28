function afterGetCfg(cfg) {
  // add  browserAction listener
  chrome.browserAction.onClicked.addListener(() => {
    chrome.browserAction.getBadgeText({}, res => {
      if (cfg.cfg_notificationsIconShowNum && res !== '') {
        chrome.browserAction.setBadgeText({text: ''})
        window.open('https://www.v2ex.com/notifications')
      } else {
        window.open('https://www.v2ex.com')
      }
    })
  })

  if (!cfg.cfg_notificationsPopup && !cfg.cfg_notificationsIconShowNum) return 

  setInterval(() => {
    fetch('https://www.v2ex.com/', {credentials: 'same-origin'}) // cookie
      .then(res => res.text())
      .then(res => {
        const p = /(\d+) 条未读提醒/
        const r = p.exec(res)

        if (!r) return

        if (cfg.cfg_notificationsPopup) {
          chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'icons/icon_48.png',
            title: `from V2EX HELPER's Notification`,
            message: `您有 ${r[1]} 条来自 V2EX 的新消息！`,
          })
        }
        
        if (cfg.cfg_notificationsIconShowNum) {
          chrome.browserAction.setBadgeText({text: r[1]});
          chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
        }
      })
  }, 1000 * 10 * 60) // every 10 mins
}

getConfig(afterGetCfg)