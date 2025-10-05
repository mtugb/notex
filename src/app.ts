import { commands } from "./commands";

const editor = <HTMLDivElement>document.getElementById('editor');
editor.onkeydown = (e: KeyboardEvent) => {
    if (e.key === ' ') {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);

        // キャレットが折りたたまれている（選択範囲がない）ことを確認
        if (!range.collapsed) return;
        const textNode = range.startContainer;
        let text = '';

        // テキストノード内でキャレットの位置を確認
        if (textNode.nodeType === Node.TEXT_NODE) {
            // キャレットの直前5文字を取得
            const startOffset = Math.max(0, range.startOffset - 7);
            text = textNode.textContent ?? ''.substring(startOffset, range.startOffset);
            console.log({ text, yes: text.endsWith('/span') })
            //   const command = '/span';
            for (const command in commands) {
                if (text.endsWith(command)) {
                    // 5. スペースキーのデフォルト動作をキャンセル
                    e.preventDefault();
                    console.log('yes!')
                    // 6. コマンドを削除
                    // 削除範囲: テキストノードの (キャレット位置 - 5文字) から キャレット位置まで
                    range.setStart(textNode, range.startOffset - command.length);
                    range.deleteContents();

                    // 7. <span class="something">something</span> を挿入（前回の回答のロジック）
                    const newSpan = commands[command]?.getNode();

                    if (!newSpan) return;

                    range.insertNode(newSpan);

                    // 8. 挿入後のキャレット位置を調整
                    range.setStartAfter(newSpan);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    break;
                }
            }

        }
    }
}


function getMathSymbol(type: string) {

}