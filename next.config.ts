// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keeps strict mode enabled for better debugging
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/media/meals/**', // Allow only meal images
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Replace this if you have other image sources
        pathname: '/**', // Allow all images from example.com
      },
    ],
  },
};

export default nextConfig;
