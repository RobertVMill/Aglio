"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pizza, ChevronRight, Sandwich, Soup } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Recipe } from '@/types';
import Image from 'next/image';

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "breakfast";
  if (hour < 17) return "lunch";
  return "dinner";
};

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const mealTime = getTimeBasedGreeting();

  const moodOptions = [
    { emoji: "🔥", text: "Something spicy", icon: Pizza, color: "bg-red-500" },
    { emoji: "🥗", text: "Light & healthy", icon: Sandwich, color: "bg-green-500" },
    { emoji: "🍝", text: "Comfort food", icon: Soup, color: "bg-yellow-500" },
    { emoji: "⚡", text: "Quick & easy", icon: Pizza, color: "bg-blue-500" },
    { emoji: "🎲", text: "Surprise me!", icon: Pizza, color: "bg-purple-500" }
  ];

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  // Fetch recipes from Supabase
  useEffect(() => {
    async function loadRecipes() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data || []);
      }
    }

    loadRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Pop Art Header Icons */}
        <div className="grid grid-cols-4 gap-4">
          {moodOptions.slice(0, 4).map((option, i) => (
            <div 
              key={i}
              className={`${option.color} p-6 rounded-lg shadow-pop border-2 border-black 
                transform hover:scale-105 transition-transform cursor-pointer`}
            >
              <option.icon className="w-12 h-12 text-white" />
            </div>
          ))}
        </div>

        {/* AI Daily Greeting */}
        <Card className="border-2 border-primary shadow-pop">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              Hey there, foodie! 👋
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-card-foreground">
              What are you feeling like for {mealTime} tonight?
            </p>

            {/* Mood Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.text}
                  variant="outline"
                  onClick={() => handleMoodSelection(mood.text)}
                  className={`${mood.color} text-white hover:opacity-90 
                    transform hover:scale-105 transition-all h-16
                    border-2 border-black shadow-pop
                    ${selectedMood === mood.text ? 'ring-4 ring-white' : ''}`}
                >
                  <span className="text-2xl mr-2">{mood.emoji}</span>
                  {mood.text}
                </Button>
              ))}
            </div>

            {/* Show selected mood feedback */}
            {selectedMood && (
              <p className="text-lg text-primary animate-fade-in">
                Great choice! Lets find you something {selectedMood.toLowerCase()}...
              </p>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button 
                variant="outline" 
                className="border-2 border-primary shadow-pop h-16"
              >
                View Saved Meals
                <ChevronRight className="ml-2" />
              </Button>
              <Link href="/wheel" className="w-full">
                <Button 
                  variant="outline"
                  className="border-2 border-primary shadow-pop h-16 w-full"
                >
                  Spin the Meal Wheel
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recently Saved Meals */}
        <Card className="border-2 border-primary shadow-pop">
          <CardHeader>
            <CardTitle>Recently Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <Card key={recipe.id} className="border border-primary">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-2">
                        {recipe.image_url && (
                          <Image
                            src={recipe.image_url}
                            alt={recipe.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        )}
                      </div>
                      <p className="font-medium">{recipe.name}</p>
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No saved recipes available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
