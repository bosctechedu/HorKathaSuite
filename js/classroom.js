// ============================================================
// 🏫 Classroom (v42) — student class join + test result report
//    Teacher Dashboard: teacher.html (P3 / Institute / ₹9 Trial) — hkCan('teacher'), असली जाँच Worker पर
// ============================================================
(function () {
    'use strict';
    const API = 'https://hor-katha-api.bosctechedu.workers.dev/class';
    const LS_CLASS = 'hk_class_code', LS_STU = 'hk_class_stu', LS_NAME = 'hk_class_name';
    const GROUPS = { basic: 'Basic', advanced: 'Advanced', job: 'Job', exam: 'Govt Exam' };
    const LESSONS = {
        basic: ['Home Row Practice', 'Common Words', 'Short Sentences'],
        advanced: ['Punctuation & Quotes', 'Numbers & Symbols', 'Complex Paragraph'],
        job: ['Email Writing', 'Office Report', 'Government Format'],
        exam: ['Govt Exam — Passage 1', 'Govt Exam — Office Order', 'Govt Exam — Passage 3']
    };
    const LANGS = { any: 'कोई भी भाषा', english: 'English', 'hindi-dev': 'हिन्दी', 'santali-dev': 'Santali (D)', olchiki: 'ओलचिकी', roman: 'Santali (R)' };

    const ls = {
        get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
        del(k) { try { localStorage.removeItem(k); } catch (e) {} }
    };
    function stuId() {
        let s = ls.get(LS_STU);
        if (!/^[a-f0-9]{24}$/.test(s)) {
            s = Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, '0')).join('');
            ls.set(LS_STU, s);
        }
        return s;
    }
    function toast(msg, type) {
        if (typeof window.showToast === 'function') { try { window.showToast(msg, type || 'info'); return; } catch (e) {} }
        try { alert(msg); } catch (e) {}
    }
    async function call(body) {
        const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { const err = new Error(data.error || ('Error ' + res.status)); err.code = data.code; throw err; }
        return data;
    }
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const lessonLabel = a => (GROUPS[a.g] || a.g) + ' · ' + ((LESSONS[a.g] || [])[a.i] || 'Lesson') + (a.l && a.l !== 'any' ? ' · ' + (LANGS[a.l] || a.l) : '');

    // ── Test result → class (server-verified typing proof) ──
    function hookProof() {
        if (typeof window._ttProofFinish !== 'function' || window._ttProofFinish.__hkCls) return false;
        const orig = window._ttProofFinish;
        const wrapped = function (state) {
            const p = orig.apply(this, arguments);
            const code = ls.get(LS_CLASS);
            if (code && state) {
                const g = state.group, i = state.idx, l = window.currentLayout || 'english';
                Promise.resolve(p).then(sid => {
                    if (!sid) return;
                    return call({ op: 'report', code, stu: stuId(), sid, g, i, l }).then(r => {
                        toast('🏫 Result class में भेजा गया (' + r.wpm + ' WPM, ' + r.acc + '%)', 'success');
                    });
                }).catch(e => {
                    if (e && e.code === 'NOT_MEMBER') { ls.del(LS_CLASS); toast('🏫 आप अब इस class में नहीं हैं', 'warning'); }
                    else console.warn('[Class] report failed:', e && e.message);
                });
            }
            return p;
        };
        wrapped.__hkCls = true;
        window._ttProofFinish = wrapped;
        return true;
    }
    if (!hookProof()) {
        let tries = 0;
        const t = setInterval(() => { if (hookProof() || ++tries > 40) clearInterval(t); }, 500);
    }

    // ── Modal ──
    const CSS = `
#hkClassModal{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.55);padding:12px;}
#hkClassModal.open{display:flex;}
#hkClassModal .hkc-box{background:var(--bg-panel,#fff);color:var(--text-main,#111);width:min(480px,100%);max-height:90vh;overflow:auto;border-radius:14px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,.35);font-size:14px;}
#hkClassModal h3{margin:0 0 4px;font-size:18px;display:flex;justify-content:space-between;align-items:center;}
#hkClassModal .hkc-x{background:none;border:0;font-size:22px;cursor:pointer;color:inherit;}
#hkClassModal .hkc-sub{opacity:.75;font-size:12.5px;margin-bottom:12px;}
#hkClassModal label{display:block;font-weight:700;font-size:12.5px;margin:10px 0 4px;}
#hkClassModal input{width:100%;box-sizing:border-box;padding:9px 10px;border-radius:9px;border:1px solid var(--border-color,#ccc);background:var(--bg-input,#fff);color:inherit;font-size:14px;}
#hkClassModal .hkc-btn{display:inline-block;width:100%;margin-top:12px;padding:10px;border-radius:9px;border:0;font-weight:800;cursor:pointer;color:#fff;background:var(--primary,#2563eb);font-size:14px;}
#hkClassModal .hkc-btn.ghost{background:transparent;color:inherit;border:1px solid var(--border-color,#ccc);}
#hkClassModal .hkc-btn.teach{background:#7c3aed;}
#hkClassModal .hkc-card{border:1px solid var(--border-color,#ddd);border-radius:10px;padding:10px 12px;margin-top:10px;}
#hkClassModal .hkc-li{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px dashed var(--border-color,#ddd);font-size:13px;}
#hkClassModal .hkc-li:last-child{border-bottom:0;}
#hkClassModal .hkc-ok{color:#16a34a;font-weight:800;white-space:nowrap;}
#hkClassModal .hkc-no{opacity:.6;white-space:nowrap;}
#hkClassModal .hkc-stats{display:flex;gap:8px;margin-top:10px;}
#hkClassModal .hkc-stats div{flex:1;text-align:center;border:1px solid var(--border-color,#ddd);border-radius:10px;padding:8px 4px;}
#hkClassModal .hkc-stats b{display:block;font-size:18px;}
#hkClassModal .hkc-err{color:#dc2626;font-size:13px;margin-top:8px;min-height:1em;}
#hkClassModal hr{border:0;border-top:1px solid var(--border-color,#ddd);margin:16px 0 4px;}
`;
    let modal = null;
    function build() {
        if (modal) return;
        const st = document.createElement('style'); st.id = 'hkClassCss'; st.textContent = CSS; document.head.appendChild(st);
        modal = document.createElement('div'); modal.id = 'hkClassModal';
        modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = '<div class="hkc-box"><h3><span>🏫 Class</span><button type="button" class="hkc-x" aria-label="Close">×</button></h3><div id="hkcBody"></div></div>';
        document.body.appendChild(modal);
        modal.querySelector('.hkc-x').onclick = close;
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
    }
    function close() { if (modal) modal.classList.remove('open'); }
    const teacherBlock = () => '<hr><div class="hkc-sub" style="margin-top:8px">👩‍🏫 Teacher हैं? P3 Ultimate, Institute plan या ₹9 Trial में अपनी class बनाएँ, lesson दें और हर student की WPM, accuracy और streak देखें।</div><button type="button" class="hkc-btn teach" id="hkcTeach">👩‍🏫 Teacher Dashboard खोलें</button>';

    function renderJoin(prefill, err) {
        const b = modal.querySelector('#hkcBody');
        b.innerHTML = '<div class="hkc-sub">Teacher से मिला class code डालें। Typing Practice के आपके result अपने-आप teacher तक पहुँचेंगे।</div>' +
            '<label for="hkcCode">Class code</label><input id="hkcCode" placeholder="HKC-XXXXXX" maxlength="10" autocomplete="off" style="text-transform:uppercase" value="' + esc(prefill || '') + '">' +
            '<label for="hkcName">आपका नाम (teacher को यही दिखेगा)</label><input id="hkcName" maxlength="40" autocomplete="name" value="' + esc(ls.get(LS_NAME) || ls.get('hor_lic_user') || '') + '">' +
            '<div class="hkc-err" id="hkcErr">' + esc(err || '') + '</div>' +
            '<button type="button" class="hkc-btn" id="hkcJoin">Class join करें</button>' + teacherBlock();
        b.querySelector('#hkcJoin').onclick = async () => {
            const code = b.querySelector('#hkcCode').value.trim().toUpperCase(), name = b.querySelector('#hkcName').value.trim();
            const errEl = b.querySelector('#hkcErr'); errEl.textContent = '';
            if (!/^HKC-[A-Z0-9]{6}$/.test(code)) { errEl.textContent = 'Code HKC-XXXXXX जैसा होना चाहिए'; return; }
            if (name.length < 2) { errEl.textContent = 'अपना नाम लिखें'; return; }
            const btn = b.querySelector('#hkcJoin'); btn.disabled = true; btn.textContent = 'Joining…';
            try {
                const r = await call({ op: 'join', code, stu: stuId(), name });
                ls.set(LS_CLASS, code); ls.set(LS_NAME, name);
                toast('✅ "' + r.title + '" class join हो गई', 'success');
                renderClass(r);
            } catch (e) { errEl.textContent = e.message; btn.disabled = false; btn.textContent = 'Class join करें'; }
        };
        b.querySelector('#hkcTeach').onclick = openTeacher;
    }

    function streakOf(results) {
        const days = new Set(results.map(r => new Date(r.t).toDateString()));
        let n = 0; const d = new Date();
        if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
        while (days.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); }
        return n;
    }
    function renderClass(r) {
        const b = modal.querySelector('#hkcBody');
        const res = r.results || [];
        const done = a => res.filter(x => x.g === a.g && x.i === a.i && (a.l === 'any' || x.l === a.l));
        const best = res.reduce((m, x) => Math.max(m, x.w), 0);
        const avgAcc = res.length ? Math.round(res.reduce((s, x) => s + x.a, 0) / res.length) : 0;
        const assignHtml = (r.assign || []).length
            ? r.assign.map(a => { const d = done(a); const bw = d.reduce((m, x) => Math.max(m, x.w), 0);
                return '<div class="hkc-li"><span>' + esc(lessonLabel(a)) + '</span>' + (d.length ? '<span class="hkc-ok">✓ ' + bw + ' WPM</span>' : '<span class="hkc-no">बाकी</span>') + '</div>'; }).join('')
            : '<div class="hkc-sub" style="margin:0">Teacher ने अभी कोई lesson नहीं दिया। कोई भी Typing Practice test दें, result class में जाएगा।</div>';
        b.innerHTML = '<div class="hkc-sub">' + esc(r.title) + (r.teacher ? ' · Teacher: ' + esc(r.teacher) : '') + ' · ' + esc(r.code) + '<br>नाम: ' + esc(r.name) + '</div>' +
            '<div class="hkc-stats"><div><b>' + res.length + '</b>Tests</div><div><b>' + best + '</b>Best WPM</div><div><b>' + avgAcc + '%</b>Accuracy</div><div><b>' + streakOf(res) + '🔥</b>Streak</div></div>' +
            '<div class="hkc-card"><b>📋 Teacher के दिए lessons</b>' + assignHtml + '</div>' +
            '<button type="button" class="hkc-btn" id="hkcPractice">⌨️ Typing Practice शुरू करें</button>' +
            '<button type="button" class="hkc-btn ghost" id="hkcLeave">Class छोड़ें</button>' + teacherBlock();
        b.querySelector('#hkcPractice').onclick = () => { close(); if (typeof window.openTypingTestModal === 'function') window.openTypingTestModal(); };
        b.querySelector('#hkcLeave').onclick = async () => {
            if (!confirm('क्या आप "' + r.title + '" class छोड़ना चाहते हैं?')) return;
            try { await call({ op: 'leave', code: r.code, stu: stuId() }); } catch (e) {}
            ls.del(LS_CLASS); renderJoin('');
        };
        b.querySelector('#hkcTeach').onclick = openTeacher;
    }
    function openTeacher() {
        if (typeof window.hkCan === 'function' && !window.hkCan('teacher')) { if (typeof window.hkLocked === 'function') window.hkLocked('teacher'); return; }
        window.open('teacher.html', '_blank', 'noopener');
    }

    async function openClassroom(prefill) {
        build(); modal.classList.add('open');
        const code = ls.get(LS_CLASS);
        if (!code || prefill) { renderJoin(prefill || ''); return; }
        modal.querySelector('#hkcBody').innerHTML = '<div class="hkc-sub">Loading…</div>';
        try { renderClass(await call({ op: 'info', code, stu: stuId() })); }
        catch (e) {
            if (e.code === 'NOT_MEMBER' || /नहीं मिली/.test(e.message)) { ls.del(LS_CLASS); renderJoin('', e.message); }
            else renderJoin(code, e.message);
        }
    }
    window.openClassroom = openClassroom;

    // Teacher का share link: ?class=HKC-XXXXXX
    try {
        const q = new URLSearchParams(location.search).get('class');
        if (q && /^HKC-[A-Z0-9]{6}$/i.test(q) && ls.get(LS_CLASS) !== q.toUpperCase()) {
            const go = () => setTimeout(() => openClassroom(q.toUpperCase()), 1200);
            if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
        }
    } catch (e) {}
})();
