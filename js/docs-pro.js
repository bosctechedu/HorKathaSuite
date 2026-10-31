// ============================================================
// 📄 DOCS PRO (Phase 4)
//  1. Document Converter — पूरा document / .txt / .docx: Ol Chiki ⇄ Devanagari ⇄ Roman
//  2. Santali Spell Check — Roman + Ol Chiki
//  3. Export — असली .docx (Nirmala UI font) + PDF (जैसा दिखता है वैसा)
//  4. Templates — आवेदन, notice, letter...
//  5. My Documents + Cloud Sync (Pro, encrypted)
// ============================================================
(function () {
    'use strict';
    const API = 'https://hor-katha-api.bosctechedu.workers.dev';
    const S = () => window.HKScript;
    const SCRIPTS = { olchiki: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)', devanagari: 'Devanagari (देवनागरी)', roman: 'Roman Santali' };

    // ─── छोटे helpers ───
    function el(tag, attrs, ...kids) {
        const e = document.createElement(tag);
        if (attrs) for (const k in attrs) {
            if (k === 'style') e.style.cssText = attrs[k];
            else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
            else if (k === 'text') e.textContent = attrs[k];
            else e.setAttribute(k, attrs[k]);
        }
        kids.flat().forEach(c => { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
        return e;
    }
    function toast(m, t) { if (typeof showToast === 'function') showToast(m, t || 'info', 2600); else console.log(m); }
    function pro(feature) { return typeof requireProAccess !== 'function' || requireProAccess(feature); }
    function editor() { return document.getElementById('editor'); }
    function editorText() { const e = editor(); return e ? (e.innerText || '') : ''; }
    function setEditorText(t) {
        const e = editor(); if (!e) return;
        e.innerText = t;
        if (typeof handleEditorInput === 'function') handleEditorInput(true);
    }
    function insertAtEditor(t) {
        const e = editor(); if (!e) return;
        const cur = editorText().trim();
        setEditorText(cur ? cur + '\n\n' + t : t);
        e.focus();
    }
    function download(blob, name) {
        const a = el('a', { href: URL.createObjectURL(blob), download: name });
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    }
    function stamp() { const d = new Date(); return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`; }
    function loadScript(src) {
        return new Promise((res, rej) => { const s = el('script', { src }); s.onload = res; s.onerror = () => rej(new Error('load failed: ' + src)); document.head.appendChild(s); });
    }

    // ─── Modal shell ───
    function css() {
        if (document.getElementById('hkDocsCss')) return;
        document.head.appendChild(el('style', { id: 'hkDocsCss' }, `
            .hkd-ov{position:fixed;inset:0;z-index:10045;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.55);padding:14px}
            .hkd-card{width:min(820px,100%);max-height:90vh;overflow:auto;background:#fff;color:#0f172a;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35);font:14px/1.5 Inter,system-ui,sans-serif}
            .hkd-head{display:flex;align-items:center;gap:10px;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #e2e8f0;position:sticky;top:0;background:#fff;z-index:2}
            .hkd-head h3{margin:0;font-size:16px;font-weight:900}
            .hkd-x,.hkd-back{border:0;background:#f1f5f9;border-radius:8px;min-width:32px;height:32px;cursor:pointer;font-weight:800}
            .hkd-body{padding:16px 18px 20px}
            .hkd-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
            .hkd-tile{border:0;text-align:left;border-radius:14px;padding:16px;color:#fff;cursor:pointer;min-height:96px}
            .hkd-tile b{display:block;font-size:16px;margin-bottom:4px}.hkd-tile span{font-size:12.5px;opacity:.92}
            .hkd-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
            .hkd-row select,.hkd-row input[type=text]{padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-weight:700;background:#fff;color:#0f172a}
            .hkd-btn{padding:9px 14px;border:0;border-radius:9px;background:#e2e8f0;color:#0f172a;font-weight:800;cursor:pointer}
            .hkd-btn.p{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff}.hkd-btn.g{background:#16a34a;color:#fff}.hkd-btn.r{background:#fee2e2;color:#991b1b}
            .hkd-ta{width:100%;min-height:150px;padding:10px;border:1px solid #cbd5e1;border-radius:10px;font:16px/1.6 'Noto Sans Ol Chiki','Noto Sans Devanagari',system-ui,sans-serif;box-sizing:border-box;background:#fff;color:#0f172a}
            .hkd-note{font-size:12px;color:#64748b;margin-top:8px}
            .hkd-list{display:flex;flex-direction:column;gap:8px}
            .hkd-item{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #e2e8f0;border-radius:10px}
            .hkd-item .w{font:700 16px/1.3 'Noto Sans Ol Chiki','Noto Sans Devanagari',system-ui}
            .hkd-sug{display:flex;flex-wrap:wrap;gap:6px}
            .hkd-chip{padding:4px 10px;border-radius:999px;border:1px solid #c4b5fd;background:#f5f3ff;color:#5b21b6;font-weight:800;cursor:pointer}
            body.hk-a11y-contrast .hkd-card{background:#000;color:#fff}
        `));
    }
    let ov = null;
    function open(title, render, withBack) {
        css();
        if (!ov) {
            ov = el('div', { class: 'hkd-ov', role: 'dialog', 'aria-modal': 'true', onclick: (e) => { if (e.target === ov) close(); } });
            document.body.appendChild(ov);
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov && ov.style.display !== 'none') { e.stopPropagation(); close(); } }, true);
        }
        ov.innerHTML = '';
        const body = el('div', { class: 'hkd-body' });
        const head = el('div', { class: 'hkd-head' },
            el('div', { style: 'display:flex;gap:8px;align-items:center' },
                withBack ? el('button', { class: 'hkd-back', text: '←', 'aria-label': 'वापस', onclick: () => window.hkOpenDocsPro() }) : null,
                el('h3', { text: title })),
            el('button', { class: 'hkd-x', text: '✕', 'aria-label': 'बंद करें', onclick: close }));
        ov.appendChild(el('div', { class: 'hkd-card' }, head, body));
        ov.style.display = 'flex';
        render(body);
    }
    function close() { if (ov) ov.style.display = 'none'; }

    // ═══ HUB ═══
    window.hkOpenDocsPro = function () {
        open('📄 Docs Pro', (b) => {
            const tiles = [
                ['🔤 Document Converter', 'पूरा document या .txt / .docx file: Ol Chiki ⇄ देवनागरी ⇄ Roman', '#7c3aed,#a855f7', openConverter],
                ['✅ Santali Spell Check', 'Roman और Ol Chiki के अनजान शब्द + सुझाव', '#0f766e,#14b8a6', openSpell],
                ['📤 Export (DOCX / PDF)', 'Font के साथ असली Word file और PDF', '#1d4ed8,#3b82f6', openExport],
                ['📝 Templates', 'आवेदन, notice, पत्र — एक click में', '#b45309,#f59e0b', openTemplates],
                ['☁️ My Documents', 'कई documents save करें + Cloud Sync (Pro)', '#be185d,#ec4899', openDocs]
            ];
            const g = el('div', { class: 'hkd-tiles' });
            tiles.forEach(([t, d, c, fn]) => g.appendChild(el('button', { class: 'hkd-tile', style: `background:linear-gradient(135deg,${c})`, onclick: fn }, el('b', { text: t }), el('span', { text: d }))));
            b.appendChild(g);
        });
    };

    // ═══ 1. CONVERTER ═══
    function openConverter() {
        open('🔤 Document Converter', (b) => {
            const from = el('select', { 'aria-label': 'किस script से' }, el('option', { value: 'auto', text: '🔍 Auto-detect' }), ...Object.entries(SCRIPTS).map(([k, v]) => el('option', { value: k, text: v })));
            const to = el('select', { 'aria-label': 'किस script में' }, ...Object.entries(SCRIPTS).map(([k, v]) => el('option', { value: k, text: v })));
            to.value = 'olchiki';
            const src = el('textarea', { class: 'hkd-ta', 'aria-label': 'मूल text' });
            src.value = editorText();
            const out = el('textarea', { class: 'hkd-ta', 'aria-label': 'बदला हुआ text', readonly: 'readonly' });
            const info = el('div', { class: 'hkd-note' });
            const run = () => {
                if (!S()) { info.textContent = '⚠️ Converter लोड नहीं हुआ'; return; }
                const f = from.value === 'auto' ? S().detect(src.value) : from.value;
                out.value = f === 'unknown' ? src.value : S().convert(src.value, f, to.value);
                info.textContent = `${SCRIPTS[f] || 'पहचान नहीं'} → ${SCRIPTS[to.value]} · ${src.value.length} अक्षर`;
            };
            [from, to].forEach(x => x.addEventListener('change', run));
            src.addEventListener('input', () => { clearTimeout(src._t); src._t = setTimeout(run, 250); });
            const file = el('input', { type: 'file', accept: '.txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document', style: 'display:none' });
            file.addEventListener('change', async () => {
                const f = file.files && file.files[0]; file.value = '';
                if (!f) return;
                if (f.size > 8 * 1024 * 1024) { toast('⚠️ File 8 MB से छोटी रखें', 'warning'); return; }
                try {
                    src.value = /\.docx$/i.test(f.name) ? await readDocx(f) : await f.text();
                    run(); toast(`📄 ${f.name} खुल गई`, 'success');
                } catch (e) { toast('❌ File नहीं पढ़ी जा सकी: ' + e.message, 'error'); }
            });
            b.append(
                el('div', { class: 'hkd-row' }, el('b', { text: 'से' }), from, el('b', { text: '→ में' }), to,
                    el('button', { class: 'hkd-btn', text: '📂 .txt / .docx खोलें', onclick: () => { if (pro('Document file convert')) file.click(); } }), file),
                src, el('div', { style: 'height:10px' }), out, info,
                el('div', { class: 'hkd-row', style: 'margin-top:10px' },
                    el('button', { class: 'hkd-btn p', text: '✍️ Editor में डालें', onclick: () => { if (!out.value) return; setEditorText(out.value); close(); toast('✅ Editor में बदला हुआ text आ गया', 'success'); } }),
                    el('button', { class: 'hkd-btn', text: '📋 Copy', onclick: () => navigator.clipboard.writeText(out.value).then(() => toast('✅ Copy हो गया', 'success')) }),
                    el('button', { class: 'hkd-btn', text: '⬇️ .docx', onclick: () => { if (out.value && pro('DOCX Export')) download(buildDocx(out.value), `HorKatha_${to.value}_${stamp()}.docx`); } }),
                    el('button', { class: 'hkd-btn', text: '⬇️ .txt', onclick: () => out.value && download(new Blob(['\ufeff' + out.value], { type: 'text/plain;charset=utf-8' }), `HorKatha_${to.value}_${stamp()}.txt`) })),
                el('div', { class: 'hkd-note', text: 'Devanagari में ᱚ (ɔ) को ओ़/ो़ (nukta के साथ) और ᱳ (o) को ओ/ो लिखा जाता है, ताकि वापस बदलने पर text वही रहे। Roman से बदलते समय पूरा Latin text Santali माना जाता है।' })
            );
            run();
        }, true);
    }

    // ═══ ZIP (DOCX) ═══
    const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
    function crc32(u8) { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
    function zipStore(files) {
        const enc = new TextEncoder(); const parts = []; const central = []; let off = 0;
        files.forEach(([name, data]) => {
            const nb = enc.encode(name), db = typeof data === 'string' ? enc.encode(data) : data, crc = crc32(db);
            const lh = new DataView(new ArrayBuffer(30));
            lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true);
            lh.setUint32(14, crc, true); lh.setUint32(18, db.length, true); lh.setUint32(22, db.length, true); lh.setUint16(26, nb.length, true);
            parts.push(new Uint8Array(lh.buffer), nb, db);
            const ch = new DataView(new ArrayBuffer(46));
            ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
            ch.setUint32(16, crc, true); ch.setUint32(20, db.length, true); ch.setUint32(24, db.length, true); ch.setUint16(28, nb.length, true); ch.setUint32(42, off, true);
            central.push(new Uint8Array(ch.buffer), nb);
            off += 30 + nb.length + db.length;
        });
        const csize = central.reduce((a, b) => a + b.length, 0);
        const end = new DataView(new ArrayBuffer(22));
        end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
        end.setUint32(12, csize, true); end.setUint32(16, off, true);
        return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }
    async function unzipEntry(buf, wanted) {
        const dv = new DataView(buf), u8 = new Uint8Array(buf);
        let e = buf.byteLength - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
        if (e < 0) throw new Error('यह docx/zip file नहीं है');
        let p = dv.getUint32(e + 16, true); const n = dv.getUint16(e + 10, true); const dec = new TextDecoder();
        for (let i = 0; i < n; i++) {
            const method = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
            const name = dec.decode(u8.subarray(p + 46, p + 46 + nl));
            if (name === wanted) {
                const start = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true);
                const data = u8.subarray(start, start + csz);
                if (method === 0) return dec.decode(data);
                if (method !== 8) throw new Error('यह compression समर्थित नहीं');
                if (typeof DecompressionStream === 'undefined') throw new Error('यह browser .docx नहीं खोल सकता, Chrome/Edge का नया version इस्तेमाल करें');
                const ds = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
                return await new Response(ds).text();
            }
            p += 46 + nl + xl + cl;
        }
        throw new Error(wanted + ' नहीं मिला');
    }
    async function readDocx(file) {
        const xml = await unzipEntry(await file.arrayBuffer(), 'word/document.xml');
        const doc = new DOMParser().parseFromString(xml, 'application/xml');
        const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
        const paras = [];
        const ps = doc.getElementsByTagNameNS(W, 'p');
        for (let i = 0; i < ps.length; i++) {
            let line = '';
            const walk = (node) => {
                for (const c of node.childNodes) {
                    if (c.namespaceURI === W && c.localName === 't') line += c.textContent;
                    else if (c.namespaceURI === W && c.localName === 'tab') line += '\t';
                    else if (c.namespaceURI === W && (c.localName === 'br' || c.localName === 'cr')) line += '\n';
                    else if (c.namespaceURI === W && c.localName === 'p') continue;
                    else if (c.childNodes && c.childNodes.length) walk(c);
                }
            };
            walk(ps[i]);
            paras.push(line);
        }
        return paras.join('\n');
    }
    function xmlEsc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    // Windows का "Nirmala UI" Ol Chiki + Devanagari दोनों दिखाता है
    function buildDocx(text, opts = {}) {
        const font = opts.font || 'Nirmala UI', size = Math.round((opts.pt || 14) * 2);
        const rPr = `<w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:cs="${font}" w:eastAsia="${font}"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr>`;
        const body = String(text).replace(/\r\n?/g, '\n').split('\n').map(line => {
            const runs = line.split('\t').map((seg, i) => (i ? `<w:r>${rPr}<w:tab/></w:r>` : '') + (seg ? `<w:r>${rPr}<w:t xml:space="preserve">${xmlEsc(seg)}</w:t></w:r>` : '')).join('');
            return `<w:p><w:pPr><w:spacing w:after="120" w:line="360" w:lineRule="auto"/></w:pPr>${runs}</w:p>`;
        }).join('');
        const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
        return zipStore([
            ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'],
            ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
            ['word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
            ['word/styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}><w:docDefaults><w:rPrDefault>${rPr}</w:rPrDefault></w:docDefaults></w:styles>`],
            ['word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W}><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`]
        ]);
    }
    window.hkBuildDocx = buildDocx;

    // ═══ 3. EXPORT ═══
    async function exportPdf(text) {
        if (!window.html2canvas) { try { await loadScript('js/html2canvas.min.js'); } catch (e) { await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'); } }
        if (!(window.jspdf && window.jspdf.jsPDF)) { try { await loadScript('js/jspdf.umd.min.js'); } catch (e) { await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'); } }
        const ed = editor();
        const font = (ed && getComputedStyle(ed).fontFamily) || "'Noto Sans Ol Chiki','Noto Sans Devanagari',sans-serif";
        const page = el('div', { style: `position:fixed;left:-10000px;top:0;width:794px;padding:56px;box-sizing:border-box;background:#fff;color:#000;font-family:${font};font-size:18px;line-height:1.7;white-space:pre-wrap;word-wrap:break-word` });
        page.textContent = text;
        document.body.appendChild(page);
        try {
            if (document.fonts && document.fonts.ready) await document.fonts.ready;
            const canvas = await window.html2canvas(page, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
            const pdf = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
            const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
            const sliceH = Math.floor(canvas.width * ph / pw);
            for (let y = 0, n = 0; y < canvas.height; y += sliceH, n++) {
                const c = document.createElement('canvas'); c.width = canvas.width; c.height = Math.min(sliceH, canvas.height - y);
                c.getContext('2d').drawImage(canvas, 0, y, canvas.width, c.height, 0, 0, canvas.width, c.height);
                if (n) pdf.addPage();
                pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pw, c.height * pw / canvas.width);
            }
            pdf.save(`HorKatha_${stamp()}.pdf`);
        } finally { page.remove(); }
    }
    function openExport() {
        open('📤 Export', (b) => {
            const text = editorText();
            const pt = el('select', { 'aria-label': 'Font size' }, ...[12, 14, 16, 18, 20].map(n => el('option', { value: n, text: n + ' pt' })));
            pt.value = '14';
            const font = el('select', { 'aria-label': 'Word font' },
                el('option', { value: 'Nirmala UI', text: 'Nirmala UI (Windows — Ol Chiki + हिन्दी)' }),
                el('option', { value: 'Noto Sans Ol Chiki', text: 'Noto Sans Ol Chiki' }),
                el('option', { value: 'Noto Sans Devanagari', text: 'Noto Sans Devanagari' }),
                el('option', { value: 'Mangal', text: 'Mangal (हिन्दी)' }));
            b.append(
                el('div', { class: 'hkd-note', style: 'margin:0 0 12px', text: text.trim() ? `Editor में ${text.length} अक्षर हैं।` : '⚠️ Editor खाली है।' }),
                el('div', { class: 'hkd-row' }, el('b', { text: 'Word font:' }), font, pt),
                el('div', { class: 'hkd-row' },
                    el('button', { class: 'hkd-btn p', text: '📝 Word (.docx)', onclick: () => { if (!text.trim() || !pro('DOCX Export')) return; download(buildDocx(text, { font: font.value, pt: +pt.value }), `HorKatha_${stamp()}.docx`); toast('✅ .docx download हुई', 'success'); } }),
                    el('button', { class: 'hkd-btn g', text: '📕 PDF', onclick: async (e) => {
                        if (!text.trim() || !pro('PDF Export')) return;
                        const btn = e.currentTarget; btn.disabled = true; btn.textContent = '⏳ PDF बन रही है...';
                        try { await exportPdf(text); toast('✅ PDF download हुई', 'success'); } catch (err) { toast('❌ PDF नहीं बनी: ' + err.message, 'error'); }
                        finally { btn.disabled = false; btn.textContent = '📕 PDF'; }
                    } })),
                el('div', { class: 'hkd-note', text: 'PDF बिल्कुल वैसी बनती है जैसी screen पर दिखती है (Ol Chiki और हिन्दी के जुड़े अक्षर सही रहते हैं)। .docx में चुना font लगता है; जिस computer पर font न हो वहाँ Windows का Nirmala UI सबसे सुरक्षित है।' })
            );
        }, true);
    }

    // ═══ 2. SPELL CHECK ═══
    const MY_DICT = 'hk_my_santali_words';
    function myWords() { try { return new Set(JSON.parse(localStorage.getItem(MY_DICT) || '[]')); } catch (e) { return new Set(); } }
    function addMyWord(w) { const s = myWords(); s.add(w); try { localStorage.setItem(MY_DICT, JSON.stringify([...s].slice(-5000))); } catch (e) {} }
    function norm(w) { return String(w).normalize('NFC').toLowerCase().replace(/[^\p{L}\p{M}ʼ]/gu, ''); }
    function lev(a, b, max) {
        if (Math.abs(a.length - b.length) > max) return max + 1;
        let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            const cur = [i]; let best = i;
            for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); best = Math.min(best, cur[j]); }
            if (best > max) return max + 1;
            prev = cur;
        }
        return prev[b.length];
    }
    async function santaliLexicon() {
        if (!window.__DICTIONARY__) { try { await loadScript('js/dictionary.js'); } catch (e) {} }
        const set = new Set();
        const list = (window.__DICTIONARY__ && window.__DICTIONARY__.santali) || [];
        list.forEach(p => String(p).split(/\s+/).forEach(w => { const n = norm(w); if (n.length > 1) set.add(n); }));
        myWords().forEach(w => set.add(w));
        return set;
    }
    function openSpell() {
        open('✅ Santali Spell Check', async (b) => {
            const text = editorText();
            if (!text.trim()) { b.textContent = 'Editor खाली है।'; return; }
            b.textContent = '⏳ शब्द जाँच रहे हैं...';
            const lex = await santaliLexicon();
            const script = S() ? S().detect(text) : 'roman';
            const isOl = script === 'olchiki';
            const re = isOl ? /[\u1C50-\u1C7F]+/g : /[A-Za-z\u00C0-\u024F\u0300-\u036F\u1E00-\u1EFFŋñɔʼ]+/g;
            const counts = new Map();
            (text.match(re) || []).forEach(w => counts.set(w, (counts.get(w) || 0) + 1));
            const toKey = (w) => norm(isOl ? S().olToRoman(w) : w);
            const lexArr = [...lex];
            const unknown = [...counts.keys()].filter(w => { const k = toKey(w); return k.length > 1 && !lex.has(k); });
            b.innerHTML = '';
            b.appendChild(el('div', { class: 'hkd-note', style: 'margin:0 0 12px', text: `${counts.size} अलग शब्द जाँचे (${isOl ? 'Ol Chiki' : 'Roman'}) · ${unknown.length} शब्द शब्दकोश में नहीं मिले। सही शब्द को "✔ सही है" दबाकर अपने शब्दकोश में जोड़ें।` }));
            if (script === 'devanagari') b.appendChild(el('div', { class: 'hkd-note', text: 'देवनागरी Santali के लिए शब्द Ol Chiki में बदलकर जाँचें (Document Converter)।' }));
            if (!unknown.length) { b.appendChild(el('div', { style: 'padding:20px;text-align:center;color:#16a34a;font-weight:800', text: '✅ कोई गलत शब्द नहीं मिला!' })); return; }
            const list = el('div', { class: 'hkd-list' });
            unknown.slice(0, 80).forEach(w => {
                const k = toKey(w);
                const sugs = lexArr.map(x => [x, lev(k, x, 2)]).filter(([, d]) => d <= 2).sort((a, b) => a[1] - b[1]).slice(0, 4).map(([x]) => x);
                const row = el('div', { class: 'hkd-item' });
                const sugBox = el('div', { class: 'hkd-sug' });
                sugs.forEach(sg => {
                    let rep = sg;
                    if (isOl) rep = S().romanToOl(sg);
                    else if (w[0] === w[0].toUpperCase()) rep = sg.charAt(0).toUpperCase() + sg.slice(1);
                    sugBox.appendChild(el('button', { class: 'hkd-chip', text: rep, title: 'Editor में बदलें', onclick: () => {
                        const re2 = new RegExp(`(^|[^\\p{L}\\p{M}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^\\p{L}\\p{M}])`, 'gu');
                        setEditorText(editorText().replace(re2, `$1${rep}`)); row.remove(); toast(`✅ "${w}" → "${rep}"`, 'success');
                    } }));
                });
                if (!sugs.length) sugBox.appendChild(el('span', { class: 'hkd-note', style: 'margin:0', text: 'कोई सुझाव नहीं' }));
                row.append(el('div', {}, el('div', { class: 'w', text: `${w}${counts.get(w) > 1 ? ` ×${counts.get(w)}` : ''}` }), sugBox),
                    el('button', { class: 'hkd-btn', text: '✔ सही है', onclick: () => { addMyWord(k); row.remove(); } }));
                list.appendChild(row);
            });
            b.appendChild(list);
            b.appendChild(el('div', { class: 'hkd-note', text: 'शब्दकोश अभी छोटा है, इसलिए कई सही शब्द भी "अनजान" दिख सकते हैं। आप जितने शब्द जोड़ेंगे, जाँच उतनी बेहतर होगी।' }));
        }, true);
    }

    // ═══ 4. TEMPLATES ═══
    const TPL = [
        ['📄 छुट्टी का आवेदन', 'hi', `सेवा में,\nश्रीमान प्रधानाध्यापक / प्रबंधक महोदय,\n[संस्था का नाम], [स्थान]\n\nविषय: [संख्या] दिन के अवकाश हेतु आवेदन।\n\nमहोदय,\nसविनय निवेदन है कि मैं [कारण] के कारण दिनांक [से] से [तक] तक कार्यालय / विद्यालय आने में असमर्थ हूँ। अतः आपसे अनुरोध है कि मुझे [संख्या] दिन का अवकाश प्रदान करने की कृपा करें।\n\nधन्यवाद।\n\nभवदीय / आपका आज्ञाकारी,\n[नाम]\n[पद / कक्षा]\nदिनांक: [दिनांक]`],
        ['📢 सूचना (Notice)', 'hi', `सूचना\n\nसभी [सदस्यों / छात्रों / ग्रामवासियों] को सूचित किया जाता है कि दिनांक [दिनांक] को [समय] बजे [स्थान] पर [कार्यक्रम / बैठक का विषय] का आयोजन किया जाएगा। सभी से अनुरोध है कि समय पर उपस्थित होकर कार्यक्रम को सफल बनाएँ।\n\nआदेश से,\n[नाम]\n[पद]\n[संस्था]\nदिनांक: [दिनांक]`],
        ['🏛️ कार्यालय आदेश', 'hi', `कार्यालय [कार्यालय का नाम]\n\nपत्रांक: [संख्या]                                दिनांक: [दिनांक]\n\nकार्यालय आदेश\n\n[आदेश का विवरण]। यह आदेश तत्काल प्रभाव से लागू होगा।\n\n(हस्ताक्षर)\n[अधिकारी का नाम]\n[पदनाम]\n\nप्रतिलिपि: [किसे भेजी जाए]`],
        ['💌 निमंत्रण पत्र', 'hi', `सादर निमंत्रण\n\nआदरणीय [नाम] जी,\n\nआपको यह जानकर हर्ष होगा कि [अवसर] के शुभ अवसर पर दिनांक [दिनांक] को [समय] बजे [स्थान] में एक कार्यक्रम का आयोजन किया गया है। इस अवसर पर आपकी गरिमामयी उपस्थिति प्रार्थनीय है।\n\nविनीत,\n[आयोजक का नाम]\nसंपर्क: [मोबाइल]`],
        ['📄 Leave Application', 'en', `To,\nThe Principal / Manager,\n[Institution Name], [Place]\n\nSubject: Application for leave of [number] days.\n\nRespected Sir/Madam,\nI respectfully state that I am unable to attend [school/office] from [date] to [date] due to [reason]. Kindly grant me leave for [number] days.\n\nThanking you.\n\nYours faithfully,\n[Name]\n[Designation / Class]\nDate: [date]`],
        ['💼 Job Application', 'en', `To,\nThe [Designation],\n[Organisation Name], [Address]\n\nSubject: Application for the post of [Post Name].\n\nRespected Sir/Madam,\nWith reference to your advertisement dated [date], I wish to apply for the post of [Post Name]. I have completed [qualification] and have [experience] of experience in [field]. I can type [speed] WPM in English and Hindi, and I am familiar with Santali (Ol Chiki) typing.\n\nI request you to kindly consider my application. My resume is enclosed for your reference.\n\nYours faithfully,\n[Name]\n[Mobile] · [Email]\nDate: [date]`],
        ['📢 Notice', 'en', `NOTICE\n\nThis is to inform all [members / students / residents] that a [meeting / programme] on [subject] will be held on [date] at [time] at [venue]. All are requested to be present on time.\n\nBy order,\n[Name]\n[Designation]\nDate: [date]`]
    ];
    function openTemplates() {
        open('📝 Templates', (b) => {
            const list = el('div', { class: 'hkd-list' });
            TPL.forEach(([t, lang, body]) => {
                list.appendChild(el('div', { class: 'hkd-item' },
                    el('div', {}, el('div', { style: 'font-weight:800', text: t }), el('div', { class: 'hkd-note', style: 'margin:2px 0 0', text: body.split('\n').slice(0, 2).join(' · ').slice(0, 90) + '…' })),
                    el('div', { style: 'display:flex;gap:6px' },
                        el('button', { class: 'hkd-btn', text: 'जोड़ें', onclick: () => { insertAtEditor(body); close(); toast('✅ Template जुड़ गया — [ ] वाली जगह भरें', 'success'); } }),
                        el('button', { class: 'hkd-btn p', text: 'नया', title: 'Editor का text हटाकर', onclick: () => { if (editorText().trim() && !confirm('Editor का मौजूदा text हट जाएगा। आगे बढ़ें?')) return; setEditorText(body); close(); } }))));
            });
            b.append(list, el('div', { class: 'hkd-note', text: 'Santali (Ol Chiki) templates के लिए आप अपना पसंदीदा format "My Documents" में save कर लें, वह हर बार यहीं से खुल जाएगा।' }));
        }, true);
    }

    // ═══ 5. MY DOCUMENTS + CLOUD SYNC ═══
    const DOCS = 'hk_docs_v1';
    function loadDocs() { try { const d = JSON.parse(localStorage.getItem(DOCS) || '[]'); return Array.isArray(d) ? d : []; } catch (e) { return []; } }
    function saveDocs(d) { try { localStorage.setItem(DOCS, JSON.stringify(d)); return true; } catch (e) { toast('⚠️ Storage भर गया, कुछ documents हटाएँ', 'error'); return false; } }
    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    async function syncKey() {
        const key = localStorage.getItem('hor_lic_key'), email = (localStorage.getItem('hor_lic_email') || '').toLowerCase();
        if (!key || !email) return null;
        const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(key + '|' + email), 'PBKDF2', false, ['deriveKey']);
        const aes = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: new TextEncoder().encode('hk-sync-v1'), iterations: 120000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
        return { key, email, aes };
    }
    const b64 = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
    const unb64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
    async function cloud(op, docs) {
        const k = await syncKey();
        if (!k) throw new Error('Cloud Sync के लिए Pro license चाहिए');
        let payload;
        if (op === 'put') {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, k.aes, new TextEncoder().encode(JSON.stringify(docs))));
            payload = b64(iv) + '.' + b64(ct);
            if (payload.length > 900000) throw new Error('Documents बहुत बड़े हैं (900 KB से ज़्यादा)');
        }
        const res = await fetch(API + '/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, key: k.key, email: k.email, blob: payload }) });
        const d = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(d.error || ('Server error ' + res.status));
        if (op === 'get') {
            if (!d.blob) return { docs: [], at: 0 };
            const [iv, ct] = String(d.blob).split('.');
            const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(iv) }, k.aes, unb64(ct));
            return { docs: JSON.parse(new TextDecoder().decode(pt)), at: d.at || 0 };
        }
        return d;
    }
    function mergeDocs(a, b) {
        const m = new Map();
        [...a, ...b].forEach(d => { if (!d || !d.id) return; const o = m.get(d.id); if (!o || (d.updatedAt || 0) > (o.updatedAt || 0)) m.set(d.id, d); });
        return [...m.values()].sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
    }
    function openDocs() {
        open('☁️ My Documents', (b) => {
            const render = () => {
                b.innerHTML = '';
                const docs = loadDocs().filter(d => !d.deleted);
                const name = el('input', { type: 'text', placeholder: 'Document का नाम', 'aria-label': 'Document का नाम', style: 'flex:1;min-width:160px' });
                b.append(el('div', { class: 'hkd-row' }, name,
                    el('button', { class: 'hkd-btn p', text: '💾 Editor का text save करें', onclick: () => {
                        const text = editorText();
                        if (!text.trim()) return toast('Editor खाली है', 'warning');
                        const all = loadDocs();
                        all.unshift({ id: uid(), title: (name.value.trim() || text.trim().split('\n')[0]).slice(0, 60), text, updatedAt: Date.now() });
                        if (saveDocs(all.slice(0, 200))) { toast('✅ Save हो गया', 'success'); render(); }
                    } })));
                const syncRow = el('div', { class: 'hkd-row' });
                const status = el('span', { class: 'hkd-note', style: 'margin:0' });
                syncRow.append(el('button', { class: 'hkd-btn g', text: '☁️ Cloud Sync', onclick: async (e) => {
                    if (!pro('Cloud Sync')) return;
                    const btn = e.currentTarget; btn.disabled = true; status.textContent = '⏳ Sync हो रहा है...';
                    try {
                        const remote = await cloud('get');
                        const merged = mergeDocs(loadDocs(), remote.docs || []);
                        saveDocs(merged);
                        await cloud('put', merged);
                        try { localStorage.setItem('hk_docs_synced_at', String(Date.now())); } catch (er) {}
                        status.textContent = `✅ Sync पूरा — ${merged.filter(d => !d.deleted).length} documents`;
                        setTimeout(render, 900);
                    } catch (err) { status.textContent = '❌ ' + err.message; }
                    finally { btn.disabled = false; }
                } }), status);
                b.appendChild(syncRow);
                const last = +(localStorage.getItem('hk_docs_synced_at') || 0);
                if (last) status.textContent = 'पिछला sync: ' + new Date(last).toLocaleString('en-IN');
                if (!docs.length) { b.appendChild(el('div', { class: 'hkd-note', style: 'padding:16px;text-align:center', text: 'अभी कोई document save नहीं है।' })); }
                const list = el('div', { class: 'hkd-list' });
                docs.forEach(d => list.appendChild(el('div', { class: 'hkd-item' },
                    el('div', { style: 'min-width:0' }, el('div', { class: 'w', style: 'font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap', text: d.title || 'Untitled' }),
                        el('div', { class: 'hkd-note', style: 'margin:2px 0 0', text: `${new Date(d.updatedAt).toLocaleString('en-IN')} · ${(d.text || '').length} अक्षर` })),
                    el('div', { style: 'display:flex;gap:6px;flex-shrink:0' },
                        el('button', { class: 'hkd-btn', text: 'खोलें', onclick: () => { if (editorText().trim() && !confirm('Editor का मौजूदा text हट जाएगा। आगे बढ़ें?')) return; setEditorText(d.text || ''); close(); } }),
                        el('button', { class: 'hkd-btn', text: 'Update', title: 'Editor के text से बदलें', onclick: () => { const all = loadDocs(); const x = all.find(y => y.id === d.id); if (!x) return; x.text = editorText(); x.updatedAt = Date.now(); saveDocs(all); toast('✅ Update हुआ', 'success'); render(); } }),
                        el('button', { class: 'hkd-btn r', text: '🗑', 'aria-label': 'हटाएँ', onclick: () => { if (!confirm(`"${d.title}" हटाएँ?`)) return; const all = loadDocs(); const x = all.find(y => y.id === d.id); if (x) { x.deleted = true; x.text = ''; x.updatedAt = Date.now(); } saveDocs(all); render(); } })))));
                b.appendChild(list);
                b.appendChild(el('div', { class: 'hkd-note', text: 'Documents इस device पर रहते हैं। Cloud Sync (Pro) उन्हें आपकी license key से encrypt करके सुरक्षित रखता है, ताकि दूसरे device पर उसी license से वापस मिल जाएँ।' }));
            };
            render();
        }, true);
    }

    window.hkDocs = { openConverter, openSpell, openExport, openTemplates, openDocs, exportPdf, readDocx };
})();
