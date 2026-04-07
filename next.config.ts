import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.166',
        port: '3030',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "http://192.168.0.166:3030/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://192.168.0.166:3030/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
