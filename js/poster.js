// ============================================================
// 🖼️ POSTER MAKER — Hoṛ Katha Suite (v40)
// BOSC Tech & Edu
// ============================================================
// Ol Chiki / हिन्दी / संताली / English में festival badhai,
// सूचना (Notice), निमंत्रण (Invite) और विचार (Quote) poster।
//   • 4 templates × कई रंग, 3 size (Square / Status / A4)
//   • Editor से text एक click में
//   • PNG download, WhatsApp/Share, Print
//   • Free / P1: छोटा "Made with Hoṛ Katha Suite" watermark
//     P2, P3 और ₹9 Trial: बिना watermark
// किसी existing file का logic नहीं बदलता।
// ============================================================
(function () {
    'use strict';
    if (window.__HKPOSTER_LOADED__) return;
    window.__HKPOSTER_LOADED__ = true;

    const FONT = "'Noto Sans Ol Chiki','Noto Sans Devanagari','Nirmala UI','Inter','Segoe UI',sans-serif";
    const SITE = 'horkathasuite.pages.dev';

    const SIZES = {
        square: { w: 1080, h: 1080, label: '⬛ Square (Post)' },
        story:  { w: 1080, h: 1920, label: '📱 Status / Story' },
        a4:     { w: 1240, h: 1754, label: '📄 A4 (Print)' }
    };

    // ------------------------------------------------------------
    // 🎨 TEMPLATES
    // ------------------------------------------------------------
    const TEMPLATES = {
        festival: {
            name: '🎉 त्योहार बधाई',
            palettes: [
                { bg: ['#7c2d12', '#ea580c'], fg: '#fff7ed', accent: '#fde047', name: 'सोहराय' },
                { bg: ['#14532d', '#16a34a'], fg: '#f0fdf4', accent: '#facc15', name: 'बाहा (साल)' },
                { bg: ['#4c1d95', '#a21caf'], fg: '#fdf4ff', accent: '#fbbf24', name: 'Royal' },
                { bg: ['#0c4a6e', '#0891b2'], fg: '#ecfeff', accent: '#fde68a', name: 'Sky' }
            ],
            defaults: {
                heading: 'सोहराय परब की हार्दिक शुभकामनाएँ',
                message: 'ᱡᱚᱦᱟᱨ! आपके परिवार में सुख, शांति और खुशहाली बनी रहे।',
                from: 'BOSC Tech & Edu'
            }
        },
        notice: {
            name: '📢 सूचना / Notice',
            palettes: [
                { bg: ['#ffffff', '#f1f5f9'], fg: '#0f172a', accent: '#1d4ed8', name: 'नीला' },
                { bg: ['#ffffff', '#fef2f2'], fg: '#0f172a', accent: '#b91c1c', name: 'लाल' },
                { bg: ['#ffffff', '#f0fdf4'], fg: '#0f172a', accent: '#15803d', name: 'हरा' }
            ],
            defaults: {
                heading: 'सूचना',
                message: 'सभी सदस्यों को सूचित किया जाता है कि ग्राम सभा की बैठक रविवार सुबह 10 बजे पंचायत भवन में होगी। सभी की उपस्थिति अनिवार्य है।',
                from: 'ग्राम प्रधान'
            }
        },
        invite: {
            name: '💐 निमंत्रण',
            palettes: [
                { bg: ['#4a0d1a', '#7f1d1d'], fg: '#fff7ed', accent: '#f5c451', name: 'मैरून-सुनहरा' },
                { bg: ['#fffbeb', '#fef3c7'], fg: '#422006', accent: '#b45309', name: 'क्रीम' },
                { bg: ['#052e16', '#14532d'], fg: '#f0fdf4', accent: '#f5c451', name: 'हरा-सुनहरा' }
            ],
            defaults: {
                heading: 'शुभ विवाह',
                message: 'आप सपरिवार सादर आमंत्रित हैं।\nस्थान: ……………\nदिनांक: ……………',
                from: 'निवेदक: ……………'
            }
        },
        quote: {
            name: '💬 विचार / Quote',
            palettes: [
                { bg: ['#0f172a', '#1e293b'], fg: '#f8fafc', accent: '#38bdf8', name: 'Night' },
                { bg: ['#1c1917', '#44403c'], fg: '#fafaf9', accent: '#f59e0b', name: 'Earth' },
                { bg: ['#fdf2f8', '#fce7f3'], fg: '#500724', accent: '#db2777', name: 'Rose' }
            ],
            defaults: {
                heading: 'आज का विचार',
                message: 'अपनी भाषा में लिखना, अपनी पहचान को ज़िंदा रखना है।',
                from: 'Hoṛ Katha'
            }
        }
    };

    const S = {
        tpl: 'festival', pal: 0, size: 'square', scale: 100,
        heading: '', message: '', from: '', date: '',
        edited: { heading: false, message: false, from: false }
    };

    // ------------------------------------------------------------
    // 🔐 Watermark rule
    // ------------------------------------------------------------
    function isWatermarkFree() {
        const t = String(window.currentTier || window.__HK_CURRENT_TIER__ || '').toUpperCase();
        return /P2|P3|COMMERCIAL|ULTIMATE|TRIAL/.test(t);
    }

    // ------------------------------------------------------------
    // ✍️ Text helpers
    // ------------------------------------------------------------
    function wrap(ctx, text, maxW) {
        const out = [];
        String(text || '').split('\n').forEach(para => {
            const words = para.split(/\s+/).filter(Boolean);
            if (!words.length) { out.push(''); return; }
            let line = '';
            words.forEach(w => {
                const test = line ? line + ' ' + w : w;
                if (ctx.measureText(test).width <= maxW || !line) {
                    if (!line && ctx.measureText(w).width > maxW) {
                        // बहुत लंबा शब्द → अक्षर-वार तोड़ें
                        let part = '';
                        Array.from(w).forEach(ch => {
                            if (ctx.measureText(part + ch).width > maxW && part) { out.push(part); part = ch; }
                            else part += ch;
                        });
                        line = part;
                    } else line = test;
                } else { out.push(line); line = w; }
            });
            out.push(line);
        });
        return out;
    }

    // maxH में समाने तक font घटाएँ
    function fitBlock(ctx, text, maxW, maxH, startPx, weight, minPx) {
        let px = startPx, lines = [];
        minPx = minPx || 18;
        while (px >= minPx) {
            ctx.font = weight + ' ' + px + 'px ' + FONT;
            lines = wrap(ctx, text, maxW);
            if (lines.length * px * 1.35 <= maxH) break;
            px -= 2;
        }
        return { px: Math.max(px, minPx), lines };
    }

    function drawLines(ctx, block, x, yTop, align, color, weight) {
        ctx.font = weight + ' ' + block.px + 'px ' + FONT;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = 'top';
        const lh = block.px * 1.35;
        block.lines.forEach((l, i) => ctx.fillText(l, x, yTop + i * lh));
        return yTop + block.lines.length * lh;
    }

    function bgGradient(ctx, W, H, c) {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, c[0]); g.addColorStop(1, c[1]);
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    // Santali दीवार-चित्र जैसी zigzag + diamond पट्टी
    function sohraiBand(ctx, W, y, h, color, alt) {
        ctx.save();
        ctx.fillStyle = color;
        const step = h * 1.2;
        for (let x = -step; x < W + step; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, y + h); ctx.lineTo(x + step / 2, y); ctx.lineTo(x + step, y + h);
            ctx.closePath(); ctx.fill();
        }
        ctx.fillStyle = alt;
        for (let x = step / 2; x < W; x += step) {
            const cy = y + h * 0.62, r = h * 0.18;
            ctx.beginPath();
            ctx.moveTo(x, cy - r); ctx.lineTo(x + r, cy); ctx.lineTo(x, cy + r); ctx.lineTo(x - r, cy);
            ctx.closePath(); ctx.fill();
        }
        ctx.restore();
    }

    function dots(ctx, W, H, color, n, seed) {
        ctx.save(); ctx.fillStyle = color;
        let s = seed || 7;
        const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
        for (let i = 0; i < n; i++) {
            ctx.globalAlpha = 0.08 + rnd() * 0.18;
            ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, 4 + rnd() * 18, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }

    function watermark(ctx, W, H, dark) {
        if (isWatermarkFree()) return;
        const px = Math.round(W * 0.022);
        ctx.save();
        ctx.font = '700 ' + px + 'px ' + FONT;
        ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = dark ? 'rgba(15,23,42,.75)' : 'rgba(255,255,255,.85)';
        ctx.fillText('Made with Hoṛ Katha Suite · ' + SITE, W - px, H - px * 0.8);
        ctx.restore();
    }

    // ------------------------------------------------------------
    // 🖌️ DRAW
    // ------------------------------------------------------------
    function draw(canvas) {
        const sz = SIZES[S.size];
        const W = sz.w, H = sz.h;
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');
        const T = TEMPLATES[S.tpl];
        const P = T.palettes[S.pal] || T.palettes[0];
        const tall = H / W > 1.3 ? 1.25 : 1; // Story/A4 में बड़ा text
        const k = S.scale / 100 * tall;
        const pad = Math.round(W * 0.09);
        const innerW = W - pad * 2;
        const fromLine = [S.from, S.date].filter(Boolean).join('  •  ');

        bgGradient(ctx, W, H, P.bg);

        if (S.tpl === 'festival') {
            dots(ctx, W, H, P.accent, 40, 11);
            const band = Math.round(H * 0.06);
            sohraiBand(ctx, W, 0, band, P.accent, P.bg[0]);
            ctx.save(); ctx.translate(0, H); ctx.scale(1, -1);
            sohraiBand(ctx, W, 0, band, P.accent, P.bg[0]); ctx.restore();
            const top = band + H * 0.08, bottom = H - band - H * 0.06;
            const hb = fitBlock(ctx, S.heading, innerW, (bottom - top) * 0.38, Math.round(W * 0.085 * k), '700');
            const mb = fitBlock(ctx, S.message, innerW, (bottom - top) * 0.38, Math.round(W * 0.05 * k), '400');
            const fb = fitBlock(ctx, fromLine, innerW, H * 0.08, Math.round(W * 0.038 * k), '700');
            const gap = H * 0.04;
            const total = hb.lines.length * hb.px * 1.35 + gap + mb.lines.length * mb.px * 1.35 + gap * 1.5 + (fromLine ? fb.px * 1.35 : 0);
            let y = top + Math.max(0, (bottom - top - total) / 2);
            y = drawLines(ctx, hb, W / 2, y, 'center', P.accent, '700') + gap;
            y = drawLines(ctx, mb, W / 2, y, 'center', P.fg, '400') + gap * 0.6;
            ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = Math.max(3, W * 0.004);
            ctx.beginPath(); ctx.moveTo(W / 2 - W * 0.12, y); ctx.lineTo(W / 2 + W * 0.12, y); ctx.stroke(); ctx.restore();
            y += gap * 0.9;
            if (fromLine) drawLines(ctx, fb, W / 2, y, 'center', P.fg, '700');
            watermark(ctx, W, H - band, false);
        }

        else if (S.tpl === 'notice') {
            const head = Math.round(H * 0.16);
            ctx.fillStyle = P.accent; ctx.fillRect(0, 0, W, head);
            ctx.fillStyle = P.accent; ctx.globalAlpha = 0.15; ctx.fillRect(0, head, W, Math.round(H * 0.012)); ctx.globalAlpha = 1;
            const hb = fitBlock(ctx, S.heading, innerW, head * 0.8, Math.round(W * 0.08 * k), '700');
            drawLines(ctx, hb, W / 2, (head - hb.lines.length * hb.px * 1.35) / 2 + hb.px * 0.1, 'center', '#ffffff', '700');
            const top = head + H * 0.07, footH = H * 0.16, bottom = H - footH;
            const mb = fitBlock(ctx, S.message, innerW, bottom - top, Math.round(W * 0.052 * k), '400');
            drawLines(ctx, mb, pad, top, 'left', P.fg, '400');
            ctx.strokeStyle = P.accent; ctx.lineWidth = Math.max(2, W * 0.003);
            ctx.beginPath(); ctx.moveTo(pad, bottom); ctx.lineTo(W - pad, bottom); ctx.stroke();
            if (S.date) {
                const db = fitBlock(ctx, 'दिनांक: ' + S.date, innerW / 2, footH * 0.5, Math.round(W * 0.034 * k), '400');
                drawLines(ctx, db, pad, bottom + footH * 0.22, 'left', P.fg, '400');
            }
            if (S.from) {
                const fb = fitBlock(ctx, S.from, innerW / 2, footH * 0.5, Math.round(W * 0.038 * k), '700');
                drawLines(ctx, fb, W - pad, bottom + footH * 0.22, 'right', P.fg, '700');
            }
            watermark(ctx, W, H, true);
        }

        else if (S.tpl === 'invite') {
            const m1 = W * 0.04, m2 = W * 0.06;
            ctx.strokeStyle = P.accent;
            ctx.lineWidth = Math.max(4, W * 0.006); ctx.strokeRect(m1, m1, W - m1 * 2, H - m1 * 2);
            ctx.lineWidth = Math.max(2, W * 0.002); ctx.strokeRect(m2, m2, W - m2 * 2, H - m2 * 2);
            const r = W * 0.07;
            [[m2, m2, 0], [W - m2, m2, Math.PI / 2], [W - m2, H - m2, Math.PI], [m2, H - m2, Math.PI * 1.5]].forEach(c => {
                ctx.beginPath(); ctx.arc(c[0], c[1], r, c[2], c[2] + Math.PI / 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(c[0], c[1], r * 0.6, c[2], c[2] + Math.PI / 2); ctx.stroke();
            });
            const top = H * 0.14, bottom = H * 0.86, iw = W - m2 * 2 - W * 0.12;
            const hb = fitBlock(ctx, S.heading, iw, (bottom - top) * 0.3, Math.round(W * 0.09 * k), '700');
            const mb = fitBlock(ctx, S.message, iw, (bottom - top) * 0.45, Math.round(W * 0.045 * k), '400');
            const fb = fitBlock(ctx, fromLine, iw, H * 0.1, Math.round(W * 0.038 * k), '700');
            const gap = H * 0.045;
            const total = hb.lines.length * hb.px * 1.35 + gap * 2 + mb.lines.length * mb.px * 1.35 + gap + (fromLine ? fb.lines.length * fb.px * 1.35 : 0);
            let y = top + Math.max(0, (bottom - top - total) / 2);
            y = drawLines(ctx, hb, W / 2, y, 'center', P.accent, '700') + gap * 0.5;
            ctx.fillStyle = P.accent;
            [-1, 0, 1].forEach(i => { ctx.beginPath(); ctx.arc(W / 2 + i * W * 0.035, y + gap * 0.4, W * 0.007, 0, Math.PI * 2); ctx.fill(); });
            y += gap * 1.5;
            y = drawLines(ctx, mb, W / 2, y, 'center', P.fg, '400') + gap;
            if (fromLine) drawLines(ctx, fb, W / 2, y, 'center', P.accent, '700');
            watermark(ctx, W - m2 - W * 0.02, H - m2 - W * 0.015, P.bg[0] === '#fffbeb');
        }

        else { // quote
            dots(ctx, W, H, P.accent, 18, 3);
            const qpx = Math.round(W * 0.3);
            ctx.save(); ctx.font = '700 ' + qpx + 'px Georgia, serif'; ctx.fillStyle = P.accent; ctx.globalAlpha = 0.35;
            ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('“', pad * 0.6, H * 0.05); ctx.restore();
            const top = H * 0.2, bottom = H * 0.86;
            const hb = fitBlock(ctx, S.heading, innerW, H * 0.1, Math.round(W * 0.04 * k), '700');
            const mb = fitBlock(ctx, S.message, innerW, (bottom - top) * 0.6, Math.round(W * 0.07 * k), '700');
            const fb = fitBlock(ctx, fromLine ? '— ' + fromLine : '', innerW, H * 0.08, Math.round(W * 0.038 * k), '400');
            const gap = H * 0.04;
            const total = (S.heading ? hb.lines.length * hb.px * 1.35 + gap : 0) + mb.lines.length * mb.px * 1.35 + gap + (fromLine ? fb.px * 1.35 : 0);
            let y = top + Math.max(0, (bottom - top - total) / 2);
            if (S.heading) y = drawLines(ctx, hb, W / 2, y, 'center', P.accent, '700') + gap;
            y = drawLines(ctx, mb, W / 2, y, 'center', P.fg, '700') + gap;
            if (fromLine) drawLines(ctx, fb, W / 2, y, 'center', P.accent, '400');
            watermark(ctx, W, H, P.bg[0] === '#fdf2f8');
        }
    }

    // ------------------------------------------------------------
    // 🧱 UI
    // ------------------------------------------------------------
    const CSS = `
#hkPosterModal{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;background:rgba(2,6,23,.6);backdrop-filter:blur(3px);}
#hkPosterModal.open{display:flex;}
#hkPosterModal .hkp-win{width:min(1100px,96vw);height:min(720px,94vh);background:var(--bg-card,#fff);color:var(--text-main,#111);border:1px solid var(--border-color,#ddd);border-radius:14px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35);}
#hkPosterModal .hkp-head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border-color,#ddd);font-weight:900;}
#hkPosterModal .hkp-close{background:transparent;border:0;font-size:20px;cursor:pointer;color:inherit;}
#hkPosterModal .hkp-body{flex:1;display:flex;min-height:0;}
#hkPosterModal .hkp-side{width:340px;flex:0 0 340px;overflow-y:auto;padding:12px 14px;border-right:1px solid var(--border-color,#ddd);display:flex;flex-direction:column;gap:9px;}
#hkPosterModal .hkp-prev{flex:1;display:flex;align-items:center;justify-content:center;padding:14px;background:var(--bg-panel,#f1f5f9);min-width:0;}
#hkPosterModal canvas{max-width:100%;max-height:100%;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.25);background:#fff;}
#hkPosterModal label{font-size:12px;font-weight:800;color:var(--text-main,#111);display:block;margin-bottom:3px;}
#hkPosterModal input[type=text],#hkPosterModal textarea,#hkPosterModal select{width:100%;box-sizing:border-box;padding:7px 9px;border-radius:8px;border:1px solid var(--border-color,#ccc);background:var(--bg-body,#fff);color:var(--text-main,#111);font-family:${FONT};font-size:14px;}
#hkPosterModal textarea{min-height:92px;resize:vertical;}
#hkPosterModal .hkp-row{display:flex;gap:6px;flex-wrap:wrap;}
#hkPosterModal .hkp-chip{padding:6px 9px;border-radius:999px;border:1px solid var(--border-color,#ccc);background:var(--key-bg,#fff);color:var(--text-main,#111);font-size:12px;font-weight:700;cursor:pointer;}
#hkPosterModal .hkp-chip.on{background:var(--primary,#2563eb);border-color:var(--primary,#2563eb);color:#fff;}
#hkPosterModal .hkp-sw{width:30px;height:30px;border-radius:50%;border:2px solid transparent;cursor:pointer;}
#hkPosterModal .hkp-sw.on{border-color:var(--text-main,#111);box-shadow:0 0 0 2px var(--bg-card,#fff) inset;}
#hkPosterModal .hkp-btn{flex:1;padding:9px 10px;border-radius:9px;border:0;font-weight:800;cursor:pointer;color:#fff;background:var(--primary,#2563eb);font-size:13px;}
#hkPosterModal .hkp-btn.alt{background:#16a34a;} #hkPosterModal .hkp-btn.ghost{background:transparent;color:var(--text-main,#111);border:1px solid var(--border-color,#ccc);}
#hkPosterModal .hkp-note{font-size:11px;color:var(--text-muted,#555);line-height:1.4;}
@media (max-width:760px){#hkPosterModal .hkp-body{flex-direction:column;}#hkPosterModal .hkp-side{width:auto;flex:0 0 auto;max-height:52%;border-right:0;border-bottom:1px solid var(--border-color,#ddd);}}
`;

    let modal, canvas, raf = 0;

    function el(tag, attrs, html) {
        const e = document.createElement(tag);
        if (attrs) Object.keys(attrs).forEach(a => e.setAttribute(a, attrs[a]));
        if (html != null) e.innerHTML = html;
        return e;
    }

    function schedule() {
        if (raf) return;
        raf = requestAnimationFrame(() => { raf = 0; try { draw(canvas); } catch (e) { console.warn('[poster]', e); } });
    }

    function applyDefaults(force) {
        const d = TEMPLATES[S.tpl].defaults;
        ['heading', 'message', 'from'].forEach(f => {
            if (force || !S.edited[f]) {
                S[f] = d[f];
                const inp = modal.querySelector('[data-f="' + f + '"]');
                if (inp) inp.value = d[f];
            }
        });
    }

    function renderChips() {
        const tplRow = modal.querySelector('#hkpTpl'), palRow = modal.querySelector('#hkpPal'), sizeRow = modal.querySelector('#hkpSize');
        tplRow.innerHTML = ''; palRow.innerHTML = ''; sizeRow.innerHTML = '';
        Object.keys(TEMPLATES).forEach(key => {
            const b = el('button', { type: 'button', class: 'hkp-chip' + (S.tpl === key ? ' on' : '') }, TEMPLATES[key].name);
            b.onclick = () => { S.tpl = key; S.pal = 0; applyDefaults(false); renderChips(); schedule(); };
            tplRow.appendChild(b);
        });
        TEMPLATES[S.tpl].palettes.forEach((p, i) => {
            const b = el('button', { type: 'button', class: 'hkp-sw' + (S.pal === i ? ' on' : ''), title: p.name, 'aria-label': p.name });
            b.style.background = 'linear-gradient(135deg,' + p.bg[0] + ',' + p.bg[1] + ' 60%,' + p.accent + ')';
            b.onclick = () => { S.pal = i; renderChips(); schedule(); };
            palRow.appendChild(b);
        });
        Object.keys(SIZES).forEach(key => {
            const b = el('button', { type: 'button', class: 'hkp-chip' + (S.size === key ? ' on' : '') }, SIZES[key].label);
            b.onclick = () => { S.size = key; renderChips(); schedule(); };
            sizeRow.appendChild(b);
        });
        const note = modal.querySelector('#hkpWm');
        if (note) note.textContent = isWatermarkFree()
            ? '✅ आपके plan में poster बिना watermark बनेगा।'
            : 'ℹ️ Free और P1 में नीचे छोटा "Made with Hoṛ Katha Suite" लिखा आता है। P2, P3 या ₹9 Trial में बिना watermark।';
    }

    function build() {
        if (modal) return;
        const st = el('style', { id: 'hkPosterCss' }); st.textContent = CSS; document.head.appendChild(st);
        modal = el('div', { id: 'hkPosterModal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Poster Maker' });
        modal.innerHTML = `
<div class="hkp-win" onclick="event.stopPropagation()">
  <div class="hkp-head"><span>🖼️ Poster Maker</span><button class="hkp-close" type="button" aria-label="Close">✕</button></div>
  <div class="hkp-body">
    <div class="hkp-side">
      <div><label>Template</label><div class="hkp-row" id="hkpTpl"></div></div>
      <div><label>रंग</label><div class="hkp-row" id="hkpPal"></div></div>
      <div><label>Size</label><div class="hkp-row" id="hkpSize"></div></div>
      <div><label>शीर्षक (Heading)</label><input type="text" data-f="heading"></div>
      <div><label>संदेश (Message)</label><textarea data-f="message"></textarea>
        <div class="hkp-row" style="margin-top:5px;"><button type="button" class="hkp-chip" id="hkpFromEditor">📝 Editor से Text लें</button></div></div>
      <div><label>नाम / संस्था</label><input type="text" data-f="from"></div>
      <div><label>तारीख (वैकल्पिक)</label><input type="text" data-f="date" placeholder="जैसे 15/11/2026"></div>
      <div><label>Text का आकार: <span id="hkpScaleV">100%</span></label><input type="range" min="70" max="130" step="5" value="100" id="hkpScale" style="width:100%;"></div>
      <div class="hkp-note">Ol Chiki या हिन्दी में लिखने के लिए पहले App के Editor में type करें, फिर "Editor से Text लें" दबाएँ।</div>
      <div class="hkp-note" id="hkpWm"></div>
      <div class="hkp-row"><button type="button" class="hkp-btn" id="hkpDl">⬇️ PNG</button><button type="button" class="hkp-btn alt" id="hkpShare">📲 Share</button><button type="button" class="hkp-btn ghost" id="hkpPrint">🖨️ Print</button></div>
    </div>
    <div class="hkp-prev"><canvas id="hkpCanvas" aria-label="Poster preview"></canvas></div>
  </div>
</div>`;
        document.body.appendChild(modal);
        canvas = modal.querySelector('#hkpCanvas');

        modal.addEventListener('click', close);
        modal.querySelector('.hkp-close').onclick = close;
        modal.querySelectorAll('[data-f]').forEach(inp => {
            inp.addEventListener('input', () => { const f = inp.getAttribute('data-f'); S[f] = inp.value; if (f in S.edited) S.edited[f] = true; schedule(); });
            // App के global key handlers इन fields में typing न रोकें
            inp.addEventListener('keydown', e => { if (e.key !== 'Escape') e.stopPropagation(); });
        });
        const sc = modal.querySelector('#hkpScale');
        sc.addEventListener('input', () => { S.scale = +sc.value; modal.querySelector('#hkpScaleV').textContent = sc.value + '%'; schedule(); });
        modal.querySelector('#hkpFromEditor').onclick = () => {
            const ed = document.getElementById('editor');
            const txt = ed ? (ed.innerText || ed.textContent || '').trim() : '';
            if (!txt) { toast('Editor खाली है — पहले वहाँ text type करें।', 'warning'); return; }
            S.message = txt; S.edited.message = true;
            modal.querySelector('[data-f="message"]').value = txt; schedule();
        };
        modal.querySelector('#hkpDl').onclick = download;
        modal.querySelector('#hkpShare').onclick = share;
        modal.querySelector('#hkpPrint').onclick = printIt;
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
    }

    function toast(msg, type) {
        if (typeof window.showToast === 'function') { try { window.showToast(msg, type || 'info'); return; } catch (e) {} }
        try { alert(msg); } catch (e) {}
    }

    function fileName() {
        const d = new Date();
        return 'HorKatha-Poster-' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0') + '.png';
    }

    function getBlob() {
        draw(canvas);
        return new Promise(res => canvas.toBlob(b => res(b), 'image/png'));
    }

    async function download() {
        const b = await getBlob(); if (!b) return;
        const a = el('a', { download: fileName() }); a.href = URL.createObjectURL(b);
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        toast('✅ Poster download हो गया', 'success');
    }

    async function share() {
        const b = await getBlob(); if (!b) return;
        try {
            const f = new File([b], fileName(), { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [f] })) {
                await navigator.share({ files: [f], title: 'Hoṛ Katha Poster' });
                return;
            }
        } catch (e) { if (e && e.name === 'AbortError') return; }
        await download();
        toast('इस browser में सीधा share नहीं होता — poster download हो गया, अब WhatsApp में attach करें।', 'info');
    }

    async function printIt() {
        const b = await getBlob(); if (!b) return;
        const url = URL.createObjectURL(b);
        const fr = el('iframe', { style: 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;' });
        document.body.appendChild(fr);
        const doc = fr.contentDocument;
        doc.open();
        doc.write('<html><head><title>Poster</title><style>@page{margin:8mm}html,body{margin:0;height:100%}img{width:100%;height:100%;object-fit:contain}</style></head><body><img src="' + url + '"></body></html>');
        doc.close();
        const img = doc.querySelector('img');
        const go = () => { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (e) {} setTimeout(() => { fr.remove(); URL.revokeObjectURL(url); }, 60000); };
        if (img.complete) go(); else img.onload = go;
    }

    function close() { if (modal) modal.classList.remove('open'); }

    async function open() {
        build();
        if (!S.heading && !S.message) applyDefaults(true);
        renderChips();
        modal.classList.add('open');
        try {
            if (document.fonts && document.fonts.load) {
                await Promise.race([
                    Promise.all([
                        document.fonts.load('700 40px "Noto Sans Ol Chiki"', 'ᱡᱚᱦᱟᱨ'),
                        document.fonts.load('400 40px "Noto Sans Ol Chiki"', 'ᱡᱚᱦᱟᱨ'),
                        document.fonts.load('700 40px "Noto Sans Devanagari"', 'अआ'),
                        document.fonts.load('400 40px "Noto Sans Devanagari"', 'अआ')
                    ]),
                    new Promise(r => setTimeout(r, 1500))
                ]);
            }
        } catch (e) {}
        schedule();
    }

    window.openPosterMaker = open;
    window.closePosterMaker = close;
    window.__hkPoster = { draw, S, TEMPLATES, SIZES, wrap };
})();
