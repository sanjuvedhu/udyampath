// api/chat.js — AI Chatbot using Google Gemini (Free!)
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, jobSummary } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || "";

    const prompt = `You are UdyamPath AI, a friendly job search assistant for an Indian jobs portal. Help users find relevant jobs. Be concise (2-3 sentences max). Here are available jobs:\n${jobSummary}\n\nUser question: ${lastMessage}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, try again!";
    res.status(200).json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again!" });
  }
}
