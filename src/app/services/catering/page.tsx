import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, Calendar } from 'lucide-react';
import InquireServiceButton from '@/components/InquireServiceButton';

export const metadata: Metadata = {
  title: "Full-Service Event Catering | DD Cookers Tirunelveli",
  description: "End-to-end event catering in Tirunelveli. Includes floral buffet setups, uniformed servers, fine crockery, banana leaf spreads, and complete waste clearing.",
  alternates: {
    canonical: "https://ddcookers.com/services/catering",
  },
};

export default function CateringServicePage() {
  const features = [
    "Elegant buffet setups with custom decorations and styling",
    "Experienced, uniformed server teams and event logistics staff",
    "Premium ceramic plates, polished cutlery, and serving warmers",
    "Multi-cuisine wedding banquets and corporate lunch setups",
    "Complete post-event waste management and sanitization protocols",
    "Tailored menu customizations surrounding group dietary restrictions"
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
          <span className="text-brass">Catering</span>
        </div>

        {/* Header Title */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
            Specialized Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-none pt-2">
            Catering <span className="font-serif italic text-brass">Services</span>
          </h1>
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed max-w-2xl">
            Premium hospitality and professional serving logistics. We handle all elements of food layout, crockery, and cleanups for your celebrations.
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-border bg-card">
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
            alt="Catering buffet tables"
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
            className="object-cover"
          />
        </div>

        {/* Inclusions Split */}
        <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
          <h3 className="font-bold text-xl text-foreground">What Is Included in Full-Service Catering:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs font-semibold text-foreground/90">
                <div className="bg-brass/15 p-1 rounded text-brass shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="bg-gradient-to-r from-[#B32E33] to-[#6E151A] text-bone rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-lg">Planning a Grand Celebration?</h4>
            <p className="text-xs text-bone/80">Get customized pricing for your guest count and menu selections.</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <InquireServiceButton
              label="Request Quote"
              className="px-6 py-3 bg-bone text-cacao font-bold text-xs rounded-xl shadow hover:bg-white transition cursor-pointer"
            />
            <Link
              href="/booking"
              className="px-6 py-3 bg-black/30 hover:bg-black/40 text-bone font-bold text-xs rounded-xl transition border border-white/20 flex items-center space-x-1.5"
            >
              <Calendar className="h-4 w-4 text-brass" />
              <span>Book Online</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
