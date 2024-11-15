// src/components/meal-planner/Dashboard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import QuickMealIdeas from './QuickMealIdeas';
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Removed unused CardContent

function getGreetingMessage() {
  const day = new Date().toLocaleString('en-US', { weekday: 'long' });
  const hour = new Date().getHours();
  let mealTime = '';

  if (hour < 12) mealTime = 'breakfast';
  else if (hour < 17) mealTime = 'lunch';
  else mealTime = 'dinner';

  return `Happy ${day}! Ready for a delicious ${mealTime}?`;
}

export default function Dashboard() {
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    setGreetingMessage(getGreetingMessage());
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Greeting Section */}
        <Card className="border-2 border-primary shadow-pop mb-4">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              {greetingMessage}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Meal Ideas */}
        <QuickMealIdeas />
      </div>
    </div>
  );
}
