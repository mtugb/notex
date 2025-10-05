// editor-setup.ts
import { commands, maxEndsWithLength, type Command } from "./commands";
import { parseElmMap } from "./lib/elmMapper";

const editor = document.getElementById('editor') as HTMLDivElement;
// （使っているなら）残す：document.execCommand('defaultParagraphSeparator', false, 'p')

function findCommandAtEnd(text: string): { cmd: Command; match: RegExpMatchArray | null; lengthToDelete: number } | null {
    for (const cmd of commands) {
        if (cmd.type === 'endsWith') {
            if (text.endsWith(cmd.pattern)) {
                return { cmd, match: null, lengthToDelete: cmd.pattern.length };
            }
        } else {
            let patterns = [];
            if (cmd.pattern instanceof RegExp) {
                patterns = [cmd.pattern];
            } else {
                patterns = cmd.pattern;
            }
            for (const pattern of patterns) {
                const m = text.match(pattern);
                if (m) {
                    // 正規表現は必ず末尾 $ を推奨しているので m[0] の長さを削除
                    return { cmd, match: m, lengthToDelete: m[0].length };
                }
            }
        }
    }
    return null;
}

editor.onkeydown = (e: KeyboardEvent) => {
    // ---- Spaceでコマンド発火 ----
    if (e.key === ' ') {
        const sel = window.getSelection();
        if (!sel?.rangeCount) return;

        const range = sel.getRangeAt(0);
        if (!range.collapsed) return;

        const node = range.startContainer;
        if (node.nodeType !== Node.TEXT_NODE) return;

        // 直前テキストを取得（長すぎると重いので適度に切る）
        const data = (node as Text).data;
        const offset = range.startOffset;
        const lookBehind = Math.max(0, offset - Math.max(64, maxEndsWithLength(commands)));
        const head = data.slice(0, offset);
        const tail = head.slice(lookBehind); // 直前一部

        const found = findCommandAtEnd(tail);
        if (!found) return;

        // Spaceのデフォルトを止める（空白挿入を防ぐ）
        e.preventDefault();

        // 末尾から lengthToDelete ぶん削除
        const deleteStart = Math.max(0, offset - found.lengthToDelete);
        range.setStart(node, deleteStart);
        range.deleteContents();

        // ノード挿入
        const elmMap =
            found.cmd.type === 'endsWith'
                ? found.cmd.build(null)
                : found.cmd.build(found.match!);

        const elms = parseElmMap(elmMap);

        // 複数要素を順に差し込む（Range は最後に差し込まれた後に移動）
        for (const elm of elms) {
            range.insertNode(elm);
            // 挿入後、キャレットを直後に移動できるように末尾へ寄せる
            range.setStartAfter(elm);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    // ---- Enter（p を新規挿入して改行） ----
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const sel = window.getSelection();
        if (!sel) return;

        const range = sel.getRangeAt(0);
        // 新規 <p><br></p>
        const nextP = parseElmMap([{ tagName: 'p', children: [{ tagName: 'br' }] }])[0];
        if (!nextP) return;

        let target: Node | HTMLElement = range.startContainer;
        while (target.parentElement?.id !== 'editor') {
            if (!target.parentElement) return;
            target = target.parentElement;
        }
        if (target instanceof HTMLElement) {
            target.insertAdjacentElement('afterend', nextP);
            const newRange = document.createRange();
            newRange.setStart(nextP, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }

    // ---- Escape（span 改行を挿入？既存の動き維持）----
    if (e.key === 'Escape') {
        e.preventDefault();
        const sel = window.getSelection();
        if (!sel) return;
        const range = sel.getRangeAt(0);

        const brSpan = parseElmMap([{ tagName: 'span', children: [{ tagName: 'br' }] }])[0];
        if (!brSpan) return;

        let target: Node | HTMLElement = range.startContainer;
        while (target.parentElement?.parentElement?.id !== 'editor') {
            if (!target.parentElement) return;
            target = target.parentElement;
        }
        if (target instanceof HTMLElement) {
            target.insertAdjacentElement('afterend', brSpan);
            const newRange = document.createRange();
            newRange.setStart(brSpan, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }

    if (e.key === '-') {
        e.preventDefault();
        document.execCommand('insertText', false, '−');
    }

    if (e.altKey) {
        switch(e.key) {
            case "0":{
                document.execCommand('formatblock', false, 'p')
                break;
            }
            case "1":{
                document.execCommand('formatblock', false, 'h1')
                break;
            }
            case "2":{
                document.execCommand('formatblock', false, 'h2')
                break;
            }
            case "3":{
                document.execCommand('formatblock', false, 'h3')
                break;
            }
        }
    }
};
