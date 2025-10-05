// src/lib/storage.ts
export type NoteDoc = {
    id: string;
    title: string;
    html: string;
    updatedAt: string;
    version: number;
};
const DOC_KEY = (id: string) => `notex:doc:${id}`;
const INDEX_KEY = `notex:index`;

export const Storage = {
    load(id: string): NoteDoc | null {
        const raw = localStorage.getItem(DOC_KEY(id));
        if (!raw) return null;
        try { return JSON.parse(raw) as NoteDoc; } catch { return null; }
    },
    save(doc: NoteDoc) {
        localStorage.setItem(DOC_KEY(doc.id), JSON.stringify(doc));
        // 簡易インデックス（最近開いたノート管理）
        const idx: Record<string, { title: string; updatedAt: string }> =
            JSON.parse(localStorage.getItem(INDEX_KEY) ?? `{}`);
        idx[doc.id] = { title: doc.title, updatedAt: doc.updatedAt };
        localStorage.setItem(INDEX_KEY, JSON.stringify(idx));
    },
    list(): Array<{ id: string; title: string; updatedAt: string }> {
        const idx = JSON.parse(localStorage.getItem(INDEX_KEY) ?? `{}`);
        return Object.entries(idx)
            .map(([id, v]: any) => ({ id, title: v.title, updatedAt: v.updatedAt }))
            .sort((a, b) => b.updatedAt - a.updatedAt);
    },
};
