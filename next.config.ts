import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Allow mobile network IP for stable Dev Mode testing */
  allowedDevOrigins: ['192.168.20.4'],
};

export default nextConfig;
