import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ntwujwqgqhllvpuyoyst.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d3Vqd3FncWhsbHZwdXlveXN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjIxMjI1MiwiZXhwIjoyMDg3Nzg4MjUyfQ.7UMHFwML6Vui7IkaPo2pHXKgtouwSAtnmI3JRxwpfZ0"
);

const APP_ID  = "27be5d18";
const APP_KEY = "63d328580cceaadf70e0732540ff431f";

const keywords = [
  "software engineer","react developer","python developer","java developer",
  "full stack developer","backend developer","frontend developer","android developer",
  "ios developer","devops engineer","cloud engineer","data engineer","data analyst",
  "data scientist","machine learning","nodejs developer","flutter developer",
  "qa engineer","product manager","ui ux designer","graphic designer",
  "digital marketing","content writer","sales manager","business analyst",
  "hr manager","fresher engineer","junior developer","web developer",
  "php developer","kotlin developer","swift developer","blockchain developer",
  "cybersecurity","golang developer","technical writer","seo specialist",
  "network engineer","embedded engineer","linux administrator",
  "ruby developer","scala developer","r programmer","matlab engineer",
  "etl developer","tableau developer","powerbi developer",
  "salesforce developer","sap consultant","oracle developer",
  "testing engineer","automation engineer","performance engineer",
  "site reliability","infrastructure engineer","solutions architect",
  "technical lead","engineering manager","vp engineering",
  "chief technology","startup founder","product designer",
  "motion designer","video editor","photographer",
  "copywriter","journalist","editor","translator",
  "teacher","tutor","counselor","social worker",
  "doctor","nurse","pharmacist","physiotherapist",
  "civil engineer","mechanical engineer","electrical engineer",
  "chemical engineer","aerospace engineer","biomedical engineer"
];

const countries = [
  { code: "in", region: "India" },
  { code: "gb", region: "UK" },
  { code: "us", region: "USA" },
  { code: "au", region: "Australia" },
  { code: "ca", region: "Canada" },
];

const colors = [
  ["#AAFF00","#77DD00"],["#38BDF8","#0EA5E9"],["#A78BFA","#7C3AED"],
  ["#F472B6","#EC4899"],["#34D399","#10B981"],["#FB923C","#F97316"],
  ["#60A5FA","#3B82F6"],["#F87171","#EF4444"],["#FBBF24","#F59E0B"],
];

let totalCalls = 0;
const MAX_CALLS = 240;

async function fetchPage(keyword, country, page) {
  if (totalCalls >= MAX_CALLS) return [];
  totalCalls++;
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=20&what=${encodeURIComponent(keyword)}&content-type=application/json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch { return []; }
}

function mapJob(job, country, region, keyword) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const salaryMin = job.salary_min || 0;
  const salaryMax = job.salary_max || salaryMin * 1.3;
  const salary = salaryMin > 0
    ? (country === "in"
        ? `₹${Math.round(salaryMin/100000)}–${Math.round(salaryMax/100000)} LPA`
        : `$${Math.round(salaryMin/1000)}K–$${Math.round(salaryMax/1000)}K/yr`)
    : "Competitive";

  return {
    title: (job.title || "Developer").substring(0, 100),
    company_name: (job.company?.display_name || "Company").substring(0, 100),
    salary_range: salary,
    location: (job.location?.display_name || region).substring(0, 100),
    work_type: ["Remote","Hybrid","In-Office","WFH","Freelance"][Math.floor(Math.random()*5)],
    region,
    category: keyword.includes("design")||keyword.includes("ux") ? "Design"
            : keyword.includes("data")||keyword.includes("machine") ? "Data"
            : keyword.includes("market")||keyword.includes("seo")||keyword.includes("content") ? "Marketing"
            : keyword.includes("sales")||keyword.includes("business") ? "Sales"
            : keyword.includes("hr") ? "HR"
            : keyword.includes("product") ? "Product"
            : keyword.includes("writer") ? "Content" : "Tech",
    experience_level: keyword.includes("fresher")||keyword.includes("junior") ? "Fresher"
                    : keyword.includes("senior")||keyword.includes("lead") ? "5–10 yrs" : "2–5 yrs",
    description: (job.description || "Great opportunity!").substring(0, 500),
    skills_tags: [],
    total_seats: Math.floor(Math.random() * 20) + 5,
    filled_seats: Math.floor(Math.random() * 6),
    is_active: true,
    is_hot: Math.random() > 0.6,
    is_new: true,
    logo_color_1: color[0],
    logo_color_2: color[1],
    source: "adzuna",
    external_id: job.id,
    posted_ago: "Today",
  };
}

async function insertJobs(jobs) {
  if (jobs.length === 0) return;
  const { error } = await supabase.from("jobs")
    .upsert(jobs, { onConflict: "external_id", ignoreDuplicates: true });
  if (error) console.log("Insert error:", error.message);
}

console.log("🚀 Fetching jobs from Adzuna...\n");

for (const { code, region } of countries) {
  for (const keyword of keywords) {
    if (totalCalls >= MAX_CALLS) break;
    const results = await fetchPage(keyword, code, 1);
    const jobs = results.map(j => mapJob(j, code, region, keyword));
    await insertJobs(jobs);
    console.log(`✅ ${jobs.length} jobs — "${keyword}" ${region} (${totalCalls}/${MAX_CALLS})`);
    await new Promise(r => setTimeout(r, 500));
  }
}

const { count } = await supabase.from("jobs").select("*", { count: "exact", head: true });
console.log(`\n🎉 DONE! Total jobs: ${count}`);
// This won't work - let's update the keywords array instead
