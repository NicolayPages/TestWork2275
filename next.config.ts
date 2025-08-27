import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@import "@/ui/styles/variables.scss";`,
  },
  turbopack: {
    root: path.join(__dirname, '.'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/product-images/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
