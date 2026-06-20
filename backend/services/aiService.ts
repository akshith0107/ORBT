import { Type, Schema } from '@google/genai';
import { aiClient, aiConfig } from './aiConfig';

export interface TaskAnalysisResult {
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedHours: number;
  completionProbability: number;
  aiSummary: string;
  subtasks: string[];
}

const taskAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    priority: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH'] },
    difficulty: { type: Type.STRING, enum: ['EASY', 'MEDIUM', 'HARD'] },
    estimatedHours: { type: Type.NUMBER },
    completionProbability: { type: Type.INTEGER },
    aiSummary: { type: Type.STRING },
    subtasks: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ['priority', 'difficulty', 'estimatedHours', 'completionProbability', 'aiSummary', 'subtasks']
};

export async function analyzeTask(title: string, description?: string, dueDate?: string): Promise<TaskAnalysisResult> {
  const fallback: TaskAnalysisResult = {
    priority: 'MEDIUM',
    difficulty: 'MEDIUM',
    estimatedHours: 2,
    completionProbability: 80,
    aiSummary: 'Task requires standard execution.',
    subtasks: ['Review requirements', 'Execute task', 'Verify completion']
  };

  // We rely on backend startup validation for GEMINI_API_KEY. 
  // We can still keep the fallback for network errors or timeout.

  const prompt = `Analyze this task:
Title: ${title}
Description: ${description || 'None'}
Due Date: ${dueDate || 'None'}

Provide:
1. Priority (HIGH/MEDIUM/LOW)
2. Difficulty (EASY/MEDIUM/HARD)
3. Estimated Hours (float)
4. Completion Probability (0-100)
5. A brief 1-sentence summary of what executing this entails.
6. A breakdown of 3 to 5 logical sequential subtasks (strings).`;

  try {
    const response = await aiClient.models.generateContent({
      model: aiConfig.model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: taskAnalysisSchema,
        temperature: 0.2
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TaskAnalysisResult;
    }
    return fallback;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return fallback; // Return fallback on failure as requested
  }
}

export interface HabitCoachResult {
  mostConsistent: string;
  mostMissed: string;
  riskScore: number;
  suggestion: string;
}

const habitSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    mostConsistent: { type: Type.STRING },
    mostMissed: { type: Type.STRING },
    riskScore: { type: Type.INTEGER },
    suggestion: { type: Type.STRING }
  },
  required: ['mostConsistent', 'mostMissed', 'riskScore', 'suggestion']
};

export async function analyzeHabits(habitData: any): Promise<HabitCoachResult> {
  const fallback: HabitCoachResult = {
    mostConsistent: 'N/A',
    mostMissed: 'N/A',
    riskScore: 50,
    suggestion: 'Maintain consistency and log your habits daily.'
  };

  try {
    const response = await aiClient.models.generateContent({
      model: aiConfig.model,
      contents: `Analyze these habits and streaks: ${JSON.stringify(habitData)}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: habitSchema,
        temperature: 0.3
      }
    });
    if (response.text) {
      return JSON.parse(response.text) as HabitCoachResult;
    }
    return fallback;
  } catch (error) {
    console.error('Gemini AI Habit Error:', error);
    return fallback;
  }
}
