import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5129',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5036',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://168.144.125.16:5002/api/:path*',
      },
    ];
  },
};

export default nextConfig;
