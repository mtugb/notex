export function createIntegralElement():HTMLDivElement {
    
    // 1. 全体を囲む div.math-only.integral を作成
    const integralDiv = document.createElement('div');
    integralDiv.className = 'math-only integral';

    // 2. 積分記号 div.integral__signal を作成
    const signalDiv = document.createElement('div');
    signalDiv.className = 'integral__signal';
    // Unicode文字（&#x222B;）を直接テキストとして設定
    signalDiv.textContent = '∫'; 

    // 3. 積分範囲 div.integral__range を作成
    const rangeDiv = document.createElement('div');
    rangeDiv.className = 'integral__range';

    // 3a. 範囲上限 span.integral__range__start を作成
    const startSpan = document.createElement('div');
    startSpan.className = 'integral__range__start blank';
    // startSpan.textContent = '□'; // '∞' を設定

    // 3b. 範囲下限 span.integral__range__end を作成
    const endSpan = document.createElement('div');
    endSpan.className = 'integral__range__end blank';
    // endSpan.textContent = '□'; // '0' を設定

    // 4. 被積分関数 div.integral__content を作成
    const contentDiv = document.createElement('div');
    contentDiv.className = 'integral__content blank';
    // contentDiv.textContent = '□'; // '3x + 52y' を設定

    // 5. 要素を階層的に組み立てる
    rangeDiv.appendChild(startSpan);
    rangeDiv.appendChild(endSpan);

    integralDiv.appendChild(signalDiv);
    integralDiv.appendChild(rangeDiv);
    integralDiv.appendChild(contentDiv);

    return integralDiv;
}