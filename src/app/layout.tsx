import type { Metadata } from "next";
import { Roboto, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://stargroups.co.in"),
  title: {
    default: "Star Groups — A Constellation of Companies",
    template: "%s — Star Groups",
  },
  description:
    "Star Groups is a Bengaluru family of companies spanning real estate, interiors, landscaping, technology and growth marketing — each independent, all pulling in the same direction.",
  keywords: [
    "Star Groups",
    "Star Groups Bengaluru",
    "Star Growth Hub",
    "Star Tech India",
    "Star Spaces",
    "Star Gardens",
    "MAC Reality",
    "Starline Solutions",
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
  ],
  openGraph: {
    title: "Star Groups — A Constellation of Companies",
    description:
      "A Bengaluru family of companies spanning real estate, interiors, landscaping, technology and growth marketing.",
    type: "website",
    locale: "en_IN",
    siteName: "Star Groups",
  },
  twitter: {
    card: "summary_large_image",
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-sg-black">
        <SmoothScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
