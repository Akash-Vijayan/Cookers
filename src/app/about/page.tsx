import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Target, Flame, Heart, ShieldAlert, ChefHat } from 'lucide-react';

export const metadata: Metadata = {
  title: "About Us | DD Cookers Catering Services Tirunelveli",
  description: "Learn about DD Cookers history, central kitchen capabilities, food safety protocols, and master culinary chefs serving Tirunelveli since 2008.",
  alternates: {
    canonical: "https://ddcookers.com/about",
  },
};

export default function AboutPage() {
  const chefs = [
    {
      id: '1',
      name: "Master Chef Velu",
      designation: "Executive Head Chef",
      specialty: "Traditional Banquets & Slow Grills",
      experience: 15,
      bio: "Chef Velu spent over a decade perfecting authentic Indian and continental recipes. He curates the main event buffets.",
      imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: '2',
      name: "Sous Chef Karthik",
      designation: "Sous Chef",
      specialty: "Interactive Live Cooking Stations",
      experience: 9,
      bio: "Chef Karthik runs our famous live tossing pasta, pizza, and noodle stations with theatrical flare and fast pacing.",
      imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: '3',
      name: "Chef Deepa",
      designation: "Pastry & Dessert Chef",
      specialty: "Artisanal Confectionery & Sweet Bars",
      experience: 10,
      bio: "Chef Deepa curates our sweet spreads, cotton candy machines, popcorn bars, and traditional hot pudding counters.",
      imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground">
      
      {/* 1. Header Banner */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 bg-card/45 border-b border-border/45 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80"
            alt="About Banner Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-6">
            <Link href="/" className="hover:text-brass transition">Home</Link>
            <span className="text-brass/30">&bull;</span>
            <span className="text-brass">About Us</span>
          </div>

          <div className="text-center space-y-4 flex flex-col items-center">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
              Our Heritage
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
              About <span className="font-serif italic text-brass">Us</span>
            </h1>
            <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Pioneering premium catering experiences and live cooking stations in Tirunelveli since 2008.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Story & Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-brass text-xs uppercase font-extrabold tracking-wider block">Our Journey</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Serving Happiness Since <span className="font-serif italic text-brass">2008</span>
          </h2>
          <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
            DD Cookers was established in 2008 at Tirunelveli with a single core vision: to combine delicious authentic flavors with engaging live cooking theater. Over the years, we grew from preparing local birthday setups to delivering multi-cuisine buffet menus for large wedding receptions and corporate gatherings.
          </p>
          <p className="text-foreground/75 leading-relaxed text-sm">
            We operate out of a modern kitchen center equipped with thermal carriers to serve hot dishes. Whether it is an intimate housewarming of 50 guests or a grand reception of 1000+, we treat every event with the same culinary care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-brass pl-4">
              <h4 className="font-extrabold text-lg text-brass">Established</h4>
              <p className="text-xs text-foreground/70 mt-1">Catering since 2008 in Tirunelveli.</p>
            </div>
            <div className="border-l-4 border-carmine pl-4">
              <h4 className="font-extrabold text-lg text-carmine">Kitchen Scale</h4>
              <p className="text-xs text-foreground/70 mt-1">Optimized for up to 5000+ daily meals.</p>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-border">
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
            alt="Chefs preparing catering feast"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4">
            <div className="mx-auto inline-flex bg-carmine/15 p-3 rounded-2xl text-carmine">
              <Target className="h-6 w-6 text-carmine" />
            </div>
            <h3 className="font-extrabold text-lg text-brass">Our Mission</h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              To design outstanding and hygienic event buffets through premium local ingredients, master cooking methods, and custom menus.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4">
            <div className="mx-auto inline-flex bg-brass/15 p-3 rounded-2xl text-brass">
              <Flame className="h-6 w-6 text-brass" />
            </div>
            <h3 className="font-extrabold text-lg text-brass">Our Vision</h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              To be the premier catering brand in Tirunelveli, recognized for blending multi-cuisine setups with live, theatrical snack stations.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl text-center space-y-4">
            <div className="mx-auto inline-flex bg-carmine/15 p-3 rounded-2xl text-carmine">
              <Heart className="h-6 w-6 text-carmine" />
            </div>
            <h3 className="font-extrabold text-lg text-brass">Core Values</h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Total food safety, ingredient transparency, prompt event coordination, and dedicated hospitality for every guest.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Hygiene & Safety Commitment */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-[#B32E33] to-[#6E151A] text-bone rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex bg-black/20 p-2.5 rounded-xl text-bone">
              <ShieldAlert className="h-6 w-6 text-brass" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-bone">
              Food Safety & Clean Kitchen Protocol
            </h3>
            <p className="text-bone/90 text-sm md:text-base leading-relaxed">
              Hygiene is our highest parameter. We execute strict kitchen checks, thermal sanitization of cookware, and routine health clearance for all staff. From storage to buffet presentation, food is handled under clean, climate-controlled guidelines.
            </p>
          </div>
          <div className="bg-black/20 p-6 rounded-2xl border border-white/20 space-y-3.5 text-xs backdrop-blur-md">
            <p className="font-bold border-b border-white/20 pb-2 text-brass">Our Commitments:</p>
            <p className="flex items-center space-x-2">✔ <span>Sourced fresh daily from local vendors</span></p>
            <p className="flex items-center space-x-2">✔ <span>Sanitized transport & thermal delivery containers</span></p>
            <p className="flex items-center space-x-2">✔ <span>Biodegradable tableware & strict waste clearing</span></p>
          </div>
        </div>
      </section>

      {/* 5. Chefs Profiles Grid */}
      <section id="chefs" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-brass text-xs uppercase font-extrabold tracking-wider block">Kitchen Artisans</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Meet Our <span className="font-serif italic text-brass">Master Chefs</span>
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Our kitchen team brings decades of combined cooking experience to draft unique recipes for your guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef) => (
              <div
                key={chef.id}
                className="group bg-card border border-border hover:border-brass/40 rounded-3xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="relative h-72 w-full overflow-hidden bg-card">
                  <Image
                    src={chef.imageUrl}
                    alt={chef.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-550"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240808]/90 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-bone font-extrabold text-xl">{chef.name}</h3>
                      <p className="text-brass text-xs font-bold uppercase tracking-wider mt-0.5">{chef.designation}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-foreground/50 border-b border-border pb-3">
                    <span className="flex items-center space-x-1">
                      <ChefHat className="h-4 w-4 text-brass shrink-0" />
                      <span>{chef.specialty}</span>
                    </span>
                    <span>{chef.experience} Yrs Exp</span>
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed italic">
                    &quot;{chef.bio}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
