import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio images are uploaded to Cloudinary. Add other hosts here if you use them.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
