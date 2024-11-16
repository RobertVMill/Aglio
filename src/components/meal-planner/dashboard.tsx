"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import QuickMealIdeas from './QuickMealIdeas';

// Define a type for the location data
type LocationData = {
  city?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
};

export default function Dashboard() {
  const [introMessage, setIntroMessage] = useState("");

  // Function to determine the day of the week and time-based message
  const generateGreetingMessage = (locationData: LocationData, season: string) => {
    const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: 'long' });
    const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening";
    const locationName = locationData?.city || locationData?.country_name || "your area";

    return `Happy ${dayOfWeek}! It's ${timeOfDay} in ${locationName}. This ${season} season is perfect for a cozy meal!`;
  };

  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        // Fetch the location data from the API route
        const locationResponse = await fetch('/api/locationData');
        const locationData: LocationData = await locationResponse.json();

        // Determine the season based on the location data
        const month = new Date().getMonth() + 1;
        const hemisphere = locationData.latitude && locationData.latitude > 0 ? 'northern' : 'southern';

        let season = "winter";
        if (hemisphere === 'northern') {
          if (month >= 3 && month <= 5) season = "spring";
          else if (month >= 6 && month <= 8) season = "summer";
          else if (month >= 9 && month <= 11) season = "fall";
        } else {
          if (month >= 3 && month <= 5) season = "fall";
          else if (month >= 6 && month <= 8) season = "winter";
          else if (month >= 9 && month <= 11) season = "spring";
        }

        const message = generateGreetingMessage(locationData, season);
        setIntroMessage(message);
      } catch (error) {
        console.error("Error fetching intro message data:", error);
        setIntroMessage("Welcome back, foodie! Ready to explore delicious meal ideas?");
      }
    };

    fetchIntroData();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Dynamic Intro Message */}
        <Card className="border-2 border-primary shadow-pop">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              {introMessage}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Meal Ideas */}
        <QuickMealIdeas />
      </div>
    </div>
  );
}
