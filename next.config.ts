import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Static link-in-bio pages live in public/<slug>/index.html.
      {
        source: "/:slug(star-growth-hub|star-tech-india|star-production-house)",
        destination: "/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
