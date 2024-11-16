// src/pages/api/meal-ideas.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Define types for our meal data
interface MealDB {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strTags?: string;
}

// Define query parameters type
interface MealQueryParams {
  mood?: string;
  season?: string;
}

// Define the mood mappings
const moodCategories: Record<string, string[]> = {
  energetic: ['Seafood', 'Vegetarian', 'Chicken'],
  tired: ['Pasta', 'Rice', 'Soup'],
  hungry: ['Beef', 'Pork', 'Chicken', 'Pasta'],
  relaxed: ['Dessert', 'Side', 'Vegetarian']
};

// Define seasonal preferences
const seasonalPreferences: Record<string, string[]> = {
  summer: ['Seafood', 'Salad', 'Vegetarian'],
  winter: ['Soup', 'Beef', 'Pasta'],
  autumn: ['Soup', 'Vegetarian', 'Beef'],
  spring: ['Vegetarian', 'Seafood', 'Chicken']
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Type assertion for query parameters
  const { mood, season } = req.query as MealQueryParams;

  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    
    let meals: MealDB[] = data.meals || [];

    if (mood || season) {
      meals = meals.filter((meal: MealDB) => {
        let matchesMood = true;
        let matchesSeason = true;

        if (mood && moodCategories[mood]) {
          const moodPrefs = moodCategories[mood];
          matchesMood = moodPrefs.some(category => 
            meal.strCategory?.toLowerCase().includes(category.toLowerCase())
          );
        }

        if (season && seasonalPreferences[season]) {
          const seasonPrefs = seasonalPreferences[season];
          matchesSeason = seasonPrefs.some(category =>
            meal.strCategory?.toLowerCase().includes(category.toLowerCase())
          );
        }

        return matchesMood && matchesSeason;
      });

      if (meals.length === 0) {
        meals = data.meals
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      }

      meals = meals.slice(0, 6);
    }

    const mealsWithScore = meals.map((meal: MealDB) => {
      let relevanceScore = 0;

      if (mood && moodCategories[mood]) {
        if (moodCategories[mood].some(category => 
          meal.strCategory?.toLowerCase().includes(category.toLowerCase())
        )) {
          relevanceScore += 2;
        }
      }

      if (season && seasonalPreferences[season]) {
        if (seasonalPreferences[season].some(category => 
          meal.strCategory?.toLowerCase().includes(category.toLowerCase())
        )) {
          relevanceScore += 2;
        }
      }

      return {
        ...meal,
        relevanceScore
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);

    res.status(200).json({
      meals: mealsWithScore,
      filters: { mood, season },
      total: mealsWithScore.length
    });
    
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch meal ideas." });
  }
}