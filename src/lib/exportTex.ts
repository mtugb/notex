// src/lib/exportTex.ts
function escapeTex(s: string): string {
  // LaTeX特殊文字エスケープ
  return s.replace(/([\\{}_^#$%&~])/g, '\\$1');
}

function nodeText(n: Node): string {
  if (n.nodeType === Node.TEXT_NODE) return escapeTex((n as Text).data);
  if (!(n instanceof HTMLElement)) return '';
  return Array.from(n.childNodes).map(nodeText).join('');
}

function domToTex(el: Node): string {
  if (el.nodeType === Node.TEXT_NODE) return escapeTex((el as Text).data);
  if (!(el instanceof HTMLElement)) {
    return Array.from(el.childNodes).map(domToTex).join('');
  }

  const cls = el.classList;

  // ---- fraction ----
  if (cls.contains('fraction')) {
    const top = el.querySelector(':scope > .fraction__top') as HTMLElement | null;
    const bottom = el.querySelector(':scope > .fraction__bottom') as HTMLElement | null;
    const A = top ? domToTex(top) : '';
    const B = bottom ? domToTex(bottom) : '';
    return `\\frac{${A || '\\;'}}{${B || '\\;'}}`;
  }

  // ---- sqrt / n-th root ----
  if (cls.contains('sqrt')) {
    const idx = el.querySelector(':scope > .sqrt__index') as HTMLElement | null;
    const content = el.querySelector(':scope > .sqrt__content') as HTMLElement | null;
    const N = idx ? nodeText(idx).trim() : '';
    const X = content ? domToTex(content) : '';
    return N ? `\\sqrt[${N}]{${X}}` : `\\sqrt{${X}}`;
  }

  // ---- integral ----
  if (cls.contains('integral')) {
    const up = el.querySelector(':scope .integral__upper') as HTMLElement | null;
    const lo = el.querySelector(':scope .integral__lower') as HTMLElement | null;
    const body = el.querySelector(':scope .integral__integrand') as HTMLElement | null;
    const dx = el.querySelector(':scope .integral__dx') as HTMLElement | null;

    const U = up ? domToTex(up) : '';
    const L = lo ? domToTex(lo) : '';
    const F = body ? domToTex(body) : '';
    const D = dx ? nodeText(dx) : 'dx';

    const lim = (U || L) ? `_{${L || ''}}^{${U || ''}}` : '';
    return `\\int${lim} ${F}\\, ${escapeTex(D)}`;
  }

  // 他のmath-only内の入れ子は再帰
  if (cls.contains('math-only')) {
    return Array.from(el.childNodes).map(domToTex).join('');
  }

  // p / span / div など
  const tag = el.tagName.toLowerCase();
  if (tag === 'br') return '\n';
  if (tag === 'p' || tag === 'div') {
    const inner = Array.from(el.childNodes).map(domToTex).join('');
    return inner + '\n\n'; // 段落
  }

  return Array.from(el.childNodes).map(domToTex).join('');
}

export function exportEditorToTex(editorEl: HTMLElement): string {
  return domToTex(editorEl).trim();
}
