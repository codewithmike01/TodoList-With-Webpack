/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todolist-with-webpack/./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Starter)\n/* harmony export */ });\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/updateStatus.js */ \"./src/module/updateStatus.js\");\n/* harmony import */ var _module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/AddRemove.js */ \"./src/module/AddRemove.js\");\n\n// eslint-disable-next-line import/no-cycle\n\n\n\nconst TodoListObj = new _module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\nfunction Starter() {\n  const threeDots = document.querySelectorAll('li');\n  threeDots.forEach((dotValue, index) => {\n    const dot = dotValue.querySelector('.three__dots');\n    if (dot) {\n      const newDot = dot.cloneNode(true);\n      dotValue.replaceChild(newDot, dot);\n      newDot.addEventListener('click', () => {\n        (0,_module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__.editDescription)(dotValue, index, TodoListObj);\n        Starter();\n      });\n    }\n  });\n}\n\n_module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__.inputTodo.addEventListener('keypress', (e) => {\n  if (e.key === 'Enter') {\n    TodoListObj.addTodo();\n    (0,_module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);\n    Starter();\n  }\n});\n\n_module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__.clearComoleted.addEventListener('click', () => {\n  TodoListObj.removeList();\n  (0,_module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);\n  Starter();\n});\n\n(0,_module_AddRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);\nStarter();\n\n\n//# sourceURL=webpack://todolist-with-webpack/./src/index.js?");

/***/ }),

/***/ "./src/module/AddRemove.js":
/*!*********************************!*\
  !*** ./src/module/AddRemove.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearComoleted\": () => (/* binding */ clearComoleted),\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"editDescription\": () => (/* binding */ editDescription)\n/* harmony export */ });\nconst todoListContianer = document.querySelector('.todo__list');\nconst listConatiner = document.querySelector('.list__container');\nconst singleList = document.createElement('li');\nconst clearComoleted = document.querySelector('.clearMarked');\n\nfunction render(member, TodoListObj) {\n  todoListContianer.innerHTML = '';\n  member.forEach((list) => {\n    const check = list.completed ? 'checked' : null;\n    singleList.innerHTML = `\n    <div class=\"check\">\n      <input type=\"checkbox\" name=\"completed\" value=\"${list.index}\" ${check}  class=\"chBox\"/>\n      <p class=\"tagP\">${list.description}</p>\n    </div>\n    <div class=\"three__dots\">\n    </div>`;\n    todoListContianer.appendChild(singleList.cloneNode(true));\n    if (check === 'checked') {\n      const box = todoListContianer.querySelectorAll('.chBox');\n      box.forEach((value) => {\n        if (value.checked) {\n          value.nextElementSibling.classList.add('strike');\n        }\n      });\n    }\n    listConatiner.appendChild(todoListContianer);\n  });\n\n  // EventListner for CheckBox\n  const checkBox = document.querySelectorAll('.chBox');\n  let marked = false;\n  checkBox.forEach((content, index) => {\n    content.addEventListener('change', () => {\n      if (content.checked) {\n        marked = true;\n        TodoListObj.markList(content, index, marked);\n      } else {\n        marked = false;\n        TodoListObj.markList(content, index, marked);\n      }\n    });\n  });\n}\n\nfunction editDescription(dotValue, index, TodoListObj) {\n  const imageTrash = todoListContianer.querySelectorAll('li');\n  const parentImage = imageTrash[index];\n\n  const divTrash = document.createElement('div');\n  divTrash.classList.add('trash');\n  const divDot = document.createElement('div');\n  divDot.classList.add('three__dots');\n\n  if (document.querySelector('.color')) {\n    document.querySelector('.color').appendChild(divDot);\n    document.querySelector('.color .trash').remove();\n    document.querySelector('.color').classList.remove('color');\n  }\n\n  parentImage.appendChild(divTrash);\n  parentImage.classList.add('color');\n  imageTrash[index].querySelector('.three__dots').remove();\n  divTrash.addEventListener('click', () => {\n    const content = parentImage.querySelector('.tagP');\n    content.classList.add('strike');\n    TodoListObj.removeList();\n  });\n\n  const pDots = divTrash.parentNode.querySelector('.tagP');\n  pDots.contentEditable = true;\n  pDots.addEventListener('keyup', (e) => {\n    TodoListObj.editListWrite(pDots, index, e);\n  });\n}\n\n\n//# sourceURL=webpack://todolist-with-webpack/./src/module/AddRemove.js?");

/***/ }),

/***/ "./src/module/updateStatus.js":
/*!************************************!*\
  !*** ./src/module/updateStatus.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inputTodo\": () => (/* binding */ inputTodo),\n/* harmony export */   \"default\": () => (/* binding */ TodoList)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\nconst inputTodo = document.querySelector('.add__list');\n\nclass TodoList {\n  constructor() {\n    this.list = localStorage.getItem('todoList')\n      ? JSON.parse(localStorage.getItem('todoList'))\n      : [];\n  }\n\n  addTodo() {\n    const listLength = this.list.length;\n    if (inputTodo.value.trim() !== '') {\n      this.list.push({\n        description: inputTodo.value,\n        completed: false,\n        index: listLength,\n      });\n    }\n\n    this.reArrange();\n    localStorage.setItem('todoList', JSON.stringify(this.list));\n    inputTodo.value = '';\n  }\n\n  markList(content, index, marked) {\n    const p = content.parentNode.querySelector('.tagP');\n    const title = p.textContent;\n    if (marked === true) {\n      this.list = this.list.filter((item) => {\n        if (item.description === title) {\n          item.completed = true;\n          return item;\n        }\n        return item;\n      });\n      p.classList.add('strike');\n    } else {\n      this.list = this.list.filter((item) => {\n        if (item.description === title) {\n          item.completed = false;\n          return item;\n        }\n        return item;\n      });\n      p.classList.remove('strike');\n    }\n    const hold = this.list.filter((item) => item);\n    this.list = hold;\n    localStorage.setItem('todoList', JSON.stringify(this.list));\n  }\n\n  removeList() {\n    const strickers = document.querySelectorAll('.strike');\n    strickers.forEach((value) => {\n      const parentContainerLi = value.parentNode.parentNode;\n      parentContainerLi.style.display = 'none';\n      const title = parentContainerLi.querySelector('.tagP').textContent;\n      this.list = this.list.filter((value) => value.description !== title);\n    });\n\n    this.reArrange();\n    localStorage.setItem('todoList', JSON.stringify(this.list));\n  }\n\n  // SMALL UTILITIES\n\n  editListWrite(pDots, index, e) {\n    if (e.key === 'Enter') {\n      pDots.contentEditable = false;\n      document.querySelector('.color .trash').remove();\n      this.divDot = document.createElement('div');\n      this.divDot.classList.add('three__dots');\n      document.querySelector('.color').appendChild(this.divDot);\n      document.querySelector('.color').classList.remove('color');\n      const change = pDots.innerText;\n      pDots.innerText = change\n        .split('')\n        .splice(0, change.length - 2)\n        .join('');\n    }\n\n    this.list[index].description = pDots.innerText;\n    localStorage.setItem('todoList', JSON.stringify(this.list));\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  }\n\n  reArrange() {\n    this.list.forEach((value, index) => {\n      value.index = index + 1;\n    });\n  }\n}\n\n\n//# sourceURL=webpack://todolist-with-webpack/./src/module/updateStatus.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;