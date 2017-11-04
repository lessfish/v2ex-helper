import {getSettingsAsync} from '../../settings/settings.js'
// import 'babel-polyfill'

(async function() {
  let cfg = await getSettingsAsync()

  if (cfg.cfg_signin === false) return

  // 先判断今天有没有签到过，如果有，则直接返回 
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const todayStr = [year, month, day].join('-')

  chrome.storage.sync.get(['lastSigninDate'], function(items) {
    if (items.lastSigninDate === todayStr) return // 今天已经签到过了

    // 保存数据
    chrome.storage.sync.set({lastSigninDate: todayStr}, function() {})

    $.get('//www.v2ex.com/mission/daily', res => {
      const isSignin = !res.includes('领取 X 铜币')
      if (isSignin) return

      const p = /\/mission\/daily\/redeem\?once=\d+/
      const api = p.exec(res)[0]
      
      $.get(api, res => {
        if (res) {
          // 如果是首页，则替换
          if (!$('.fa.fa-gift').length) return 
          
          $('.fa.fa-gift').next().html('今日已签到')
          $('.fa.fa-gift').removeClass('fa-gift').addClass('fa-check')
        }
      })
    })
  });
})()