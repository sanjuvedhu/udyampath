// api/create-order.js — Create Razorpay order
export default async function handler(req, res) {

  const origin = req.headers.origin || "";
  const allowedOrigins = ["https://udyampath.vercel.app","http://localhost:5173","http://localhost:3000"];
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes(origin) ? origin : "https://udyampath.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { amount, currency = "INR", receipt, notes } = req.body || {};
  if (!amount) return res.status(400).json({ error: "Amount required" });

  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount * 100, // paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {}
      })
    });
    const order = await response.json();
    if (order.error) throw new Error(order.error.description);
    return res.status(200).json({ success: true, order, key: RAZORPAY_KEY_ID });
  } catch(e) {
    console.error("Razorpay error:", e);
    return res.status(500).json({ error: e.message });
  }
}
