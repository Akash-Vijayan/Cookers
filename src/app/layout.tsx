import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookers | Premium Catering & Live Cooking Event Services",
  description: "Elegant, customized catering solutions for weddings, corporate galas, and private events. Features live cooking, dessert bars, and bespoke culinary design.",
  keywords: ["catering", "wedding catering", "corporate events", "live cooking", "custom food counters", "buffet service", "cooks", "private chef"],
  authors: [{ name: "Cookers Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal dark:bg-charcoal dark:text-cream transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-grow w-full flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
