// api/analytics.js - Track and serve analytics
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const allowedOrigins = ["https://udyampath.vercel.app","http://localhost:5173","http://localhost:3000"];
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes(origin) ? origin : "https://udyampath.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    // Track event
    const { event, data } = req.body || {};
    const ip = req.headers['x-forwarded-for'] || 'unknown';
    const ua = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone/i.test(ua);

    await supabase.from("analytics").insert({
      event: event || 'pageview',
      data: data || {},
      ip: ip.split(',')[0],
      is_mobile: isMobile,
      created_at: new Date().toISOString()
    }).select();

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    // Return analytics summary
    const [
      { count: totalViews },
      { count: totalApps },
      { count: totalJobs },
      { data: recentEvents }
    ] = await Promise.all([
      supabase.from("analytics").select("*", { count: "exact", head: true }).eq("event", "pageview"),
      supabase.from("applications").select("*", { count: "exact", head: true }),
      supabase.from("jobs").select("*", { count: "exact", head: true }),
      supabase.from("analytics").select("event,created_at,is_mobile").order("created_at", { ascending: false }).limit(100)
    ]);

    // Events by type
    const eventCounts = {};
    (recentEvents || []).forEach(e => { eventCounts[e.event] = (eventCounts[e.event] || 0) + 1; });
    const mobileCount = (recentEvents || []).filter(e => e.is_mobile).length;

    return res.status(200).json({
      totalViews: totalViews || 0,
      totalApps: totalApps || 0,
      totalJobs: totalJobs || 0,
      mobilePercent: recentEvents?.length ? Math.round(mobileCount / recentEvents.length * 100) : 0,
      eventCounts,
      recentEvents: recentEvents?.slice(0, 20) || []
    });
  }
}
