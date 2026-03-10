export default async function handler(req, res) {

  const origin = req.headers.origin || "";
  const allowedOrigins = ["https://udyampath.vercel.app","http://localhost:5173","http://localhost:3000"];
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes(origin) ? origin : "https://udyampath.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { messages, jobSummary } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || "";
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {"Content-Type":"application/json","Authorization":`Bearer ${process.env.GROQ_API_KEY}`},
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 300,
        messages: [
          {role:"system",content:`You are UdyamPath AI, a friendly job search assistant for an Indian jobs portal. Help users find relevant jobs. Be concise (2-3 sentences max). Available jobs:\n${jobSummary}`},
          {role:"user",content:lastMessage}
        ]
      })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, try again!";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Something went wrong. Please try again!" });
  }
}
