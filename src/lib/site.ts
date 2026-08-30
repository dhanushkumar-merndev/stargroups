import type { Metadata } from "next";

export const SITE_NAME = "Star Groups";
export const SITE_URL = "https://www.stargroups.info";
export const SITE_TITLE =
  "Star Groups — Bengaluru Multi-Sector Business Group";
export const SITE_DESCRIPTION =
  "Star Groups is a fast-growing Bengaluru-based business group operating across real estate, interiors, landscaping, technology, media, marketing and venture capital.";
export const SOCIAL_IMAGE_ALT =
  "Star Groups, a fast-growing multi-sector business group based in Bengaluru";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: "/twitter-image",
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
  };
}
