import type { NextConfig } from "next";

/**
 * Next.js configuration with custom server external packages and remote image optimization.
 */
const nextConfig: NextConfig = {
  // Exclude these packages from server-side bundling for optimized builds
  serverExternalPackages: ["pino", "pino-pretty"],

  // Configure remote image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
    ],
  },

  // Add additional configuration options here
};

export default nextConfig;


