// ============================================================
// 🎫 PLAN — एक ही जगह से plan और feature gate (v58)
// BOSC Tech & Edu · Hoṛ Katha Suite
// ------------------------------------------------------------
// Plan सिर्फ़ signed जाँच से आता है:
//   • Pro  → window.hkProVerified()  (index.html signedProGate, ECDSA key check)
//            या license.js का verified session (window.hkLicenseVerifiedPlan)
//   • Trial → window.hkSignedTrialActive()  (Worker-signed trial token)
// localStorage में लिखा "tier" अकेले कुछ नहीं खोलता।
//
//   hkPlan()        → 'free' | 'trial' | 'p1' | 'p2' | 'p3' | 'seat'
//   hkPlanLevel()   → 0 free · 1 P1 · 2 P2 · 3 P3/Trial · seat = उसकी key का plan
//   hkCan(feature)  → true/false (नीचे FEATURES देखें)
//   hkLocked(feature) → हिन्दी संदेश + "प्लान देखें" बटन
//   hkPlanSync()    → locks, badge, भाषा — सब plan के हिसाब से ताज़ा (reload नहीं)
// ============================================================
(function () {
    'use strict';
    if (window.hkPlan) return;

    // Official plan matrix (owner, 2026-11) — feature → कम से कम कौन-सा level
    const FEATURES = {
        langs: 1,              // Santali (R/D), ओलचिकी, हिन्दी — App Virtual mode
        export: 1,             // Word / TXT export
        pdf: 1,
        print: 1,
        kruti: 1,              // Kruti Dev
        emoji: 1, charmap: 1,
        cloudSync: 1,          // Docs Pro → My Documents Cloud Sync
        converter: 2,          // Script Converter
        ime: 2,                // IME Map
        posterNoWatermark: 2,  // Poster बिना watermark
        hindiPhonetic: 3,      // हिन्दी फोनेटिक (P3 / Trial)
        cloudAI: 3,            // Cloud AI transliteration
        typingTest: 3,         // Typing Practice / Test
        teacher: 'teacher'     // Teacher Dashboard: P3, Institute seat या ₹9 Trial (owner, 2026-11-05)
    };
    // पुराने requireProAccess('…') नाम → feature
    const NAMES = {
        'Kruti Dev Converter': 'kruti', 'Script Converter': 'converter', 'Document file convert': 'converter',
        'IME Exporter': 'ime', 'Word .doc Export': 'export', 'TXT Export': 'export', 'DOCX Export': 'export',
        'PDF Export': 'pdf', 'Print': 'print', 'Cloud Sync': 'cloudSync', 'Character Map': 'charmap',
        'Emoji Palette': 'emoji', 'Hindi Phonetic Add Word': 'hindiPhonetic', 'Cloud AI': 'cloudAI',
        'Typing Practice': 'typingTest', 'Teacher Dashboard': 'teacher'
    };
    const LABEL = {
        langs: 'Santali / ओलचिकी / हिन्दी typing', export: 'Word / TXT Export', pdf: 'PDF Export', print: 'Print',
        kruti: 'Kruti Dev', emoji: 'Emoji', charmap: 'Char Map', cloudSync: 'Cloud Sync',
        converter: 'Script Converter', ime: 'IME Map', posterNoWatermark: 'बिना watermark Poster',
        hindiPhonetic: 'हिन्दी फोनेटिक', cloudAI: 'Cloud AI', typingTest: 'Typing Practice', teacher: 'Teacher Dashboard'
    };
    const LEVEL = { free: 0, p1: 1, p2: 2, p3: 3, trial: 3 };

    function safe(fn, dflt) { try { return fn(); } catch (e) { return dflt; } }
    function lsGet(k) { return safe(() => localStorage.getItem(k), null); }
    function parse(raw) { return safe(() => (raw ? JSON.parse(raw) : null), null); }

    function verifiedProPlan() {
        let p = safe(() => (typeof window.hkProVerified === 'function' ? window.hkProVerified() : null), null);
        if (!p) p = safe(() => (typeof window.hkLicenseVerifiedPlan === 'function' ? window.hkLicenseVerifiedPlan() : null), null);
        p = String(p || '').toUpperCase();
        return /^P[123]$/.test(p) ? p : null;
    }
    function trialActive() {
        return safe(() => typeof window.hkSignedTrialActive === 'function' && window.hkSignedTrialActive() === true, false);
    }
    // Teacher Dashboard के लिए सिर्फ़ token वाला (Worker-signed) trial — पुराना बिना-token "legacy" trial नहीं।
    // trialActive() तभी true है जब हर रखी trial entry verify हो चुकी है, इसलिए token वाली entry = signed।
    function signedTrialWithToken() {
        if (!trialActive()) return false;
        const now = Date.now();
        return ['hk_trial_data', 'hk_trial_data_backup'].some((k) => {
            const t = parse(lsGet(k));
            return !!(t && t.token && t.sig && t.key && Number(t.expiresAt) > now);
        });
    }
    // Institute seat: Worker /session login का जवाब (tier SEAT)। सिर्फ़ label और Teacher बटन के लिए —
    // Teacher Dashboard की असली जाँच server पर होती है।
    function isSeat() {
        const ok = parse(lsGet('hk_session_ok'));
        if (!ok || ok.tier !== 'SEAT') return false;
        const lic = parse(lsGet('hk_pro_license')) || parse(lsGet('hk_pro_license_backup'));
        const k = String((lic && lic.key) || lsGet('hor_lic_key') || '').trim().toUpperCase();
        return !!k && ok.k === k;
    }

    function info() {
        const pro = verifiedProPlan();
        if (pro) {
            const keyLevel = Number(pro.slice(1));
            if (isSeat()) return { plan: 'seat', keyPlan: pro, level: keyLevel };
            return { plan: pro.toLowerCase(), keyPlan: pro, level: keyLevel };
        }
        if (trialActive()) return { plan: 'trial', keyPlan: 'P3', level: 3 };
        return { plan: 'free', keyPlan: null, level: 0 };
    }
    function hkPlan() { return info().plan; }
    function hkPlanLevel() { return info().level; }
    function featureKey(f) { return FEATURES[f] !== undefined ? f : (NAMES[f] || null); }
    function hkCan(feature) {
        const i = info();
        const k = featureKey(feature);
        const need = k ? FEATURES[k] : 1; // नया/अनजान नाम = कोई भी paid plan (पुराना व्यवहार)
        if (need === 'teacher') return i.plan === 'p3' || i.plan === 'seat' || (i.plan === 'trial' && signedTrialWithToken());
        return i.level >= need;
    }
    function needText(feature) {
        const k = featureKey(feature);
        const need = k ? FEATURES[k] : 1;
        if (need === 'teacher') return { plan: 3, text: 'P3 Ultimate (₹999), Institute seat या ₹9 Trial में है' };
        if (need >= 3) return { plan: 3, text: 'P3 Ultimate (₹999) या ₹9 Trial में है' };
        if (need === 2) return { plan: 2, text: 'P2/P3 (या ₹9 Trial) में है' };
        return { plan: 1, text: 'P1/P2/P3 (या ₹9 Trial) में है' };
    }

    // 🔒 Locked संदेश — हिन्दी + "प्लान देखें" बटन
    function openPlans(planNo) {
        safe(() => { if (typeof window.openBuyModal === 'function') window.openBuyModal(); });
        setTimeout(() => safe(() => { const r = document.getElementById('plan' + planNo); if (r && !r.checked) r.click(); }), 300);
    }
    let hideT = null;
    function hkLocked(feature) {
        const k = featureKey(feature);
        const name = (k && LABEL[k]) || String(feature || 'यह सुविधा');
        const n = needText(feature);
        const msg = '🔒 ' + name + ' — यह सुविधा ' + n.text + '। अपग्रेड करें।';
        let box = document.getElementById('hkLockMsg');
        if (!box && document.body) {
            box = document.createElement('div');
            box.id = 'hkLockMsg';
            box.setAttribute('role', 'alert');
            box.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483000;max-width:min(560px,94vw);display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:14px;background:#1e1b4b;color:#fff;font:600 14px/1.45 Inter,system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.35)';
            box.innerHTML = '<span id="hkLockTxt" style="flex:1"></span><button type="button" id="hkLockGo" style="border:0;border-radius:10px;padding:8px 12px;background:linear-gradient(135deg,#f59e0b,#ec4899);color:#fff;font-weight:800;cursor:pointer;white-space:nowrap">💎 प्लान देखें</button><button type="button" id="hkLockX" aria-label="बंद करें" style="border:0;background:transparent;color:#c7d2fe;font-size:18px;cursor:pointer">✕</button>';
            document.body.appendChild(box);
            box.querySelector('#hkLockX').addEventListener('click', () => { box.style.display = 'none'; });
        }
        if (box) {
            box.querySelector('#hkLockTxt').textContent = msg;
            box.querySelector('#hkLockGo').onclick = () => { box.style.display = 'none'; openPlans(n.plan); };
            box.style.display = 'flex';
            clearTimeout(hideT); hideT = setTimeout(() => { box.style.display = 'none'; }, 8000);
        } else {
            safe(() => { if (typeof window.showToast === 'function') window.showToast(msg, 'warning', 6000); });
        }
        return false;
    }
    // gate + संदेश एक साथ: if (!hkRequire('converter')) return;
    function hkRequire(feature) { return hkCan(feature) ? true : hkLocked(feature); }

    // 🔄 plan बदले (upgrade / expiry / deactivate) तो बिना reload सब ताज़ा
    function tierString(i) {
        if (i.plan === 'trial') return 'P3_TRIAL';
        if (i.plan === 'free') return 'FREE';
        return i.keyPlan;
    }
    let lastSig = '';
    function hkPlanSync(force) {
        const i = info();
        const sig = i.plan + ':' + i.level;
        // trial की जानकारी 15% upgrade छूट के लिए रखें (trial data हटने के बाद भी 7 दिन)
        if (i.plan === 'trial') safe(() => {
            const t = parse(lsGet('hk_trial_data')) || parse(lsGet('hk_trial_data_backup'));
            if (t && t.email && t.expiresAt) localStorage.setItem('hk_trial_last', JSON.stringify({ email: t.email, expiresAt: t.expiresAt }));
        });
        if (!force && sig === lastSig) return i;
        const changed = lastSig !== '' && sig !== lastSig;
        lastSig = sig;
        safe(() => { if (typeof window.applyLocks === 'function') window.applyLocks(tierString(i)); });
        safe(() => { if (typeof window.updateHeaderLicenseBadges === 'function') window.updateHeaderLicenseBadges(); });
        // जो भाषा अब plan में नहीं, वहाँ से English पर
        safe(() => {
            const L = window.currentLayout || 'english';
            const need = L === 'hindi-phonetic' ? 'hindiPhonetic' : (L !== 'english' ? 'langs' : null);
            if (need && !hkCan(need) && typeof window.switchLanguage === 'function') window.switchLanguage('english');
        });
        if (changed) safe(() => window.dispatchEvent(new CustomEvent('hk-plan-changed', { detail: i })));
        return i;
    }

    const api = { hkPlan, hkPlanLevel, hkCan, hkLocked, hkRequire, hkPlanSync, hkPlanInfo: info };
    Object.keys(api).forEach((k) => {
        try { Object.defineProperty(window, k, { value: api[k], writable: false, configurable: false }); }
        catch (e) { window[k] = api[k]; }
    });
    try { Object.defineProperty(window, 'HK_PLAN_FEATURES', { value: Object.freeze(Object.assign({}, FEATURES)), writable: false, configurable: false }); } catch (e) {}

    // Trial expiry / दूसरी tab में upgrade / signed check पूरा होना — सब यहीं पकड़ें
    setInterval(() => hkPlanSync(false), 30000);
    window.addEventListener('storage', (e) => { if (/^(hk_pro_license|hk_trial_data|hor_lic_|hk_session_ok)/.test(e.key || '')) setTimeout(() => hkPlanSync(false), 300); });
    window.addEventListener('license-changed', () => setTimeout(() => hkPlanSync(false), 50));
    window.addEventListener('app-ready', () => setTimeout(() => hkPlanSync(true), 50));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) hkPlanSync(false); });
})();
