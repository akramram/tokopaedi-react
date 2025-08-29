import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/tokopaedi-react' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tokopaedi-react/' : '',
};

export default nextConfig;
