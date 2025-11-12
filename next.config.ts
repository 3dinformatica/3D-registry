import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/3d-registry",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
