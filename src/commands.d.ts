import { type ElmMap } from "./lib/elmMapper";
type EndsWithCommand = {
    type: 'endsWith';
    pattern: string;
    build: (match: null) => ElmMap;
};
type RegexpCommand = {
    type: 'regexp';
    pattern: RegExp | RegExp[];
    build: (match: RegExpMatchArray) => ElmMap;
};
export type Command = EndsWithCommand | RegexpCommand;
export declare const commands: Command[];
export declare function maxEndsWithLength(cmds: Command[]): number;
export {};
//# sourceMappingURL=commands.d.ts.map