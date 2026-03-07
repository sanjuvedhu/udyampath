import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ntwujwqgqhllvpuyoyst.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d3Vqd3FncWhsbHZwdXlveXN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjIxMjI1MiwiZXhwIjoyMDg3Nzg4MjUyfQ.7UMHFwML6Vui7IkaPo2pHXKgtouwSAtnmI3JRxwpfZ0"
);

const APP_ID  = "27be5d18";
const APP_KEY = "63d328580cceaadf70e0732540ff431f";
const countries = ["in","us","gb","au","ca"];
const keywords = ["software","developer","engineer","data","product","design","marketing","sales","hr","operations"];

let updated = 0;

for (const code of countries) {
  for (const keyword of keywords) {
    try {
      const url = `https://api.adzuna.com/v1/api/jobs/${code}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${keyword}&results_per_page=50&content-type=application/json`;
      const res = await fetch(url);
      const data = await res.json();
      const jobs = data?.results || [];
      for (const job of jobs) {
        if (!job.redirect_url) continue;
        const title = job.title?.substring(0,60) || "";
        const company = job.company?.display_name || "";
        // Try external_id first
        let { error } = await supabase.from("jobs")
          .update({ apply_url: job.redirect_url })
          .eq("external_id", job.id);
        // If not found, try title + company match  
        if (error || !job.id) {
          await supabase.from("jobs")
            .update({ apply_url: job.redirect_url })
            .ilike("title", `%${title.substring(0,30)}%`)
            .ilike("company_name", `%${company.substring(0,20)}%`)
            .is("apply_url", null);
        }
        updated++;
      }
      console.log(`✅ ${keyword} ${code} — ${updated} processed`);
      await new Promise(r => setTimeout(r, 300));
    } catch(e) { console.log("Error:", e.message); }
  }
}
console.log(`\n🎉 Done! Total processed: ${updated}`);
