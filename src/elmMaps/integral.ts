import type { ElmMap } from "../lib/elmMapper";

export const integralElmMap: ElmMap = [{
    // 全体を囲むコンテナ (div.math-only.integral)
    tagName: 'div',
    class: 'math-only integral',
    children: [
        {
            tagName: 'span',
            textContent: '　'
        },
        // 積分記号 (div.integral__signal)
        {
            tagName: 'div',
            class: 'integral__signal',
            textContent: '∫', // Unicodeの積分記号
            contenteditable: false
        },

        // 積分範囲コンテナ (div.integral__range)
        {
            tagName: 'div',
            class: 'integral__range',
            children: [
                // 範囲上限 (span.integral__range__start)
                {
                    tagName: 'span',
                    class: 'integral__range__start blank',
                    contenteditable: true,
                    // カーソルを配置し、高さを確保するための <br>
                    // children: [{ tagName: 'br' }] 
                },
                // 範囲下限 (span.integral__range__end)
                {
                    tagName: 'span',
                    class: 'integral__range__end blank',
                    contenteditable: true,
                    // カーソルを配置し、高さを確保するための <br>
                    // children: [{ tagName: 'br' }]
                },
            ]
        },

        // 被積分関数 (div.integral__content)
        {
            tagName: 'div',
            class: 'integral__content blank',
            contenteditable: true,
            focus: true
            // カーソルを配置し、高さを確保するための <br>
            // children: [{ tagName: 'br' }]
        },
    ]
},
{
    tagName: 'br'
}
];