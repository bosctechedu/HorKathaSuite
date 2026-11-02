// ============================================================
// 🖼️ POSTER MAKER — Hoṛ Katha Suite (v40, v43: 🌟 सुविचार Photo Poster, v44: 📐 Mobile/Tab/Desktop size + 💼 Pro templates, v45: 100+ विकल्प, फोटो drag, layer बटन)
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
        story:    { w: 1080, h: 1920, label: '📱 Mobile — Status / Story (9:16)', dev: 'mobile' },
        tab:      { w: 1536, h: 2048, label: '📲 Tab (3:4)', dev: 'tab' },
        desktop:  { w: 1920, h: 1080, label: '🖥️ Desktop / YouTube / Banner (16:9)', dev: 'desktop' },
        square:   { w: 1080, h: 1080, label: '⬛ Square — WhatsApp / FB Post (1:1)', dev: '' },
        portrait: { w: 1080, h: 1350, label: '📷 Instagram Post (4:5)', dev: '' },
        a4:       { w: 1240, h: 1754, label: '📄 A4 (Print)', dev: '' }
    };

    // ------------------------------------------------------------
    // 🎨 TEMPLATES
    // ------------------------------------------------------------
    const TEMPLATES = {
        suvichar: {
            name: '🌟 सुविचार Photo',
            palettes: [{ bg: ['#bfe3ff', '#ffffff'], fg: '#1e3a8a', accent: '#c81e1e', name: 'Auto' }],
            defaults: { heading: '', message: '', from: '' }
        },
        festival: {
            name: '🪔 त्योहार शुभकामना Pro',
            palettes: [
                { bg: ['#7c2d12', '#ea580c'], fg: '#fff7ed', accent: '#fde047', card: '#fff7ed', name: 'सोहराय' },
                { bg: ['#14532d', '#16a34a'], fg: '#f0fdf4', accent: '#facc15', card: '#f0fdf4', name: 'बाहा (साल)' },
                { bg: ['#3b0764', '#a21caf'], fg: '#fdf4ff', accent: '#fbbf24', card: '#fdf4ff', name: 'Royal' },
                { bg: ['#0c4a6e', '#0891b2'], fg: '#ecfeff', accent: '#fde68a', card: '#ecfeff', name: 'Sky' },
                { bg: ['#450a0a', '#b91c1c'], fg: '#fef2f2', accent: '#f5c451', card: '#fffbeb', name: 'लाल-सुनहरा' },
                { bg: ['#0f172a', '#1e3a8a'], fg: '#f8fafc', accent: '#f5c451', card: '#f8fafc', name: 'Navy Gold' }
            ],
            defaults: { sub: 'ᱡᱚᱦᱟᱨ', heading: 'सोहराय परब की हार्दिक शुभकामनाएँ', message: 'आपके परिवार में सुख, शांति और खुशहाली बनी रहे।', from: 'BOSC Tech & Edu', footer: '' }
        },
        notice: {
            name: '📢 सूचना / Notice',
            palettes: [
                { bg: ['#1e3a8a', '#2563eb'], fg: '#0f172a', accent: '#1d4ed8', card: '#ffffff', head: '#1e3a8a', name: 'नीला' },
                { bg: ['#7f1d1d', '#dc2626'], fg: '#0f172a', accent: '#b91c1c', card: '#ffffff', head: '#7f1d1d', name: 'लाल' },
                { bg: ['#14532d', '#16a34a'], fg: '#0f172a', accent: '#15803d', card: '#ffffff', head: '#14532d', name: 'हरा' },
                { bg: ['#1f2937', '#475569'], fg: '#111827', accent: '#d97706', card: '#fffdf7', head: '#1f2937', name: 'Graphite' },
                { bg: ['#4c1d95', '#7c3aed'], fg: '#1e1b4b', accent: '#7c3aed', card: '#ffffff', head: '#4c1d95', name: 'बैंगनी' },
                { bg: ['#78350f', '#b45309'], fg: '#1c1917', accent: '#b45309', card: '#fffbeb', head: '#78350f', name: 'Kraft' }
            ],
            defaults: { sub: 'ग्राम पंचायत ……………', heading: 'सूचना', message: 'सभी सदस्यों को सूचित किया जाता है कि ग्राम सभा की बैठक रविवार सुबह 10 बजे पंचायत भवन में होगी। सभी की उपस्थिति अनिवार्य है।', from: 'ग्राम प्रधान', footer: '' }
        },
        invite: {
            name: '💐 निमंत्रण',
            palettes: [
                { bg: ['#4a0d1a', '#7f1d1d'], fg: '#fff7ed', accent: '#f5c451', card: '#fffbeb', name: 'मैरून-सुनहरा' },
                { bg: ['#78350f', '#b45309'], fg: '#fffbeb', accent: '#d4a017', card: '#fffbeb', name: 'क्रीम' },
                { bg: ['#052e16', '#14532d'], fg: '#f0fdf4', accent: '#f5c451', card: '#fefce8', name: 'हरा-सुनहरा' },
                { bg: ['#1e1b4b', '#3730a3'], fg: '#eef2ff', accent: '#e9c46a', card: '#fdfaf3', name: 'Indigo' },
                { bg: ['#831843', '#be185d'], fg: '#fdf2f8', accent: '#fcd34d', card: '#fff1f2', name: 'Rani Pink' },
                { bg: ['#134e4a', '#0f766e'], fg: '#f0fdfa', accent: '#fbbf24', card: '#f0fdfa', name: 'Teal' }
            ],
            defaults: { sub: 'हार्दिक निमंत्रण', heading: 'शुभ विवाह', message: 'आप सपरिवार सादर आमंत्रित हैं।\nस्थान: ……………\nदिनांक: ……………', from: 'निवेदक: ……………', footer: '' }
        },
        quote: {
            name: '💬 विचार / Quote',
            palettes: [
                { bg: ['#0f172a', '#1e293b'], fg: '#f8fafc', accent: '#38bdf8', card: '#f8fafc', head: '#f8fafc', name: 'Night' },
                { bg: ['#1c1917', '#44403c'], fg: '#fafaf9', accent: '#f59e0b', card: '#fafaf9', head: '#fafaf9', name: 'Earth' },
                { bg: ['#9d174d', '#db2777'], fg: '#fdf2f8', accent: '#fbcfe8', card: '#fdf2f8', head: '#ffffff', name: 'Rose' },
                { bg: ['#064e3b', '#047857'], fg: '#ecfdf5', accent: '#fcd34d', card: '#ecfdf5', head: '#ffffff', name: 'Forest' },
                { bg: ['#312e81', '#6d28d9'], fg: '#f5f3ff', accent: '#facc15', card: '#f5f3ff', head: '#ffffff', name: 'Violet' },
                { bg: ['#7c2d12', '#c2410c'], fg: '#fff7ed', accent: '#fde68a', card: '#fff7ed', head: '#ffffff', name: 'Sunset' }
            ],
            defaults: { sub: '', heading: 'आज का विचार', message: 'अपनी भाषा में लिखना, अपनी पहचान को ज़िंदा रखना है।', from: 'Hoṛ Katha', footer: '' }
        }
    };

    const S = {
        tpl: 'suvichar', pal: 0, lang: 'app', exporting: false, size: 'square', scale: 100,
        heading: '', message: '', from: '', date: '',
        edited: { heading: false, message: false, from: false, sub: false, footer: false }
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

    // ============================================================
    // 🌟 SUVICHAR PHOTO POSTER (v43)
    //   • हर दिन नया style: photo frame, badge, name box, quote font+effect,
    //     background, रंग — साल भर (365 दिन) कोई style दोबारा नहीं
    //   • 🎲 नया Style: पहले इस्तेमाल हुए style छोड़कर random
    //   • फोटो + background upload, हर चीज़ का color picker
    // ============================================================
    const SV_FONTS = [
        { f: 'Noto Sans Devanagari', w: '700', n: 'Noto Bold' },
        { f: 'Rozha One', w: '400', n: 'Rozha (मोटा)' },
        { f: 'Yatra One', w: '400', n: 'Yatra (सुंदर)' },
        { f: 'Kalam', w: '700', n: 'Kalam (हस्तलिखित)' },
        { f: 'Khand', w: '700', n: 'Khand (पतला-लंबा)' },
        { f: 'Teko', w: '600', n: 'Teko (Condensed)' },
        { f: 'Baloo 2', w: '800', n: 'Baloo (गोल)' },
        { f: 'Amita', w: '700', n: 'Amita (कलात्मक)' },
        { f: 'Martel', w: '800', n: 'Martel (Serif)' },
        { f: 'Tiro Devanagari Hindi', w: '400', n: 'Tiro (क्लासिक)' },
        { f: 'Eczar', w: '700', n: 'Eczar (Display)' },
        { f: 'Rajdhani', w: '700', n: 'Rajdhani' },
        { f: 'Laila', w: '700', n: 'Laila' },
        { f: 'Palanquin Dark', w: '700', n: 'Palanquin Dark' },
        { f: 'Mukta', w: '800', n: 'Mukta Heavy' },
        { f: 'Sarpanch', w: '700', n: 'Sarpanch (चौड़ा)' }
    ];
    const SV_NAME_FONTS = [6, 5, 11, 4, 14, 8, 0, 15];
    // v45: 100+ fonts (Google Fonts, Devanagari) — केवल चुनने पर download होते हैं
    [['Hind', '700', 'Hind Bold'], ['Hind', '400', 'Hind'], ['Poppins', '700', 'Poppins Bold'], ['Poppins', '400', 'Poppins'], ['Karma', '700', 'Karma'], ['Sahitya', '700', 'Sahitya'], ['Sura', '700', 'Sura'], ['Halant', '700', 'Halant'], ['Arya', '700', 'Arya'], ['Biryani', '800', 'Biryani Heavy'], ['Biryani', '400', 'Biryani'], ['Glegoo', '700', 'Glegoo'], ['Inknut Antiqua', '700', 'Inknut Antiqua'], ['Jaldi', '700', 'Jaldi'], ['Kadwa', '700', 'Kadwa'], ['Kurale', '400', 'Kurale'], ['Modak', '400', 'Modak (बहुत मोटा)'], ['Pragati Narrow', '700', 'Pragati Narrow'], ['Rhodium Libre', '400', 'Rhodium Libre'], ['Sarala', '700', 'Sarala'], ['Sumana', '700', 'Sumana'], ['Vesper Libre', '700', 'Vesper Libre'], ['Yantramanav', '700', 'Yantramanav'], ['Yantramanav', '900', 'Yantramanav Black'], ['Gotu', '400', 'Gotu'], ['Cambay', '700', 'Cambay'], ['Asar', '400', 'Asar'], ['Amiko', '700', 'Amiko'], ['Khula', '800', 'Khula'], ['Martel Sans', '800', 'Martel Sans'], ['Palanquin', '700', 'Palanquin'], ['Tillana', '700', 'Tillana'], ['Noto Serif Devanagari', '700', 'Noto Serif Bold'], ['Noto Serif Devanagari', '400', 'Noto Serif'], ['Dekko', '400', 'Dekko (हस्तलिखित)'], ['Anek Devanagari', '700', 'Anek'], ['Tiro Devanagari Sanskrit', '400', 'Tiro Sanskrit'], ['Tiro Devanagari Marathi', '400', 'Tiro Marathi'], ['Akshar', '700', 'Akshar'], ['Gajraj One', '400', 'Gajraj (भारी)'], ['Jaini', '400', 'Jaini'], ['Jaini Purva', '400', 'Jaini Purva'], ['Mukta', '400', 'Mukta'], ['Baloo 2', '500', 'Baloo हल्का'], ['Kalam', '400', 'Kalam हल्का'], ['Teko', '400', 'Teko हल्का'], ['Rajdhani', '500', 'Rajdhani हल्का'], ['Khand', '500', 'Khand हल्का'], ['Laila', '500', 'Laila हल्का'], ['Eczar', '500', 'Eczar हल्का'], ['Martel', '400', 'Martel हल्का'], ['Amita', '400', 'Amita हल्का'], ['Palanquin Dark', '400', 'Palanquin Dark हल्का']].forEach(a => SV_FONTS.push({ f: a[0], w: a[1], n: a[2] }));
    const SV_FONT_CSS2 = 'https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Poppins:wght@400;700&family=Karma:wght@700&family=Sahitya:wght@700&family=Sura:wght@700&family=Halant:wght@700&family=Arya:wght@700&family=Biryani:wght@400;800&family=Glegoo:wght@700&family=Inknut+Antiqua:wght@700&family=Jaldi:wght@700&family=Kadwa:wght@700&family=Kurale:wght@400&family=Modak:wght@400&family=Pragati+Narrow:wght@700&family=Rhodium+Libre:wght@400&family=Sarala:wght@700&family=Sumana:wght@700&family=Vesper+Libre:wght@700&family=Yantramanav:wght@700;900&family=Gotu:wght@400&family=Cambay:wght@700&family=Asar:wght@400&family=Amiko:wght@700&family=Khula:wght@800&family=Martel+Sans:wght@800&family=Palanquin:wght@700&family=Tillana:wght@700&family=Noto+Serif+Devanagari:wght@400;700&family=Dekko:wght@400&family=Anek+Devanagari:wght@700&family=Tiro+Devanagari+Sanskrit:wght@400&family=Tiro+Devanagari+Marathi:wght@400&family=Akshar:wght@700&family=Gajraj+One:wght@400&family=Jaini:wght@400&family=Jaini+Purva:wght@400&family=Mukta:wght@400&family=Baloo+2:wght@500&family=Kalam:wght@400&family=Teko:wght@400&family=Rajdhani:wght@500&family=Khand:wght@500&family=Laila:wght@500&family=Eczar:wght@500&family=Martel:wght@400&family=Amita:wght@400&family=Palanquin+Dark:wght@400&display=swap';
    const SV_NAME_FONTS_X = SV_NAME_FONTS.concat(SV_FONTS.map((f, i) => i).filter(i => SV_NAME_FONTS.indexOf(i) < 0));
    const SV_FONT_CSS = 'https://fonts.googleapis.com/css2?family=Rozha+One&family=Yatra+One&family=Kalam:wght@700&family=Khand:wght@700&family=Teko:wght@600&family=Baloo+2:wght@800&family=Amita:wght@700&family=Martel:wght@800&family=Tiro+Devanagari+Hindi&family=Eczar:wght@700&family=Rajdhani:wght@700&family=Laila:wght@700&family=Palanquin+Dark:wght@700&family=Mukta:wght@800&family=Sarpanch:wght@700&display=swap';

    const SV_SHAPES = ['⚪ गोल', '⬛ चौकोर', '▢ गोल-कोने', '⬡ षट्कोण', '🛑 अष्टकोण', '◆ हीरा', '❤️ दिल', '🚪 मेहराब', '🛡️ ढाल', '🍃 पत्ती', '☁️ बादल-आकार', '⭐ सितारा'];
    const SV_RINGS = ['एक रेखा', 'दो रेखा', 'बिंदीदार'];
    const SV_BADGES = ['🎀 लटकन + दिल', '💊 Pill', '🏳️ Banner', '🔴 मोहर (गोल)', '➖ रेखा के बीच', '🏷️ Tag', '✴️ Starburst', '▭ परछाईं वाला', '📜 Scroll', '⬢ षट्कोण चिप'];
    const SV_NAMEBOX = ['▬ पूरी पट्टी', '💊 Pill', '▱ तिरछा', '🏷️ Tag', '◧ दो-रंग', '__ नीचे रेखा', '🪟 काँच', '🎀 Ribbon', '▢ Card', '➤ तीर'];
    const SV_FX = ['दो-रंग शब्द', 'मोटी सफ़ेद रेखा', 'परछाईं', 'Gradient', 'पंक्ति पर पट्टी', 'पहला शब्द रंगीन', '3D', 'काली पट्टी पर', 'चमक (Glow)', 'आख़िरी पंक्ति बड़ी', 'नीचे रेखा', 'सफ़ेद Card'];
    const SV_SCENES = ['☁️ आसमान + घास', '🌅 सूर्योदय', '✨ Bokeh', '⛰️ पहाड़', '🌸 मंडल', '🎨 सोहराय', '🔺 Geometric', '🌊 लहरें', '🍃 पत्तियाँ', '🫧 रंगीन बादल'];
    const SV_PALS = [
        { n: 'नीला आसमान', sky: ['#bfe3ff', '#ffffff'], gr: '#3f9b2f', acc: '#e11d48', ink1: '#1e3a8a', ink2: '#b91c1c', badge: '#c81e1e', badgeT: '#fde047', box: '#5b4e9b', boxT: '#e0e7ff', border: '#ffffff', foot: '#f8fafc', footT: '#334155' },
        { n: 'केसरिया', sky: ['#fff1d6', '#ffd08a'], gr: '#d97706', acc: '#dc2626', ink1: '#7c2d12', ink2: '#c2410c', badge: '#9a3412', badgeT: '#fff7ed', box: '#ea580c', boxT: '#ffffff', border: '#fff7ed', foot: '#7c2d12', footT: '#ffedd5' },
        { n: 'हरा-भरा', sky: ['#e7f9e7', '#c4f0c5'], gr: '#15803d', acc: '#f59e0b', ink1: '#14532d', ink2: '#b45309', badge: '#166534', badgeT: '#fef08a', box: '#15803d', boxT: '#f0fdf4', border: '#fef08a', foot: '#14532d', footT: '#dcfce7' },
        { n: 'गुलाबी', sky: ['#ffe4f1', '#fff5fa'], gr: '#db2777', acc: '#9333ea', ink1: '#831843', ink2: '#7e22ce', badge: '#be185d', badgeT: '#ffffff', box: '#9d174d', boxT: '#fce7f3', border: '#ffffff', foot: '#fdf2f8', footT: '#831843' },
        { n: 'शाही बैंगनी', sky: ['#2e1065', '#6d28d9'], gr: '#4c1d95', acc: '#fbbf24', ink1: '#ffffff', ink2: '#fde047', badge: '#f59e0b', badgeT: '#3b0764', box: '#fbbf24', boxT: '#3b0764', border: '#fde047', foot: '#1e0b3d', footT: '#ede9fe' },
        { n: 'रात का नीला', sky: ['#0b1736', '#1e3a8a'], gr: '#0f2a5c', acc: '#38bdf8', ink1: '#ffffff', ink2: '#7dd3fc', badge: '#0ea5e9', badgeT: '#ffffff', box: '#0284c7', boxT: '#ffffff', border: '#7dd3fc', foot: '#081026', footT: '#bae6fd' },
        { n: 'सुनहरा', sky: ['#fffbea', '#fde68a'], gr: '#b45309', acc: '#b91c1c', ink1: '#78350f', ink2: '#b91c1c', badge: '#b91c1c', badgeT: '#fef3c7', box: '#92400e', boxT: '#fef3c7', border: '#ffffff', foot: '#78350f', footT: '#fef3c7' },
        { n: 'फ़िरोज़ी', sky: ['#d5fbf6', '#ecfeff'], gr: '#0f766e', acc: '#e11d48', ink1: '#134e4a', ink2: '#be123c', badge: '#0f766e', badgeT: '#ffffff', box: '#115e59', boxT: '#ccfbf1', border: '#ffffff', foot: '#f0fdfa', footT: '#134e4a' },
        { n: 'मिट्टी', sky: ['#f5e6d3', '#e7cfae'], gr: '#7c4a21', acc: '#166534', ink1: '#3f2a14', ink2: '#9a3412', badge: '#7c2d12', badgeT: '#fde68a', box: '#57351a', boxT: '#fde68a', border: '#fef3c7', foot: '#3f2a14', footT: '#f5e6d3' },
        { n: 'लाल-सफ़ेद', sky: ['#ffffff', '#ffe4e6'], gr: '#be123c', acc: '#1d4ed8', ink1: '#9f1239', ink2: '#1d4ed8', badge: '#1d4ed8', badgeT: '#ffffff', box: '#be123c', boxT: '#ffffff', border: '#ffffff', foot: '#9f1239', footT: '#ffe4e6' },
        { n: 'हरा-सुनहरा (गहरा)', sky: ['#052e16', '#166534'], gr: '#064e3b', acc: '#facc15', ink1: '#fefce8', ink2: '#facc15', badge: '#facc15', badgeT: '#052e16', box: '#ca8a04', boxT: '#052e16', border: '#facc15', foot: '#022c22', footT: '#fef9c3' },
        { n: 'शाम', sky: ['#fb923c', '#7c3aed'], gr: '#4c1d95', acc: '#fde047', ink1: '#ffffff', ink2: '#fde047', badge: '#ffffff', badgeT: '#7c2d12', box: '#1e1b4b', boxT: '#fde047', border: '#ffffff', foot: '#1e1b4b', footT: '#fde68a' }
    ];
    // पहला अंक सबसे तेज़ बदलता है → हर दिन photo frame अलग
    const SV_DIMS = [['shape', 12], ['badge', 10], ['name', 10], ['fx', 12], ['scene', 10], ['font', 16], ['pal', 12], ['ring', 3], ['side', 2], ['nfont', 8]];
    const SV_N = SV_DIMS.reduce((a, d) => a * d[1], 1);
    const SV_COLOR_KEYS = [
        ['badge', 'Badge'], ['badgeT', 'Badge text'], ['ink1', 'Quote रंग 1'], ['ink2', 'Quote रंग 2'], ['outline', 'Quote रेखा'],
        ['box', 'Name box'], ['boxT', 'Name text'], ['border', 'Photo border'], ['sky0', 'Background 1'], ['sky1', 'Background 2'],
        ['gr', 'Background 3'], ['foot', 'नीचे पट्टी'], ['footT', 'नीचे text'], ['overlay', 'परत (Overlay)']
    ];

    // ---- v45: हर drop-down में 100+ विकल्प (मूल style + बदलाव). मूल क्रम वही, इसलिए रोज़ का style नहीं बदला ----
    const SV_RING_W = [['', 1], ['पतली', 0.6], ['मोटी', 1.6], ['बहुत मोटी', 2.3]];
    const SV_RING_C = ['', 'accent रंग', 'badge रंग'];
    const SV_RING_E = ['', 'चमक', 'बाहरी रेखा'];
    const SV_VAR = {
        shape: ['', '↻ झुका', '↺ झुका', 'मोटा border', 'पतला border', 'चमक', 'बिना परछाईं', 'बड़ा', 'छोटा'],
        ring: Array.from({ length: 36 }, (x, v) => [SV_RING_W[v % 4][0], SV_RING_C[Math.floor(v / 4) % 3], SV_RING_E[Math.floor(v / 12)]].filter(Boolean).join(' · ')),
        badge: ['', 'छोटा', 'बड़ा', '↻ झुका', '↺ झुका', 'उलटा रंग', 'हल्का रंग', 'गहरा रंग', 'बाएँ', 'दाएँ', 'बड़ा + झुका'],
        name: ['', 'ऊँचा', 'पतला', 'उलटा रंग', 'हल्का रंग', 'गहरा रंग', 'पारदर्शी', 'ऊपर रेखा', 'नीचे रेखा', 'किनारी', 'ऊँचा + किनारी'],
        font: ['', 'बड़ा', 'छोटा'],
        nfont: ['', 'बड़ा', 'छोटा'],
        fx: ['', 'रंग उलटे', 'बाएँ', 'दाएँ', '+ परछाईं', '+ चमक', '+ मोटी रेखा', 'रंग उलटे + परछाईं', 'बाएँ + परछाईं'],
        scene: Array.from({ length: 37 }, (x, v) => v ? 'डिज़ाइन ' + (v + 1) : ''),
        pal: Array.from({ length: 9 }, (x, v) => v ? 'रंग ' + (v + 1) : '')
    };
    function svBaseLabels() {
        return { shape: SV_SHAPES, ring: SV_RINGS, badge: SV_BADGES, name: SV_NAMEBOX, font: SV_FONTS.map(f => f.n), fx: SV_FX,
            nfont: SV_NAME_FONTS_X.map(i => SV_FONTS[i].n), scene: SV_SCENES, pal: SV_PALS.map(p => p.n) };
    }
    function svBaseN(k) { return svBaseLabels()[k].length; }
    function svLists() {
        const B = svBaseLabels(), out = {};
        Object.keys(B).forEach(k => { const L = []; SV_VAR[k].forEach(v => B[k].forEach(b => L.push(v ? b + ' · ' + v : b))); out[k] = L; });
        const side = ['➡️ दाएँ (अपने-आप)', '⬅️ बाएँ (अपने-आप)'];
        for (let r = 0; r < 11; r++) for (let c = 0; c < 10; c++) { const p = svSidePos(2 + r * 10 + c); side.push('📍 बाएँ से ' + Math.round(p.x * 100) + '% · ऊपर से ' + Math.round(p.y * 100) + '%'); }
        out.side = side;
        return out;
    }
    function svSidePos(v) { const p = v - 2, c = p % 10, r = Math.floor(p / 10); return { x: +(0.1 + c * 0.8 / 9).toFixed(3), y: +(0.1 + r * 0.08).toFixed(3) }; }
    // hex रंग helpers (hex ही लौटाते हैं)
    function hx2rgb(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) || 0); }
    function rgb2hx(r) { return '#' + r.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
    function mixHex(hex, t) { const c = hx2rgb(hex); return rgb2hx(c.map(v => t >= 0 ? v + (255 - v) * t : v * (1 + t))); }
    function hueHex(hex, deg) {
        let [r, g, b] = hx2rgb(hex).map(v => v / 255);
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
        let h = 0, s = 0;
        if (d) { s = d / (1 - Math.abs(2 * l - 1)); h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
        h = (h + deg + 360) % 360;
        const C2 = (1 - Math.abs(2 * l - 1)) * s, X = C2 * (1 - Math.abs((h / 60) % 2 - 1)), m = l - C2 / 2;
        const seg = [[C2, X, 0], [X, C2, 0], [0, C2, X], [0, X, C2], [X, 0, C2], [C2, 0, X]][Math.floor(h / 60) % 6];
        return rgb2hx(seg.map(v => (v + m) * 255));
    }
    function svPal(i, v) {
        const p = SV_PALS[i]; if (!v) return p;
        const d = v * 40, o = { n: p.n };
        Object.keys(p).forEach(k => { if (k === 'n') return; o[k] = Array.isArray(p[k]) ? p[k].map(c => hueHex(c, d)) : hueHex(p[k], d); });
        return o;
    }

    const SV_QUOTES = [
        'उस ज्ञान का कोई लाभ नहीं जो समाज के हित में ना हो',
        'मेहनत इतनी खामोशी से करो कि सफलता शोर मचा दे',
        'जो बीत गया उस पर दुखी मत हो, जो आने वाला है उसकी तैयारी करो',
        'सपने वो नहीं जो हम सोते हुए देखते हैं, सपने वो हैं जो हमें सोने नहीं देते',
        'अपनी भाषा में लिखना, अपनी पहचान को ज़िंदा रखना है',
        'शिक्षा सबसे शक्तिशाली हथियार है जिससे दुनिया बदली जा सकती है',
        'कठिनाइयाँ ही इंसान को मज़बूत बनाती हैं',
        'समय और धैर्य, दो सबसे बड़े योद्धा हैं',
        'खुद पर विश्वास रखो, रास्ते अपने आप बन जाएँगे',
        'छोटे-छोटे कदम भी बड़ी मंज़िल तक पहुँचा देते हैं',
        'जो दूसरों का सम्मान करता है, वही सम्मान पाता है',
        'मीठी वाणी सबसे बड़ा धन है',
        'जहाँ एकता है, वहीं शक्ति है',
        'असफलता यह बताती है कि प्रयास पूरे मन से नहीं हुआ',
        'पढ़ेगा समाज, तभी तो बढ़ेगा समाज',
        'अच्छे विचार ही अच्छे कर्मों की नींव हैं',
        'माता-पिता की सेवा ही सबसे बड़ी पूजा है',
        'प्रकृति की रक्षा करो, प्रकृति तुम्हारी रक्षा करेगी',
        'किताबें सबसे सच्ची मित्र होती हैं',
        'गुस्से में लिया गया फ़ैसला अक्सर पछतावा देता है',
        'सच्चा सुख दूसरों की मदद करने में है',
        'जो सीखना बंद कर देता है, वह आगे बढ़ना बंद कर देता है',
        'हर दिन एक नया अवसर है, इसे व्यर्थ मत जाने दो',
        'अनुशासन ही सफलता की पहली सीढ़ी है',
        'अपनी संस्कृति पर गर्व करो, यही तुम्हारी जड़ है',
        'ईमानदारी सबसे अच्छी नीति है',
        'बड़ा वही है जो दूसरों को छोटा महसूस नहीं कराता',
        'मुस्कुराहट सबसे सुंदर गहना है',
        'संघर्ष जितना कठिन होगा, जीत उतनी ही शानदार होगी',
        'ज्ञान बाँटने से बढ़ता है',
        'सोच बदलो, ज़िंदगी बदल जाएगी',
        'मंज़िल उन्हीं को मिलती है जिनके सपनों में जान होती है',
        'आलस्य मनुष्य का सबसे बड़ा शत्रु है',
        'धैर्य कड़वा है, पर उसका फल मीठा होता है',
        'जो समय की कद्र करता है, समय उसकी कद्र करता है',
        'विनम्रता सबसे बड़ी ताकत है',
        'सच बोलने के लिए साहस चाहिए',
        'दूसरों की गलतियों से सीखो, खुद पर सब आज़माने का समय नहीं',
        'हार मत मानो, अगला प्रयास ही जीत हो सकता है',
        'एक अच्छा शिक्षक पूरी पीढ़ी बदल सकता है',
        'जैसा बोओगे, वैसा काटोगे',
        'मन के हारे हार है, मन के जीते जीत',
        'करत-करत अभ्यास के जड़मति होत सुजान',
        'बूँद-बूँद से घड़ा भरता है',
        'जहाँ चाह, वहाँ राह',
        'स्वास्थ्य ही सबसे बड़ा धन है',
        'अच्छी संगति जीवन को सुंदर बनाती है',
        'कल करे सो आज कर, आज करे सो अब',
        'दूसरों के लिए जीना ही सच्चा जीवन है',
        'अपने काम से प्यार करो, सफलता पीछे-पीछे आएगी',
        'बेटी पढ़ेगी, तभी तो आगे बढ़ेगी',
        'पेड़ लगाओ, जीवन बचाओ',
        'शब्दों में बड़ी ताकत होती है, सोच-समझकर बोलो',
        'जो झुकता है, वही ऊँचा उठता है',
        'हर समस्या अपने साथ एक समाधान लेकर आती है',
        'उम्मीद कभी मत छोड़ो, सुबह ज़रूर होती है',
        'सादा जीवन, उच्च विचार',
        'अपनी गलती मानना बड़प्पन है',
        'खुश रहना सबसे बड़ी जीत है',
        'जीवन में कुछ पाना है तो पहले खुद को बदलो',
        'अपनों का साथ हर मुश्किल आसान कर देता है',
        'सफलता का कोई शॉर्टकट नहीं होता',
        'जो सपने देखता है, वही उन्हें पूरा भी करता है',
        'अपनी मातृभाषा का सम्मान करो',
        'गाँव की मिट्टी में ही असली खुशबू है',
        'लक्ष्य ऊँचा रखो, मेहनत उससे भी ऊँची',
        'दया धर्म का मूल है',
        'जो आज मेहनत करेगा, कल वही राज करेगा',
        'प्रेम से बड़ी कोई ताकत नहीं',
        'नेकी कर, दरिया में डाल',
        'हर अंधेरी रात के बाद उजला सवेरा आता है',
        'सीखने की कोई उम्र नहीं होती',
        'सब्र और मेहनत कभी बेकार नहीं जाते',
        'विचार बदलो, समाज बदलेगा',
        'अच्छा इंसान बनना सबसे बड़ी उपलब्धि है',
        'अपना कर्म करते रहो, फल की चिंता मत करो',
        'जो डर गया, वो रुक गया',
        'आत्मविश्वास ही सफलता की कुंजी है',
        'सच्चे दोस्त हीरे की तरह कीमती होते हैं',
        'जल है तो कल है',
        'स्वच्छता में ही स्वास्थ्य है',
        'अपनी परंपरा हमारी पहचान है',
        'दूसरों की खुशी में खुश होना सीखो',
        'मेहनत की रोटी सबसे मीठी होती है',
        'हर दिन कुछ नया सीखो',
        'जो दूसरों को रोशनी देता है, वह खुद भी रोशन रहता है',
        'शांत मन सबसे बड़ी ताकत है',
        'छोटी शुरुआत से मत डरो',
        'समय सबसे बड़ा शिक्षक है',
        'कोशिश करने वालों की कभी हार नहीं होती',
        'जीवन एक संघर्ष है, इसे मुस्कुराकर जियो',
        'बड़ों का आशीर्वाद सबसे बड़ी पूँजी है',
        'मन साफ़ हो तो हर दिन त्योहार है',
        'ज्ञान ही सच्चा प्रकाश है',
        'आज का परिश्रम कल की सफलता है',
        'अपनों से बड़ा कोई खज़ाना नहीं',
        'अच्छा सोचो, अच्छा होगा',
        'सपनों को पूरा करने के लिए जागना पड़ता है',
        'जो दूसरों का भला करता है, उसका भला अपने आप होता है',
        'एकता में ही बल है, मिलकर आगे बढ़ो'
    ];

    function svDefaults() {
        return {
            badgeText: 'सुविचार', quote: '', name: '', sub: '', footer: '',
            photo: null, photoUrl: '', pz: 1, px: 0, py: 0,
            bg: null, bgUrl: '', ov: 0,
            styleId: -1, over: {}, colors: {}, keepColors: false, qpos: 'top',
            used: [], quoteIdx: -1, usedQ: [],
            pos: null, psz: 1, photoFront: false, bgFront: false, bfa: 0.35
        };
    }
    S.sv = svDefaults();

    function dayOfYear(d) {
        const s = new Date(d.getFullYear(), 0, 0);
        return Math.floor((d - s) / 86400000) - 1; // 0..365
    }
    function todayStyleSeed() { const d = new Date(); return d.getFullYear() * 366 + dayOfYear(d); }
    function svStyleId(seed) { return Number((BigInt(seed) * 820195379n + 104729n) % BigInt(SV_N)); } // गुणक N से co-prime → हर seed का अलग style
    function svDecode(id) {
        const o = {}; let v = id;
        const raw = SV_DIMS.map(d => { const r = v % d[1]; v = Math.floor(v / d[1]); return r; });
        // हर हिस्सा पिछले हिस्सों से मिलाकर (फिर भी हर id का अलग style) → रोज़ सब कुछ बदले
        let acc = 0;
        SV_DIMS.forEach((d, i) => { o[d[0]] = (raw[i] + acc) % d[1]; acc += raw[i] * (i + 3) + 1; });
        return o;
    }
    function svStyleRaw() {
        const st = svDecode(S.sv.styleId < 0 ? svStyleId(todayStyleSeed()) : S.sv.styleId);
        Object.keys(S.sv.over).forEach(k => { if (S.sv.over[k] != null) st[k] = S.sv.over[k]; });
        return st;
    }
    function svStyle() {
        const raw = svStyleRaw(), st = Object.assign({}, raw);
        Object.keys(SV_VAR).forEach(k => { const n = svBaseN(k), v = Math.max(0, raw[k] | 0); st[k] = v % n; st[k + 'V'] = Math.floor(v / n) % SV_VAR[k].length; });
        if (S.sv.pos) st.side = S.sv.pos.x < 0.5 ? 1 : 0; else if (raw.side > 1) st.side = svSidePos(raw.side).x < 0.5 ? 1 : 0;
        return st;
    }
    function svColors(st) {
        const p = svPal(st.pal, st.palV || 0);
        const c = { badge: p.badge, badgeT: p.badgeT, ink1: p.ink1, ink2: p.ink2, outline: isLight(p.ink1) ? '#0f172a' : '#ffffff',
            box: p.box, boxT: p.boxT, border: p.border, sky0: p.sky[0], sky1: p.sky[1], gr: p.gr, foot: p.foot, footT: p.footT, overlay: '#000000', acc: p.acc };
        Object.keys(S.sv.colors).forEach(k => { if (S.sv.colors[k]) c[k] = S.sv.colors[k]; });
        return c;
    }
    function isLight(hex) {
        const h = String(hex).replace('#', '');
        if (h.length < 6) return true;
        const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 150;
    }
    function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function rr(ctx, x, y, w, h, r) {
        r = Math.max(0, Math.min(r, w / 2, h / 2));
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function poly(ctx, cx, cy, r, n, rot) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) { const a = rot + i * Math.PI * 2 / n; i ? ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)) : ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a)); }
        ctx.closePath();
    }
    function fontStr(fi, px) { const F = SV_FONTS[fi] || SV_FONTS[0]; return F.w + ' ' + px + "px '" + F.f + "','Noto Sans Ol Chiki','Noto Sans Devanagari','Nirmala UI',sans-serif"; }

    // --- fonts: poster खुलने पर ही load (बाकी app पर असर नहीं)
    const svFontState = {};
    function svEnsureFontsCss() {
        if (document.getElementById('hkpSvFonts')) return;
        const l = document.createElement('link'); l.id = 'hkpSvFonts'; l.rel = 'stylesheet'; l.href = SV_FONT_CSS;
        document.head.appendChild(l);
        const l2 = document.createElement('link'); l2.id = 'hkpSvFonts2'; l2.rel = 'stylesheet'; l2.href = SV_FONT_CSS2;
        document.head.appendChild(l2);
    }
    function svNeedFont(fi, sample) {
        const F = SV_FONTS[fi]; if (!F || fi === 0) return;
        const key = F.f + F.w;
        if (svFontState[key]) return;
        svFontState[key] = 'loading';
        try {
            document.fonts.load(F.w + " 40px '" + F.f + "'", sample || 'अआ Aa').then(() => { svFontState[key] = 'ok'; schedule(); }, () => { svFontState[key] = 'fail'; });
        } catch (e) { svFontState[key] = 'fail'; }
    }

    // ---------------- backgrounds ----------------
    function svScene(ctx, W, H, sc, C, seed) {
        const R = rng(seed);
        const lin = (a, b, x0, y0, x1, y1) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
        const gm = SV_GMODE; SV_GMODE = 0;
        if (gm === 2) { const g = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.hypot(W, H) * 0.6); g.addColorStop(0, C.sky1); g.addColorStop(1, C.sky0); ctx.fillStyle = g; }
        else ctx.fillStyle = gm === 1 ? lin(C.sky0, C.sky1, 0, 0, W, H) : lin(C.sky0, C.sky1, 0, 0, 0, H);
        ctx.fillRect(0, 0, W, H);
        const cloud = (x, y, s, a) => {
            ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#ffffff';
            [[0, 0, 1], [0.8, -0.25, 0.8], [1.6, 0, 0.9], [0.8, 0.2, 0.9], [-0.7, 0.15, 0.7]].forEach(b => { ctx.beginPath(); ctx.arc(x + b[0] * s, y + b[1] * s, b[2] * s, 0, Math.PI * 2); ctx.fill(); });
            ctx.restore();
        };
        if (sc === 0) { // आसमान + घास
            for (let i = 0; i < 6; i++) cloud(R() * W, H * (0.08 + R() * 0.5), W * (0.05 + R() * 0.06), 0.55 + R() * 0.35);
            const gy = H * 0.74;
            ctx.fillStyle = lin(C.gr, '#14532d', 0, gy, 0, H); ctx.beginPath(); ctx.moveTo(0, gy + H * 0.02);
            for (let x = 0; x <= W; x += W / 8) ctx.quadraticCurveTo(x + W / 16, gy - H * 0.015 * R(), x + W / 8, gy + H * 0.01);
            ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = Math.max(1, W * 0.002);
            for (let i = 0; i < 260; i++) { const x = R() * W, y = gy + R() * (H - gy); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (R() - 0.5) * W * 0.01, y - H * (0.01 + R() * 0.02)); ctx.stroke(); }
        } else if (sc === 1) { // सूर्योदय
            const cx = W * (0.3 + R() * 0.4), cy = H * 0.62;
            ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = C.acc;
            for (let i = 0; i < 18; i++) { const a = i * Math.PI / 9; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, H * 1.2, a, a + Math.PI / 30); ctx.closePath(); ctx.fill(); }
            ctx.restore();
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.22); g.addColorStop(0, '#fffbe6'); g.addColorStop(0.5, C.acc); g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, W * 0.22, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = C.gr; ctx.beginPath(); ctx.moveTo(0, H * 0.72); ctx.quadraticCurveTo(W * 0.5, H * 0.66, W, H * 0.74); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
        } else if (sc === 2) { // bokeh
            for (let i = 0; i < 45; i++) { ctx.globalAlpha = 0.08 + R() * 0.25; ctx.fillStyle = [C.acc, '#ffffff', C.ink2][i % 3]; ctx.beginPath(); ctx.arc(R() * W, R() * H, W * (0.01 + R() * 0.07), 0, Math.PI * 2); ctx.fill(); }
            ctx.globalAlpha = 1;
        } else if (sc === 3) { // पहाड़
            for (let i = 0; i < 4; i++) cloud(R() * W, H * (0.1 + R() * 0.3), W * 0.05, 0.5);
            [[0.55, 0.55], [0.65, 0.75], [0.75, 1]].forEach((L, li) => {
                ctx.fillStyle = li === 2 ? C.gr : (li === 1 ? shade(C.gr, 0.35) : shade(C.gr, 0.6));
                ctx.beginPath(); ctx.moveTo(0, H);
                let x = 0; ctx.lineTo(0, H * L[0] + R() * H * 0.05);
                while (x < W) { x += W * (0.12 + R() * 0.15); ctx.lineTo(x, H * L[0] - R() * H * 0.12 + li * H * 0.02); }
                ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
            });
        } else if (sc === 4) { // मंडल
            const cx = W / 2, cy = H * 0.98;
            ctx.save(); ctx.strokeStyle = C.acc; ctx.fillStyle = C.acc;
            for (let ring = 1; ring <= 6; ring++) {
                const r = W * 0.1 * ring, n = 8 + ring * 4; ctx.globalAlpha = 0.07 + 0.02 * (6 - ring);
                for (let i = 0; i < n; i++) { const a = i * Math.PI * 2 / n; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * r, cy + Math.sin(a) * r, W * 0.03, W * 0.012 * ring * 0.6 + 4, a, 0, Math.PI * 2); ctx.fill(); }
            }
            ctx.restore();
        } else if (sc === 5) { // सोहराय
            dots(ctx, W, H, C.acc, 30, seed % 97 + 1);
            const b = Math.round(H * 0.035);
            ctx.save(); ctx.translate(0, H); ctx.scale(1, -1); sohraiBand(ctx, W, 0, b, C.acc, C.sky0); ctx.restore();
        } else if (sc === 6) { // geometric
            for (let i = 0; i < 26; i++) { ctx.globalAlpha = 0.05 + R() * 0.12; ctx.fillStyle = [C.acc, C.ink2, C.gr][i % 3]; const x = R() * W, y = R() * H, s = W * (0.05 + R() * 0.14); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y + s * 0.3); ctx.lineTo(x + s * 0.2, y + s); ctx.closePath(); ctx.fill(); }
            ctx.globalAlpha = 1;
        } else if (sc === 7) { // लहरें
            for (let k = 0; k < 4; k++) {
                ctx.globalAlpha = 0.25 + k * 0.18; ctx.fillStyle = k % 2 ? C.acc : C.gr;
                const base = H * (0.66 + k * 0.08), amp = H * 0.02, ph = R() * 6;
                ctx.beginPath(); ctx.moveTo(0, H);
                for (let x = 0; x <= W; x += W / 40) ctx.lineTo(x, base + Math.sin(x / W * Math.PI * 3 + ph) * amp);
                ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
            }
            ctx.globalAlpha = 1;
        } else if (sc === 8) { // पत्तियाँ
            const leaf = (x, y, s, a, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s * 0.5, -s * 0.35, s, 0); ctx.quadraticCurveTo(s * 0.5, s * 0.35, 0, 0); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s, 0); ctx.stroke(); ctx.restore(); };
            [[0, 0], [W, 0], [0, H], [W, H]].forEach((c, ci) => { for (let i = 0; i < 9; i++) { ctx.globalAlpha = 0.55 + R() * 0.4; leaf(c[0], c[1], W * (0.12 + R() * 0.12), (ci * Math.PI / 2) + R() * Math.PI / 2 + (ci === 1 ? Math.PI / 2 : 0) + (ci === 2 ? -Math.PI : 0), i % 2 ? C.gr : shade(C.gr, 0.3)); } });
            ctx.globalAlpha = 1;
        } else { // रंगीन बादल (mesh)
            [C.acc, C.ink2, C.gr, C.sky1].forEach(col => { const x = R() * W, y = R() * H, r = W * (0.35 + R() * 0.3); const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, hexA(col, 0.55)); g.addColorStop(1, hexA(col, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
        }
    }
    function hexA(hex, a) {
        const h = String(hex).replace('#', ''); if (h.length < 6) return 'rgba(255,255,255,' + a + ')';
        return 'rgba(' + parseInt(h.substr(0, 2), 16) + ',' + parseInt(h.substr(2, 2), 16) + ',' + parseInt(h.substr(4, 2), 16) + ',' + a + ')';
    }
    function shade(hex, t) { // t>0 → हल्का
        const h = String(hex).replace('#', ''); if (h.length < 6) return hex;
        const f = i => { const v = parseInt(h.substr(i, 2), 16); return Math.max(0, Math.min(255, Math.round(t >= 0 ? v + (255 - v) * t : v * (1 + t)))); };
        return 'rgb(' + f(0) + ',' + f(2) + ',' + f(4) + ')';
    }
    function drawCover(ctx, img, x, y, w, h, zoom, ox, oy) {
        const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
        if (!iw || !ih) return;
        const s = Math.max(w / iw, h / ih) * (zoom || 1);
        const dw = iw * s, dh = ih * s;
        const dx = x + (w - dw) / 2 + (ox || 0) * (dw - w) / 2, dy = y + (h - dh) / 2 + (oy || 0) * (dh - h) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    // ---------------- photo frame ----------------
    function shapePath(ctx, sh, x, y, s) {
        const cx = x + s / 2, cy = y + s / 2, r = s / 2;
        ctx.beginPath();
        switch (sh) {
            case 0: ctx.arc(cx, cy, r, 0, Math.PI * 2); break;
            case 1: ctx.rect(x, y, s, s); break;
            case 2: rr(ctx, x, y, s, s, s * 0.18); break;
            case 3: poly(ctx, cx, cy, r, 6, Math.PI / 6); break;
            case 4: poly(ctx, cx, cy, r / Math.cos(Math.PI / 8) * 0.98, 8, Math.PI / 8); break;
            case 5: poly(ctx, cx, cy, r * 1.08, 4, -Math.PI / 2); break;
            case 6: ctx.moveTo(cx, y + s * 0.95); ctx.bezierCurveTo(x - s * 0.05, y + s * 0.55, x + s * 0.05, y - s * 0.02, cx, y + s * 0.25); ctx.bezierCurveTo(x + s * 0.95, y - s * 0.02, x + s * 1.05, y + s * 0.55, cx, y + s * 0.95); ctx.closePath(); break;
            case 7: ctx.moveTo(x, y + s); ctx.lineTo(x, y + r); ctx.arc(cx, y + r, r, Math.PI, 0); ctx.lineTo(x + s, y + s); ctx.closePath(); break;
            case 8: ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s, y + s * 0.55); ctx.quadraticCurveTo(x + s, y + s * 0.88, cx, y + s); ctx.quadraticCurveTo(x, y + s * 0.88, x, y + s * 0.55); ctx.closePath(); break;
            case 9: ctx.moveTo(x, y + s); ctx.lineTo(x, y + s * 0.35); ctx.quadraticCurveTo(x, y, x + s * 0.35, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s, y + s * 0.65); ctx.quadraticCurveTo(x + s, y + s, x + s * 0.65, y + s); ctx.closePath(); break;
            case 10: {
                const n = 9; for (let i = 0; i <= n; i++) { const a = i * Math.PI * 2 / n; const rad = r * (0.9 + 0.1 * Math.sin(i * 2.3)); const px = cx + rad * Math.cos(a), py = cy + rad * Math.sin(a); if (!i) ctx.moveTo(px, py); else { const am = (i - 0.5) * Math.PI * 2 / n; ctx.quadraticCurveTo(cx + r * 1.05 * Math.cos(am), cy + r * 1.05 * Math.sin(am), px, py); } }
                ctx.closePath(); break;
            }
            default: { const n = 7; for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n; const rad = i % 2 ? r * 0.8 : r; const px = cx + rad * Math.cos(a), py = cy + rad * Math.sin(a); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }
        }
    }
    function svPhoto(ctx, st, C, x, y, s) {
        const v = st.shapeV || 0, rv = st.ringV || 0;
        if (v === 7) { x -= s * 0.075; y -= s * 0.075; s *= 1.15; } else if (v === 8) { x += s * 0.075; y += s * 0.075; s *= 0.85; }
        S._pr = { x, y, s };
        const rc = [C.border, C.acc, C.badge][Math.floor(rv / 4) % 3], re = Math.floor(rv / 12);
        const lw = Math.max(v === 4 ? 2 : 4, s * 0.035 * (v === 3 ? 1.8 : v === 4 ? 0.5 : 1) * SV_RING_W[rv % 4][1]);
        ctx.save();
        if (v === 1 || v === 2) { ctx.translate(x + s / 2, y + s / 2); ctx.rotate(v === 1 ? 0.2 : -0.2); ctx.translate(-x - s / 2, -y - s / 2); }
        svPhotoBody(ctx, st, C, x, y, s, lw, rc, re, v);
        ctx.restore();
    }
    function svPhotoBody(ctx, st, C, x, y, s, lw, rc, re, v) {
        ctx.save();
        if (v === 5) { ctx.shadowColor = C.acc; ctx.shadowBlur = s * 0.14; }
        else if (v !== 6) { ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = s * 0.06; ctx.shadowOffsetY = s * 0.02; }
        shapePath(ctx, st.shape, x, y, s); ctx.fillStyle = C.border; ctx.fill(); ctx.restore();
        ctx.save(); shapePath(ctx, st.shape, x, y, s); ctx.clip();
        if (S.sv.photo) { ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x, y, s, s); drawCover(ctx, S.sv.photo, x, y, s, s, S.sv.pz, S.sv.px, S.sv.py); }
        else {
            ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x, y, s, s); ctx.fillStyle = '#94a3b8';
            ctx.beginPath(); ctx.arc(x + s / 2, y + s * 0.4, s * 0.17, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + s / 2, y + s * 0.95, s * 0.32, s * 0.3, 0, Math.PI, 0); ctx.fill();
            ctx.fillStyle = '#475569'; ctx.font = '700 ' + Math.round(s * 0.08) + 'px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText('📷 फोटो', x + s / 2, y + s * 0.12);
        }
        ctx.restore();
        ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = lw;
        if (re === 1) { ctx.shadowColor = rc === '#ffffff' ? C.acc : rc; ctx.shadowBlur = lw * 3; }
        if (st.ring === 2) ctx.setLineDash([lw * 1.6, lw * 1.1]);
        shapePath(ctx, st.shape, x + lw / 2, y + lw / 2, s - lw); ctx.stroke();
        ctx.shadowColor = 'transparent';
        if (st.ring === 1) { ctx.lineWidth = lw * 0.45; ctx.strokeStyle = C.box; shapePath(ctx, st.shape, x + lw * 1.4, y + lw * 1.4, s - lw * 2.8); ctx.stroke(); }
        if (re === 2) { ctx.setLineDash([]); ctx.lineWidth = Math.max(2, lw * 0.4); ctx.strokeStyle = rc; shapePath(ctx, st.shape, x - lw * 1.1, y - lw * 1.1, s + lw * 2.2); ctx.stroke(); }
        ctx.restore();
    }

    // ---------------- badge (सुविचार) ----------------
    function svBadge(ctx, st, C, W, y, bh) {
        const text = S.sv.badgeText || '';
        if (!text.trim()) return y;
        const bv = st.badgeV || 0;
        if (bv === 1) bh *= 0.8; else if (bv === 2 || bv === 10) bh *= 1.25;
        if (bv === 5) C = Object.assign({}, C, { badge: C.badgeT, badgeT: C.badge });
        else if (bv === 6) C = Object.assign({}, C, { badge: mixHex(C.badge, 0.35) });
        else if (bv === 7) C = Object.assign({}, C, { badge: mixHex(C.badge, -0.35) });
        const tilt = bv === 3 ? 0.07 : bv === 4 ? -0.07 : bv === 10 ? -0.06 : 0;
        ctx.save();
        if (tilt) { ctx.translate(W / 2, y + bh / 2); ctx.rotate(tilt); ctx.translate(-W / 2, -y - bh / 2); }
        const r = svBadgeIn(ctx, st, C, W, y, bh, text, bv);
        ctx.restore();
        return r;
    }
    function svBadgeIn(ctx, st, C, W, y, bh, text, bv) {
        const fi = SV_NAME_FONTS_X[(st.nfont + 3) % SV_NAME_FONTS_X.length];
        svNeedFont(fi, text);
        let px = Math.round(bh * 0.62);
        ctx.font = fontStr(fi, px);
        while (ctx.measureText(text).width > W * 0.7 && px > 14) { px -= 2; ctx.font = fontStr(fi, px); }
        const tw = ctx.measureText(text).width, padX = bh * 0.55;
        if (st.badge === 0) y += bh * 0.55; else if (st.badge === 3 || st.badge === 6) y += bh * 0.45;
        const bw = tw + padX * 2, x = bv === 8 ? W * 0.07 + bh * 0.4 : bv === 9 ? W * 0.93 - bw - bh * 0.4 : (W - bw) / 2, cx = x + bw / 2, cy = y + bh / 2;
        let bot = y + bh;
        ctx.save();
        ctx.fillStyle = C.badge; ctx.strokeStyle = C.badge;
        const shadow = () => { ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = bh * 0.25; ctx.shadowOffsetY = bh * 0.08; };
        switch (st.badge) {
            case 0: { // लटकन + दिल
                ctx.lineWidth = Math.max(2, bh * 0.04); ctx.strokeStyle = C.acc;
                [[x + bw * 0.1, -1], [x + bw * 0.9, 1]].forEach(p => {
                    ctx.beginPath(); ctx.moveTo(p[0], y); ctx.lineTo(p[0] - p[1] * bh * 0.35, y - bh * 0.45); ctx.stroke();
                    heart(ctx, p[0] - p[1] * bh * 0.35, y - bh * 0.55, bh * 0.22, C.acc);
                    ctx.beginPath(); ctx.moveTo(p[0], y); ctx.lineTo(p[0] + p[1] * bh * 0.12, y - bh * 0.3); ctx.stroke();
                    heart(ctx, p[0] + p[1] * bh * 0.12, y - bh * 0.38, bh * 0.15, C.acc);
                });
                shadow(); ctx.fillStyle = C.badge; ctx.beginPath(); ctx.ellipse(cx, y + bh * 0.1, bw / 2, bh * 0.14, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x, y + bh * 0.1, bw, bh * 0.82);
                ctx.fillStyle = shade(C.badge, -0.2); ctx.beginPath(); ctx.ellipse(cx, y + bh * 0.92, bw / 2, bh * 0.12, 0, 0, Math.PI); ctx.fill();
                break;
            }
            case 1: shadow(); rr(ctx, x, y, bw, bh, bh / 2); ctx.fill(); break;
            case 2: { shadow(); const t = bh * 0.45; ctx.beginPath(); ctx.moveTo(x - t, y); ctx.lineTo(x + bw + t, y); ctx.lineTo(x + bw + t * 0.4, cy); ctx.lineTo(x + bw + t, y + bh); ctx.lineTo(x - t, y + bh); ctx.lineTo(x - t * 0.4, cy); ctx.closePath(); ctx.fill(); break; }
            case 3: { shadow(); const R0 = Math.max(tw / 2 + bh * 0.3, bh * 0.9); bot = cy + R0; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, Math.PI * 2); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = C.badgeT; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(cx, cy, R0 * 0.88, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); break; }
            case 4: { ctx.lineWidth = Math.max(3, bh * 0.06); ctx.beginPath(); ctx.moveTo(W * 0.08, cy); ctx.lineTo(x - bh * 0.2, cy); ctx.moveTo(x + bw + bh * 0.2, cy); ctx.lineTo(W * 0.92, cy); ctx.stroke(); poly(ctx, x - bh * 0.2, cy, bh * 0.12, 4, 0); ctx.fill(); poly(ctx, x + bw + bh * 0.2, cy, bh * 0.12, 4, 0); ctx.fill(); break; }
            case 5: { shadow(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw, y); ctx.lineTo(x + bw + bh * 0.4, cy); ctx.lineTo(x + bw, y + bh); ctx.lineTo(x, y + bh); ctx.closePath(); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.fillStyle = C.badgeT; ctx.beginPath(); ctx.arc(x + bw + bh * 0.05, cy, bh * 0.08, 0, Math.PI * 2); ctx.fill(); break; }
            case 6: { shadow(); bot = cy + bh * 1.3; const n = 20, ro = Math.max(bw * 0.62, bh), ri = ro * 0.86; ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n; const rad = i % 2 ? ri : ro; ctx.lineTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a) * (bh * 1.3 / ro)); } ctx.closePath(); ctx.fill(); break; }
            case 7: { ctx.fillStyle = shade(C.badge, -0.35); ctx.fillRect(x + bh * 0.12, y + bh * 0.12, bw, bh); ctx.fillStyle = C.badge; ctx.fillRect(x, y, bw, bh); break; }
            case 8: { shadow(); rr(ctx, x, y, bw, bh, bh * 0.15); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.fillStyle = shade(C.badge, -0.25); [x, x + bw].forEach((ex, i) => { ctx.beginPath(); ctx.ellipse(ex, cy, bh * 0.22, bh * 0.55, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = shade(C.badge, -0.25); }); break; }
            default: { shadow(); const t = bh * 0.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw, y); ctx.lineTo(x + bw + t, cy); ctx.lineTo(x + bw, y + bh); ctx.lineTo(x, y + bh); ctx.lineTo(x - t, cy); ctx.closePath(); ctx.fill(); }
        }
        ctx.restore();
        ctx.save();
        ctx.font = fontStr(fi, px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = st.badge === 4 ? C.badge : C.badgeT;
        if (st.badge === 4) { ctx.lineWidth = px * 0.12; ctx.strokeStyle = '#ffffff'; ctx.strokeText(text, cx, cy + px * 0.04); }
        ctx.fillText(text, cx, cy + px * 0.04);
        ctx.restore();
        return bot;
    }
    function heart(ctx, x, y, s, col) {
        ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y + s * 0.35);
        ctx.bezierCurveTo(x - s, y - s * 0.25, x - s * 0.35, y - s * 0.9, x, y - s * 0.35);
        ctx.bezierCurveTo(x + s * 0.35, y - s * 0.9, x + s, y - s * 0.25, x, y + s * 0.35); ctx.fill(); ctx.restore();
    }

    // ---------------- quote ----------------
    function svQuote(ctx, st, C, W, H, top, bottom, k) {
        const text = (S.sv.quote || '').trim();
        if (!text) return;
        const fi = st.font; svNeedFont(fi, text);
        k *= [1, 1.12, 0.86][st.fontV || 0];
        const qv = st.fxV || 0, al = (qv === 2 || qv === 8) ? 'left' : qv === 3 ? 'right' : 'center';
        const qShadow = qv === 4 || qv === 7 || qv === 8, qGlow = qv === 5, qThick = qv === 6;
        if (qv === 1 || qv === 7) C = Object.assign({}, C, { ink1: C.ink2, ink2: C.ink1, outline: isLight(C.ink2) ? '#0f172a' : '#ffffff' });
        const padX = W * 0.07, maxW = W - padX * 2, maxH = bottom - top;
        let px = Math.round(W * 0.1 * k), lines = [];
        const lhK = st.fx === 4 || st.fx === 7 ? 1.5 : 1.3;
        while (px > 16) { ctx.font = fontStr(fi, px); lines = wrap(ctx, text, maxW); if (lines.length * px * lhK <= maxH && lines.every(l => ctx.measureText(l).width <= maxW)) break; px -= 2; }
        const lh = px * lhK;
        let y0 = top;
        if (S.sv.qpos === 'mid') y0 = top + Math.max(0, (maxH - lines.length * lh) / 2);
        const cx = W / 2;
        ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        const cardDark = isLight(C.ink1);
        if (st.fx === 7 || st.fx === 11) { // पट्टी / card पीछे
            ctx.font = fontStr(fi, px);
            const bw = Math.min(W - padX, Math.max(...lines.map(l => ctx.measureText(l).width)) + px * 1.4);
            ctx.fillStyle = st.fx === 7 ? 'rgba(0,0,0,.55)' : (cardDark ? 'rgba(15,23,42,.82)' : 'rgba(255,255,255,.9)');
            rr(ctx, cx - bw / 2, y0 - px * 0.35, bw, lines.length * lh + px * 0.7, px * 0.4); ctx.fill();
            if (st.fx === 11) { ctx.fillStyle = C.ink2; ctx.font = '700 ' + Math.round(px * 1.6) + 'px Georgia,serif'; ctx.fillText('“', cx - bw / 2 + px * 0.5, y0 + px * 0.2); }
        }
        let wordIdx = 0;
        lines.forEach((line, i) => {
            const y = y0 + i * lh + lh / 2;
            let lpx = px;
            if (st.fx === 9 && i === lines.length - 1 && lines.length > 1) lpx = Math.round(px * 1.12);
            ctx.font = fontStr(fi, lpx);
            const lw = ctx.measureText(line).width;
            const lcx = al === 'left' ? padX + lw / 2 : al === 'right' ? W - padX - lw / 2 : cx;
            const lineBox = i % 2 ? C.ink2 : (isLight(C.ink1) ? C.badge : C.ink1);
            if (st.fx === 4) { ctx.fillStyle = lineBox; rr(ctx, lcx - lw / 2 - lpx * 0.3, y - lh * 0.45, lw + lpx * 0.6, lh * 0.9, lpx * 0.15); ctx.fill(); }
            if (st.fx === 10) { ctx.fillStyle = C.ink2; ctx.fillRect(lcx - lw / 2, y + lpx * 0.55, lw, Math.max(3, lpx * 0.08)); }
            const words = line.split(' ');
            const sp = ctx.measureText(' ').width;
            let x = lcx - lw / 2;
            ctx.textAlign = 'left';
            words.forEach((w, wi) => {
                const ww = ctx.measureText(w).width;
                let fill = C.ink1;
                if (st.fx === 0) fill = (wordIdx % 3 === 1) ? C.ink2 : C.ink1;
                else if (st.fx === 5 && wi === 0) fill = C.ink2;
                else if (st.fx === 4) fill = isLight(lineBox) ? '#111827' : '#ffffff';
                else if (st.fx === 7) fill = (wordIdx % 4 === 2) ? '#fde047' : '#ffffff';
                else if (st.fx === 9 && i === lines.length - 1 && lines.length > 1) fill = C.ink2;
                else if (st.fx === 3) { const g = ctx.createLinearGradient(0, y - lpx / 2, 0, y + lpx / 2); g.addColorStop(0, C.ink1); g.addColorStop(1, C.ink2); fill = g; }
                else if (st.fx === 8) fill = C.ink1;
                if (st.fx === 0 || st.fx === 1 || st.fx === 5 || st.fx === 9) { ctx.lineWidth = lpx * (st.fx === 1 ? 0.2 : 0.12); ctx.strokeStyle = C.outline; ctx.strokeText(w, x, y); }
                if (st.fx === 2) { ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = lpx * 0.2; ctx.shadowOffsetX = lpx * 0.05; ctx.shadowOffsetY = lpx * 0.07; }
                if (st.fx === 6) { ctx.fillStyle = C.ink2; for (let d = 1; d <= 4; d++) ctx.fillText(w, x + d * lpx * 0.018, y + d * lpx * 0.018); ctx.lineWidth = lpx * 0.06; ctx.strokeStyle = C.outline; ctx.strokeText(w, x, y); }
                if (st.fx === 8) { ctx.shadowColor = isLight(C.ink1) ? C.ink2 : '#ffffff'; ctx.shadowBlur = lpx * 0.5; for (let g = 0; g < 2; g++) { ctx.fillStyle = fill; ctx.fillText(w, x, y); } }
                if (st.fx === 3) { ctx.lineWidth = lpx * 0.1; ctx.strokeStyle = C.outline; ctx.strokeText(w, x, y); }
                if (qThick) { ctx.lineWidth = lpx * 0.2; ctx.strokeStyle = C.outline; ctx.strokeText(w, x, y); }
                if (qShadow && st.fx !== 8) { ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = lpx * 0.22; ctx.shadowOffsetX = lpx * 0.05; ctx.shadowOffsetY = lpx * 0.08; }
                if (qGlow && st.fx !== 8) { ctx.shadowColor = isLight(C.ink1) ? C.ink2 : '#ffffff'; ctx.shadowBlur = lpx * 0.45; ctx.fillStyle = fill; ctx.fillText(w, x, y); }
                ctx.fillStyle = fill; ctx.fillText(w, x, y);
                ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
                x += ww + sp; wordIdx++;
            });
            ctx.textAlign = 'center';
        });
        ctx.restore();
    }

    // ---------------- name box ----------------
    function svNameBox(ctx, st, C, W, x0, x1, y, h, photoSide, hasPhoto, cut) {
        cut = hasPhoto ? (cut || 0) : 0;
        const name = (S.sv.name || '').trim(), sub = (S.sv.sub || '').trim();
        if (!name && !sub) return;
        const nv = st.nameV || 0;
        if (nv === 1 || nv === 10) { y -= h * 0.18; h *= 1.18; } else if (nv === 2) { y += h * 0.15; h *= 0.85; }
        if (nv === 3) C = Object.assign({}, C, { box: C.boxT, boxT: C.box });
        else if (nv === 4) C = Object.assign({}, C, { box: mixHex(C.box, 0.3) });
        else if (nv === 5) C = Object.assign({}, C, { box: mixHex(C.box, -0.35) });
        const w = x1 - x0, outerLeft = photoSide === 'right' || !hasPhoto;
        ctx.save(); ctx.fillStyle = C.box;
        if (nv === 6) ctx.globalAlpha = 0.72;
        const sh = () => { ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = h * 0.2; ctx.shadowOffsetY = h * 0.06; };
        switch (st.name) {
            case 0: ctx.fillRect(x0, y, w, h); break;
            case 1: sh(); rr(ctx, x0, y, w, h, h / 2); ctx.fill(); break;
            case 2: { sh(); const t = h * 0.45; ctx.beginPath(); ctx.moveTo(x0 + t, y); ctx.lineTo(x1, y); ctx.lineTo(x1 - t, y + h); ctx.lineTo(x0, y + h); ctx.closePath(); ctx.fill(); break; }
            case 3: { sh(); const t = h * 0.5; ctx.beginPath(); if (outerLeft) { ctx.moveTo(x0 + t, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y + h); ctx.lineTo(x0 + t, y + h); ctx.lineTo(x0, y + h / 2); } else { ctx.moveTo(x0, y); ctx.lineTo(x1 - t, y); ctx.lineTo(x1, y + h / 2); ctx.lineTo(x1 - t, y + h); ctx.lineTo(x0, y + h); } ctx.closePath(); ctx.fill(); break; }
            case 4: { ctx.fillRect(x0, y, w, h); ctx.fillStyle = C.badge; if (outerLeft) ctx.fillRect(x0, y, h * 0.35, h); else ctx.fillRect(x1 - h * 0.35, y, h * 0.35, h); ctx.fillStyle = C.acc; ctx.fillRect(x0, y, w, Math.max(3, h * 0.07)); break; }
            case 5: { ctx.fillStyle = hexA(C.box, 0.0); ctx.strokeStyle = C.box; ctx.lineWidth = Math.max(4, h * 0.08); ctx.beginPath(); ctx.moveTo(x0, y + h * 0.92); ctx.lineTo(x1, y + h * 0.92); ctx.stroke(); break; }
            case 6: { ctx.fillStyle = hexA(C.box, 0.62); rr(ctx, x0, y, w, h, h * 0.25); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.stroke(); break; }
            case 7: { sh(); ctx.fillRect(x0 + h * 0.3, y, w - h * 0.3, h); ctx.shadowColor = 'transparent'; ctx.fillStyle = shade(C.box, -0.3); const ex = outerLeft ? x0 : x1; const d = outerLeft ? 1 : -1; ctx.beginPath(); ctx.moveTo(ex + d * h * 0.3, y + h * 0.15); ctx.lineTo(ex - d * h * 0.25, y + h * 0.15); ctx.lineTo(ex, y + h * 0.58); ctx.lineTo(ex - d * h * 0.25, y + h * 1.0); ctx.lineTo(ex + d * h * 0.3, y + h * 1.0); ctx.closePath(); ctx.fill(); ctx.fillStyle = C.box; ctx.fillRect(x0 + h * 0.3, y, w - h * 0.6, h); break; }
            case 8: { sh(); rr(ctx, x0, y, w, h, h * 0.18); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = C.acc; ctx.lineWidth = Math.max(3, h * 0.05); rr(ctx, x0 + h * 0.08, y + h * 0.08, w - h * 0.16, h - h * 0.16, h * 0.12); ctx.stroke(); break; }
            default: { sh(); const t = h * 0.5; ctx.beginPath(); if (outerLeft) { ctx.moveTo(x0, y); ctx.lineTo(x1 - t, y); ctx.lineTo(x1, y + h / 2); ctx.lineTo(x1 - t, y + h); ctx.lineTo(x0, y + h); } else { ctx.moveTo(x0 + t, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y + h); ctx.lineTo(x0 + t, y + h); ctx.lineTo(x0, y + h / 2); } ctx.closePath(); ctx.fill(); }
        }
        ctx.globalAlpha = 1; ctx.shadowColor = 'transparent';
        if (nv === 7) { ctx.fillStyle = C.acc; ctx.fillRect(x0, y, w, Math.max(3, h * 0.07)); }
        if (nv === 8) { ctx.fillStyle = C.acc; ctx.fillRect(x0, y + h - Math.max(3, h * 0.07), w, Math.max(3, h * 0.07)); }
        if (nv === 9 || nv === 10) { ctx.strokeStyle = C.acc; ctx.lineWidth = Math.max(3, h * 0.05); ctx.strokeRect(x0 + h * 0.04, y + h * 0.04, w - h * 0.08, h - h * 0.08); }
        ctx.restore();
        // text
        const fi = SV_NAME_FONTS_X[st.nfont]; svNeedFont(fi, name + sub);
        const pad = h * 0.45;
        const tx0 = x0 + pad + (photoSide === 'left' ? cut : 0), tx1 = x1 - pad - (photoSide === 'right' ? cut : 0);
        const align = hasPhoto ? (photoSide === 'right' ? 'right' : 'left') : 'center';
        const tx = align === 'right' ? tx1 : (align === 'left' ? tx0 : (x0 + x1) / 2);
        const maxW = tx1 - tx0;
        ctx.save(); ctx.textAlign = align; ctx.textBaseline = 'middle';
        ctx.fillStyle = st.name === 5 ? C.box : C.boxT;
        let npx = Math.round(h * (sub ? 0.46 : 0.56) * [1, 1.12, 0.86][st.nfontV || 0]);
        ctx.font = fontStr(fi, npx); while (ctx.measureText(name).width > maxW && npx > 12) { npx -= 2; ctx.font = fontStr(fi, npx); }
        const ny = sub ? y + h * 0.38 : y + h * 0.53;
        if (st.name === 5) { ctx.lineWidth = npx * 0.14; ctx.strokeStyle = '#ffffff'; ctx.lineJoin = 'round'; ctx.strokeText(name, tx, ny); }
        ctx.fillText(name, tx, ny);
        if (sub) {
            let spx = Math.round(h * 0.26); ctx.font = '600 ' + spx + 'px ' + FONT;
            while (ctx.measureText(sub).width > maxW && spx > 10) { spx -= 1; ctx.font = '600 ' + spx + 'px ' + FONT; }
            ctx.globalAlpha = 0.92; ctx.fillText(sub, tx, y + h * 0.76);
        }
        ctx.restore();
    }

    let SV_GMODE = 0;
    function svSceneV(ctx, W, H, st, C) {
        const v = st.sceneV || 0, seed = (S.sv.styleId < 0 ? svStyleId(todayStyleSeed()) : S.sv.styleId) % 100000 + st.scene * 7 + v * 1013;
        ctx.save();
        if (v % 2) { ctx.translate(W, 0); ctx.scale(-1, 1); }
        SV_GMODE = Math.floor(v / 2) % 3;
        svScene(ctx, W, H, st.scene, C, seed);
        ctx.restore();
    }
    // background को text के आगे (पारदर्शी) — नीचे की पट्टी/watermark ढके नहीं
    function svFront(ctx, W, H, fh, bgLayer) {
        if (!S.sv.bgFront) return;
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H - fh); ctx.clip();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, S.sv.bfa == null ? 0.35 : S.sv.bfa));
        bgLayer(); ctx.restore();
    }
    function svDraw(ctx, W, H) {
        const st = svStyle(), C = svColors(st);
        const tall = H / W > 1.3;
        // background
        const bgLayer = () => {
        if (S.sv.bg) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); drawCover(ctx, S.sv.bg, 0, 0, W, H, 1, 0, 0); }
        else svSceneV(ctx, W, H, st, C);
        };
        if (S.sv.bgFront) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.sky0); g.addColorStop(1, C.sky1); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
        else bgLayer();
        if (S.sv.ov > 0) { ctx.fillStyle = hexA(C.overlay, S.sv.ov / 100); ctx.fillRect(0, 0, W, H); }
        // footer
        const footer = (S.sv.footer || '').trim();
        const wm = !isWatermarkFree();
        const fh = (footer || wm) ? Math.round(H * (tall ? 0.035 : 0.05)) : 0;
        if (fh) {
            ctx.fillStyle = C.foot; ctx.fillRect(0, H - fh, W, fh);
            ctx.save(); ctx.textBaseline = 'middle'; ctx.fillStyle = C.footT;
            let fpx = Math.round(fh * 0.5);
            if (footer) { ctx.font = '700 ' + fpx + 'px ' + FONT; ctx.textAlign = wm ? 'left' : 'center'; const mw = wm ? W * 0.55 : W * 0.92; while (ctx.measureText(footer).width > mw && fpx > 10) { fpx--; ctx.font = '700 ' + fpx + 'px ' + FONT; } ctx.fillText(footer, wm ? W * 0.03 : W / 2, H - fh / 2); }
            if (wm) { const wpx = Math.round(fh * 0.36); ctx.font = '700 ' + wpx + 'px ' + FONT; ctx.textAlign = 'right'; ctx.globalAlpha = 0.85; ctx.fillText('Made with Hoṛ Katha Suite · ' + SITE, W * 0.97, H - fh / 2); }
            ctx.restore();
        }
        // photo + name
        const hasPhoto = !!S.sv.photo || !S.exporting;
        if (W / H > 1.2) { svDrawWide(ctx, st, C, W, H, fh, hasPhoto); svFront(ctx, W, H, fh, bgLayer); return; }
        const side = st.side === 0 ? 'right' : 'left';
        const ps0 = Math.round(W * (tall ? 0.34 : 0.28)), ps = Math.round(ps0 * (S.sv.psz || 1));
        const m = Math.round(W * 0.02);
        const bottomY = H - fh - m;
        const nh = Math.round(W * ((S.sv.sub || '').trim() ? 0.105 : 0.09));
        const ny = bottomY - nh - (st.name === 5 ? 0 : ps * 0.0);
        let px0 = side === 'right' ? W - m - ps : m, py0 = bottomY - ps;
        const pos = svPosNow();
        if (pos) { px0 = pos.x * W - ps / 2; py0 = pos.y * H - ps / 2; }
        const boxPhoto = hasPhoto && (!pos || (py0 + ps > ny && py0 < ny + nh));
        let bx0, bx1;
        if (boxPhoto) { if (side === 'right') { bx0 = m * 0.5; bx1 = px0 + ps * 0.5; } else { bx0 = px0 + ps * 0.5; bx1 = W - m * 0.5; } }
        else { bx0 = W * 0.08; bx1 = W * 0.92; }
        svNameBox(ctx, st, C, W, bx0, bx1, ny, nh, side, boxPhoto, ps * 0.5);
        if (hasPhoto && !S.sv.photoFront) svPhoto(ctx, st, C, px0, py0, ps);
        // badge + quote
        const k = S.scale / 100;
        const by = Math.round(H * (tall ? 0.07 : 0.055));
        const after = svBadge(ctx, st, C, W, by, Math.round(W * 0.085));
        const qTop = after + W * 0.035;
        const qBottom = hasPhoto && !pos ? (bottomY - ps - W * 0.03) : (ny - W * 0.04);
        svQuote(ctx, st, C, W, H, qTop, Math.max(qTop + W * 0.2, Math.min(qBottom, qTop + H * (tall ? 0.5 : 0.42))), k * (tall ? 1.1 : 1));
        if (hasPhoto && S.sv.photoFront) svPhoto(ctx, st, C, px0, py0, ps);
        svFront(ctx, W, H, fh, bgLayer);
    }
    function svPosNow() {
        if (S.sv.pos) return S.sv.pos;
        const raw = svStyleRaw();
        return raw.side > 1 ? svSidePos(raw.side) : null;
    }

    // Desktop (चौड़ा) layout: एक तरफ़ फोटो + नाम, दूसरी तरफ़ badge + सुविचार
    function svDrawWide(ctx, st, C, W, H, fh, hasPhoto) {
        const side = st.side === 0 ? 'right' : 'left';
        const m = Math.round(H * 0.035), bottomY = H - fh - m;
        const ps = Math.round(H * 0.6 * (S.sv.psz || 1));
        let px0 = side === 'right' ? W - m * 2 - ps : m * 2, py0 = bottomY - ps - Math.round(H * ((S.sv.sub || '').trim() ? 0.13 : 0.11)) * 0.25;
        const pos = svPosNow();
        if (pos) { px0 = pos.x * W - ps / 2; py0 = pos.y * H - ps / 2; }
        const nh = Math.round(H * ((S.sv.sub || '').trim() ? 0.13 : 0.11));
        const ny = bottomY - nh;
        const colW = hasPhoto ? W - ps - m * 5 : W;
        const qx = hasPhoto ? (side === 'right' ? m : ps + m * 4) : 0;
        let bx0, bx1;
        if (hasPhoto) { if (side === 'right') { bx0 = qx + colW * 0.12; bx1 = px0 + ps * 0.5; } else { bx0 = px0 + ps * 0.5; bx1 = qx + colW * 0.88; } }
        else { bx0 = W * 0.2; bx1 = W * 0.8; }
        svNameBox(ctx, st, C, W, bx0, bx1, ny, nh, side, hasPhoto, ps * 0.5);
        if (hasPhoto && !S.sv.photoFront) svPhoto(ctx, st, C, px0, py0, ps);
        const k = S.scale / 100;
        ctx.save(); ctx.translate(qx, 0);
        const after = svBadge(ctx, st, C, colW, Math.round(H * 0.07), Math.round(H * 0.1));
        const qTop = after + H * 0.04;
        svQuote(ctx, st, C, colW, H, qTop, Math.max(qTop + H * 0.25, ny - H * 0.05), k * 1.15);
        ctx.restore();
        if (hasPhoto && S.sv.photoFront) svPhoto(ctx, st, C, px0, py0, ps);
    }

    // ------------------------------------------------------------
    // 🖌️ DRAW
    // ------------------------------------------------------------
    function draw(canvas) {
        const sz = SIZES[S.size];
        const W = sz.w, H = sz.h;
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');
        if (S.tpl === 'suvichar') { svDraw(ctx, W, H); return; }
        proDraw(ctx, W, H);
    }

    // ============================================================
    // 💼 PRO TEMPLATES (v44): festival / notice / invite / quote
    //   हर template के 3 professional design, font, logo, background,
    //   हर रंग का picker, ऊपर/नीचे की पंक्ति — हर size (Mobile/Tab/Desktop) पर
    // ============================================================
    // ---- 🪔 त्योहार शुभकामना Pro (v46): 6 layout × 6 सजावट × 3 background = 108 style ----
    const FEST_L = ['🏵️ Classic', '🕌 मेहराब Card', '🪔 दीया Emblem', '◧ Split', '🖼️ नक्काशी Border', '🎗️ Ribbon'];
    const FEST_O = ['मंडल कोने', 'लटकते दीये', 'गेंदा तोरण', 'सोहराय पट्टी', 'रंगोली', 'आतिशबाज़ी'];
    const FEST_B = ['चमक', 'बिंदी जाल', 'किरणें'];
    function FEST_NAMES() { const a = []; for (let b = 0; b < 3; b++) for (let o = 0; o < 6; o++) for (let l = 0; l < 6; l++) a.push((a.length + 1) + '. ' + FEST_L[l] + ' · ' + FEST_O[o] + ' · ' + FEST_B[b]); return a; }
    function festDiya(ctx, x, y, s, acc) { // y = कटोरे का ऊपरी किनारा
        ctx.save();
        const gl = ctx.createRadialGradient(x, y - s * 0.35, 0, x, y - s * 0.35, s * 1.1); gl.addColorStop(0, 'rgba(255,214,102,.55)'); gl.addColorStop(1, 'rgba(255,214,102,0)');
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y - s * 0.35, s * 1.1, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = mixHex(acc, -0.45); ctx.beginPath(); ctx.ellipse(x, y, s * 0.6, s * 0.34, 0, 0, Math.PI); ctx.fill();
        ctx.fillStyle = acc; ctx.beginPath(); ctx.ellipse(x, y, s * 0.6, s * 0.1, 0, 0, Math.PI * 2); ctx.fill();
        const fg = ctx.createLinearGradient(0, y - s * 0.75, 0, y); fg.addColorStop(0, '#fff7cc'); fg.addColorStop(0.5, '#ffb703'); fg.addColorStop(1, '#f97316');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(x, y - s * 0.78); ctx.bezierCurveTo(x + s * 0.24, y - s * 0.4, x + s * 0.16, y - s * 0.06, x, y - s * 0.04); ctx.bezierCurveTo(x - s * 0.16, y - s * 0.06, x - s * 0.24, y - s * 0.4, x, y - s * 0.78); ctx.fill();
        ctx.restore();
    }
    function festSpark(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rad = i % 2 ? r * 0.28 : r; ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); } ctx.closePath(); ctx.fill(); ctx.restore(); }
    function festBurst(ctx, x, y, r, cols) {
        ctx.save(); ctx.lineCap = 'round';
        for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, c = cols[i % cols.length]; ctx.strokeStyle = c; ctx.lineWidth = Math.max(2, r * 0.03); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.25, y + Math.sin(a) * r * 0.25); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke(); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r * 1.08, y + Math.sin(a) * r * 1.08, r * 0.035, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
    }
    function festMarigold(ctx, x, y, r, c1, c2) { ctx.save(); for (let i = 0; i < 3; i++) { ctx.fillStyle = i % 2 ? c2 : c1; ctx.beginPath(); ctx.arc(x, y, r * (1 - i * 0.28), 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
    function festArch(ctx, x, y, w, h) { const r = w / 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + r); ctx.arc(x + r, y + r, r, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath(); }
    function festDraw(ctx, W, H, P, U, k, d, wide, cx, colW) {
        const L = d % 6, O = Math.floor(d / 6) % 6, B = Math.floor(d / 36) % 3;
        const user = S.pro.colors.festival || {};
        // background
        proBg(ctx, W, H, P, B === 1 ? 'lin' : 'radial');
        if (!S.pro.bg) {
            if (B === 1) { ctx.save(); ctx.fillStyle = hexA(P.acc, 0.12); const g = U * 0.045; for (let yy = g / 2; yy < H; yy += g) for (let xx = ((yy / g) % 2 ? g : g / 2); xx < W; xx += g) { ctx.beginPath(); ctx.arc(xx, yy, U * 0.004, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
            if (B === 2) { ctx.save(); ctx.fillStyle = hexA(P.acc, 0.07); const ox = W / 2, oy = H * 0.42; for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, Math.hypot(W, H), a, a + Math.PI / 24); ctx.closePath(); ctx.fill(); } ctx.restore(); }
            if (B === 0) { const g = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, U * 0.6); g.addColorStop(0, hexA(P.acc, 0.18)); g.addColorStop(1, hexA(P.acc, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
        }
        // सजावट
        let topR = U * 0.05, botR = 0;
        const flameCols = [P.acc, '#ffffff', mixHex(P.acc, 0.4), '#fb7185'];
        if (O === 0) { mandala(ctx, 0, 0, U * 0.36, P.acc, 0.32, 5); mandala(ctx, W, H, U * 0.36, P.acc, 0.32, 5); mandala(ctx, W, 0, U * 0.2, P.acc, 0.18, 3); mandala(ctx, 0, H, U * 0.2, P.acc, 0.18, 3); topR = U * 0.08; }
        else if (O === 1) {
            const n = Math.max(5, Math.round(W / (U * 0.17))), sp = W / n;
            ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(2, U * 0.004); ctx.beginPath(); ctx.moveTo(0, U * 0.02); for (let i = 0; i < n; i++) ctx.quadraticCurveTo(sp * i + sp / 2, U * 0.07, sp * (i + 1), U * 0.02); ctx.stroke();
            for (let i = 0; i < n; i++) { const x = sp * i + sp / 2, len = U * (0.06 + (i % 3) * 0.035); ctx.lineWidth = Math.max(1.5, U * 0.0025); ctx.beginPath(); ctx.moveTo(x, U * 0.045); ctx.lineTo(x, U * 0.045 + len); ctx.stroke(); festDiya(ctx, x, U * 0.07 + len, U * 0.045, P.acc); }
            ctx.restore(); topR = U * 0.24;
        } else if (O === 2) {
            const n = Math.max(4, Math.round(W / (U * 0.25))), sp = W / n, r = U * 0.022, c1 = '#f59e0b', c2 = '#f97316';
            for (let i = 0; i < n; i++) { for (let j = 0; j <= 10; j++) { const t = j / 10, x = sp * i + sp * t, y = U * 0.015 + Math.sin(t * Math.PI) * U * 0.07; festMarigold(ctx, x, y, r, j % 2 ? c1 : c2, j % 2 ? c2 : '#fde047'); }
                for (let j = 0; j < 4; j++) festMarigold(ctx, sp * i, U * 0.03 + j * r * 1.7, r * 0.9, j % 2 ? c1 : c2, '#fde047');
                leaf(ctx, sp * i + sp / 2, U * 0.09, U * 0.05, Math.PI / 2 - 0.4, '#15803d'); leaf(ctx, sp * i + sp / 2, U * 0.09, U * 0.05, Math.PI / 2 + 0.4, '#166534'); }
            topR = U * 0.15;
        } else if (O === 3) { const b = Math.round(U * 0.055); dots(ctx, W, H, P.acc, 26, 7); sohraiBand(ctx, W, 0, b, P.acc, P.bg[0]); ctx.save(); ctx.translate(0, H); ctx.scale(1, -1); sohraiBand(ctx, W, 0, b, P.acc, P.bg[0]); ctx.restore(); topR = b + U * 0.04; botR = b; }
        else if (O === 4) { mandala(ctx, W / 2, H * 0.47, U * 0.48, P.acc, 0.1, 6); [[U * 0.07, U * 0.07], [W - U * 0.07, U * 0.07], [U * 0.07, H - U * 0.07], [W - U * 0.07, H - U * 0.07]].forEach(p => flower(ctx, p[0], p[1], U * 0.045, P.acc, P.bg[0], 8)); topR = U * 0.12; }
        else { let s = 17; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; const nb = wide ? 5 : 3; for (let i = 0; i < nb; i++) festBurst(ctx, W * (0.1 + 0.8 * i / Math.max(1, nb - 1)) + (rnd() - 0.5) * U * 0.05, U * (0.09 + rnd() * 0.06), U * (0.06 + rnd() * 0.04), flameCols); for (let i = 0; i < 40; i++) festSpark(ctx, rnd() * W, rnd() * H, U * (0.004 + rnd() * 0.01), i % 2 ? P.acc : '#ffffff'); topR = U * 0.2; }
        const fh = proFooter(ctx, W, H - botR, U, null, P.fg);
        let top = topR + U * 0.02, bottom = H - botR - fh - U * 0.05;
        const divider = y => diamondDivider(ctx, cx, y, Math.min(colW * 0.5, U * 0.4), P.acc, Math.max(2, U * 0.004));
        const darkOn = c => isLight(c) ? '#1f2937' : '#f8fafc';
        if (L === 0) {
            if (proLogo(ctx, cx, top + U * 0.06, U * 0.12, '#ffffff')) top += U * 0.14;
            proStack(ctx, { W, U, cx, top, bottom, colW, P, k, align: 'center', hSize: 0.1, hOpt: { shadow: 'rgba(0,0,0,.35)' }, divider, fromPill: P.acc, fromCol: P.bg[0] });
        } else if (L === 1) {
            const aw = Math.min(colW * 0.95, W * 0.86, (bottom - top) * (wide ? 1.05 : 2)), ah = bottom - top, ax = cx - aw / 2;
            ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = U * 0.05; ctx.fillStyle = hexA(P.card, 0.95); festArch(ctx, ax, top, aw, ah); ctx.fill(); ctx.restore();
            ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(3, U * 0.006); festArch(ctx, ax + U * 0.018, top + U * 0.018, aw - U * 0.036, ah - U * 0.036); ctx.stroke(); ctx.restore();
            const P2 = Object.assign({}, P, { fg: user.fg || darkOn(P.card), head: user.head || mixHex(P.bg[0], 0) });
            let t2 = top + Math.min(aw * 0.28, ah * 0.16);
            if (proLogo(ctx, cx, top + aw * 0.2, U * 0.11, P.card)) t2 += U * 0.05;
            proStack(ctx, { W, U, cx, top: t2, bottom: top + ah - U * 0.06, colW: aw * 0.8, P: P2, k, align: 'center', hSize: 0.09, divider, fromPill: P.bg[0], fromCol: '#ffffff', subCol: isLight(P.card) ? mixHex(P.acc, -0.45) : P.acc });
        } else if (L === 2) {
            const er = U * (wide ? 0.1 : 0.085), ey = top + er + U * 0.01;
            ctx.save(); const g = ctx.createRadialGradient(cx, ey, 0, cx, ey, er * 1.6); g.addColorStop(0, hexA(P.acc, 0.5)); g.addColorStop(1, hexA(P.acc, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, ey, er * 1.6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = P.bg[0]; ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(3, U * 0.006); ctx.beginPath(); ctx.arc(cx, ey, er, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
            if (!proLogo(ctx, cx, ey, er * 1.7, null)) festDiya(ctx, cx, ey + er * 0.3, er * 0.75, P.acc);
            proStack(ctx, { W, U, cx, top: ey + er + U * 0.04, bottom, colW, P, k, align: 'center', hSize: 0.1, hOpt: { shadow: 'rgba(0,0,0,.35)' }, divider, fromPill: P.acc, fromCol: P.bg[0] });
        } else if (L === 3) {
            const pc = mixHex(P.bg[0], -0.25);
            if (wide) {
                const pw = W * 0.4; ctx.save(); ctx.fillStyle = hexA(pc, 0.85); ctx.fillRect(0, 0, pw, H - fh - botR); ctx.beginPath(); ctx.rect(0, 0, pw, H); ctx.clip(); mandala(ctx, pw / 2, H * 0.45, U * 0.42, P.acc, 0.35, 5); ctx.restore();
                ctx.fillStyle = P.acc; ctx.fillRect(pw, 0, Math.max(4, U * 0.008), H - fh - botR);
                if (!proLogo(ctx, pw / 2, H * 0.45, U * 0.26, '#ffffff')) festDiya(ctx, pw / 2, H * 0.5, U * 0.16, P.acc);
                const cw2 = W - pw - U * 0.16; proStack(ctx, { W, U, cx: pw + U * 0.08 + cw2 / 2, top, bottom, colW: cw2, P, k, align: 'left', hSize: 0.1, hOpt: { shadow: 'rgba(0,0,0,.3)' }, fromPill: P.acc, fromCol: P.bg[0] });
            } else {
                const ph = H * 0.3; ctx.save(); ctx.fillStyle = hexA(pc, 0.85); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, ph); ctx.quadraticCurveTo(W / 2, ph + U * 0.12, 0, ph); ctx.closePath(); ctx.fill(); ctx.clip(); mandala(ctx, W / 2, ph * 0.5, U * 0.4, P.acc, 0.3, 5); ctx.restore();
                if (!proLogo(ctx, cx, ph * 0.55, U * 0.2, '#ffffff')) festDiya(ctx, cx, ph * 0.66, U * 0.13, P.acc);
                proStack(ctx, { W, U, cx, top: Math.max(top, ph + U * 0.09), bottom, colW, P, k, align: 'center', hSize: 0.1, hOpt: { shadow: 'rgba(0,0,0,.3)' }, divider, fromPill: P.acc, fromCol: P.bg[0] });
            }
        } else if (L === 4) {
            const m = U * 0.06, x0 = m, y0 = Math.max(m, topR - U * 0.03), x1 = W - m, y1 = H - botR - fh - m * 0.6;
            ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(4, U * 0.008); ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.lineWidth = Math.max(1.5, U * 0.0025); ctx.strokeRect(x0 + U * 0.018, y0 + U * 0.018, x1 - x0 - U * 0.036, y1 - y0 - U * 0.036); ctx.restore();
            [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(p => { ctx.save(); ctx.fillStyle = P.bg[0]; ctx.beginPath(); ctx.arc(p[0], p[1], U * 0.04, 0, Math.PI * 2); ctx.fill(); ctx.restore(); flower(ctx, p[0], p[1], U * 0.038, P.acc, P.bg[0], 8); });
            let t2 = y0 + U * 0.07; if (proLogo(ctx, cx, t2 + U * 0.05, U * 0.11, '#ffffff')) t2 += U * 0.12;
            proStack(ctx, { W, U, cx, top: t2, bottom: y1 - U * 0.06, colW: Math.min(colW, x1 - x0 - U * 0.16), P, k, align: 'center', hSize: 0.095, hOpt: { shadow: 'rgba(0,0,0,.35)' }, divider, fromPill: P.acc, fromCol: P.bg[0] });
        } else {
            // Ribbon: sub → ribbon heading → card message → from
            const hfi = proFont('h'), mfi = proFont('m'); svNeedFont(hfi, S.heading); if (mfi) svNeedFont(mfi, S.message);
            if (proLogo(ctx, cx, top + U * 0.06, U * 0.12, '#ffffff')) top += U * 0.14;
            const avail = bottom - top, rw = Math.min(W * 0.8, colW * 1.02);
            const sb = fitF(ctx, S.sub, colW, avail * 0.1, U * 0.042 * k, 0, 1.3, 12, '700');
            const hb = fitF(ctx, S.heading, rw * 0.78, avail * 0.3, U * 0.09 * k, hfi, 1.2, 18);
            const mb = fitF(ctx, S.message, colW * 0.82, avail * 0.32, U * 0.048 * k, mfi, 1.42, 14, mfi ? null : '500');
            const fromLine = [S.from, S.date].filter(Boolean).join('  •  ');
            const fb = fitF(ctx, fromLine, colW, avail * 0.1, U * 0.04 * k, 0, 1.3, 12, '700');
            const gap = U * 0.035, rh = hb.h + U * 0.06, ch = mb.h ? mb.h + U * 0.08 : 0;
            const total = (sb.h ? sb.h + gap : 0) + rh + (ch ? gap + ch : 0) + (fb.h ? gap + fb.h : 0);
            let y = top + Math.max(0, (avail - total) / 2);
            if (sb.h) y = drawF(ctx, sb, cx, y, 'center', P.acc) + gap;
            const rx = cx - rw / 2, t = rh * 0.45;
            ctx.save(); ctx.fillStyle = mixHex(P.acc, -0.35);
            [[rx - t * 0.2, 1], [rx + rw + t * 0.2, -1]].forEach(e => { ctx.beginPath(); ctx.moveTo(e[0], y + rh * 0.22); ctx.lineTo(e[0] - e[1] * t * 1.4, y + rh * 0.22); ctx.lineTo(e[0] - e[1] * t * 0.9, y + rh * 0.72); ctx.lineTo(e[0] - e[1] * t * 1.4, y + rh * 1.22); ctx.lineTo(e[0], y + rh * 1.22); ctx.closePath(); ctx.fill(); });
            ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = U * 0.03; ctx.fillStyle = P.acc; ctx.fillRect(rx, y, rw, rh); ctx.restore();
            drawF(ctx, hb, cx, y + U * 0.03, 'center', user.head || darkOn(P.acc));
            y += rh + gap;
            if (ch) { const cw = colW * 0.92; ctx.save(); ctx.fillStyle = hexA(P.card, 0.92); rr(ctx, cx - cw / 2, y, cw, ch, U * 0.03); ctx.fill(); ctx.restore(); drawF(ctx, mb, cx, y + U * 0.04, 'center', user.fg || darkOn(P.card)); y += ch + gap; }
            if (fb.h) drawF(ctx, fb, cx, y, 'center', P.acc, { shadow: 'rgba(0,0,0,.3)' });
        }
    }
    const PRO_DESIGNS = {
        festival: FEST_NAMES(),
        notice:   ['🏛️ Official Letterhead', '📢 Bold Alert', '📌 Notice Board'],
        invite:   ['👑 Royal Frame', '🚪 मेहराब (Arch)', '🌼 Floral Minimal'],
        quote:    ['📰 Editorial', '◧ Split Panel', '🖍️ Highlight']
    };
    const PRO_FONT_DEF = { festival: [2, 0], notice: [8, 0], invite: [1, 0], quote: [9, 0] };
    const PRO_COLOR_KEYS = [['bg1', 'Background 1'], ['bg2', 'Background 2'], ['head', 'शीर्षक'], ['fg', 'Text'], ['acc', 'Accent / सजावट'], ['card', 'Card / पट्टी']];
    function proDefaults() { return { design: { festival: 0, notice: 0, invite: 0, quote: 0 }, hf: {}, mf: {}, colors: {}, logo: null, logoUrl: '', bg: null, bgUrl: '', ov: 45 }; }
    S.pro = proDefaults();
    S.sub = ''; S.footer = '';

    function proP() {
        const T = TEMPLATES[S.tpl], B = T.palettes[S.pal] || T.palettes[0], c = (S.pro.colors[S.tpl] || {});
        const P = { bg: [c.bg1 || B.bg[0], c.bg2 || B.bg[1]], fg: c.fg || B.fg, acc: c.acc || B.accent, head: c.head || B.head || B.accent, card: c.card || B.card || '#ffffff' };
        return P;
    }
    function proFont(which) {
        const d = PRO_FONT_DEF[S.tpl] || [0, 0];
        const v = which === 'h' ? S.pro.hf[S.tpl] : S.pro.mf[S.tpl];
        return typeof v === 'number' ? v : (which === 'h' ? d[0] : d[1]);
    }
    // font-आधारित fit
    function fitF(ctx, text, maxW, maxH, startPx, fi, lhK, minPx, weight) {
        let px = Math.round(startPx), lines = [];
        lhK = lhK || 1.32; minPx = minPx || 14;
        const fnt = p => weight ? (weight + ' ' + p + 'px ' + FONT) : fontStr(fi, p);
        while (px >= minPx) {
            ctx.font = fnt(px);
            lines = wrap(ctx, text, maxW);
            if (lines.length * px * lhK <= maxH && lines.every(l => ctx.measureText(l).width <= maxW)) break;
            px -= 2;
        }
        px = Math.max(px, minPx);
        return { px, lines: String(text || '').trim() ? lines : [], lh: px * lhK, fnt, h: (String(text || '').trim() ? lines.length : 0) * px * lhK };
    }
    function drawF(ctx, b, x, y, align, color, o) {
        o = o || {};
        ctx.save(); ctx.font = b.fnt(b.px); ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        b.lines.forEach((l, i) => {
            const yy = y + i * b.lh + b.lh / 2;
            if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = b.px * 0.25; ctx.shadowOffsetY = b.px * 0.06; }
            if (o.stroke) { ctx.lineWidth = b.px * (o.sw || 0.1); ctx.strokeStyle = o.stroke; ctx.strokeText(l, x, yy); }
            ctx.fillStyle = color; ctx.fillText(l, x, yy);
            ctx.shadowColor = 'transparent';
        });
        ctx.restore();
        return y + b.h;
    }
    function proBg(ctx, W, H, P, mode) {
        if (S.pro.bg) {
            ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); drawCover(ctx, S.pro.bg, 0, 0, W, H, 1, 0, 0);
            if (S.pro.ov > 0) { ctx.fillStyle = hexA(P.bg[0], S.pro.ov / 100); ctx.fillRect(0, 0, W, H); }
            return;
        }
        let g;
        if (mode === 'radial') { g = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.hypot(W, H) * 0.6); g.addColorStop(0, P.bg[1]); g.addColorStop(1, P.bg[0]); }
        else if (mode === 'v') { g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1]); }
        else { g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1]); }
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    function proLogo(ctx, cx, cy, s, plate) {
        if (!S.pro.logo) return false;
        ctx.save();
        if (plate) { ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = s * 0.12; ctx.fillStyle = plate; ctx.beginPath(); ctx.arc(cx, cy, s / 2, 0, Math.PI * 2); ctx.fill(); ctx.shadowColor = 'transparent'; }
        const i = S.pro.logo, sc = Math.min(s * 0.78 / i.width, s * 0.78 / i.height);
        const w = i.width * sc, h = i.height * sc;
        if (plate) { ctx.beginPath(); ctx.arc(cx, cy, s * 0.46, 0, Math.PI * 2); ctx.clip(); }
        ctx.drawImage(i, cx - w / 2, cy - h / 2, w, h);
        ctx.restore();
        return true;
    }
    // नीचे की पट्टी: footer + watermark — ऊँचाई लौटाता है
    function proFooter(ctx, W, H, U, bgCol, txtCol) {
        const footer = (S.footer || '').trim(), wm = !isWatermarkFree();
        if (!footer && !wm) return 0;
        const fh = Math.round(U * 0.068);
        if (bgCol) { ctx.fillStyle = bgCol; ctx.fillRect(0, H - fh, W, fh); }
        ctx.save(); ctx.textBaseline = 'middle'; ctx.fillStyle = txtCol;
        const side = Math.max(U * 0.04, W * 0.03);
        if (footer) {
            let p = Math.round(fh * 0.46); ctx.font = '700 ' + p + 'px ' + FONT; ctx.textAlign = wm ? 'left' : 'center';
            const mw = wm ? W * 0.55 : W * 0.92; while (ctx.measureText(footer).width > mw && p > 10) { p--; ctx.font = '700 ' + p + 'px ' + FONT; }
            ctx.fillText(footer, wm ? side : W / 2, H - fh / 2);
        }
        if (wm) { ctx.font = '700 ' + Math.round(fh * 0.3) + 'px ' + FONT; ctx.textAlign = 'right'; ctx.globalAlpha = 0.85; ctx.fillText('Made with Hoṛ Katha Suite · ' + SITE, W - side, H - fh / 2); }
        ctx.restore();
        return fh;
    }
    function diamondDivider(ctx, cx, y, w, col, lw) {
        ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(cx - w / 2, y); ctx.lineTo(cx - lw * 4, y); ctx.moveTo(cx + lw * 4, y); ctx.lineTo(cx + w / 2, y); ctx.stroke();
        poly(ctx, cx, y, lw * 3, 4, 0); ctx.fill();
        [-1, 1].forEach(d => { poly(ctx, cx + d * w / 2, y, lw * 1.6, 4, 0); ctx.fill(); });
        ctx.restore();
    }
    function mandala(ctx, cx, cy, R, col, alpha, rings) {
        ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.fillStyle = col;
        rings = rings || 5;
        for (let r = 1; r <= rings; r++) {
            const rad = R * r / rings, n = 6 + r * 4, pl = R / rings * 0.9;
            ctx.lineWidth = Math.max(1.5, R * 0.006);
            ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
            for (let i = 0; i < n; i++) {
                const a = i * Math.PI * 2 / n + r * 0.3;
                const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
                ctx.save(); ctx.translate(x, y); ctx.rotate(a);
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(pl * 0.35, pl * 0.28, pl * 0.7, 0); ctx.quadraticCurveTo(pl * 0.35, -pl * 0.28, 0, 0);
                if (r % 2) ctx.fill(); else ctx.stroke();
                ctx.restore();
            }
        }
        ctx.beginPath(); ctx.arc(cx, cy, R / rings * 0.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }
    function flower(ctx, cx, cy, r, petal, center, n) {
        n = n || 6; ctx.save(); ctx.fillStyle = petal;
        for (let i = 0; i < n; i++) { const a = i * Math.PI * 2 / n; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.5, r * 0.28, a, 0, Math.PI * 2); ctx.fill(); }
        ctx.fillStyle = center; ctx.beginPath(); ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    function leaf(ctx, x, y, len, ang, col) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = col;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -len * 0.3, len, 0); ctx.quadraticCurveTo(len * 0.5, len * 0.3, 0, 0); ctx.fill(); ctx.restore();
    }

    // स्तंभ (column) की चौड़ाई: Desktop पर बीच में सीमित
    function proCol(W, H, frac) { const U = Math.min(W, H); return Math.min(W * (frac || 0.84), Math.max(U * 0.84, H * 1.35)); }

    // सामान्य stack: sub → heading → divider → message → from  (ऊपर-नीचे बीच में)
    function proStack(ctx, o) {
        const { W, cx, top, bottom, colW, P, k, align } = o;
        const U = o.U, hfi = proFont('h'), mfi = proFont('m');
        svNeedFont(hfi, S.heading); if (mfi) svNeedFont(mfi, S.message);
        const fromLine = [S.from, S.date].filter(Boolean).join('  •  ');
        const avail = bottom - top;
        const sb = fitF(ctx, S.sub, colW, avail * 0.1, U * 0.04 * k, 0, 1.3, 12, '700');
        const hb = fitF(ctx, S.heading, colW, avail * (o.hFrac || 0.34), U * (o.hSize || 0.1) * k, hfi, 1.22, 18);
        const mb = fitF(ctx, S.message, colW, avail * (o.mFrac || 0.4), U * (o.mSize || 0.05) * k, mfi, 1.42, 14, mfi ? null : '500');
        const fb = fitF(ctx, fromLine, colW, avail * 0.12, U * 0.04 * k, 0, 1.3, 12, '700');
        const gap = U * 0.035, div = o.divider ? U * 0.05 : 0;
        const total = (sb.h ? sb.h + gap * 0.6 : 0) + hb.h + (hb.h ? gap * 0.6 + div : 0) + mb.h + (fb.h ? gap * 1.2 + fb.h + (o.fromPill ? U * 0.03 : 0) : 0);
        let y = top + Math.max(0, (avail - total) / 2);
        const x = align === 'left' ? cx - colW / 2 : (align === 'right' ? cx + colW / 2 : cx);
        if (sb.h) { y = drawF(ctx, sb, x, y, align, o.subCol || P.acc) + gap * 0.6; }
        if (hb.h) { y = drawF(ctx, hb, x, y, align, P.head, o.hOpt) + gap * 0.6; }
        if (div) { o.divider(y + div * 0.35); y += div; }
        if (mb.h) { y = drawF(ctx, mb, x, y, align, P.fg, o.mOpt); }
        if (fb.h) {
            y += gap * 1.2;
            if (o.fromPill) {
                ctx.save(); ctx.font = fb.fnt(fb.px);
                const tw = Math.max(...fb.lines.map(l => ctx.measureText(l).width)), pw = tw + fb.px * 1.6, ph = fb.h + fb.px * 0.7;
                const px0 = align === 'left' ? x : (align === 'right' ? x - pw : x - pw / 2);
                ctx.fillStyle = o.fromPill; rr(ctx, px0, y, pw, ph, ph / 2); ctx.fill(); ctx.restore();
                drawF(ctx, fb, align === 'left' ? x + fb.px * 0.8 : (align === 'right' ? x - fb.px * 0.8 : x), y + fb.px * 0.35, align, o.fromCol || P.fg);
            } else drawF(ctx, fb, x, y, align, o.fromCol || P.acc);
        }
    }

    function proDraw(ctx, W, H) {
        const P = proP(), U = Math.min(W, H), k = S.scale / 100 * Math.min(1.4, Math.sqrt(Math.max(W, H) / U));
        const d = S.pro.design[S.tpl] || 0, wide = W / H > 1.25;
        const cx = W / 2, colW = proCol(W, H);

        if (S.tpl === 'festival') festDraw(ctx, W, H, P, U, k, d, wide, cx, colW);

        else if (S.tpl === 'notice') {
            const fromBlock = (x, y, w, col, line) => { // हस्ताक्षर
                const fb = fitF(ctx, S.from, w, U * 0.12, U * 0.04 * k, 0, 1.3, 12, '700');
                if (!fb.h) return;
                ctx.save(); ctx.strokeStyle = line; ctx.lineWidth = Math.max(2, U * 0.003); ctx.beginPath(); ctx.moveTo(x - w, y); ctx.lineTo(x, y); ctx.stroke(); ctx.restore();
                drawF(ctx, fb, x - w / 2, y + U * 0.012, 'center', col);
            };
            const mfi = proFont('m'), hfi = proFont('h'); svNeedFont(hfi, S.heading); if (mfi) svNeedFont(mfi, S.message);
            if (d === 0) {
                proBg(ctx, W, H, Object.assign({}, P, { bg: [P.card, P.card] }), 'v');
                const head = Math.round(U * 0.17);
                const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1]);
                ctx.fillStyle = g; ctx.fillRect(0, 0, W, head); ctx.fillStyle = P.acc; ctx.fillRect(0, head, W, Math.max(4, U * 0.008));
                const side = Math.max(U * 0.06, (W - proCol(W, H, 0.9)) / 2);
                let tx = side;
                if (proLogo(ctx, side + U * 0.055, head / 2, U * 0.11, '#ffffff')) tx = side + U * 0.14;
                const org = (S.sub || '').trim();
                if (org) { const ob = fitF(ctx, org, W - tx - side, head * 0.75, U * 0.055 * k, 0, 1.2, 12, '800'); drawF(ctx, ob, tx, (head - ob.h) / 2, 'left', '#ffffff'); }
                const fh = proFooter(ctx, W, H, U, P.bg[0], '#ffffff');
                const iw = W - side * 2;
                let y = head + U * 0.06;
                const hb = fitF(ctx, S.heading, iw * 0.8, U * 0.12, U * 0.075 * k, hfi, 1.2, 16);
                ctx.save(); ctx.font = hb.fnt(hb.px); const hw = Math.max(0, ...hb.lines.map(l => ctx.measureText(l).width)); ctx.restore();
                if (hb.h) { ctx.fillStyle = hexA(P.acc, 0.12); rr(ctx, cx - hw / 2 - U * 0.04, y - U * 0.01, hw + U * 0.08, hb.h + U * 0.02, U * 0.02); ctx.fill(); y = drawF(ctx, hb, cx, y, 'center', P.head); ctx.fillStyle = P.acc; ctx.fillRect(cx - hw * 0.3, y + U * 0.012, hw * 0.6, Math.max(3, U * 0.006)); y += U * 0.04; }
                if (S.date) { const db = fitF(ctx, 'दिनांक: ' + S.date, iw * 0.5, U * 0.06, U * 0.032 * k, 0, 1.3, 11, '600'); drawF(ctx, db, W - side, y, 'right', P.fg); y += db.h + U * 0.02; }
                const sigH = U * 0.14, bottom = H - fh - sigH - U * 0.03;
                const mb = fitF(ctx, S.message, iw, bottom - y, U * 0.056 * k, mfi, 1.5, 14, mfi ? null : '500');
                ctx.save(); ctx.fillStyle = P.acc; ctx.fillRect(side - U * 0.025, y + U * 0.01, Math.max(4, U * 0.007), mb.h - U * 0.02); ctx.restore();
                drawF(ctx, mb, side, y, 'left', P.fg);
                fromBlock(W - side, H - fh - sigH * 0.55, Math.min(iw * 0.45, U * 0.45), P.fg, P.fg);
            } else if (d === 1) {
                proBg(ctx, W, H, Object.assign({}, P, { bg: [P.card, shade(P.card, -0.04)] }), 'v');
                const bar = Math.round(U * 0.05);
                ctx.fillStyle = P.acc; ctx.fillRect(0, 0, bar, H);
                ctx.save(); ctx.globalAlpha = 0.07; ctx.fillStyle = P.acc; ctx.beginPath(); ctx.arc(W, 0, U * 0.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
                const fh = proFooter(ctx, W, H, U, P.bg[0], '#ffffff');
                const side = Math.max(bar + U * 0.07, (W - proCol(W, H, 0.86)) / 2), iw = W - side - Math.max(U * 0.07, (W - proCol(W, H, 0.86)) / 2);
                let y = U * 0.08;
                const ic = U * 0.075;
                ctx.save(); ctx.fillStyle = P.acc; ctx.beginPath(); ctx.arc(side + ic / 2, y + ic / 2, ic / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
                if (!proLogo(ctx, side + ic / 2, y + ic / 2, ic, null)) { ctx.save(); ctx.font = Math.round(ic * 0.5) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📢', side + ic / 2, y + ic / 2 + ic * 0.03); ctx.restore(); }
                const org = (S.sub || '').trim();
                if (org) { const ob = fitF(ctx, org, iw - ic - U * 0.03, ic, U * 0.035 * k, 0, 1.25, 11, '800'); drawF(ctx, ob, side + ic + U * 0.03, y + (ic - ob.h) / 2, 'left', P.acc); }
                y += ic + U * 0.04;
                const hb = fitF(ctx, S.heading, iw, U * 0.22, U * 0.12 * k, hfi, 1.15, 18);
                y = drawF(ctx, hb, side, y, 'left', P.head) + U * 0.02;
                ctx.fillStyle = P.acc; ctx.fillRect(side, y, U * 0.12, Math.max(4, U * 0.008)); y += U * 0.05;
                const footY = H - fh - U * 0.16;
                const mb = fitF(ctx, S.message, iw, footY - y - U * 0.03, U * 0.056 * k, mfi, 1.5, 14, mfi ? null : '500');
                drawF(ctx, mb, side, y, 'left', P.fg);
                ctx.save(); ctx.strokeStyle = hexA(P.fg, 0.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(side, footY); ctx.lineTo(side + iw, footY); ctx.stroke(); ctx.restore();
                const lab = (t, v, x, al) => { if (!v) return; const lb = fitF(ctx, t, iw / 2, U * 0.04, U * 0.026, 0, 1.2, 10, '700'); const vb = fitF(ctx, v, iw / 2 - U * 0.02, U * 0.08, U * 0.04 * k, 0, 1.25, 11, '800'); drawF(ctx, lb, x, footY + U * 0.03, al, P.acc); drawF(ctx, vb, x, footY + U * 0.03 + lb.h, al, P.fg); };
                lab('दिनांक', S.date, side, 'left'); lab('जारीकर्ता', S.from, side + iw, 'right');
            } else {
                proBg(ctx, W, H, P, 'lin');
                if (!S.pro.bg) { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; const st = U * 0.05; for (let x = 0; x < W; x += st) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y2 = 0; y2 < H; y2 += st) { ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(W, y2); ctx.stroke(); } ctx.restore(); }
                const fh = proFooter(ctx, W, H, U, null, isLight(P.bg[0]) ? '#0f172a' : '#ffffff');
                const cw = Math.min(W * 0.88, proCol(W, H, 0.88)), chh = (H - fh) * 0.84, x0 = cx - cw / 2, y0 = (H - fh - chh) / 2 + U * 0.015;
                ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = U * 0.04; ctx.shadowOffsetY = U * 0.015; ctx.fillStyle = P.card; ctx.translate(cx, y0 + chh / 2); ctx.rotate(-0.008); rr(ctx, -cw / 2, -chh / 2, cw, chh, U * 0.012); ctx.fill(); ctx.restore();
                ctx.fillStyle = P.acc; ctx.fillRect(x0, y0, cw, U * 0.022);
                // pin
                ctx.save(); ctx.fillStyle = shade(P.acc, -0.2); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = U * 0.01; ctx.beginPath(); ctx.arc(cx, y0 + U * 0.01, U * 0.022, 0, Math.PI * 2); ctx.fill(); ctx.restore();
                const dark = isLight(P.card) ? '#0f172a' : '#f8fafc', c = S.pro.colors[S.tpl] || {};
                const P2 = Object.assign({}, P, { fg: c.fg || dark, head: c.head || P.acc });
                let top = y0 + U * 0.07;
                if (proLogo(ctx, cx, top + U * 0.045, U * 0.09, null)) top += U * 0.1;
                proStack(ctx, { W, U, cx, top, bottom: y0 + chh - U * 0.05, colW: cw * 0.86, P: P2, k, align: 'center', hSize: 0.09, mFrac: 0.46,
                    divider: y => { ctx.save(); ctx.strokeStyle = P.acc; ctx.setLineDash([U * 0.012, U * 0.01]); ctx.lineWidth = Math.max(2, U * 0.003); ctx.beginPath(); ctx.moveTo(cx - cw * 0.3, y); ctx.lineTo(cx + cw * 0.3, y); ctx.stroke(); ctx.restore(); }, fromCol: P.acc });
            }
        }

        else if (S.tpl === 'invite') {
            if (d === 0) {
                proBg(ctx, W, H, P, 'radial');
                const m1 = U * 0.035, m2 = U * 0.055;
                ctx.save(); ctx.strokeStyle = P.acc;
                ctx.lineWidth = Math.max(4, U * 0.007); ctx.strokeRect(m1, m1, W - m1 * 2, H - m1 * 2);
                ctx.lineWidth = Math.max(2, U * 0.0025); ctx.strokeRect(m2, m2, W - m2 * 2, H - m2 * 2);
                const r = U * 0.075;
                [[m2, m2, 0], [W - m2, m2, Math.PI / 2], [W - m2, H - m2, Math.PI], [m2, H - m2, Math.PI * 1.5]].forEach(c => {
                    ctx.beginPath(); ctx.arc(c[0], c[1], r, c[2], c[2] + Math.PI / 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(c[0], c[1], r * 0.62, c[2], c[2] + Math.PI / 2); ctx.stroke();
                    ctx.fillStyle = P.acc; poly(ctx, c[0], c[1], U * 0.014, 4, 0); ctx.fill();
                });
                [[cx, m1], [cx, H - m1], [m1, H / 2], [W - m1, H / 2]].forEach(p => { ctx.fillStyle = P.acc; poly(ctx, p[0], p[1], U * 0.016, 4, 0); ctx.fill(); });
                ctx.restore();
                const fh = proFooter(ctx, W, H - m2, U, null, P.fg);
                let top = U * 0.11;
                if (!proLogo(ctx, cx, top + U * 0.05, U * 0.12, '#ffffff')) mandala(ctx, cx, top + U * 0.05, U * 0.06, P.acc, 0.9, 3);
                top += U * 0.13;
                proStack(ctx, { W, U, cx, top, bottom: H - U * 0.1 - fh, colW: colW * 0.8, P, k, align: 'center', hSize: 0.11, mFrac: 0.4,
                    hOpt: { shadow: 'rgba(0,0,0,.3)' }, divider: y => { ctx.save(); ctx.fillStyle = P.acc; [-1, 0, 1].forEach(i => { ctx.beginPath(); ctx.arc(cx + i * U * 0.035, y, U * (i ? 0.006 : 0.009), 0, Math.PI * 2); ctx.fill(); }); ctx.restore(); diamondDivider(ctx, cx, y, U * 0.5, P.acc, Math.max(1.5, U * 0.0025)); } });
            } else if (d === 1) {
                proBg(ctx, W, H, P, 'v');
                // तोरण
                const n = Math.max(9, Math.round(W / (U * 0.07)));
                ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(2, U * 0.003); ctx.beginPath(); ctx.moveTo(0, U * 0.02); ctx.lineTo(W, U * 0.02); ctx.stroke();
                for (let i = 0; i < n; i++) { const x = (i + 0.5) * W / n; leaf(ctx, x, U * 0.02, U * 0.07, Math.PI / 2, i % 2 ? '#16a34a' : P.acc); flower(ctx, x, U * 0.02, U * 0.018, '#f97316', '#fde047', 6); }
                ctx.restore();
                const aw = Math.min(W * 0.8, proCol(W, H, 0.8)), ax = cx - aw / 2, ay = U * 0.14, ab = H - U * 0.07;
                const archPath2 = () => { ctx.beginPath(); const rad = Math.min(aw / 2, (ab - ay) * 0.45); ctx.moveTo(ax, ab); ctx.lineTo(ax, ay + rad); ctx.quadraticCurveTo(ax, ay, cx, ay); ctx.quadraticCurveTo(ax + aw, ay, ax + aw, ay + rad); ctx.lineTo(ax + aw, ab); ctx.closePath(); };
                ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = U * 0.04; ctx.fillStyle = hexA(P.card, 0.94); archPath2(); ctx.fill(); ctx.restore();
                ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(3, U * 0.006); archPath2(); ctx.stroke(); ctx.restore();
                const dark = isLight(P.card) ? shade(P.bg[0], -0.1) : '#f8fafc', c = S.pro.colors[S.tpl] || {};
                const P2 = Object.assign({}, P, { fg: c.fg || dark, head: c.head || P.bg[0] });
                const fh = proFooter(ctx, W, H, U, null, P.fg);
                let top = ay + U * 0.09;
                if (proLogo(ctx, cx, top + U * 0.04, U * 0.1, null)) top += U * 0.1;
                proStack(ctx, { W, U, cx, top, bottom: ab - U * 0.06 - fh * 0.5, colW: aw * 0.8, P: P2, k, align: 'center', hSize: 0.1, mFrac: 0.4,
                    divider: y => { flower(ctx, cx, y, U * 0.022, P.acc, P2.head, 8); [-1, 1].forEach(dd => leaf(ctx, cx + dd * U * 0.03, y, U * 0.08, dd > 0 ? 0 : Math.PI, P.acc)); }, subCol: isLight(P.card) ? shade(P.acc, -0.45) : P.acc, fromCol: isLight(P.card) ? shade(P.acc, -0.45) : P.acc });
            } else {
                proBg(ctx, W, H, Object.assign({}, P, { bg: [P.card, shade(P.card, -0.03)] }), 'v');
                const cl = (x, y, s, flip) => { // फूल-गुच्छा
                    for (let i = 0; i < 5; i++) leaf(ctx, x, y, s * 1.1, (flip ? Math.PI : 0) + (i - 2) * 0.35 + (flip ? 0.6 : -0.6) + Math.PI / 2 * (flip ? 1 : 0), hexA(P.acc, 0.55));
                    flower(ctx, x, y, s * 0.5, P.bg[0], P.acc, 7); flower(ctx, x + (flip ? -1 : 1) * s * 0.55, y + (flip ? -1 : 1) * s * 0.3, s * 0.32, hexA(P.bg[0], 0.75), P.acc, 6); flower(ctx, x + (flip ? -1 : 1) * s * 0.2, y + (flip ? -1 : 1) * s * 0.65, s * 0.28, P.acc, '#fff', 6);
                };
                cl(U * 0.08, U * 0.08, U * 0.2, false); cl(W - U * 0.08, H - U * 0.08, U * 0.2, true);
                ctx.save(); ctx.strokeStyle = hexA(P.acc, 0.6); ctx.lineWidth = Math.max(1.5, U * 0.002); const m = U * 0.05; ctx.strokeRect(m, m, W - m * 2, H - m * 2); ctx.restore();
                const dark = isLight(P.card) ? shade(P.bg[0], -0.15) : '#f8fafc', c = S.pro.colors[S.tpl] || {};
                const P2 = Object.assign({}, P, { fg: c.fg || dark, head: c.head || P.bg[0] });
                const fh = proFooter(ctx, W, H - U * 0.05, U, null, P2.fg);
                let top = U * 0.16;
                if (proLogo(ctx, cx, top, U * 0.1, null)) top += U * 0.08;
                proStack(ctx, { W, U, cx, top, bottom: H - U * 0.14 - fh, colW: colW * 0.74, P: P2, k, align: 'center', hSize: 0.1, mFrac: 0.42,
                    divider: y => { ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(1.5, U * 0.002); ctx.beginPath(); ctx.moveTo(cx - U * 0.18, y); ctx.lineTo(cx + U * 0.18, y); ctx.stroke(); ctx.restore(); flower(ctx, cx, y, U * 0.018, P.acc, P2.head, 6); }, subCol: isLight(P.card) ? shade(P.acc, -0.45) : P.acc, fromCol: isLight(P.card) ? shade(P.acc, -0.45) : P.acc });
            }
        }

        else { // quote
            const fromLine = [S.from, S.date].filter(Boolean).join('  •  ');
            const hfi = proFont('h'); svNeedFont(hfi, S.message);
            const qMark = (x, y, s, col, a) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.font = '700 ' + Math.round(s) + 'px Georgia, serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('“', x, y); ctx.restore(); };
            if (d === 0) {
                proBg(ctx, W, H, P, 'lin'); dots(ctx, W, H, P.acc, 18, 3);
                const fh = proFooter(ctx, W, H, U, null, P.fg);
                const side = (W - colW) / 2;
                qMark(side - U * 0.02, U * 0.04, U * 0.32, P.acc, 0.35);
                let top = U * 0.2;
                proLogo(ctx, W - side - U * 0.05, U * 0.1, U * 0.1, '#ffffff');
                const sb = fitF(ctx, (S.sub || S.heading || '').trim(), colW, U * 0.08, U * 0.04 * k, 0, 1.3, 12, '800');
                const mb = fitF(ctx, S.message, colW, (H - fh - top - U * 0.25), U * 0.085 * k, hfi, 1.3, 16);
                const fb = fitF(ctx, fromLine ? '— ' + fromLine : '', colW, U * 0.08, U * 0.04 * k, 0, 1.3, 12, '700');
                const total = sb.h + U * 0.03 + mb.h + U * 0.05 + fb.h;
                let y = top + Math.max(0, (H - fh - U * 0.1 - top - total) / 2);
                if (sb.h) { y = drawF(ctx, sb, side, y, 'left', P.acc) + U * 0.01; ctx.fillStyle = P.acc; ctx.fillRect(side, y, U * 0.1, Math.max(3, U * 0.006)); y += U * 0.03; }
                y = drawF(ctx, mb, side, y, 'left', P.head === P.acc ? P.fg : P.head) + U * 0.05;
                if (fb.h) drawF(ctx, fb, side, y, 'left', P.acc);
            } else if (d === 1) {
                proBg(ctx, W, H, Object.assign({}, P, { bg: [P.card, shade(P.card, -0.05)] }), 'v');
                const portrait = !wide;
                const pw = portrait ? W : W * 0.36, ph = portrait ? H * 0.3 : H;
                const g = ctx.createLinearGradient(0, 0, pw, ph); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1]);
                ctx.fillStyle = g; ctx.fillRect(0, 0, pw, ph);
                if (S.pro.bg) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, pw, ph); ctx.clip(); drawCover(ctx, S.pro.bg, 0, 0, pw, ph, 1, 0, 0); ctx.fillStyle = hexA(P.bg[0], S.pro.ov / 100); ctx.fillRect(0, 0, pw, ph); ctx.restore(); }
                dots(ctx, pw, ph, P.acc, 14, 9);
                const pcx = pw / 2, pcy = ph / 2;
                qMark(pcx - U * 0.09, pcy - U * 0.2, U * 0.3, P.acc, 0.9);
                const hl = (S.sub || S.heading || '').trim();
                proLogo(ctx, pw - U * 0.09, U * 0.09, U * 0.1, '#ffffff');
                if (hl) { const hb = fitF(ctx, hl, pw * 0.8, ph * 0.18, U * 0.045 * k, 0, 1.25, 12, '800'); drawF(ctx, hb, pcx, portrait ? ph * 0.86 - hb.h : pcy + U * 0.13, 'center', '#ffffff'); }
                const dark = isLight(P.card) ? '#111827' : '#f8fafc', c = S.pro.colors[S.tpl] || {};
                const ink = c.fg || dark;
                const rx0 = portrait ? W * 0.09 : pw + W * 0.06, rw = portrait ? W * 0.82 : W - pw - W * 0.12;
                const ry0 = portrait ? ph + U * 0.07 : U * 0.1;
                const fh = proFooter(ctx, W, H, U, null, ink);
                const avail = H - fh - ry0 - U * 0.08;
                const mb = fitF(ctx, S.message, rw, avail * 0.78, U * 0.08 * k, hfi, 1.32, 16);
                const fb = fitF(ctx, fromLine, rw, avail * 0.15, U * 0.04 * k, 0, 1.3, 12, '700');
                let y = ry0 + Math.max(0, (avail - mb.h - fb.h - U * 0.06) / 2);
                y = drawF(ctx, mb, rx0, y, 'left', c.head || ink) + U * 0.03;
                if (fb.h) { ctx.fillStyle = P.acc; ctx.fillRect(rx0, y, U * 0.08, Math.max(3, U * 0.006)); drawF(ctx, fb, rx0, y + U * 0.02, 'left', P.bg[0]); }
            } else {
                proBg(ctx, W, H, P, 'radial');
                const fh = proFooter(ctx, W, H, U, null, P.fg);
                let top = U * 0.1;
                if (proLogo(ctx, cx, top + U * 0.04, U * 0.1, '#ffffff')) top += U * 0.12;
                const hl = (S.sub || S.heading || '').trim();
                let y = top;
                if (hl) { const hb = fitF(ctx, hl, colW, U * 0.08, U * 0.04 * k, 0, 1.3, 12, '800'); ctx.save(); ctx.font = hb.fnt(hb.px); const tw = Math.max(...hb.lines.map(l => ctx.measureText(l).width)); ctx.strokeStyle = P.acc; ctx.lineWidth = Math.max(2, U * 0.003); rr(ctx, cx - tw / 2 - hb.px, y - hb.px * 0.3, tw + hb.px * 2, hb.h + hb.px * 0.6, (hb.h + hb.px * 0.6) / 2); ctx.stroke(); ctx.restore(); y = drawF(ctx, hb, cx, y, 'center', P.acc) + U * 0.05; }
                const fb = fitF(ctx, fromLine, colW, U * 0.08, U * 0.04 * k, 0, 1.3, 12, '700');
                const avail = H - fh - U * 0.1 - y - (fb.h ? fb.h + U * 0.07 : 0);
                const mb = fitF(ctx, S.message, colW * 0.92, avail, U * 0.085 * k, hfi, 1.55, 16);
                let my = y + Math.max(0, (avail - mb.h) / 2);
                ctx.save(); ctx.font = mb.fnt(mb.px);
                mb.lines.forEach((l, i) => { const lw = ctx.measureText(l).width, yy = my + i * mb.lh; ctx.fillStyle = hexA(P.acc, 0.85); ctx.beginPath(); ctx.moveTo(cx - lw / 2 - mb.px * 0.3, yy + mb.lh * 0.2); ctx.lineTo(cx + lw / 2 + mb.px * 0.3, yy + mb.lh * 0.14); ctx.lineTo(cx + lw / 2 + mb.px * 0.25, yy + mb.lh * 0.86); ctx.lineTo(cx - lw / 2 - mb.px * 0.25, yy + mb.lh * 0.82); ctx.closePath(); ctx.fill(); });
                ctx.restore();
                const c = S.pro.colors[S.tpl] || {};
                drawF(ctx, mb, cx, my, 'center', c.head || (isLight(P.acc) ? '#111827' : '#ffffff'));
                if (fb.h) { const fy = my + mb.h + U * 0.05; ctx.save(); ctx.font = fb.fnt(fb.px); const tw = Math.max(...fb.lines.map(l => ctx.measureText(l).width)); ctx.fillStyle = P.card; rr(ctx, cx - tw / 2 - fb.px, fy, tw + fb.px * 2, fb.h + fb.px * 0.6, (fb.h + fb.px * 0.6) / 2); ctx.fill(); ctx.restore(); drawF(ctx, fb, cx, fy + fb.px * 0.3, 'center', isLight(P.card) ? '#111827' : '#ffffff'); }
            }
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
#hkPosterModal .hkp-dev{position:relative;display:flex;align-items:center;justify-content:center;max-width:100%;max-height:100%;box-sizing:border-box;}
#hkPosterModal .hkp-dev canvas{max-height:calc(min(720px,94vh) - 110px);}
#hkPosterModal .hkp-dev.dev-mobile{padding:12px 9px;background:#0b0b0f;border-radius:30px;box-shadow:0 10px 34px rgba(0,0,0,.4),inset 0 0 0 2px #2a2a33;}
#hkPosterModal .hkp-dev.dev-mobile::before{content:'';position:absolute;top:4px;left:50%;transform:translateX(-50%);width:54px;height:5px;border-radius:9px;background:#2a2a33;}
#hkPosterModal .hkp-dev.dev-mobile canvas{border-radius:18px;max-height:calc(min(720px,94vh) - 140px);}
#hkPosterModal .hkp-dev.dev-tab{padding:16px;background:#1f2430;border-radius:24px;box-shadow:0 10px 34px rgba(0,0,0,.4),inset 0 0 0 2px #394050;}
#hkPosterModal .hkp-dev.dev-tab canvas{border-radius:10px;max-height:calc(min(720px,94vh) - 150px);}
#hkPosterModal .hkp-dev.dev-desktop{padding:10px 10px 18px;background:#0f1115;border-radius:12px 12px 6px 6px;margin-bottom:38px;box-shadow:0 10px 34px rgba(0,0,0,.4);}
#hkPosterModal .hkp-dev.dev-desktop::after{content:'';position:absolute;bottom:-34px;left:50%;transform:translateX(-50%);width:26%;height:34px;background:linear-gradient(#9ca3af,#6b7280);clip-path:polygon(22% 0,78% 0,100% 100%,0 100%);}
#hkPosterModal .hkp-dev.dev-desktop canvas{border-radius:3px;max-height:calc(min(720px,94vh) - 170px);}
#hkPosterModal .hkp-dev:not(.dev-mobile):not(.dev-tab):not(.dev-desktop) canvas{max-height:calc(min(720px,94vh) - 60px);}
@media (max-width:760px){#hkPosterModal .hkp-body{flex-direction:column;}#hkPosterModal .hkp-side{width:auto;flex:0 0 auto;max-height:52%;border-right:0;border-bottom:1px solid var(--border-color,#ddd);}#hkPosterModal .hkp-dev canvas,#hkPosterModal .hkp-dev.dev-mobile canvas,#hkPosterModal .hkp-dev.dev-tab canvas,#hkPosterModal .hkp-dev.dev-desktop canvas,#hkPosterModal .hkp-dev:not(.dev-mobile):not(.dev-tab):not(.dev-desktop) canvas{max-height:36vh;}}
`;

    let modal, canvas, raf = 0;

    // ------------------------------------------------------------
    // 🌟 SUVICHAR — panel, save, upload
    // ------------------------------------------------------------
    const SV_STORE = 'hk_poster_sv_v1';
    let svLoaded = false, svSaveT = 0;
    function todayKey() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    function svSave() {
        clearTimeout(svSaveT);
        svSaveT = setTimeout(() => {
            const v = S.sv;
            const o = { badgeText: v.badgeText, name: v.name, sub: v.sub, footer: v.footer, pz: v.pz, px: v.px, py: v.py, ov: v.ov,
                colors: v.colors, keepColors: v.keepColors, qpos: v.qpos, used: v.used.slice(-365), usedQ: v.usedQ.slice(-SV_QUOTES.length),
                lang: S.lang || 'app', day: todayKey(), styleId: v.styleId, over: v.over, photoUrl: v.photoUrl, bgUrl: v.bgUrl,
                pos: v.pos, psz: v.psz, photoFront: v.photoFront, bgFront: v.bgFront, bfa: v.bfa };
            try { localStorage.setItem(SV_STORE, JSON.stringify(o)); }
            catch (e) { try { o.bgUrl = ''; localStorage.setItem(SV_STORE, JSON.stringify(o)); toast('Background बहुत बड़ी है — याद नहीं रखी गई (poster में लगी है)।', 'warning'); } catch (e2) {} }
        }, 400);
    }
    function loadImg(url) { return new Promise(res => { if (!url) return res(null); const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = url; }); }
    async function svLoad() {
        if (svLoaded) return; svLoaded = true;
        let o = null; try { o = JSON.parse(localStorage.getItem(SV_STORE) || 'null'); } catch (e) {}
        if (!o) return;
        const v = S.sv;
        ['badgeText', 'name', 'sub', 'footer', 'qpos'].forEach(k => { if (typeof o[k] === 'string') v[k] = o[k]; });
        ['pz', 'px', 'py', 'ov', 'psz', 'bfa'].forEach(k => { if (typeof o[k] === 'number') v[k] = o[k]; });
        if (o.pos && typeof o.pos.x === 'number' && typeof o.pos.y === 'number') v.pos = { x: o.pos.x, y: o.pos.y };
        v.photoFront = !!o.photoFront; v.bgFront = !!o.bgFront;
        if (o.colors && typeof o.colors === 'object') v.colors = o.colors;
        v.keepColors = !!o.keepColors;
        if (Array.isArray(o.used)) v.used = o.used;
        if (Array.isArray(o.usedQ)) v.usedQ = o.usedQ;
        if (o.lang) S.lang = o.lang;
        if (o.day === todayKey()) { if (typeof o.styleId === 'number') v.styleId = o.styleId; if (o.over) v.over = o.over; }
        else if (!v.keepColors) v.colors = {};
        v.photoUrl = o.photoUrl || ''; v.bgUrl = o.bgUrl || '';
        v.photo = await loadImg(v.photoUrl); v.bg = await loadImg(v.bgUrl);
    }
    function fileToDataUrl(file, maxSide, q) {
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const sc = Math.min(1, maxSide / Math.max(img.width, img.height));
                    const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
                    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
                    res(c.toDataURL('image/jpeg', q || 0.85));
                };
                img.onerror = rej; img.src = fr.result;
            };
            fr.onerror = rej; fr.readAsDataURL(file);
        });
    }
    function svDailyQuote() {
        const d = new Date(), i = (dayOfYear(d) * 37 + d.getFullYear()) % SV_QUOTES.length;
        S.sv.quoteIdx = i; return SV_QUOTES[i];
    }
    function svNextQuote() {
        const v = S.sv;
        let pool = SV_QUOTES.map((q, i) => i).filter(i => !v.usedQ.includes(i) && i !== v.quoteIdx);
        if (!pool.length) { v.usedQ = []; pool = SV_QUOTES.map((q, i) => i).filter(i => i !== v.quoteIdx); }
        const i = pool[Math.floor(Math.random() * pool.length)];
        v.usedQ.push(i); v.quoteIdx = i; return SV_QUOTES[i];
    }

    // ---- ⌨️ App की keyboard भाषा poster के हर text box में ----
    const SV_LANGS = [['app', '⌨️ App जैसी'], ['english', 'English'], ['roman', 'Santali (R)'], ['santali-dev', 'Santali (D)'], ['olchiki', 'ओलचिकी'], ['hindi-dev', 'हिन्दी'], ['hindi-phonetic', 'हिन्दी फोनेटिक']];
    function svLangNow() { const l = S.lang || 'app'; return l === 'app' ? (window.currentLayout || 'english') : l; }
    function svLangAllowed(l) {
        if (l === 'english' || l === 'app') return true;
        const t = document.getElementById('tab-' + l);
        return !(t && t.classList.contains('is-locked'));
    }
    function svTypeKey(e) {
        const el = e.target;
        if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') || (el.type && el.type !== 'text' && el.tagName === 'INPUT')) return;
        if (e.isComposing || e.keyCode === 229 || e.ctrlKey || e.metaKey || e.altKey) return;
        const L = svLangNow();
        if (L === 'english' || L === 'roman' || !svLangAllowed(L)) return;
        const put = (txt, a, b) => { el.setRangeText(txt, a, b, 'end'); el.dispatchEvent(new Event('input', { bubbles: true })); };
        if (L === 'hindi-phonetic') {
            if (!(e.key === ' ' || e.key === 'Enter' || /^[,!?;:।]$/.test(e.key))) return;
            const c = el.selectionStart; if (c == null || el.selectionEnd !== c) return;
            const m = /[A-Za-z.]+$/.exec(el.value.slice(0, c)); if (!m) return;
            try {
                const out = window.HindiPhonetic && window.HindiPhonetic.translate(m[0]);
                if (out && out.text && out.text !== m[0]) put(out.text, c - m[0].length, c);
            } catch (x) {}
            return;
        }
        if (e.key.length !== 1) return;
        let mapped = null;
        try {
            if (L === 'santali-dev' || L === 'hindi-dev') mapped = (typeof hardwareDevMap !== 'undefined') ? hardwareDevMap[e.key] : null;
            else if (L === 'olchiki') mapped = (typeof hardwareOlchikiMap !== 'undefined') ? hardwareOlchikiMap[e.key.toLowerCase()] : null;
        } catch (x) { mapped = null; }
        if (!mapped || mapped === e.key) return;
        e.preventDefault();
        put(mapped, el.selectionStart, el.selectionEnd);
    }

    const SV_PANEL = `
<div id="hkpSv" style="display:none;flex-direction:column;gap:9px;">
  <div class="hkp-sec">🎨 Style <span id="svStyleNo" class="hkp-note"></span></div>
  <div class="hkp-row"><button type="button" class="hkp-btn" id="svNew">🎲 नया Style</button><button type="button" class="hkp-btn ghost" id="svPrev">↩️ पिछला</button><button type="button" class="hkp-btn ghost" id="svToday">📅 आज का</button></div>
  <div class="hkp-svgrid">
    <div><label>Photo frame</label><select data-o="shape"></select></div>
    <div><label>Frame रेखा</label><select data-o="ring"></select></div>
    <div><label>सुविचार Badge</label><select data-o="badge"></select></div>
    <div><label>Name box</label><select data-o="name"></select></div>
    <div><label>Quote font</label><select data-o="font"></select></div>
    <div><label>Quote style</label><select data-o="fx"></select></div>
    <div><label>Name font</label><select data-o="nfont"></select></div>
    <div><label>Background</label><select data-o="scene"></select></div>
    <div><label>रंग-set</label><select data-o="pal"></select></div>
    <div><label>Photo की तरफ़</label><select data-o="side"></select></div>
  </div>
  <div class="hkp-sec">✍️ Text</div>
  <div><label>Badge पर (सुविचार)</label><input type="text" data-sv="badgeText">
    <div class="hkp-row" id="svBadgeChips" style="margin-top:5px;"></div></div>
  <div><label>सुविचार / Quote</label><textarea data-sv="quote"></textarea>
    <div class="hkp-row" style="margin-top:5px;"><button type="button" class="hkp-chip" id="svNextQ">💡 नया सुविचार</button><button type="button" class="hkp-chip" id="svFromEd">📝 Editor से</button><button type="button" class="hkp-chip" data-qpos="top">⬆️ ऊपर</button><button type="button" class="hkp-chip" data-qpos="mid">↕️ बीच</button></div></div>
  <div><label>नाम</label><input type="text" data-sv="name" placeholder="जैसे PARISH MARANDI"></div>
  <div><label>पद / पहचान (वैकल्पिक)</label><input type="text" data-sv="sub" placeholder="जैसे समाज सेवक, पोड़ैयाहाट"></div>
  <div><label>नीचे की पंक्ति (वैकल्पिक)</label><input type="text" data-sv="footer" placeholder="जैसे 📞 98xxxxxx · BOSC Tech & Edu"></div>
  <div class="hkp-sec">📷 फोटो</div>
  <div class="hkp-row"><button type="button" class="hkp-btn" id="svPhotoBtn">📷 फोटो चुनें</button><button type="button" class="hkp-btn ghost" id="svPhotoDel">🗑️ हटाएँ</button></div>
  <input type="file" accept="image/*" id="svPhotoFile" style="display:none">
  <div><label>Zoom</label><input type="range" min="100" max="300" step="5" data-r="pz" style="width:100%;"></div>
  <div class="hkp-svgrid"><div><label>← →</label><input type="range" min="-100" max="100" step="2" data-r="px" style="width:100%;"></div><div><label>↑ ↓</label><input type="range" min="-100" max="100" step="2" data-r="py" style="width:100%;"></div></div>
  <div><label>📏 फोटो का size: <span id="svPszV">100%</span></label><input type="range" min="50" max="180" step="5" data-r="psz" style="width:100%;"></div>
  <div class="hkp-note">✋ Preview में फोटो को पकड़कर (drag करके) कहीं भी रखें। "Photo की तरफ़" में 110 तैयार जगहें भी हैं।</div>
  <div class="hkp-row"><button type="button" class="hkp-chip" id="svPosReset">↺ फोटो अपनी जगह</button><button type="button" class="hkp-chip" id="svPhotoLayer">📷 फोटो: text के पीछे</button></div>
  <div class="hkp-sec">🖼️ Background</div>
  <div class="hkp-row"><button type="button" class="hkp-btn" id="svBgBtn">🖼️ अपनी Background</button><button type="button" class="hkp-btn ghost" id="svBgDel">↩️ Built-in</button></div>
  <div><label>↩️ Built-in Background (370 डिज़ाइन)</label><select data-o="scene" data-bgsel="1" style="width:100%;"></select></div>
  <input type="file" accept="image/*" id="svBgFile" style="display:none">
  <div><label>परत (Overlay): <span id="svOvV">0%</span></label><input type="range" min="0" max="75" step="5" data-r="ov" style="width:100%;"></div>
  <div class="hkp-row"><button type="button" class="hkp-btn ghost" id="svBgLayer">🔁 Background: text के पीछे</button></div>
  <div id="svBfaRow" style="display:none;"><label>आगे वाली Background की गहराई: <span id="svBfaV">35%</span></label><input type="range" min="10" max="100" step="5" data-r="bfa" style="width:100%;"></div>
  <div class="hkp-sec">🌈 रंग (हर चीज़)</div>
  <div class="hkp-svcolors" id="svColors"></div>
  <label style="font-weight:700;display:flex;gap:6px;align-items:center;"><input type="checkbox" id="svKeep"> नया Style आने पर भी मेरे रंग रखें</label>
  <div class="hkp-row"><button type="button" class="hkp-chip" id="svResetC">♻️ रंग reset</button></div>
  <div class="hkp-note">फोटो, नाम और रंग इसी device में याद रहते हैं। Style रोज़ अपने-आप बदलता है और साल भर दोबारा नहीं आता।</div>
</div>`;
    const SV_CSS = `
#hkPosterModal .hkp-sec{font-size:12.5px;font-weight:900;border-top:1px dashed var(--border-color,#ccc);padding-top:8px;margin-top:2px;}
#hkPosterModal .hkp-svgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
#hkPosterModal .hkp-svgrid select{font-size:12.5px;padding:5px 6px;}
#hkPosterModal .hkp-svcolors{display:grid;grid-template-columns:1fr 1fr;gap:5px 8px;}
#hkPosterModal .hkp-svcolors label{display:flex;align-items:center;gap:6px;font-weight:700;font-size:11.5px;margin:0;}
#hkPosterModal .hkp-svcolors input[type=color]{width:30px;height:26px;padding:0;border:1px solid var(--border-color,#ccc);border-radius:6px;background:none;cursor:pointer;flex:0 0 30px;}
`;
    function svFillSelect(sel, items) { sel.innerHTML = items.map((t, i) => '<option value="' + i + '">' + t + '</option>').join(''); }
    function svBind() {
        const q = s => modal.querySelector(s);
        const st0 = el('style', { id: 'hkPosterSvCss' }); st0.textContent = SV_CSS; document.head.appendChild(st0);
        const lists = svLists();
        modal.querySelectorAll('[data-o]').forEach(sel => {
            const k = sel.getAttribute('data-o'); svFillSelect(sel, lists[k]);
            sel.addEventListener('change', () => {
                S.sv.over[k] = +sel.value;
                if (k === 'pal' && !S.sv.keepColors) S.sv.colors = {};
                if (k === 'side') S.sv.pos = +sel.value > 1 ? svSidePos(+sel.value) : null;
                if (sel.hasAttribute('data-bgsel') && S.sv.bg) { S.sv.bg = null; S.sv.bgUrl = ''; }
                svSync(); svSave(); schedule();
            });
        });
        const chips = q('#svBadgeChips');
        ['सुविचार', 'आज का विचार', 'सुप्रभात', 'शुभ रात्रि', 'Good Morning', 'ᱡᱚᱦᱟᱨ'].forEach(t => {
            const b = el('button', { type: 'button', class: 'hkp-chip' }, t);
            b.onclick = () => { S.sv.badgeText = t; q('[data-sv="badgeText"]').value = t; svSave(); schedule(); };
            chips.appendChild(b);
        });
        modal.querySelectorAll('[data-sv]').forEach(inp => {
            inp.addEventListener('input', () => { S.sv[inp.getAttribute('data-sv')] = inp.value; if (inp.getAttribute('data-sv') !== 'quote') svSave(); schedule(); });
        });
        modal.querySelectorAll('[data-r]').forEach(r => {
            r.addEventListener('input', () => {
                const k = r.getAttribute('data-r'), v = +r.value;
                S.sv[k] = k === 'pz' ? v / 100 : (k === 'ov' ? v : v / 100);
                if (k === 'ov') q('#svOvV').textContent = v + '%';
                if (k === 'psz') q('#svPszV').textContent = v + '%';
                if (k === 'bfa') q('#svBfaV').textContent = v + '%';
                svSave(); schedule();
            });
        });
        modal.querySelectorAll('[data-qpos]').forEach(b => b.onclick = () => { S.sv.qpos = b.getAttribute('data-qpos'); svSync(); svSave(); schedule(); });
        q('#svNew').onclick = () => {
            const v = S.sv; let id, n = 0;
            do { id = Math.floor(Math.random() * SV_N); n++; } while (v.used.includes(id) && n < 50);
            v.hist = v.hist || []; v.hist.push(v.styleId);
            v.used.push(id); if (v.used.length > 365) v.used = v.used.slice(-365);
            v.styleId = id; v.over = {}; if (!v.keepColors) v.colors = {};
            svSync(); svSave(); schedule();
        };
        q('#svPrev').onclick = () => {
            const v = S.sv; if (!v.hist || !v.hist.length) { toast('पहले वाला style नहीं है।', 'info'); return; }
            v.styleId = v.hist.pop(); v.over = {}; if (!v.keepColors) v.colors = {}; svSync(); svSave(); schedule();
        };
        q('#svToday').onclick = () => { const v = S.sv; v.hist = v.hist || []; v.hist.push(v.styleId); v.styleId = -1; v.over = {}; if (!v.keepColors) v.colors = {}; svSync(); svSave(); schedule(); };
        q('#svNextQ').onclick = () => { S.sv.quote = svNextQuote(); q('[data-sv="quote"]').value = S.sv.quote; svSave(); schedule(); };
        q('#svFromEd').onclick = () => {
            const ed = document.getElementById('editor');
            const txt = ed ? (ed.innerText || ed.textContent || '').trim() : '';
            if (!txt) { toast('Editor खाली है — पहले वहाँ text type करें।', 'warning'); return; }
            S.sv.quote = txt; q('[data-sv="quote"]').value = txt; schedule();
        };
        const pick = (btn, file, key, max, q2) => {
            q(btn).onclick = () => q(file).click();
            q(file).onchange = async () => {
                const f = q(file).files && q(file).files[0]; q(file).value = '';
                if (!f) return;
                try {
                    const url = await fileToDataUrl(f, max, q2);
                    S.sv[key + 'Url'] = url; S.sv[key] = await loadImg(url);
                    if (key === 'photo') { S.sv.pz = 1; S.sv.px = 0; S.sv.py = 0; }
                    svSync(); svSave(); schedule();
                } catch (e) { toast('यह फोटो नहीं खुली — कोई दूसरी चुनें।', 'warning'); }
            };
        };
        pick('#svPhotoBtn', '#svPhotoFile', 'photo', 800, 0.88);
        pick('#svBgBtn', '#svBgFile', 'bg', 1600, 0.8);
        q('#svPhotoDel').onclick = () => { S.sv.photo = null; S.sv.photoUrl = ''; svSave(); schedule(); };
        q('#svBgDel').onclick = () => { S.sv.bg = null; S.sv.bgUrl = ''; svSave(); schedule(); };
        const cw = q('#svColors');
        SV_COLOR_KEYS.forEach(c => {
            const lab = el('label', null, '<input type="color" data-c="' + c[0] + '"> ' + c[1]);
            cw.appendChild(lab);
        });
        modal.querySelectorAll('[data-c]').forEach(inp => inp.addEventListener('input', () => { S.sv.colors[inp.getAttribute('data-c')] = inp.value; if (inp.getAttribute('data-c') === 'overlay' && !S.sv.ov) { S.sv.ov = 30; svSync(); } svSave(); schedule(); }));
        q('#svKeep').onchange = () => { S.sv.keepColors = q('#svKeep').checked; svSave(); };
        q('#svPosReset').onclick = () => { S.sv.pos = null; S.sv.psz = 1; if (S.sv.over.side > 1) delete S.sv.over.side; svSync(); svSave(); schedule(); };
        q('#svPhotoLayer').onclick = () => { S.sv.photoFront = !S.sv.photoFront; svSync(); svSave(); schedule(); };
        q('#svBgLayer').onclick = () => { S.sv.bgFront = !S.sv.bgFront; svSync(); svSave(); schedule(); };
        svDragBind();
        q('#svResetC').onclick = () => { S.sv.colors = {}; svSync(); svSave(); schedule(); };
    }
    // ✋ फोटो drag (mouse + touch)
    function svDragBind() {
        const cv = modal.querySelector('#hkpCanvas'); if (!cv || cv._svDrag) return; cv._svDrag = true;
        let drag = null;
        const pt = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * cv.width, y: (e.clientY - r.top) / r.height * cv.height }; };
        const onPhoto = p => { const b = S._pr; return S.tpl === 'suvichar' && b && p.x >= b.x && p.x <= b.x + b.s && p.y >= b.y && p.y <= b.y + b.s; };
        cv.addEventListener('pointerdown', e => {
            const p = pt(e); if (!onPhoto(p)) return;
            const b = S._pr; drag = { dx: p.x - (b.x + b.s / 2), dy: p.y - (b.y + b.s / 2) };
            try { cv.setPointerCapture(e.pointerId); } catch (x) {}
            cv.style.cursor = 'grabbing'; e.preventDefault();
        });
        cv.addEventListener('pointermove', e => {
            const p = pt(e);
            if (!drag) { cv.style.cursor = onPhoto(p) ? 'grab' : ''; return; }
            S.sv.pos = { x: Math.max(0, Math.min(1, (p.x - drag.dx) / cv.width)), y: Math.max(0, Math.min(1, (p.y - drag.dy) / cv.height)) };
            schedule(); e.preventDefault();
        });
        const end = () => { if (!drag) return; drag = null; cv.style.cursor = 'grab'; svSave(); };
        cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
        cv.style.touchAction = 'none';
    }
    function svSync() {
        if (!modal) return;
        const st = svStyle(), C = svColors(st), v = S.sv;
        const raw = svStyleRaw();
        modal.querySelectorAll('[data-o]').forEach(sel => { sel.value = String(raw[sel.getAttribute('data-o')]); });
        modal.querySelectorAll('[data-sv]').forEach(inp => { const k = inp.getAttribute('data-sv'); if (document.activeElement !== inp) inp.value = v[k] || ''; });
        modal.querySelectorAll('[data-c]').forEach(inp => { const c = C[inp.getAttribute('data-c')]; if (/^#[0-9a-f]{6}$/i.test(c)) inp.value = c; });
        const pr = modal.querySelector('[data-r="pz"]'); if (pr) pr.value = Math.round(v.pz * 100);
        const xr = modal.querySelector('[data-r="px"]'); if (xr) xr.value = Math.round(v.px * 100);
        const yr = modal.querySelector('[data-r="py"]'); if (yr) yr.value = Math.round(v.py * 100);
        const or = modal.querySelector('[data-r="ov"]'); if (or) { or.value = v.ov; modal.querySelector('#svOvV').textContent = v.ov + '%'; }
        const zr = modal.querySelector('[data-r="psz"]'); if (zr) { zr.value = Math.round((v.psz || 1) * 100); modal.querySelector('#svPszV').textContent = zr.value + '%'; }
        const fr = modal.querySelector('[data-r="bfa"]'); if (fr) { fr.value = Math.round((v.bfa == null ? 0.35 : v.bfa) * 100); modal.querySelector('#svBfaV').textContent = fr.value + '%'; }
        const pl = modal.querySelector('#svPhotoLayer'); if (pl) { pl.textContent = v.photoFront ? '📷 फोटो: text के आगे' : '📷 फोटो: text के पीछे'; pl.classList.toggle('on', !!v.photoFront); }
        const bl = modal.querySelector('#svBgLayer'); if (bl) { bl.textContent = v.bgFront ? '🔁 Background: text के आगे' : '🔁 Background: text के पीछे'; bl.classList.toggle('on', !!v.bgFront); }
        const br = modal.querySelector('#svBfaRow'); if (br) br.style.display = v.bgFront ? '' : 'none';
        modal.querySelectorAll('[data-qpos]').forEach(b => b.classList.toggle('on', b.getAttribute('data-qpos') === v.qpos));
        const kp = modal.querySelector('#svKeep'); if (kp) kp.checked = !!v.keepColors;
        const no = modal.querySelector('#svStyleNo');
        if (no) no.textContent = v.styleId < 0 ? '· आज का (' + (dayOfYear(new Date()) + 1) + '/365)' : '· Random #' + v.styleId;
    }


    // ------------------------------------------------------------
    // 💼 PRO panel — design, font, logo, background, रंग (save इसी device में)
    // ------------------------------------------------------------
    const PRO_STORE = 'hk_poster_pro_v1';
    let proLoaded = false, proSaveT = 0;
    function proSave() {
        clearTimeout(proSaveT);
        proSaveT = setTimeout(() => {
            const p = S.pro;
            const o = { design: p.design, hf: p.hf, mf: p.mf, colors: p.colors, ov: p.ov, size: S.size, tpl: S.tpl, logoUrl: p.logoUrl, bgUrl: p.bgUrl };
            try { localStorage.setItem(PRO_STORE, JSON.stringify(o)); }
            catch (e) { try { o.bgUrl = ''; localStorage.setItem(PRO_STORE, JSON.stringify(o)); toast('Background बहुत बड़ी है — याद नहीं रखी गई (poster में लगी है)।', 'warning'); } catch (e2) {} }
        }, 400);
    }
    async function proLoad() {
        if (proLoaded) return; proLoaded = true;
        let o = null; try { o = JSON.parse(localStorage.getItem(PRO_STORE) || 'null'); } catch (e) {}
        if (!o) return;
        const p = S.pro;
        ['design', 'hf', 'mf', 'colors'].forEach(k => { if (o[k] && typeof o[k] === 'object') p[k] = Object.assign(p[k], o[k]); });
        if (typeof o.ov === 'number') p.ov = o.ov;
        if (o.size && SIZES[o.size]) S.size = o.size;
        if (o.tpl && TEMPLATES[o.tpl]) S.tpl = o.tpl;
        p.logoUrl = o.logoUrl || ''; p.bgUrl = o.bgUrl || '';
        p.logo = await loadImg(p.logoUrl); p.bg = await loadImg(p.bgUrl);
    }
    function proBind() {
        const q = s => modal.querySelector(s);
        const fonts = SV_FONTS.map(f => f.n);
        svFillSelect(q('#proHf'), fonts); svFillSelect(q('#proMf'), fonts);
        q('#proDesign').onchange = () => { S.pro.design[S.tpl] = +q('#proDesign').value; proSave(); schedule(); };
        q('#proNext').onclick = () => { const n = (PRO_DESIGNS[S.tpl] || []).length || 1; S.pro.design[S.tpl] = ((S.pro.design[S.tpl] || 0) + 1) % n; proSync(); proSave(); schedule(); };
        q('#proHf').onchange = () => { S.pro.hf[S.tpl] = +q('#proHf').value; proSave(); schedule(); };
        q('#proMf').onchange = () => { S.pro.mf[S.tpl] = +q('#proMf').value; proSave(); schedule(); };
        const pick = (btn, file, key, max, qq) => {
            q(btn).onclick = () => q(file).click();
            q(file).onchange = async () => {
                const f = q(file).files && q(file).files[0]; q(file).value = '';
                if (!f) return;
                try {
                    const url = key === 'logo' ? await fileToPng(f, max) : await fileToDataUrl(f, max, qq);
                    S.pro[key + 'Url'] = url; S.pro[key] = await loadImg(url);
                    proSave(); schedule();
                } catch (e) { toast('यह फोटो नहीं खुली — कोई दूसरी चुनें।', 'warning'); }
            };
        };
        pick('#proLogoBtn', '#proLogoFile', 'logo', 512);
        pick('#proBgBtn', '#proBgFile', 'bg', 1920, 0.8);
        q('#proLogoDel').onclick = () => { S.pro.logo = null; S.pro.logoUrl = ''; proSave(); schedule(); };
        q('#proBgDel').onclick = () => { S.pro.bg = null; S.pro.bgUrl = ''; proSave(); schedule(); };
        q('#proOv').addEventListener('input', () => { S.pro.ov = +q('#proOv').value; q('#proOvV').textContent = S.pro.ov + '%'; proSave(); schedule(); });
        const cw = q('#proColors');
        PRO_COLOR_KEYS.forEach(c => cw.appendChild(el('label', null, '<input type="color" data-pc="' + c[0] + '"> ' + c[1])));
        modal.querySelectorAll('[data-pc]').forEach(inp => inp.addEventListener('input', () => {
            const t = S.tpl; S.pro.colors[t] = S.pro.colors[t] || {}; S.pro.colors[t][inp.getAttribute('data-pc')] = inp.value; proSave(); schedule();
        }));
        q('#proResetC').onclick = () => { S.pro.colors[S.tpl] = {}; proSync(); proSave(); schedule(); };
    }
    // logo: PNG रखें (transparent पृष्ठभूमि बची रहे)
    function fileToPng(file, maxSide) {
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => { const img = new Image(); img.onload = () => { const sc = Math.min(1, maxSide / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL('image/png')); }; img.onerror = rej; img.src = fr.result; };
            fr.onerror = rej; fr.readAsDataURL(file);
        });
    }
    function proSync() {
        if (!modal || S.tpl === 'suvichar' || !PRO_DESIGNS[S.tpl]) return;
        const q = s => modal.querySelector(s);
        svFillSelect(q('#proDesign'), PRO_DESIGNS[S.tpl]);
        q('#proDesign').value = String(S.pro.design[S.tpl] || 0);
        q('#proHf').value = String(proFont('h')); q('#proMf').value = String(proFont('m'));
        q('#proOv').value = S.pro.ov; q('#proOvV').textContent = S.pro.ov + '%';
        const P = proP(), map = { bg1: P.bg[0], bg2: P.bg[1], head: P.head, fg: P.fg, acc: P.acc, card: P.card };
        modal.querySelectorAll('[data-pc]').forEach(inp => { const v = map[inp.getAttribute('data-pc')]; if (/^#[0-9a-f]{6}$/i.test(v)) inp.value = v; });
    }

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
        ['sub', 'heading', 'message', 'from', 'footer'].forEach(f => {
            if (force || !S.edited[f]) {
                S[f] = d[f] || '';
                const inp = modal.querySelector('[data-f="' + f + '"]');
                if (inp) inp.value = d[f];
            }
        });
    }

    function renderChips() {
        const tplRow = modal.querySelector('#hkpTpl'), palRow = modal.querySelector('#hkpPal'), sizeRow = modal.querySelector('#hkpSize');
        tplRow.innerHTML = ''; palRow.innerHTML = '';
        Object.keys(TEMPLATES).forEach(key => {
            const b = el('button', { type: 'button', class: 'hkp-chip' + (S.tpl === key ? ' on' : '') }, TEMPLATES[key].name);
            b.onclick = () => { S.tpl = key; S.pal = 0; applyDefaults(false); proSave(); renderChips(); schedule(); };
            tplRow.appendChild(b);
        });
        TEMPLATES[S.tpl].palettes.forEach((p, i) => {
            const b = el('button', { type: 'button', class: 'hkp-sw' + (S.pal === i ? ' on' : ''), title: p.name, 'aria-label': p.name });
            b.style.background = 'linear-gradient(135deg,' + p.bg[0] + ',' + p.bg[1] + ' 60%,' + p.accent + ')';
            b.onclick = () => { S.pal = i; if (S.pro) { S.pro.colors[S.tpl] = {}; proSave(); } renderChips(); schedule(); };
            palRow.appendChild(b);
        });
        if (!SIZES[S.size]) S.size = 'square';
        sizeRow.innerHTML = Object.keys(SIZES).map(k2 => '<option value="' + k2 + '">' + SIZES[k2].label + ' — ' + SIZES[k2].w + '×' + SIZES[k2].h + '</option>').join('');
        sizeRow.value = S.size;
        const dev = modal.querySelector('#hkpDev');
        if (dev) dev.className = 'hkp-dev' + (SIZES[S.size].dev ? ' dev-' + SIZES[S.size].dev : '');
        proSync();
        const isSv = S.tpl === 'suvichar';
        const gen = modal.querySelector('#hkpGeneric'), svp = modal.querySelector('#hkpSv'), palW = modal.querySelector('#hkpPalWrap');
        if (gen) gen.style.display = isSv ? 'none' : 'flex';
        if (svp) svp.style.display = isSv ? 'flex' : 'none';
        if (palW) palW.style.display = isSv ? 'none' : '';
        if (isSv) svSync();
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
      <div id="hkpPalWrap"><label>रंग</label><div class="hkp-row" id="hkpPal"></div></div>
      <div><label>📐 Size / Preview (Mobile · Tab · Desktop)</label><select id="hkpSize"></select></div>
      <div><label>⌨️ Typing भाषा (poster के सब box)</label><select id="hkpLang"></select></div>
      <div id="hkpGeneric" style="display:flex;flex-direction:column;gap:9px;">
      <div class="hkp-sec">💼 Professional Design</div>
      <div class="hkp-svgrid">
        <div><label>Design</label><select id="proDesign"></select></div>
        <div><label>शीर्षक font</label><select id="proHf"></select></div>
        <div><label>संदेश font</label><select id="proMf"></select></div>
        <div><label>&nbsp;</label><button type="button" class="hkp-chip" id="proNext" style="width:100%;">🎲 अगला Design</button></div>
      </div>
      <div class="hkp-sec">✍️ Text</div>
      <div><label>ऊपर की पंक्ति (संस्था / उप-शीर्षक)</label><input type="text" data-f="sub" placeholder="जैसे ग्राम पंचायत पोड़ैयाहाट"></div>
      <div><label>शीर्षक (Heading)</label><input type="text" data-f="heading"></div>
      <div><label>संदेश (Message)</label><textarea data-f="message"></textarea>
        <div class="hkp-row" style="margin-top:5px;"><button type="button" class="hkp-chip" id="hkpFromEditor">📝 Editor से Text लें</button></div></div>
      <div><label>नाम / संस्था</label><input type="text" data-f="from"></div>
      <div><label>तारीख (वैकल्पिक)</label><input type="text" data-f="date" placeholder="जैसे 15/11/2026"></div>
      <div><label>नीचे की पंक्ति (संपर्क / पता, वैकल्पिक)</label><input type="text" data-f="footer" placeholder="जैसे 📞 98xxxxxx · पोड़ैयाहाट"></div>
      <div class="hkp-sec">🏷️ Logo</div>
      <div class="hkp-row"><button type="button" class="hkp-btn" id="proLogoBtn">🏷️ Logo लगाएँ</button><button type="button" class="hkp-btn ghost" id="proLogoDel">🗑️ हटाएँ</button></div>
      <input type="file" accept="image/*" id="proLogoFile" style="display:none">
      <div class="hkp-sec">🖼️ Background</div>
      <div class="hkp-row"><button type="button" class="hkp-btn" id="proBgBtn">🖼️ अपनी Background</button><button type="button" class="hkp-btn ghost" id="proBgDel">↩️ Built-in</button></div>
      <input type="file" accept="image/*" id="proBgFile" style="display:none">
      <div><label>परत (Overlay): <span id="proOvV">45%</span></label><input type="range" min="0" max="85" step="5" value="45" id="proOv" style="width:100%;"></div>
      <div class="hkp-sec">🌈 रंग (हर चीज़)</div>
      <div class="hkp-svcolors" id="proColors"></div>
      <div class="hkp-row"><button type="button" class="hkp-chip" id="proResetC">♻️ रंग reset</button></div>
      <div class="hkp-note">ऊपर के रंग-गोले से तैयार रंग-set चुनें, या यहाँ हर हिस्से का रंग खुद चुनें। Logo, background, design और रंग इसी device में याद रहते हैं।</div>
      </div>
      ${SV_PANEL}
      <div><label>Text का आकार: <span id="hkpScaleV">100%</span></label><input type="range" min="70" max="130" step="5" value="100" id="hkpScale" style="width:100%;"></div>
      <div class="hkp-note">ऊपर "Typing भाषा" चुनकर computer keyboard से सीधे Ol Chiki / हिन्दी / Santali लिखें। Mobile पर phone का अपना keyboard चलेगा, या App के Editor में लिखकर "Editor से" दबाएँ।</div>
      <div class="hkp-note" id="hkpWm"></div>
      <div class="hkp-row"><button type="button" class="hkp-btn" id="hkpDl">⬇️ PNG</button><button type="button" class="hkp-btn alt" id="hkpShare">📲 Share</button><button type="button" class="hkp-btn ghost" id="hkpPrint">🖨️ Print</button></div>
    </div>
    <div class="hkp-prev"><div class="hkp-dev" id="hkpDev"><canvas id="hkpCanvas" aria-label="Poster preview"></canvas></div></div>
  </div>
</div>`;
        document.body.appendChild(modal);
        canvas = modal.querySelector('#hkpCanvas');

        modal.addEventListener('click', close);
        modal.querySelector('.hkp-close').onclick = close;
        modal.querySelectorAll('[data-f]').forEach(inp => {
            inp.addEventListener('input', () => { const f = inp.getAttribute('data-f'); S[f] = inp.value; if (f in S.edited) S.edited[f] = true; schedule(); });
        });
        svBind();
        proBind();
        const szSel = modal.querySelector('#hkpSize');
        szSel.onchange = () => { S.size = szSel.value; proSave(); renderChips(); schedule(); };
        // App के global key handlers इन fields में typing न रोकें + चुनी हुई भाषा में typing
        modal.querySelectorAll('input[type=text],textarea').forEach(inp => {
            inp.addEventListener('keydown', e => { if (e.key !== 'Escape') e.stopPropagation(); svTypeKey(e); });
        });
        const ls = modal.querySelector('#hkpLang');
        ls.innerHTML = SV_LANGS.map(l => '<option value="' + l[0] + '">' + l[1] + (svLangAllowed(l[0]) ? '' : ' 🔒') + '</option>').join('');
        ls.value = S.lang || 'app';
        ls.onchange = () => {
            if (!svLangAllowed(ls.value)) { toast('🔒 यह भाषा आपके plan में नहीं है।', 'warning'); ls.value = S.lang || 'app'; return; }
            S.lang = ls.value; svSave();
        };
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
        S.exporting = true;
        try { draw(canvas); } finally { S.exporting = false; }
        return new Promise(res => canvas.toBlob(b => { res(b); schedule(); }, 'image/png'));
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
        svEnsureFontsCss();
        await svLoad();
        await proLoad();
        build();
        if (!S.sv.quote) S.sv.quote = svDailyQuote();
        if (!S.heading && !S.message) applyDefaults(true);
        const ls = modal.querySelector('#hkpLang');
        if (ls) { Array.from(ls.options).forEach(o => { const l = SV_LANGS.find(x => x[0] === o.value); if (l) o.textContent = l[1] + (svLangAllowed(l[0]) ? '' : ' 🔒'); }); ls.value = S.lang || 'app'; }
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
    window.__hkPoster = { draw, S, TEMPLATES, SIZES, wrap, svStyle, svDecode, svStyleId, SV_N, SV_QUOTES };
})();
