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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const ROW_HEIGHT = 30;\r\nconst ROW_MARGIN = 10;\r\nconst SPREADSHEET_URL =\r\n  \"https://docs.google.com/spreadsheets/d/121-56BwZe8Cws0A8xE_cSGXc64YD_bBPfQM8o2YVnaM/edit?usp=sharing\";\r\n\r\nmiro.onReady(function() {\r\n  miro.initialize({\r\n    extensionPoints: {\r\n      bottomBar: {\r\n        title: \"Import data from spreadsheet\",\r\n        svgIcon:\r\n          '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"file-import\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M16 288c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h112v-64zm489-183L407.1 7c-4.5-4.5-10.6-7-17-7H384v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H152c-13.3 0-24 10.7-24 24v264h128v-65.2c0-14.3 17.3-21.4 27.4-11.3L379 308c6.6 6.7 6.6 17.4 0 24l-95.7 96.4c-10.1 10.1-27.4 3-27.4-11.3V352H128v136c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H376c-13.2 0-24-10.8-24-24z\"></path></svg>',\r\n        onClick: syncWithSheet\r\n      }\r\n    }\r\n  });\r\n});\r\n\r\nasync function syncWithSheet() {\r\n  const appId = await miro.getClientId();\r\n  const items = await Tabletop.init({\r\n    key: SPREADSHEET_URL,\r\n    simpleSheet: true\r\n  });\r\n  const viewport = await miro.board.viewport.get();\r\n  const maxWidth = Math.max(...items.map(item => item.rate)) * 2;\r\n\r\n  items.forEach(async ({ role, rate }, i) => {\r\n    rate = parseFloat(rate);\r\n\r\n    const shapes = (\r\n      await miro.board.widgets.get({\r\n        type: \"shape\"\r\n      })\r\n    ).filter(shape => !!shape.metadata[appId]);\r\n    const shape = shapes.find(shape => shape.metadata[appId].role === role);\r\n    const width = rate * 2;\r\n\r\n    if (shape) {\r\n      const x = shape.x - (shape.width - width) / 2;\r\n      miro.board.widgets.update([{ id: shape.id, text: `${rate}%`, width, x }]);\r\n    } else {\r\n      const x = viewport.x + viewport.width / 2 - (maxWidth - width) / 2;\r\n      const y = viewport.y + ROW_HEIGHT / 2 + (ROW_HEIGHT + ROW_MARGIN) * i;\r\n      miro.board.widgets.create({\r\n        type: \"shape\",\r\n        text: `${rate}%`,\r\n        width,\r\n        height: ROW_HEIGHT,\r\n        x,\r\n        y,\r\n        style: {\r\n          borderWidth: 0,\r\n          backgroundColor: \"#4262ff\",\r\n          fontSize: 8,\r\n          textAlign: \"c\",\r\n          textAlignVertical: \"m\",\r\n          textColor: \"#ffffff\"\r\n        },\r\n        metadata: {\r\n          [appId]: {\r\n            role\r\n          }\r\n        }\r\n      });\r\n      miro.board.widgets.create({\r\n        type: \"text\",\r\n        x: viewport.x + viewport.width / 2 - maxWidth - 110,\r\n        y,\r\n        width: 400,\r\n        style: {\r\n          textAlign: \"r\",\r\n          fontSize: 12\r\n        },\r\n        text: role,\r\n        metadata: {\r\n          [appId]: {\r\n            role\r\n          }\r\n        }\r\n      });\r\n    }\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });