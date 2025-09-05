import type { NextConfig } from "next";

const nextConfig = {
  images: {
    formats:["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};
export default nextConfig;

