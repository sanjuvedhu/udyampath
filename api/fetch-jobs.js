// ═══════════════════════════════════════════════════════════
// api/fetch-jobs.js — Fetches real jobs from Adzuna API
// Vercel Serverless Function
// ═══════════════════════════════════════════════════════════
// Deploy: this file goes in /api/fetch-jobs.js in your project root
// URL: https://yoursite.vercel.app/api/fetch-jobs?q=react&country=in

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // use service key here (not anon key) for server-side
);

const ADZUNA_APP_ID  = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  if (req.method !== "GET") return res.status(405).end("Method not allowed");

  const { q = "software developer", country = "in", results_per_page = 20, page = 1 } = req.query;

  try {
    // ── Step 1: Check our DB cache first (< 1 hour old) ──
    const { data: cached } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .eq("source", "adzuna")
      .gte("updated_at", new Date(Date.now() - 3600000).toISOString()) // 1 hour cache
      .limit(parseInt(results_per_page));

    if (cached && cached.length > 5) {
      return res.status(200).json({ jobs: cached, total: cached.length, source: "db_cache" });
    }

    // ── Step 2: Fetch fresh from Adzuna ──
    const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}` +
      `?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}` +
      `&results_per_page=${results_per_page}&what=${encodeURIComponent(q)}` +
      `&content-type=application/json`;

    const adzunaRes = await fetch(adzunaUrl);
    if (!adzunaRes.ok) throw new Error(`Adzuna API error: ${adzunaRes.status}`);

    const adzunaData = await adzunaRes.json();
    const rawJobs = adzunaData.results || [];

    // ── Step 3: Map to our schema ──
    const jobs = rawJobs.map(job => ({
      title:           job.title || "Software Developer",
      company_name:    job.company?.display_name || "Company",
      salary_range:    job.salary_min
                         ? `₹${Math.round(job.salary_min/100000)}–${Math.round(job.salary_max/100000)} LPA`
                         : "Competitive",
      location:        job.location?.display_name || "India",
      work_type:       job.contract_type === "permanent" ? "In-Office" : "Remote",
      region:          country === "in" ? "India" : country.toUpperCase(),
      category:        "Tech",
      experience_level: "Any",
      description:     job.description?.substring(0, 500) || "",
      skills_tags:     [],
      total_seats:     10,
      filled_seats:    Math.floor(Math.random() * 6),
      is_active:       true,
      is_hot:          Math.random() > 0.7,
      is_new:          true,
      logo_color_1:    "#AAFF00",
      logo_color_2:    "#77DD00",
      source:          "adzuna",
      external_id:     job.id,
      posted_ago:      "Today",
    }));

    // ── Step 4: Upsert to our DB (avoid duplicates via external_id) ──
    if (jobs.length > 0) {
      await supabase
        .from("jobs")
        .upsert(jobs, { onConflict: "external_id", ignoreDuplicates: false });
    }

    return res.status(200).json({
      jobs,
      total: adzunaData.count || jobs.length,
      source: "adzuna_live",
    });

  } catch (err) {
    console.error("fetch-jobs error:", err);
    // Fallback: return whatever is in DB
    const { data: fallback } = await supabase.from("jobs").select("*").eq("is_active", true).limit(20);
    return res.status(200).json({ jobs: fallback || [], total: fallback?.length || 0, source: "db_fallback" });
  }
}
