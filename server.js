import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ---- Gemini AI setup ----
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System instruction: ye AI ko batata hai ki uska role kya hai
const SYSTEM_INSTRUCTION = `
Tum AgentFlow ke "brain" ho — ek task-routing assistant.
User jo bhi message bheje, usse samjho aur decide karo ki ye kaunsi category mein aata hai:
- "research" (koi jaankari/information chahiye)
- "booking" (train/flight/hotel se related)
- "shopping" (product dhundna/kharidna)
- "communication" (message/email bhejna)
- "document" (document banana/edit karna)
- "general" (koi normal baat-cheet, kisi category mein nahi aata)

Hamesha JSON format mein jawab do, is structure mein:
{
  "category": "<ek category upar wali list se>",
  "reply": "<user ko dikhane wala friendly Hindi-English mix jawab>"
}
Sirf JSON return karo, kuch aur text nahi.
`;

// ---- Main chat endpoint ----
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message zaroori hai" });
    }

    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nUser message: "${message}"`;

    const result = await model.generateContent(fullPrompt);
    const rawText = result.response.text();

    // AI se aaya JSON text ko clean karke parse karna
    const cleanText = rawText.replace(/```json|```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      // Agar AI ne valid JSON nahi diya, to fallback
      parsed = { category: "general", reply: rawText };
    }

    console.log(`[User]: ${message}`);
    console.log(`[Routed to]: ${parsed.category}`);

    res.json(parsed);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Kuch galat ho gaya, dobara try karein" });
  }
});

// Health check (Render/testing ke liye)
app.get("/", (req, res) => {
  res.send("AgentFlow backend chal raha hai ✅");
});

app.listen(PORT, () => {
  console.log(`AgentFlow backend http://localhost:${PORT} pe chal raha hai`);
});
