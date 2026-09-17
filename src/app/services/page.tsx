import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import InquireServiceButton from '@/components/InquireServiceButton';

export const metadata: Metadata = {
  title: "Catering & Cooking Services | DD Cookers Tirunelveli",
  description: "Explore DD Cookers catering services: Pure Culinary Cooking, Full-Service Banquet Catering, and Interactive Live Food Stalls in Tirunelveli.",
  alternates: {
    canonical: "https://ddcookers.com/services",
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Cooking",
      slug: "cooking",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      description: "Professional bulk cooking solutions. Our expert kitchen crew prepares authentic dishes with traditional tastes and strict hygiene controls under master chef supervision.",
      highlights: ["Master Chef Supervision", "Fresh Local Ingredients", "Traditional Cookware & Spices"]
    },
    {
      title: "Catering",
      slug: "catering",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
      description: "Full-service banquet and event catering. Elegant buffet styling, premium ceramic ware, and dedicated table service crew for grand celebrations.",
      highlights: ["Floral Buffet Setup & Styling", "Dedicated Table Service Crew", "Premium Crockery & Cutlery Included"]
    },
    {
      title: "Stall",
      slug: "stall",
      img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
      description: "Interactive live cooking stalls and street food counters. Engage guests with hot sizzlers, chaat counters, and custom live preparation stations.",
      highlights: ["Live Sizzler & Dosa Counters", "Interactive Street Food Stalls", "Custom Live Dessert Bars"]
    }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground">
      
      {/* Banner */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 bg-card/45 border-b border-border/45 backdrop-blur-sm text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=70"
            alt="Services Banner Background"
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-6 text-left">
            <Link href="/" className="hover:text-brass transition">Home</Link>
            <span className="text-brass/30">&bull;</span>
            <span className="text-brass">Services</span>
          </div>

          <div className="text-center space-y-4 flex flex-col items-center">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
              Our Offerings
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
              Catering <span className="font-serif italic text-brass">Services</span>
            </h1>
            <p className="text-foreground/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Professional cooking, full-service catering, and live food stalls for groups from 50 to 1000+ guests in Tirunelveli.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.slug}
              className="group bg-card border border-border hover:border-brass/40 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-card">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-carmine text-bone text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-carmine/20 shadow-md">
                    Catering
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-extrabold text-xl text-brass group-hover:text-brass transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {svc.description}
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-foreground/80 pl-2 border-l border-brass/40">
                    {svc.highlights.map((h, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-brass shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-card/70 grid grid-cols-2 gap-4">
                <InquireServiceButton />
                <Link
                  href={`/services/${svc.slug}`}
                  className="py-2.5 rounded-xl bg-carmine hover:bg-carmine/90 text-bone text-xs font-bold text-center transition flex items-center justify-center space-x-1"
                >
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border text-foreground rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="bg-carmine/10 text-carmine border border-carmine/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Bespoke Event Planning
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight text-foreground">Need a custom menu card design?</h3>
            <p className="text-foreground/75 text-sm leading-relaxed">
              If our standard service layouts do not cover your event plan, our chef board can draft custom plating profiles, ingredients lists, and server schedules tailored for you.
            </p>
            <div className="pt-4">
              <InquireServiceButton
                label="Inquire For Custom Plan"
                className="px-6 py-3 bg-carmine hover:bg-carmine/90 text-bone font-bold rounded-xl shadow-md transition cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
