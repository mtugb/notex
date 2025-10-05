// インターフェースを定義して、要素マップの構造を明確にする
export type ElmMap = ElmMapItem[];

interface ElmMapItem {
    tagName: keyof HTMLElementTagNameMap | string; // 'div'や'span'など
    class?: string; // classは省略可能
    textContent?: string; // テキストノードを追加するためのプロパティ
    children?: ElmMapItem[]; // 子要素は再帰的にElmMapItemの配列
    // その他の属性を追加する場合はここに追加:
    attributes?: Record<string, string>;
    contenteditable?: boolean;
    focus?: boolean;
}

const elmMap1: ElmMap = [{
    tagName: 'div',
    class: 'something',
    children: [
        {
            tagName: 'div',
            class: 'another-thing',
            textContent: 'Hello' // 例としてテキストを追加
        }
    ]
}];

/**
 * 要素マップの配列からDOM要素の配列を再帰的に生成する関数
 * @param elmMap 要素マップの配列
 * @returns 生成されたHTMLElementの配列
 */
export function parseElmMap(elmMap: ElmMapItem[]): HTMLElement[] {
    const elms: HTMLElement[] = [];

    elmMap.forEach(elm => {
        // 1. 要素の作成
        const newElm = document.createElement(elm.tagName);

        // 2. クラス名の設定
        // 💡 修正点: `className`プロパティに直接文字列を代入します。
        // `classList.add()`を使う場合は、elm.classに複数のクラスが含まれていないか注意が必要です。
        if (elm.class) {
            newElm.className = elm.class;
        }

        // 3. テキストコンテンツの設定
        if (elm.textContent) {
            newElm.textContent = elm.textContent;
        }

        // 4. その他の属性の設定 (例: contenteditable)
        if (elm.attributes) {
            for (const key in elm.attributes) {
                newElm.setAttribute(key, elm.attributes[key] ?? '');
            }
        }
        if (elm.contenteditable !== undefined) {
            newElm.setAttribute('contenteditable', elm.contenteditable.toString());
        }

        // 5. 子要素の再帰的な処理と追加
        if (elm.children) {
            // 💡 修正点: 再帰呼び出しの結果はHTMLElementの配列なので、
            // spread演算子またはforEachで一つずつ`appendChild`する必要があります。
            const childElms = parseElmMap(elm.children);
            childElms.forEach(child => newElm.appendChild(child));
        }

        if (elm.focus) {
            const selection = document.getSelection();
            selection?.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStart(newElm, 0);
            newRange.setEnd(newElm, 0);
            setTimeout(() => {
                selection?.addRange(newRange);
            }, 300);
        }

        elms.push(newElm);
    });

    return elms;
}

// console.log(parseElmMap(elmMap1)); // 実行結果はDOM要素の配列

export const createTextElmMap = (text: string): ElmMapItem[] => [{
    tagName: 'span',
    class: 'math-symbol', // CSSでフォントを確実に適用するためにクラスを付与
    textContent: text
}];