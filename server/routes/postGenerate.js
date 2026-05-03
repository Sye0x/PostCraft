import express from "express";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

import { protect } from "../middleware/authMiddleware.js";
import Generation from "../models/Generation.js";

const router = express.Router();

// ================= AI Clients =================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= System Prompt =================

const SYSTEM_PROMPT = `
You are a professional LinkedIn content writer.

Tone & Persona:
- Write in a professional, engaging, and insightful tone
- Focus on career, business, and personal growth topics

Safety Guardrails:
- Do NOT generate harmful, hateful, discriminatory, or offensive content
- Do NOT include spam, misleading claims, fake engagement tactics, or scams
- Do NOT impersonate real people or include personal/private information

Quality Controls:
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

Scope Limits:
- Only generate content related to professional, career, or business topics
- If the user asks something outside this scope, politely refuse

Always follow these rules strictly.
`;

// ================= Generate Post =================

router.post("/generate-post", protect, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    let text = null;
    let provider = "gemini";

    // ================= Try Gemini =================
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\nUser prompt:\n${prompt}`,
              },
            ],
          },
        ],
      });

      text =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        response?.text ||
        null;

      if (!text) throw new Error("Empty response from Gemini");
    } catch (err) {
      console.error("Gemini Error:", err.message);
      provider = "openai";
    }

    // ================= Fallback to OpenAI =================
    if (!text) {
      try {
        const response = await openai.responses.create({
          model: "gpt-4o-mini",
          input: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
        });

        text = response.output_text || null;

        if (!text) throw new Error("Empty response from OpenAI");
      } catch (err) {
        console.error("OpenAI Error:", err.message);
        throw err;
      }
    }

    // ================= Save to MongoDB =================
    const savedGeneration = await Generation.create({
      user: req.user.id,
      prompt,
      result: text,
      provider,
    });

    return res.status(200).json({
      result: text,
      provider,
      generationId: savedGeneration._id,
    });
  } catch (error) {
    console.error("Post generation error:", error.message);

    return res.status(500).json({
      message: "All AI services failed",
    });
  }
});

// ================= Get History =================

router.get("/history", protect, async (req, res) => {
  try {
    const history = await Generation.find({ user: req.user.id })
      .select("prompt result provider createdAt")
      .sort({ createdAt: -1 });

    res.json({ history });
  } catch (error) {
    console.error("HISTORY ERROR:", error.message);

    res.status(500).json({
      message: "Error fetching history",
    });
  }
});

export default router;
