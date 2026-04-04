import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "http://192.168.0.166:3030/api/:path*",
      },
    ];
  },
};

export default nextConfig;
