export function createSigmaElement():HTMLDivElement {
    
    // 1. 全体を囲む div.math-only.sigma を作成
    const sigmaDiv = document.createElement('div');
    sigmaDiv.className = 'math-only sigma';

    // 2. 積分記号 div.sigma__signal を作成
    const signalDiv = document.createElement('div');
    signalDiv.className = 'sigma__signal';
    // Unicode文字（&#x222B;）を直接テキストとして設定
    signalDiv.textContent = '&#x2211;'; 

    // 3. 積分範囲 div.sigma__range を作成
    const rangeDiv = document.createElement('div');
    rangeDiv.className = 'sigma__range';

    // 3a. 範囲上限 span.sigma__range__start を作成
    const startSpan = document.createElement('span');
    startSpan.className = 'sigma__range__start';
    startSpan.textContent = '□'; // '∞' を設定

    // 3b. 範囲下限 span.sigma__range__end を作成
    const endSpan = document.createElement('span');
    endSpan.className = 'sigma__range__end';
    endSpan.textContent = '□'; // '0' を設定

    // 4. 被積分関数 div.sigma__content を作成
    const contentDiv = document.createElement('div');
    contentDiv.className = 'sigma__content';
    contentDiv.textContent = '□'; // '3x + 52y' を設定

    // 5. 要素を階層的に組み立てる
    rangeDiv.appendChild(startSpan);
    rangeDiv.appendChild(endSpan);

    sigmaDiv.appendChild(signalDiv);
    sigmaDiv.appendChild(rangeDiv);
    sigmaDiv.appendChild(contentDiv);

    return sigmaDiv;
}