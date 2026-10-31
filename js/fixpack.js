/* ═══════════════════════════════════════════════════════════════
   HOR KATHA SUITE v3.7.4 — FIX PACK v1.3
   All fallbacks + Exact Word Match (auto-injected checkbox)
   ═══════════════════════════════════════════════════════════════ */
(function () {
'use strict';

var $ = function (id) { return document.getElementById(id); };
function showM(id) { var m = $(id); if (m) m.style.display = 'flex'; }
function hideM(id) { var m = $(id); if (m) m.style.display = 'none'; }
function t(msg, type) {
    try { if (typeof window.showToast === 'function') return window.showToast(msg, type); } catch (e) {}
    console.log('[toast]', msg);
}
function def(name, fn) { if (typeof window[name] !== 'function') window[name] = fn; }
function val(id) { var e = $(id); return e ? (e.value || '').trim() : ''; }

/* ───────── TOAST ───────── */
def('showToast', function (msg, type) {
    try {
        var c = $('flashContainer'); if (!c) return;
        var cls = ['success', 'error', 'warning', 'info'].indexOf(type) > -1 ? type : 'info';
        var ic = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }[cls];
        var d = document.createElement('div');
        d.className = 'flash-message flash-' + cls + ' flash-compact';
        d.innerHTML = '<div class="flash-header"><div class="flash-icon">' + ic + '</div>' +
            '<div><div class="flash-title"></div><div class="flash-subtitle"></div></div>' +
            '<button class="flash-close">✕</button></div>';
        d.querySelector('.flash-title').textContent = msg;
        d.querySelector('.flash-close').onclick = function () { d.remove(); };
        c.appendChild(d);
        setTimeout(function () { d.classList.add('flash-out'); setTimeout(function () { d.remove(); }, 400); }, 3200);
    } catch (e) { console.log(msg); }
});

/* ───────── CONFIG ───────── */
function cfg(k) {
    var c = window.APP_CONFIG || {};
    return c[k] || (c.PAYMENT && c.PAYMENT[k]) || '';
}
function waNum() {
    return String(cfg('WHATSAPP_NUMBER') || cfg('WHATSAPP') || cfg('SUPPORT_NUMBER') || '').replace(/\D/g, '');
}
function openWa(msg) {
    var n = waNum();
    window.open('https://wa.me/' + n + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    if (!n) t('config.js में WHATSAPP_NUMBER set करें', 'warning');
}
function renderQr(boxId, amount, note) {
    var box = $(boxId); if (!box) return;
    if (typeof window.generateUpiQr === 'function') {
        try { return window.generateUpiQr(boxId, amount); } catch (e) {}
    }
    var upi = cfg('UPI_ID');
    if (!upi) {
        box.innerHTML = '<div style="font-size:11px;color:#64748b;text-align:center;padding:8px;line-height:1.4">UPI ID set करें<br><b>config.js → UPI_ID</b></div>';
        return;
    }
    var url = 'upi://pay?pa=' + encodeURIComponent(upi) + '&pn=' + encodeURIComponent('BOSC Tech & Edu') +
              '&am=' + amount + '&cu=INR&tn=' + encodeURIComponent(note || 'Hor Katha');
    box.innerHTML = '<img alt="UPI QR" style="width:100%;height:100%;object-fit:contain" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(url) + '">';
}

/* ───────── MODAL MAP ───────── */
var OPEN = {
    openPreviewModal: 'previewModal', openDonateModal: 'donateModal', openBuyModal: 'buyModal',
    openLicenseModal: 'licenseModal', openTrialActivationModal: 'trialActivationModal',
    openVocabManagerModal: 'vocabManagerModal', openTrialExpiryModal: 'trialExpiryModal',
    openEmojiModal: 'emojiModal', openCharMapModal: 'charmapModal', openFindReplaceModal: 'findReplaceModal',
    openKrutiDevModal: 'krutiModal', openConverterModal: 'converterModal', openImeExportModal: 'imeModal',
    openMobileQrModal: 'mobileQrModal', openTypingTestModal: 'typingTestModal', openReceiptModal: 'receiptModal',
    openProOtpModal: 'proOtpModal'
};
var CLOSE = {
    closePreviewModal: 'previewModal', closeDonateModal: 'donateModal', closeBuyModal: 'buyModal',
    closeLicenseModal: 'licenseModal', closeVocabManagerModal: 'vocabManagerModal',
    closeTrialExpiryModal: 'trialExpiryModal', closeEmojiModal: 'emojiModal', closeCharMapModal: 'charmapModal',
    closeFindReplaceModal: 'findReplaceModal', closeKrutiDevModal: 'krutiModal', closeConverterModal: 'converterModal',
    closeImeModal: 'imeModal', closeMobileQrModal: 'mobileQrModal', closeTypingTestModal: 'typingTestModal',
    closeProOtpModal: 'proOtpModal', closeReceiptModal: 'receiptModal', closeWaMessageModal: 'waMessageModal'
};

/* ───────── DONATE ───────── */
var donateAmount = 251;
def('setDonateAmount', function (amt, el) {
    donateAmount = amt;
    document.querySelectorAll('#donateModal .dnr-chip').forEach(function (c) { c.classList.remove('active-pill'); });
    if (el) el.classList.add('active-pill');
    var ci = $('customDonateInput'); if (ci) ci.value = '';
    var lbl = $('donateAmountLabel'); if (lbl) lbl.textContent = 'Selected: ₹' + amt;
    renderQr('donateQrBox', amt, 'Donation');
});
def('handleCustomDonateInput', function (v) {
    var n = parseInt(v, 10); if (!n || n < 1) return;
    donateAmount = n;
    document.querySelectorAll('#donateModal .dnr-chip').forEach(function (c) { c.classList.remove('active-pill'); });
    var lbl = $('donateAmountLabel'); if (lbl) lbl.textContent = 'Selected: ₹' + n;
    renderQr('donateQrBox', n, 'Donation');
});
def('redirectToWhatsAppDonate', function () {
    openWa('💖 Support — Hor Katha Suite\nAmount: ₹' + donateAmount + '\n\nमैंने UPI से payment कर दिया है। Screenshot भेज रहा हूँ।');
});

/* ───────── BUY / PLANS ───────── */
var selectedPlan = { amount: 199, label: 'P1 — Community (₹199)', card: 'cardPlan1' };
def('selectPlan', function (amount, label, cardId) {
    selectedPlan = { amount: amount, label: label, card: cardId };
    document.querySelectorAll('#buyModal .bmr-plan').forEach(function (c) { c.classList.remove('active-plan'); });
    var c = $(cardId); if (c) c.classList.add('active-plan');
    var lbl = $('selectedPlanLabel'); if (lbl) lbl.textContent = 'Selected: ₹' + amount + ' Plan';
    renderQr('upiQrCodeBox', amount, 'Hor Katha ' + label);
});
def('selectTrialPlan', function () {
    selectedPlan = { amount: 9, label: '₹9 Trial — 7 Days', card: 'cardPlanTrial' };
    document.querySelectorAll('#buyModal .bmr-plan').forEach(function (c) { c.classList.remove('active-plan'); });
    var c = $('cardPlanTrial'); if (c) c.classList.add('active-plan');
    var lbl = $('selectedPlanLabel'); if (lbl) lbl.textContent = 'Selected: ₹9 Trial';
    renderQr('upiQrCodeBox', 9, 'Hor Katha Trial');
});
def('onPaymentCompleted', function () {
    var chk = $('paymentConfirmCheck');
    if (chk && !chk.checked) return t('पहले payment confirm checkbox tick करें', 'warning');
    var name = val('buyCustomerName'), email = val('buyCustomerEmail'), mobile = val('buyCustomerMobile');
    if (!name || !email || !mobile) return t('सभी details भरें', 'warning');
    var msg = '🧾 Hor Katha Pro — Order\n\nName: ' + name +
              '\nEmail: ' + email +
              '\nMobile: ' + mobile +
              '\nPlan: ' + selectedPlan.label +
              '\nAmount: ₹' + selectedPlan.amount +
              '\n\nमैंने UPI से payment कर दिया है। Screenshot attached.';
    var txt = $('waMessageText'); if (txt) txt.textContent = msg;
    showM('waMessageModal');
});
def('redirectToWhatsAppBuy', function () {
    var name = val('buyCustomerName'), email = val('buyCustomerEmail'), mobile = val('buyCustomerMobile');
    if (!name || !email || !mobile) return t('सभी details भरें', 'warning');
    openWa('🧾 Hor Katha Pro — Order\n\nName: ' + name +
           '\nEmail: ' + email +
           '\nMobile: ' + mobile +
           '\nPlan: ' + selectedPlan.label +
           '\nAmount: ₹' + selectedPlan.amount);
});
def('showWaMessagePreview', function (which) {
    var msg;
    if (which === 'trial') {
        msg = '🎁 ₹9 Trial — Hor Katha Suite\n\nName: ' + val('trialCustomerName') +
              '\nEmail: ' + val('trialCustomerEmail') +
              '\nMobile: ' + val('trialCustomerMobile') +
              '\nAmount: ₹9\n\nमैंने payment कर दिया है। Trial Key भेजें।';
    } else {
        msg = '🧾 Hor Katha Pro — Order\n\nPlan: ' + selectedPlan.label + '\nAmount: ₹' + selectedPlan.amount;
    }
    var txt = $('waMessageText'); if (txt) txt.textContent = msg;
    showM('waMessageModal');
});
def('copyWaMessageText', function () {
    var txt = ($('waMessageText') || {}).textContent || '';
    if (!txt) return;
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject())
        .then(function () { t('Message copy ho gaya ✅', 'success'); })
        .catch(function () {
            var ta = document.createElement('textarea');
            ta.value = txt;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); t('Message copy ho gaya ✅', 'success'); } catch (e) {}
            ta.remove();
        });
});
def('sendWaMessageNow', function () {
    var txt = ($('waMessageText') || {}).textContent || '';
    hideM('waMessageModal');
    openWa(txt);
});

/* ───────── EDITOR CORE ───────── */
def('updateCounter', function () {
    var ed = $('editor'); if (!ed) return;
    var text = ed.innerText || ed.textContent || '';
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    var chars = text.length;
    var lines = text ? text.split(/\n/).length : 0;
    var c = $('char-counter');
    if (c) c.textContent = 'Chars: ' + chars + ' | Words: ' + words + ' | Lines: ' + lines + ' | Read: ~' + Math.max(1, Math.ceil(words / 200)) + 'm';
    var sw = $('statusWords'); if (sw && sw.lastElementChild) sw.lastElementChild.textContent = words + ' words';
    var sc = $('statusChars'); if (sc && sc.lastElementChild) sc.lastElementChild.textContent = chars + ' chars';
    ed.setAttribute('data-empty', (text.trim() || ed.querySelector('img,table,ul,ol,hr')) ? 'false' : 'true');
});
def('handleEditorInput', function () { window.updateCounter(); });
def('copyText', function () {
    var ed = $('editor'); if (!ed) return;
    var text = (ed.innerText || ed.textContent || '').trim();
    if (!text) return t('Pehle kuch likhein!', 'info');
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () { t('Copy ho gaya ✅', 'success'); })
        .catch(function () {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); t('Copy ho gaya ✅', 'success'); } catch (e) { t('Copy failed', 'error'); }
            ta.remove();
        });
});
def('clearText', function () {
    var ed = $('editor'); if (!ed) return;
    if (!(ed.innerText || '').trim()) return t('Already empty', 'info');
    if (!confirm('Clear all text? This cannot be undone.')) return;
    try { if (typeof recordState === 'function') recordState(); } catch (e) {}
    ed.innerHTML = '';
    ed.setAttribute('data-empty', 'true');
    if (typeof handleEditorInput === 'function') handleEditorInput();
});
def('downloadTextFile', function () {
    var ed = $('editor'); if (!ed) return;
    var text = (ed.innerText || '').trim();
    if (!text) return t('Pehle kuch likhein!', 'info');
    var b = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'hor-katha-' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    t('TXT download ho gaya 📁', 'success');
});
def('downloadDocFile', function () {
    var ed = $('editor'); if (!ed) return;
    var html = ed.innerHTML;
    if (!(ed.innerText || '').trim()) return t('Pehle kuch likhein!', 'info');
    var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"></head><body>' + html + '</body></html>';
    var b = new Blob(['\ufeff', doc], { type: 'application/msword' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'hor-katha-' + new Date().toISOString().slice(0, 10) + '.doc';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    t('Word file download ho gayi 📄', 'success');
});
def('printEditorText', function () {
    var ed = $('editor'); if (!ed) return;
    var w = window.open('', '_blank', 'noopener');
    if (!w) return t('Popup blocked — allow popups', 'warning');
    w.document.write('<html><head><meta charset="utf-8"><title>Hor Katha Print</title><style>body{font-family:"Noto Sans Devanagari",sans-serif;padding:24px;line-height:1.7}</style></head><body>' + ed.innerHTML + '</body></html>');
    w.document.close();
    w.focus();
    setTimeout(function () { w.print(); }, 400);
});
def('speakText', function () {
    var ed = $('editor'); if (!ed) return;
    var text = (ed.innerText || '').trim();
    if (!text) return t('Pehle kuch likhein!', 'info');
    if (!('speechSynthesis' in window)) return t('TTS browser me supported nahi', 'warning');
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.slice(0, 3000));
    u.lang = document.body.getAttribute('data-hindi-phonetic') === 'true' ? 'hi-IN' : 'en-IN';
    speechSynthesis.speak(u);
});
def('toggleSpeechRecognition', function () {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return t('Speech recognition supported nahi hai', 'warning');
    if (window.__hkRec) {
        try { window.__hkRec.stop(); } catch (e) {}
        window.__hkRec = null;
        t('Mic OFF', 'info');
        return;
    }
    var r = new SR();
    window.__hkRec = r;
    r.lang = document.body.getAttribute('data-hindi-phonetic') === 'true' ? 'hi-IN' : 'en-IN';
    r.interimResults = false;
    r.continuous = false;
    r.onresult = function (e) {
        var txt = e.results[0][0].transcript;
        var ed = $('editor'); ed.focus();
        document.execCommand('insertText', false, txt);
        if (typeof handleEditorInput === 'function') handleEditorInput();
    };
    r.onerror = function () { t('Mic error', 'error'); window.__hkRec = null; };
    r.onend = function () { window.__hkRec = null; };
    r.start();
    t('🎤 Listening...', 'success');
});
def('shareViaWhatsApp', function () {
    var ed = $('editor');
    var text = ed ? (ed.innerText || '').trim() : '';
    window.open('https://wa.me/?text=' + encodeURIComponent(text.slice(0, 3000)), '_blank', 'noopener');
});

/* ───────── FORMATTING ───────── */
def('saveCurrentSelection', function () {
    var s = window.getSelection();
    window.__hkRange = (s && s.rangeCount) ? s.getRangeAt(0).cloneRange() : null;
});
function restoreRange() {
    var ed = $('editor'); if (ed) ed.focus();
    if (window.__hkRange) {
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(window.__hkRange);
    }
}
def('formatModern', function (cmd) {
    restoreRange();
    try {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand(cmd, false, null);
    } catch (e) {}
});
def('customUndo', function () { try { document.execCommand('undo'); } catch (e) {} });
def('customRedo', function () { try { document.execCommand('redo'); } catch (e) {} });
def('applyColorModern', function (cmd, color) {
    restoreRange();
    try {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand(cmd === 'backgroundColor' ? 'backColor' : 'foreColor', false, color);
    } catch (e) {}
});
def('changeFontFamily', function (f) {
    restoreRange();
    try { document.execCommand('fontName', false, f); } catch (e) {}
});
def('adjustFontSize', function (d) {
    var ed = $('editor'); if (!ed) return;
    var size = parseInt(localStorage.getItem('hk_fontsize') || '18', 10);
    size = Math.min(40, Math.max(12, size + d));
    localStorage.setItem('hk_fontsize', size);
    ed.style.fontSize = size + 'px';
});
def('convertTextCasing', function (mode) {
    var ed = $('editor'); if (!ed) return;
    var txt = ed.innerText || '';
    if (!txt) return t('Pehle kuch likhein!', 'info');
    var out;
    switch (mode) {
        case 'upper': out = txt.toUpperCase(); break;
        case 'lower': out = txt.toLowerCase(); break;
        case 'title': out = txt.replace(/\w\S*/g, function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }); break;
        case 'sentence': out = txt.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function (c) { return c.toUpperCase(); }); break;
        case 'camel': out = txt.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, c) { return c.toUpperCase(); }); break;
        case 'kebab': out = txt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); break;
        case 'snake': out = txt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''); break;
        case 'inverse': out = txt.replace(/[a-zA-Z]/g, function (c) { return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(); }); break;
        case 'num-to-dev': out = txt.replace(/[0-9]/g, function (d) { return '०१२३४५६७८९'[+d]; }); break;
        case 'num-to-ol': out = txt.replace(/[0-9]/g, function (d) { return '᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙'[+d]; }); break;
        case 'num-to-lat':
            out = txt.replace(/[०-९]/g, function (d) { return String('०१२३४५६७८९'.indexOf(d)); })
                     .replace(/[᱐-᱙]/g, function (d) { return String('᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙'.indexOf(d)); });
            break;
        default: return;
    }
    try { if (typeof recordState === 'function') recordState(); } catch (e) {}
    ed.textContent = out;
    if (typeof handleEditorInput === 'function') handleEditorInput();
    t('Applied ✅', 'success');
});

/* ───────── UI TOGGLES ───────── */
def('switchLanguage', function (lang) {
    document.querySelectorAll('.tab-pill').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    var tab = $('tab-' + lang);
    if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
    var names = { roman: 'Santali (Roman)', 'santali-dev': 'Santali (Devanagari)', olchiki: 'Ol Chiki', 'hindi-dev': 'हिन्दी', 'hindi-phonetic': 'हिन्दी Phonetic', english: 'English' };
    var sl = $('statusLanguage');
    if (sl && sl.lastElementChild) sl.lastElementChild.textContent = names[lang] || lang;
    document.body.setAttribute('data-hindi-phonetic', lang === 'hindi-phonetic' ? 'true' : 'false');
    try { window.dispatchEvent(new CustomEvent('hk-language-change', { detail: { lang: lang } })); } catch (e) {}
});
def('toggleTheme', function () {
    var dark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', dark ? 'light' : 'dark');
    var b = $('btn-theme-toggle'); if (b) b.textContent = dark ? '🌙' : '☀️';
    try { localStorage.setItem('hk_theme', dark ? 'light' : 'dark'); } catch (e) {}
});
def('toggleZenMode', function () {
    document.body.classList.toggle('zen-mode');
    var on = document.body.classList.contains('zen-mode');
    var b = $('btn-zen-mode'); if (b) b.textContent = on ? '🧘‍♂️' : '🧘';
    t(on ? 'Zen Mode ON' : 'Zen Mode OFF', 'info');
});
def('toggleNumpad', function () {
    var n = $('keyboardNumpad'); if (!n) return;
    var hidden = n.style.display === 'none';
    n.style.display = hidden ? '' : 'none';
    var b = $('btn-numpad-toggle'); if (b) b.textContent = hidden ? '🔢' : '#️⃣';
});
def('toggleClickSound', function () {
    window.__hkSound = !window.__hkSound;
    var b = $('btn-sound-toggle'); if (b) b.textContent = window.__hkSound ? '🔊' : '🔇';
    t('Sound ' + (window.__hkSound ? 'ON' : 'OFF'), 'info');
});
def('toggleHoverVoice', function () {
    window.__hkHoverVoice = !window.__hkHoverVoice;
    t('Hover Voice ' + (window.__hkHoverVoice ? 'ON' : 'OFF'), 'info');
});
def('toggleVoiceOutput', function () {
    window.__hkTTS = !window.__hkTTS;
    var b = $('btn-voice-toggle'); if (b) b.textContent = window.__hkTTS ? '🎧' : '🔇';
    t('TTS ' + (window.__hkTTS ? 'ON' : 'OFF'), 'info');
});
def('toggleKeyboardPreference', function () {
    var sys = document.body.getAttribute('data-sys-kb') === 'true';
    document.body.setAttribute('data-sys-kb', sys ? 'false' : 'true');
    var b = $('btn-kb-choice');
    if (b) b.textContent = sys ? 'App Virtual: ⌨️' : 'System: ⌨️';
    var banner = $('systemKbStatusText');
    if (banner) banner.style.display = sys ? 'none' : 'block';
    t(sys ? 'App Virtual Keyboard' : 'System Keyboard Mode', 'info');
});
def('togglePhoneticTranslit', function () {
    var on = document.body.getAttribute('data-hindi-phonetic') === 'true';
    if (!on) window.switchLanguage('hindi-phonetic');
    else window.switchLanguage('english');
});
def('installPWA', function () {
    if (window.__hkInstallPrompt) {
        window.__hkInstallPrompt.prompt();
        window.__hkInstallPrompt = null;
        return;
    }
    t('Browser menu → "Install app" / "Add to Home Screen"', 'info');
});
def('openVoiceSettingsModal', function () { t('Voice settings: browser TTS/STT use ho raha hai', 'info'); });
def('exitTypingMode', function () {
    document.body.classList.remove('typing-mode', 'focus-mode');
    var fb = $('focusModeBar');
    if (fb) fb.style.display = 'none';
});

/* ───────── FIND & REPLACE — Exact Word Match support ───────── */
function _frEscape(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function _frBuildRegex(find, matchCase, exactMatch, global) {
    var pattern = _frEscape(find);
    var flags = (global ? 'g' : '') + (matchCase ? '' : 'i');
    if (exactMatch) {
        pattern = '(?<![\\p{L}\\p{N}_])' + pattern + '(?![\\p{L}\\p{N}_])';
        flags += 'u';
    }
    try {
        return new RegExp(pattern, flags);
    } catch (e) {
        return new RegExp(_frEscape(find), (global ? 'g' : '') + (matchCase ? '' : 'i'));
    }
}
def('executeReplaceFirst', function () {
    var ed = $('editor'); if (!ed) return;
    var find = val('findInput');
    if (!find) return t('Find text खाली है', 'warning');
    var rep = val('replaceInput');
    var matchCase  = $('matchCaseCheck')  && $('matchCaseCheck').checked;
    var exactMatch = $('exactMatchCheck') && $('exactMatchCheck').checked;
    var re = _frBuildRegex(find, matchCase, exactMatch, false);
    if (!re.test(ed.innerText)) return t('Not found', 'warning');
    try { if (typeof recordState === 'function') recordState(); } catch (e) {}
    ed.innerText = ed.innerText.replace(re, rep);
    if (typeof handleEditorInput === 'function') handleEditorInput();
    t('1 replaced ✅' + (exactMatch ? ' (exact)' : ''), 'success');
});
def('executeReplaceAll', function () {
    var ed = $('editor'); if (!ed) return;
    var find = val('findInput');
    if (!find) return t('Find text खाली है', 'warning');
    var rep = val('replaceInput');
    var matchCase  = $('matchCaseCheck')  && $('matchCaseCheck').checked;
    var exactMatch = $('exactMatchCheck') && $('exactMatchCheck').checked;
    var re = _frBuildRegex(find, matchCase, exactMatch, true);
    var before = ed.innerText;
    var count = (before.match(re) || []).length;
    if (count === 0) return t('Not found', 'warning');
    try { if (typeof recordState === 'function') recordState(); } catch (e) {}
    ed.innerText = before.replace(re, rep);
    if (typeof handleEditorInput === 'function') handleEditorInput();
    t(count + ' replaced ✅' + (exactMatch ? ' (exact)' : ''), 'success');
});

/* ───────── BOX HELPERS ───────── */
def('copyFromBox', function (id) {
    var e = $(id); if (!e) return;
    var text = e.value !== undefined ? e.value : e.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () { t('Copied ✅', 'success'); })
        .catch(function () {
            try { e.select(); document.execCommand('copy'); t('Copied ✅', 'success'); } catch (x) {}
        });
});
def('deleteLastInBox', function (id) { var e = $(id); if (e) e.value = (e.value || '').slice(0, -1); });
def('clearBox', function (id) { var e = $(id); if (e) e.value = ''; });
def('insertFromBox', function (id, modalId) {
    var e = $(id);
    var text = e ? e.value : '';
    if (!text) return t('Box खाली है', 'warning');
    var ed = $('editor'); if (!ed) return;
    ed.focus();
    document.execCommand('insertText', false, text);
    if (typeof handleEditorInput === 'function') handleEditorInput();
    if (modalId) hideM(modalId);
});
def('applyKrutiToEditor', function () {
    var v = ($('krutiPreview') || {}).value || '';
    var ed = $('editor'); if (!ed) return;
    try { if (typeof recordState === 'function') recordState(); } catch (e) {}
    ed.innerText = v;
    if (typeof handleEditorInput === 'function') handleEditorInput();
    hideM('krutiModal');
    t('Replaced ✅', 'success');
});
def('replaceEditorWithConverted', function () {
    var v = ($('converterPreview') || {}).value || '';
    var ed = $('editor'); if (!ed) return;
    ed.innerText = v;
    if (typeof handleEditorInput === 'function') handleEditorInput();
    hideM('converterModal');
    t('Replaced ✅', 'success');
});
def('executeConversion', function () {
    var ed = $('editor'); if (!ed) return;
    var src = ed.innerText || '';
    var dir = ($('convertDirectionSelect') || {}).value || 'dev-to-ol';
    var map = window.SCRIPT_MAP || window.HK_SCRIPT_MAP;
    var out = src;
    if (map && map[dir]) {
        out = src.split('').map(function (ch) { return map[dir][ch] || ch; }).join('');
    } else if (typeof window.convertScript === 'function') {
        try { out = window.convertScript(src, dir); } catch (e) {}
    } else {
        return t('Converter module (script map) load nahi hua', 'warning');
    }
    var prev = $('converterPreview');
    if (prev) prev.value = out;
});
def('downloadImeMapFile', function () {
    var v = ($('imeJsonPreview') || {}).value || '{}';
    var b = new Blob([v], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'hor-katha-ime-map.json';
    document.body.appendChild(a); a.click(); a.remove();
    t('IME map download ✅', 'success');
});

/* ───────── EMOJI / CHAR MAP ───────── */
var EMOJI = {
    smileys: '😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕',
    gestures: '👍👎👌✌️🤞🤟🤘🤙👈👉👆👇☝️✋🤚🖐️🖖👋🤝🙏💪🦾✍️💅🤳',
    hearts: '❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝💟',
    symbols: '✅❌⚠️⭐🌟✨⚡🔥💯🎉🎊🎁🏆🥇🔑🔒🔓📌📎✏️📝💡ℹ️❓❗',
    nature: '🌞🌝🌚🌍🌎🌏🌕🌖🌗🌘🌑🌒🌓🌔☀️🌤️⛅🌥️☁️🌦️🌧️⛈️🌩️🌨️❄️☃️⛄🌬️💨💧💦☔🌊🌈🌸🌺🌻🌹🌷🌼🌿🍀🍁🍂🌴🌵🌾🌱🌲🌳'
};
def('onEmojiCategorySelect', function (cat) {
    var m = $('emojiMatrix'); if (!m) return;
    var list = (EMOJI[cat] || '').split('');
    m.innerHTML = list.map(function (e) {
        return '<button class="emoji-cell" style="font-size:22px;padding:4px" onclick="document.getElementById(\'emojiCopyBox\').value+=this.textContent">' + e + '</button>';
    }).join('');
});
def('filterEmoji', function (q) {
    var m = $('emojiMatrix'); if (!m) return;
    Array.prototype.forEach.call(m.children, function (b) {
        b.style.display = (!q || b.textContent.indexOf(q) > -1) ? '' : 'none';
    });
});
def('hideEmojiZoomLens', function () { var l = $('emojiZoomLens'); if (l) l.style.display = 'none'; });
def('hideZoomLens', function () { var l = $('charmapZoomLens'); if (l) l.style.display = 'none'; });
def('onScriptMapSelect', function (script) {
    var m = $('charmapMatrix'); if (!m) return;
    var chars = {
        english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        roman: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        'hindi-dev': 'अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहािीुूृेैोौंः्०१२३४५६७८९',
        'santali-dev': 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवसह०१२३४५६७८९',
        olchiki: '᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙ᱚᱟᱭᱩᱮᱳᱶᱷᱠᱜᱝᱢᱱᱯᱨᱞᱛᱫᱴᱵᱡᱲᱥᱦᱯ'
    }[script] || '';
    m.innerHTML = chars.split('').map(function (c) {
        return '<button style="font-size:18px;padding:6px" onclick="document.getElementById(\'copyBox\').value+=this.textContent">' + c + '</button>';
    }).join('');
});
def('filterCharMap', function (q) {
    var m = $('charmapMatrix'); if (!m) return;
    Array.prototype.forEach.call(m.children, function (b) {
        b.style.display = (!q || b.textContent.indexOf(q) > -1) ? '' : 'none';
    });
});

/* ───────── HINDI PHONETIC CUSTOM WORDS ───────── */
function hpWords() {
    try { return JSON.parse(localStorage.getItem('hk_hp_custom_words') || '{}'); } catch (e) { return {}; }
}
function hpSave(obj) {
    try { localStorage.setItem('hk_hp_custom_words', JSON.stringify(obj)); } catch (e) {}
}
def('hpOpenAddWordModal', function () { showM('hpAddWordModal'); renderHpList(); });
def('hpCloseAddWordModal', function () { hideM('hpAddWordModal'); });
function renderHpList() {
    var box = $('hpCustomList'); if (!box) return;
    var w = hpWords();
    var keys = Object.keys(w);
    if (!keys.length) {
        box.innerHTML = '<div style="font-size:12px;color:#94a3b8;text-align:center;padding:10px">No custom words yet</div>';
        return;
    }
    box.innerHTML = keys.map(function (k) {
        var safeK = k.replace(/'/g, "\\'");
        return '<div class="hp-word-item"><span class="hp-word-roman">' + k + '</span><span class="hp-word-arrow">→</span>' +
               '<span class="hp-word-hindi">' + w[k] + '</span>' +
               '<button class="hp-word-del" onclick="(function(){var o=JSON.parse(localStorage.getItem(\'hk_hp_custom_words\')||\'{}\');delete o[\'' + safeK + '\'];localStorage.setItem(\'hk_hp_custom_words\',JSON.stringify(o));window.hpOpenAddWordModal();})()">✕</button></div>';
    }).join('');
}
def('hpSaveCustomWord', function () {
    var r = val('hpNewRoman'), h = val('hpNewHindi');
    if (!r || !h) return t('Roman aur Hindi dono भरें', 'warning');
    var w = hpWords();
    w[r.toLowerCase()] = h;
    hpSave(w);
    var a = $('hpNewRoman'), b = $('hpNewHindi');
    if (a) a.value = '';
    if (b) b.value = '';
    renderHpList();
    t('Word saved ✅', 'success');
});
def('hpSuggestHindi', function () {
    var r = val('hpNewRoman'); if (!r) return;
    var out = (typeof HindiPhonetic !== 'undefined' && HindiPhonetic.translate) ? HindiPhonetic.translate(r) : null;
    var hi = out && (typeof out === 'string' ? out : out.text);
    if (hi) {
        var e = $('hpNewHindi');
        if (e) e.value = hi;
    } else {
        t('Auto-suggest unavailable', 'warning');
    }
});
def('hpToggleVirtualKeyboard', function () {
    var k = $('hpVirtualKeyboard');
    if (k) k.style.display = (k.style.display === 'none' || !k.style.display) ? 'block' : 'none';
});
var HP_KBD = {
    vowels: 'अआइईउऊऋएऐओऔ',
    consonants: 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह',
    matras: 'ािीुूृेैोौंः्',
    numbers: '०१२३४५६७८९',
    symbols: '।॥₹%&*()[]{}<>/\\-+=.,;:!?\'"'
};
def('hpSwitchKbdTab', function (tab) {
    document.querySelectorAll('.hp-kbd-tab').forEach(function (b) {
        b.classList.toggle('active', b.dataset.tab === tab);
    });
    var g = $('hpKbdGrid'); if (!g) return;
    g.innerHTML = (HP_KBD[tab] || '').split('').map(function (c) {
        return '<button class="hp-kbd-key" onclick="document.getElementById(\'hpNewHindi\').value+=this.textContent">' + c + '</button>';
    }).join('');
});
def('hpKbdInsert', function (c) { var e = $('hpNewHindi'); if (e) e.value += c; });
def('hpKbdBackspace', function () { var e = $('hpNewHindi'); if (e) e.value = e.value.slice(0, -1); });

/* ───────── VOCAB ───────── */
def('saveNewVocabWord', function () {
    var e = $('newVocabInput');
    var w = e ? e.value.trim() : '';
    if (!w) return t('शब्द लिखें', 'warning');
    try {
        var arr = JSON.parse(localStorage.getItem('hk_vocab_words') || '[]');
        if (arr.indexOf(w) === -1) arr.push(w);
        localStorage.setItem('hk_vocab_words', JSON.stringify(arr));
        if (e) e.value = '';
        t('जोड़ा गया ✅', 'success');
        try { window.dispatchEvent(new CustomEvent('hk-vocab-updated')); } catch (x) {}
    } catch (x) { t('Save failed', 'error'); }
});
def('resetActiveVocabToDefault', function () {
    if (!confirm('Reset vocabulary to default?')) return;
    try { localStorage.removeItem('hk_vocab_words'); } catch (e) {}
    t('Vocabulary reset ✅', 'info');
});

/* ───────── TRIAL RECOVERY ───────── */
def('toggleManualRecovery', function () {
    var b = $('manualRecoveryBox'); if (!b) return;
    b.style.display = (b.style.display === 'block') ? 'none' : 'block';
});
def('cancelManualRecovery', function () {
    var b = $('manualRecoveryBox'); if (b) b.style.display = 'none';
    var i = $('oldHwidInput'); if (i) i.value = '';
});
def('applyManualRecovery', function () {
    var v = val('oldHwidInput');
    var m = $('recoveryStatusMsg'); if (!m) return;
    if (!/^DVC-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(v)) {
        m.className = 'error';
        m.textContent = 'Invalid Device ID format (DVC-XXXX-YYYY)';
        return;
    }
    try {
        var tr = JSON.parse(localStorage.getItem('hk_trial_data') || 'null');
        if (tr) { tr.hwid = v; localStorage.setItem('hk_trial_data', JSON.stringify(tr)); }
        m.className = 'success';
        m.textContent = '✅ Trial recovered. Reloading...';
        setTimeout(function () { location.reload(); }, 1200);
    } catch (e) {
        m.className = 'error';
        m.textContent = 'Recovery failed';
    }
});

/* ───────── DEVICE PREVIEW ───────── */
def('setSimulatedDevice', function (dev) {
    var s = $('simulatedScreen'); if (!s) return;
    var w = { desktop: '100%', tablet: '768px', mobile: '390px' }[dev] || '100%';
    s.style.width = w;
    s.style.maxWidth = '100%';
    document.querySelectorAll('.device-selector-bar .tool-btn').forEach(function (b) { b.classList.remove('active-state'); });
    var btn = $('btn-prev-' + dev);
    if (btn) btn.classList.add('active-state');
});

/* ───────── TYPING TEST STUBS ───────── */
def('selectTestLesson', function () { t('Typing module load nahi hua — js/typing-test.js check karein', 'warning'); });
def('selectTestDuration', function () { });
def('startTypingTest', function () { t('Typing module load nahi hua', 'warning'); });
def('stopAndRestartTest', function () { t('Typing module load nahi hua', 'warning'); });
def('openCertificateFromResult', function () { t('Certificate module load nahi hua — js/certificate.js check karein', 'warning'); });

/* ───────── INJECT Exact Match CHECKBOX (fix for missing HTML) ───────── */
function injectExactMatchCheckbox() {
    // Agar checkbox pehle se hai to skip
    if ($('exactMatchCheck')) {
        console.log('✅ [FIX PACK] Exact Match checkbox already present');
        return;
    }

    // findReplaceModal ka fr-body dhoondho
    var modal = $('findReplaceModal');
    if (!modal) { console.warn('⚠️ [FIX PACK] findReplaceModal nahi mila'); return; }

    var frBody = modal.querySelector('.fr-body');
    if (!frBody) { console.warn('⚠️ [FIX PACK] .fr-body nahi mila'); return; }

    // Checkbox element banao
    var label = document.createElement('label');
    label.className = 'fr-checkbox-row';
    label.setAttribute('for', 'exactMatchCheck');
    label.innerHTML =
        '<input type="checkbox" id="exactMatchCheck">' +
        '<div class="fr-checkbox-box">W</div>' +
        '<div class="fr-checkbox-text">' +
            'Exact Word Match' +
            '<small>"cat" search पर "category" नहीं मिलेगा</small>' +
        '</div>';

    // matchCaseCheck ke baad insert karo, warna end me append
    var matchCaseLabel = frBody.querySelector('label[for="matchCaseCheck"]');
    if (matchCaseLabel && matchCaseLabel.parentNode) {
        matchCaseLabel.parentNode.insertBefore(label, matchCaseLabel.nextSibling);
        console.log('✅ [FIX PACK] Exact Match checkbox injected after Match Case');
    } else {
        frBody.appendChild(label);
        console.log('✅ [FIX PACK] Exact Match checkbox injected at end');
    }
}

/* ───────── INIT ───────── */
function init() {
    try {
        var th = localStorage.getItem('hk_theme');
        if (th === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            var b = $('btn-theme-toggle');
            if (b) b.textContent = '☀️';
        }
    } catch (e) {}

    // Modals
    Object.keys(OPEN).forEach(function (fn) {
        def(fn, function () {
            showM(OPEN[fn]);
            if (fn === 'openDonateModal') renderQr('donateQrBox', donateAmount, 'Donation');
            if (fn === 'openBuyModal') renderQr('upiQrCodeBox', selectedPlan.amount, 'Hor Katha ' + selectedPlan.label);
            if (fn === 'openTrialActivationModal') renderQr('trialQrBox', 9, 'Trial ₹9');
        });
    });
    Object.keys(CLOSE).forEach(function (fn) {
        def(fn, function () { hideM(CLOSE[fn]); });
    });

    var origCloseTrial = window.closeTrialActivationModal;
    window.closeTrialActivationModal = function () {
        try { if (origCloseTrial) origCloseTrial.apply(this, arguments); } catch (e) {}
        hideM('trialActivationModal');
        if (typeof window.resetTrialFlow === 'function') {
            try { window.resetTrialFlow(); } catch (e) {}
        }
    };

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        window.__hkInstallPrompt = e;
    });

    try { if (typeof window.updateCounter === 'function') window.updateCounter(); } catch (e) {}

    // 🆕 Checkbox inject karo
    injectExactMatchCheckbox();

    // Re-inject thodi der baad bhi (agar baad me DOM change ho)
    [500, 1500, 3000].forEach(function (delay) {
        setTimeout(injectExactMatchCheckbox, delay);
    });

    console.log('✅ [FIX PACK v1.3] All functions integrated + Exact Match auto-injected');
}

if (document.readyState === 'complete') setTimeout(init, 0);
else window.addEventListener('load', function () { setTimeout(init, 0); });

})();