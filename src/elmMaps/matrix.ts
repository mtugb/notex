import type { ElmMap } from "../lib/elmMapper";

export const matrixElmMap: ElmMap = [{
    tagName: 'div',
    class: 'math-only matrix',
    children: [
        // 括弧（左）- デザインに応じて 'span' を使用
        { tagName: 'span', class: 'matrix__bracket matrix__bracket--left', textContent: '[' },
        
        // 行列のセルを配置するグリッドコンテナ
        {
            tagName: 'div',
            class: 'matrix__grid',
            children: [
                // 1行目
                { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },
                { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },
                // 2行目
                { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },
                { tagName: 'div', class: 'matrix__cell', contenteditable: true, children: [{ tagName: 'br' }] },
            ]
        },
        
        // 括弧（右）
        { tagName: 'span', class: 'matrix__bracket matrix__bracket--right', textContent: ']' },
    ]
}];

// 🚨 CSSヒント: .matrix__grid には、 'display: grid; grid-template-columns: repeat(2, 1fr);' を設定する必要があります。