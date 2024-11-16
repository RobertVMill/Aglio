// src/pages/api/getSeasonalMeals.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Define the expected structure of the geolocation response
interface GeolocationResponse {
  country_name: string;
  latitude: number;
}

async function getSeasonalMeals(req: NextApiRequest, res: NextApiResponse) {
  try {
    const GEOLOCATION_API_KEY = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;

    if (!GEOLOCATION_API_KEY) {
      throw new Error("Missing API key for IP Geolocation.");
    }

    // Fetch user location using IP
    const { data: locationData } = await axios.get<GeolocationResponse>(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}`
    );

    const { country_name, latitude } = locationData;

    // Determine season based on latitude and current date
    const month = new Date().getMonth(); // 0 = January, 11 = December
    let season = "Winter";

    if (latitude > 0) {
      // Northern Hemisphere
      if (month >= 2 && month <= 4) season = "Spring";
      else if (month >= 5 && month <= 7) season = "Summer";
      else if (month >= 8 && month <= 10) season = "Autumn";
    } else {
      // Southern Hemisphere
      if (month >= 2 && month <= 4) season = "Autumn";
      else if (month >= 5 && month <= 7) season = "Winter";
      else if (month >= 8 && month <= 10) season = "Spring";
    }

    // Fetch seasonal meal ideas (mocked data or use an external API)
    const seasonalMeals = [
      { name: "Pumpkin Soup", description: "Perfect for Autumn.", image: "https://example.com/pumpkin.jpg" },
      { name: "Watermelon Salad", description: "Refreshing Summer dish.", image: "https://example.com/watermelon.jpg" },
    ];

    res.status(200).json({ season, country: country_name, meals: seasonalMeals });
  } catch (error) {
    console.error("Error fetching seasonal meals:", error);
    res.status(500).json({ error: "Failed to fetch seasonal meals." });
  }
}

export default getSeasonalMeals;
