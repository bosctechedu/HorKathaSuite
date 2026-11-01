// ============================================================
// 🎨 HK THEME — Hoṛ Katha Suite (v35)
// ------------------------------------------------------------
// 3 Themes: ☀️ Light (default) · 🌙 Dark · 🌌 Royal
//   • हर बार App खुलने पर (Refresh / Ctrl+Shift+R भी) Light से शुरू
//   • Toolbar का theme button: Light → Dark → Royal → Light
//   • Shortcut: F8
//   • Typing Practice का Finger Guide भी इसी theme के साथ चलता है
// पुराने toggleTheme() को replace करता है; बाकी code अछूता।
// ============================================================
(function () {
    'use strict';
    if (window.HKTheme) return;

    const THEMES = ['light', 'dark', 'royal'];
    const META = {
        light: { icon: '☀️', title: 'Theme: Light', color: '#f6f8fa' },
        dark:  { icon: '🌙', title: 'Theme: Dark',  color: '#0d1117' },
        royal: { icon: '🌌', title: 'Theme: Royal', color: '#140f3a' }
    };
    let current = 'light';

    // Royal = dark का ढांचा + indigo रंग (style.css के variables override)
    const CSS = [
        'body[data-skin="royal"]{',
        '--bg-body:#120d33;--bg-card:#1b1548;--bg-panel:#221a57;--bg-hover:#2b2268;',
        '--border-color:#3d3189;--border-accent:#a78bfa;--border-subtle:#2b2268;',
        '--primary:#7c3aed;--primary-hover:#6d28d9;--primary-active:#5b21b6;',
        '--text-main:#ede9fe;--text-muted:#a5b4fc;--text-bright:#ffffff;',
        '--key-bg:#251d5e;--key-border:#4f42a8;--key-func:#2f2572;--key-shadow:rgba(0,0,0,.45);',
        'background:radial-gradient(120% 120% at 50% 0%,#241b62 0%,#120d33 60%,#0a0720 100%);}',
        '#btn-theme-toggle[title="Theme: Royal"]::after{content:"Royal Mode";}',
        '#btn-theme-toggle[title="Theme: Royal"]{--hk-fill:linear-gradient(135deg,#4f46e5,#a855f7);}',
        '/* v38: Dark/Royal में पढ़ने लायक contrast (Light वैसा ही) */',
        '[data-theme="dark"] .app-main-title{color:#93c5fd;}',
        '[data-theme="dark"] .app-main-title:hover{color:#bfdbfe;}',
        '[data-theme="dark"] .developer-credit{color:#cbd5e1;}',
        '[data-theme="dark"] .greeting-text{color:#fde68a;}',
        '[data-theme="dark"] .key.key-func{color:#d0d7de;}',
        '[data-theme="dark"] .key.key-func.active-lock{color:#ffffff;}',
        '[data-theme="dark"] .counter,[data-theme="dark"] .panel-title,[data-theme="dark"] .keyboard-deck-title{color:#d0d7de;}',
        '[data-theme="dark"] .status-chip.save-ok{color:#56d364;background:rgba(46,160,67,.22);}',
        '[data-theme="dark"] #draftStatusBadge{color:#4ade80!important;}',
        '[data-theme="dark"] .tab-pill.is-locked,[data-theme="dark"] .btn-action.is-locked{opacity:.85!important;}',
        'body[data-skin="royal"][data-theme="dark"] .app-main-title{color:#ddd6fe;}',
        'body[data-skin="royal"][data-theme="dark"] .app-main-title:hover{color:#ffffff;}',
        'body[data-skin="royal"][data-theme="dark"] .developer-credit{color:#c4b5fd;}',
        'body[data-skin="royal"][data-theme="dark"] .key.key-func{color:#e0e7ff;}',
        'body[data-skin="royal"][data-theme="dark"] .counter,body[data-skin="royal"][data-theme="dark"] .panel-title,body[data-skin="royal"][data-theme="dark"] .keyboard-deck-title{color:#ddd6fe;}',
        'body[data-skin="royal"][data-theme="dark"] .key-dia{color:#e9d5ff;border-bottom-color:#a78bfa;}',
        'body[data-skin="royal"][data-theme="dark"] .key-dia:hover{color:#ffffff;}',
        'body[data-skin="royal"][data-theme="dark"] .map-badge{border-bottom-color:#a78bfa;}',
        'body[data-skin="royal"][data-theme="dark"] .map-badge span:first-child{color:#e9d5ff;}',
        'body[data-skin="royal"][data-theme="dark"] #numpad-script-tag{color:#d8b4fe!important;}',
        /* theme बदलते समय एक frame के लिए animations बंद → झटका नहीं */
        'html.hk-theme-switching *,html.hk-theme-switching *::before,html.hk-theme-switching *::after{transition:none!important;animation-duration:0s!important;}'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('hkThemeCss')) return;
        const st = document.createElement('style');
        st.id = 'hkThemeCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }

    function apply(theme, opts) {
        opts = opts || {};
        if (THEMES.indexOf(theme) < 0) theme = 'light';
        current = theme;
        const html = document.documentElement;
        const body = document.body;
        const base = theme === 'light' ? 'light' : 'dark';

        html.classList.add('hk-theme-switching');
        html.setAttribute('data-theme', base);
        if (body) {
            body.setAttribute('data-theme', base);
            if (theme === 'royal') body.setAttribute('data-skin', 'royal');
            else body.removeAttribute('data-skin');
        }
        // app.js इसी key को पढ़ता है — पर हर load पर हम Light से शुरू करते हैं
        try { localStorage.setItem('hor_katha_theme', base); } catch (e) {}

        const btn = document.getElementById('btn-theme-toggle');
        if (btn) {
            btn.textContent = META[theme].icon;
            btn.title = META[theme].title;
            btn.setAttribute('aria-label', META[theme].title + ' (F8)');
        }
        document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
            m.setAttribute('content', META[theme].color);
        });

        requestAnimationFrame(function () {
            requestAnimationFrame(function () { html.classList.remove('hk-theme-switching'); });
        });

        if (!opts.silent) {
            try { document.dispatchEvent(new CustomEvent('hk-theme-change', { detail: { theme: theme } })); } catch (e) {}
            if (opts.toast && typeof window.showToast === 'function') {
                window.showToast(META[theme].icon + ' ' + META[theme].title.replace('Theme: ', '') + ' Theme', 'info', 1200);
            }
        }
    }

    function next() {
        apply(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length], { toast: true });
    }

    window.HKTheme = {
        get: function () { return current; },
        set: function (t) { apply(t); },
        next: next,
        list: THEMES.slice()
    };
    // toolbar button (onclick="toggleTheme()") अब 3 themes में घूमेगा
    window.toggleTheme = next;

    // Shortcut: F8 (F1, F2, F9 और Alt+N/R/T पहले से App में इस्तेमाल हैं)
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'F8' || e.ctrlKey || e.altKey || e.metaKey) return;
        e.preventDefault();
        e.stopPropagation();
        next();
    }, true);

    injectCss();
    apply('light', { silent: true });

    // app.js init बाद में localStorage से theme लगाता है — उसके बाद भी Light पक्का करें
    function enforceStart() { if (current === 'light') apply('light', { silent: true }); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { apply(current, { silent: true }); });
    }
    window.addEventListener('load', function () { setTimeout(enforceStart, 0); setTimeout(enforceStart, 600); });

    console.log('✅ [theme] Light / Dark / Royal ready — F8');
})();
