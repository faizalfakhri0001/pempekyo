/** @format */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
