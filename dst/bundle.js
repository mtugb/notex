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

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands */ \"./src/commands.ts\");\n/* harmony import */ var _lib_elmMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/elmMapper */ \"./src/lib/elmMapper.ts\");\n/* harmony import */ var _lib_genToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/genToken */ \"./src/lib/genToken.ts\");\n/* harmony import */ var _lib_strage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/strage */ \"./src/lib/strage.ts\");\n// editor-setup.ts\n\n\n\n\nconst editor = document.getElementById('editor');\nlet currentNoteId = (0,_lib_genToken__WEBPACK_IMPORTED_MODULE_2__.genToken)();\n// （使っているなら）残す：document.execCommand('defaultParagraphSeparator', false, 'p')\nfunction findCommandAtEnd(text) {\n    for (const cmd of _commands__WEBPACK_IMPORTED_MODULE_0__.commands) {\n        if (cmd.type === 'endsWith') {\n            if (text.endsWith(cmd.pattern)) {\n                return { cmd, match: null, lengthToDelete: cmd.pattern.length };\n            }\n        }\n        else {\n            let patterns = [];\n            if (cmd.pattern instanceof RegExp) {\n                patterns = [cmd.pattern];\n            }\n            else {\n                patterns = cmd.pattern;\n            }\n            for (const pattern of patterns) {\n                const m = text.match(pattern);\n                if (m) {\n                    // 正規表現は必ず末尾 $ を推奨しているので m[0] の長さを削除\n                    return { cmd, match: m, lengthToDelete: m[0].length };\n                }\n            }\n        }\n    }\n    return null;\n}\neditor.onkeydown = (e) => {\n    // ---- Spaceでコマンド発火 ----\n    if (e.key === ' ') {\n        const sel = window.getSelection();\n        if (!sel?.rangeCount)\n            return;\n        const range = sel.getRangeAt(0);\n        if (!range.collapsed)\n            return;\n        const node = range.startContainer;\n        if (node.nodeType !== Node.TEXT_NODE)\n            return;\n        // 直前テキストを取得（長すぎると重いので適度に切る）\n        const data = node.data;\n        const offset = range.startOffset;\n        const lookBehind = Math.max(0, offset - Math.max(64, (0,_commands__WEBPACK_IMPORTED_MODULE_0__.maxEndsWithLength)(_commands__WEBPACK_IMPORTED_MODULE_0__.commands)));\n        const head = data.slice(0, offset);\n        const tail = head.slice(lookBehind); // 直前一部\n        const found = findCommandAtEnd(tail);\n        if (!found)\n            return;\n        // Spaceのデフォルトを止める（空白挿入を防ぐ）\n        e.preventDefault();\n        // 末尾から lengthToDelete ぶん削除\n        const deleteStart = Math.max(0, offset - found.lengthToDelete);\n        range.setStart(node, deleteStart);\n        range.deleteContents();\n        // ノード挿入\n        const elmMap = found.cmd.type === 'endsWith'\n            ? found.cmd.build(null)\n            : found.cmd.build(found.match);\n        const elms = (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_1__.parseElmMap)(elmMap);\n        // 複数要素を順に差し込む（Range は最後に差し込まれた後に移動）\n        for (const elm of elms) {\n            range.insertNode(elm);\n            // 挿入後、キャレットを直後に移動できるように末尾へ寄せる\n            range.setStartAfter(elm);\n            range.collapse(true);\n            sel.removeAllRanges();\n            sel.addRange(range);\n        }\n    }\n    // ---- Enter（p を新規挿入して改行） ----\n    if (e.key === 'Enter' && !e.shiftKey) {\n        e.preventDefault();\n        const sel = window.getSelection();\n        if (!sel)\n            return;\n        const range = sel.getRangeAt(0);\n        // 新規 <p><br></p>\n        const nextP = (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_1__.parseElmMap)([{ tagName: 'p', children: [{ tagName: 'br' }] }])[0];\n        if (!nextP)\n            return;\n        let target = range.startContainer;\n        while (target.parentElement?.id !== 'editor') {\n            if (!target.parentElement)\n                return;\n            target = target.parentElement;\n        }\n        if (target instanceof HTMLElement) {\n            target.insertAdjacentElement('afterend', nextP);\n            const newRange = document.createRange();\n            newRange.setStart(nextP, 0);\n            newRange.collapse(true);\n            sel.removeAllRanges();\n            sel.addRange(newRange);\n        }\n    }\n    // ---- Escape（span 改行を挿入？既存の動き維持）----\n    if (e.key === 'Escape') {\n        e.preventDefault();\n        const sel = window.getSelection();\n        if (!sel)\n            return;\n        const range = sel.getRangeAt(0);\n        const brSpan = (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_1__.parseElmMap)([{ tagName: 'span', children: [{ tagName: 'br' }] }])[0];\n        if (!brSpan)\n            return;\n        let target = range.startContainer;\n        while (target.parentElement?.parentElement?.id !== 'editor') {\n            if (!target.parentElement)\n                return;\n            target = target.parentElement;\n        }\n        if (target instanceof HTMLElement) {\n            target.insertAdjacentElement('afterend', brSpan);\n            const newRange = document.createRange();\n            newRange.setStart(brSpan, 0);\n            newRange.collapse(true);\n            sel.removeAllRanges();\n            sel.addRange(newRange);\n        }\n    }\n    if (e.key === '-') {\n        e.preventDefault();\n        document.execCommand('insertText', false, '−');\n    }\n    if (e.altKey) {\n        switch (e.key) {\n            case \"0\": {\n                document.execCommand('formatblock', false, 'p');\n                break;\n            }\n            case \"1\": {\n                document.execCommand('formatblock', false, 'h1');\n                break;\n            }\n            case \"2\": {\n                document.execCommand('formatblock', false, 'h2');\n                break;\n            }\n            case \"3\": {\n                document.execCommand('formatblock', false, 'h3');\n                break;\n            }\n        }\n    }\n};\nconst savesListArea = document.getElementById('saves');\nfunction loadNotes() {\n    if (savesListArea) {\n        const saves = _lib_strage__WEBPACK_IMPORTED_MODULE_3__.Storage.list();\n        console.log({ currentNoteId, id: saves.map(s => s.id) });\n        const savesElmMap = saves.map(save => ({\n            tagName: 'div',\n            attributes: {\n                'onclick': 'loadNote(\"' + save.id + '\")'\n            },\n            textContent: `${save.title}`,\n            class: (currentNoteId === save.id ? 'here' : '') + ' sidebar__btn',\n            children: [\n                {\n                    tagName: 'small',\n                    textContent: save.updatedAt\n                }\n            ]\n        }));\n        const savesElms = (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_1__.parseElmMap)(savesElmMap);\n        savesListArea.innerHTML = '';\n        for (const savedElm of savesElms) {\n            savesListArea.appendChild(savedElm);\n        }\n    }\n}\nloadNotes();\nfunction saveNote() {\n    _lib_strage__WEBPACK_IMPORTED_MODULE_3__.Storage.save({\n        id: currentNoteId,\n        html: editor.innerHTML,\n        title: document.getElementById('title')?.textContent ?? '',\n        updatedAt: new Date().toISOString(),\n        version: 0\n    });\n    alert('ノートを保存しました');\n    loadNotes();\n}\nconst saveBtn = document.getElementById('saveBtn');\nif (saveBtn)\n    saveBtn.onclick = saveNote;\n// @ts-ignore\nwindow.loadNote = function (id) {\n    const data = _lib_strage__WEBPACK_IMPORTED_MODULE_3__.Storage.load(id);\n    if (data) {\n        currentNoteId = data.id;\n        editor.innerHTML = data.html;\n        alert(`ノート「${data.title}」を読み込みました`);\n        loadNotes();\n    }\n    else {\n        alert('読み込みエラー');\n    }\n};\n\n\n//# sourceURL=webpack://notex/./src/app.ts?\n}");

/***/ }),

/***/ "./src/commands.ts":
/*!*************************!*\
  !*** ./src/commands.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   commands: () => (/* binding */ commands),\n/* harmony export */   maxEndsWithLength: () => (/* binding */ maxEndsWithLength)\n/* harmony export */ });\n/* harmony import */ var _elmMaps_integral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elmMaps/integral */ \"./src/elmMaps/integral.ts\");\n/* harmony import */ var _elmMaps_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elmMaps/matrix */ \"./src/elmMaps/matrix.ts\");\n/* harmony import */ var _elmMaps_sigma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elmMaps/sigma */ \"./src/elmMaps/sigma.ts\");\n/* harmony import */ var _elmMaps_sqrt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elmMaps/sqrt */ \"./src/elmMaps/sqrt.ts\");\n/* harmony import */ var _lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/elmMapper */ \"./src/lib/elmMapper.ts\");\n// commands.ts\n\n\n\n\n\n// ここで優先順（前から順に判定）\nconst commands = [\n    {\n        type: 'endsWith',\n        pattern: '\\\\span',\n        build: () => [\n            {\n                tagName: 'span',\n                textContent: 'something1',\n                class: 'spmeclass',\n            },\n            {\n                tagName: 'span',\n                textContent: 'something2',\n                class: 'spmeclass',\n            }\n        ]\n    },\n    {\n        // 末尾の「a/b」「3/2」などを分数ノードに変換\n        type: 'regexp',\n        pattern: [\n            /([A-Za-z0-9]+)\\/([A-Za-z0-9]+)\\s*$/,\n            /\\(([A-Za-z0-9\\-\\+ ]+)\\)\\/(\\([A-Za-z0-9\\-\\+ ]+\\))\\s*$/,\n            /\\(([A-Za-z0-9\\-\\+ ]+)\\)\\/([A-Za-z0-9\\-\\+ ]+)\\s*$/,\n            /([A-Za-z0-9\\-\\+ ]+)\\/\\(([A-Za-z0-9\\-\\+ ]+)\\)\\s*$/,\n        ],\n        build: (m) => {\n            const numerator = m[1];\n            const denominator = m[2];\n            return [{\n                    tagName: 'div',\n                    class: 'math-only fraction',\n                    children: [\n                        { tagName: 'div', class: 'fraction__top', contenteditable: true, textContent: numerator ?? '' },\n                        { tagName: 'div', class: 'fraction__bottom', contenteditable: true, textContent: denominator ?? '' },\n                    ]\n                },\n                {\n                    tagName: 'br'\n                }\n            ];\n        }\n    },\n    {\n        // sup\n        type: 'regexp',\n        pattern: [\n            /\\^([A-Za-z0-9]+)\\s*$/,\n            /\\^(\\([A-Za-z0-9\\-\\+ ]+\\))\\s*$/\n        ],\n        build: (m) => {\n            const numerator = m[1];\n            return [{\n                    tagName: 'sup',\n                    class: 'math-only',\n                    textContent: numerator ?? ''\n                },\n                {\n                    tagName: 'div',\n                    class: 'blank'\n                }\n            ];\n        }\n    },\n    {\n        // sup\n        type: 'regexp',\n        pattern: [\n            /\\_([A-Za-z0-9]+)\\s*$/,\n            /\\_(\\([A-Za-z0-9\\-\\+ ]+\\))\\s*$/\n        ],\n        build: (m) => {\n            const numerator = m[1];\n            return [{\n                    tagName: 'sub',\n                    class: 'math-only',\n                    textContent: numerator ?? ''\n                },\n                {\n                    tagName: 'div',\n                    class: 'blank',\n                    // textContent: '\\u200B'\n                }\n            ];\n        }\n    },\n    {\n        // スラッシュ単体で分数の空枠を出す（既存と同等）\n        type: 'endsWith',\n        pattern: '\\\\',\n        build: () => [{\n                tagName: 'div',\n                class: 'math-only fraction',\n                children: [\n                    { tagName: 'div', class: 'fraction__top blank', contenteditable: true },\n                    { tagName: 'div', class: 'fraction__bottom blank', contenteditable: true },\n                ]\n            }, {\n                tagName: 'br'\n            }]\n    },\n    {\n        // 既存の積分（/int）\n        type: 'endsWith',\n        pattern: '\\\\int',\n        build: () => _elmMaps_integral__WEBPACK_IMPORTED_MODULE_0__.integralElmMap\n    },\n    {\n        // 既存の積分（/int）\n        type: 'endsWith',\n        pattern: '\\\\sigma',\n        build: () => _elmMaps_sigma__WEBPACK_IMPORTED_MODULE_2__.sigmaElmMap\n    },\n    { type: 'endsWith', pattern: '\\\\sqrt', build: () => _elmMaps_sqrt__WEBPACK_IMPORTED_MODULE_3__.sqrtElmMap },\n    { type: 'endsWith', pattern: '\\\\mat', build: () => _elmMaps_matrix__WEBPACK_IMPORTED_MODULE_1__.matrixElmMap },\n    // ----------------------------------------------------\n    // 3. 単一記号 (EndsWith) - 優先度最低\n    // ----------------------------------------------------\n    // 論理\n    { type: 'endsWith', pattern: '\\\\imp', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('⇒') },\n    { type: 'endsWith', pattern: '\\\\iff', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('⟺') },\n    // 集合\n    { type: 'endsWith', pattern: '\\\\in', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('∈') },\n    { type: 'endsWith', pattern: '\\\\notin', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('∉') },\n    { type: 'endsWith', pattern: '\\\\sub', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('⊂') },\n    { type: 'endsWith', pattern: '\\\\cap', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('∩') },\n    { type: 'endsWith', pattern: '\\\\cup', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('∪') },\n    // ギリシャ文字\n    { type: 'endsWith', pattern: '\\\\pi', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('π') },\n    { type: 'endsWith', pattern: '\\\\alpha', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('α') },\n    { type: 'endsWith', pattern: '\\\\a', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('α') },\n    { type: 'endsWith', pattern: '\\\\beta', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('β') },\n    { type: 'endsWith', pattern: '\\\\b', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('β') },\n    { type: 'endsWith', pattern: '\\\\gamma', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('γ') },\n    { type: 'endsWith', pattern: '\\\\c', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('γ') },\n    { type: 'endsWith', pattern: '\\\\theta', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('θ') },\n    { type: 'endsWith', pattern: '\\\\t', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('θ') },\n    // その他\n    { type: 'endsWith', pattern: '\\\\pm', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('±') },\n    { type: 'endsWith', pattern: '\\\\inf', build: () => (0,_lib_elmMapper__WEBPACK_IMPORTED_MODULE_4__.createTextElmMap)('∞') },\n];\nfunction maxEndsWithLength(cmds) {\n    return Math.max(1, ...cmds\n        .filter(c => c.type === 'endsWith')\n        .map(c => c.pattern.length));\n}\n\n\n//# sourceURL=webpack://notex/./src/commands.ts?\n}");

/***/ }),

/***/ "./src/elmMaps/integral.ts":
/*!*********************************!*\
  !*** ./src/elmMaps/integral.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   integralElmMap: () => (/* binding */ integralElmMap)\n/* harmony export */ });\nconst integralElmMap = [{\n        // 全体を囲むコンテナ (div.math-only.integral)\n        tagName: 'div',\n        class: 'math-only integral',\n        children: [\n            {\n                tagName: 'span',\n                textContent: '　'\n            },\n            // 積分記号 (div.integral__signal)\n            {\n                tagName: 'div',\n                class: 'integral__signal',\n                textContent: '∫', // Unicodeの積分記号\n                contenteditable: false\n            },\n            // 積分範囲コンテナ (div.integral__range)\n            {\n                tagName: 'div',\n                class: 'integral__range',\n                children: [\n                    // 範囲上限 (span.integral__range__start)\n                    {\n                        tagName: 'span',\n                        class: 'integral__range__start blank',\n                        contenteditable: true,\n                        // カーソルを配置し、高さを確保するための <br>\n                        // children: [{ tagName: 'br' }] \n                    },\n                    // 範囲下限 (span.integral__range__end)\n                    {\n                        tagName: 'span',\n                        class: 'integral__range__end blank',\n                        contenteditable: true,\n                        // カーソルを配置し、高さを確保するための <br>\n                        // children: [{ tagName: 'br' }]\n                    },\n                ]\n            },\n            // 被積分関数 (div.integral__content)\n            {\n                tagName: 'div',\n                class: 'integral__content blank',\n                contenteditable: true,\n                focus: true\n                // カーソルを配置し、高さを確保するための <br>\n                // children: [{ tagName: 'br' }]\n            },\n        ]\n    },\n    {\n        tagName: 'br'\n    }\n];\n\n\n//# sourceURL=webpack://notex/./src/elmMaps/integral.ts?\n}");

/***/ }),

/***/ "./src/elmMaps/matrix.ts":
/*!*******************************!*\
  !*** ./src/elmMaps/matrix.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   matrixElmMap: () => (/* binding */ matrixElmMap)\n/* harmony export */ });\nconst matrixElmMap = [{\n        tagName: 'div',\n        class: 'math-only matrix',\n        children: [\n            // 括弧（左）- デザインに応じて 'span' を使用\n            { tagName: 'span', class: 'matrix__bracket matrix__bracket--left', textContent: '[' },\n            // 行列のセルを配置するグリッドコンテナ\n            {\n                tagName: 'div',\n                class: 'matrix__grid',\n                children: [\n                    // 1行目\n                    { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },\n                    { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },\n                    // 2行目\n                    { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },\n                    { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },\n                ]\n            },\n            // 括弧（右）\n            { tagName: 'span', class: 'matrix__bracket matrix__bracket--right', textContent: ']' },\n        ]\n    }];\n// 🚨 CSSヒント: .matrix__grid には、 'display: grid; grid-template-columns: repeat(2, 1fr);' を設定する必要があります。\n\n\n//# sourceURL=webpack://notex/./src/elmMaps/matrix.ts?\n}");

/***/ }),

/***/ "./src/elmMaps/sigma.ts":
/*!******************************!*\
  !*** ./src/elmMaps/sigma.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sigmaElmMap: () => (/* binding */ sigmaElmMap)\n/* harmony export */ });\n// ElmMapItem の型定義は省略（前回の回答で定義済み）\nconst sigmaElmMap = [{\n        // 全体を囲むコンテナ (div.math-only.sigma)\n        tagName: 'div',\n        class: 'math-only sigma',\n        children: [\n            // シグマ記号 (div.sigma__signal)\n            {\n                tagName: 'div',\n                class: 'sigma__signal',\n                textContent: '∑' // Unicode: N-ary summation (&#x2211;)\n            },\n            // 範囲コンテナ (div.sigma__range)\n            // シグマ記号の上下に範囲を配置する役割\n            {\n                tagName: 'div',\n                class: 'sigma__range',\n                children: [\n                    // 範囲上限（span.sigma__range__start）\n                    {\n                        tagName: 'span',\n                        class: 'sigma__range__start blank',\n                        contenteditable: true,\n                        // children: [{ tagName: 'br' }] // カーソル配置用\n                    },\n                    // 範囲下限（span.sigma__range__end）\n                    {\n                        tagName: 'span',\n                        class: 'sigma__range__end blank',\n                        contenteditable: true,\n                        // children: [{ tagName: 'br' }] // カーソル配置用\n                    },\n                ]\n            },\n            // 被総和関数 (div.sigma__content)\n            {\n                tagName: 'div',\n                class: 'sigma__content blank',\n                contenteditable: true,\n                children: [{ tagName: 'br' }]\n            },\n        ]\n    }];\n\n\n//# sourceURL=webpack://notex/./src/elmMaps/sigma.ts?\n}");

/***/ }),

/***/ "./src/elmMaps/sqrt.ts":
/*!*****************************!*\
  !*** ./src/elmMaps/sqrt.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sqrtElmMap: () => (/* binding */ sqrtElmMap)\n/* harmony export */ });\nconst sqrtElmMap = [{\n        // 全体を囲むコンテナを <div> から <span> に変更し、インラインでの使用に対応\n        tagName: 'span',\n        class: 'math-only sqrt',\n        children: [\n            // 1. n乗根の n （インデックス）\n            // {\n            //     tagName: 'span',\n            //     class: 'sqrt__index blank',\n            //     contenteditable: true,\n            //     children: [{ tagName: 'br' }] // カーソル配置用\n            // },\n            // 2. ルート記号部分 (U+221A)\n            {\n                tagName: 'span',\n                class: 'sqrt__symbol',\n                textContent: '√',\n            },\n            // 3. 編集可能部分（ルートの中身）\n            {\n                tagName: 'span', // <div>から<span>に変更し、インラインを維持\n                class: 'sqrt__content blank',\n                contenteditable: true,\n                focus: true\n            },\n        ]\n    },\n    { tagName: 'br' }\n];\n\n\n//# sourceURL=webpack://notex/./src/elmMaps/sqrt.ts?\n}");

/***/ }),

/***/ "./src/lib/elmMapper.ts":
/*!******************************!*\
  !*** ./src/lib/elmMapper.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTextElmMap: () => (/* binding */ createTextElmMap),\n/* harmony export */   parseElmMap: () => (/* binding */ parseElmMap)\n/* harmony export */ });\nconst elmMap1 = [{\n        tagName: 'div',\n        class: 'something',\n        children: [\n            {\n                tagName: 'div',\n                class: 'another-thing',\n                textContent: 'Hello' // 例としてテキストを追加\n            }\n        ]\n    }];\n/**\n * 要素マップの配列からDOM要素の配列を再帰的に生成する関数\n * @param elmMap 要素マップの配列\n * @returns 生成されたHTMLElementの配列\n */\nfunction parseElmMap(elmMap) {\n    const elms = [];\n    elmMap.forEach(elm => {\n        // 1. 要素の作成\n        const newElm = document.createElement(elm.tagName);\n        // 2. クラス名の設定\n        // 💡 修正点: `className`プロパティに直接文字列を代入します。\n        // `classList.add()`を使う場合は、elm.classに複数のクラスが含まれていないか注意が必要です。\n        if (elm.class) {\n            newElm.className = elm.class;\n        }\n        // 3. テキストコンテンツの設定\n        if (elm.textContent) {\n            newElm.textContent = elm.textContent;\n        }\n        // 4. その他の属性の設定 (例: contenteditable)\n        if (elm.attributes) {\n            for (const key in elm.attributes) {\n                newElm.setAttribute(key, elm.attributes[key] ?? '');\n            }\n        }\n        if (elm.contenteditable !== undefined) {\n            newElm.setAttribute('contenteditable', elm.contenteditable.toString());\n        }\n        // 5. 子要素の再帰的な処理と追加\n        if (elm.children) {\n            // 💡 修正点: 再帰呼び出しの結果はHTMLElementの配列なので、\n            // spread演算子またはforEachで一つずつ`appendChild`する必要があります。\n            const childElms = parseElmMap(elm.children);\n            childElms.forEach(child => newElm.appendChild(child));\n        }\n        if (elm.focus) {\n            const selection = document.getSelection();\n            selection?.removeAllRanges();\n            const newRange = document.createRange();\n            newRange.setStart(newElm, 0);\n            newRange.setEnd(newElm, 0);\n            setTimeout(() => {\n                selection?.addRange(newRange);\n            }, 300);\n        }\n        elms.push(newElm);\n    });\n    return elms;\n}\n// console.log(parseElmMap(elmMap1)); // 実行結果はDOM要素の配列\nconst createTextElmMap = (text) => [{\n        tagName: 'span',\n        class: 'math-symbol', // CSSでフォントを確実に適用するためにクラスを付与\n        textContent: text\n    }];\n\n\n//# sourceURL=webpack://notex/./src/lib/elmMapper.ts?\n}");

/***/ }),

/***/ "./src/lib/genToken.ts":
/*!*****************************!*\
  !*** ./src/lib/genToken.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   genToken: () => (/* binding */ genToken)\n/* harmony export */ });\nfunction genToken() {\n    // 使用する英数字を変数charに指定\n    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';\n    // 空文字列を用意\n    let randomStr = '';\n    // 用意した空文字列にランダムな英数字を格納（7桁）\n    for (let i = 0; i < 7; i++) {\n        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));\n    }\n    return randomStr;\n}\n\n\n//# sourceURL=webpack://notex/./src/lib/genToken.ts?\n}");

/***/ }),

/***/ "./src/lib/strage.ts":
/*!***************************!*\
  !*** ./src/lib/strage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Storage: () => (/* binding */ Storage)\n/* harmony export */ });\nconst DOC_KEY = (id) => `notex:doc:${id}`;\nconst INDEX_KEY = `notex:index`;\nconst Storage = {\n    load(id) {\n        const raw = localStorage.getItem(DOC_KEY(id));\n        if (!raw)\n            return null;\n        try {\n            return JSON.parse(raw);\n        }\n        catch {\n            return null;\n        }\n    },\n    save(doc) {\n        localStorage.setItem(DOC_KEY(doc.id), JSON.stringify(doc));\n        // 簡易インデックス（最近開いたノート管理）\n        const idx = JSON.parse(localStorage.getItem(INDEX_KEY) ?? `{}`);\n        idx[doc.id] = { title: doc.title, updatedAt: doc.updatedAt };\n        localStorage.setItem(INDEX_KEY, JSON.stringify(idx));\n    },\n    list() {\n        const idx = JSON.parse(localStorage.getItem(INDEX_KEY) ?? `{}`);\n        return Object.entries(idx)\n            .map(([id, v]) => ({ id, title: v.title, updatedAt: v.updatedAt }))\n            .sort((a, b) => b.updatedAt - a.updatedAt);\n    },\n};\n\n\n//# sourceURL=webpack://notex/./src/lib/strage.ts?\n}");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;