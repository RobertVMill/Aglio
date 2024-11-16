"use client";

import React, { useEffect, useState, useCallback } from 'react';
import QuickMealIdeas from './QuickMealIdeas';
import ChatInterface from './ChatInterface';
import type { UserMood } from '@/types';

// Types
type LocationData = {
  city?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
};

export default function Dashboard() {
  const [locationData, setLocationData] = useState<LocationData>({});
  const [season, setSeason] = useState<string>("");
  const [userMood, setUserMood] = useState<UserMood>(null);
  const [conversation, setConversation] = useState<Array<{type: 'ai' | 'user', message: string}>>([]);

  // Generate initial greeting
  const generateInitialGreeting = useCallback((location: LocationData, currentSeason: string) => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const locationName = location?.city || location?.country_name || "your area";
    return `${timeGreeting}! Welcome to ${locationName}. It's a beautiful ${currentSeason} day for cooking!`;
  }, []);

  useEffect(() => {
    const fetchLocationAndSeason = async () => {
      try {
        const locationResponse = await fetch('/api/locationData');
        const location: LocationData = await locationResponse.json();
        setLocationData(location);

        // Determine season
        const month = new Date().getMonth() + 1;
        const hemisphere = location.latitude && location.latitude > 0 ? 'northern' : 'southern';
        
        let currentSeason = "winter";
        if (hemisphere === 'northern') {
          if (month >= 3 && month <= 5) currentSeason = "spring";
          else if (month >= 6 && month <= 8) currentSeason = "summer";
          else if (month >= 9 && month <= 11) currentSeason = "autumn";
        } else {
          if (month >= 3 && month <= 5) currentSeason = "autumn";
          else if (month >= 6 && month <= 8) currentSeason = "winter";
          else if (month >= 9 && month <= 11) currentSeason = "spring";
        }
        
        setSeason(currentSeason);
        
        // Set initial AI message
        setConversation([{
          type: 'ai',
          message: generateInitialGreeting(location, currentSeason)
        }]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setConversation([{
          type: 'ai',
          message: "Welcome! Let's find something delicious to cook today!"
        }]);
      }
    };

    fetchLocationAndSeason();
  }, [generateInitialGreeting]);

  const handleMoodSelection = (mood: UserMood) => {
    setUserMood(mood);
    const moodBasedMessages: Record<NonNullable<UserMood>, string> = {
      energetic: "Since you're feeling energetic, how about trying something new? I've got some exciting recipes that match your energy!",
      tired: "On low-energy days like this, I'd recommend some easy-to-make comfort food. Let me show you some quick options.",
      hungry: "I hear you! Let's find something delicious and quick to satisfy that hunger. Here are some 30-minute meals:",
      relaxed: "Perfect time to explore some new flavors! Would you like to try something seasonal?"
    };
    
    if (mood) {
      setConversation([
        ...conversation,
        { type: 'user', message: `I'm feeling ${mood}` },
        { type: 'ai', message: moodBasedMessages[mood] }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <ChatInterface 
          onMoodSelect={handleMoodSelection}
          locationData={locationData}
          season={season}
          userMood={userMood}
        />
        <QuickMealIdeas userMood={userMood} season={season} />
      </div>
    </div>
  );
}