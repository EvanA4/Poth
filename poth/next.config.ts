import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/poth",
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(" "),
  devIndicators: false
};

export default nextConfig;
