(function(){
  const options = [
    '回复通知增强',
    '主题贴图片点击放大',
    '主题贴发图',
    '对话详情',
    '自动签到',
    '新消息提醒（弹窗模式）',
    '新消息提醒（图标提醒）',
  ]

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
    let html = ''
    
    options.forEach((item, index) => {
      let key = keys[index]
      let value = cfg[key] === undefined || cfg[key] ? true : false

      html += `
      <div class="item">
        <span>${item}：</span>
        <input type="checkbox" key=${key} ${value ? "checked" : "" }>
      </div>
      `
    })

    document.querySelector('.container').innerHTML = html

    document.querySelector('.container').addEventListener('click', e => {
      if (e.target.type !== 'checkbox') return

      let [k, v] = [e.target.getAttribute('key'), e.target.checked]
      let setting = {}
      setting[k] = v
      chrome.storage.sync.set(setting, function() {})
    }, false)
  })
})()