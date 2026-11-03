// ============================================================
// 🖼️ Poster Maker — lightweight loader (v53)
// The full Poster Maker (js/poster-core.js, about 350 KB) no longer loads at app startup.
// It loads when the app is idle, or when the Poster button is clicked, so typing and the app open fast.
// ============================================================
(function () {
    'use strict';
    if (window.__HKPOSTER_STUB__ || window.__HKPOSTER_LOADED__) return;
    window.__HKPOSTER_STUB__ = true;
    let p = null;
    function load() {
        if (window.__HKPOSTER_LOADED__) return Promise.resolve();
        if (p) return p;
        p = new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'js/poster-core.js'; s.async = true;
            s.onload = () => res(); s.onerror = () => { p = null; rej(new Error('poster-core load failed')); };
            (document.head || document.documentElement).appendChild(s);
        });
        return p;
    }
    function stub() {
        const b = document.activeElement; if (b && b.style) b.style.cursor = 'progress';
        return load().then(() => {
            if (b && b.style) b.style.cursor = '';
            if (window.openPosterMaker && window.openPosterMaker !== stub) return window.openPosterMaker.apply(window, arguments);
        }).catch(() => {
            if (b && b.style) b.style.cursor = '';
            const m = 'Poster Maker load नहीं हुआ — internet जाँचकर फिर खोलें।';
            if (window.showToast) window.showToast(m, 'warning'); else alert(m);
        });
    }
    window.openPosterMaker = stub;
    window.closePosterMaker = function () {};
    window.__hkPosterLoad = load;
    // app पूरा खुलने के बाद, खाली समय में पहले से load (पहली बार भी Poster तुरंत खुले)
    const idle = () => (window.requestIdleCallback ? requestIdleCallback(() => load().catch(() => {}), { timeout: 8000 }) : setTimeout(() => load().catch(() => {}), 4000));
    if (document.readyState === 'complete') setTimeout(idle, 2500); else window.addEventListener('load', () => setTimeout(idle, 2500), { once: true });
})();
