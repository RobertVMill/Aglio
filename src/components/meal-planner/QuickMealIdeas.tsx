// src/components/meal-planner/QuickMealIdeas.tsx

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MealCard from './MealCard';
import type { UserMood } from '@/types';

interface QuickMealIdeasProps {
  userMood?: UserMood;
  season?: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
}

export default function QuickMealIdeas({ userMood, season }: QuickMealIdeasProps) {
  const [mealIdeas, setMealIdeas] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build query params
        const params = new URLSearchParams();
        if (userMood) params.append('mood', userMood);
        if (season) params.append('season', season);
        
        const response = await fetch(`/api/meal-ideas?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        
        const data = await response.json();
        const meals = data.meals || [];
        
        setMealIdeas(meals.map((meal: Meal) => ({
          idMeal: meal.idMeal || `temp-${Date.now()}`, // Fallback ID if none exists
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory || 'Uncategorized',
          strArea: meal.strArea || 'Unknown Origin',
          strInstructions: meal.strInstructions || 'No instructions available'
        })));
      } catch (err) {
        console.error('Error fetching meals:', err);
        setError('Failed to load meal suggestions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [userMood, season]);

  // Generate title based on mood and season
  const getTitle = () => {
    if (userMood && season) {
      return `Perfect ${season} Recipes for Your ${userMood} Mood`;
    } else if (userMood) {
      return `Recipes to Match Your ${userMood} Mood`;
    } else if (season) {
      return `Perfect ${season} Recipes to Try Today`;
    }
    return 'Recommended Recipes';
  };

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading meal suggestions...</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div 
                key={`skeleton-${index}`} 
                className="h-64 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error: {error}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Empty state
  if (!mealIdeas.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No meals found</CardTitle>
          <p>Try adjusting your preferences for more suggestions.</p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealIdeas.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={{
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                strCategory: meal.strCategory || 'Uncategorized',
                strArea: meal.strArea || 'Unknown Origin',
                strInstructions: meal.strInstructions || 'No instructions available'
              }}
              onLike={() => {/* TODO: Implement like functionality */}}
              onShare={() => {/* TODO: Implement share functionality */}}
              isExpanded={false}
              onToggleExpand={() => {/* TODO: Implement expand functionality */}}
            />
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}