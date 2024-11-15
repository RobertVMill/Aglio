// src/pages/api/getRandomMeal.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get(`${MEALDB_API_URL}/random.php`);
    
    if (data && data.meals) {
      const meal = data.meals[0];
      res.status(200).json({
        name: meal.strMeal,
        description: meal.strInstructions,
        image_url: meal.strMealThumb,
        cuisine: meal.strArea,
        category: meal.strCategory,
        ingredients: Array.from({ length: 20 }, (_, i) => ({
          ingredient: meal[`strIngredient${i + 1}`],
          measure: meal[`strMeasure${i + 1}`],
        })).filter(ingredient => ingredient.ingredient), // Filter out empty ingredients
      });
    } else {
      res.status(404).json({ message: 'No meals found.' });
    }
  } catch (error) {
    console.error('Error fetching random meal:', error);
    res.status(500).json({ message: 'Error fetching random meal' });
  }
}
