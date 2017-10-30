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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkConversation_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uploadImg_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setNotifications_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings_js__ = __webpack_require__(0);





// 一直运行在后台的 js，不能操作 DOM
// 有跨域权限，content_scripts 没有跨域权限
// events listener 
(function () {
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.method) {
      case 'uploadImgInTopic':
        Object(__WEBPACK_IMPORTED_MODULE_1__uploadImg_js__["a" /* default */])(message, sendResponse);
        // 异步，直到执行 sendResponse() 方法
        return true;
        break;

      case 'checkConversationBtn':
        Object(__WEBPACK_IMPORTED_MODULE_0__checkConversation_js__["a" /* default */])(message, sendResponse);
        return true;
        break;
    }
  });
})()

// 消息提醒
(async function () {
  let cfg = await Object(__WEBPACK_IMPORTED_MODULE_3__settings_settings_js__["a" /* getSettingsAsync */])();
  Object(__WEBPACK_IMPORTED_MODULE_2__setNotifications_js__["a" /* default */])(cfg);
})();

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 对话详情
/* harmony default export */ __webpack_exports__["a"] = (function (message, sendResponse) {
  let { floorOwner, replyUser, topicId } = message;
  let conversations = []; // 对话详情数据，sendResponse() 返回的数据
  // 去除缓存影响，但是 api 一小时只能调用 120 次
  let api = 'https://www.v2ex.com/api/replies/show.json?topic_id=' + topicId + '&rdm=' + +new Date();

  fetch(api).then(res => res.json()).then(results => {
    const pattern = /@<a target="_blank" href="\/member\/.+?">(.+?)<\/a>/g; // 获取层主回复用户名

    // 遍历回复数据
    results.forEach(res => {
      let replyContent = res.content_rendered; // 该楼层回复内容
      let matches = replyContent.match(pattern); // replyContent 中有几个 @
      let _floorOwner = res.member.username; // 层主
      let avatarsUrl = res.member.avatar_normal; // 层主头像

      // replyContent 中有 >=1 个 @ 时
      if (matches && matches.length >= 1) {
        let _replyUser = []; // 层主回复的用户数组
        let matching;

        // 遍历，找到 @ 的用户，即层主回复的用户 
        do {
          matching = pattern.exec(replyContent);
          if (matching) {
            _replyUser.push(matching[1]);
          }
        } while (matching !== null);

        if (_floorOwner === floorOwner && _replyUser.includes(replyUser) || _floorOwner === replyUser && _replyUser.includes(floorOwner)) {
          conversations.push({ from: _floorOwner, replyContent, avatarsUrl });
        }
      }

      // 单纯的回复楼层（回复中没有 @）
      if (!matches) {
        if (_floorOwner === floorOwner || _floorOwner === replyUser) {
          conversations.push({ from: _floorOwner, replyContent, avatarsUrl });
        }
      }
    });

    sendResponse({ conversations: conversations });
  });
});

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 主题贴添加图片
/* harmony default export */ __webpack_exports__["a"] = (function (message, sendResponse) {
  // 微博图床接口
  let api = 'http://picupload.service.weibo.com/interface/pic_upload.php?\
    mime=image%2Fjpeg&data=base64&url=0';

  let xhr = new XMLHttpRequest();
  let data = new FormData();

  // post 的数据，值为图片的 base64 编码
  // 需要去掉类似前缀 `data:image/jpeg;base64,`
  data.append('b64_data', message.dataURL);

  xhr.onerror = () => {}; // todo

  xhr.onload = function () {
    try {
      const pattern = /"pid":"(.+)"/;
      let data = xhr.responseText;
      let imgUrlPrefix = 'https://ws2.sinaimg.cn/large/';
      let pid = data.match(pattern)[1];

      sendResponse({
        status: 0, // success
        imgUrl: imgUrlPrefix + pid
      });
    } catch (err) {
      sendResponse({
        status: 1 // unlogin
      });
    }
  };

  xhr.open('POST', api);
  xhr.send(data);
});

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (cfg) {
  // add  browserAction listener
  chrome.browserAction.onClicked.addListener(() => {
    chrome.browserAction.getBadgeText({}, res => {
      if (cfg.cfg_notificationsIconShowNum && res !== '') {
        chrome.browserAction.setBadgeText({ text: '' });
        window.open('https://www.v2ex.com/notifications');
      } else {
        window.open('https://www.v2ex.com');
      }
    });
  });

  // todo
  // 当访问 https://www.v2ex.com/notifications 后
  // 如果 icon 有未读提醒，则取消

  if (!cfg.cfg_notificationsPopup && !cfg.cfg_notificationsIconShowNum) return;

  setInterval(() => {
    fetch('https://www.v2ex.com/', { credentials: 'same-origin' }) // cookie
    .then(res => res.text()).then(res => {
      const p = /(\d+) 条未读提醒/;
      const r = p.exec(res);

      if (!r || r[1] === '0') return;

      if (cfg.cfg_notificationsPopup) {
        chrome.notifications.create(null, {
          type: 'basic',
          iconUrl: 'icons/icon_48.png',
          title: `from V2EX HELPER's Notification`,
          message: `您有 ${r[1]} 条来自 V2EX 的新消息！`
        });
      }

      if (cfg.cfg_notificationsIconShowNum) {
        chrome.browserAction.setBadgeText({ text: r[1] });
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
      }
    });
  }, 1000 * 10 * 60); // every 10 mins
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I0MjQ5ZWJmYjY1OTMyODU0NjQiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NldHRpbmdzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kLXNjcmlwdHMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZC1zY3JpcHRzL2NoZWNrQ29udmVyc2F0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kLXNjcmlwdHMvdXBsb2FkSW1nLmpzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kLXNjcmlwdHMvc2V0Tm90aWZpY2F0aW9ucy5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwia2V5cyIsInByZWZpeCIsIm1hcCIsIml0ZW0iLCJnZXRTZXR0aW5nc0FzeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaHJvbWUiLCJzdG9yYWdlIiwic3luYyIsImdldCIsImNmZyIsImZvckVhY2giLCJ1bmRlZmluZWQiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwibWV0aG9kIiwidXBsb2FkSW1nSW5Ub3BpYyIsImNoZWNrQ29udmVyc2F0aW9uIiwic2V0Tm90aWZpY2F0aW9ucyIsImZsb29yT3duZXIiLCJyZXBseVVzZXIiLCJ0b3BpY0lkIiwiY29udmVyc2F0aW9ucyIsImFwaSIsIkRhdGUiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwicmVzdWx0cyIsInBhdHRlcm4iLCJyZXBseUNvbnRlbnQiLCJjb250ZW50X3JlbmRlcmVkIiwibWF0Y2hlcyIsIm1hdGNoIiwiX2Zsb29yT3duZXIiLCJtZW1iZXIiLCJ1c2VybmFtZSIsImF2YXRhcnNVcmwiLCJhdmF0YXJfbm9ybWFsIiwibGVuZ3RoIiwiX3JlcGx5VXNlciIsIm1hdGNoaW5nIiwiZXhlYyIsInB1c2giLCJpbmNsdWRlcyIsImZyb20iLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImRhdGFVUkwiLCJvbmVycm9yIiwib25sb2FkIiwicmVzcG9uc2VUZXh0IiwiaW1nVXJsUHJlZml4IiwicGlkIiwic3RhdHVzIiwiaW1nVXJsIiwiZXJyIiwib3BlbiIsInNlbmQiLCJicm93c2VyQWN0aW9uIiwib25DbGlja2VkIiwiZ2V0QmFkZ2VUZXh0IiwiY2ZnX25vdGlmaWNhdGlvbnNJY29uU2hvd051bSIsInNldEJhZGdlVGV4dCIsInRleHQiLCJ3aW5kb3ciLCJjZmdfbm90aWZpY2F0aW9uc1BvcHVwIiwic2V0SW50ZXJ2YWwiLCJjcmVkZW50aWFscyIsInAiLCJyIiwibm90aWZpY2F0aW9ucyIsImNyZWF0ZSIsInR5cGUiLCJpY29uVXJsIiwidGl0bGUiLCJzZXRCYWRnZUJhY2tncm91bmRDb2xvciIsImNvbG9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUEsTUFBTUEsVUFBVSxDQUNkLFFBRGMsRUFFZCxXQUZjLEVBR2QsT0FIYyxFQUlkLE1BSmMsRUFLZCxNQUxjLEVBTWQsYUFOYyxFQU9kLGFBUGMsQ0FBaEI7O0FBVUEsSUFBSUMsT0FBTyxDQUNULFlBRFMsRUFFVCxNQUZTLEVBR1QsV0FIUyxFQUlU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Z0Usc0JBQVIsRUFBZ0M7QUFDOUJwRSxlQUFPeUUsYUFBUCxDQUFxQkMsTUFBckIsQ0FBNEIsSUFBNUIsRUFBa0M7QUFDaENDLGdCQUFNLE9BRDBCO0FBRWhDQyxtQkFBUyxtQkFGdUI7QUFHaENDLGlCQUFRLGlDQUh3QjtBQUloQ25FLG1CQUFVLE1BQUs4RCxFQUFFLENBQUYsQ0FBSztBQUpZLFNBQWxDO0FBTUQ7O0FBRUQsVUFBSXBFLElBQUk0RCw0QkFBUixFQUFzQztBQUNwQ2hFLGVBQU82RCxhQUFQLENBQXFCSSxZQUFyQixDQUFrQyxFQUFDQyxNQUFNTSxFQUFFLENBQUYsQ0FBUCxFQUFsQztBQUNBeEUsZUFBTzZELGFBQVAsQ0FBcUJpQix1QkFBckIsQ0FBNkMsRUFBQ0MsT0FBTyxDQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZLEdBQVosQ0FBUixFQUE3QztBQUNEO0FBQ0YsS0FyQkg7QUFzQkQsR0F2QkQsRUF1QkcsT0FBTyxFQUFQLEdBQVksRUF2QmYsRUFuQjJCLENBMENSO0FBQ3BCLEMiLCJmaWxlIjoiLi9leHRlbnNpb24vYmFja2dyb3VuZC1zY3JpcHRzL2JhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2I0MjQ5ZWJmYjY1OTMyODU0NjQiLCJjb25zdCBvcHRpb25zID0gW1xuICAn5Zue5aSN6YCa55+l5aKe5by6JyxcbiAgJ+S4u+mimOi0tOWbvueJh+eCueWHu+aUvuWkpycsXG4gICfkuLvpopjotLTlj5Hlm74nLFxuICAn5a+56K+d6K+m5oOFJyxcbiAgJ+iHquWKqOetvuWIsCcsXG4gICfmlrDmtojmga/mj5DphpLvvIjlvLnnqpfmqKHlvI/vvIknLFxuICAn5paw5raI5oGv5o+Q6YaS77yI5Zu+5qCH5o+Q6YaS77yJJyxcbl1cblxubGV0IGtleXMgPSBbXG4gICdjaGVja1JlcGx5JyxcbiAgJ3pvb20nLFxuICAndXBsb2FkSW1nJyxcbiAgJ2NoZWNrQ29udmVyc2F0aW9uJyxcbiAgJ3NpZ25pbicsXG4gICdub3RpZmljYXRpb25zUG9wdXAnLFxuICAnbm90aWZpY2F0aW9uc0ljb25TaG93TnVtJyxcbl1cblxuY29uc3QgcHJlZml4ID0gJ2NmZ18nXG5cbmtleXMgPSBrZXlzLm1hcChpdGVtID0+IHByZWZpeCArIGl0ZW0pXG5cbi8vIGdldCBzZXR0aW5ncyBcbmZ1bmN0aW9uIGdldFNldHRpbmdzQXN5bmMoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChrZXlzLCBmdW5jdGlvbihjZmcpIHtcbiAgICAgIGtleXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY2ZnW2l0ZW1dID0gY2ZnW2l0ZW1dID09PSB1bmRlZmluZWQgfHwgY2ZnW2l0ZW1dID8gdHJ1ZSA6IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICByZXNvbHZlKGNmZylcbiAgICB9KVxuICB9KSBcbn1cblxuZXhwb3J0IHtcbiAgb3B0aW9ucywga2V5cywgZ2V0U2V0dGluZ3NBc3luY1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5qcyIsImltcG9ydCBjaGVja0NvbnZlcnNhdGlvbiBmcm9tICcuL2NoZWNrQ29udmVyc2F0aW9uLmpzJ1xuaW1wb3J0IHVwbG9hZEltZ0luVG9waWMgZnJvbSAnLi91cGxvYWRJbWcuanMnXG5pbXBvcnQgc2V0Tm90aWZpY2F0aW9ucyBmcm9tICcuL3NldE5vdGlmaWNhdGlvbnMuanMnXG5pbXBvcnQge2dldFNldHRpbmdzQXN5bmN9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzLmpzJ1xuXG4vLyDkuIDnm7Tov5DooYzlnKjlkI7lj7DnmoQganPvvIzkuI3og73mk43kvZwgRE9NXG4vLyDmnInot6jln5/mnYPpmZDvvIxjb250ZW50X3NjcmlwdHMg5rKh5pyJ6Leo5Z+f5p2D6ZmQXG4vLyBldmVudHMgbGlzdGVuZXIgXG4oZnVuY3Rpb24oKSB7XG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHN3aXRjaChtZXNzYWdlLm1ldGhvZCkge1xuICAgICAgY2FzZSAndXBsb2FkSW1nSW5Ub3BpYyc6XG4gICAgICAgIHVwbG9hZEltZ0luVG9waWMobWVzc2FnZSwgc2VuZFJlc3BvbnNlKVxuICAgICAgICAvLyDlvILmraXvvIznm7TliLDmiafooYwgc2VuZFJlc3BvbnNlKCkg5pa55rOVXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2NoZWNrQ29udmVyc2F0aW9uQnRuJzpcbiAgICAgICAgY2hlY2tDb252ZXJzYXRpb24obWVzc2FnZSwgc2VuZFJlc3BvbnNlKVxuICAgICAgICByZXR1cm4gdHJ1ZSBcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0pXG59KSgpXG5cbi8vIOa2iOaBr+aPkOmGklxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBsZXQgY2ZnID0gYXdhaXQgZ2V0U2V0dGluZ3NBc3luYygpXG4gIHNldE5vdGlmaWNhdGlvbnMoY2ZnKVxufSkoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9iYWNrZ3JvdW5kLXNjcmlwdHMvYmFja2dyb3VuZC5qcyIsIi8vIOWvueivneivpuaDhVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWVzc2FnZSwgc2VuZFJlc3BvbnNlKSB7XG4gIGxldCB7Zmxvb3JPd25lciwgcmVwbHlVc2VyLCB0b3BpY0lkfSA9IG1lc3NhZ2VcbiAgbGV0IGNvbnZlcnNhdGlvbnMgPSBbXSAvLyDlr7nor53or6bmg4XmlbDmja7vvIxzZW5kUmVzcG9uc2UoKSDov5Tlm57nmoTmlbDmja5cbiAgLy8g5Y676Zmk57yT5a2Y5b2x5ZON77yM5L2G5pivIGFwaSDkuIDlsI/ml7blj6rog73osIPnlKggMTIwIOasoVxuICBsZXQgYXBpID0gJ2h0dHBzOi8vd3d3LnYyZXguY29tL2FwaS9yZXBsaWVzL3Nob3cuanNvbj90b3BpY19pZD0nICsgdG9waWNJZCArICcmcmRtPScgKyAoK25ldyBEYXRlKSBcbiAgXG4gIGZldGNoKGFwaSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSAvQDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJcXC9tZW1iZXJcXC8uKz9cIj4oLis/KTxcXC9hPi9nIC8vIOiOt+WPluWxguS4u+WbnuWkjeeUqOaIt+WQjVxuXG4gICAgICAvLyDpgY3ljoblm57lpI3mlbDmja5cbiAgICAgIHJlc3VsdHMuZm9yRWFjaChyZXMgPT4ge1xuICAgICAgICBsZXQgcmVwbHlDb250ZW50ID0gcmVzLmNvbnRlbnRfcmVuZGVyZWQgLy8g6K+l5qW85bGC5Zue5aSN5YaF5a65XG4gICAgICAgIGxldCBtYXRjaGVzID0gcmVwbHlDb250ZW50Lm1hdGNoKHBhdHRlcm4pIC8vIHJlcGx5Q29udGVudCDkuK3mnInlh6DkuKogQFxuICAgICAgICBsZXQgX2Zsb29yT3duZXIgPSByZXMubWVtYmVyLnVzZXJuYW1lIC8vIOWxguS4u1xuICAgICAgICBsZXQgYXZhdGFyc1VybCA9IHJlcy5tZW1iZXIuYXZhdGFyX25vcm1hbCAvLyDlsYLkuLvlpLTlg49cblxuICAgICAgICAvLyByZXBseUNvbnRlbnQg5Lit5pyJID49MSDkuKogQCDml7ZcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIGxldCBfcmVwbHlVc2VyID0gW10gLy8g5bGC5Li75Zue5aSN55qE55So5oi35pWw57uEXG4gICAgICAgICAgbGV0IG1hdGNoaW5nO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIOmBjeWOhu+8jOaJvuWIsCBAIOeahOeUqOaIt++8jOWNs+WxguS4u+WbnuWkjeeahOeUqOaItyBcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBtYXRjaGluZyA9IHBhdHRlcm4uZXhlYyhyZXBseUNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKG1hdGNoaW5nKSB7XG4gICAgICAgICAgICAgIF9yZXBseVVzZXIucHVzaChtYXRjaGluZ1sxXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChtYXRjaGluZyAhPT0gbnVsbClcblxuICAgICAgICAgIGlmICgoX2Zsb29yT3duZXIgPT09IGZsb29yT3duZXIgJiYgX3JlcGx5VXNlci5pbmNsdWRlcyhyZXBseVVzZXIpKSB8fFxuICAgICAgICAgICAgICAoX2Zsb29yT3duZXIgPT09IHJlcGx5VXNlciAmJiBfcmVwbHlVc2VyLmluY2x1ZGVzKGZsb29yT3duZXIpKSkge1xuICAgICAgICAgICAgY29udmVyc2F0aW9ucy5wdXNoKHtmcm9tOiBfZmxvb3JPd25lciwgcmVwbHlDb250ZW50LCBhdmF0YXJzVXJsfSlcbiAgICAgICAgICB9IFxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5Y2V57qv55qE5Zue5aSN5qW85bGC77yI5Zue5aSN5Lit5rKh5pyJIEDvvIlcbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgaWYgKCggX2Zsb29yT3duZXIgPT09IGZsb29yT3duZXIpIHx8XG4gICAgICAgICAgICAgIChfZmxvb3JPd25lciA9PT0gcmVwbHlVc2VyKSkge1xuICAgICAgICAgICAgY29udmVyc2F0aW9ucy5wdXNoKHtmcm9tOiBfZmxvb3JPd25lciwgcmVwbHlDb250ZW50LCBhdmF0YXJzVXJsfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHNlbmRSZXNwb25zZSh7Y29udmVyc2F0aW9uczogY29udmVyc2F0aW9uc30pXG4gICAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYmFja2dyb3VuZC1zY3JpcHRzL2NoZWNrQ29udmVyc2F0aW9uLmpzIiwiLy8g5Li76aKY6LS05re75Yqg5Zu+54mHXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtZXNzYWdlLCBzZW5kUmVzcG9uc2UpIHtcbiAgLy8g5b6u5Y2a5Zu+5bqK5o6l5Y+jXG4gIGxldCBhcGkgPSAnaHR0cDovL3BpY3VwbG9hZC5zZXJ2aWNlLndlaWJvLmNvbS9pbnRlcmZhY2UvcGljX3VwbG9hZC5waHA/XFxcbiAgICBtaW1lPWltYWdlJTJGanBlZyZkYXRhPWJhc2U2NCZ1cmw9MCdcblxuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKVxuXG4gIC8vIHBvc3Qg55qE5pWw5o2u77yM5YC85Li65Zu+54mH55qEIGJhc2U2NCDnvJbnoIFcbiAgLy8g6ZyA6KaB5Y675o6J57G75Ly85YmN57yAIGBkYXRhOmltYWdlL2pwZWc7YmFzZTY0LGBcbiAgZGF0YS5hcHBlbmQoJ2I2NF9kYXRhJywgbWVzc2FnZS5kYXRhVVJMKVxuXG4gIHhoci5vbmVycm9yID0gKCkgPT4ge30gLy8gdG9kb1xuXG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSAvXCJwaWRcIjpcIiguKylcIi9cbiAgICAgIGxldCBkYXRhID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgbGV0IGltZ1VybFByZWZpeCA9ICdodHRwczovL3dzMi5zaW5haW1nLmNuL2xhcmdlLydcbiAgICAgIGxldCBwaWQgPSBkYXRhLm1hdGNoKHBhdHRlcm4pWzFdXG5cbiAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgIHN0YXR1czogMCwgLy8gc3VjY2Vzc1xuICAgICAgICBpbWdVcmw6IGltZ1VybFByZWZpeCArIHBpZFxuICAgICAgfSlcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgc3RhdHVzOiAxIC8vIHVubG9naW5cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgeGhyLm9wZW4oJ1BPU1QnLCBhcGkpXG4gIHhoci5zZW5kKGRhdGEpXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2JhY2tncm91bmQtc2NyaXB0cy91cGxvYWRJbWcuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjZmcpIHtcbiAgLy8gYWRkICBicm93c2VyQWN0aW9uIGxpc3RlbmVyXG4gIGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uZ2V0QmFkZ2VUZXh0KHt9LCByZXMgPT4ge1xuICAgICAgaWYgKGNmZy5jZmdfbm90aWZpY2F0aW9uc0ljb25TaG93TnVtICYmIHJlcyAhPT0gJycpIHtcbiAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiAnJ30pXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy52MmV4LmNvbS9ub3RpZmljYXRpb25zJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy52MmV4LmNvbScpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyB0b2RvXG4gIC8vIOW9k+iuv+mXriBodHRwczovL3d3dy52MmV4LmNvbS9ub3RpZmljYXRpb25zIOWQjlxuICAvLyDlpoLmnpwgaWNvbiDmnInmnKror7vmj5DphpLvvIzliJnlj5bmtohcblxuICBpZiAoIWNmZy5jZmdfbm90aWZpY2F0aW9uc1BvcHVwICYmICFjZmcuY2ZnX25vdGlmaWNhdGlvbnNJY29uU2hvd051bSkgcmV0dXJuIFxuXG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBmZXRjaCgnaHR0cHM6Ly93d3cudjJleC5jb20vJywge2NyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nfSkgLy8gY29va2llXG4gICAgICAudGhlbihyZXMgPT4gcmVzLnRleHQoKSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHAgPSAvKFxcZCspIOadoeacquivu+aPkOmGki9cbiAgICAgICAgY29uc3QgciA9IHAuZXhlYyhyZXMpXG5cbiAgICAgICAgaWYgKCFyIHx8IHJbMV0gPT09ICcwJykgcmV0dXJuXG5cbiAgICAgICAgaWYgKGNmZy5jZmdfbm90aWZpY2F0aW9uc1BvcHVwKSB7XG4gICAgICAgICAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgICAgIHR5cGU6ICdiYXNpYycsXG4gICAgICAgICAgICBpY29uVXJsOiAnaWNvbnMvaWNvbl80OC5wbmcnLFxuICAgICAgICAgICAgdGl0bGU6IGBmcm9tIFYyRVggSEVMUEVSJ3MgTm90aWZpY2F0aW9uYCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGDmgqjmnIkgJHtyWzFdfSDmnaHmnaXoh6ogVjJFWCDnmoTmlrDmtojmga/vvIFgLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChjZmcuY2ZnX25vdGlmaWNhdGlvbnNJY29uU2hvd051bSkge1xuICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogclsxXX0pO1xuICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtjb2xvcjogWzI1NSwgMCwgMCwgMjU1XX0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICB9LCAxMDAwICogMTAgKiA2MCkgLy8gZXZlcnkgMTAgbWluc1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9iYWNrZ3JvdW5kLXNjcmlwdHMvc2V0Tm90aWZpY2F0aW9ucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=