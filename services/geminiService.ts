
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPTS = {
    summary: `You are a professional resume writer. Rewrite the following resume summary to be more impactful, professional, and tailored for a software engineering role. Focus on action verbs and quantifiable achievements. The output should be a single paragraph.`,
    bulletPoint: `You are a professional resume writer. Rewrite the following resume bullet point to be more concise and impactful using the STAR (Situation, Task, Action, Result) method. Start with a strong action verb and quantify the result if possible. The output should be a single sentence.`
};

export const enhanceWithAI = async (text: string, type: 'summary' | 'bulletPoint'): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is not configured. AI features are disabled.");
    }
    
    if (!text.trim()) {
        return "";
    }

    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${PROMPTS[type]}\n\nHere is the text to improve:\n\n"${text}"`,
            config: {
                temperature: 0.7,
                topP: 0.95,
                // Disable thinking for faster responses on these short tasks
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        
        return result.text.trim();
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to enhance text with AI. Please check your API key and network connection.');
    }
};
