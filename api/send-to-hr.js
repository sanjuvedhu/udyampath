// api/send-to-hr.js — Send application directly to HR email
export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const allowed = ["https://udyampath.vercel.app","http://localhost:5173","http://localhost:3000"];
  res.setHeader("Access-Control-Allow-Origin", allowed.includes(origin) ? origin : "https://udyampath.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const {
    hrEmail, jobTitle, company, applicantName, applicantEmail,
    phone, linkedin, experience, currentLocation, coverNote, resumeUrl
  } = req.body || {};

  if (!hrEmail || !jobTitle || !applicantEmail) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "noreply@udyampath.in",
        to: hrEmail,
        reply_to: applicantEmail,
        subject: `🚀 New Application: ${jobTitle} — ${applicantName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="background:#04040C;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#0D0D1F;border-radius:20px;overflow:hidden;border:1px solid rgba(0,229,255,.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#00E5FF,#7C3AED);padding:28px;text-align:center;">
      <div style="font-size:32px;margin-bottom:6px;">📩</div>
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">New Job Application</h1>
      <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px;">via UdyamPath — उद्यम पथ</p>
    </div>

    <!-- Job Info -->
    <div style="padding:24px 28px 0;">
      <div style="background:#080816;border-radius:14px;padding:18px;margin-bottom:20px;border:1px solid rgba(0,229,255,.1);">
        <div style="font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Applied For</div>
        <div style="color:#fff;font-size:20px;font-weight:800;margin-bottom:2px;">${jobTitle}</div>
        <div style="color:#00E5FF;font-size:13px;font-weight:700;">${company}</div>
      </div>

      <!-- Applicant Details -->
      <div style="background:#080816;border-radius:14px;padding:18px;margin-bottom:20px;border:1px solid rgba(0,229,255,.1);">
        <div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:14px;font-weight:700;">👤 Applicant Details</div>
        ${[
          ["Full Name", applicantName],
          ["Email", applicantEmail],
          ["Phone", phone || "Not provided"],
          ["LinkedIn", linkedin || "Not provided"],
          ["Experience", experience || "Not provided"],
          ["Location", currentLocation || "Not provided"],
        ].map(([label, value]) => `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);">
          <span style="color:rgba(255,255,255,.4);font-size:12px;">${label}</span>
          <span style="color:#fff;font-size:12px;font-weight:700;">${value}</span>
        </div>`).join("")}
      </div>

      <!-- Cover Note -->
      ${coverNote ? `
      <div style="background:#080816;border-radius:14px;padding:18px;margin-bottom:20px;border:1px solid rgba(0,229,255,.1);">
        <div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:10px;font-weight:700;">💬 Cover Note</div>
        <div style="color:rgba(255,255,255,.8);font-size:13px;line-height:1.7;">${coverNote}</div>
      </div>` : ""}

      <!-- Resume -->
      ${resumeUrl ? `
      <div style="text-align:center;margin-bottom:20px;">
        <a href="${resumeUrl}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#00E5FF,#7C3AED);color:#fff;text-decoration:none;border-radius:12px;font-weight:800;font-size:14px;">
          📄 View Resume
        </a>
      </div>` : ""}

      <!-- Reply CTA -->
      <div style="background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.15);border-radius:14px;padding:16px;margin-bottom:24px;">
        <div style="color:#00E5FF;font-size:13px;font-weight:800;margin-bottom:6px;">💡 Next Steps</div>
        <p style="color:rgba(255,255,255,.5);font-size:12px;margin:0;line-height:1.8;">
          Simply reply to this email to contact <strong style="color:#fff;">${applicantName}</strong> directly at <strong style="color:#fff;">${applicantEmail}</strong>.<br/>
          Their resume and application details are above.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 28px 24px;border-top:1px solid rgba(255,255,255,.05);text-align:center;">
      <p style="color:rgba(255,255,255,.2);font-size:11px;margin:0;">
        Sent via UdyamPath (उद्यम पथ) · India's AI Career Platform<br/>
        <a href="https://udyampath.vercel.app" style="color:rgba(0,229,255,.5);">Post more jobs free →</a>
      </p>
    </div>
  </div>
</body>
</html>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Email failed");
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("HR email error:", err);
    return res.status(500).json({ error: err.message });
  }
}
