/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getSettingsAsync; });
const options = ['回复通知增强', '主题贴图片点击放大', '主题贴发图', '对话详情', '自动签到', '新消息提醒（弹窗模式）', '新消息提醒（图标提醒）'];

let keys = ['checkReply', 'zoom', 'uploadImg', 'checkConversation', 'signin', 'notificationsPopup', 'notificationsIconShowNum'];

const prefix = 'cfg_';

keys = keys.map(item => prefix + item);

// get settings 
function getSettingsAsync() {
  return new Promise(resolve => {
    chrome.storage.sync.get(keys, function (cfg) {
      keys.forEach(item => {
        cfg[item] = cfg[item] === undefined || cfg[item] ? true : false;
      });

      resolve(cfg);
    });
  });
}



/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings_js__ = __webpack_require__(0);


(async function () {
  let cfg = await Object(__WEBPACK_IMPORTED_MODULE_0__settings_settings_js__["a" /* getSettingsAsync */])();
  let html = '';

  __WEBPACK_IMPORTED_MODULE_0__settings_settings_js__["c" /* options */].forEach((item, index) => {
    let key = __WEBPACK_IMPORTED_MODULE_0__settings_settings_js__["b" /* keys */][index];
    let value = cfg[key] === undefined || cfg[key] ? true : false;

    html += `
    <div class="item">
      <span>${item}：</span>
      <input type="checkbox" key=${key} ${value ? "checked" : ""}>
    </div>
    `;
  });

  document.querySelector('.container').innerHTML = html;

  document.querySelector('.container').addEventListener('click', e => {
    if (e.target.type !== 'checkbox') return;

    let [k, v] = [e.target.getAttribute('key'), e.target.checked];
    let setting = {};
    setting[k] = v;
    chrome.storage.sync.set(setting, function () {});
  }, false);
})();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I0MjQ5ZWJmYjY1OTMyODU0NjQiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NldHRpbmdzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL2FwcC9vcHRpb24vb3B0aW9uLmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJrZXlzIiwicHJlZml4IiwibWFwIiwiaXRlbSIsImdldFNldHRpbmdzQXN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNocm9tZSIsInN0b3JhZ2UiLCJzeW5jIiwiZ2V0IiwiY2ZnIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsImh0bWwiLCJpbmRleCIsImtleSIsInZhbHVlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJ0eXBlIiwiayIsInYiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja2VkIiwic2V0dGluZyIsInNldCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTtBQUFBLE1BQU1BLFVBQVUsQ0FDZCxRQURjLEVBRWQsV0FGYyxFQUdkLE9BSGMsRUFJZCxNQUpjLEVBS2QsTUFMYyxFQU1kLGFBTmMsRUFPZCxhQVBjLENBQWhCOztBQVVBLElBQUlDLE9BQU8sQ0FDVCxZQURTLEVBRVQsTUFGUyxFQUdULFdBSFMsRUFJVCxtQkFKUyxFQUtULFFBTFMsRUFNVCxvQkFOUyxFQU9ULDBCQVBTLENBQVg7O0FBVUEsTUFBTUMsU0FBUyxNQUFmOztBQUVBRCxPQUFPQSxLQUFLRSxHQUFMLENBQVNDLFFBQVFGLFNBQVNFLElBQTFCLENBQVA7O0FBRUE7QUFDQSxTQUFTQyxnQkFBVCxHQUE0QjtBQUMxQixTQUFPLElBQUlDLE9BQUosQ0FBWUMsV0FBVztBQUM1QkMsV0FBT0MsT0FBUCxDQUFlQyxJQUFmLENBQW9CQyxHQUFwQixDQUF3QlYsSUFBeEIsRUFBOEIsVUFBU1csR0FBVCxFQUFjO0FBQzFDWCxXQUFLWSxPQUFMLENBQWFULFFBQVE7QUFDbkJRLFlBQUlSLElBQUosSUFBWVEsSUFBSVIsSUFBSixNQUFjVSxTQUFkLElBQTJCRixJQUFJUixJQUFKLENBQTNCLEdBQXVDLElBQXZDLEdBQThDLEtBQTFEO0FBQ0QsT0FGRDs7QUFJQUcsY0FBUUssR0FBUjtBQUNELEtBTkQ7QUFPRCxHQVJNLENBQVA7QUFTRDs7Ozs7Ozs7Ozs7O0FDbkNEOztBQUVBLENBQUMsa0JBQWdCO0FBQ2YsTUFBSUEsTUFBTSxNQUFNLHVGQUFBUCxFQUFoQjtBQUNBLE1BQUlVLE9BQU8sRUFBWDs7QUFFQWYsRUFBQSxzRUFBQUEsQ0FBUWEsT0FBUixDQUFnQixDQUFDVCxJQUFELEVBQU9ZLEtBQVAsS0FBaUI7QUFDL0IsUUFBSUMsTUFBTSxtRUFBQWhCLENBQUtlLEtBQUwsQ0FBVjtBQUNBLFFBQUlFLFFBQVFOLElBQUlLLEdBQUosTUFBYUgsU0FBYixJQUEwQkYsSUFBSUssR0FBSixDQUExQixHQUFxQyxJQUFyQyxHQUE0QyxLQUF4RDs7QUFFQUYsWUFBUzs7Y0FFQ1gsSUFBSzttQ0FDZ0JhLEdBQUksSUFBR0MsUUFBUSxTQUFSLEdBQW9CLEVBQUk7O0tBSDlEO0FBTUQsR0FWRDs7QUFZQUMsV0FBU0MsYUFBVCxDQUF1QixZQUF2QixFQUFxQ0MsU0FBckMsR0FBaUROLElBQWpEOztBQUVBSSxXQUFTQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDRSxnQkFBckMsQ0FBc0QsT0FBdEQsRUFBK0RDLEtBQUs7QUFDbEUsUUFBSUEsRUFBRUMsTUFBRixDQUFTQyxJQUFULEtBQWtCLFVBQXRCLEVBQWtDOztBQUVsQyxRQUFJLENBQUNDLENBQUQsRUFBSUMsQ0FBSixJQUFTLENBQUNKLEVBQUVDLE1BQUYsQ0FBU0ksWUFBVCxDQUFzQixLQUF0QixDQUFELEVBQStCTCxFQUFFQyxNQUFGLENBQVNLLE9BQXhDLENBQWI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQUEsWUFBUUosQ0FBUixJQUFhQyxDQUFiO0FBQ0FuQixXQUFPQyxPQUFQLENBQWVDLElBQWYsQ0FBb0JxQixHQUFwQixDQUF3QkQsT0FBeEIsRUFBaUMsWUFBVyxDQUFFLENBQTlDO0FBQ0QsR0FQRCxFQU9HLEtBUEg7QUFRRCxDQTFCRCxJIiwiZmlsZSI6Ii4vZXh0ZW5zaW9uL29wdGlvbi9vcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2I0MjQ5ZWJmYjY1OTMyODU0NjQiLCJjb25zdCBvcHRpb25zID0gW1xuICAn5Zue5aSN6YCa55+l5aKe5by6JyxcbiAgJ+S4u+mimOi0tOWbvueJh+eCueWHu+aUvuWkpycsXG4gICfkuLvpopjotLTlj5Hlm74nLFxuICAn5a+56K+d6K+m5oOFJyxcbiAgJ+iHquWKqOetvuWIsCcsXG4gICfmlrDmtojmga/mj5DphpLvvIjlvLnnqpfmqKHlvI/vvIknLFxuICAn5paw5raI5oGv5o+Q6YaS77yI5Zu+5qCH5o+Q6YaS77yJJyxcbl1cblxubGV0IGtleXMgPSBbXG4gICdjaGVja1JlcGx5JyxcbiAgJ3pvb20nLFxuICAndXBsb2FkSW1nJyxcbiAgJ2NoZWNrQ29udmVyc2F0aW9uJyxcbiAgJ3NpZ25pbicsXG4gICdub3RpZmljYXRpb25zUG9wdXAnLFxuICAnbm90aWZpY2F0aW9uc0ljb25TaG93TnVtJyxcbl1cblxuY29uc3QgcHJlZml4ID0gJ2NmZ18nXG5cbmtleXMgPSBrZXlzLm1hcChpdGVtID0+IHByZWZpeCArIGl0ZW0pXG5cbi8vIGdldCBzZXR0aW5ncyBcbmZ1bmN0aW9uIGdldFNldHRpbmdzQXN5bmMoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChrZXlzLCBmdW5jdGlvbihjZmcpIHtcbiAgICAgIGtleXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY2ZnW2l0ZW1dID0gY2ZnW2l0ZW1dID09PSB1bmRlZmluZWQgfHwgY2ZnW2l0ZW1dID8gdHJ1ZSA6IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICByZXNvbHZlKGNmZylcbiAgICB9KVxuICB9KSBcbn1cblxuZXhwb3J0IHtcbiAgb3B0aW9ucywga2V5cywgZ2V0U2V0dGluZ3NBc3luY1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5qcyIsImltcG9ydCB7b3B0aW9ucywga2V5cywgZ2V0U2V0dGluZ3NBc3luY30gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3MuanMnXG5cbihhc3luYyBmdW5jdGlvbigpe1xuICBsZXQgY2ZnID0gYXdhaXQgZ2V0U2V0dGluZ3NBc3luYygpXG4gIGxldCBodG1sID0gJydcblxuICBvcHRpb25zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgbGV0IGtleSA9IGtleXNbaW5kZXhdXG4gICAgbGV0IHZhbHVlID0gY2ZnW2tleV0gPT09IHVuZGVmaW5lZCB8fCBjZmdba2V5XSA/IHRydWUgOiBmYWxzZVxuXG4gICAgaHRtbCArPSBgXG4gICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgIDxzcGFuPiR7aXRlbX3vvJo8L3NwYW4+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIga2V5PSR7a2V5fSAke3ZhbHVlID8gXCJjaGVja2VkXCIgOiBcIlwiIH0+XG4gICAgPC9kaXY+XG4gICAgYFxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKS5pbm5lckhUTUwgPSBodG1sXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcpIHJldHVyblxuXG4gICAgbGV0IFtrLCB2XSA9IFtlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2tleScpLCBlLnRhcmdldC5jaGVja2VkXVxuICAgIGxldCBzZXR0aW5nID0ge31cbiAgICBzZXR0aW5nW2tdID0gdlxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHNldHRpbmcsIGZ1bmN0aW9uKCkge30pXG4gIH0sIGZhbHNlKVxufSkoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9vcHRpb24vb3B0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==