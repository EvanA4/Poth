import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/poth",
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(" ")
};

console.log(process.env.DEV_ORIGINS)

export default nextConfig;
