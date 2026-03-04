import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb'
    }
  },
  output: "standalone",
  serverExternalPackages: ["pdf-parse"]
};

export default nextConfig;
