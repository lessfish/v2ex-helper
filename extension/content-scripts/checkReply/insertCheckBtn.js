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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings_js__ = __webpack_require__(0);


// the script can deal with DOM
(async function () {
  let cfg = await Object(__WEBPACK_IMPORTED_MODULE_0__settings_settings_js__["a" /* getSettingsAsync */])();

  if (cfg.cfg_checkReply === false) return;

  // find the replies, and append "check" button
  let lis = [].slice.call(document.querySelectorAll('#Main > div:nth-child(2) > .cell[id]'));

  lis.forEach(item => {
    let html = item.querySelector('table > tbody > tr > td:nth-child(2) > span.fade').innerHTML.trim();
    if (html.endsWith('回复了你') || html.endsWith('提到了你')) {
      // is a reply
      let nextNode = item.querySelector('table > tbody > tr > td:nth-child(2) > div.sep5');
      let parentNode = item.querySelector('table > tbody > tr > td:nth-child(2)');
      let addNode = document.createElement('a');
      addNode.style.marginLeft = '5px';
      addNode.className = 'node';
      addNode.innerHTML = '查看';

      let replyUrl = item.querySelector('table > tbody > tr > td:nth-child(2) > span.fade > a:nth-child(2)').href;
      replyUrl = replyUrl.replace(/#reply[0-9]+/, '?isJump=1' + '$&');
      addNode.href = replyUrl;

      parentNode.insertBefore(addNode, nextNode);
    }
  });
})();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I0MjQ5ZWJmYjY1OTMyODU0NjQiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NldHRpbmdzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL2FwcC9jb250ZW50LXNjcmlwdHMvY2hlY2tSZXBseS9pbnNlcnRDaGVja0J0bi5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwia2V5cyIsInByZWZpeCIsIm1hcCIsIml0ZW0iLCJnZXRTZXR0aW5nc0FzeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaHJvbWUiLCJzdG9yYWdlIiwic3luYyIsImdldCIsImNmZyIsImZvckVhY2giLCJ1bmRlZmluZWQiLCJjZmdfY2hlY2tSZXBseSIsImxpcyIsInNsaWNlIiwiY2FsbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImh0bWwiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwidHJpbSIsImVuZHNXaXRoIiwibmV4dE5vZGUiLCJwYXJlbnROb2RlIiwiYWRkTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm1hcmdpbkxlZnQiLCJjbGFzc05hbWUiLCJyZXBseVVybCIsImhyZWYiLCJyZXBsYWNlIiwiaW5zZXJ0QmVmb3JlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUEsTUFBTUEsVUFBVSxDQUNkLFFBRGMsRUFFZCxXQUZjLEVBR2QsT0FIYyxFQUlkLE1BSmMsRUFLZCxNQUxjLEVBTWQsYUFOYyxFQU9kLGFBUGMsQ0FBaEI7O0FBVUEsSUFBSUMsT0FBTyxDQUNULFlBRFMsRUFFVCxNQUZTLEVBR1QsV0FIUyxFQUlULG1CQUpTLEVBS1QsUUFMUyxFQU1ULG9CQU5TLEVBT1QsMEJBUFMsQ0FBWDs7QUFVQSxNQUFNQyxTQUFTLE1BQWY7O0FBRUFELE9BQU9BLEtBQUtFLEdBQUwsQ0FBU0MsUUFBUUYsU0FBU0UsSUFBMUIsQ0FBUDs7QUFFQTtBQUNBLFNBQVNDLGdCQUFULEdBQTRCO0FBQzFCLFNBQU8sSUFBSUMsT0FBSixDQUFZQyxXQUFXO0FBQzVCQyxXQUFPQyxPQUFQLENBQWVDLElBQWYsQ0FBb0JDLEdBQXBCLENBQXdCVixJQUF4QixFQUE4QixVQUFTVyxHQUFULEVBQWM7QUFDMUNYLFdBQUtZLE9BQUwsQ0FBYVQsUUFBUTtBQUNuQlEsWUFBSVIsSUFBSixJQUFZUSxJQUFJUixJQUFKLE1BQWNVLFNBQWQsSUFBMkJGLElBQUlSLElBQUosQ0FBM0IsR0FBdUMsSUFBdkMsR0FBOEMsS0FBMUQ7QUFDRCxPQUZEOztBQUlBRyxjQUFRSyxHQUFSO0FBQ0QsS0FORDtBQU9ELEdBUk0sQ0FBUDtBQVNEOzs7Ozs7Ozs7Ozs7QUNuQ0Q7O0FBRUE7QUFDQSxDQUFDLGtCQUFrQjtBQUNqQixNQUFJQSxNQUFNLE1BQU0sdUZBQUFQLEVBQWhCOztBQUVBLE1BQUlPLElBQUlHLGNBQUosS0FBdUIsS0FBM0IsRUFBa0M7O0FBRWxDO0FBQ0EsTUFBSUMsTUFBTSxHQUFHQyxLQUFILENBQVNDLElBQVQsQ0FBY0MsU0FBU0MsZ0JBQVQsQ0FBMEIsc0NBQTFCLENBQWQsQ0FBVjs7QUFFQUosTUFBSUgsT0FBSixDQUFZVCxRQUFRO0FBQ2xCLFFBQUlpQixPQUFPakIsS0FBS2tCLGFBQUwsQ0FBbUIsa0RBQW5CLEVBQXVFQyxTQUF2RSxDQUFpRkMsSUFBakYsRUFBWDtBQUNBLFFBQUlILEtBQUtJLFFBQUwsQ0FBYyxNQUFkLEtBQXlCSixLQUFLSSxRQUFMLENBQWMsTUFBZCxDQUE3QixFQUFvRDtBQUFFO0FBQ3BELFVBQUlDLFdBQVd0QixLQUFLa0IsYUFBTCxDQUFtQixpREFBbkIsQ0FBZjtBQUNBLFVBQUlLLGFBQWF2QixLQUFLa0IsYUFBTCxDQUFtQixzQ0FBbkIsQ0FBakI7QUFDQSxVQUFJTSxVQUFVVCxTQUFTVSxhQUFULENBQXVCLEdBQXZCLENBQWQ7QUFDQUQsY0FBUUUsS0FBUixDQUFjQyxVQUFkLEdBQTJCLEtBQTNCO0FBQ0FILGNBQVFJLFNBQVIsR0FBb0IsTUFBcEI7QUFDQUosY0FBUUwsU0FBUixHQUFvQixJQUFwQjs7QUFFQSxVQUFJVSxXQUFXN0IsS0FBS2tCLGFBQUwsQ0FBbUIsbUVBQW5CLEVBQXdGWSxJQUF2RztBQUNBRCxpQkFBV0EsU0FBU0UsT0FBVCxDQUFpQixjQUFqQixFQUFpQyxjQUFjLElBQS9DLENBQVg7QUFDQVAsY0FBUU0sSUFBUixHQUFlRCxRQUFmOztBQUVBTixpQkFBV1MsWUFBWCxDQUF3QlIsT0FBeEIsRUFBaUNGLFFBQWpDO0FBQ0Q7QUFDRixHQWhCRDtBQWlCRCxDQXpCRCxJIiwiZmlsZSI6Ii4vZXh0ZW5zaW9uL2NvbnRlbnQtc2NyaXB0cy9jaGVja1JlcGx5L2luc2VydENoZWNrQnRuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdiNDI0OWViZmI2NTkzMjg1NDY0IiwiY29uc3Qgb3B0aW9ucyA9IFtcbiAgJ+WbnuWkjemAmuefpeWinuW8uicsXG4gICfkuLvpopjotLTlm77niYfngrnlh7vmlL7lpKcnLFxuICAn5Li76aKY6LS05Y+R5Zu+JyxcbiAgJ+WvueivneivpuaDhScsXG4gICfoh6rliqjnrb7liLAnLFxuICAn5paw5raI5oGv5o+Q6YaS77yI5by556qX5qih5byP77yJJyxcbiAgJ+aWsOa2iOaBr+aPkOmGku+8iOWbvuagh+aPkOmGku+8iScsXG5dXG5cbmxldCBrZXlzID0gW1xuICAnY2hlY2tSZXBseScsXG4gICd6b29tJyxcbiAgJ3VwbG9hZEltZycsXG4gICdjaGVja0NvbnZlcnNhdGlvbicsXG4gICdzaWduaW4nLFxuICAnbm90aWZpY2F0aW9uc1BvcHVwJyxcbiAgJ25vdGlmaWNhdGlvbnNJY29uU2hvd051bScsXG5dXG5cbmNvbnN0IHByZWZpeCA9ICdjZmdfJ1xuXG5rZXlzID0ga2V5cy5tYXAoaXRlbSA9PiBwcmVmaXggKyBpdGVtKVxuXG4vLyBnZXQgc2V0dGluZ3MgXG5mdW5jdGlvbiBnZXRTZXR0aW5nc0FzeW5jKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoa2V5cywgZnVuY3Rpb24oY2ZnKSB7XG4gICAgICBrZXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNmZ1tpdGVtXSA9IGNmZ1tpdGVtXSA9PT0gdW5kZWZpbmVkIHx8IGNmZ1tpdGVtXSA/IHRydWUgOiBmYWxzZVxuICAgICAgfSlcblxuICAgICAgcmVzb2x2ZShjZmcpXG4gICAgfSlcbiAgfSkgXG59XG5cbmV4cG9ydCB7XG4gIG9wdGlvbnMsIGtleXMsIGdldFNldHRpbmdzQXN5bmNcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2V0dGluZ3Mvc2V0dGluZ3MuanMiLCJpbXBvcnQge2dldFNldHRpbmdzQXN5bmN9IGZyb20gJy4uLy4uL3NldHRpbmdzL3NldHRpbmdzLmpzJ1xuXG4vLyB0aGUgc2NyaXB0IGNhbiBkZWFsIHdpdGggRE9NXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgY2ZnID0gYXdhaXQgZ2V0U2V0dGluZ3NBc3luYygpXG4gIFxuICBpZiAoY2ZnLmNmZ19jaGVja1JlcGx5ID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgLy8gZmluZCB0aGUgcmVwbGllcywgYW5kIGFwcGVuZCBcImNoZWNrXCIgYnV0dG9uXG4gIGxldCBsaXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNNYWluID4gZGl2Om50aC1jaGlsZCgyKSA+IC5jZWxsW2lkXScpKVxuXG4gIGxpcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGxldCBodG1sID0gaXRlbS5xdWVyeVNlbGVjdG9yKCd0YWJsZSA+IHRib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoMikgPiBzcGFuLmZhZGUnKS5pbm5lckhUTUwudHJpbSgpXG4gICAgaWYgKGh0bWwuZW5kc1dpdGgoJ+WbnuWkjeS6huS9oCcpIHx8IGh0bWwuZW5kc1dpdGgoJ+aPkOWIsOS6huS9oCcpKSB7IC8vIGlzIGEgcmVwbHlcbiAgICAgIGxldCBuZXh0Tm9kZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcigndGFibGUgPiB0Ym9keSA+IHRyID4gdGQ6bnRoLWNoaWxkKDIpID4gZGl2LnNlcDUnKVxuICAgICAgbGV0IHBhcmVudE5vZGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlID4gdGJvZHkgPiB0ciA+IHRkOm50aC1jaGlsZCgyKScpXG4gICAgICBsZXQgYWRkTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgYWRkTm9kZS5zdHlsZS5tYXJnaW5MZWZ0ID0gJzVweCdcbiAgICAgIGFkZE5vZGUuY2xhc3NOYW1lID0gJ25vZGUnXG4gICAgICBhZGROb2RlLmlubmVySFRNTCA9ICfmn6XnnIsnXG5cbiAgICAgIGxldCByZXBseVVybCA9IGl0ZW0ucXVlcnlTZWxlY3RvcigndGFibGUgPiB0Ym9keSA+IHRyID4gdGQ6bnRoLWNoaWxkKDIpID4gc3Bhbi5mYWRlID4gYTpudGgtY2hpbGQoMiknKS5ocmVmXG4gICAgICByZXBseVVybCA9IHJlcGx5VXJsLnJlcGxhY2UoLyNyZXBseVswLTldKy8sICc/aXNKdW1wPTEnICsgJyQmJylcbiAgICAgIGFkZE5vZGUuaHJlZiA9IHJlcGx5VXJsXG5cbiAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFkZE5vZGUsIG5leHROb2RlKVxuICAgIH1cbiAgfSlcbn0pKClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29udGVudC1zY3JpcHRzL2NoZWNrUmVwbHkvaW5zZXJ0Q2hlY2tCdG4uanMiXSwic291cmNlUm9vdCI6IiJ9