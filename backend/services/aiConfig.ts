import { GoogleGenAI } from '@google/genai';

// Ensure the AI client is instantiated safely.
// Note: If GEMINI_API_KEY is missing, env.ts validation will catch it on startup.
export const aiClient = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY as string 
});

export const aiConfig = {
  model: process.env.AI_MODEL || 'gemini-2.5-flash',
  timeout: process.env.AI_TIMEOUT ? parseInt(process.env.AI_TIMEOUT, 10) : 30000,
  fallbackEnabled: true,
};
