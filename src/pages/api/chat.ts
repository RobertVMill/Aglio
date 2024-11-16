import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Types
interface ChatApiRequest {
  message: string;
  mood?: string;
  season?: string;
}

interface ChatApiResponse {
  reply?: string;
  error?: string;
}

interface ChatApiError {
  message: string;
  code?: string;
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, mood, season } = req.body as ChatApiRequest;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful cooking assistant that suggests meals based on mood and season. Keep responses brief and focused on meal suggestions."
        },
        {
          role: "user",
          content: `Current season: ${season}. Mood: ${mood}. User message: ${message}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "I'm not sure what to suggest right now.";
    
    return res.status(200).json({ reply });

  } catch (error) {
    const apiError = error as ChatApiError;
    console.error('API error:', apiError);
    return res.status(500).json({ 
      error: apiError.message || 'Error processing your request'
    });
  }
}