// src/components/meal-planner/SeasonalGreeting.tsx
"use client";

import React, { useEffect, useState } from 'react';

const SeasonalGreeting: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);

  useEffect(() => {
    // Step 1: Fetch Location
    async function fetchLocation() {
      try {
        const response = await fetch('/api/getLocation'); // Set up a backend endpoint for location API
        const data = await response.json();
        setLocation(data.location);
        
        // Step 2: Determine the season
        const month = new Date().getMonth() + 1;
        const isNorthernHemisphere = data.location.includes("Northern Hemisphere");
        const currentSeason = determineSeason(month, isNorthernHemisphere);
        setSeason(currentSeason);
      } catch (error) {
        console.error("Failed to fetch location", error);
      }
    }

    fetchLocation();
  }, []);

  // Function to determine season based on hemisphere and month
  function determineSeason(month: number, isNorthern: boolean) {
    if (isNorthern) {
      if (month <= 2 || month === 12) return "Winter";
      if (month >= 3 && month <= 5) return "Spring";
      if (month >= 6 && month <= 8) return "Summer";
      return "Fall";
    } else {
      if (month <= 2 || month === 12) return "Summer";
      if (month >= 3 && month <= 5) return "Fall";
      if (month >= 6 && month <= 8) return "Winter";
      return "Spring";
    }
  }

  return (
    <div className="seasonal-greeting">
      <h2>
        {location && season
          ? `Hey there! It’s ${season} in ${location}. How about some seasonal meals?`
          : "Welcome back!"}
      </h2>
      {/* Optionally display seasonal meal ideas here */}
    </div>
  );
};

export default SeasonalGreeting;
