// session.js — 👥 Concurrent login limits (Device ID / HWID इस्तेमाल नहीं होता)
// License = Email + Mobile. Limit: Trial 1 · P1 1 · P2 3 · P3 5 · Institute seat 1.
// Limit पूरी होने पर नया login सबसे पुराने login को auto-logout करता है (Worker /session)।
// Session ID = इस browser में बना एक random नंबर — hardware/fingerprint से नहीं बनता,
// site data clear करने पर नया बन जाता है (बस एक नया login गिना जाता है)।
(function () {
    'use strict';
    var API = 'https://hor-katha-api.bosctechedu.workers.dev/session';
    var CHECK_EVERY_MS = 15 * 60 * 1000;
    var SID_KEY = 'hk_session_id', OK_KEY = 'hk_session_ok';
    var LICENSE_KEYS = ['hor_lic_user', 'hor_lic_email', 'hor_lic_mobile', 'hor_lic_key', 'hor_act_logged',
        'hk_pro_license', 'hk_pro_license_backup', 'hk_trial_data', 'hk_trial_data_backup', OK_KEY];

    function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
    function parse(raw) { try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }

    function sid() {
        var s = ls(SID_KEY);
        if (s && /^[A-Za-z0-9_-]{16,64}$/.test(s)) return s;
        var b = new Uint8Array(16); crypto.getRandomValues(b);
        s = Array.prototype.map.call(b, function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
        lsSet(SID_KEY, s); return s;
    }

    // जो license इस browser में active है उसकी details
    function creds() {
        var key = ls('hor_lic_key'), email = ls('hor_lic_email');
        if (key && email) return { key: key, email: email, name: ls('hor_lic_user') || '', mobile: ls('hor_lic_mobile') || '' };
        var p = parse(ls('hk_pro_license')) || parse(ls('hk_pro_license_backup'));
        if (p && p.key && p.email) return { key: p.key, email: p.email, name: p.name || '', mobile: p.mobile || '' };
        var t = parse(ls('hk_trial_data')) || parse(ls('hk_trial_data_backup'));
        if (t && t.key && t.email && (!t.expiresAt || Date.now() < t.expiresAt)) return { key: t.key, email: t.email, name: t.name || '', mobile: t.mobile || '' };
        return null;
    }

    function post(body) {
        var ctrl = ('AbortController' in window) ? new AbortController() : null;
        var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 10000) : null;
        return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl ? ctrl.signal : undefined })
            .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; }); })
            .finally(function () { if (timer) clearTimeout(timer); });
    }

    function toast(msg) {
        try { if (typeof window.showToast === 'function') { window.showToast(msg, 'warning', 9000); return; } } catch (e) {}
        try { alert(msg); } catch (e) {}
    }

    function localLogout(reason) {
        LICENSE_KEYS.forEach(lsDel);
        if (reason) lsSet('hk_session_logout_msg', reason);
        setTimeout(function () { location.reload(); }, 300);
    }

    var busy = false;
    function run() {
        if (busy || !navigator.onLine) return;
        var c = creds(); if (!c) return;
        var k = String(c.key).trim().toUpperCase();
        var ok = parse(ls(OK_KEY));
        busy = true;
        var req = (ok && ok.k === k)
            ? post({ op: 'check', sid: sid(), key: k })
            : post({ op: 'login', sid: sid(), key: k, email: c.email, name: c.name, mobile: c.mobile });
        req.then(function (d) {
            if (d.success && d.active) {
                // v58: tier (SEAT/P1/P2/P3/TRIAL) भी रखें — Institute seat का badge इसी से
                lsSet(OK_KEY, JSON.stringify({ k: k, at: Date.now(), limit: d.limit || (ok && ok.limit) || null, tier: d.tier || (ok && ok.k === k && ok.tier) || null }));
                if (d.tier && (!ok || ok.tier !== d.tier)) { try { if (typeof window.hkPlanSync === 'function') window.hkPlanSync(false); } catch (e) {} }
                if (d.evicted) toast('ℹ️ Login limit (' + d.limit + ') पूरी थी — आपका सबसे पुराना login अपने-आप logout कर दिया गया।');
            } else if (d.success && d.active === false) {
                localLogout('🔒 आपके account से किसी दूसरी जगह नया login हुआ, इसलिए login limit के कारण यहाँ से logout हो गया। दोबारा Activate करने पर सबसे पुराना login हट जाएगा।');
            } else {
                // Server/ownership error: fail-open (offline license signature check पहले जैसा चलता रहेगा)
                console.warn('[Session]', d._status, d.error || 'unknown');
            }
        }).catch(function () { /* offline/network — बाद में फिर कोशिश */ })
          .finally(function () { busy = false; });
    }

    // User ने खुद deactivate किया → server से भी यह login हटाएँ
    function logout() {
        var c = creds(); var ok = parse(ls(OK_KEY));
        var k = c ? String(c.key).trim().toUpperCase() : (ok && ok.k);
        lsDel(OK_KEY);
        if (!k || !navigator.onLine) return Promise.resolve();
        return post({ op: 'logout', sid: sid(), key: k }).catch(function () {});
    }
    function list() {
        var c = creds(); if (!c) return Promise.resolve(null);
        return post({ op: 'list', sid: sid(), key: String(c.key).trim().toUpperCase() });
    }

    window.HKSession = { run: run, logout: logout, list: list, sessionId: sid };

    function start() {
        var msg = ls('hk_session_logout_msg');
        if (msg) { lsDel('hk_session_logout_msg'); setTimeout(function () { toast(msg); }, 1500); }
        setTimeout(run, 2500);
        setInterval(run, CHECK_EVERY_MS);
        document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });
        window.addEventListener('online', run);
        window.addEventListener('license-changed', function () { setTimeout(run, 500); });
        window.addEventListener('hk-plan-changed', function () { setTimeout(run, 500); });
        window.addEventListener('storage', function (e) { if (LICENSE_KEYS.indexOf(e.key) !== -1 && e.key !== OK_KEY) setTimeout(run, 500); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
