// api/notify.js — WhatsApp + Push notifications combined
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { type } = req.body || {};

  // ── PUSH NOTIFICATION ──
  if (type === "push") {
    const { subscription, title, body, url } = req.body;
    if (!subscription) return res.status(200).json({ success: false, message: "Subscription required" });
    try {
      const webpushModule = await import('web-push');
      const webpush = webpushModule.default || webpushModule;
      webpush.setVapidDetails(
        'mailto:udyampath@gmail.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );
      await webpush.sendNotification(subscription, JSON.stringify({
        title: title || '🚀 New Job Alert!',
        body: body || 'A new job matching your profile is available!',
        url: url || 'https://udyampath.vercel.app',
        icon: '/icon-192.png',
        badge: '/icon-192.png'
      }));
      return res.status(200).json({ success: true });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // ── WHATSAPP ALERT ──
  const { phone, jobTitle, company, location, salary, applyUrl } = req.body || {};
  if (!phone) return res.status(200).json({ success: false, message: "Phone required for WhatsApp" });

  const message = `🚀 *New Job Alert from UdyamPath!*\n\n💼 *${jobTitle}*\n🏢 ${company}\n📍 ${location}\n💰 ${salary}\n\n${applyUrl ? `🔗 Apply: ${applyUrl}` : '🔗 Apply: https://udyampath.vercel.app'}\n\n_Find more jobs at udyampath.vercel.app_`;
  const waLink = `https://wa.me/${phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(message)}`;

  const TWILIO_SID = process.env.TWILIO_SID;
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
  const TWILIO_WA = process.env.TWILIO_WA_NUMBER;

  if (TWILIO_SID && TWILIO_TOKEN && TWILIO_WA) {
    try {
      const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64');
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ From: TWILIO_WA, To: `whatsapp:+${phone.replace(/[^0-9]/g,'')}`, Body: message })
      });
      const data = await response.json();
      if (data.sid) return res.status(200).json({ success: true, method: 'twilio' });
    } catch(e) { console.error('Twilio error:', e); }
  }

  return res.status(200).json({ success: true, method: 'link', waLink });
}
