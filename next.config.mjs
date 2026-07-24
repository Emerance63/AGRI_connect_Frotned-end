/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // 1. Tells Next.js to create the 'out' folder for Render
  images: {
    unoptimized: true, // 2. Required so your Unsplash images don't crash the static build
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;