import { GoogleGenAI } from "@google/genai";
import { getEnvVariable } from "../helpers/environment";

const ai = new GoogleGenAI({ apiKey: getEnvVariable("VITE_GEMINI_API_KEY") });

export const runChat = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text ?? '';
}
