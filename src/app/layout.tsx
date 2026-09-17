import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DD Cookers | Best Catering Service & Wedding Caterer in Tirunelveli",
  description: "DD Cookers is the premier catering service in Tirunelveli since 2008. We provide delicious, hygienic, and affordable catering for weddings, birthday parties, corporate events, and private family dinners.",
  keywords: ["Caterers in Tirunelveli", "Best Caterers in Tirunelveli", "Catering Services in Tirunelveli", "Wedding Caterers in Tirunelveli", "Wedding Catering services in Tirunelveli", "Corporate Catering", "House Warming Catering"],
  authors: [{ name: "DD Cookers Team" }],
  openGraph: {
    title: "DD Cookers | Premium Catering & Events in Tirunelveli",
    description: "Premium food, setups, and servers since 2008. Get your custom quote today.",
    type: "website",
    locale: "en_US",
    siteName: "DD Cookers",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    "name": "DD Cookers",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "telephone": "+91 94431 56789",
    "email": "info@ddcookers.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6/20, Chukkuparai Therivilai, Agastheeswaram",
      "addressLocality": "Kovalam",
      "postalCode": "629701",
      "addressCountry": "IN"
    },
    "url": "https://ddcookers.com/",
    "priceRange": "₹₹",
    "areaServed": "Tirunelveli",
    "providerMobility": "dynamic"
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-grow w-full flex flex-col">{children}</main>
          <Footer />
          <FloatingWidgets />
        </Providers>
      </body>
    </html>
  );
}
