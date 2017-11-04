import mediumZoom from 'medium-zoom'
import {getSettingsAsync} from '../../settings/settings.js'
// import 'babel-polyfill'

(async function() {
  let cfg = await getSettingsAsync()

  if (!cfg.cfg_zoom) return

  mediumZoom(document.querySelectorAll('.topic_content img'))
})()