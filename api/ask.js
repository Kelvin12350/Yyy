export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  const GEMINI_API_KEY = "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";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateMessage?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: { text: prompt } })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.text || "No response from AI";
    res.status(200).json({ response: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
