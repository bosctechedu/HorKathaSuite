// ============================================================
// 🛡️ LANG GUARD — Hoṛ Katha Suite (v34, v54 Pro check fix)
// ------------------------------------------------------------
// समस्या: Hindi / Santali / Ol Chiki चुनने के बाद भी hardware
// keyboard से English अक्षर आ जाते थे (App Virtual या System mode).
//
// हल: Editor (#editor) और Typing Practice (#ttInput) में जो भी
// English अक्षर बिना बदले अंदर जाने वाला हो, उसे यहाँ आख़िरी
// मौके (beforeinput) पर चुनी गई भाषा में बदल दिया जाता है।
//   • Windows में Hindi/Ol Chiki keyboard चालू है → वही अक्षर जाता है (कोई बदलाव नहीं)
//   • Windows में English है → Hoṛ Katha phonetic map से बदला जाता है
//   • English/Roman चुना है पर Windows Hindi पर है → चेतावनी
// मौजूदा app.js / editor.js / keyboard.js में कोई बदलाव नहीं।
// ============================================================
(function () {
    'use strict';
    if (window.__hkLangGuard) return;
    window.__hkLangGuard = true;

    const DEV_LAYOUTS = ['hindi-dev', 'santali-dev'];
    const LATIN_RX = /^[A-Za-z\[\]{}]$/;
    const NATIVE_RX = /[\u0900-\u097F\u1C50-\u1C7F]/;

    function layout() { return window.currentLayout || 'english'; }

    function mapFor(ch) {
        const L = layout();
        try {
            if (DEV_LAYOUTS.indexOf(L) >= 0) {
                return (typeof hardwareDevMap !== 'undefined' && hardwareDevMap[ch]) || null;
            }
            if (L === 'olchiki') {
                if (typeof hardwareOlchikiMap === 'undefined') return null;
                return hardwareOlchikiMap[ch] || hardwareOlchikiMap[ch.toLowerCase()] || null;
            }
        } catch (e) {}
        return null;
    }

    function hasPro() {
        // v54: index.html का signed-key check (hk_pro_license) पास हो चुका है → Pro
        try { if (typeof window.hkProVerified === 'function' && window.hkProVerified()) return true; } catch (e) {}
        try { if (typeof _hasProAccess === 'function' && _hasProAccess() === true) return true; } catch (e) {}
        try { if (typeof window.hasProLevelAccess === 'function' && window.hasProLevelAccess() === true) return true; } catch (e) {}
        try { if (typeof window.hasProLevelAccess === 'function') return false; } catch (e) {}
        return true; // check उपलब्ध नहीं तो typing न रोकें
    }

    let lastToast = 0;
    function toast(msg, type) {
        const now = Date.now();
        if (now - lastToast < 4000) return;
        lastToast = now;
        if (typeof window.showToast === 'function') window.showToast(msg, type || 'warning', 3500);
        else console.warn('[lang-guard]', msg);
    }

    function targetKind(t) {
        if (!t || t.nodeType !== 1) return null;
        if (t.id === 'ttInput') return 'tt';
        if (t.id === 'editor' || (t.closest && t.closest('#editor'))) return 'editor';
        return null;
    }

    function insertIntoTextarea(el, text) {
        const a = el.selectionStart, b = el.selectionEnd;
        try {
            el.setRangeText(text, a, b, 'end');
        } catch (e) {
            el.value = el.value.slice(0, a) + text + el.value.slice(b);
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function insertIntoEditor(text) {
        if (typeof window.addCharWithPhonics === 'function') {
            window.addCharWithPhonics(text);
        } else {
            document.execCommand('insertText', false, text);
        }
    }

    // Capture phase में सबसे पहले चलता है
    document.addEventListener('beforeinput', function (e) {
        if (e.inputType !== 'insertText' || e.isComposing) return;
        const ch = e.data;
        if (!ch || ch.length !== 1) return;
        const kind = targetKind(e.target);
        if (!kind) return;

        const L = layout();

        // English / Roman चुना है पर Windows दूसरी भाषा पर है
        if (L === 'english' || L === 'roman') {
            if (NATIVE_RX.test(ch)) {
                toast('⚠️ English चुना है — System keyboard भी English (ENG) पर करें: Win + Space');
            }
            return;
        }

        // Windows पहले से सही भाषा भेज रहा है → कुछ न करें
        if (!LATIN_RX.test(ch)) return;

        const mapped = mapFor(ch);
        if (!mapped || mapped === ch) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        // Editor (App Virtual mode) में Hindi/Ol Chiki Pro feature है
        if (kind === 'editor' && window.keyboardMode !== 'system' && !hasPro()) {
            toast('🔒 Hindi / Ol Chiki typing के लिए Pro या Trial चालू करें', 'info');
            return;
        }

        if (kind === 'tt') insertIntoTextarea(e.target, mapped);
        else insertIntoEditor(mapped);
    }, true);

    console.log('✅ [lang-guard] ready');
})();
