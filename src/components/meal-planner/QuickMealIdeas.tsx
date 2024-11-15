// src/components/meal-planner/QuickMealIdeas.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

export default function QuickMealIdeas() {
  const [mealIdeas, setMealIdeas] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealIdeas() {
      try {
        const response = await fetch("/api/meal-ideas");
        const data = await response.json();
        setMealIdeas(data.meals);
      } catch (error) {
        console.error("Error fetching meal ideas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMealIdeas();
  }, []);

  if (loading) {
    return <p>Loading meal ideas...</p>;
  }

  return (
    <Card className="border-2 border-primary shadow-pop">
      <CardHeader>
        <CardTitle>Quick Meal Ideas for Tonight</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mealIdeas.length > 0 ? (
          mealIdeas.map((meal) => (
            <div key={meal.idMeal} className="border border-primary rounded-lg p-4">
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="font-bold text-lg">{meal.strMeal}</p>
              <p className="text-sm text-muted-foreground">{meal.strCategory} | {meal.strArea}</p>
              <p className="mt-2 text-sm line-clamp-3">{meal.strInstructions}</p>
            </div>
          ))
        ) : (
          <p>No meal ideas available at the moment. Please try again later!</p>
        )}
      </CardContent>
    </Card>
  );
}
