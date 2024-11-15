import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type DallEResponse = {
  data: { url: string }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    const response = await axios.post<DallEResponse>(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Safely access the URL using the type
    const imageUrl = response.data.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL found in the response');
    }

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image. Please try again later.' });
  }
}
