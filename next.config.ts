import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/registry",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
