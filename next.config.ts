import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@import "@/styles/variables.scss";`,
  },
};

export default nextConfig;
