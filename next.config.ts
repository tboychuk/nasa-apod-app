import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/apod/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.apod.nasa.gov',
        port: '',
        pathname: '/apod/image/**',
      },
    ],
  },
};

export default nextConfig;
