export type NoteDoc = {
    id: string;
    title: string;
    html: string;
    updatedAt: string;
    version: number;
};
export declare const Storage: {
    load(id: string): NoteDoc | null;
    save(doc: NoteDoc): void;
    list(): Array<{
        id: string;
        title: string;
        updatedAt: string;
    }>;
};
//# sourceMappingURL=strage.d.ts.map