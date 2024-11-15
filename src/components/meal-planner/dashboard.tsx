"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pizza, ChevronRight, Sandwich, Soup } from 'lucide-react';

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "breakfast";
  if (hour < 17) return "lunch";
  return "dinner";
};

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState('');
  const mealTime = getTimeBasedGreeting();
  
  const moodOptions = [
    { emoji: "🔥", text: "Something spicy", icon: Pizza, color: "bg-red-500" },
    { emoji: "🥗", text: "Light & healthy", icon: Sandwich, color: "bg-green-500" },
    { emoji: "🍝", text: "Comfort food", icon: Soup, color: "bg-yellow-500" },
    { emoji: "⚡", text: "Quick & easy", icon: Pizza, color: "bg-blue-500" },
    { emoji: "🎲", text: "Surprise me!", icon: Pizza, color: "bg-purple-500" }
  ];

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
                  onClick={() => setSelectedMood(mood.text)}
                  className={`${mood.color} text-white hover:opacity-90 
                    transform hover:scale-105 transition-all h-16
                    border-2 border-black shadow-pop`}
                >
                  <span className="text-2xl mr-2">{mood.emoji}</span>
                  {mood.text}
                </Button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button 
                variant="outline" 
                className="border-2 border-primary shadow-pop h-16"
              >
                View Saved Meals
                <ChevronRight className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary shadow-pop h-16"
              >
                Spin the Meal Wheel
                <ChevronRight className="ml-2" />
              </Button>
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
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-primary">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-2" />
                    <p className="font-medium">Saved Meal {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}