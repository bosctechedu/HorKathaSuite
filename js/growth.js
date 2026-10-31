// ============================================================
// 💸 PHASE 3 — Trial→Pro छूट + Referral (Refer & Earn)
// Payment UPI से manual है, इसलिए छूट का दावा WhatsApp message में
// जाता है और Admin keygen में जाँचकर key बनाता है।
// ============================================================
(function () {
    'use strict';
    const API = 'https://hor-katha-api.bosctechedu.workers.dev';

    // ⚙️ यहाँ राशि बदलें
    const OFFER = {
        TRIAL_UPGRADE_PCT: 15,          // ₹9 trial वालों को Pro पर % छूट
        TRIAL_UPGRADE_GRACE_DAYS: 7,    // trial खत्म होने के बाद कितने दिन तक
        REFERRAL_BUYER_PCT: 10,         // referral code से खरीदने वाले को % छूट
        REFERRAL_REWARD_RS: 50          // code वाले Pro user को हर बिक्री पर ₹ cashback (admin देता है)
    };
    window.HK_OFFER = OFFER;

    let appliedRef = null;          // { code, owner }
    let lastPlan = null;            // { price, title, cardId }

    function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function trialEligibility() {
        if (ls('hor_lic_key')) return null; // पहले से Pro
        let t = null;
        try { t = JSON.parse(ls('hk_trial_data') || ls('hk_trial_data_backup') || 'null'); } catch (e) {}
        if (!t || !t.expiresAt || !t.email) return null;
        const graceEnd = Number(t.expiresAt) + OFFER.TRIAL_UPGRADE_GRACE_DAYS * 86400000;
        if (Date.now() > graceEnd) return null;
        return { email: String(t.email), until: graceEnd };
    }
    function bestDiscount(price) {
        const opts = [];
        const tr = trialEligibility();
        if (tr) opts.push({ kind: 'trial', off: Math.round(price * OFFER.TRIAL_UPGRADE_PCT / 100), label: `₹9 Trial Upgrade ${OFFER.TRIAL_UPGRADE_PCT}% (${tr.email})` });
        if (appliedRef) opts.push({ kind: 'ref', off: Math.round(price * OFFER.REFERRAL_BUYER_PCT / 100), label: `Referral ${appliedRef.code} ${OFFER.REFERRAL_BUYER_PCT}%` });
        opts.sort((a, b) => b.off - a.off);
        return opts[0] || null;
    }

    // ─── Buy modal UI ───
    function ensureBuyUI() {
        if (document.getElementById('hkOfferBox')) return;
        const label = document.getElementById('selectedPlanLabel');
        if (!label || !label.parentNode) return;
        const st = document.createElement('style');
        st.textContent = `
            .hk-offer{margin:8px 0;padding:10px;border-radius:12px;background:#f0fdf4;border:1px dashed #22c55e;font-size:12.5px;color:#14532d}
            .hk-offer b{font-weight:900}
            .hk-ref-row{display:flex;gap:6px;margin-top:8px}
            .hk-ref-row input{flex:1;min-width:0;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-weight:800;text-transform:uppercase;letter-spacing:.5px}
            .hk-ref-row button{padding:8px 12px;border:0;border-radius:8px;background:#7c3aed;color:#fff;font-weight:800;cursor:pointer}
            .hk-ref-msg{margin-top:6px;font-weight:700}
            .hk-price-old{text-decoration:line-through;opacity:.6;margin-right:4px}
        `;
        document.head.appendChild(st);
        const box = document.createElement('div');
        box.id = 'hkOfferBox';
        box.className = 'hk-offer';
        box.innerHTML = `
            <div id="hkTrialOffer" style="display:none"></div>
            <div style="font-weight:800">🎟️ Referral code है? (${OFFER.REFERRAL_BUYER_PCT}% छूट)</div>
            <div class="hk-ref-row">
                <input id="hkRefInput" maxlength="10" placeholder="HKR-XXXXXX" autocomplete="off" aria-label="Referral code">
                <button type="button" id="hkRefApply">Apply</button>
            </div>
            <div class="hk-ref-msg" id="hkRefMsg"></div>`;
        label.parentNode.insertBefore(box, label);
        document.getElementById('hkRefApply').addEventListener('click', applyReferral);
        document.getElementById('hkRefInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyReferral(); } });
    }

    async function applyReferral() {
        const inp = document.getElementById('hkRefInput');
        const msg = document.getElementById('hkRefMsg');
        let code = String(inp.value || '').trim().toUpperCase();
        if (/^[A-Z2-9]{6}$/.test(code)) code = 'HKR-' + code;
        if (!code) { appliedRef = null; msg.textContent = ''; reprice(); return; }
        if (!/^HKR-[A-Z2-9]{6}$/.test(code)) { msg.style.color = '#b91c1c'; msg.textContent = '❌ Code का format: HKR-XXXXXX'; return; }
        msg.style.color = '#475569'; msg.textContent = '⏳ जाँच रहे हैं...';
        try {
            const email = (document.getElementById('buyCustomerEmail') || {}).value || '';
            const res = await fetch(API + '/ref-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, email }) });
            const d = await res.json().catch(() => ({}));
            if (!res.ok || !d.valid) { appliedRef = null; msg.style.color = '#b91c1c'; msg.textContent = '❌ ' + (d.error || 'Code मान्य नहीं'); reprice(); return; }
            appliedRef = { code: d.code, owner: d.owner };
            inp.value = d.code;
            msg.style.color = '#15803d';
            msg.textContent = `✅ ${d.owner} का code लगा। ${OFFER.REFERRAL_BUYER_PCT}% छूट!`;
            reprice();
        } catch (e) { msg.style.color = '#b91c1c'; msg.textContent = '⚠️ Internet जाँचें और दोबारा Apply करें।'; }
    }

    function reprice() { if (lastPlan) window.selectPlan(lastPlan.price, lastPlan.title, lastPlan.cardId); }

    function applyDiscount(price, title) {
        ensureBuyUI();
        const trialBox = document.getElementById('hkTrialOffer');
        const tr = trialEligibility();
        if (trialBox) {
            trialBox.style.display = tr ? 'block' : 'none';
            if (tr) trialBox.innerHTML = `🎁 <b>₹9 Trial वालों के लिए ${OFFER.TRIAL_UPGRADE_PCT}% छूट</b> — ${new Date(tr.until).toLocaleDateString('en-IN')} तक<br><span style="opacity:.8">(Referral के साथ नहीं जुड़ती, जो ज़्यादा हो वही लगेगी)</span><hr style="border:0;border-top:1px dashed #86efac;margin:8px 0">`;
        }
        const d = bestDiscount(price);
        if (!d || d.off <= 0) return;
        const finalPrice = Math.max(1, price - d.off);
        try { currentSelectedPrice = finalPrice; } catch (e) {}
        try { currentSelectedPlanTitle = `${String(title).replace(/\s*\(₹\d+\)\s*$/, '')} (₹${finalPrice} — ₹${price} में ₹${d.off} छूट: ${d.label})`.slice(0, 100); } catch (e) {}
        const label = document.getElementById('selectedPlanLabel');
        if (label) label.innerHTML = `Selected: ₹${finalPrice} Plan <span class="hk-price-old">₹${price}</span><br><small>${d.label} −₹${d.off}</small>`;
        try {
            if (typeof _getPaymentURL === 'function' && typeof renderQRCode === 'function') {
                renderQRCode('upiQrCodeBox', _getPaymentURL(finalPrice, 'Hor Katha Pro License'), 180);
            }
        } catch (e) {}
    }

    function wrapSelectPlan() {
        if (typeof window.selectPlan !== 'function' || window.selectPlan._hkWrapped) return false;
        const orig = window.selectPlan;
        const wrapped = function (price, title, cardId) {
            lastPlan = { price, title, cardId };
            orig.apply(this, arguments);
            try { applyDiscount(Number(price) || 0, title); } catch (e) { console.warn('[offer]', e); }
        };
        wrapped._hkWrapped = true;
        window.selectPlan = wrapped;
        return true;
    }
    if (!wrapSelectPlan()) document.addEventListener('DOMContentLoaded', wrapSelectPlan);

    // ─── 🎁 Refer & Earn modal (Pro users) ───
    window.hkOpenReferral = async function () {
        let ov = document.getElementById('hkReferOv');
        if (!ov) {
            ov = document.createElement('div');
            ov.id = 'hkReferOv';
            ov.style.cssText = 'position:fixed;inset:0;z-index:10040;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.55);padding:16px';
            ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
            ov.innerHTML = `<div style="width:min(460px,100%);background:#fff;color:#0f172a;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35);font:14px/1.55 Inter,system-ui,sans-serif;overflow:hidden">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff">
                    <b style="font-size:16px">🎁 Refer &amp; Earn</b>
                    <button type="button" id="hkReferX" aria-label="बंद करें" style="border:0;background:rgba(255,255,255,.2);color:#fff;border-radius:8px;width:32px;height:32px;cursor:pointer">✕</button>
                </div>
                <div id="hkReferBody" style="padding:16px 18px"></div></div>`;
            document.body.appendChild(ov);
            const close = () => { ov.style.display = 'none'; };
            ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
            ov.querySelector('#hkReferX').addEventListener('click', close);
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov.style.display !== 'none') close(); });
        }
        ov.style.display = 'flex';
        const body = ov.querySelector('#hkReferBody');
        const key = ls('hor_lic_key'), email = ls('hor_lic_email');
        if (!key || !email) {
            body.innerHTML = `<p>Referral code सिर्फ़ <b>Pro license</b> वालों को मिलता है।</p><p>दोस्तों को app बताएँ, Pro लेने के बाद यहाँ अपना code पाएँ और हर बिक्री पर <b>₹${OFFER.REFERRAL_REWARD_RS}</b> कमाएँ।</p>`;
            return;
        }
        body.textContent = '⏳ आपका code बन रहा है...';
        try {
            const cached = ls('hk_ref_code');
            let code = cached && cached.startsWith('HKR-') ? cached : null;
            if (!code) {
                const res = await fetch(API + '/ref-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, email }) });
                const d = await res.json().catch(() => ({}));
                if (!res.ok || !d.code) throw new Error(d.error || 'Code नहीं बना');
                code = d.code;
                try { localStorage.setItem('hk_ref_code', code); } catch (e) {}
            }
            const shareText = `मैं Hoṛ Katha Suite इस्तेमाल करता/करती हूँ — Santali, Hindi, English typing के लिए बढ़िया app! मेरे code ${code} से Pro लेने पर ${OFFER.REFERRAL_BUYER_PCT}% छूट मिलेगी: https://horkathasuite.pages.dev/`;
            body.innerHTML = `
                <p style="margin:0 0 10px">आपका referral code:</p>
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
                    <div id="hkRefCode" style="flex:1;font:900 22px/1 monospace;letter-spacing:2px;padding:12px;border:2px dashed #7c3aed;border-radius:12px;text-align:center;color:#7c3aed"></div>
                    <button type="button" id="hkRefCopy" style="padding:12px;border:0;border-radius:10px;background:#f1f5f9;font-weight:800;cursor:pointer">📋 Copy</button>
                </div>
                <ul style="margin:0 0 12px 18px;padding:0">
                    <li>दोस्त को Pro पर <b>${OFFER.REFERRAL_BUYER_PCT}% छूट</b></li>
                    <li>हर बिक्री पर आपको <b>₹${OFFER.REFERRAL_REWARD_RS}</b> UPI cashback (Admin जाँचकर भेजेंगे)</li>
                </ul>
                <button type="button" id="hkRefWa" style="width:100%;padding:12px;border:0;border-radius:10px;background:#16a34a;color:#fff;font-weight:900;cursor:pointer">💬 WhatsApp पर भेजें</button>`;
            body.querySelector('#hkRefCode').textContent = code;
            body.querySelector('#hkRefCopy').addEventListener('click', () => {
                navigator.clipboard.writeText(code).then(() => { if (typeof showToast === 'function') showToast('✅ Code copy हो गया', 'success', 1800); }).catch(() => {});
            });
            body.querySelector('#hkRefWa').addEventListener('click', () => {
                window.open('https://wa.me/?text=' + encodeURIComponent(shareText), '_blank', 'noopener');
            });
        } catch (e) {
            body.textContent = '⚠️ ' + e.message;
        }
    };
})();
