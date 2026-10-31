// ============================================================
// 📈 PROGRESS TRACKER + 🏆 WEEKLY LEADERBOARD  (Phase 2)
// Progress: इसी device के typing history (hor_tt_history) से
// Leaderboard: Worker के /leaderboard से (सिर्फ़ server-जाँचे certificates)
// ============================================================
(function () {
    'use strict';
    const API = 'https://hor-katha-api.bosctechedu.workers.dev';
    const DAY = 86400000;

    function el(tag, css, text) {
        const e = document.createElement(tag);
        if (css) e.style.cssText = css;
        if (text !== undefined) e.textContent = text;
        return e;
    }
    function localDay(ts) {
        const d = new Date(ts);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    function loadHistory() {
        try { const h = JSON.parse(localStorage.getItem('hor_tt_history') || '[]'); return Array.isArray(h) ? h : []; }
        catch (e) { return []; }
    }
    function loadKeyStats() {
        try { return JSON.parse(localStorage.getItem('hor_tt_key_stats') || '{}') || {}; } catch (e) { return {}; }
    }

    // ─── Overlay shell ───
    function ensureStyles() {
        if (document.getElementById('hkInsightsCss')) return;
        const st = document.createElement('style');
        st.id = 'hkInsightsCss';
        st.textContent = `
            .hk-in-ov{position:fixed;inset:0;z-index:10040;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,.55);padding:16px}
            .hk-in-ov.show{display:flex}
            .hk-in-card{width:min(720px,100%);max-height:88vh;overflow:auto;background:#fff;color:#0f172a;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35);font:14px/1.5 Inter,system-ui,sans-serif}
            .hk-in-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #e2e8f0;position:sticky;top:0;background:#fff;z-index:1}
            .hk-in-head h3{margin:0;font-size:16px;font-weight:900}
            .hk-in-x{border:0;background:#f1f5f9;border-radius:8px;width:32px;height:32px;cursor:pointer;font-size:15px}
            .hk-in-body{padding:14px 18px 18px}
            .hk-in-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:14px}
            .hk-in-tile{border-radius:12px;padding:12px;color:#fff}
            .hk-in-tile b{display:block;font-size:24px;font-weight:900;line-height:1.1}
            .hk-in-tile span{font-size:12px;font-weight:700;opacity:.92}
            .hk-in-sec{margin:16px 0 8px;font-size:12px;font-weight:900;letter-spacing:.5px;text-transform:uppercase;color:#7c3aed}
            .hk-in-chart{width:100%;height:auto;display:block;background:#f8fafc;border-radius:12px}
            .hk-in-keys{display:flex;flex-wrap:wrap;gap:8px}
            .hk-in-key{padding:6px 10px;border-radius:10px;background:#fef2f2;color:#991b1b;font-weight:800}
            .hk-in-empty{padding:28px;text-align:center;color:#64748b}
            .hk-in-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
            .hk-in-tab{border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:6px 12px;font-weight:800;font-size:12px;cursor:pointer}
            .hk-in-tab.active{background:#7c3aed;color:#fff;border-color:#7c3aed}
            .hk-lb-row{display:grid;grid-template-columns:44px 1fr 70px 64px 52px;gap:8px;align-items:center;padding:9px 10px;border-bottom:1px solid #f1f5f9}
            .hk-lb-row.head{font-size:11px;font-weight:900;color:#64748b;text-transform:uppercase;border-bottom:2px solid #e2e8f0}
            .hk-lb-rank{font-weight:900;text-align:center}
            .hk-lb-row:nth-child(2) .hk-lb-rank{font-size:20px}.hk-lb-row:nth-child(3) .hk-lb-rank{font-size:18px}.hk-lb-row:nth-child(4) .hk-lb-rank{font-size:16px}
            .hk-lb-wpm{font-weight:900;color:#7c3aed}
            .hk-in-note{margin-top:12px;font-size:12px;color:#64748b}
        `;
        document.head.appendChild(st);
    }
    let lastFocus = null;
    function overlay(id, title) {
        ensureStyles();
        let ov = document.getElementById(id);
        if (!ov) {
            ov = el('div'); ov.id = id; ov.className = 'hk-in-ov';
            ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
            ov.addEventListener('click', (e) => { if (e.target === ov) close(ov); });
            const card = el('div'); card.className = 'hk-in-card';
            const head = el('div'); head.className = 'hk-in-head';
            const h = el('h3', '', title);
            const x = el('button', '', '✕'); x.className = 'hk-in-x'; x.setAttribute('aria-label', 'बंद करें');
            x.addEventListener('click', () => close(ov));
            head.append(h, x);
            const body = el('div'); body.className = 'hk-in-body';
            card.append(head, body); ov.appendChild(card);
            document.body.appendChild(ov);
        }
        lastFocus = document.activeElement;
        ov.classList.add('show');
        setTimeout(() => { const x = ov.querySelector('.hk-in-x'); if (x) x.focus(); }, 30);
        return ov.querySelector('.hk-in-body');
    }
    function close(ov) {
        ov.classList.remove('show');
        try { if (lastFocus && lastFocus.focus) lastFocus.focus(); } catch (e) {}
    }
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const open = document.querySelector('.hk-in-ov.show');
        if (open) { e.preventDefault(); e.stopPropagation(); close(open); }
    }, true);

    // ─── 📈 Progress ───
    function computeStreak(daysSet) {
        let streak = 0;
        let t = Date.now();
        if (!daysSet.has(localDay(t))) t -= DAY;          // आज अभी test नहीं दिया तो कल से गिनें
        while (daysSet.has(localDay(t))) { streak++; t -= DAY; }
        return streak;
    }
    function bestStreak(days) {
        const sorted = [...days].sort();
        let best = 0, cur = 0, prev = null;
        sorted.forEach(d => {
            const ts = new Date(d + 'T00:00:00').getTime();
            cur = (prev !== null && Math.round((ts - prev) / DAY) === 1) ? cur + 1 : 1;
            best = Math.max(best, cur); prev = ts;
        });
        return best;
    }
    function chartSvg(points) {
        // points: [{day, wpm, acc}] — पिछले 30 दिन, हर दिन का best WPM
        const W = 660, H = 220, P = { l: 36, r: 12, t: 14, b: 34 };
        const maxW = Math.max(20, ...points.map(p => p.wpm || 0));
        const top = Math.ceil(maxW / 10) * 10;
        const iw = W - P.l - P.r, ih = H - P.t - P.b, bw = iw / points.length;
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('class', 'hk-in-chart');
        svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'पिछले 30 दिन का best WPM');
        const add = (tag, attrs, txt) => { const n = document.createElementNS(ns, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (txt !== undefined) n.textContent = txt; svg.appendChild(n); return n; };
        for (let i = 0; i <= 4; i++) {
            const y = P.t + ih - (ih * i / 4);
            add('line', { x1: P.l, x2: W - P.r, y1: y, y2: y, stroke: '#e2e8f0', 'stroke-width': 1 });
            add('text', { x: P.l - 6, y: y + 4, 'text-anchor': 'end', 'font-size': 10, fill: '#64748b' }, String(Math.round(top * i / 4)));
        }
        points.forEach((p, i) => {
            const x = P.l + i * bw;
            if (p.wpm) {
                const h = ih * (p.wpm / top);
                const r = add('rect', { x: x + bw * 0.15, y: P.t + ih - h, width: Math.max(2, bw * 0.7), height: h, rx: 3,
                    fill: p.acc >= 95 ? '#16a34a' : p.acc >= 85 ? '#7c3aed' : '#f59e0b' });
                const tt = document.createElementNS(ns, 'title'); tt.textContent = `${p.day}: ${p.wpm} WPM, ${p.acc}%`; r.appendChild(tt);
            }
            if (i % 5 === 0 || i === points.length - 1) {
                add('text', { x: x + bw / 2, y: H - 12, 'text-anchor': 'middle', 'font-size': 10, fill: '#64748b' }, p.day.slice(8) + '/' + p.day.slice(5, 7));
            }
        });
        return svg;
    }
    window.hkOpenProgress = function () {
        const body = overlay('hkProgressOv', '📈 मेरी Progress');
        body.innerHTML = '';
        const hist = loadHistory().filter(h => h && h.ts && Number(h.wpm) >= 0);
        if (!hist.length) {
            const e = el('div', '', 'अभी कोई typing test नहीं दिया गया। Typing Practice से पहला test दें, फिर यहाँ आपकी progress दिखेगी।');
            e.className = 'hk-in-empty'; body.appendChild(e);
            return;
        }
        const byDay = new Map();
        hist.forEach(h => {
            const d = localDay(h.ts);
            const cur = byDay.get(d);
            if (!cur || h.wpm > cur.wpm) byDay.set(d, { wpm: Math.round(h.wpm), acc: Math.round(h.accuracy || 0) });
        });
        const days = new Set(byDay.keys());
        const best = Math.max(...hist.map(h => h.wpm || 0));
        const last7 = hist.filter(h => Date.now() - h.ts < 7 * DAY);
        const avg7 = last7.length ? Math.round(last7.reduce((a, h) => a + (h.wpm || 0), 0) / last7.length) : 0;
        const prev7 = hist.filter(h => Date.now() - h.ts >= 7 * DAY && Date.now() - h.ts < 14 * DAY);
        const avgPrev = prev7.length ? Math.round(prev7.reduce((a, h) => a + (h.wpm || 0), 0) / prev7.length) : 0;
        const trend = (avg7 && avgPrev) ? avg7 - avgPrev : null;
        const streak = computeStreak(days);

        const tiles = el('div'); tiles.className = 'hk-in-tiles';
        [
            ['🔥 ' + streak + ' दिन', 'लगातार practice', 'linear-gradient(135deg,#ea580c,#f97316)'],
            ['🏅 ' + bestStreak(days) + ' दिन', 'सबसे लंबी streak', 'linear-gradient(135deg,#be185d,#f472b6)'],
            [Math.round(best) + ' WPM', 'अब तक का best', 'linear-gradient(135deg,#7c3aed,#a855f7)'],
            [avg7 + ' WPM', '7 दिन का औसत' + (trend !== null ? ` (${trend >= 0 ? '▲' : '▼'}${Math.abs(trend)})` : ''), 'linear-gradient(135deg,#0284c7,#38bdf8)'],
            [String(hist.length), 'कुल tests', 'linear-gradient(135deg,#059669,#34d399)']
        ].forEach(([v, l, bg]) => {
            const t = el('div', 'background:' + bg); t.className = 'hk-in-tile';
            t.append(el('b', '', v), el('span', '', l)); tiles.appendChild(t);
        });
        body.appendChild(tiles);
        if (!days.has(localDay(Date.now()))) {
            body.appendChild(el('div', 'margin:-4px 0 10px;padding:8px 12px;border-radius:10px;background:#fff7ed;color:#9a3412;font-weight:700;font-size:13px;',
                streak ? `आज एक test दें, नहीं तो ${streak} दिन की streak टूट जाएगी।` : 'आज एक test देकर नई streak शुरू करें।'));
        }

        const sec1 = el('div', '', 'पिछले 30 दिन — हर दिन का best WPM'); sec1.className = 'hk-in-sec'; body.appendChild(sec1);
        const pts = [];
        for (let i = 29; i >= 0; i--) {
            const d = localDay(Date.now() - i * DAY);
            const v = byDay.get(d);
            pts.push({ day: d, wpm: v ? v.wpm : 0, acc: v ? v.acc : 0 });
        }
        body.appendChild(chartSvg(pts));
        body.appendChild(el('div', 'font-size:11px;color:#64748b;margin-top:4px;', '🟩 95%+ accuracy · 🟪 85–94% · 🟧 85% से कम'));

        const ks = loadKeyStats();
        const weak = Object.entries(ks).filter(([, v]) => v && (v.correct + v.wrong) >= 5)
            .map(([k, v]) => ({ k, acc: Math.round(v.correct / (v.correct + v.wrong) * 100) }))
            .filter(x => x.acc < 97).sort((a, b) => a.acc - b.acc).slice(0, 10);
        const sec2 = el('div', '', 'सबसे ज़्यादा गलती वाले अक्षर'); sec2.className = 'hk-in-sec'; body.appendChild(sec2);
        if (weak.length) {
            const wrap = el('div'); wrap.className = 'hk-in-keys';
            weak.forEach(w => { const c = el('span', '', `${w.k}  ${w.acc}%`); c.className = 'hk-in-key'; wrap.appendChild(c); });
            body.appendChild(wrap);
            body.appendChild(el('div', '', 'इन अक्षरों वाले lessons दोबारा करें, accuracy जल्दी सुधरेगी।')).className = 'hk-in-note';
        } else {
            body.appendChild(el('div', 'color:#16a34a;font-weight:700;', '✅ अभी कोई कमज़ोर अक्षर नहीं, बढ़िया!'));
        }

        const sec3 = el('div', '', 'हाल के tests'); sec3.className = 'hk-in-sec'; body.appendChild(sec3);
        const tbl = el('table', 'width:100%;border-collapse:collapse;font-size:13px;');
        const hr = tbl.insertRow();
        ['तारीख', 'WPM', 'Accuracy', 'Grade', 'Level'].forEach(h => { const th = el('th', 'text-align:left;padding:6px;border-bottom:2px solid #e2e8f0;color:#64748b;font-size:11px;', h); hr.appendChild(th); });
        const lv = { basic: 'Basic', advanced: 'Advanced', job: 'Job', exam: 'Govt Exam' };
        hist.slice(0, 10).forEach(h => {
            const tr = tbl.insertRow();
            [new Date(h.ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
             Math.round(h.wpm), Math.round(h.accuracy || 0) + '%', h.grade || '-', lv[h.group] || h.group || '-']
                .forEach(v => { const td = tr.insertCell(); td.textContent = v; td.style.cssText = 'padding:6px;border-bottom:1px solid #f1f5f9;'; });
        });
        body.appendChild(tbl);
    };

    // ─── 🏆 Leaderboard ───
    let lbCat = 'all';
    async function renderLb(body) {
        body.innerHTML = '';
        const tabs = el('div'); tabs.className = 'hk-in-tabs';
        [['all', 'सभी'], ['basic', '🟢 Basic'], ['advanced', '🟠 Advanced'], ['job', '🔵 Job / Exam']].forEach(([k, l]) => {
            const b = el('button', '', l); b.className = 'hk-in-tab' + (lbCat === k ? ' active' : '');
            b.addEventListener('click', () => { lbCat = k; renderLb(body); });
            tabs.appendChild(b);
        });
        body.appendChild(tabs);
        const list = el('div', '', '⏳ Loading...'); body.appendChild(list);
        try {
            const q = lbCat === 'all' ? '' : `?cat=${lbCat}`;
            const res = await fetch(`${API}/leaderboard${q}`, { cache: 'no-store' });
            const data = await res.json();
            list.textContent = '';
            const entries = (data && data.entries) || [];
            if (!entries.length) {
                const e = el('div', '', 'इस हफ़्ते अभी कोई नाम नहीं। कम से कम 1 मिनट का test 85%+ accuracy से पूरा करें और certificate बनाएँ, आपका नाम यहाँ आ सकता है!');
                e.className = 'hk-in-empty'; list.appendChild(e);
            } else {
                const head = el('div'); head.className = 'hk-lb-row head';
                ['#', 'नाम', 'WPM', 'Acc', 'Grade'].forEach(h => head.appendChild(el('span', '', h)));
                list.appendChild(head);
                const medal = ['🥇', '🥈', '🥉'];
                entries.forEach((x, i) => {
                    const r = el('div'); r.className = 'hk-lb-row';
                    const rank = el('span', '', medal[i] || String(i + 1)); rank.className = 'hk-lb-rank';
                    const w = el('span', '', String(x.wpm)); w.className = 'hk-lb-wpm';
                    r.append(rank, el('span', 'font-weight:700', x.name), w, el('span', '', x.acc + '%'), el('span', '', x.grade || '-'));
                    list.appendChild(r);
                });
            }
            const note = el('div', '', `हफ़्ता ${data.week} (सोमवार) से। सिर्फ़ server से जाँचे गए certificates गिने जाते हैं: कम से कम 1 मिनट, 85%+ accuracy।`);
            note.className = 'hk-in-note'; body.appendChild(note);
        } catch (e) {
            list.textContent = '⚠️ Leaderboard लोड नहीं हुआ। Internet जाँचकर दोबारा खोलें।';
        }
    }
    window.hkOpenLeaderboard = function () {
        renderLb(overlay('hkLeaderboardOv', '🏆 इस हफ़्ते के Top Typists'));
    };
})();
