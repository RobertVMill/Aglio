// src/components/meal-planner/Dashboard.tsx

import React from 'react';
import QuickMealIdeas from './QuickMealIdeas';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-2 border-primary shadow-pop">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              Hey there, foodie! 👋
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Meal Ideas Component */}
        <QuickMealIdeas />
      </div>
    </div>
  );
}
