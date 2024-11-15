// src/pages/api/meal-ideas.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    res.status(200).json({ meals: data.meals });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch meal ideas." });
  }
}
