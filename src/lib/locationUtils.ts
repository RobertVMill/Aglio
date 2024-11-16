import axios from 'axios';

// Define a type for the expected response from the IP geolocation API
interface LocationData {
  city?: string;
  country_name?: string;
  latitude: number;
  longitude: number;
}

export const fetchLocationData = async (): Promise<LocationData> => {
    const apiKey = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
    try {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
    return response.data as LocationData;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

// Determine the season based on the location's latitude and the current month
export const fetchSeasonData = (locationData: LocationData): string => {
  const month = new Date().getMonth() + 1; // JS months are 0-based
  const hemisphere = locationData.latitude > 0 ? 'northern' : 'southern';

  if (hemisphere === 'northern') {
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "fall";
    return "winter";
  } else {
    if (month >= 3 && month <= 5) return "fall";
    if (month >= 6 && month <= 8) return "winter";
    if (month >= 9 && month <= 11) return "spring";
    return "summer";
  }
};
