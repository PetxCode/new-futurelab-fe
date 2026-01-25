
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).VITE_GEMINI_API_KEY || ''; // Fallback for various env configs



export const getMentorFeedback = async (
  code: string, 
  error: string | null, 
  levelTitle: string,
  levelInstruction: string
): Promise<string> => {
  try {
    if (!apiKey) {
      return "I need an API Key to communicate! (VITE_GEMINI_API_KEY missing)";
    }

    const prompt = `
      You are "Py-Bot", a friendly and encouraging space-robot coding mentor for kids aged 8-12.
      The user is playing a game called PyQuest to learn Python.
      
      Current Level: ${levelTitle}
      Goal: ${levelInstruction}
      User's Code: 
      \`\`\`python
      ${code}
      \`\`\`
      
      Error (if any): ${error || "None"}
      
      Your task:
      1. If there's an error, explain it simply (without using too much jargon).
      2. If the code is correct but they're stuck, give a gentle hint.
      3. Use space-themed puns and emojis occasionally.
      4. Keep it very short (max 2-3 sentences).
      
      Respond in plain text.
    `;


    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp', // Updated to a more standard model if available, or keep as preview
      contents: prompt,
    });

    return response.text || "Keep going, Cadet! You're doing great! 🚀";
  } catch (err: any) {
    console.error("Gemini Error:", err);
    return `I'm having a little signal interference from a nebula, but keep trying! You can do it! 🌌 ${err.message || ''}`;
  }
};
