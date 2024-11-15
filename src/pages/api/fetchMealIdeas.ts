// src/pages/api/fetchMealIdeas.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface MealResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = (await response.json()) as MealResponse;

    if (!data.meals) {
      res.status(404).json({ message: 'No meals found' });
      return;
    }

    res.status(200).json(data.meals);
  } catch (error) {
    console.error('Error fetching meal ideas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
