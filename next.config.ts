import type { NextConfig } from "next";

const hostnamePattern =
  /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const extraImageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
  .split(",")
  .map((hostname) => hostname.trim().toLowerCase())
  .filter((hostname) => hostnamePattern.test(hostname) && hostname !== "res.cloudinary.com");

const backendUrl = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://amader-agency-backend.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: ["res.cloudinary.com", ...extraImageHosts].map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;