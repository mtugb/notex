export function genToken():string {
    // 使用する英数字を変数charに指定
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // 空文字列を用意
    let randomStr = '';

    // 用意した空文字列にランダムな英数字を格納（7桁）
    for (let i = 0; i < 7; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomStr;
}