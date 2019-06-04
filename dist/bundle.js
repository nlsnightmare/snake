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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _food_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food.js */ \"./src/food.js\");\n/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ \"./src/context.js\");\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n\n\n\n\nfunction newFood() {\n    let x = Math.floor(Math.random() * 19);\n    let y = Math.floor(Math.random() * 19);\n    return new _food_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\n}\n\nlet now, last;\nlet dt;\n\nlet s;\nlet f;\n\nlet range = [0, 19];\nwindow.onload = () => {\n    s = new _snake_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0);\n    f = newFood();\n    last = performance.now();\n\n    requestAnimationFrame(Draw);\n};\n\ndocument.onkeydown = e => {\n    if (s.direction == 4) {\n        if (e.key != 'Enter') return;\n        s = new _snake_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0);\n        s.direction = 1;\n    }\n    if ((e.key == 'w' || e.key == 'ArrowUp') && s.direction != 2) s.turn(0);else if ((e.key == 'd' || e.key == 'ArrowRight') && s.direction != 3) s.turn(1);else if ((e.key == 's' || e.key == 'ArrowDown') && s.direction != 0) s.turn(2);else if ((e.key == 'a' || e.key == 'ArrowLeft') && s.direction != 1) s.turn(3);\n};\n\nfunction Draw() {\n    now = performance.now();\n    dt = now - last;\n    last = now;\n\n    _context_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].clear('black');\n    s.draw();\n    f.draw();\n\n    s.update(dt);\n    if (s.x == f.x && s.y == f.y) {\n        s.newTail();\n        f = newFood();\n    }\n\n    requestAnimationFrame(Draw);\n}\n\n//# sourceURL=webpack:///./src/code.js?");

/***/ }),

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst canvas = document.getElementById(\"canvas\");\nlet ctx = canvas.getContext('2d');\nctx.height = canvas.height;\nctx.width = canvas.width;\n\nctx.clear = clr => {\n    ctx.fillStyle = clr;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ctx);\n\n//# sourceURL=webpack:///./src/context.js?");

/***/ }),

/***/ "./src/food.js":
/*!*********************!*\
  !*** ./src/food.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Food; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\nclass Food {\n\t\t\tconstructor(x, y) {\n\t\t\t\t\t\tthis.size = 30;\n\n\t\t\t\t\t\tthis.x = x * this.size;\n\t\t\t\t\t\tthis.y = y * this.size;\n\t\t\t}\n\n\t\t\tdraw() {\n\t\t\t\t\t\t_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fillStyle = 'red';\n\t\t\t\t\t\t_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fillRect(this.x, this.y, this.size, this.size);\n\t\t\t}\n}\n\n//# sourceURL=webpack:///./src/food.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Snake; });\n/* harmony import */ var _tail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tail */ \"./src/tail.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\n\n\n\nlet delay = 80;\nclass Snake {\n\t\t\tconstructor(x, y) {\n\t\t\t\t\t\tthis.size = 30;\n\n\t\t\t\t\t\tthis.x = x * this.size;\n\t\t\t\t\t\tthis.y = y * this.size;\n\t\t\t\t\t\tthis.len = 3;\n\n\t\t\t\t\t\tthis.direction = 1;\n\n\t\t\t\t\t\tthis.timepassed = 0;\n\n\t\t\t\t\t\tthis.tail = [];\n\n\t\t\t\t\t\tfor (let i = 0; i < 3; i++) {\n\t\t\t\t\t\t\t\t\tthis.tail.push(new _tail__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.size));\n\t\t\t\t\t\t}\n\t\t\t}\n\n\t\t\tgetTailDirection() {\n\t\t\t\t\t\tlet t = this.tail[0];\n\t\t\t\t\t\tlet xdis = t.x - this.x;\n\t\t\t\t\t\tlet ydis = t.y - this.y;\n\t\t\t\t\t\tif (xdis > 0) {\n\t\t\t\t\t\t\t\t\treturn 3;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (xdis < 0) {\n\t\t\t\t\t\t\t\t\treturn 1;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (ydis > 0) {\n\t\t\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn 2;\n\t\t\t}\n\n\t\t\tturn(dir) {\n\t\t\t\t\t\tif (this.direction + dir % 2 == 0) {\n\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tthis.direction = dir;\n\t\t\t}\n\n\t\t\tupdate(dt) {\n\t\t\t\t\t\tthis.timepassed += dt;\n\t\t\t\t\t\tif (this.timepassed < delay) {\n\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tthis.timepassed = 0;\n\n\t\t\t\t\t\tfor (let i = this.tail.length - 1; i >= 1; i--) {\n\t\t\t\t\t\t\t\t\tlet thisTail = this.tail[i];\n\t\t\t\t\t\t\t\t\tlet prev = this.tail[i - 1];\n\n\t\t\t\t\t\t\t\t\tif (this.x == thisTail.x && this.y == thisTail.y) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.die();\n\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tthisTail.x = prev.x;\n\t\t\t\t\t\t\t\t\tthisTail.y = prev.y;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tthis.tail[0].x = this.x;\n\t\t\t\t\t\tthis.tail[0].y = this.y;\n\n\t\t\t\t\t\tswitch (this.direction) {\n\t\t\t\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t\t\t\t\t\tthis.y -= this.size;\n\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\tcase 1:\n\t\t\t\t\t\t\t\t\t\t\t\tthis.x += this.size;\n\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\t\t\t\t\t\tthis.y += this.size;\n\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\tcase 3:\n\t\t\t\t\t\t\t\t\t\t\t\tthis.x -= this.size;\n\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (this.x < 0 || this.y < 0 || this.x > _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].width || this.y > _context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].height) {\n\n\t\t\t\t\t\t\t\t\tconsole.log(this.x, this.y);\n\t\t\t\t\t\t\t\t\tthis.die();\n\t\t\t\t\t\t}\n\t\t\t}\n\n\t\t\tdie() {\n\t\t\t\t\t\tthis.direction = 4;\n\t\t\t\t\t\tconsole.log('im dead');\n\t\t\t}\n\n\t\t\tdraw() {\n\t\t\t\t\t\t//TODO add effect?\n\t\t\t\t\t\tif (this.direction != 4) {\n\t\t\t\t\t\t\t\t\tfor (let t of this.tail) {\n\t\t\t\t\t\t\t\t\t\t\t\tt.draw();\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fillStyle = 'white';\n\t\t\t\t\t\t\t\t\t_context__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fillRect(this.x, this.y, this.size, this.size);\n\t\t\t\t\t\t}\n\t\t\t}\n\n\t\t\tnewTail() {\n\t\t\t\t\t\tthis.tail.push(new _tail__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.size));\n\t\t\t}\n\n}\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ "./src/tail.js":
/*!*********************!*\
  !*** ./src/tail.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tail; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\n\nclass Tail {\n   constructor(size) {\n      this.size = size;\n   }\n   draw() {\n      _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fillStyle = 'darkgrey';\n      _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fillRect(this.x, this.y, this.size, this.size);\n   }\n}\n\n//# sourceURL=webpack:///./src/tail.js?");

/***/ })

/******/ });