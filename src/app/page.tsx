import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Utensils, ChefHat, ShieldCheck, HeartHandshake, Star, ArrowRight, Sparkles, Award } from 'lucide-react';

// Dynamic client slider for testimonials
import TestimonialSlider from '@/components/TestimonialSlider';
// Animated stats section
import StatsSection from '@/components/StatsSection';

async function getHomeData() {
  try {
    const services = await prisma.service.findMany({ take: 4 });
    const featuredPackages = await prisma.package.findMany({
      where: { isFeatured: true },
      take: 2,
    });
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      take: 5,
    });

    return { services, featuredPackages, testimonials };
  } catch (error) {
    console.error('Home Page Data fetch error:', error);
    return { services: [], featuredPackages: [], testimonials: [] };
  }
}

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const { services, featuredPackages, testimonials } = await getHomeData();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Hero Background Photo with Warm Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/30 dark:from-charcoal dark:via-charcoal/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide text-white uppercase animate-fade-in">
            <Sparkles className="h-4 w-4 text-secondary shrink-0" />
            <span>Gourmet Catering & Events</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
            Crafting <span className="bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent">Memorable Feasts</span> for Your Special Moments
          </h1>
          
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Experience premium live cooking counters, exquisite buffet presentation, and custom event menus designed by master chefs.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 text-base"
            >
              <span>Book Our Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/packages"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl border border-white/20 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center text-base backdrop-blur-sm"
            >
              View Menu Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Animated Counter Stats */}
      <StatsSection />

      {/* 3. Featured Services */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Our Specialties</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Catering For Every Occasion</h2>
          <p className="text-foreground/70 text-base leading-relaxed">
            From luxury wedding dinners to interactive live food stalls at birthday parties, we curate themes and layouts that impress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={svc.imageUrl}
                  alt={svc.name}
                  className="object-cover w-full h-full group-hover:scale-115 transition-all duration-500"
                />
                <span className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {svc.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg group-hover:text-primary transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mt-2 line-clamp-3 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-border flex justify-between items-center">
                  <span className="text-xs text-foreground/50">Base Price</span>
                  <span className="text-primary font-black text-lg">${svc.basePrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center space-x-1 font-bold text-primary hover:text-primary-hover group"
          >
            <span>See All Catering Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. Why Choose Us (Hygiene & Commitment) */}
      <section className="py-24 bg-foreground/5 dark:bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Showcase */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl overflow-hidden shadow-inner p-4">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Master Chef Cooking"
                className="w-full h-full object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-all duration-500"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border p-5 rounded-2xl shadow-xl flex items-center space-x-3.5 max-w-[240px]">
              <div className="bg-emerald-500 p-2.5 rounded-xl text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-foreground">100% Hygienic</h4>
                <p className="text-xs text-foreground/60 mt-0.5">ISO 22000 Certified Kitchen Standards</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Our Core Pillars</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Uncompromising Quality in Every Bite</h2>
              <p className="text-foreground/75 leading-relaxed">
                At Cookers, catering is not just about delivering food; it is an art of hospitality. We prioritize premium ingredients, impeccable hygiene, and theatrical setups that engage your guests.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1 shrink-0">
                  <ChefHat className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Master Chefs Selection</h3>
                  <p className="text-sm text-foreground/70 mt-1">Our chefs bring over 15 years of culinary expertise in multi-cuisine banquets and authentic local recipes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl text-secondary mt-1 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">ISO-Grade Food Safety</h3>
                  <p className="text-sm text-foreground/70 mt-1">We maintain sanitization guidelines, temperature controls, and raw material validation in our state-of-the-art kitchen.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1 shrink-0">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Customizable Packages</h3>
                  <p className="text-sm text-foreground/70 mt-1">Tailor guest capacity, include live cotton candy/popcorn counters, or adjust dietary restrictions to match your vision.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Featured Package Call-to-Action */}
      {featuredPackages.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-gradient-to-r from-charcoal to-stone-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Award className="w-96 h-96 text-white" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="bg-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                Best Value Package
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {featuredPackages[0].name}
              </h3>
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                {featuredPackages[0].description} Enjoy menu highlights including {featuredPackages[0].menuHighlights}.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <div>
                  <p className="text-stone-400 text-xs uppercase font-semibold">Starting Price</p>
                  <p className="text-3xl md:text-4xl font-black text-secondary">${featuredPackages[0].price} <span className="text-sm font-normal text-stone-400">/ guest</span></p>
                </div>
                <Link
                  href={`/booking?packageId=${featuredPackages[0].id}`}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl shadow-lg transition-all"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Dynamic Testimonials Section */}
      <section className="py-24 bg-foreground/5 dark:bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Reviews</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">What Our Customers Say</h2>
            <p className="text-foreground/70 text-base leading-relaxed">
              We have served thousands of guests across corporate dinners, birthday celebrations, and luxury wedding halls. Read their reviews.
            </p>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* 7. Gallery Preview Snippet */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Visuals</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Moments From Our Events</h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center space-x-1 px-5 py-2.5 rounded-xl border border-border hover:bg-foreground/5 text-sm font-bold transition-all"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 rounded-3xl overflow-hidden shadow-md group relative">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
              alt="Buffet Event"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-semibold text-sm">Elegant Wedding Buffet Setup</span>
            </div>
          </div>
          <div className="h-64 rounded-3xl overflow-hidden shadow-md group relative">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
              alt="Tandoori BBQ Live"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-semibold text-sm">Charcoal Live BBQ Station</span>
            </div>
          </div>
          <div className="h-64 rounded-3xl overflow-hidden shadow-md group relative sm:col-span-2 lg:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80"
              alt="Dessert Counter"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-semibold text-sm">Premium Dessert Station</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
