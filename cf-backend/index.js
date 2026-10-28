export default {
  async fetch(request, env, ctx) {
    // CORS हेडर सेटअप (सुरक्षा के लिए इसे अपनी वेबसाइट तक सीमित करें)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // प्रोडक्शन में इसे "https://horkathasuite.pages.dev" कर दें
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // OPTIONS रिक्वेस्ट को हैंडल करें (CORS के लिए ज़रूरी है)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // ==========================================
    // 1. OTP भेजने का रास्ता (Send OTP)
    // ==========================================
    if (url.pathname === "/send-otp" && request.method === "POST") {
      try {
        const { email, name } = await request.json();
        if (!email) throw new Error("Email आवश्यक है");

        // 6-अंकीय OTP जनरेट करें
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // OTP को Cloudflare KV में 5 मिनट (300 सेकंड) के लिए सेव करें
        await env.OTP_STORE.put(`otp:${email}`, otp, { expirationTtl: 300 });

        // Brevo API से ईमेल भेजें
        const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "api-key": env.BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            // ✅ आपका ईमेल यहाँ जोड़ दिया गया है
            sender: { name: "BOSC Tech & Edu", email: "bosctechedu@gmail.com" }, 
            to: [{ email: email, name: name || "User" }],
            subject: "Your OTP Code for Hor Katha Suite",
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #7c3aed; margin: 0;">Hor Katha Suite</h2>
                  <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Multi-Script Typing Revolution</p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                  <p style="font-size: 16px; color: #1e293b;">नमस्ते <b>${name || 'User'}</b>,</p>
                  <p style="font-size: 14px; color: #475569;">आपका वन-टाइम पासवर्ड (OTP) यह है:</p>
                  <h1 style="font-size: 36px; letter-spacing: 8px; color: #7c3aed; margin: 20px 0;">${otp}</h1>
                  <p style="font-size: 12px; color: #ef4444;">यह OTP 5 मिनट के लिए वैध है। कृपया इसे किसी के साथ साझा न करें।</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
                  © 2026 BOSC Tech & Edu. All rights reserved.
                </div>
              </div>
            `,
          }),
        });

        // अगर Brevo से एरर आए (जैसे ईमेल वेरिफाई नहीं है)
        if (!brevoResponse.ok) {
          const errData = await brevoResponse.json();
          console.error("Brevo Error:", errData);
          throw new Error("Brevo API failed. Please verify sender email.");
        }

        return new Response(JSON.stringify({ success: true, message: "OTP Sent!" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // ==========================================
    // 2. OTP वेरिफाई करने का रास्ता (Verify OTP)
    // ==========================================
    if (url.pathname === "/verify-otp" && request.method === "POST") {
      try {
        const { email, otp } = await request.json();
        
        if (!email || !otp) throw new Error("Email और OTP दोनों आवश्यक हैं");

        // Cloudflare KV से OTP निकालें
        const storedOtp = await env.OTP_STORE.get(`otp:${email}`);

        if (!storedOtp) {
          throw new Error("OTP expire हो गया या नहीं मिला। दोबारा भेजें।");
        }

        if (storedOtp !== otp) {
          throw new Error("गलत OTP डाला गया है।");
        }

        // सफल होने पर OTP डिलीट कर दें
        await env.OTP_STORE.delete(`otp:${email}`);

        return new Response(JSON.stringify({ success: true, message: "Verified!" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // अगर कोई और रास्ता हो
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};