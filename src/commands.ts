// commands.ts
import { integralElmMap } from "./elmMaps/integral";
import { matrixElmMap } from "./elmMaps/matrix";
import { sigmaElmMap } from "./elmMaps/sigma";
import { sqrtElmMap } from "./elmMaps/sqrt";
import { createTextElmMap, type ElmMap } from "./lib/elmMapper";

type EndsWithCommand = {
    type: 'endsWith';
    pattern: string;            // 末尾にこの文字列
    build: (match: null) => ElmMap;
};

type RegexpCommand = {
    type: 'regexp';
    pattern: RegExp | RegExp[];            // 末尾アンカー $ を推奨
    build: (match: RegExpMatchArray) => ElmMap;
};

export type Command = EndsWithCommand | RegexpCommand;

// ここで優先順（前から順に判定）
export const commands: Command[] = [
    {
        type: 'endsWith',
        pattern: '\\span',
        build: () => [
            {
                tagName: 'span',
                textContent: 'something1',
                class: 'spmeclass',
            },
            {
                tagName: 'span',
                textContent: 'something2',
                class: 'spmeclass',
            }
        ]
    },
    {
        // 末尾の「a/b」「3/2」などを分数ノードに変換
        type: 'regexp',
        pattern: [
            /([A-Za-z0-9]+)\/([A-Za-z0-9]+)\s*$/,
            /\(([A-Za-z0-9\-\+ ]+)\)\/(\([A-Za-z0-9\-\+ ]+\))\s*$/,
            /\(([A-Za-z0-9\-\+ ]+)\)\/([A-Za-z0-9\-\+ ]+)\s*$/,
            /([A-Za-z0-9\-\+ ]+)\/\(([A-Za-z0-9\-\+ ]+)\)\s*$/,
        ],
        build: (m) => {
            const numerator = m[1];
            const denominator = m[2];
            return [{
                tagName: 'div',
                class: 'math-only fraction',
                children: [
                    { tagName: 'div', class: 'fraction__top', contenteditable: true, textContent: numerator ?? '' },
                    { tagName: 'div', class: 'fraction__bottom', contenteditable: true, textContent: denominator ?? '' },
                ]
            },
            {
                tagName: 'br'
            }
            ] satisfies ElmMap;
        }
    },
    {
        // sup
        type: 'regexp',
        pattern: [
            /\^([A-Za-z0-9]+)\s*$/,
            /\^(\([A-Za-z0-9\-\+ ]+\))\s*$/
        ],
        build: (m) => {
            const numerator = m[1];
            return [{
                tagName: 'sup',
                class: 'math-only',
                textContent: numerator ?? ''
            },
            {
                tagName: 'div',
                class: 'blank'
            }
            ] satisfies ElmMap;
        }
    },
    {
        // sup
        type: 'regexp',
        pattern: [
            /\_([A-Za-z0-9]+)\s*$/,
            /\_(\([A-Za-z0-9\-\+ ]+\))\s*$/
        ],
        build: (m) => {
            const numerator = m[1];
            return [{
                tagName: 'sub',
                class: 'math-only',
                textContent: numerator ?? ''
            },
            {
                tagName: 'div',
                class: 'blank',
                // textContent: '\u200B'
            }
            ] satisfies ElmMap;
        }
    },
    {
        // スラッシュ単体で分数の空枠を出す（既存と同等）
        type: 'endsWith',
        pattern: '\\',
        build: () => [{
            tagName: 'div',
            class: 'math-only fraction',
            children: [
                { tagName: 'div', class: 'fraction__top blank', contenteditable: true },
                { tagName: 'div', class: 'fraction__bottom blank', contenteditable: true },
            ]
        }, {
            tagName: 'br'
        }]
    },
    {
        // 既存の積分（/int）
        type: 'endsWith',
        pattern: '\\int',
        build: () => integralElmMap
    },
    {
        // 既存の積分（/int）
        type: 'endsWith',
        pattern: '\\sigma',
        build: () => sigmaElmMap
    },
    { type: 'endsWith', pattern: '\\sqrt', build: () => sqrtElmMap },
    { type: 'endsWith', pattern: '\\mat', build: () => matrixElmMap },

    // ----------------------------------------------------
    // 3. 単一記号 (EndsWith) - 優先度最低
    // ----------------------------------------------------
    // 論理
    { type: 'endsWith', pattern: '\\imp', build: () => createTextElmMap('⇒') },
    { type: 'endsWith', pattern: '\\iff', build: () => createTextElmMap('⟺') },

    // 集合
    { type: 'endsWith', pattern: '\\in', build: () => createTextElmMap('∈') },
    { type: 'endsWith', pattern: '\\notin', build: () => createTextElmMap('∉') },
    { type: 'endsWith', pattern: '\\sub', build: () => createTextElmMap('⊂') },
    { type: 'endsWith', pattern: '\\cap', build: () => createTextElmMap('∩') },
    { type: 'endsWith', pattern: '\\cup', build: () => createTextElmMap('∪') },

    // ギリシャ文字
    { type: 'endsWith', pattern: '\\alpha', build: () => createTextElmMap('α') },
    { type: 'endsWith', pattern: '\\pi', build: () => createTextElmMap('π') },
    { type: 'endsWith', pattern: '\\theta', build: () => createTextElmMap('θ') },
    { type: 'endsWith', pattern: '\\t', build: () => createTextElmMap('θ') },

    // その他
    { type: 'endsWith', pattern: '\\pm', build: () => createTextElmMap('±') },
    { type: 'endsWith', pattern: '\\inf', build: () => createTextElmMap('∞') },

];

export function maxEndsWithLength(cmds: Command[]) {
    return Math.max(
        1,
        ...cmds
            .filter(c => c.type === 'endsWith')
            .map(c => (c as EndsWithCommand).pattern.length)
    );
}
