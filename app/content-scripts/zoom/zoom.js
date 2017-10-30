import mediumZoom from 'medium-zoom'
import {getSettingsAsync} from '../../settings/settings.js'

(async function() {
  let cfg = await getSettingsAsync()

  if (!cfg.cfg_zoom) return

  mediumZoom(document.querySelectorAll('img'))
})()