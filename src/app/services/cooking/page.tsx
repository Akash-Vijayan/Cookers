import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, Phone } from 'lucide-react';
import InquireServiceButton from '@/components/InquireServiceButton';

export const metadata: Metadata = {
  title: "Bulk Cooking & Master Chef Services | DD Cookers Tirunelveli",
  description: "Bulk culinary cooking services in Tirunelveli. Traditional recipes prepared under master chef supervision for grand weddings and temple festivals.",
  alternates: {
    canonical: "https://ddcookers.com/services/cooking",
  },
};

export default function CookingServicePage() {
  const features = [
    "Traditional bulk preparation setups managed by seasoned master chefs",
    "Strict industrial hygiene controls and kitchen safety compliance",
    "Custom recipe adjustments and scalable cooking operations",
    "Locally-sourced fresh ingredients, raw spices, and pure cooking oils",
    "Large-capacity cookware and thermal vessel transportation support",
    "Master kitchen board oversight for grand marriage and temple feast quantities"
  ];

  return (
    <div className="bg-background min-h-screen text-foreground pt-32 lg:pt-40 pb-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-8">
          <Link href="/" className="hover:text-brass transition">Home</Link>
          <span className="text-brass/30">&bull;</span>
          <Link href="/services" className="hover:text-brass transition">Services</Link>
          <span className="text-brass/30">&bull;</span>
          <span className="text-brass">Cooking</span>
        </div>

        {/* Header Title */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
            Specialized Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-none pt-2">
            Cooking <span className="font-serif italic text-brass">Solutions</span>
          </h1>
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed max-w-2xl">
            Experience traditional culinary excellence at scale. We specialize in bulk cooking, authentic recipes, and expert chef teams to make your feast truly exceptional.
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-border bg-card">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=75"
            alt="Professional cooking setup"
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
            quality={80}
            className="object-cover"
          />
        </div>

        {/* Inclusions Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h3 className="font-extrabold text-xl text-brass border-b border-border pb-3">What We Provide</h3>
            <ul className="space-y-3.5 text-xs font-bold text-foreground/80">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <div className="bg-carmine/15 p-1 rounded text-carmine shrink-0 mt-0.5"><Check className="h-4 w-4" /></div>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-brass text-[10px] font-black uppercase tracking-wider block">Booking Quote</span>
              <h4 className="font-extrabold text-lg text-foreground">Custom Cooking Packages</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Plan your exact menu sizing and ingredient profile. We support bulk cooking events from 50 to 5000+ guests in Tirunelveli.
              </p>
            </div>
            
            <div className="space-y-3 text-xs font-bold text-foreground/85">
              <div className="flex justify-between border-b border-border/50 pb-2.5">
                <span className="text-foreground/60">Service Location</span>
                <span>Tirunelveli & Surroundings</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2.5">
                <span className="text-foreground/60">Ingredient Options</span>
                <span>Client Provided or DD Sourced</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-foreground/60">Chef Inclusions</span>
                <span className="text-brass">Master Culinary Crew</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <InquireServiceButton
                label="Book Service"
                className="w-full py-3 bg-carmine hover:bg-carmine/90 text-bone text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center space-x-1.5"
              />
              <a
                href="tel:+919443156789"
                className="w-full py-3 border border-border hover:bg-foreground/5 text-foreground text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
              >
                <Phone className="h-4 w-4 text-brass" />
                <span>Call Expert</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
