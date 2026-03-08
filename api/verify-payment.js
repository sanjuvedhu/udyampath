// api/verify-payment.js — Verify Razorpay payment + activate feature
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, jobId, userId } = req.body || {};

  try {
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Save payment to DB
    await supabase.from("payments").insert({
      user_id: userId,
      plan,
      job_id: jobId || null,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      created_at: new Date().toISOString()
    });

    // Activate the feature
    if (plan === "featured_job" && jobId) {
      await supabase.from("jobs").update({ is_featured: true, is_hot: true }).eq("id", jobId);
    }
    if (plan === "premium_candidate" && userId) {
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await supabase.from("candidate_profiles").update({ is_premium: true, premium_expires_at: expiresAt }).eq("user_id", userId);
    }
    if (plan === "company_subscription" && userId) {
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await supabase.from("company_profiles").update({ is_subscribed: true, subscription_expires_at: expiresAt }).eq("user_id", userId);
    }

    return res.status(200).json({ success: true });
  } catch(e) {
    console.error("Verify error:", e);
    return res.status(500).json({ error: e.message });
  }
}
