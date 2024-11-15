// src/pages/api/fetchMealIdeas.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1';
const MEALDB_API_KEY = process.env.MEALDB_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch a random meal from TheMealDB
    const { data } = await axios.get(`${MEALDB_API_URL}/random.php`, {
      params: { api_key: MEALDB_API_KEY },
    });

    if (data && data.meals) {
      const meal = data.meals[0];
      res.status(200).json({
        name: meal.strMeal,
        description: meal.strInstructions,
        image_url: meal.strMealThumb,
        cuisine: meal.strArea,
      });
    } else {
      res.status(404).json({ message: 'No meals found.' });
    }
  } catch (error) {
    console.error('Error fetching meal ideas:', error);
    res.status(500).json({ message: 'Error fetching meal ideas' });
  }
}
