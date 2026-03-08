// api/push-notify.js - Send push notifications
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { subscription, title, body, url } = req.body || {};
  if (!subscription) return res.status(400).json({ error: "Subscription required" });

  // Use web-push if available
  try {
    const webpush = await import('web-push');
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
    console.error('Push error:', e);
    return res.status(500).json({ error: e.message });
  }
}
