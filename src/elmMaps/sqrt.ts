import type { ElmMap } from "../lib/elmMapper";

export const sqrtElmMap: ElmMap = [{
    // 全体を囲むコンテナを <div> から <span> に変更し、インラインでの使用に対応
    tagName: 'span',
    class: 'math-only sqrt',
    children: [
        // 1. n乗根の n （インデックス）
        // {
        //     tagName: 'span',
        //     class: 'sqrt__index blank',
        //     contenteditable: true,
        //     children: [{ tagName: 'br' }] // カーソル配置用
        // },
        // 2. ルート記号部分 (U+221A)
        {
            tagName: 'span',
            class: 'sqrt__symbol',
            textContent: '√',
        },
        // 3. 編集可能部分（ルートの中身）
        {
            tagName: 'span', // <div>から<span>に変更し、インラインを維持
            class: 'sqrt__content blank',
            contenteditable: true,
            focus: true
        },
    ]
},
{ tagName: 'br' }
];