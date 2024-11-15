// src/pages/api/getLocations.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY');
    const data = await response.json();

    if (!data) {
      res.status(404).json({ message: 'Location not found' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching location:', error); // Now the error is logged
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
