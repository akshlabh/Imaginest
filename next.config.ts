import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
        // pathname: '/**', // allow all image paths under this host
      },
    ],
  },
};

export default nextConfig;
