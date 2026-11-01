// ============================================================
// ✋ FINGER GUIDE — Typing Practice (v1.0)
// BOSC Tech & Edu · Hoṛ Katha Suite
// ============================================================
// Typing Master जैसा guide:
//   • On-screen keyboard (चुनी गई भाषा के अक्षर)
//   • अगली key चमकती है + सही Shift / AltGr
//   • हर उंगली का अपना रंग + दोनों हाथों का चित्र
//   • गलत key लाल, सही key हरी flash
//   • Practice के अंत में उंगली-वार report + key heatmap
//   • Govt Exam Mode में guide अपने-आप छुपा रहता है
//
// किसी existing file का logic नहीं बदलता। केवल #ttArena में
// एक panel जोड़ता है और #ttInput / #ttTargetText को observe करता है।
// Desktop/laptop के लिए; छोटी touch screen पर अपने-आप बंद।
// ============================================================
(function () {
    'use strict';

    if (window.__HKFG_LOADED__) return;
    window.__HKFG_LOADED__ = true;

    // ------------------------------------------------------------
    // 🖐️ FINGERS
    // ------------------------------------------------------------
    const FINGERS = {
        LP: { hand: 'L', name: 'कनिष्ठा', color: '#ef4444' },
        LR: { hand: 'L', name: 'अनामिका', color: '#f97316' },
        LM: { hand: 'L', name: 'मध्यमा',  color: '#eab308' },
        LI: { hand: 'L', name: 'तर्जनी',  color: '#22c55e' },
        TH: { hand: 'B', name: 'अंगूठा',  color: '#64748b' },
        RI: { hand: 'R', name: 'तर्जनी',  color: '#06b6d4' },
        RM: { hand: 'R', name: 'मध्यमा',  color: '#3b82f6' },
        RR: { hand: 'R', name: 'अनामिका', color: '#8b5cf6' },
        RP: { hand: 'R', name: 'कनिष्ठा', color: '#ec4899' }
    };
    const FINGER_ORDER = ['LP', 'LR', 'LM', 'LI', 'TH', 'RI', 'RM', 'RR', 'RP'];
    const HAND_NAME = { L: 'बायाँ हाथ', R: 'दायाँ हाथ', B: 'कोई भी हाथ' };

    const FINGER_OF = {
        Backquote: 'LP', Digit1: 'LP', Tab: 'LP', KeyQ: 'LP', CapsLock: 'LP', KeyA: 'LP', ShiftLeft: 'LP', KeyZ: 'LP',
        Digit2: 'LR', KeyW: 'LR', KeyS: 'LR', KeyX: 'LR',
        Digit3: 'LM', KeyE: 'LM', KeyD: 'LM', KeyC: 'LM',
        Digit4: 'LI', Digit5: 'LI', KeyR: 'LI', KeyT: 'LI', KeyF: 'LI', KeyG: 'LI', KeyV: 'LI', KeyB: 'LI',
        Digit6: 'RI', Digit7: 'RI', KeyY: 'RI', KeyU: 'RI', KeyH: 'RI', KeyJ: 'RI', KeyN: 'RI', KeyM: 'RI',
        Digit8: 'RM', KeyI: 'RM', KeyK: 'RM', Comma: 'RM',
        Digit9: 'RR', KeyO: 'RR', KeyL: 'RR', Period: 'RR',
        Digit0: 'RP', Minus: 'RP', Equal: 'RP', Backspace: 'RP', KeyP: 'RP', BracketLeft: 'RP', BracketRight: 'RP',
        Backslash: 'RP', Semicolon: 'RP', Quote: 'RP', Enter: 'RP', Slash: 'RP', ShiftRight: 'RP',
        Space: 'TH', AltLeft: 'TH', AltRight: 'TH', ControlLeft: 'LP', ControlRight: 'RP'
    };

    // Home row: उंगली कहाँ टिकी रहती है
    const HOME_KEY = { LP: 'KeyA', LR: 'KeyS', LM: 'KeyD', LI: 'KeyF', RI: 'KeyJ', RM: 'KeyK', RR: 'KeyL', RP: 'Semicolon', TH: 'Space' };

    // ------------------------------------------------------------
    // ⌨️ PHYSICAL KEYBOARD (US / Indian standard)
    // ------------------------------------------------------------
    const ROWS = [
        [['Backquote', 1], ['Digit1', 1], ['Digit2', 1], ['Digit3', 1], ['Digit4', 1], ['Digit5', 1], ['Digit6', 1], ['Digit7', 1], ['Digit8', 1], ['Digit9', 1], ['Digit0', 1], ['Minus', 1], ['Equal', 1], ['Backspace', 2]],
        [['Tab', 1.5], ['KeyQ', 1], ['KeyW', 1], ['KeyE', 1], ['KeyR', 1], ['KeyT', 1], ['KeyY', 1], ['KeyU', 1], ['KeyI', 1], ['KeyO', 1], ['KeyP', 1], ['BracketLeft', 1], ['BracketRight', 1], ['Backslash', 1.5]],
        [['CapsLock', 1.75], ['KeyA', 1], ['KeyS', 1], ['KeyD', 1], ['KeyF', 1], ['KeyG', 1], ['KeyH', 1], ['KeyJ', 1], ['KeyK', 1], ['KeyL', 1], ['Semicolon', 1], ['Quote', 1], ['Enter', 2.25]],
        [['ShiftLeft', 2.25], ['KeyZ', 1], ['KeyX', 1], ['KeyC', 1], ['KeyV', 1], ['KeyB', 1], ['KeyN', 1], ['KeyM', 1], ['Comma', 1], ['Period', 1], ['Slash', 1], ['ShiftRight', 2.75]],
        [['ControlLeft', 1.25], ['MetaLeft', 1], ['AltLeft', 1.25], ['Space', 7], ['AltRight', 1.25], ['MetaRight', 1], ['ContextMenu', 1], ['ControlRight', 1.25]]
    ];
    const SPECIAL_LABEL = {
        Backspace: '⌫', Tab: 'Tab', CapsLock: 'Caps', Enter: 'Enter',
        ShiftLeft: 'Shift', ShiftRight: 'Shift', AltLeft: 'Alt', AltRight: 'AltGr', Space: 'Space',
        ControlLeft: 'Ctrl', ControlRight: 'Ctrl', MetaLeft: '⊞', MetaRight: '⊞', ContextMenu: '☰'
    };

    // US QWERTY: code -> [normal, shift]
    const QWERTY = (function () {
        const m = {
            Backquote: ['`', '~'], Digit1: ['1', '!'], Digit2: ['2', '@'], Digit3: ['3', '#'], Digit4: ['4', '$'],
            Digit5: ['5', '%'], Digit6: ['6', '^'], Digit7: ['7', '&'], Digit8: ['8', '*'], Digit9: ['9', '('],
            Digit0: ['0', ')'], Minus: ['-', '_'], Equal: ['=', '+'], BracketLeft: ['[', '{'], BracketRight: [']', '}'],
            Backslash: ['\\', '|'], Semicolon: [';', ':'], Quote: ["'", '"'], Comma: [',', '<'], Period: ['.', '>'],
            Slash: ['/', '?'], Space: [' ', ' ']
        };
        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function (c) {
            m['Key' + c.toUpperCase()] = [c, c.toUpperCase()];
        });
        return m;
    })();

    // Windows "Hindi Traditional" (InScript) — KBDINHIN.DLL
    // [normal, shift, altgr]
    const INSCRIPT = {
        Backquote: ['', '', '`'], Digit1: ['1', 'ऍ', '१'], Digit2: ['2', 'ॅ', '२'], Digit3: ['3', '', '३'],
        Digit4: ['4', '', '४'], Digit5: ['5', '', '५'], Digit6: ['6', '', '६'], Digit7: ['7', '', '७'],
        Digit8: ['8', '', '८'], Digit9: ['9', '(', '९'], Digit0: ['0', ')', '०'], Minus: ['-', 'ः', '-'],
        Equal: ['ृ', 'ऋ', '='], BracketLeft: ['ड', 'ढ', '['], BracketRight: ['़', 'ञ', ']'], Backslash: ['ॉ', 'ऑ', '\\'],
        KeyQ: ['ौ', 'औ'], KeyW: ['ै', 'ऐ'], KeyE: ['ा', 'आ'], KeyR: ['ी', 'ई'], KeyT: ['ू', 'ऊ'],
        KeyY: ['ब', 'भ'], KeyU: ['ह', 'ङ'], KeyI: ['ग', 'घ'], KeyO: ['द', 'ध'], KeyP: ['ज', 'झ'],
        KeyA: ['ो', 'ओ'], KeyS: ['े', 'ए'], KeyD: ['्', 'अ'], KeyF: ['ि', 'इ'], KeyG: ['ु', 'उ'],
        KeyH: ['प', 'फ'], KeyJ: ['र', 'ऱ'], KeyK: ['क', 'ख'], KeyL: ['त', 'थ'], Semicolon: ['च', 'छ', ';'],
        Quote: ['ट', 'ठ', "'"], KeyX: ['ं', 'ँ'], KeyC: ['म', 'ण'], KeyV: ['न'], KeyB: ['व'],
        KeyN: ['ल', 'ळ'], KeyM: ['स', 'श'], Comma: [',', 'ष', ','], Period: ['.', '।', '.'], Slash: ['य', 'य़', '/'],
        Space: [' ', ' ']
    };
    // Shift + 3..8 = संयुक्त अक्षर (केवल दिखाने के लिए)
    const INSCRIPT_LIG = { Digit3: '्र', Digit4: 'र्', Digit5: 'ज्ञ', Digit6: 'त्र', Digit7: 'क्ष', Digit8: 'श्र' };

    // Windows "Ol Chiki" — KBDOLCH.DLL
    const OLCHIKI_WIN = {
        Backquote: ['', 'ᱻ'], Digit1: ['᱑'], Digit2: ['᱒'], Digit3: ['᱓'], Digit4: ['᱔'], Digit5: ['᱕'],
        Digit6: ['᱖'], Digit7: ['᱗'], Digit8: ['᱘'], Digit9: ['᱙'], Digit0: ['᱐'], Minus: ['', 'ᱼ'],
        KeyE: ['ᱟ'], KeyY: ['ᱵ'], KeyU: ['ᱦ', 'ᱝ'], KeyI: ['ᱜ'], KeyO: ['ᱫ'], KeyP: ['ᱡ'],
        BracketLeft: ['ᱰ', 'ᱲ'], BracketRight: ['ᱹ', 'ᱧ'],
        KeyA: ['ᱳ'], KeyS: ['ᱮ'], KeyD: ['ᱚ'], KeyF: ['ᱤ'], KeyG: ['ᱩ'], KeyH: ['ᱯ'], KeyJ: ['ᱨ'],
        KeyK: ['ᱠ'], KeyL: ['ᱛ'], Semicolon: ['ᱪ', 'ᱺ'], Quote: ['ᱴ'],
        KeyZ: ['ᱷ', 'ᱽ'], KeyX: ['ᱸ'], KeyC: ['ᱢ', 'ᱬ'], KeyV: ['ᱱ'], KeyB: ['ᱣ', 'ᱶ'], KeyN: ['ᱞ'],
        KeyM: ['ᱥ'], Comma: [',', '᱿'], Period: ['.', '᱾'], Slash: ['ᱭ'],
        Space: [' ', ' ']
    };

    // US char -> {code, shift}
    const US_POS = (function () {
        const p = {};
        Object.keys(QWERTY).forEach(function (code) {
            const v = QWERTY[code];
            if (v[0] && !(v[0] in p)) p[v[0]] = { code: code, shift: false };
            if (v[1] && !(v[1] in p)) p[v[1]] = { code: code, shift: true };
        });
        return p;
    })();

    // Hoṛ Katha phonetic map (keymaps.js) से profile बनाएँ
    function buildPhonetic(kind) {
        const src = kind === 'dev'
            ? (typeof hardwareDevMap !== 'undefined' ? hardwareDevMap : null)
            : (typeof hardwareOlchikiMap !== 'undefined' ? hardwareOlchikiMap : null);
        const out = { Space: [' ', ' '] };
        if (!src) return out;
        Object.keys(src).forEach(function (k) {
            const pos = US_POS[k];
            if (!pos) return;
            if (kind === 'ol' && pos.shift && /[A-Z]/.test(k)) return; // uppercase = same output
            const slot = out[pos.code] || (out[pos.code] = ['', '']);
            if (pos.shift) slot[1] = src[k]; else slot[0] = src[k];
        });
        return out;
    }

    const PROFILES = {
        qwerty:      { name: 'English (QWERTY)',            map: function () { return QWERTY; } },
        inscript:    { name: 'InScript (Windows Hindi)',    map: function () { return INSCRIPT; }, lig: INSCRIPT_LIG },
        'dev-phon':  { name: 'Hoṛ Katha Phonetic',          map: function () { return buildPhonetic('dev'); }, phonetic: 'dev' },
        'olchiki-win': { name: 'Ol Chiki (Windows)',        map: function () { return OLCHIKI_WIN; } },
        'ol-phon':   { name: 'Hoṛ Katha Phonetic',          map: function () { return buildPhonetic('ol'); }, phonetic: 'ol' }
    };
    const LAYOUT_PROFILES = {
        english:       ['qwerty'],
        roman:         ['qwerty'],
        'hindi-dev':   ['inscript', 'dev-phon'],
        'santali-dev': ['inscript', 'dev-phon'],
        olchiki:       ['olchiki-win', 'ol-phon']
    };

    // ------------------------------------------------------------
    // 💾 SETTINGS
    // ------------------------------------------------------------
    const LS_KEY = 'hkfg.v1';
    function loadSettings() {
        let s = {};
        try { s = JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) { s = {}; }
        if (typeof s.visible !== 'boolean') s.visible = true;
        if (typeof s.hands !== 'boolean') s.hands = true;
        if (!s.profiles || typeof s.profiles !== 'object') s.profiles = {};
        if (['royal', 'dark', 'light'].indexOf(s.theme) < 0) s.theme = 'light';
        if (typeof s.voice !== 'boolean') s.voice = true;
        return s;
    }
    function saveSettings() {
        try { localStorage.setItem(LS_KEY, JSON.stringify(S.settings)); } catch (e) {}
    }

    // ------------------------------------------------------------
    // 🧠 STATE
    // ------------------------------------------------------------
    const S = {
        settings: loadSettings(),
        layout: 'english',
        profileId: 'qwerty',
        map: QWERTY,
        rev: {},
        exam: false,
        prevLen: 0,
        sysScript: null,
        syncNote: '',
        keyEls: {},
        stats: null,
        panel: null,
        mounted: false
    };

    function freshStats() {
        const f = {};
        FINGER_ORDER.forEach(function (k) { f[k] = { total: 0, wrong: 0 }; });
        return { total: 0, wrong: 0, fingers: f, keys: {} };
    }
    S.stats = freshStats();

    function ttState() {
        try { return (typeof _ttState !== 'undefined') ? _ttState : null; } catch (e) { return null; }
    }

    function isSmallTouch() {
        try {
            return window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900;
        } catch (e) { return false; }
    }

    // char -> {code, shift, altgr}
    function buildReverse(map) {
        const rev = {};
        const put = function (ch, step) { if (ch && ch.length && !(ch in rev)) rev[ch] = step; };
        // पहले normal, फिर shift, फिर altgr (सबसे आसान रास्ता पहले)
        [0, 1, 2].forEach(function (lvl) {
            Object.keys(map).forEach(function (code) {
                const v = map[code];
                if (!v || !v[lvl]) return;
                put(v[lvl], { code: code, shift: lvl === 1, altgr: lvl === 2 });
            });
        });
        return rev;
    }

    function pickProfile(layout) {
        const list = LAYOUT_PROFILES[layout] || ['qwerty'];
        const saved = S.settings.profiles[layout];
        return list.indexOf(saved) >= 0 ? saved : list[0];
    }

    function applyProfile(layout, profileId) {
        S.layout = layout;
        S.profileId = profileId;
        S.map = PROFILES[profileId].map();
        S.rev = buildReverse(S.map);
    }

    // एक अक्षर टाइप करने के लिए keys का क्रम
    function stepsFor(ch) {
        if (ch == null || ch === '') return null;
        if (ch === '\n') return [{ code: 'Enter', shift: false, altgr: false }];
        if (S.rev[ch]) return [S.rev[ch]];
        let d = ch;
        try { d = ch.normalize('NFD'); } catch (e) {}
        if (d !== ch) {
            const out = [];
            for (let i = 0; i < d.length; i++) {
                const st = S.rev[d[i]];
                if (!st) return null;
                out.push(st);
            }
            return out;
        }
        return null;
    }

    function shiftCodeFor(code) {
        const f = FINGERS[FINGER_OF[code]];
        // उल्टे हाथ का Shift
        return (f && f.hand === 'L') ? 'ShiftRight' : 'ShiftLeft';
    }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function hexA(hex, a) {
        const n = parseInt(hex.slice(1), 16);
        return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }

    function keyLabelOf(code) {
        if (SPECIAL_LABEL[code]) return SPECIAL_LABEL[code];
        const q = QWERTY[code];
        return q ? q[1].length === 1 && /[A-Z]/.test(q[1]) ? q[1] : q[0] : code;
    }

    function charName(ch) {
        if (ch === ' ') return 'Space';
        if (ch === '\n') return 'Enter';
        // matra / halant को दिखने लायक बनाएँ
        if (/^[\u093E-\u094D\u0901-\u0903\u093C\u0945\u0949\u1C78-\u1C7D]$/.test(ch)) return '◌' + ch;
        return ch;
    }

    // ------------------------------------------------------------
    // 🎨 STYLES
    // ------------------------------------------------------------
    function injectStyles() {
        if (document.getElementById('hkfgStyles')) return;
        const css = [
            /* ---------- Arena: बिना scroll, पूरा एक screen में ---------- */
            '.modal-overlay:has(.hkfg-wide){padding:0!important;}',
            '.tt-modal-window.hkfg-wide{width:100vw!important;max-width:100vw!important;height:100vh!important;height:100dvh!important;max-height:100vh!important;max-height:100dvh!important;border-radius:0!important;margin:0!important;animation:none!important;}',
            '.hkfg-wide .modal-body{gap:8px!important;}',
            '.hkfg-wide #ttArena:not([style*="none"]){display:flex!important;flex-direction:column;flex:1 1 auto;min-height:0;}',
            '.hkfg-wide .hkfg-panel{flex:0 0 auto;}',
            '.hkfg-wide .modal-header{padding-top:8px!important;padding-bottom:8px!important;}',
            '.hkfg-wide .modal-body{padding:10px 16px 12px!important;}',
            '.hkfg-wide .tt-arena-header{margin-bottom:8px!important;}',
            '.hkfg-wide .tt-stat-box{padding-top:5px!important;padding-bottom:5px!important;}',
            '.hkfg-wide .tt-target-text{flex:1 1 auto!important;max-height:none!important;min-height:90px!important;overflow-y:auto!important;margin-bottom:8px!important;}',
            '.hkfg-wide .tt-arena-header,.hkfg-wide .tt-arena-actions,.hkfg-wide #ttPauseBtn{display:none!important;}',
            /* header bar: level + timer + menu */
            '#hkfgBar{display:none;}',
            '.hkfg-wide #hkfgBar{display:flex;align-items:center;gap:10px;margin-left:auto;margin-right:12px;position:relative;}',
            '.hkfg-lvl{display:inline-flex;align-items:center;gap:6px;max-width:42vw;padding:5px 12px;border-radius:999px;background:#eef2ff;color:#3730a3;font-weight:800;font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1px solid #c7d2fe;}',
            '.hkfg-time{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:999px;background:#0f172a;color:#fff;font-weight:900;font-size:1rem;font-variant-numeric:tabular-nums;letter-spacing:.5px;}',
            '.hkfg-time.hkfg-low{background:#dc2626;}',
            '.hkfg-mbtn{padding:6px 12px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;color:#0f172a;font-weight:800;font-size:.8rem;cursor:pointer;}',
            '.hkfg-mbtn:hover{background:#f1f5f9;}',
            '.hkfg-menu{display:none;position:absolute;top:calc(100% + 6px);right:0;min-width:170px;padding:6px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 14px 34px rgba(15,23,42,.18);z-index:10050;}',
            '.hkfg-menu.open{display:block;}',
            '.hkfg-menu button{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border:0;border-radius:8px;background:transparent;color:#0f172a;font-weight:700;font-size:.85rem;text-align:left;cursor:pointer;}',
            '.hkfg-menu button:hover{background:#f1f5f9;}',
            '.hkfg-menu button.hkfg-danger{color:#dc2626;}',
            '.hkfg-menu hr{border:0;border-top:1px solid #e2e8f0;margin:4px 0;}',
            '.hkfg-wide #ttInput{flex:0 0 auto;height:clamp(60px,12vh,130px)!important;min-height:0!important;resize:none!important;margin-bottom:0!important;}',
            '.hkfg-wide .tt-arena-actions{margin-top:8px!important;}',

            /* ---------- Guide panel ---------- */
            '.hkfg-panel{--kh:clamp(28px,4.8vh,52px);margin:8px 0 0;padding:8px 14px 10px;border-radius:18px;background:radial-gradient(120% 140% at 50% 0%,#1e1b4b 0%,#0f172a 55%,#020617 100%);box-shadow:0 10px 30px rgba(2,6,23,.35),inset 0 1px 0 rgba(255,255,255,.06);color:#e2e8f0;font-family:inherit;}',
            '.hkfg-top{display:flex;align-items:center;gap:12px;margin-bottom:8px;min-height:32px;}',
            '.hkfg-title{font-weight:900;font-size:.85rem;letter-spacing:.3px;background:linear-gradient(90deg,#a5b4fc,#f0abfc);-webkit-background-clip:text;background-clip:text;color:transparent;white-space:nowrap;}',
            '.hkfg-hint{flex:1;min-width:0;text-align:center;font-size:1rem;line-height:1.35;color:#f8fafc;}',
            '.hkfg-hint b{font-size:1.05rem;color:#fff;}',
            '.hkfg-hint small{color:#94a3b8;}',
            '.hkfg-chip{display:inline-block;padding:1px 9px;border-radius:999px;color:#fff;font-weight:800;font-size:.74rem;margin:0 2px;box-shadow:0 0 12px rgba(255,255,255,.12);}',
            '.hkfg-big{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:28px;padding:0 8px;border-radius:8px;background:#fff;color:#0f172a!important;font-weight:900;font-size:1.05rem;margin:0 3px;box-shadow:0 2px 0 #94a3b8;}',
            '.hkfg-ctrl{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;white-space:nowrap;}',
            '.hkfg-ctrl select,.hkfg-ctrl input{width:auto!important;min-width:0!important;max-width:170px;margin:0!important;flex:0 0 auto;}',
            '.hkfg-ctrl input{height:auto!important;padding:0!important;}',
            '.hkfg-ctrl select{padding:3px 6px;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:#1e293b;color:#e2e8f0;font-size:.72rem;}',
            '.hkfg-ctrl label{font-size:.72rem;color:#cbd5e1;display:flex;align-items:center;gap:3px;cursor:pointer;}',
            '.hkfg-btn{padding:4px 10px;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:rgba(255,255,255,.06);color:#e2e8f0;cursor:pointer;font-weight:700;font-size:.72rem;}',
            '.hkfg-btn:hover{background:rgba(255,255,255,.14);}',
            '.hkfg-stage{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;}',
            '.hkfg-stage.hkfg-nohands{grid-template-columns:minmax(0,1fr);}',
            '.hkfg-stage.hkfg-nohands .hkfg-hand{display:none;}',
            '.hkfg-hand svg{display:block;height:calc(var(--kh) * 5 + 24px);width:auto;}',

            /* keyboard */
            '.hkfg-kb{display:flex;flex-direction:column;gap:5px;width:100%;max-width:1000px;margin:0 auto;user-select:none;}',
            '.hkfg-row{display:flex;gap:4px;}',
            '.hkfg-key{--fc:#64748b;position:relative;flex-basis:0;min-width:0;height:var(--kh);border-radius:8px;background:linear-gradient(180deg,#273449 0%,#172033 100%);border:1px solid rgba(255,255,255,.07);border-bottom:3px solid var(--fc);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 2px 4px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;font-size:clamp(.8rem,2vh,1.1rem);color:#e2e8f0;transition:transform .08s,box-shadow .15s,background .15s;overflow:hidden;}',
            '.hkfg-key.hkfg-gap{visibility:hidden;}',
            '.hkfg-key .hkfg-main{font-weight:700;line-height:1;}',
            '.hkfg-key .hkfg-sh{position:absolute;top:3px;left:5px;font-size:.62em;opacity:.6;line-height:1;}',
            '.hkfg-key .hkfg-lat{position:absolute;bottom:3px;right:5px;font-size:.5em;opacity:.45;line-height:1;font-family:monospace;}',
            '.hkfg-key .hkfg-bump{position:absolute;bottom:5px;left:50%;width:12px;height:2px;margin-left:-6px;border-radius:2px;background:#e2e8f0;opacity:.7;}',
            '.hkfg-key.hkfg-special{font-size:clamp(.6rem,1.5vh,.75rem);font-weight:700;color:#94a3b8;}',
            '.hkfg-key[data-code="Space"] .hkfg-main{letter-spacing:2px;}',
            '.hkfg-key.hkfg-next{background:var(--fc);color:#fff;transform:translateY(-2px) scale(1.06);z-index:2;box-shadow:0 0 0 2px #fff,0 0 22px var(--fc),0 0 44px var(--fc);animation:hkfgPulse 1.1s ease-in-out infinite;}',
            '.hkfg-key.hkfg-next .hkfg-sh,.hkfg-key.hkfg-next .hkfg-lat{opacity:.95;}',
            '.hkfg-key.hkfg-mod{background:var(--fc);color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.8),0 0 16px var(--fc);}',
            '.hkfg-key.hkfg-good{background:#16a34a!important;color:#fff!important;box-shadow:0 0 18px #22c55e!important;}',
            '.hkfg-key.hkfg-bad{background:#dc2626!important;color:#fff!important;box-shadow:0 0 18px #ef4444!important;animation:hkfgShake .18s linear;}',
            '@keyframes hkfgPulse{0%,100%{filter:brightness(1);}50%{filter:brightness(1.25);}}',
            '@keyframes hkfgShake{0%,100%{translate:0}25%{translate:-2px}75%{translate:2px}}',

            /* hands */
            '.hkfg-hand .hkfg-f{fill-opacity:.28;stroke-width:1.5;transition:fill-opacity .15s,filter .15s;}',
            '.hkfg-hand .hkfg-f.on{fill-opacity:1;stroke:#fff!important;stroke-width:2.5;filter:drop-shadow(0 0 8px currentColor);}',
            '.hkfg-hand .hkfg-palm{fill:#243047;stroke:#475569;stroke-width:1.5;}',
            '.hkfg-hand .hkfg-hl{font-size:12px;fill:#94a3b8;font-weight:800;}',
            '.hkfg-hand .hkfg-fl{font-size:11px;fill:#f8fafc;font-weight:800;}',
            '.hkfg-hand .hkfg-fn{font-size:8.5px;fill:#cbd5e1;font-weight:700;}',

            /* ---------- Themes: royal (default) / dark / light ---------- */
            '.hkfg-panel.hkfg-t-dark{background:linear-gradient(180deg,#111827 0%,#030712 100%);}',
            '.hkfg-t-dark .hkfg-title{background:linear-gradient(90deg,#e5e7eb,#9ca3af);-webkit-background-clip:text;background-clip:text;}',
            '.hkfg-t-dark .hkfg-key{background:linear-gradient(180deg,#1f2937 0%,#111827 100%);}',
            '.hkfg-t-dark .hkfg-key.hkfg-next,.hkfg-t-dark .hkfg-key.hkfg-mod{background:var(--fc);color:#fff;}',
            '.hkfg-t-dark .hkfg-hand .hkfg-palm{fill:#1f2937;stroke:#4b5563;}',
            '.hkfg-panel.hkfg-t-light{background:linear-gradient(180deg,#ffffff 0%,#eef2ff 100%);color:#0f172a;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,.12);}',
            '.hkfg-t-light .hkfg-title{background:linear-gradient(90deg,#4f46e5,#c026d3);-webkit-background-clip:text;background-clip:text;}',
            '.hkfg-t-light .hkfg-hint,.hkfg-t-light .hkfg-hint b{color:#0f172a;}',
            '.hkfg-t-light .hkfg-hint small{color:#475569;}',
            '.hkfg-t-light .hkfg-big{background:#0f172a;color:#fff!important;box-shadow:0 2px 0 #475569;}',
            '.hkfg-t-light .hkfg-ctrl select{background:#fff;color:#0f172a;border-color:#cbd5e1;}',
            '.hkfg-t-light .hkfg-ctrl label{color:#334155;}',
            '.hkfg-t-light .hkfg-btn{background:#fff;color:#0f172a;border-color:#cbd5e1;}',
            '.hkfg-t-light .hkfg-btn:hover{background:#f1f5f9;}',
            '.hkfg-t-light .hkfg-key{background:linear-gradient(180deg,#ffffff 0%,#f1f5f9 100%);color:#0f172a;border:1px solid #cbd5e1;border-bottom:3px solid var(--fc);box-shadow:0 2px 3px rgba(15,23,42,.12);}',
            '.hkfg-t-light .hkfg-key.hkfg-special{color:#475569;}',
            '.hkfg-t-light .hkfg-key .hkfg-bump{background:#0f172a;}',
            '.hkfg-t-light .hkfg-key.hkfg-next,.hkfg-t-light .hkfg-key.hkfg-mod{background:var(--fc);color:#fff;box-shadow:0 0 0 2px #0f172a,0 0 18px var(--fc);}',
            '.hkfg-t-light .hkfg-hand .hkfg-f{fill-opacity:.35;}',
            '.hkfg-t-light .hkfg-hand .hkfg-f.on{stroke:#0f172a!important;}',
            '.hkfg-t-light .hkfg-hand .hkfg-palm{fill:#e2e8f0;stroke:#94a3b8;}',
            '.hkfg-t-light .hkfg-hand .hkfg-hl,.hkfg-t-light .hkfg-hand .hkfg-fn{fill:#475569;}',

            '.hkfg-collapsed{text-align:center;margin:8px 0 0;}',
            '.hkfg-collapsed .hkfg-btn{background:#1e1b4b;color:#e0e7ff;padding:6px 14px;font-size:.8rem;}',

            /* result report (light) */
            '.hkfg-report{margin:14px 0;padding:12px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;text-align:left;}',
            '.hkfg-report h4{margin:0 0 8px;font-size:.92rem;color:#0f172a;}',
            '.hkfg-bars{display:grid;grid-template-columns:118px 1fr 72px;gap:5px 8px;align-items:center;font-size:.75rem;color:#334155;}',
            '.hkfg-bar{height:10px;border-radius:6px;background:#e2e8f0;overflow:hidden;}',
            '.hkfg-bar i{display:block;height:100%;border-radius:6px;}',
            '.hkfg-weak{margin-top:10px;font-size:.8rem;color:#0f172a;}',
            '.hkfg-report .hkfg-kb{--kh:28px;margin-top:10px;max-width:560px;}',
            '.hkfg-report .hkfg-key{background:#e2e8f0;color:#0f172a;border-bottom-color:rgba(15,23,42,.2);box-shadow:none;font-size:.8rem;}',
            '.hkfg-report .hkfg-key.hkfg-special{color:#475569;}',
            '.hkfg-report .hkfg-key .hkfg-bump{background:#0f172a;}',

            '@media (max-width:1000px){.hkfg-stage{grid-template-columns:minmax(0,1fr);}.hkfg-hand{display:none;}}',
            '@media (max-width:700px){.hkfg-panel,.hkfg-collapsed{display:none!important;}}'
        ].join('\n');
        const st = document.createElement('style');
        st.id = 'hkfgStyles';
        st.textContent = css;
        document.head.appendChild(st);
    }

    // ------------------------------------------------------------
    // 🧱 BUILD PANEL
    // ------------------------------------------------------------
    function buildKeyboard(container, mode) {
        // mode: 'live' | 'heat'
        container.innerHTML = '';
        const els = {};
        const lig = PROFILES[S.profileId].lig || {};
        const showLatin = S.profileId !== 'qwerty';
        ROWS.forEach(function (row) {
            const r = document.createElement('div');
            r.className = 'hkfg-row';
            row.forEach(function (def) {
                const code = def[0];
                const k = document.createElement('div');
                k.className = 'hkfg-key';
                k.style.flexGrow = String(def[1]);
                if (code.charAt(0) === '_') {
                    k.classList.add('hkfg-gap');
                    r.appendChild(k);
                    return;
                }
                const fid = FINGER_OF[code];
                const color = fid ? FINGERS[fid].color : '#94a3b8';
                k.dataset.code = code;
                k.style.setProperty('--fc', color);

                if (SPECIAL_LABEL[code]) {
                    k.classList.add('hkfg-special');
                    k.innerHTML = '<span class="hkfg-main">' + esc(SPECIAL_LABEL[code]) + '</span>';
                } else {
                    const v = S.map[code] || [];
                    let main = v[0] || '';
                    let sh = v[1] || lig[code] || '';
                    if (S.profileId === 'qwerty') {
                        const q = QWERTY[code];
                        if (/^Key/.test(code)) { main = q[1]; sh = ''; } else { main = q[0]; sh = q[1]; }
                    }
                    let html = '<span class="hkfg-main">' + esc(main ? charName(main) : '') + '</span>';
                    if (sh && sh !== main) html += '<span class="hkfg-sh">' + esc(charName(sh)) + '</span>';
                    if (showLatin) html += '<span class="hkfg-lat">' + esc(keyLabelOf(code)) + '</span>';
                    if (code === 'KeyF' || code === 'KeyJ') html += '<span class="hkfg-bump"></span>';
                    k.innerHTML = html;
                }
                els[code] = k;
                r.appendChild(k);
            });
            container.appendChild(r);
        });
        return els;
    }

    // एक हाथ का SVG (L या R) — हर उंगली अपने रंग में, चालू उंगली चमकती है
    function handSvg(hand) {
        const fingers = hand === 'L'
            ? [['LP', 10, 40, 24, 56], ['LR', 38, 18, 26, 78], ['LM', 68, 6, 26, 90], ['LI', 98, 20, 26, 76]]
            : [['RI', 26, 20, 26, 76], ['RM', 56, 6, 26, 90], ['RR', 86, 18, 26, 78], ['RP', 116, 40, 24, 56]];
        const homeLetters = { LP: 'A', LR: 'S', LM: 'D', LI: 'F', RI: 'J', RM: 'K', RR: 'L', RP: ';' };
        let s = '<svg viewBox="0 0 150 205" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
        fingers.forEach(function (f) {
            const c = FINGERS[f[0]].color;
            s += '<rect class="hkfg-f" data-f="' + f[0] + '" x="' + f[1] + '" y="' + f[2] + '" width="' + f[3] + '" height="' + f[4] + '" rx="13" fill="' + c + '" stroke="' + c + '" style="color:' + c + '"/>';
            s += '<text class="hkfg-fl" x="' + (f[1] + f[3] / 2) + '" y="' + (f[2] + 18) + '" text-anchor="middle">' + esc(homeLetters[f[0]]) + '</text>';
        });
        s += '<rect class="hkfg-palm" x="' + (hand === 'L' ? 8 : 24) + '" y="88" width="118" height="82" rx="28"/>';
        const tc = FINGERS.TH.color;
        const tx = hand === 'L' ? 114 : 12;
        const rot = hand === 'L' ? 35 : -35;
        const cx = hand === 'L' ? 127 : 25;
        s += '<rect class="hkfg-f" data-f="TH" x="' + tx + '" y="110" width="26" height="58" rx="13" fill="' + tc + '" stroke="' + tc + '" style="color:' + tc + '" transform="rotate(' + rot + ' ' + cx + ' 139)"/>';
        s += '<text class="hkfg-fn" x="' + (hand === 'L' ? 67 : 83) + '" y="134" text-anchor="middle">' + (hand === 'L' ? 'बायाँ' : 'दायाँ') + '</text>';
        s += '<text class="hkfg-hl" x="' + (hand === 'L' ? 67 : 83) + '" y="196" text-anchor="middle">' + HAND_NAME[hand] + '</text>';
        s += '</svg>';
        return s;
    }

    function buildPanel() {
        const arena = document.getElementById('ttArena');
        const input = document.getElementById('ttInput');
        if (!arena || !input) return false;

        injectStyles();

        let panel = document.getElementById('hkfgPanel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'hkfgPanel';
            panel.className = 'hkfg-panel';
            input.insertAdjacentElement('afterend', panel);
        }
        let col = document.getElementById('hkfgCollapsed');
        if (!col) {
            col = document.createElement('div');
            col.id = 'hkfgCollapsed';
            col.className = 'hkfg-collapsed';
            col.innerHTML = '<button type="button" class="hkfg-btn">⌨️ Finger Guide दिखाएँ</button>';
            panel.insertAdjacentElement('afterend', col);
            col.querySelector('button').addEventListener('click', function () {
                S.settings.visible = true; saveSettings(); refreshVisibility(); focusInput();
            });
            col.querySelector('button').addEventListener('mousedown', function (e) { e.preventDefault(); });
        }

        const list = LAYOUT_PROFILES[S.layout] || ['qwerty'];
        let sel = '';
        if (list.length > 1) {
            sel = '<select id="hkfgProfile" title="Keyboard layout">' + list.map(function (p) {
                return '<option value="' + p + '"' + (p === S.profileId ? ' selected' : '') + '>' + esc(PROFILES[p].name) + '</option>';
            }).join('') + '</select>';
        }

        panel.innerHTML =
            '<div class="hkfg-top">' +
                '<div class="hkfg-title">✋ FINGER GUIDE</div>' +
                '<div class="hkfg-hint" id="hkfgHint"></div>' +
                '<div class="hkfg-ctrl">' + sel +
                    '<select id="hkfgTheme" title="Theme">' +
                        '<option value="light"' + (S.settings.theme === 'light' ? ' selected' : '') + '>☀️ Light</option>' +
                        '<option value="dark"' + (S.settings.theme === 'dark' ? ' selected' : '') + '>🌙 Dark</option>' +
                        '<option value="royal"' + (S.settings.theme === 'royal' ? ' selected' : '') + '>🌌 Royal</option>' +
                    '</select>' +
                    '<label><input type="checkbox" id="hkfgVoiceChk"' + (S.settings.voice ? ' checked' : '') + '> 🔊 अक्षर बोलें</label>' +
                    '<label><input type="checkbox" id="hkfgHandsChk"' + (S.settings.hands ? ' checked' : '') + '> हाथ</label>' +
                    '<button type="button" class="hkfg-btn" id="hkfgHideBtn">छुपाएँ</button>' +
                '</div>' +
            '</div>' +
            '<div class="hkfg-stage' + (S.settings.hands ? '' : ' hkfg-nohands') + '" id="hkfgStage">' +
                '<div class="hkfg-hand">' + handSvg('L') + '</div>' +
                '<div class="hkfg-kb" id="hkfgKb"></div>' +
                '<div class="hkfg-hand">' + handSvg('R') + '</div>' +
            '</div>';

        S.keyEls = buildKeyboard(panel.querySelector('#hkfgKb'), 'live');
        S.panel = panel;

        // Controls: mousedown पर focus input से न हटे
        panel.querySelectorAll('button, select, input, label').forEach(function (el) {
            if (el.tagName === 'SELECT') return;
            el.addEventListener('mousedown', function (e) { if (el.tagName !== 'INPUT') e.preventDefault(); });
        });
        const selEl = panel.querySelector('#hkfgProfile');
        if (selEl) {
            selEl.addEventListener('change', function () {
                S.settings.profiles[S.layout] = selEl.value; saveSettings();
                applyProfile(S.layout, selEl.value);
                buildPanel(); update(); focusInput();
            });
        }
        panel.querySelector('#hkfgHandsChk').addEventListener('change', function (e) {
            S.settings.hands = !!e.target.checked; saveSettings();
            const h = document.getElementById('hkfgStage');
            if (h) h.classList.toggle('hkfg-nohands', !S.settings.hands);
            focusInput();
        });
        applyTheme();
        panel.querySelector('#hkfgTheme').addEventListener('change', function (e) {
            S.settings.theme = e.target.value; saveSettings();
            if (window.HKTheme) window.HKTheme.set(e.target.value);   // पूरा App भी उसी theme में
            applyTheme(); focusInput();
        });
        panel.querySelector('#hkfgVoiceChk').addEventListener('change', function (e) {
            S.settings.voice = e.target.checked; saveSettings();
            if (!S.settings.voice) Voice.stop(); else Voice.say('A', 'en');
            focusInput();
        });
        panel.querySelector('#hkfgHideBtn').addEventListener('click', function () {
            S.settings.visible = false; saveSettings(); refreshVisibility(); focusInput();
        });

        S.mounted = true;
        refreshVisibility();
        return true;
    }

    function focusInput() {
        const input = document.getElementById('ttInput');
        if (input && !input.disabled) { try { input.focus(); } catch (e) {} }
    }

    function curTheme() {
        if (window.HKTheme && typeof window.HKTheme.get === 'function') return window.HKTheme.get();
        return S.settings.theme || 'light';
    }

    function applyTheme() {
        const p = document.getElementById('hkfgPanel');
        if (!p) return;
        S.settings.theme = curTheme();
        const sel = document.getElementById('hkfgTheme');
        if (sel && sel.value !== S.settings.theme) sel.value = S.settings.theme;
        p.classList.remove('hkfg-t-royal', 'hkfg-t-dark', 'hkfg-t-light');
        p.classList.add('hkfg-t-' + S.settings.theme);
    }

    // ------------------------------------------------------------
    // 🔊 VOICE — टाइप किया अक्षर female आवाज़ में बोलें
    // ------------------------------------------------------------
    const OL_SOUND = {
        'ᱚ': 'अ', 'ᱛ': 'त', 'ᱜ': 'ग', 'ᱝ': 'अं', 'ᱞ': 'ल', 'ᱟ': 'आ', 'ᱠ': 'क', 'ᱡ': 'ज', 'ᱢ': 'म', 'ᱣ': 'व',
        'ᱤ': 'इ', 'ᱥ': 'स', 'ᱦ': 'ह', 'ᱧ': 'ञ', 'ᱨ': 'र', 'ᱩ': 'उ', 'ᱪ': 'च', 'ᱫ': 'द', 'ᱬ': 'ण', 'ᱭ': 'य',
        'ᱮ': 'ए', 'ᱯ': 'प', 'ᱰ': 'ड', 'ᱱ': 'न', 'ᱲ': 'ड़', 'ᱳ': 'ओ', 'ᱴ': 'ट', 'ᱵ': 'ब', 'ᱶ': 'व', 'ᱷ': 'ह',
        '᱐': '०', '᱑': '१', '᱒': '२', '᱓': '३', '᱔': '४', '᱕': '५', '᱖': '६', '᱗': '७', '᱘': '८', '᱙': '९'
    };
    const EN_PUNCT = { '.': 'full stop', ',': 'comma', '?': 'question mark', '!': 'exclamation', ';': 'semicolon', ':': 'colon', '-': 'dash', "'": 'apostrophe', '"': 'quote' };
    const HI_PUNCT = { '।': 'पूर्ण विराम', ',': 'अल्पविराम', '?': 'प्रश्नचिह्न', '.': 'बिंदु', '-': 'डैश', '᱾': 'पूर्ण विराम', '᱿': 'पूर्ण विराम' };
    // लोकप्रिय female voices (Windows/Chrome/Edge/Android/Mac) — पसंद के क्रम में
    const FEMALE_PREF = {
        hi: ['Swara', 'Google हिन्दी', 'Kalpana', 'Lekha', 'Heera', 'Female'],
        en: ['Aria', 'Jenny', 'Neerja', 'Google UK English Female', 'Google US English', 'Zira', 'Heera', 'Samantha', 'Veena', 'Karen', 'Female']
    };
    const FEMALE_RX = /female|woman|aria|jenny|neerja|swara|kalpana|lekha|heera|zira|samantha|veena|karen|google (हिन्दी|us english|uk english female)/i;
    const MALE_RX = /\b(male|david|mark|guy|ravi|hemant|madhur|prabhat|daniel|alex|fred)\b/i;

    const Voice = {
        cache: {},
        ok: typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined',
        pick: function (lang) {
            if (!this.ok) return null;
            if (this.cache[lang]) return this.cache[lang];
            const all = window.speechSynthesis.getVoices() || [];
            if (!all.length) return null;
            const forLang = all.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(lang) === 0; });
            let v = null;
            (FEMALE_PREF[lang] || []).some(function (name) {
                v = forLang.find(function (x) { return x.name.indexOf(name) >= 0 && !MALE_RX.test(x.name); }) || null;
                return !!v;
            });
            if (!v) v = forLang.find(function (x) { return FEMALE_RX.test(x.name) && !MALE_RX.test(x.name); }) || null;
            if (!v) v = forLang.find(function (x) { return !MALE_RX.test(x.name); }) || forLang[0] || null;
            if (v) this.cache[lang] = v;
            return v;
        },
        stop: function () { if (this.ok) try { window.speechSynthesis.cancel(); } catch (e) {} },
        say: function (text, lang) {
            if (!this.ok || !text) return;
            try {
                const u = new SpeechSynthesisUtterance(text);
                const v = this.pick(lang);
                if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; }
                u.rate = 1.15; u.pitch = 1.1; u.volume = 1;
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(u);
            } catch (e) {}
        }
    };
    if (Voice.ok) {
        try {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.addEventListener('voiceschanged', function () { Voice.cache = {}; });
        } catch (e) {}
    }

    // आख़िरी अक्षर (matra/halant सहित पूरा syllable) निकालें
    function lastCluster(val) {
        if (!val) return '';
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            try {
                const segs = Array.from(new Intl.Segmenter('hi', { granularity: 'grapheme' }).segment(val));
                return segs.length ? segs[segs.length - 1].segment : '';
            } catch (e) {}
        }
        const m = val.match(/[\u0915-\u0939\u0958-\u095F][\u093C]?(?:\u094D[\u0915-\u0939][\u093C]?)*[\u093E-\u094C\u0962\u0963]?[\u0901-\u0903]?$/);
        return m ? m[0] : val.slice(-1);
    }

    function speakTyped(val) {
        if (!S.settings.voice || S.exam || !Voice.ok || !val) return;
        const ch = val.slice(-1);
        if (ch === ' ' || ch === '\n' || ch === '\t') return;
        if (/[\u0900-\u097F]/.test(ch)) {
            if (ch === '\u094D') return;                         // halant पर अगला अक्षर आने दें
            return Voice.say(lastCluster(val), 'hi');
        }
        if (/[\u1C50-\u1C7F]/.test(ch)) {
            if (OL_SOUND[ch]) Voice.say(OL_SOUND[ch], 'hi');
            else if (HI_PUNCT[ch]) Voice.say(HI_PUNCT[ch], 'hi');
            return;
        }
        if (ch === '।') return Voice.say(HI_PUNCT[ch], 'hi');
        if (/[a-z]/i.test(ch)) return Voice.say(ch.toUpperCase(), 'en');   // A, B, C… (letter name)
        if (/[0-9]/.test(ch)) return Voice.say(ch, 'en');
        const isDevLayout = S.layout === 'hindi-dev' || S.layout === 'santali-dev' || S.layout === 'olchiki';
        if (isDevLayout && HI_PUNCT[ch]) return Voice.say(HI_PUNCT[ch], 'hi');
        if (EN_PUNCT[ch]) return Voice.say(EN_PUNCT[ch], 'en');
    }

    function refreshVisibility() {
        const panel = document.getElementById('hkfgPanel');
        const col = document.getElementById('hkfgCollapsed');
        if (!panel || !col) return;
        const blocked = S.exam || isSmallTouch();
        const show = !blocked && S.settings.visible;
        panel.style.display = show ? '' : 'none';
        col.style.display = (!blocked && !S.settings.visible) ? '' : 'none';
        setWide(!blocked);
        updateBar();
    }

    // ------------------------------------------------------------
    // 🧭 HEADER BAR — Level + Timer + ☰ Menu (Pause/Resume, Restart, Cancel)
    // ------------------------------------------------------------
    function levelText() {
        const btn = document.querySelector('.tt-lesson-btn.active');
        if (!btn) return '';
        const col = btn.closest('.tt-lesson-col');
        const head = col && col.querySelector('.tt-lesson-heading');
        const lvl = head ? head.textContent.trim() : '';
        const name = btn.textContent.trim();
        return lvl ? lvl + ' · ' + name : name;
    }

    function syncTimer() {
        const src = document.getElementById('ttTimer');
        const dst = document.getElementById('hkfgTime');
        if (!src || !dst) return;
        const t = src.textContent.trim();
        dst.textContent = '⏱ ' + t;
        const m = t.match(/^(\d+):(\d+)$/);
        dst.classList.toggle('hkfg-low', !!m && (+m[1] * 60 + +m[2]) <= 10);
    }

    function pauseLabel() {
        const pb = document.getElementById('ttPauseBtn');
        const txt = pb ? pb.textContent.trim() : '';
        return /resume/i.test(txt) ? '▶️ Resume' : '⏸️ Pause';
    }

    function ensureBar() {
        const win = document.querySelector('#typingTestModal .tt-modal-window');
        const header = win && win.querySelector('.modal-header');
        if (!header || document.getElementById('hkfgBar')) return;
        const bar = document.createElement('div');
        bar.id = 'hkfgBar';
        bar.innerHTML =
            '<span class="hkfg-lvl" id="hkfgLvl"></span>' +
            '<span class="hkfg-time" id="hkfgTime">⏱ --:--</span>' +
            '<button type="button" class="hkfg-mbtn" id="hkfgMenuBtn" aria-haspopup="true">☰ Menu ▾</button>' +
            '<div class="hkfg-menu" id="hkfgMenu" role="menu">' +
                '<button type="button" data-act="pause" id="hkfgPauseItem">⏸️ Pause</button>' +
                '<button type="button" data-act="restart">🔄 Restart</button>' +
                '<hr>' +
                '<button type="button" data-act="cancel" class="hkfg-danger">✕ Cancel</button>' +
            '</div>';
        const close = header.querySelector('.modal-close');
        if (close) header.insertBefore(bar, close); else header.appendChild(bar);

        const menu = bar.querySelector('#hkfgMenu');
        bar.querySelectorAll('button').forEach(function (b) {
            b.addEventListener('mousedown', function (e) { e.preventDefault(); });
        });
        bar.querySelector('#hkfgMenuBtn').addEventListener('click', function (e) {
            e.stopPropagation();
            bar.querySelector('#hkfgPauseItem').textContent = pauseLabel();
            menu.classList.toggle('open');
        });
        menu.addEventListener('click', function (e) {
            const b = e.target.closest('button[data-act]');
            if (!b) return;
            e.stopPropagation();
            menu.classList.remove('open');
            const act = b.getAttribute('data-act');
            try {
                if (act === 'pause' && typeof toggleManualPause === 'function') { toggleManualPause(); focusInput(); }
                else if (act === 'restart' && typeof stopAndRestartTest === 'function') stopAndRestartTest();
                else if (act === 'cancel' && typeof closeTypingTestModal === 'function') closeTypingTestModal();
            } catch (err) { console.warn('[finger-guide] menu', err); }
        });
        document.addEventListener('click', function () { menu.classList.remove('open'); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.classList.remove('open'); });

        const timer = document.getElementById('ttTimer');
        if (timer) {
            new MutationObserver(syncTimer).observe(timer, { childList: true, characterData: true, subtree: true });
        }
    }

    function updateBar() {
        ensureBar();
        const l = document.getElementById('hkfgLvl');
        if (l) { const t = levelText(); l.textContent = t ? '🎯 ' + t : ''; l.style.display = t ? '' : 'none'; l.title = t; }
        syncTimer();
    }

    // Practice चलते समय modal चौड़ा + compact (बिना scroll)
    function setWide(on) {
        const win = document.querySelector('#typingTestModal .tt-modal-window');
        const arena = document.getElementById('ttArena');
        const arenaOn = arena && arena.style.display !== 'none';
        if (win) win.classList.toggle('hkfg-wide', !!on && !!arenaOn);
    }

    // ------------------------------------------------------------
    // 💡 LIVE UPDATE
    // ------------------------------------------------------------
    function clearHighlights() {
        Object.keys(S.keyEls).forEach(function (code) {
            S.keyEls[code].classList.remove('hkfg-next', 'hkfg-mod');
        });
        if (S.panel) {
            S.panel.querySelectorAll('.hkfg-f.on').forEach(function (f) { f.classList.remove('on'); });
        }
    }

    function lightKey(code, cls) {
        const k = S.keyEls[code];
        if (k) k.classList.add(cls);
    }

    function lightFinger(fid) {
        if (!S.panel || !fid) return;
        S.panel.querySelectorAll('.hkfg-f[data-f="' + fid + '"]').forEach(function (f) { f.classList.add('on'); });
    }

    function chip(fid) {
        const F = FINGERS[fid];
        return '<span class="hkfg-chip" style="background:' + F.color + '">' + HAND_NAME[F.hand] + ', ' + F.name + '</span>';
    }

    function update() {
        updateCore();
        const hint = document.getElementById('hkfgHint');
        if (hint && S.syncNote) {
            hint.insertAdjacentHTML('beforeend', ' <small>· ' + esc(S.syncNote) + '</small>');
            if (!S.syncNoteTimer) {
                S.syncNoteTimer = setTimeout(function () { S.syncNote = ''; S.syncNoteTimer = null; update(); }, 4000);
            }
        }
    }

    function updateCore() {
        if (!S.mounted) return;
        const st = ttState();
        const input = document.getElementById('ttInput');
        const hint = document.getElementById('hkfgHint');
        clearHighlights();
        if (!st || !input || !hint || !st.text) { if (hint) hint.innerHTML = ''; return; }

        const idx = input.value.length;
        if (idx >= st.text.length) { hint.innerHTML = '✅ पूरा हुआ!'; return; }

        // System keyboard गलत भाषा पर है
        const warn = systemMismatch();
        if (warn) { hint.innerHTML = warn; return; }

        // पिछला अक्षर गलत है तो पहले उसे ठीक करने का संकेत
        if (idx > 0 && input.value[idx - 1] !== st.text[idx - 1] && !st.examNoBackspace) {
            lightKey('Backspace', 'hkfg-next');
            lightFinger('RP');
            hint.innerHTML = '❌ पिछला अक्षर गलत — <span class="hkfg-big">⌫</span> Backspace ' + chip('RP');
            return;
        }

        const ch = st.text[idx];
        const steps = stepsFor(ch);
        if (!steps) {
            hint.innerHTML = 'अगला: <b>' + esc(charName(ch)) + '</b> — यह अक्षर इस layout में सीधे नहीं है।';
            return;
        }
        const first = steps[0];
        const fid = FINGER_OF[first.code];
        lightKey(first.code, 'hkfg-next');
        lightFinger(fid);

        let html = 'अगला <b>' + esc(charName(ch)) + '</b> → <span class="hkfg-big">' + esc(keyLabelOf(first.code)) + '</span>' + (fid ? chip(fid) : '');
        if (first.shift) {
            const sc = shiftCodeFor(first.code);
            lightKey(sc, 'hkfg-mod');
            lightFinger(FINGER_OF[sc]);
            html += ' + <span class="hkfg-big">Shift</span>' + chip(FINGER_OF[sc]);
        }
        if (first.altgr) {
            lightKey('AltRight', 'hkfg-mod');
            html += ' + <span class="hkfg-big">AltGr</span>' + chip('TH');
        }
        if (steps.length > 1) {
            html += ' <small>(' + esc(charName(ch)) + ' = ' + steps.map(function (s) {
                return (s.shift ? 'Shift+' : '') + (s.altgr ? 'AltGr+' : '') + keyLabelOf(s.code);
            }).join(' फिर ') + ')</small>';
        }
        // उंगली अपनी home key से कहाँ जाएगी
        if (fid && HOME_KEY[fid] && HOME_KEY[fid] !== first.code && fid !== 'TH') {
            html += ' <small>· ' + esc(keyLabelOf(HOME_KEY[fid])) + ' से जाएँ, फिर वापस</small>';
        }
        hint.innerHTML = html;
    }

    function flash(code, good) {
        const k = S.keyEls[code];
        if (!k) return;
        const cls = good ? 'hkfg-good' : 'hkfg-bad';
        k.classList.add(cls);
        setTimeout(function () { k.classList.remove(cls); }, 180);
    }

    // ------------------------------------------------------------
    // 📊 STATS (हर टाइप किए अक्षर पर)
    // ------------------------------------------------------------
    function recordInput() {
        const st = ttState();
        const input = document.getElementById('ttInput');
        if (!st || !input || !st.text) return;
        const val = input.value;
        if (val.length > S.prevLen) {
            for (let i = S.prevLen; i < val.length && i < st.text.length; i++) {
                const exp = st.text[i];
                const steps = stepsFor(exp);
                if (!steps) continue;
                const code = steps[0].code;
                const fid = FINGER_OF[code];
                const ok = val[i] === exp;
                S.stats.total++;
                if (!ok) S.stats.wrong++;
                if (fid) {
                    S.stats.fingers[fid].total++;
                    if (!ok) S.stats.fingers[fid].wrong++;
                }
                const ks = S.stats.keys[code] || (S.stats.keys[code] = { total: 0, wrong: 0 });
                ks.total++;
                if (!ok) ks.wrong++;
            }
        }
        if (val.length > S.prevLen) speakTyped(val);
        S.prevLen = val.length;
    }

    // ------------------------------------------------------------
    // 🔤 PHONETIC TYPING (केवल "Hoṛ Katha Phonetic" चुनने पर)
    // ------------------------------------------------------------
    function phoneticChar(e) {
        const kind = PROFILES[S.profileId].phonetic;
        if (!kind) return null;
        if (e.ctrlKey || e.metaKey || e.altKey) return null;
        if (!e.key || e.key.length !== 1 || e.key === ' ') return null;
        if (kind === 'dev') {
            if (S.layout !== 'english' && (e.key === ']' || e.key === '}')) return '़';
            return (typeof hardwareDevMap !== 'undefined' && hardwareDevMap[e.key]) || null;
        }
        return (typeof hardwareOlchikiMap !== 'undefined' && hardwareOlchikiMap[e.key.toLowerCase()]) || null;
    }

    // ------------------------------------------------------------
    // 🖥️ SYSTEM KEYBOARD SYNC — Windows में जो keyboard चालू है, guide वही दिखाए
    // ------------------------------------------------------------
    function scriptOf(ch) {
        if (!ch || ch.length !== 1) return null;
        if (/[\u0900-\u097F]/.test(ch)) return 'dev';
        if (/[\u1C50-\u1C7F]/.test(ch)) return 'ol';
        if (/[A-Za-z]/.test(ch)) return 'lat';
        return null;
    }

    // system जो अक्षर भेज रहा है उसके हिसाब से सही profile
    function profileForSystem(layout, script) {
        if (layout === 'hindi-dev' || layout === 'santali-dev') {
            if (script === 'dev') return 'inscript';
            if (script === 'lat') return 'dev-phon';
        } else if (layout === 'olchiki') {
            if (script === 'ol') return 'olchiki-win';
            if (script === 'lat') return 'ol-phon';
        } else if (script === 'lat') {
            return 'qwerty';
        }
        return null;
    }

    function syncToSystem(script, silent) {
        S.sysScript = script;
        const want = profileForSystem(S.layout, script);
        if (want && want !== S.profileId && (LAYOUT_PROFILES[S.layout] || []).indexOf(want) >= 0) {
            S.settings.profiles[S.layout] = want;
            saveSettings();
            applyProfile(S.layout, want);
            buildPanel();
            if (!silent) S.syncNote = '🖥️ System keyboard के अनुसार: ' + PROFILES[want].name;
        }
        update();
    }

    // Test शुरू होते ही (Chrome/Edge) system layout पढ़ें
    function probeSystemLayout() {
        try {
            if (!navigator.keyboard || !navigator.keyboard.getLayoutMap) return;
            navigator.keyboard.getLayoutMap().then(function (m) {
                const sc = scriptOf(m.get('KeyF')) || scriptOf(m.get('KeyK'));
                if (sc) syncToSystem(sc, true);
            }).catch(function () {});
        } catch (e) {}
    }

    // System keyboard गलत भाषा पर हो तो चेतावनी
    function systemMismatch() {
        const sc = S.sysScript;
        if (!sc) return '';
        const isDev = S.layout === 'hindi-dev' || S.layout === 'santali-dev';
        if ((S.layout === 'english' || S.layout === 'roman') && sc !== 'lat')
            return '⚠️ System keyboard English (ENG) पर करें — <b>Win + Space</b>';
        if (isDev && sc === 'ol') return '⚠️ System keyboard Hindi या English पर करें — <b>Win + Space</b>';
        if (S.layout === 'olchiki' && sc === 'dev') return '⚠️ System keyboard Ol Chiki या English पर करें — <b>Win + Space</b>';
        return '';
    }

    function onKeyDown(e) {
        const st = ttState();
        if (!st || !st.active || st._finished) return;
        const input = e.target;

        // हर printable key से system layout पहचानें
        if (!e.ctrlKey && !e.metaKey && /^Key[A-Z]$/.test(e.code)) {
            const sc = scriptOf(e.key);
            if (sc && sc !== S.sysScript) syncToSystem(sc, false);
        }

        // Phonetic: key को अक्षर में बदलें
        const mapped = phoneticChar(e);
        if (mapped) {
            e.preventDefault();
            // हमेशा cursor पर जोड़ें (selection हटाकर नहीं — exam में backspace-bypass न हो)
            const a = input.selectionEnd, b = a;
            try {
                input.setRangeText(mapped, a, b, 'end');
            } catch (err) {
                input.value = input.value.slice(0, a) + mapped + input.value.slice(b);
            }
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // सही / गलत key flash
        if (!S.mounted || S.exam || e.repeat) return;
        if (/^(Shift|Control|Alt|Meta|CapsLock|Backspace|Tab|Escape)/.test(e.code)) return;
        const idx = input.value.length - (mapped ? 1 : 0);
        const steps = stepsFor(st.text[idx]);
        if (!steps) return;
        const want = steps[0];
        const good = e.code === want.code && (!want.shift || e.shiftKey);
        flash(e.code, good);
    }

    function onInput() {
        recordInput();
        update();
    }

    // ------------------------------------------------------------
    // 🔁 TEST START / RESET
    // ------------------------------------------------------------
    function onTestStart() {
        if (isSmallTouch()) return;
        const st = ttState();
        const layout = window.currentLayout || 'english';
        S.exam = !!(st && st.exam);
        S.stats = freshStats();
        S.prevLen = 0;
        S.syncNote = '';
        applyProfile(layout, pickProfile(layout));
        removeReport();
        buildPanel();
        update();
        probeSystemLayout();
    }

    // ------------------------------------------------------------
    // 📈 RESULT REPORT
    // ------------------------------------------------------------
    function removeReport() {
        const r = document.getElementById('hkfgReport');
        if (r) r.remove();
    }

    function renderReport() {
        const result = document.getElementById('ttResult');
        if (!result || S.stats.total < 5) return;
        injectStyles();
        removeReport();

        const box = document.createElement('div');
        box.id = 'hkfgReport';
        box.className = 'hkfg-report';

        let worst = null;
        let rows = '';
        FINGER_ORDER.forEach(function (fid) {
            const f = S.stats.fingers[fid];
            if (!f.total) return;
            const acc = Math.round(((f.total - f.wrong) / f.total) * 100);
            const F = FINGERS[fid];
            const label = (F.hand === 'L' ? 'बायाँ ' : F.hand === 'R' ? 'दायाँ ' : '') + F.name;
            if (f.wrong > 0 && (!worst || acc < worst.acc)) worst = { fid: fid, acc: acc, label: label };
            rows += '<span>' + esc(label) + '</span>' +
                '<div class="hkfg-bar"><i style="width:' + acc + '%;background:' + F.color + '"></i></div>' +
                '<span>' + acc + '% · ' + f.wrong + '/' + f.total + '</span>';
        });

        // सबसे कमज़ोर keys
        const weak = Object.keys(S.stats.keys)
            .map(function (c) { const k = S.stats.keys[c]; return { code: c, wrong: k.wrong, total: k.total, rate: k.wrong / k.total }; })
            .filter(function (k) { return k.wrong > 0; })
            .sort(function (a, b) { return b.rate - a.rate || b.wrong - a.wrong; })
            .slice(0, 5);

        let html = '<h4>✋ उंगली-वार रिपोर्ट</h4><div class="hkfg-bars">' + rows + '</div>';
        if (worst) {
            html += '<div class="hkfg-weak">🎯 सबसे ज़्यादा अभ्यास चाहिए: <b>' + esc(worst.label) + '</b> (' + worst.acc + '%)</div>';
        } else {
            html += '<div class="hkfg-weak">🌟 किसी उंगली से गलती नहीं हुई — शानदार!</div>';
        }
        if (weak.length) {
            html += '<div class="hkfg-weak">⚠️ कमज़ोर keys: ' + weak.map(function (k) {
                return '<b>' + esc(keyLabelOf(k.code)) + '</b> (' + k.wrong + '/' + k.total + ')';
            }).join(', ') + '</div>';
        }
        html += '<div class="hkfg-weak" style="margin-top:8px;">🗺️ Key Heatmap (लाल = ज़्यादा गलती)</div><div class="hkfg-kb" id="hkfgHeat"></div>';
        box.innerHTML = html;

        const heat = buildKeyboard(box.querySelector('#hkfgHeat'), 'heat');
        Object.keys(heat).forEach(function (code) {
            const k = S.stats.keys[code];
            if (!k || !k.total) return;
            const r = k.wrong / k.total;
            // हरा (0%) → पीला → लाल (50%+)
            const t = Math.min(1, r * 2);
            const hue = Math.round(130 - 130 * t);
            heat[code].style.background = 'hsl(' + hue + ',75%,' + (r ? 55 : 72) + '%)';
            heat[code].title = keyLabelOf(code) + ': ' + k.wrong + ' गलती / ' + k.total;
        });

        const actions = result.querySelector('.tt-result-actions');
        if (actions) actions.insertAdjacentElement('beforebegin', box);
        else result.appendChild(box);
    }

    // ------------------------------------------------------------
    // 🔌 WIRING
    // ------------------------------------------------------------
    function wire() {
        const target = document.getElementById('ttTargetText');
        const input = document.getElementById('ttInput');
        const result = document.getElementById('ttResult');
        if (!target || !input) return false;

        // startTypingTest() हर बार target text नए सिरे से बनाता है
        new MutationObserver(function () {
            const st = ttState();
            if (st && st.text && target.childNodes.length) onTestStart();
        }).observe(target, { childList: true });

        input.addEventListener('input', onInput);
        input.addEventListener('keydown', onKeyDown, true);

        document.addEventListener('hk-theme-change', function () { applyTheme(); });

        const arena = document.getElementById('ttArena');
        if (arena) {
            new MutationObserver(function () { refreshVisibility(); })
                .observe(arena, { attributes: true, attributeFilter: ['style'] });
        }

        if (result) {
            new MutationObserver(function () {
                if (result.style.display !== 'none') renderReport();
            }).observe(result, { attributes: true, attributeFilter: ['style'] });
        }
        return true;
    }

    function init(tries) {
        if (wire()) {
            console.log('✅ [finger-guide] ready');
            return;
        }
        if ((tries || 0) < 40) setTimeout(function () { init((tries || 0) + 1); }, 250);
    }

    // Debug / बाहरी उपयोग
    window.FingerGuide = {
        show: function () { S.settings.visible = true; saveSettings(); refreshVisibility(); },
        hide: function () { S.settings.visible = false; saveSettings(); refreshVisibility(); },
        stats: function () { return JSON.parse(JSON.stringify(S.stats)); },
        stepsFor: function (ch) { return stepsFor(ch); },
        setProfile: function (layout, id) {
            if ((LAYOUT_PROFILES[layout] || []).indexOf(id) < 0) return false;
            S.settings.profiles[layout] = id; saveSettings(); return true;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(0); });
    } else {
        init(0);
    }
})();
