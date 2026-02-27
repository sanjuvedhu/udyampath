// ═══════════════════════════════════════════════════════════
// api/trigger-alerts.js — Fires when a new job is posted
// Sends real emails to all matching alert subscribers
// ═══════════════════════════════════════════════════════════

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = process.env.FROM_EMAIL || "alerts@udyampath.in";

async function sendAlertEmail(alert, job) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    FROM_EMAIL,
      to:      alert.email,
      subject: `🔔 New Job Alert: ${job.title} at ${job.company_name}`,
      html: `
<!DOCTYPE html>
<html>
<body style="background:#09090F;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:20px;">
<div style="max-width:520px;margin:0 auto;background:#13131F;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);">

  <div style="background:linear-gradient(135deg,#09090F,#1A1A2E);padding:28px;border-bottom:1px solid rgba(170,255,0,.1);">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
      <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#AAFF00,#77DD00);display:flex;align-items:center;justify-content:center;font-size:18px;">🚀</div>
      <div>
        <div style="color:#fff;font-weight:900;font-size:15px;">UdyamPath</div>
        <div style="color:rgba(255,255,255,.3);font-size:10px;letter-spacing:1px;text-transform:uppercase;">Job Alert</div>
      </div>
    </div>
    <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(170,255,0,.1);border:1px solid rgba(170,255,0,.2);border-radius:999px;padding:5px 12px;">
      <div style="width:7px;height:7px;border-radius:50%;background:#AAFF00;"></div>
      <span style="color:#AAFF00;font-size:11px;font-weight:800;letter-spacing:.5px;">NEW JOB POSTED — APPLY NOW</span>
    </div>
  </div>

  <div style="padding:24px;">
    <div style="background:#1A1A2E;border-radius:16px;padding:20px;margin-bottom:20px;border:1px solid rgba(170,255,0,.1);">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,${job.logo_color_1||"#AAFF00"},${job.logo_color_2||"#77DD00"});display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:22px;flex-shrink:0;">
          ${(job.company_name||"?")[0]}
        </div>
        <div>
          <div style="color:#fff;font-size:17px;font-weight:800;margin-bottom:3px;">${job.title}</div>
          <div style="color:rgba(255,255,255,.5);font-size:13px;">${job.company_name} · ${job.location}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
        <span style="background:rgba(170,255,0,.12);color:#AAFF00;border:1px solid rgba(170,255,0,.25);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:800;">${job.work_type}</span>
        <span style="background:rgba(255,184,0,.12);color:#FFB800;border:1px solid rgba(255,184,0,.25);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:800;">${job.region}</span>
        <span style="background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:800;">${job.experience_level}</span>
      </div>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#fff;font-size:18px;font-weight:900;">${job.salary_range||"Competitive"}</div>
        <div style="color:rgba(255,77,109,.8);font-size:11px;font-weight:700;">⏰ ${job.total_seats - (job.filled_seats||0)} seats left</div>
      </div>
    </div>

    <div style="background:rgba(255,77,109,.06);border:1px solid rgba(255,77,109,.12);border-radius:12px;padding:14px;margin-bottom:20px;">
      <div style="color:rgba(255,77,109,.8);font-size:12px;font-weight:800;">⚡ Why act fast?</div>
      <div style="color:rgba(255,255,255,.4);font-size:11px;margin-top:4px;">Jobs on UdyamPath fill up quickly. Applications are auto-closed when all seats are filled.</div>
    </div>

    <div style="text-align:center;">
      <a href="https://udyampath.vercel.app?job=${job.id}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#AAFF00,#77DD00);color:#09090F;text-decoration:none;border-radius:14px;font-weight:900;font-size:16px;letter-spacing:.5px;">
        APPLY NOW →
      </a>
      <p style="color:rgba(255,255,255,.2);font-size:10px;margin-top:14px;">
        You set a job alert for <strong style="color:rgba(255,255,255,.4);">${alert.keyword||"all jobs"}</strong> in <strong style="color:rgba(255,255,255,.4);">${alert.region||"India"}</strong>
        · <a href="https://udyampath.vercel.app/unsubscribe?id=${alert.id}" style="color:rgba(170,255,0,.4);text-decoration:none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>
      `,
    }),
  });

  return response.ok;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { title, company, region, workType } = req.body || {};
  if (!title) return res.status(400).json({ error: "Job title required" });

  try {
    // Find all active alerts that match this job
    let query = supabase
      .from("job_alerts")
      .select("*")
      .eq("active", true);

    // If region specified, include alerts with matching region OR no region preference
    if (region && region !== "Global") {
      query = query.or(`region.eq.${region},region.is.null`);
    }

    const { data: alerts, error } = await query;
    if (error) throw error;

    // Filter by keyword (in-memory since LIKE on array is complex)
    const matchingAlerts = (alerts || []).filter(alert => {
      if (!alert.keyword) return true; // no keyword = match all
      const keyword = alert.keyword.toLowerCase();
      return (
        title.toLowerCase().includes(keyword) ||
        company.toLowerCase().includes(keyword)
      );
    });

    // Get the job details to include in email
    const { data: jobData } = await supabase
      .from("jobs")
      .select("*")
      .eq("title", title)
      .eq("company_name", company)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!jobData) return res.status(404).json({ error: "Job not found in DB" });

    // Send emails (in batches to avoid rate limits)
    const results = { sent: 0, failed: 0 };
    for (const alert of matchingAlerts) {
      try {
        const ok = await sendAlertEmail(alert, jobData);
        if (ok) {
          results.sent++;
          // Update last_sent
          await supabase
            .from("job_alerts")
            .update({ last_sent: new Date().toISOString() })
            .eq("id", alert.id);
        } else {
          results.failed++;
        }
        // Small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 100));
      } catch (err) {
        console.error(`Failed to send alert to ${alert.email}:`, err);
        results.failed++;
      }
    }

    return res.status(200).json({
      success: true,
      totalAlerts: matchingAlerts.length,
      ...results,
    });

  } catch (err) {
    console.error("trigger-alerts error:", err);
    return res.status(500).json({ error: err.message });
  }
}
