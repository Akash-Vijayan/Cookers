import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  ChevronRight, 
  Check, 
  MapPin, 
  ChefHat, 
  Flame,
  UtensilsCrossed
} from 'lucide-react';
import HeroQuoteForm from '@/components/HeroQuoteForm';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import GalleryLightbox from '@/components/GalleryLightbox';
import SignatureMenuTeaser from '@/components/SignatureMenuTeaser';
import StatsSection from '@/components/StatsSection';

export const metadata: Metadata = {
  title: "DD Cookers | Best Catering Service & Wedding Caterer in Tirunelveli",
  description: "DD Cookers provides premium traditional catering services in Tirunelveli since 2008. Specializing in weddings, corporate galas, house warmings, and grand banquets.",
  alternates: {
    canonical: "https://ddcookers.com/",
  },
  openGraph: {
    title: "DD Cookers | Best Catering Service & Wedding Caterer in Tirunelveli",
    description: "Premium food, authentic spice blends, and 50+ professional servers since 2008.",
    url: "https://ddcookers.com/",
    siteName: "DD Cookers",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "DD Cookers Banquet Feast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const testimonials = [
    {
      name: "Senthil Nathan",
      rating: 5,
      text: "The catering for our wedding was spectacular! All our guests loved the traditional taste, especially the live dessert stations. Highly recommended!",
      date: "August 2026"
    },
    {
      name: "Priya Rajan",
      rating: 5,
      text: "Professional corporate event setup. Punctual service, hygienic containers, and excellent menu customisation options. Will hire again.",
      date: "July 2026"
    },
    {
      name: "Murugan Subramanian",
      rating: 5,
      text: "We ordered the House Warming buffet package. Superb flavor, generous portions, and clean setup. Outstanding hospitality!",
      date: "June 2026"
    },
    {
      name: "Kavitha Ramesh",
      rating: 4,
      text: "Skilled cooking crew and amazing setup. The chat and live counters kept the kids entertained. Value for money is top-tier.",
      date: "May 2026"
    },
    {
      name: "Arun Kumar",
      rating: 5,
      text: "Masterful flavors and beautiful presentation. Their team took care of everything from banquet setups to waste management. 10/10 service.",
      date: "April 2026"
    }
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      caption: "Elegant Ballroom Buffet Presentation"
    },
    {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      caption: "Live Grill & Outdoor Buffet Stations"
    },
    {
      url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
      caption: "Handcrafted Artisan Dessert Counters"
    },
    {
      url: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
      caption: "Authentic South Indian Traditional Rice Spread"
    },
    {
      url: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80",
      caption: "Grand Wedding Hall Dining Arrangement"
    },
    {
      url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
      caption: "Fresh Seafood & Live Cooking Display"
    },
    {
      url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      caption: "Royal Biryani & Spicy Curry Gravies"
    },
    {
      url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
      caption: "Crispy Appetizer & Snack Counter Setup"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* 1. HERO BANNER WITH KANNIYAKUMARI COASTAL SUNRISE THEME */}
      <section className="relative min-h-[92vh] flex items-end justify-center pt-28 pb-6 lg:pt-36 lg:pb-0 border-b border-border/60 overflow-hidden bg-transparent">
        
        {/* Kanniyakumari Coastal Sunrise Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-bg.png"
            alt="Kanniyakumari Coastal Background - DD Cookers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-bottom filter contrast-[1.02]"
          />
          {/* Subtle soft gradient to seamlessly blend into light theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/20 via-transparent to-[#FAF8F5]/30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/50 to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            
            {/* Left Column: Founder Photo (Prominent & Grounded at Shoreline) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-end relative order-2 lg:order-1 self-end">
              
              <div className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[540px] flex items-end justify-center lg:justify-start">
                {/* Founder image grounded at bottom with gentle feather mask */}
                <Image
                  src="/images/founder.png"
                  alt="Managing Director & Founder - DD Cookers"
                  width={560}
                  height={720}
                  priority
                  className="w-full h-auto object-contain filter brightness-[1.02] contrast-[1.04] scale-[1.06] origin-bottom [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                />
              </div>

            </div>

            {/* Right Column: Eyebrow, Headline, Paragraph, Glassmorphism Estimate Form */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left order-1 lg:order-2 pb-6 lg:pb-10 self-center lg:self-end">
              
              <div className="max-w-xl mx-auto lg:mx-0 space-y-3">
                {/* Pill-shaped Eyebrow Badge */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 border border-brass/35 bg-brass/10 backdrop-blur-md rounded-full shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brass">
                    Premier Caterer in Tirunelveli Since 2008
                  </span>
                </div>

                {/* Bold Serif Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-foreground font-serif leading-[1.2]">
                  Serving <span className="italic font-normal text-brass underline decoration-brass/30 underline-offset-8">Smiles</span> & Unforgettable Feasts For Your Special Days.
                </h1>

                {/* Supporting Paragraph */}
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Bringing authentic South Indian flavors, joyful hospitality, and traditional warmth to your weddings, corporate galas, and family celebrations across Tirunelveli.
                </p>
              </div>

              {/* Glassmorphism Lead-Gen Form ("Bespoke Catering Estimate") */}
              <div className="max-w-xl mx-auto lg:mx-0">
                <HeroQuoteForm />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP BELOW THE FOLD WITH ANIMATED COUNTER */}
      <StatsSection />

      {/* 3. GREETING CITATION */}
      <section className="py-16 text-center bg-transparent relative">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-brass text-[10px] font-extrabold tracking-widest uppercase block mb-3">Our Core Promise</span>
          <p className="text-2xl md:text-4xl font-light text-foreground/90 font-serif italic tracking-wide">
            &quot;சுவையும் தரமும் எங்கள் அடையாளம்!&quot;
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brass to-transparent mx-auto mt-6" />
        </div>
      </section>

      {/* 4. INTERACTIVE SIGNATURE FEAST & MENU TEASER (NEW!) */}
      <section className="py-20 bg-background/50 border-y border-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest block bg-brass/10 border border-brass/25 px-4 py-1.5 rounded-full w-fit mx-auto">
              Curated Menu Packages
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif">
              Explore Our <span className="italic text-brass font-normal">Signature Feasts</span>
            </h2>
            <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
              From authentic wedding banana leaf dining to high-end corporate buffets, explore curated menus tailored to perfection.
            </p>
          </div>

          {/* Interactive Menu Showcase Component */}
          <SignatureMenuTeaser />
        </div>
      </section>

      {/* 5. SERVICES OVERVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-carmine text-xs uppercase font-extrabold tracking-widest block bg-carmine/10 border border-carmine/20 px-4 py-1.5 rounded-full w-fit mx-auto">
            Our Specialties
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground pt-2">
            Specialized <span className="font-serif italic text-brass">Catering</span> Solutions
          </h2>
          <p className="text-foreground/75 text-sm leading-relaxed max-w-lg mx-auto">
            Choose the perfect service style for your upcoming celebration. We maintain rigorous standards for every plate size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link
            href="/services/cooking"
            className="group relative bg-card border border-border p-8 rounded-2xl shadow-md hover:shadow-2xl hover:border-brass/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-carmine/10 border border-carmine/20 rounded-xl flex items-center justify-center text-carmine mb-2">
                <ChefHat className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold text-brass uppercase tracking-widest block">Service Style 01</span>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-brass transition">
                Pure Culinary Cooking
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Provide your raw materials and grocery list. Our master chefs prepare authentic, mouth-watering feasts at your location or in our central kitchen.
              </p>
            </div>
            <div className="pt-6 border-t border-border/40 mt-6 flex items-center text-xs font-bold text-brass group-hover:translate-x-1 transition-transform relative z-10">
              <span>Explore Cooking Service</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/services/catering"
            className="group relative bg-card border border-brass/40 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:border-brass transition-all duration-300 flex flex-col justify-between overflow-hidden ring-1 ring-brass/10"
          >
            <div className="absolute top-3 right-4 bg-brass text-foreground text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-brass/15 border border-brass/30 rounded-xl flex items-center justify-center text-brass mb-2">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold text-brass uppercase tracking-widest block">Service Style 02</span>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-brass transition">
                Full-Service Catering
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                End-to-end event dining. Includes food preparation, transport, uniformed servers, luxury buffet counters, banana leaf setups, and waste management.
              </p>
            </div>
            <div className="pt-6 border-t border-border/40 mt-6 flex items-center text-xs font-bold text-brass group-hover:translate-x-1 transition-transform relative z-10">
              <span>Explore Catering Service</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/services/stall"
            className="group relative bg-card border border-border p-8 rounded-2xl shadow-md hover:shadow-2xl hover:border-brass/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-carmine/10 border border-carmine/20 rounded-xl flex items-center justify-center text-carmine mb-2">
                <Flame className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold text-brass uppercase tracking-widest block">Service Style 03</span>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-brass transition">
                Live Food Stalls
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Interactive live cooking stalls and street food counters. Engage guests with hot sizzlers, chaat counters, and custom live preparation stations.
              </p>
            </div>
            <div className="pt-6 border-t border-border/40 mt-6 flex items-center text-xs font-bold text-brass group-hover:translate-x-1 transition-transform relative z-10">
              <span>Explore Live Stalls</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* 6. THE 4-STEP CULINARY EXPERIENCE TIMELINE (NEW!) */}
      <section className="py-20 bg-background border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest block bg-brass/10 border border-brass/25 px-4 py-1.5 rounded-full w-fit mx-auto">
              Seamless Event Workflow
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif">
              Our 4-Step <span className="italic text-brass font-normal">Culinary Experience</span>
            </h2>
            <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-light">
              How we transform your event vision into a memorable feast from initial consultation to final table cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-card border border-border/70 p-6 rounded-2xl space-y-4 hover:border-brass/40 transition-all duration-300 relative group">
              <div className="w-10 h-10 bg-brass/15 text-brass font-serif font-bold text-lg rounded-xl flex items-center justify-center border border-brass/30">
                01
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brass transition">
                Consultation & Tasting
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We align on your guest headcount, preferences, and dietary requirements. Enjoy a complimentary menu tasting session.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-card border border-border/70 p-6 rounded-2xl space-y-4 hover:border-brass/40 transition-all duration-300 relative group">
              <div className="w-10 h-10 bg-brass/15 text-brass font-serif font-bold text-lg rounded-xl flex items-center justify-center border border-brass/30">
                02
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brass transition">
                Ingredients & Sourcing
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We procure 100% fresh, premium spices, cold-pressed oils, and farm vegetables strictly on event morning for maximum flavor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card border border-border/70 p-6 rounded-2xl space-y-4 hover:border-brass/40 transition-all duration-300 relative group">
              <div className="w-10 h-10 bg-brass/15 text-brass font-serif font-bold text-lg rounded-xl flex items-center justify-center border border-brass/30">
                03
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brass transition">
                Master Chefs & Setup
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our kitchen crew arrives early at your venue to set up luxury chafing counters, banana leaf dining tables, or live counters.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-card border border-border/70 p-6 rounded-2xl space-y-4 hover:border-brass/40 transition-all duration-300 relative group">
              <div className="w-10 h-10 bg-brass/15 text-brass font-serif font-bold text-lg rounded-xl flex items-center justify-center border border-brass/30">
                04
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brass transition">
                Flawless Service & Cleaning
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our 50+ uniformed staff handle table serving, guest warmth, refills, and complete eco-friendly waste management post-event.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. ABOUT/CAPABILITY BLOCK */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative p-4">
            <div className="absolute inset-0 border border-brass/25 rounded-[32px] translate-x-3 translate-y-3 pointer-events-none" />
            <div className="relative aspect-[4/3] bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Gourmet Catering Food"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-102 transition duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-brass/30 p-4 shadow-xl flex flex-col space-y-1 max-w-[180px] z-10 rounded-2xl">
              <span className="text-[9px] uppercase tracking-widest text-brass font-bold">ESTABLISHED</span>
              <span className="font-serif italic text-3xl text-foreground font-bold">2008</span>
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-brass text-[10px] font-extrabold tracking-widest uppercase block border-b border-brass/25 pb-2 w-fit">
              Our Scale & Capability
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight font-serif">
              Fully Equipped for <span className="italic text-brass">Grand Occasions</span>
            </h2>
            <p className="text-foreground/80 leading-relaxed text-sm font-light">
              Our central kitchen spans over 2000+ sq. ft., optimized for mass cooking with industrial hygiene controls. We have a daily preparation capacity of 5000+ meals, backed by a dedicated team of 50+ professional servers and 8+ master culinary chefs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-foreground/85">
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>100% Menu Customization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>Experienced Cooking Crew</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>Efficient Delivery & Logistics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>Scalable Event Inclusions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>On-site Buffet Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-carmine/15 p-1.5 rounded-lg text-carmine shrink-0"><Check className="h-4.5 w-4.5" /></div>
                <span>ISO Quality Assurance Certified</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-brass text-[10px] font-extrabold tracking-widest uppercase block">Visual Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif">Moments from <span className="italic text-brass">Our Feasts</span></h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center space-x-1.5 px-6 py-3.5 border border-brass/40 hover:border-brass hover:bg-brass/10 text-brass text-[10px] uppercase tracking-widest font-bold transition duration-300 rounded-xl"
          >
            <span>View Full Gallery</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Decoupled Interactive Gallery Lightbox */}
        <GalleryLightbox images={galleryImages} />
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="space-y-3">
              <span className="text-carmine text-xs uppercase font-extrabold tracking-widest block bg-carmine/10 border border-carmine/20 px-4 py-1.5 rounded-full w-fit mx-auto lg:mx-0">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground pt-2 font-serif">
                Signature <span className="italic font-normal text-brass">Standards</span>
              </h2>
              <p className="text-foreground/75 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                We focus on food quality, infrastructure, and presentation details to elevate your celebrations.
              </p>
            </div>

            <div className="space-y-6 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start space-x-5">
                <div className="bg-carmine/15 p-3.5 rounded-2xl text-carmine shrink-0">
                  <Flame className="h-6 w-6 text-carmine" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg text-brass">Authentic Taste</h3>
                  <p className="text-xs text-foreground/70 leading-relaxed font-light">
                    Traditional cooking procedures and custom spice blends managed by our seasoned kitchen team to ensure home-cooked authentic flavor.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-carmine/15 p-3.5 rounded-2xl text-carmine shrink-0">
                  <MapPin className="h-6 w-6 text-carmine" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg text-brass">Solid Infrastructure</h3>
                  <p className="text-xs text-foreground/70 leading-relaxed font-light">
                    A massive 2000+ sq. ft. central kitchen setup, high-grade transportation fleets, and professional insulation to deliver hot meals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-carmine/15 p-3.5 rounded-2xl text-carmine shrink-0">
                  <ChefHat className="h-6 w-6 text-carmine" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg text-brass">Skilled Chefs Team</h3>
                  <p className="text-xs text-foreground/70 leading-relaxed font-light">
                    Our kitchen board includes experienced chefs specializing in multi-cuisine banquets, traditional gravies, and live snack setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative p-6">
            <div className="absolute inset-6 border border-brass/25 rounded-full translate-x-3 translate-y-3 pointer-events-none max-w-sm mx-auto aspect-square" />
            <div className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden border border-brass/35 ring-8 ring-brass/20 shadow-2xl bg-card flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80"
                alt="Gourmet Curry Platter"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover hover:scale-103 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS CAROUSEL */}
      <TestimonialCarousel testimonials={testimonials} />

    </div>
  );
}
