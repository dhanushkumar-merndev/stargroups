import type { Metadata } from "next";
import { Roboto, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  companies,
  GROUP_EMAIL,
  GROUP_PHONE,
} from "@/lib/companies";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
} from "@/lib/site";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Star Groups",
    "Star Groups Bengaluru",
    "Star Growth Hub",
    "Star Tech India",
    "Star Spaces",
    "Star Gardens",
    "MAC Reality",
    "Starline Solutions",
    "Star Production House",
    "Star Infra Developers",
    "Star Venture Capital",
    "Starline Import Export",
    "real estate Bengaluru",
    "interior design Bengaluru",
    "landscaping Bengaluru",
    "software development Bengaluru",
    "digital marketing agency Bengaluru",
    "business automation India",
    "commercial spaces Bengaluru",
    "turnkey interiors Bangalore",
    "landscape architecture India",
    "business conglomerate Bengaluru",
    "video production Bengaluru",
    "venture capital Bengaluru",
    "property development Bengaluru",
    "import export company Bengaluru",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: "Star Groups",
    url: "/",
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/twitter-image",
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification
      ? { other: { "msvalidate.01": bingSiteVerification } }
      : {}),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/company-logo/star-groups-logo.png"),
      },
      description: SITE_DESCRIPTION,
      email: GROUP_EMAIL,
      telephone: GROUP_PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "18, 1st Floor, 80 Feet Road, BSK 1st Stage, Srinivasnagar, Banashankari",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560050",
        addressCountry: "IN",
      },
      subOrganization: companies.map((company) => ({
        "@type": "Organization",
        "@id": `${SITE_URL}/companies/${company.slug}#organization`,
        name: company.name,
        url: absoluteUrl(`/companies/${company.slug}`),
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-sg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
