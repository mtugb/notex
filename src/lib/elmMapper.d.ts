export type ElmMap = ElmMapItem[];
interface ElmMapItem {
    tagName: keyof HTMLElementTagNameMap | string;
    class?: string;
    textContent?: string;
    children?: ElmMapItem[];
    attributes?: Record<string, string>;
    contenteditable?: boolean;
    focus?: boolean;
}
/**
 * 要素マップの配列からDOM要素の配列を再帰的に生成する関数
 * @param elmMap 要素マップの配列
 * @returns 生成されたHTMLElementの配列
 */
export declare function parseElmMap(elmMap: ElmMapItem[]): HTMLElement[];
export declare const createTextElmMap: (text: string) => ElmMapItem[];
export {};
//# sourceMappingURL=elmMapper.d.ts.map