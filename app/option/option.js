import {options, keys, getSettingsAsync} from '../settings/settings.js'

(async function(){
  let cfg = await getSettingsAsync()
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
})()