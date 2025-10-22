import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyDOCgN7Lqmtxk8wbhWtpKOsnXM5OjmhJtU";

const ai = new GoogleGenAI({ apiKey });

export const runChat = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text ?? '';
}
