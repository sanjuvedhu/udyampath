// ═══════════════════════════════════════════════════════════
// api/send-confirmation.js — Real email via Resend
// Vercel Serverless Function
// ═══════════════════════════════════════════════════════════

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = process.env.FROM_EMAIL || "noreply@udyampath.in"; // verify in Resend

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { email, name, jobTitle, company } = req.body || {};
  if (!email || !jobTitle) return res.status(400).json({ error: "Missing fields" });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      email,
        subject: `✅ Application Submitted — ${jobTitle} at ${company}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="background:#09090F;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:20px;">
  <div style="max-width:560px;margin:0 auto;background:#13131F;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#AAFF00,#77DD00);padding:32px 28px;text-align:center;">
      <div style="font-size:36px;margin-bottom:8px;">🚀</div>
      <h1 style="color:#09090F;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">Application Submitted!</h1>
      <p style="color:rgba(0,0,0,.7);margin:8px 0 0;font-size:14px;">UdyamPath — उद्यम पथ</p>
    </div>

    <!-- Body -->
    <div style="padding:28px;">
      <p style="color:rgba(255,255,255,.8);font-size:15px;margin:0 0 20px;">Hi <strong style="color:#fff;">${name || "Friend"}</strong>,</p>
      <p style="color:rgba(255,255,255,.6);font-size:14px;line-height:1.8;margin:0 0 24px;">
        Your application has been <strong style="color:#AAFF00;">successfully submitted</strong>. Here are your details:
      </p>

      <!-- Job Card -->
      <div style="background:#1A1A2E;border-radius:14px;padding:20px;margin-bottom:24px;border:1px solid rgba(170,255,0,.15);">
        <div style="font-size:11px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Applied For</div>
        <div style="color:#fff;font-size:18px;font-weight:800;margin-bottom:4px;">${jobTitle}</div>
        <div style="color:#AAFF00;font-size:14px;font-weight:700;">${company}</div>
      </div>

      <div style="background:#1A1A2E;border-radius:14px;padding:20px;margin-bottom:24px;">
        <div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:12px;font-weight:700;">⏭️ What happens next?</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${[["1","📧","${company} reviews your application","Usually within 3–7 business days"],["2","📞","Recruiter reaches out","Phone or email screening"],["3","💼","Interview process","Technical + HR rounds"],["4","🎉","Offer letter","If selected, you get a formal offer"]].map(([n,ic,title,sub])=>`
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:24px;height:24px;border-radius:50%;background:rgba(170,255,0,.15);color:#AAFF00;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0;">${n}</div>
            <div>
              <div style="color:#fff;font-size:13px;font-weight:700;">${ic} ${title}</div>
              <div style="color:rgba(255,255,255,.35);font-size:11px;">${sub}</div>
            </div>
          </div>`).join("")}
        </div>
      </div>

      <div style="background:rgba(170,255,0,.06);border:1px solid rgba(170,255,0,.15);border-radius:14px;padding:16px;margin-bottom:24px;">
        <div style="color:#AAFF00;font-size:13px;font-weight:800;margin-bottom:6px;">💡 Pro Tips while you wait</div>
        <ul style="color:rgba(255,255,255,.5);font-size:12px;line-height:1.9;margin:0;padding-left:16px;">
          <li>Connect with ${company} employees on LinkedIn</li>
          <li>Research the company's products and recent news</li>
          <li>Prepare STAR stories for behavioral questions</li>
          <li>Keep applying to 3–5 more jobs per day on UdyamPath</li>
        </ul>
      </div>

      <div style="text-align:center;">
        <a href="https://udyampath.vercel.app" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#AAFF00,#77DD00);color:#09090F;text-decoration:none;border-radius:12px;font-weight:900;font-size:15px;">
          Find More Jobs →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 28px 24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;">
      <p style="color:rgba(255,255,255,.2);font-size:11px;margin:0;">
        UdyamPath (उद्यम पथ) · India's Real-Time Career Platform<br/>
        You applied for a job · <a href="#" style="color:rgba(170,255,0,.5);">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
        `,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Email failed");

    return res.status(200).json({ success: true, emailId: data.id });

  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: err.message });
  }
}
