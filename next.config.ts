import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimasi untuk external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Bypass image optimization untuk dev lebih cepat
  },
};

export default nextConfig;
