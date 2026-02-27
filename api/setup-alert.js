// ═══════════════════════════════════════════════════════════
// api/setup-alert.js — Welcome email when user sets a job alert
// ═══════════════════════════════════════════════════════════

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = process.env.FROM_EMAIL || "alerts@udyampath.in";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { email, keyword, region, workType } = req.body || {};
  if (!email) return res.status(400).json({ error: "Email required" });

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
        subject: `🔔 Job Alert Activated — UdyamPath`,
        html: `
<!DOCTYPE html>
<html>
<body style="background:#09090F;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:20px;">
<div style="max-width:520px;margin:0 auto;background:#13131F;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);">
  <div style="background:linear-gradient(135deg,#AAFF00,#77DD00);padding:32px 28px;text-align:center;">
    <div style="font-size:40px;margin-bottom:10px;">🔔</div>
    <h1 style="color:#09090F;margin:0;font-size:24px;font-weight:900;">Job Alert Activated!</h1>
    <p style="color:rgba(0,0,0,.6);margin:8px 0 0;font-size:13px;">You'll get real emails the moment matching jobs are posted</p>
  </div>
  <div style="padding:28px;">
    <p style="color:rgba(255,255,255,.7);font-size:14px;margin:0 0 20px;">Your alert is live with these settings:</p>
    <div style="background:#1A1A2E;border-radius:14px;padding:18px;margin-bottom:20px;">
      ${[["🔍 Keyword", keyword||"All Jobs"], ["🌍 Region", region||"Any"], ["💼 Work Type", workType||"Any"]].map(([lb,val])=>`
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);">
          <span style="color:rgba(255,255,255,.4);font-size:13px;">${lb}</span>
          <span style="color:#AAFF00;font-size:13px;font-weight:800;">${val}</span>
        </div>
      `).join("")}
    </div>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="https://udyampath.vercel.app" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#AAFF00,#77DD00);color:#09090F;text-decoration:none;border-radius:12px;font-weight:900;font-size:14px;">
        Browse Jobs Now →
      </a>
    </div>
    <p style="color:rgba(255,255,255,.2);font-size:10px;text-align:center;">
      UdyamPath · Real-Time Career Platform · 
      <a href="https://udyampath.vercel.app/unsubscribe" style="color:rgba(170,255,0,.4);">Unsubscribe</a>
    </p>
  </div>
</div>
</body>
</html>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ success: true, emailId: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
