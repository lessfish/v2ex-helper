(function() {
  // 先判断今天有没有签到过，如果有，则直接返回 
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const todayStr = [year, month, day].join('-')
  const lastSigninDate = localStorage.getItem('signin')
  
  if (lastSigninDate === today) return // 今天已经签到过了

  localStorage.setItem('signin', todayStr)

  $.get('//www.v2ex.com/mission/daily', res => {
    const isSignin = !res.includes('领取 X 铜币')
    if (isSignin) return

    const p = /\/mission\/daily\/redeem\?once=\d+/
    const api = p.exec(res)[0]

    $.get(api, res => {
      if (res.status === 200) {
        // 如果是首页，则替换
        if (!$('.fa.fa-gift').length) return 

        $('.fa.fa-gift').next().html('今日已签到')
        $('.fa.fa-gift').removeClass('fa-gift').addClass('fa-check')
      }
    })
  })
})()