import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Display: Bricolage Grotesque. Body: Hind Siliguri (Latin + Bengali).
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-src", display: "swap" });
const body = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-body-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
