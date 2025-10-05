// ElmMapItem の型定義は省略（前回の回答で定義済み）

import type { ElmMap } from "../lib/elmMapper";

export const sigmaElmMap: ElmMap = [{
    // 全体を囲むコンテナ (div.math-only.sigma)
    tagName: 'div',
    class: 'math-only sigma',
    children: [
        // シグマ記号 (div.sigma__signal)
        {
            tagName: 'div',
            class: 'sigma__signal',
            textContent: '∑' // Unicode: N-ary summation (&#x2211;)
        },
        
        // 範囲コンテナ (div.sigma__range)
        // シグマ記号の上下に範囲を配置する役割
        {
            tagName: 'div',
            class: 'sigma__range',
            children: [
                // 範囲上限（span.sigma__range__start）
                {
                    tagName: 'span',
                    class: 'sigma__range__start blank',
                    contenteditable: true,
                    // children: [{ tagName: 'br' }] // カーソル配置用
                },
                // 範囲下限（span.sigma__range__end）
                {
                    tagName: 'span',
                    class: 'sigma__range__end blank',
                    contenteditable: true,
                    // children: [{ tagName: 'br' }] // カーソル配置用
                },
            ]
        },
        
        // 被総和関数 (div.sigma__content)
        {
            tagName: 'div',
            class: 'sigma__content blank',
            contenteditable: true,
            children: [{ tagName: 'br' }]
        },
    ]
}];