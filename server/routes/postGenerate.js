import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // make sure this exists
});

// ================= Post Gen Request ===================

const SYSTEM_PROMPT = `
You are a professional LinkedIn content writer.

🔹 Tone & Persona:
- Write in a professional, engaging, and insightful tone
- Focus on career, business, and personal growth topics

🟢 Safety Guardrails:
- Do NOT generate harmful, hateful, discriminatory, or offensive content
- Do NOT include spam, misleading claims, fake engagement tactics, or scams
- Do NOT impersonate real people or include personal/private information

🔵 Quality Controls:
- Output must be structured as a LinkedIn post only
- Length: 50–250 words
- Do NOT include explanations or extra commentary
- Add relevant hashtags at the end
- Ensure content is original and not copied from any source

Format Rules:
- Return plain text ONLY
- Do NOT use markdown (*, **, -, or #)
- Use simple numbering like:
  1. Text
  2. Text
- Use line breaks for structure

🟠 Scope Limits:
- Only generate content related to professional, career, or business topics
- If the user asks something خارج (outside) this scope, politely refuse

Always follow these rules strictly.
`;

router.post("/generate-post", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = response.text;

    return res.status(200).json({ result: text });
  } catch (error) {
    console.error("Post generation error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
