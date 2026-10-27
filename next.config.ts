import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Static link-in-bio pages live in public/links/<slug>/index.html.
      {
        source: "/links/:slug(star-growth-hub|star-tech-india)",
        destination: "/links/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
