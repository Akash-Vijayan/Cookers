import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, Phone } from 'lucide-react';
import InquireServiceButton from '@/components/InquireServiceButton';

export const metadata: Metadata = {
  title: "Interactive Live Food Stalls | DD Cookers Tirunelveli",
  description: "Live food stalls and interactive cooking counters in Tirunelveli. Dosa, chaat, live barbecue, popcorn, cotton candy, and dessert bars for events.",
  alternates: {
    canonical: "https://ddcookers.com/services/stall",
  },
};

export default function StallServicePage() {
  const features = [
    "Interactive live cooking stations and custom street food counters",
    "Live hot dosa grills, spicy pani puri, and chat counters",
    "Traditional hot pudding boilers and filter coffee counters",
    "Experienced counter chefs delivering exciting cooking theater",
    "Clean, customized wooden or premium gold-accented stall designs",
    "Scalable setups ideal for birthday private parties and grand wedding receptions"
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
          <span className="text-brass">Stall</span>
        </div>

        {/* Header Title */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
            Specialized Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-none pt-2">
            Live <span className="font-serif italic text-brass">Stalls</span>
          </h1>
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed max-w-2xl">
            Interactive food theater and live-cooked delicacies. Add excitement to your events with our customizable street counters and live snack setups.
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-border bg-card">
          <Image
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80"
            alt="Live food stalls and counters"
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
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
              <h4 className="font-extrabold text-lg text-foreground">Custom Live Stalls</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Configure your live stations. We support small family gathers and massive corporate conventions.
              </p>
            </div>
            
            <div className="space-y-3 text-xs font-bold text-foreground/85">
              <div className="flex justify-between border-b border-border/50 pb-2.5">
                <span className="text-foreground/60">Stall Design Options</span>
                <span>Traditional Wooden or Premium Metallic</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2.5">
                <span className="text-foreground/60">Live Counters Included</span>
                <span>Chaat, Snacks & Hot Drinks</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-foreground/60">Counter Chef Crew</span>
                <span className="text-brass">Included with Equipment Setup</span>
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
