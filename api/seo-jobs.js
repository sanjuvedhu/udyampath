// api/seo-jobs.js — SEO landing pages for job searches
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const { role, location } = req.query;
  if (!role) return res.status(400).json({ error: "role required" });

  const { data: jobs } = await supabase.from("jobs")
    .select("id,title,company_name,location,salary_range,work_type,description,apply_url")
    .ilike("title", `%${role}%`)
    .ilike("location", location ? `%${location}%` : "%")
    .limit(20);

  const count = jobs?.length || 0;
  const roleTitle = role.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  const locationTitle = location ? location.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()) : "India";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${roleTitle} Jobs in ${locationTitle} | UdyamPath</title>
  <meta name="description" content="Find ${count}+ ${roleTitle} jobs in ${locationTitle}. Apply directly to top companies. Free job alerts. Updated daily on UdyamPath."/>
  <meta name="keywords" content="${role} jobs, ${role} jobs in ${location||'india'}, ${role} vacancy, ${location||'india'} jobs"/>
  <meta property="og:title" content="${roleTitle} Jobs in ${locationTitle} | UdyamPath"/>
  <meta property="og:description" content="${count}+ ${roleTitle} jobs in ${locationTitle}. Apply now!"/>
  <meta property="og:url" content="https://udyampath.vercel.app/jobs/${role}${location?'/'+location:''}"/>
  <link rel="canonical" href="https://udyampath.vercel.app/jobs/${role}${location?'/'+location:''}"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#04040C;color:#fff;font-family:'Segoe UI',sans-serif}
    .header{background:linear-gradient(135deg,#00E5FF20,#7C3AED20);padding:40px 20px;text-align:center;border-bottom:1px solid rgba(0,229,255,.1)}
    .header h1{font-size:clamp(24px,5vw,42px);font-weight:900;margin-bottom:8px}
    .header p{color:rgba(255,255,255,.5);font-size:15px;margin-bottom:20px}
    .cta{display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#00E5FF,#7C3AED);color:#fff;text-decoration:none;border-radius:12px;font-weight:800;font-size:16px}
    .container{max-width:900px;margin:0 auto;padding:32px 20px}
    .job-card{background:#0D0D1F;border-radius:16px;padding:22px;margin-bottom:14px;border:1px solid rgba(0,229,255,.08);display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
    .job-title{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px}
    .job-meta{color:rgba(255,255,255,.4);font-size:13px;margin-bottom:8px}
    .job-tags{display:flex;gap:6px;flex-wrap:wrap}
    .tag{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700}
    .apply-btn{padding:10px 20px;background:linear-gradient(135deg,#00E5FF,#7C3AED);color:#fff;text-decoration:none;border-radius:10px;font-weight:800;font-size:13px;white-space:nowrap;flex-shrink:0}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px}
    .stat{background:#0D0D1F;border-radius:14px;padding:20px;text-align:center;border:1px solid rgba(0,229,255,.08)}
    .stat-val{font-size:28px;font-weight:900;color:#00E5FF}
    .stat-lb{font-size:11px;color:rgba(255,255,255,.4);margin-top:4px}
    .footer{text-align:center;padding:40px 20px;border-top:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.2);font-size:12px}
    .footer a{color:#00E5FF;text-decoration:none}
    h2{font-size:22px;font-weight:800;margin-bottom:20px;color:#fff}
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size:13px;color:#00E5FF;margin-bottom:8px;font-weight:700">🚀 UDYAMPATH — INDIA'S AI CAREER PLATFORM</div>
    <h1>${count}+ ${roleTitle} Jobs in ${locationTitle}</h1>
    <p>Updated daily · Direct apply · Free job alerts · AI mock interview</p>
    <a href="https://udyampath.vercel.app" class="cta">🔍 Search All 15,000+ Jobs →</a>
  </div>

  <div class="container">
    <div class="stats">
      <div class="stat"><div class="stat-val">${count}+</div><div class="stat-lb">${roleTitle} Jobs</div></div>
      <div class="stat"><div class="stat-val">15K+</div><div class="stat-lb">Total Jobs</div></div>
      <div class="stat"><div class="stat-val">Free</div><div class="stat-lb">Always Free</div></div>
      <div class="stat"><div class="stat-val">AI</div><div class="stat-lb">Interview Prep</div></div>
    </div>

    <h2>Latest ${roleTitle} Jobs in ${locationTitle}</h2>
    ${(jobs||[]).map(job=>`
    <div class="job-card">
      <div>
        <div class="job-title">${job.title}</div>
        <div class="job-meta">${job.company_name} · ${job.location} · ${job.salary_range||'Competitive'}</div>
        <div class="job-tags">
          <span class="tag" style="background:rgba(0,229,255,.1);color:#00E5FF">${job.work_type||'Full-time'}</span>
          ${job.apply_url?'<span class="tag" style="background:rgba(0,214,143,.1);color:#00D68F">⚡ Direct Apply</span>':''}
        </div>
      </div>
      <a href="${job.apply_url||'https://udyampath.vercel.app'}" target="_blank" class="apply-btn">Apply Now →</a>
    </div>`).join('')}

    <!-- SEO Content -->
    <div style="margin-top:40px;padding:28px;background:#0D0D1F;border-radius:16px;border:1px solid rgba(0,229,255,.08)">
      <h2>About ${roleTitle} Jobs in ${locationTitle}</h2>
      <p style="color:rgba(255,255,255,.5);line-height:1.8;font-size:14px">
        Looking for ${roleTitle} jobs in ${locationTitle}? UdyamPath lists ${count}+ verified ${roleTitle} openings from top companies.
        Apply directly to HR teams, get instant email alerts for new ${roleTitle} positions, and practice with our AI mock interview tool.
        All jobs are updated daily from real company postings across India and internationally.
      </p>
      <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
        ${['Remote','WFH','Fresher','Senior','Mid-level'].map(t=>`<a href="https://udyampath.vercel.app" style="padding:8px 14px;border-radius:8px;background:rgba(124,58,237,.1);color:#7C3AED;font-size:12px;font-weight:700;text-decoration:none">${t} ${roleTitle} Jobs</a>`).join('')}
      </div>
    </div>
  </div>

  <div class="footer">
    <p>© 2025 UdyamPath — उद्यम पथ | <a href="https://udyampath.vercel.app">Find Jobs</a> · <a href="https://udyampath.vercel.app/?tab=interview">AI Interview</a> · <a href="https://udyampath.vercel.app/?tab=salary">Salary Insights</a></p>
    <p style="margin-top:8px">Made with ❤️ by Sanjeev & Vedha Nikitha</p>
  </div>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-maxage=3600");
  return res.status(200).send(html);
}
