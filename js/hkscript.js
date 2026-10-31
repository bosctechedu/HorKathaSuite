// ============================================================
// 🔤 HKScript — Ol Chiki ⇄ Devanagari ⇄ Roman Santali (पूरा document)
// Ol Chiki को बीच की script (pivot) मानकर तीनों दिशाओं में बदलता है।
// ============================================================
(function (root) {
    'use strict';

    // ─── Ol Chiki ⇄ Roman ───
    const OL_CONS = { 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ŋ', 'ᱞ': 'l', 'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w', 'ᱥ': 's', 'ᱦ': 'h',
        'ᱧ': 'ñ', 'ᱨ': 'r', 'ᱪ': 'c', 'ᱫ': 'd', 'ᱬ': 'ṇ', 'ᱭ': 'y', 'ᱯ': 'p', 'ᱰ': 'ḍ', 'ᱱ': 'n', 'ᱲ': 'ṛ', 'ᱴ': 'ṭ', 'ᱵ': 'b' };
    const OL_VOW = { 'ᱚ': 'o', 'ᱟ': 'a', 'ᱤ': 'i', 'ᱩ': 'u', 'ᱮ': 'e', 'ᱳ': 'ó' };
    const OL_SIGN = { 'ᱷ': 'h', 'ᱸ': '\u0303', 'ᱹ': '\u0331', 'ᱺ': '\u0331\u0303', 'ᱻ': 'ː', 'ᱽ': 'ʼ', '᱾': '.', '᱿': '||' };
    const OL_DIG = '᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙';

    function olToRoman(text) {
        let out = '';
        for (const ch of String(text)) {
            if (OL_CONS[ch] !== undefined) out += OL_CONS[ch];
            else if (OL_VOW[ch] !== undefined) out += OL_VOW[ch];
            else if (OL_SIGN[ch] !== undefined) out += OL_SIGN[ch];
            else if (OL_DIG.includes(ch)) out += String(OL_DIG.indexOf(ch));
            else out += ch;
        }
        return out;
    }

    // Roman → Ol Chiki (लंबे pattern पहले)
    const R2O = [
        ['n\u0303', 'ᱧ'], ['n\u0323', 'ᱬ'], ['d\u0323', 'ᱰ'], ['r\u0323', 'ᱲ'], ['t\u0323', 'ᱴ'], ['l\u0323', 'ᱞ'], ['o\u0301', 'ᱳ'], ['o\u0300', 'ᱳ'],
        ['ng', 'ᱝ'], ['ny', 'ᱧ'], ['ŋ', 'ᱝ'], ['ñ', 'ᱧ'], ['ṇ', 'ᱬ'], ['ḍ', 'ᱰ'], ['ṛ', 'ᱲ'], ['ṭ', 'ᱴ'], ['ḷ', 'ᱞ'],
        ['ó', 'ᱳ'], ['ò', 'ᱳ'], ['ɔ', 'ᱚ'], ['o', 'ᱚ'], ['a', 'ᱟ'], ['i', 'ᱤ'], ['u', 'ᱩ'], ['e', 'ᱮ'],
        ['k', 'ᱠ'], ['g', 'ᱜ'], ['c', 'ᱪ'], ['j', 'ᱡ'], ['t', 'ᱛ'], ['d', 'ᱫ'], ['p', 'ᱯ'], ['b', 'ᱵ'],
        ['m', 'ᱢ'], ['n', 'ᱱ'], ['r', 'ᱨ'], ['l', 'ᱞ'], ['s', 'ᱥ'], ['h', 'ᱦ'], ['y', 'ᱭ'], ['w', 'ᱣ'],
        ['v', 'ᱣ'], ['f', 'ᱯᱷ'], ['z', 'ᱡ'], ['q', 'ᱠ'], ['x', 'ᱠᱥ'],
        ['\u0331\u0303', 'ᱺ'], ['\u0331', 'ᱹ'], ['\u0323', 'ᱹ'], ['\u0303', 'ᱸ'], ['ː', 'ᱻ'], ['ʼ', 'ᱽ'], ['||', '᱿']
    ];
    const ASPIRABLE = new Set(['ᱠ', 'ᱜ', 'ᱪ', 'ᱡ', 'ᱛ', 'ᱫ', 'ᱯ', 'ᱵ', 'ᱴ', 'ᱰ', 'ᱲ']);
    function romanToOl(text) {
        const s = String(text).normalize('NFD');
        let out = '', i = 0;
        const src = s.toLowerCase();
        while (i < src.length) {
            const ch = src[i];
            // aspirate: stop + h → ᱷ
            if (ch === 'h' && out && ASPIRABLE.has(out[out.length - 1])) {
                out += 'ᱷ'; i++; continue;
            }
            if (/[0-9]/.test(ch)) { out += OL_DIG[+ch]; i++; continue; }
            if (ch === '.' && !/[0-9]/.test(src[i - 1] || '') && (i + 1 >= src.length || /\s/.test(src[i + 1]))) { out += '᱾'; i++; continue; }
            let hit = false;
            for (const [r, o] of R2O) {
                if (src.startsWith(r, i)) { out += o; i += r.length; hit = true; break; }
            }
            if (!hit) { out += s[i]; i++; }
        }
        return out;
    }

    // ─── Ol Chiki ⇄ Devanagari ───
    const OL2DEV_C = { 'ᱠ': 'क', 'ᱜ': 'ग', 'ᱝ': 'ङ', 'ᱪ': 'च', 'ᱡ': 'ज', 'ᱧ': 'ञ', 'ᱴ': 'ट', 'ᱰ': 'ड', 'ᱬ': 'ण', 'ᱛ': 'त',
        'ᱫ': 'द', 'ᱱ': 'न', 'ᱯ': 'प', 'ᱵ': 'ब', 'ᱢ': 'म', 'ᱭ': 'य', 'ᱨ': 'र', 'ᱞ': 'ल', 'ᱣ': 'व', 'ᱥ': 'स', 'ᱦ': 'ह', 'ᱲ': 'ड़' };
    const ASP = { 'क': 'ख', 'ग': 'घ', 'च': 'छ', 'ज': 'झ', 'ट': 'ठ', 'ड': 'ढ', 'त': 'थ', 'द': 'ध', 'प': 'फ', 'ब': 'भ', 'ड़': 'ढ़' };
    // Santali-Devanagari चलन: ᱚ (ɔ) = ओ़/ो़ (nukta के साथ), ᱳ (o) = ओ/ो
    const OL2DEV_V = { 'ᱚ': ['ओ़', 'ो़'], 'ᱟ': ['आ', 'ा'], 'ᱤ': ['इ', 'ि'], 'ᱩ': ['उ', 'ु'], 'ᱮ': ['ए', 'े'], 'ᱳ': ['ओ', 'ो'] };
    const OL2DEV_S = { 'ᱸ': 'ं', 'ᱹ': '़', 'ᱺ': '़ं', 'ᱻ': 'ऽ', 'ᱽ': 'ʼ', '᱾': '।', '᱿': '॥' };
    const DEV_DIG = '०१२३४५६७८९';

    function olToDev(text) {
        const a = Array.from(String(text));
        let out = '';
        for (let i = 0; i < a.length; i++) {
            const ch = a[i];
            if (OL2DEV_C[ch]) {
                let c = OL2DEV_C[ch];
                if (a[i + 1] === 'ᱷ') { c = ASP[c] || (c + 'ह'); i++; }
                out += c;
                const nx = a[i + 1];
                if (OL2DEV_V[nx]) { out += OL2DEV_V[nx][1]; i++; }
                else if (OL2DEV_C[nx]) out += '्';                // C C → halant (स्क)
                continue;
            }
            if (OL2DEV_V[ch]) { out += OL2DEV_V[ch][0]; continue; }
            if (OL2DEV_S[ch] !== undefined) { out += OL2DEV_S[ch]; continue; }
            if (OL_DIG.includes(ch)) { out += DEV_DIG[OL_DIG.indexOf(ch)]; continue; }
            out += ch;
        }
        return out;
    }

    const DEV2OL_C = {};
    Object.entries(OL2DEV_C).forEach(([o, d]) => { DEV2OL_C[d] = o; });
    Object.entries(ASP).forEach(([d, a]) => { DEV2OL_C[a] = (DEV2OL_C[d] || '') + 'ᱷ'; });
    Object.assign(DEV2OL_C, { 'श': 'ᱥ', 'ष': 'ᱥ', 'क़': 'ᱠ', 'ख़': 'ᱠᱷ', 'ग़': 'ᱜ', 'ज़': 'ᱡ', 'फ़': 'ᱯᱷ', 'ढ़': 'ᱲᱷ' });
    const DEV_MATRA = { 'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ', 'ॉ': 'ᱚ', 'ृ': 'ᱨᱤ', 'ॅ': 'ᱮ' };
    const DEV_IND = { 'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ', 'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ', 'ऑ': 'ᱚ', 'ऋ': 'ᱨᱤ' };
    const DEV_SIGN = { 'ं': 'ᱸ', 'ँ': 'ᱸ', 'ः': 'ᱷ', 'ऽ': 'ᱻ', '।': '᱾', '॥': '᱿', 'ʼ': 'ᱽ' };

    function devToOl(text) {
        const s = String(text).normalize('NFC');
        const a = Array.from(s);
        let out = '';
        for (let i = 0; i < a.length; i++) {
            let ch = a[i];
            if (a[i + 1] === '़' && DEV2OL_C[ch + '़']) { ch = ch + '़'; i++; }
            if (DEV2OL_C[ch]) {
                out += DEV2OL_C[ch];
                const nx = a[i + 1];
                if (nx === 'ो' && a[i + 2] === '़') { out += 'ᱚ'; i += 2; }
                else if (DEV_MATRA[nx]) { out += DEV_MATRA[nx]; i++; if (a[i + 1] === '़') { out += 'ᱹ'; i++; } }
                else if (nx === '्') { i++; }                      // halant: कोई vowel नहीं
                else if (nx === 'ं' || nx === 'ँ') { out += 'ᱚ'; }   // कं → ᱠᱚᱸ
                else if (nx && (DEV2OL_C[nx] || DEV2OL_C[nx + (a[i + 2] === '़' ? '़' : '')])) { out += 'ᱚ'; } // बीच का अ
                continue;                                              // शब्द के अंत में: schwa नहीं
            }
            if (ch === 'ओ' && a[i + 1] === '़') { out += 'ᱚ'; i++; continue; }
            if (DEV_IND[ch]) { out += DEV_IND[ch]; if (a[i + 1] === '़') { out += 'ᱹ'; i++; } continue; }
            if (DEV_SIGN[ch] !== undefined) { out += DEV_SIGN[ch]; continue; }
            if (ch === '़') { out += 'ᱹ'; continue; }
            if (DEV_DIG.includes(ch)) { out += OL_DIG[DEV_DIG.indexOf(ch)]; continue; }
            if (ch === '्') continue;
            out += ch;
        }
        return out;
    }

    function detect(text) {
        const t = String(text);
        const ol = (t.match(/[\u1C50-\u1C7F]/g) || []).length;
        const dev = (t.match(/[\u0900-\u097F]/g) || []).length;
        const lat = (t.match(/[A-Za-z\u00C0-\u024F]/g) || []).length;
        if (!ol && !dev && !lat) return 'unknown';
        if (ol >= dev && ol >= lat) return 'olchiki';
        return dev >= lat ? 'devanagari' : 'roman';
    }

    function toOl(text, from) {
        if (from === 'olchiki') return text;
        if (from === 'devanagari') return devToOl(text);
        if (from === 'roman') return romanToOl(text);
        return text;
    }
    function fromOl(text, to) {
        if (to === 'olchiki') return text;
        if (to === 'devanagari') return olToDev(text);
        if (to === 'roman') return olToRoman(text).normalize('NFC');
        return text;
    }
    // Mixed text: सिर्फ़ source script वाले हिस्से बदलें, बाकी (जैसे English) जैसे के तैसे
    const SEG = { olchiki: /[\u1C50-\u1C7F]+/g, devanagari: /[\u0900-\u097F]+/g, roman: /[0-9A-Za-z\u00C0-\u024F\u0300-\u036F\u1E00-\u1EFFŋñɔː.ʼ]+/g };
    function convert(text, from, to) {
        if (from === 'auto') from = detect(text);
        if (!SEG[from] || from === to) return String(text);
        return String(text).replace(SEG[from], (seg) => fromOl(toOl(seg, from), to));
    }

    const api = { olToRoman, romanToOl, olToDev, devToOl, detect, convert };
    root.HKScript = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
