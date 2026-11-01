// index.js — hor-katha-api (Secure OTP Worker)
// Env bindings:
//   OTP_STORE (KV)                 — पहले जैसा
//   BREVO_API_KEY (secret)         — पहले जैसा
//   TRIAL_SIGNING_KEY (secret)     — नया: trial token sign करने की private key (JWK)
//   FIREBASE_SERVICE_ACCOUNT (secret, optional) — Firebase में trial रिकॉर्ड लिखने के लिए
//   LICENSE_PUBLIC_JWK (variable) — नया: Pro key verify करने की PUBLIC key (JWK JSON), session login के लिए
//   FIREBASE_DB_URL (variable, optional) — e.g. https://hor-katha-tracker-default-rtdb.asia-southeast1.firebasedatabase.app

const ALLOWED_ORIGINS = [
  "https://horkathasuite.pages.dev",
  "http://localhost:8788",
  "http://127.0.0.1:5500",
  "null" // Electron / file:// app
];

const OTP_TTL_SEC = 300;          // OTP 5 मिनट वैध
const RESEND_GAP_SEC = 60;        // एक email पर 60 सेकंड में 1 OTP
const MAX_SENDS_PER_EMAIL_HOUR = 5;
const MAX_SENDS_PER_IP_HOUR = 10;
const MAX_VERIFY_ATTEMPTS = 5;    // 5 गलत OTP के बाद OTP रद्द
const FREE_OTP_TRIAL = false;     // true = बिना ₹9 key के मुफ़्त trial भी चालू; false = सिर्फ़ ₹9 HKT key से

function corsHeadersFor(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".horkathasuite.pages.dev");
  return {
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" }
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function normalizeEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  if (e.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return null;
  return e;
}

function secureOtp() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(100000 + (buf[0] % 900000));
}

function timingSafeEqual(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function bumpCounter(kv, key, ttl) {
  const n = parseInt((await kv.get(key)) || "0", 10) + 1;
  await kv.put(key, String(n), { expirationTtl: ttl });
  return n;
}


// ─── TRIAL TOKEN (ECDSA P-256 signed) ───
const TRIAL_DAYS = 7;

function b64url(bytes) {
  let bin = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlText(str) { return b64url(new TextEncoder().encode(str)); }

async function sha256Hex(str) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join("");
}

let _signKeyCache = null;
async function getSigningKey(env) {
  if (_signKeyCache) return _signKeyCache;
  if (!env.TRIAL_SIGNING_KEY) throw new Error("TRIAL_SIGNING_KEY missing");
  const jwk = JSON.parse(env.TRIAL_SIGNING_KEY);
  _signKeyCache = await crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  return _signKeyCache;
}

async function signTrial(env, payload) {
  const token = b64urlText(JSON.stringify(payload));
  const key = await getSigningKey(env);
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(token));
  return { token, sig: b64url(sig) };
}


// ─── OPTIONAL: Firebase में रिकॉर्ड (service account से, rules bypass) ───
async function googleAccessToken(env) {
  const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const header = b64urlText(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64urlText(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
  }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const jwt = `${header}.${claim}.${b64url(sig)}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Google token failed");
  return data.access_token;
}

async function saveTrialToFirebase(env, id, record) {
  if (!env.FIREBASE_SERVICE_ACCOUNT || !env.FIREBASE_DB_URL) return;
  try {
    const token = await googleAccessToken(env);
    await fetch(`${env.FIREBASE_DB_URL.replace(/\/$/, "")}/trial_activations/${id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(record)
    });
  } catch (e) { console.error("Firebase save failed:", e.message); }
}

// ─── 🎓 CERTIFICATE: server-side signing ───
const CERT_GRADES = [
  { grade: "A+", minWpm: 60, minAcc: 95 },
  { grade: "A",  minWpm: 45, minAcc: 92 },
  { grade: "B",  minWpm: 30, minAcc: 88 },
  { grade: "C",  minWpm: 20, minAcc: 80 }
];
const MAX_CERTS_PER_IP_HOUR = 20;
const PUBLIC_CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

function certGrade(wpm, acc) {
  for (const g of CERT_GRADES) if (wpm >= g.minWpm && acc >= g.minAcc) return g.grade;
  return "D";
}
function parseDurationSec(d) {
  const m = /^(\d{1,3}):(\d{2})$/.exec(String(d || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
}
function cleanText(v, max) {
  return String(v || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

// सभी जाँच के बाद ही sign; ग़लत डेटा पर { error }
function validateCert(b) {
  const no = String(b.no || "").trim().toUpperCase();
  if (!/^HK-(BAS|ADV|JOB)-\d{6}-[A-Z0-9]{4,8}$/.test(no)) return { error: "Invalid certificate number" };
  const name = cleanText(b.name, 60);
  if (name.length < 2) return { error: "Name required" };
  const wpm = Math.round(Number(b.wpm));
  const acc = Math.round(Number(b.acc) * 10) / 10;
  if (!Number.isFinite(wpm) || wpm < 1 || wpm > 200) return { error: "WPM out of range" };
  if (!Number.isFinite(acc) || acc < 0 || acc > 100) return { error: "Accuracy out of range" };
  const chars = Math.round(Number(b.chars) || 0);
  const errors = Math.round(Number(b.errors) || 0);
  const sec = parseDurationSec(b.dur);
  if (sec < 15 || sec > 3600) return { error: "Test duration too short" };
  if (chars < 20 || errors < 0 || errors > chars) return { error: "Invalid character count" };
  // Net WPM, typed characters से ज़्यादा नहीं हो सकती (थोड़ी rounding छूट)
  const grossWpm = (chars / 5) / (sec / 60);
  if (wpm > grossWpm * 1.15 + 2) return { error: "Result not consistent" };
  const date = String(b.date || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Invalid date" };
  const dt = Date.parse(date + "T00:00:00Z");
  if (!dt || Math.abs(Date.now() - dt) > 2 * 86400000) return { error: "Date must be today" };
  const cat = ["basic", "advanced", "job"].includes(b.cat) ? b.cat : "basic";
  return { cert: {
    typ: "cert", v: 1, no, name, wpm, acc, grade: certGrade(wpm, acc), date, cat,
    lesson: cleanText(b.lesson, 40), chars, errors, dur: String(b.dur).trim(), iat: Date.now()
  } };
}

// ─── ⌨️ SERVER-SIDE TYPING PROOF ───
// typing-test.js के TT_LESSONS के हर passage का sha256 (पहले 32 hex)। Lessons बदलें तो यह सूची फिर बनाएँ।
const LESSON_HASHES = new Set(["706a20ebd554fe39357a1418b7d0ac0b","b5ef786b1da65149018d5bdca8732713","2b0b4bed4f0e2dc9219c1d1b733374a2","e5d698167a7f61671d058b0605d3c601","d25e491899b844ca9f5d747c4ae76bf1","8a3523e31c6c874f151e7425d39310bf","4edf084e65d35d5a55edb7c5c9a532a5","f683877f25d14663b5db03000c951ce2","67d359a72b0f5eca3b9983ba7d2f2635","4bd5745c81936b04edede711132a8994","9ea57b9dbaed34a949c950fe20b24217","6cfc383a34a461c6e007d09fdd2fb3dd","cccff2f42d7341dc524dfd960c6a9137","c1d0c6060c421d8254c01f4a34f11eb6","ba11402913fb79ceed394146fa8146fe","1d0ce6ea8c282bb54712fbd9e7a9f2c2","b9ac532c92c433b16bafc615d7f5a916","d1bd499312f02338c0c6f3a33ddb1fc9","b8bc24bf0fa6c7ffe4e8561ba42239f1","70561d45cc1a4913cb0f288e1efa11ae","10ae9fe8dcbe380d24fdf240a75a7f6e","0289cc7427281625b06e25613c715dc8","58745d65d814153773d082dff03c491d","a5aa23e67f9760063fcbeba7269c0bb7","3f4ed29264d2ea0e37dec52d1a60341e","0a41861dbbc2a6c85e4b3a22d610c5a8","5a39ee4b8f4c5ad5f390a83ea1b3324b","8897ada88973e82cd1356f796b0f9a92","fcdcf3320bd1d96ef7197a47035cdc5b","96f00be75dcf5ef8ae7672eb77962b63","f4e82a280ccc1aa3a101698ae968cdac","9f8eda52916d6a7272b85e56d6eedad4","2d4e61cb63bd4d669bbd6a7d5f34dbf6","cd582ee582b9a32e8ad35b87baf8cd90","fd103e8d2e891862557290bf3ee36d57","08ce21d87852afde348fef20eda515e2","1dd4cde6cd3e65520573cc253ea513c4","21f9d5b996b2f0246f5d4dba7027c1c1","d12b8444c56af6b22949e04568c2c704","b274b76d2c27bb2c9ea376709e2410ac","387d019fd88575d7fef5520632748712","1259688d2bf515e263e1ede7917bbf70","3df97e636c545d6d98a05c27f4aaaff1","c5c35ed799cafc1e976a9933cdb3024e","162c4b9e43160052a0673ffefd6f092a","f8517b55373a94f494e32458fdd66b5d","0f00d3229052c57c7190e99f0e925a58","2d789319913cb5ba369763e401e28844","4b116c2b8c3622a9b2716313d9422182","326fca2c9b04e33e5e97b78b3e05bc9c","8eee4e54308de1abbd342acb9746b863","ee29354648dc5203738da612242fdb9d","607c121111f670ca7b701059882d1523","7951a641f33a89ebc3e0b44035bad3a0","81dca4dd458db979c289897923e59a66","2257995b29731ca4db8d466e3e8ec734","80955671941e17a918d457514ff93567","0e3c71266bf192f7e9b556370a874619","1e6634c5a8c46d60fb860d64182710aa"]);
const REQUIRE_TYPING_PROOF = true;  // true = बिना server-जाँचे test के certificate sign नहीं होगा
const MAX_PROOF_PAUSE_SEC = 15;     // test में 15 सेकंड से ज़्यादा pause हो तो certificate नहीं
const MAX_TEST_STARTS_PER_IP_HOUR = 120;

function randomHex(bytes) {
  const a = new Uint8Array(bytes); crypto.getRandomValues(a);
  return [...a].map(b => b.toString(16).padStart(2, "0")).join("");
}

// typed बनाम passage: chars/errors/accuracy, और keystroke timing की बुनियादी जाँच
function scoreTyping(text, typed, ks) {
  if (typeof typed !== "string" || typed.length < 1) return { error: "Typed text missing" };
  const t = text, u = typed; // client की तरह UTF-16 index
  if (u.length > t.length) return { error: "Typed text too long" };
  let correct = 0;
  for (let i = 0; i < u.length; i++) if (u[i] === t[i]) correct++;
  const chars = u.length, errors = chars - correct;
  if (!Array.isArray(ks) || ks.length > 6000) return { error: "Keystroke data missing" };
  const iv = ks.map(Number).filter(x => Number.isFinite(x) && x >= 0 && x <= 600000);
  if (iv.length < Math.floor(chars * 0.5)) return { error: "Keystrokes do not match typed text" };
  const typingGaps = iv.filter(x => x > 0 && x < 3000);
  if (typingGaps.length >= 20) {
    const sorted = [...typingGaps].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const mean = typingGaps.reduce((a, b) => a + b, 0) / typingGaps.length;
    const sd = Math.sqrt(typingGaps.reduce((a, b) => a + (b - mean) ** 2, 0) / typingGaps.length);
    if (median < 15) return { error: "Typing too fast to be human" };
    if (mean > 0 && sd / mean < 0.08) return { error: "Typing rhythm looks automated" };
  }
  const activeSec = typingGaps.reduce((a, b) => a + b, 0) / 1000;
  return { chars, errors, correct, acc: chars ? Math.round((correct / chars) * 100) : 100, activeSec };
}

// ─── 🏆 WEEKLY LEADERBOARD (सिर्फ़ server-जाँचे certificates) ───
const LB_MIN_SEC = 60, LB_MIN_ACC = 85, LB_KEEP = 100;
function lbWeekKey(ts) {
  // IST में सोमवार से शुरू होने वाला हफ़्ता
  const d = new Date(ts + 5.5 * 3600000);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}
function lbPublicName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "User";
  const first = parts[0].slice(0, 20);
  return parts.length > 1 ? `${first} ${Array.from(parts[parts.length - 1])[0].toUpperCase()}.` : first;
}
async function lbAdd(env, c, sec) {
  if (sec < LB_MIN_SEC || c.acc < LB_MIN_ACC) return;
  const key = `lb:${lbWeekKey(Date.now())}`;
  let list = [];
  try { list = JSON.parse((await env.OTP_STORE.get(key)) || "[]"); } catch (e) { list = []; }
  const id = `${c.name.toLowerCase()}|${c.cat}`;
  const entry = { id, name: lbPublicName(c.name), wpm: c.wpm, acc: c.acc, cat: c.cat, grade: c.grade, date: c.date };
  const i = list.findIndex(x => x.id === id);
  if (i >= 0) { if (list[i].wpm > c.wpm || (list[i].wpm === c.wpm && list[i].acc >= c.acc)) return; list.splice(i, 1); }
  list.push(entry);
  list.sort((a, b) => b.wpm - a.wpm || b.acc - a.acc);
  await env.OTP_STORE.put(key, JSON.stringify(list.slice(0, LB_KEEP)), { expirationTtl: 86400 * 70 });
}

// ─── 🎁 REFERRAL CODES ───
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
async function referralCodeFor(licenseKey) {
  const h = await sha256Hex("hkref|" + licenseKey);
  let out = "";
  for (let i = 0; i < 6; i++) out += REF_ALPHABET[parseInt(h.slice(i * 2, i * 2 + 2), 16) % REF_ALPHABET.length];
  return "HKR-" + out;
}
function fbSafeKey(k) { return /^[A-Za-z0-9_-]{6,200}$/.test(k); }

async function firebaseReq(env, path, method, body) {
  if (!env.FIREBASE_SERVICE_ACCOUNT || !env.FIREBASE_DB_URL) return null;
  const token = await googleAccessToken(env);
  const res = await fetch(`${env.FIREBASE_DB_URL.replace(/\/$/, "")}/${path}.json`, {
    method,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return res.ok ? res.json() : null;
}

async function issueTrial(env, ctx, { email, name, mobile }) {
  const emailId = (await sha256Hex(email)).slice(0, 32);
  const existingRaw = await env.OTP_STORE.get(`trial:${emailId}`);
  let rec = existingRaw ? JSON.parse(existingRaw) : null;


  const now = Date.now();
  if (rec) {
    if (now >= rec.expiresAt) {
      return { error: "❌ इस Email पर trial पहले ही expire हो चुका है। Pro खरीदें।", status: 403 };
    }
  } else {
    rec = { email, name: name.slice(0, 60), mobile: String(mobile || "").slice(0, 20), activatedAt: now, expiresAt: now + TRIAL_DAYS * 86400000 };
    await env.OTP_STORE.put(`trial:${emailId}`, JSON.stringify(rec));
    ctx.waitUntil(saveTrialToFirebase(env, emailId, { ...rec, createdBy: "worker" }));
  }

  const payload = { v: 1, email: rec.email, tier: "P3_TRIAL", activatedAt: rec.activatedAt, expiresAt: rec.expiresAt, iat: now };
  const { token, sig } = await signTrial(env, payload);
  return { trial: { email: rec.email, name: rec.name, mobile: rec.mobile, tier: "P3_TRIAL", activatedAt: rec.activatedAt, expiresAt: rec.expiresAt, token, sig, reactivated: !!existingRaw } };
}

// ─── ₹9 HKT Trial Key redeem (OTP से email सत्यापित होने के बाद) ───
function normMobile(m) {
  let x = String(m || "").replace(/[^0-9]/g, "");
  if (x.startsWith("0")) x = x.substring(1);
  if (x.startsWith("91") && x.length > 10) x = x.slice(-10);
  return x;
}
async function redeemTrialKey(env, ctx, { email, name, mobile, key }) {
  const k = String(key || "").trim().toUpperCase();
  if (!/^HKT-\d{7}-[0-9A-F]{4}$/.test(k)) return { error: "Trial Key का format गलत है (HKT-XXXXXXX-XXXX)", status: 400 };
  if (!env.FIREBASE_SERVICE_ACCOUNT || !env.FIREBASE_DB_URL) return { error: "Server config अधूरी है", status: 500 };
  // पुरानी keys lowercase suffix के साथ save हुई थीं
  const candidates = [k, k.slice(0, 12) + k.slice(12).toLowerCase()];
  let path = null, rec = null;
  for (const c of candidates) {
    const r = await firebaseReq(env, `smart_trial/keys/${c}`, "GET");
    if (r) { path = `smart_trial/keys/${c}`; rec = r; break; }
  }
  if (!rec) return { error: "यह Trial Key हमारे record में नहीं है। Admin से संपर्क करें।", status: 404 };
  if (rec.status === "revoked" || rec.status === "deactivated") return { error: "यह Trial Key रद्द कर दी गई है। Admin से संपर्क करें।", status: 403 };

  const recEmail = String(rec.email || "").trim().toLowerCase();
  const recMobile = normMobile(rec.mobile);
  if (recEmail !== email || (recMobile && recMobile !== normMobile(mobile))) {
    return { error: "यह Key किसी दूसरे Email/Mobile के लिए बनी है। Key बनवाते समय वाला Email और Mobile डालें।", status: 403 };
  }

  const now = Date.now();
  let activatedAt = Number(rec.activated_at) || 0;
  let expiresAt = Number(rec.trial_expires_at) || 0;

  if (activatedAt && expiresAt) {
    if (now >= expiresAt) return { error: "❌ इस Key का 7 दिन का trial खत्म हो चुका है। Pro खरीदें।", status: 403 };
  } else {
    if (rec.expires_at && now > Number(rec.expires_at)) return { error: "यह Key activate करने की समय-सीमा निकल चुकी है। Admin से संपर्क करें।", status: 403 };
    // एक साथ दो redeem न हों (email पर lock; Device ID इस्तेमाल नहीं होती)
    const lockKey = `hktlock:${k}`;
    const lockOwner = await env.OTP_STORE.get(lockKey);
    if (lockOwner && lockOwner !== email) return { error: "यह Key किसी दूसरे Email से activate हो रही है।", status: 409 };
    await env.OTP_STORE.put(lockKey, email, { expirationTtl: 86400 * 40 });
    activatedAt = now;
    expiresAt = now + TRIAL_DAYS * 86400000;
    await firebaseReq(env, path, "PATCH", {
      device: "CONTACT_LOCKED", activated_at: activatedAt, trial_expires_at: expiresAt, used: true, status: "active"
    });
    ctx.waitUntil(saveTrialToFirebase(env, `hkt_${k}`, {
      email, name: String(name || rec.customer_name || "User").slice(0, 60), mobile: recMobile || normMobile(mobile),
      activatedAt, expiresAt, createdBy: "hkt-key", key: k, price_paid: rec.price_paid || 9
    }));
  }

  const payload = { v: 1, email, tier: "P3_TRIAL", activatedAt, expiresAt, src: "hkt", iat: now };
  const { token, sig } = await signTrial(env, payload);
  return { trial: { key: k, email, name: String(name || rec.customer_name || "User").slice(0, 60), mobile: recMobile, tier: "P3_TRIAL", activatedAt, expiresAt, token, sig, reactivated: !!rec.activated_at } };
}


// ─── 👥 CONCURRENT LOGIN LIMITS (Device ID नहीं; license = email + mobile) ───
// Trial 1 · P1 1 · P2 3 · P3 5 · Institute seat 1. Limit पूरी होने पर सबसे पुराना login auto-logout.
const SESSION_LIMITS = { TRIAL: 1, P1: 1, P2: 3, P3: 5, SEAT: 1 };
const SESSION_IDLE_DAYS = 60; // 60 दिन से न दिखा session अपने-आप हट जाता है
function cleanSid(s) { s = String(s || ""); return /^[A-Za-z0-9_-]{16,64}$/.test(s) ? s : null; }
function hexToBytesW(hex) { if (!/^[0-9A-Fa-f]+$/.test(hex) || hex.length % 2) return null; const out = new Uint8Array(hex.length / 2); for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16); return out; }
async function verifyProKeyServer(env, { name, email, mobile, key }) {
  const k = String(key || "").trim().toUpperCase();
  const m = k.match(/^HKP-(P[123])-(\d{4,6})-([0-9A-F]{64,200})$/);
  if (!m) return { ok: false, error: "License key का format गलत है" };
  if (!env.LICENSE_PUBLIC_JWK) return { ok: false, error: "Server config अधूरी है (LICENSE_PUBLIC_JWK)", status: 500 };
  const [, plan, exp, sigHex] = m;
  if (exp !== "9999" && exp.length === 6) {
    const d = Date.UTC(2000 + +exp.slice(0, 2), +exp.slice(2, 4) - 1, +exp.slice(4, 6), 23, 59, 59);
    if (Date.now() > d + 86400000) return { ok: false, error: "License expire हो चुका है" };
  }
  const jwk = JSON.parse(env.LICENSE_PUBLIC_JWK);
  const pub = await crypto.subtle.importKey("jwk", { kty: jwk.kty || "EC", crv: jwk.crv || "P-256", x: jwk.x, y: jwk.y }, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  const sig = hexToBytesW(sigHex); if (!sig) return { ok: false, error: "Signature गलत है" };
  const cn = String(name || "").trim().toLowerCase(), ce = String(email || "").trim().toLowerCase();
  const variants = [...new Set([normMobile(mobile), String(mobile || "").trim()])].filter(Boolean);
  let valid = false;
  for (const mv of variants) {
    const msg = new TextEncoder().encode(`${cn}|${ce}|${mv}|${plan}|${exp}|BOSC-HKP-v3.7.8`);
    if (await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, pub, sig, msg)) { valid = true; break; }
  }
  if (!valid) return { ok: false, error: "Name/Email/Mobile इस key से मेल नहीं खाते" };
  const rv = await firebaseReq(env, `revoked/licenses/${k}`, "GET");
  if (rv && rv.revokedAt) return { ok: false, error: "License revoked है" };
  const kid = (await sha256Hex("hks|" + k)).slice(0, 40);
  const seat = await firebaseReq(env, `seat_limits/${kid}`, "GET");
  return { ok: true, key: k, tier: seat ? "SEAT" : plan };
}
async function verifyTrialKeyServer(env, { email, key }) {
  const k = String(key || "").trim().toUpperCase();
  if (!/^HKT-\d{7}-[0-9A-F]{4}$/.test(k)) return { ok: false, error: "Trial Key का format गलत है" };
  let rec = null;
  for (const c of [k, k.slice(0, 12) + k.slice(12).toLowerCase()]) { rec = await firebaseReq(env, `smart_trial/keys/${c}`, "GET"); if (rec) break; }
  if (!rec) return { ok: false, error: "Trial Key record में नहीं है" };
  if (rec.status === "revoked" || rec.status === "deactivated") return { ok: false, error: "Trial Key रद्द है" };
  if (String(rec.email || "").trim().toLowerCase() !== String(email || "").trim().toLowerCase()) return { ok: false, error: "यह Key इस Email की नहीं है" };
  if (Number(rec.trial_expires_at) && Date.now() >= Number(rec.trial_expires_at)) return { ok: false, error: "Trial खत्म हो चुका है" };
  return { ok: true, key: k, tier: "TRIAL" };
}
async function loadSessions(env, kid) {
  let list = [];
  try { list = JSON.parse((await env.OTP_STORE.get(`sess:${kid}`)) || "[]"); } catch (e) { list = []; }
  const cutoff = Date.now() - SESSION_IDLE_DAYS * 86400000;
  return Array.isArray(list) ? list.filter(x => x && x.sid && (x.seen || x.at) > cutoff) : [];
}
async function saveSessions(env, kid, list) {
  if (!list.length) return env.OTP_STORE.delete(`sess:${kid}`);
  return env.OTP_STORE.put(`sess:${kid}`, JSON.stringify(list), { expirationTtl: SESSION_IDLE_DAYS * 86400 });
}
function uaLabel(ua) {
  ua = String(ua || "");
  const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad/i.test(ua) ? "iOS" : /Windows/i.test(ua) ? "Windows" : /Mac OS/i.test(ua) ? "Mac" : /Linux/i.test(ua) ? "Linux" : "Other";
  const br = /Electron/i.test(ua) ? "App" : /Edg\//i.test(ua) ? "Edge" : /Chrome\//i.test(ua) ? "Chrome" : /Firefox\//i.test(ua) ? "Firefox" : /Safari\//i.test(ua) ? "Safari" : "Browser";
  return `${br} · ${os}`;
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeadersFor(request);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const url = new URL(request.url);
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";

    // ─── SEND OTP ───
    // 🎓 Certificate sign (app से)
    // ⌨️ Test शुरू: server समय दर्ज करता है
    if (url.pathname === "/test-start" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `tstart:${ip}`, 3600);
        if (n > MAX_TEST_STARTS_PER_IP_HOUR) return json({ error: "Too many tests" }, 429, cors);
        const body = await request.json().catch(() => ({}));
        const lh = String(body.lh || "").toLowerCase();
        if (!LESSON_HASHES.has(lh)) return json({ error: "Unknown lesson" }, 400, cors);
        const sid = randomHex(16);
        await env.OTP_STORE.put(`tsess:${sid}`, JSON.stringify({ lh, t1: Date.now() }), { expirationTtl: 7200 });
        return json({ success: true, sid }, 200, cors);
      } catch (e) { console.error("test-start:", e); return json({ error: "Server error" }, 500, cors); }
    }

    // ⌨️ Test खत्म: typed text + keystrokes जमा, result server पर तय
    if (url.pathname === "/test-finish" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const sid = String(body.sid || "");
        if (!/^[0-9a-f]{32}$/.test(sid)) return json({ error: "Invalid session" }, 400, cors);
        const raw = await env.OTP_STORE.get(`tsess:${sid}`);
        if (!raw) return json({ error: "Session expired" }, 404, cors);
        const sess = JSON.parse(raw);
        if (sess.t2) return json({ error: "Session already finished" }, 409, cors);
        const text = String(body.text || "");
        if ((await sha256Hex(text)).slice(0, 32) !== sess.lh) return json({ error: "Lesson mismatch" }, 400, cors);
        const sc = scoreTyping(text, String(body.typed || ""), body.ks);
        if (sc.error) return json({ error: sc.error }, 400, cors);
        const t2 = Date.now();
        const pause = Math.max(0, Math.min(3600, Number(body.pause) || 0));
        Object.assign(sess, { t2, pause, chars: sc.chars, errors: sc.errors, acc: sc.acc, activeSec: sc.activeSec });
        await env.OTP_STORE.put(`tsess:${sid}`, JSON.stringify(sess), { expirationTtl: 7200 });
        return json({ success: true, chars: sc.chars, errors: sc.errors, acc: sc.acc }, 200, cors);
      } catch (e) { console.error("test-finish:", e); return json({ error: "Server error" }, 500, cors); }
    }

    if (url.pathname === "/sign-cert" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `certip:${ip}`, 3600);
        if (n > MAX_CERTS_PER_IP_HOUR) return json({ error: "Too many certificates. 1 घंटे बाद कोशिश करें।" }, 429, cors);
        const body = await request.json().catch(() => ({}));

        // ⌨️ Typing proof: chars/errors/accuracy server के, समय server की घड़ी से सीमित
        let sess = null, sid = "";
        if (REQUIRE_TYPING_PROOF || body.sid) {
          sid = String(body.sid || "");
          const raw = /^[0-9a-f]{32}$/.test(sid) ? await env.OTP_STORE.get(`tsess:${sid}`) : null;
          if (!raw) return json({ error: "Typing test server पर दर्ज नहीं है। Internet चालू रखकर test दोबारा दें।", code: "NO_PROOF" }, 400, cors);
          sess = JSON.parse(raw);
          if (!sess.t2) return json({ error: "Test पूरा दर्ज नहीं हुआ", code: "NO_PROOF" }, 400, cors);
          if (sess.used && sess.used !== String(body.no || "").trim().toUpperCase()) return json({ error: "इस test पर certificate पहले बन चुका है", code: "USED" }, 409, cors);
          if (sess.pause > MAX_PROOF_PAUSE_SEC) return json({ error: "Test में ज़्यादा देर pause रहा, certificate के लिए बिना रुके test दें" }, 400, cors);
          const serverSec = (sess.t2 - sess.t1) / 1000;
          const sec = parseDurationSec(body.dur);
          // client का समय server की घड़ी से 4s कम या 2s ज़्यादा तक ही मान्य
          if (sec < serverSec - sess.pause - 4 || sec > serverSec + 2) return json({ error: "Test का समय server से मेल नहीं खाता" }, 400, cors);
          if (sec < sess.activeSec - 3) return json({ error: "Test का समय keystrokes से मेल नहीं खाता" }, 400, cors);
          // dur "mm:ss" में सेकंड कटे होते हैं, इसलिए sec से sec+1 के बीच की WPM मान्य
          const wpmAt = s => Math.max(0, (sess.chars / 5 - sess.errors) / (Math.max(s, 3) / 60));
          const cw = Math.round(Number(body.wpm));
          if (!(cw >= Math.floor(wpmAt(sec + 1)) - 2 && cw <= Math.ceil(wpmAt(sec)) + 2)) return json({ error: "WPM server की गणना से मेल नहीं खाता" }, 400, cors);
          const srvWpm = Math.min(cw, Math.round(wpmAt(sec)));
          if (Math.abs(Number(body.acc) - sess.acc) > 1) return json({ error: "Accuracy server की गणना से मेल नहीं खाती" }, 400, cors);
          body.wpm = srvWpm; body.acc = sess.acc; body.chars = sess.chars; body.errors = sess.errors;
        }

        const v = validateCert(body);
        if (v.error) return json({ error: v.error }, 400, cors);
        const c = v.cert;
        const existing = await env.OTP_STORE.get(`cert:${c.no}`);
        if (existing) {
          const old = JSON.parse(existing);
          // वही certificate दोबारा माँगा गया → वही signature लौटाएँ; अलग डेटा → नंबर बदलें
          if (old.cert.name === c.name && old.cert.wpm === c.wpm && old.cert.acc === c.acc) {
            return json({ success: true, token: old.token, sig: old.sig, grade: old.cert.grade }, 200, cors);
          }
          return json({ error: "Certificate number already used", code: "DUPLICATE" }, 409, cors);
        }
        if (sess) c.proof = 1;
        const { token, sig } = await signTrial(env, c);
        await env.OTP_STORE.put(`cert:${c.no}`, JSON.stringify({ cert: c, token, sig, ip }));
        if (sess) {
          sess.used = c.no; await env.OTP_STORE.put(`tsess:${sid}`, JSON.stringify(sess), { expirationTtl: 7200 });
          ctx.waitUntil(lbAdd(env, c, parseDurationSec(c.dur)).catch(e => console.error("leaderboard:", e.message)));
        }
        ctx.waitUntil(firebaseReq(env, `certificates/${c.no}`, "PUT", { ...c, revoked: false, createdBy: "worker" })
          .catch(e => console.error("cert firebase:", e.message)));
        return json({ success: true, token, sig, grade: c.grade }, 200, cors);
      } catch (e) {
        console.error("sign-cert:", e);
        return json({ error: "Server error" }, 500, cors);
      }
    }

    // 🎁 Referral code बनाना (सिर्फ़ active Pro license वाले)
    if (url.pathname === "/ref-register" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `refreg:${ip}`, 3600);
        if (n > 20) return json({ error: "Too many requests" }, 429, cors);
        const body = await request.json().catch(() => ({}));
        const key = String(body.key || "").trim().toUpperCase();
        const email = String(body.email || "").trim().toLowerCase();
        if (!/^HKP-P[123]-\d{4,6}-[0-9A-F]{64,200}$/.test(key) || !fbSafeKey(key) || !email) return json({ error: "Pro license ज़रूरी है" }, 400, cors);
        const act = await firebaseReq(env, `activations/${key}`, "GET");
        if (!act) return json({ error: "यह license server पर activate नहीं मिला। पहले internet पर license activate करें।" }, 404, cors);
        if (String(act.email || "").trim().toLowerCase() !== email) return json({ error: "Email license से मेल नहीं खाता" }, 403, cors);
        if (act.status && /revok/i.test(String(act.status))) return json({ error: "License revoked है" }, 403, cors);
        const revoked = await firebaseReq(env, `revoked/licenses/${key}`, "GET");
        if (revoked && revoked.revokedAt) return json({ error: "License revoked है" }, 403, cors);
        const code = await referralCodeFor(key);
        const existing = await firebaseReq(env, `referrals/${code}/owner`, "GET");
        if (!existing) {
          await firebaseReq(env, `referrals/${code}/owner`, "PUT", {
            name: String(act.name || "").slice(0, 60), email, key, plan: String(act.plan || ""), createdAt: Date.now()
          });
        }
        return json({ success: true, code }, 200, cors);
      } catch (e) { console.error("ref-register:", e); return json({ error: "Server error" }, 500, cors); }
    }

    // 🎁 Referral code जाँच (Buy modal से)
    if (url.pathname === "/ref-check" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `refchk:${ip}`, 3600);
        if (n > 30) return json({ error: "Too many requests" }, 429, cors);
        const body = await request.json().catch(() => ({}));
        const code = String(body.code || "").trim().toUpperCase();
        if (!/^HKR-[A-Z2-9]{6}$/.test(code)) return json({ valid: false, error: "Code का format गलत है (HKR-XXXXXX)" }, 400, cors);
        const owner = await firebaseReq(env, `referrals/${code}/owner`, "GET");
        if (!owner) return json({ valid: false, error: "यह referral code मौजूद नहीं है" }, 404, cors);
        const buyer = String(body.email || "").trim().toLowerCase();
        if (buyer && buyer === String(owner.email || "").toLowerCase()) return json({ valid: false, error: "अपना ही code इस्तेमाल नहीं कर सकते" }, 400, cors);
        const first = String(owner.name || "").trim().split(/\s+/)[0] || "Pro user";
        return json({ valid: true, code, owner: first.charAt(0).toUpperCase() + first.slice(1, 20) }, 200, cors);
      } catch (e) { console.error("ref-check:", e); return json({ error: "Server error" }, 500, cors); }
    }


    // 👥 Session login / check / logout
    if (url.pathname === "/session" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `sessip:${ip}`, 3600);
        if (n > 240) return json({ error: "बहुत ज़्यादा requests, थोड़ी देर बाद करें" }, 429, cors);
        const body = await request.json().catch(() => ({}));
        const op = ["login", "check", "logout", "list"].includes(body.op) ? body.op : "check";
        const sid = cleanSid(body.sid);
        const key = String(body.key || "").trim().toUpperCase();
        if (!sid || !key) return json({ error: "sid और key ज़रूरी हैं" }, 400, cors);
        const kid = (await sha256Hex("hks|" + key)).slice(0, 40);
        let list = await loadSessions(env, kid);
        const now = Date.now();

        if (op === "check") {
          const me = list.find(x => x.sid === sid);
          if (!me) return json({ success: true, active: false }, 200, cors);
          if (now - (me.seen || 0) > 3600000) { me.seen = now; await saveSessions(env, kid, list); }
          return json({ success: true, active: true }, 200, cors);
        }
        if (op === "logout") {
          await saveSessions(env, kid, list.filter(x => x.sid !== sid));
          return json({ success: true }, 200, cors);
        }
        if (op === "list") {
          if (!list.some(x => x.sid === sid)) return json({ error: "यह login active नहीं है" }, 403, cors);
          return json({ success: true, sessions: list.map(x => ({ me: x.sid === sid, label: x.label, at: x.at, seen: x.seen })) }, 200, cors);
        }
        // login: ownership verify, फिर limit
        const email = normalizeEmail(body.email);
        if (!email) return json({ error: "Email ज़रूरी है" }, 400, cors);
        const v = key.startsWith("HKT-")
          ? await verifyTrialKeyServer(env, { email, key })
          : await verifyProKeyServer(env, { name: body.name, email, mobile: body.mobile, key });
        if (!v.ok) return json({ error: v.error }, v.status || 403, cors);
        const limit = SESSION_LIMITS[v.tier] || 1;
        list = list.filter(x => x.sid !== sid);
        list.push({ sid, at: now, seen: now, label: uaLabel(request.headers.get("User-Agent")) });
        list.sort((a, b) => a.at - b.at);
        const evicted = list.length > limit ? list.splice(0, list.length - limit).length : 0;
        await saveSessions(env, kid, list);
        return json({ success: true, active: true, limit, used: list.length, evicted, tier: v.tier }, 200, cors);
      } catch (e) { console.error("session:", e); return json({ error: "Server error" }, 500, cors); }
    }

    // ☁️ Documents Cloud Sync (Pro) — client-side encrypted blob, server सिर्फ़ रखता है
    if (url.pathname === "/sync" && request.method === "POST") {
      try {
        const n = await bumpCounter(env.OTP_STORE, `sync:ip:${ip}`, 3600);
        if (n > 60) return json({ error: "Too many sync requests, थोड़ी देर बाद करें" }, 429, cors);
        const body = await request.json().catch(() => ({}));
        const key = String(body.key || "").trim().toUpperCase();
        const email = String(body.email || "").trim().toLowerCase();
        const op = body.op === "put" ? "put" : "get";
        if (!/^HKP-P[123]-\d{4,6}-[0-9A-F]{64,200}$/.test(key) || !email) return json({ error: "Pro license ज़रूरी है" }, 400, cors);
        const kid = (await sha256Hex(key + "|" + email)).slice(0, 40);
        if (!(await env.OTP_STORE.get(`actok:${kid}`))) {
          const act = await firebaseReq(env, `activations/${key}`, "GET");
          if (!act || String(act.email || "").trim().toLowerCase() !== email) return json({ error: "यह license server पर activate नहीं मिला" }, 403, cors);
          if (act.status && /revok/i.test(String(act.status))) return json({ error: "License revoked है" }, 403, cors);
          const rv = await firebaseReq(env, `revoked/licenses/${key}`, "GET");
          if (rv && rv.revokedAt) return json({ error: "License revoked है" }, 403, cors);
          await env.OTP_STORE.put(`actok:${kid}`, "1", { expirationTtl: 86400 });
        }
        if (op === "get") {
          const raw = await env.OTP_STORE.get(`docs:${kid}`);
          const d = raw ? JSON.parse(raw) : {};
          return json({ success: true, blob: d.blob || null, at: d.at || 0 }, 200, cors);
        }
        const blob = String(body.blob || "");
        if (!/^[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+$/.test(blob)) return json({ error: "Invalid data" }, 400, cors);
        if (blob.length > 900000) return json({ error: "Documents 900 KB से बड़े हैं" }, 413, cors);
        const at = Date.now();
        await env.OTP_STORE.put(`docs:${kid}`, JSON.stringify({ blob, at }));
        return json({ success: true, at }, 200, cors);
      } catch (e) { console.error("sync:", e); return json({ error: "Server error" }, 500, cors); }
    }

    // 🏆 Leaderboard (public, read-only)
    if (url.pathname === "/leaderboard" && (request.method === "GET" || request.method === "OPTIONS")) {
      if (request.method === "OPTIONS") return new Response(null, { headers: PUBLIC_CORS });
      const wk = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("week") || "") ? url.searchParams.get("week") : lbWeekKey(Date.now());
      const cat = url.searchParams.get("cat");
      let list = [];
      try { list = JSON.parse((await env.OTP_STORE.get(`lb:${wk}`)) || "[]"); } catch (e) { list = []; }
      if (["basic", "advanced", "job"].includes(cat)) list = list.filter(x => x.cat === cat);
      const top = list.slice(0, 20).map(({ id, ...rest }) => rest);
      return new Response(JSON.stringify({ week: wk, entries: top }), {
        status: 200, headers: { ...PUBLIC_CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=60" }
      });
    }

    // 🎓 Certificate status (verify.html से, कोई भी origin)
    if (url.pathname === "/cert" && (request.method === "GET" || request.method === "OPTIONS")) {
      if (request.method === "OPTIONS") return new Response(null, { headers: PUBLIC_CORS });
      const no = String(url.searchParams.get("no") || "").trim().toUpperCase();
      if (!/^HK-(BAS|ADV|JOB)-\d{6}-[A-Z0-9]{4,8}$/.test(no)) return json({ found: false }, 400, PUBLIC_CORS);
      const raw = await env.OTP_STORE.get(`cert:${no}`);
      if (!raw) return json({ found: false }, 404, PUBLIC_CORS);
      const rec = JSON.parse(raw);
      let revoked = !!(await env.OTP_STORE.get(`certrev:${no}`));
      if (!revoked) {
        try { const fb = await firebaseReq(env, `certificates/${no}/revoked`, "GET"); revoked = fb === true; } catch (e) {}
      }
      return json({ found: true, revoked, cert: rec.cert }, 200, PUBLIC_CORS);
    }

    if (url.pathname === "/send-otp" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const email = normalizeEmail(body.email);
        if (!email) return json({ error: "सही Email डालें" }, 400, cors);
        const name = String(body.name || "User").trim().slice(0, 60) || "User";

        // Rate limits
        if (await env.OTP_STORE.get(`gap:${email}`)) {
          return json({ error: "कृपया 60 सेकंड बाद दोबारा भेजें" }, 429, cors);
        }
        const ipCount = await bumpCounter(env.OTP_STORE, `ipcnt:${ip}`, 3600);
        if (ipCount > MAX_SENDS_PER_IP_HOUR) return json({ error: "बहुत ज़्यादा अनुरोध। 1 घंटे बाद कोशिश करें।" }, 429, cors);
        const emailCount = await bumpCounter(env.OTP_STORE, `mailcnt:${email}`, 3600);
        if (emailCount > MAX_SENDS_PER_EMAIL_HOUR) return json({ error: "इस Email पर बहुत ज़्यादा OTP भेजे गए। 1 घंटे बाद कोशिश करें।" }, 429, cors);

        const otp = secureOtp();
        await env.OTP_STORE.put(`otp:${email}`, JSON.stringify({ otp, tries: 0 }), { expirationTtl: OTP_TTL_SEC });
        await env.OTP_STORE.put(`gap:${email}`, "1", { expirationTtl: RESEND_GAP_SEC });

        const safeName = escapeHtml(name);
        const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "api-key": env.BREVO_API_KEY,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            sender: { name: "BOSC Tech & Edu", email: "bosctechedu@gmail.com" },
            to: [{ email, name }],
            subject: "Your OTP Code for Hor Katha Suite",
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #7c3aed; margin: 0;">Hor Katha Suite</h2>
                  <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Multi-Script Typing Revolution</p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                  <p style="font-size: 16px; color: #1e293b;">नमस्ते <b>${safeName}</b>,</p>
                  <p style="font-size: 14px; color: #475569;">आपका वन-टाइम पासवर्ड (OTP) यह है:</p>
                  <h1 style="font-size: 36px; letter-spacing: 8px; color: #7c3aed; margin: 20px 0;">${otp}</h1>
                  <p style="font-size: 12px; color: #ef4444;">यह OTP 5 मिनट के लिए वैध है। कृपया इसे किसी के साथ साझा न करें।</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
                  © 2026 BOSC Tech & Edu. All rights reserved.
                </div>
              </div>
            `
          })
        });

        if (!brevoResponse.ok) {
          const errData = await brevoResponse.text();
          console.error("Brevo Error:", errData);
          await env.OTP_STORE.delete(`gap:${email}`);
          return json({ error: "OTP भेजने में समस्या। थोड़ी देर बाद कोशिश करें।" }, 502, cors);
        }
        return json({ success: true, message: "OTP Sent!" }, 200, cors);
      } catch (error) {
        console.error("send-otp:", error);
        return json({ error: "Server error" }, 500, cors);
      }
    }

    // ─── VERIFY OTP ───
    if (url.pathname === "/verify-otp" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const email = normalizeEmail(body.email);
        const otp = String(body.otp || "").trim();
        if (!email || !/^\d{6}$/.test(otp)) return json({ error: "Email और 6 अंकों का OTP दोनों आवश्यक हैं" }, 400, cors);

        const raw = await env.OTP_STORE.get(`otp:${email}`);
        if (!raw) return json({ error: "OTP expire हो गया या नहीं मिला। दोबारा भेजें।" }, 400, cors);

        let rec;
        try { rec = JSON.parse(raw); } catch (e) { rec = { otp: raw, tries: 0 }; }

        if (!timingSafeEqual(rec.otp, otp)) {
          rec.tries = (rec.tries || 0) + 1;
          if (rec.tries >= MAX_VERIFY_ATTEMPTS) {
            await env.OTP_STORE.delete(`otp:${email}`);
            return json({ error: "बहुत ज़्यादा गलत कोशिशें। नया OTP मँगाएँ।" }, 429, cors);
          }
          await env.OTP_STORE.put(`otp:${email}`, JSON.stringify(rec), { expirationTtl: OTP_TTL_SEC });
          return json({ error: `गलत OTP डाला गया है। ${MAX_VERIFY_ATTEMPTS - rec.tries} कोशिश बाकी।` }, 400, cors);
        }

        await env.OTP_STORE.delete(`otp:${email}`);

        if (body.purpose === "trialkey") {
          const out = await redeemTrialKey(env, ctx, {
            email, name: String(body.name || "User").trim() || "User",
            mobile: body.mobile, key: body.key
          });
          if (out.error) return json({ error: out.error }, out.status || 400, cors);
          return json({ success: true, message: "Verified!", trial: out.trial }, 200, cors);
        }

        if (body.purpose === "trial") {
          if (!FREE_OTP_TRIAL) return json({ error: "Trial के लिए ₹9 वाली Trial Key ज़रूरी है।" }, 403, cors);
          const out = await issueTrial(env, ctx, {
            email,
            name: String(body.name || "User").trim() || "User",
            mobile: body.mobile
          });
          if (out.error) return json({ error: out.error }, out.status || 400, cors);
          return json({ success: true, message: "Verified!", trial: out.trial }, 200, cors);
        }

        return json({ success: true, message: "Verified!" }, 200, cors);
      } catch (error) {
        console.error("verify-otp:", error);
        return json({ error: "Server error" }, 500, cors);
      }
    }

    return new Response("Not Found", { status: 404, headers: cors });
  }
};
