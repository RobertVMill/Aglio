import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
