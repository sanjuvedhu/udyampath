// api/whatsapp-alert.js
// Sends job alert via WhatsApp using Twilio (or generates wa.me link)
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).end();

  const { phone, jobTitle, company, location, salary, applyUrl } = req.body || {};
  if (!phone) return res.status(400).json({ error: "Phone required" });

  const message = `🚀 *New Job Alert from UdyamPath!*

💼 *${jobTitle}*
🏢 ${company}
📍 ${location}
💰 ${salary}

${applyUrl ? `🔗 Apply: ${applyUrl}` : '🔗 Apply: https://udyampath.vercel.app'}

_Find more jobs at udyampath.vercel.app_`;

  // Generate WhatsApp link (works without Twilio)
  const waLink = `https://wa.me/${phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(message)}`;

  // If Twilio keys exist, send directly
  const TWILIO_SID = process.env.TWILIO_SID;
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
  const TWILIO_WA = process.env.TWILIO_WA_NUMBER; // whatsapp:+14155238886

  if (TWILIO_SID && TWILIO_TOKEN && TWILIO_WA) {
    try {
      const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64');
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          From: TWILIO_WA,
          To: `whatsapp:+${phone.replace(/[^0-9]/g,'')}`,
          Body: message
        })
      });
      const data = await response.json();
      if (data.sid) return res.status(200).json({ success: true, method: 'twilio' });
    } catch(e) { console.error('Twilio error:', e); }
  }

  // Fallback: return wa.me link
  return res.status(200).json({ success: true, method: 'link', waLink });
}
