// api/parse-resume.js — AI resume parser using Groq
export default async function handler(req, res) {

  const {rateLimit,getIp} = await import("./_rateLimit.js");
  const {allowed} = rateLimit(getIp(req));
  if(!allowed) return res.status(429).json({error:"Too many requests"});
  const origin = req.headers.origin || "";
  const allowed = ["https://udyampath.vercel.app","http://localhost:5173","http://localhost:3000"];
  res.setHeader("Access-Control-Allow-Origin", allowed.includes(origin) ? origin : "https://udyampath.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { resumeText } = req.body || {};
  if (!resumeText) return res.status(400).json({ error: "resumeText required" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 1000,
        messages: [{
          role: "system",
          content: "You are a resume parser. Extract structured data from resumes. Always respond with valid JSON only, no markdown, no explanation."
        }, {
          role: "user",
          content: `Parse this resume and return ONLY a JSON object with these fields:
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "location": "string (city, state)",
  "linkedin": "string (url without https://)",
  "skills": "string (comma separated top skills)",
  "experience": "string (e.g. 3 years React Developer at TCS)",
  "education": "string (e.g. B.Tech CSE, VIT 2020)",
  "summary": "string (2 line professional summary)"
}

Resume text:
${resumeText.substring(0, 3000)}`
        }]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json({ success: true, data: parsed });
  } catch(e) {
    console.error("Parse error:", e);
    return res.status(500).json({ error: e.message });
  }
}
