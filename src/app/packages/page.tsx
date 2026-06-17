import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Check, Calendar, Users, Award, ShieldCheck, HelpCircle } from 'lucide-react';

async function getPackages() {
  try {
    return await prisma.package.findMany({
      orderBy: { price: 'asc' },
    });
  } catch (error) {
    console.error('Fetch packages error:', error);
    return [];
  }
}

export const revalidate = 600; // Cache plans for 10 minutes

export default async function PackagesPage() {
  const packagesList = await getPackages();

  const defaultPackages = [
    {
      id: 'silver',
      name: 'Silver Package',
      description: 'Ideal for intimate gatherings, small birthdays, or cozy family get-togethers.',
      price: 499,
      guestCapacity: 50,
      menuHighlights: '2 Starters, 3 Main Courses, 1 Dessert, 1 Beverage',
      servicesIncluded: 'Buffet Table Setup, Basic Ceramic Crockery, 2 Servers, Trash Management',
      isFeatured: false,
    },
    {
      id: 'gold',
      name: 'Gold Package',
      description: 'Our most popular choice. Great for corporate events, grand birthdays, and mid-sized weddings.',
      price: 999,
      guestCapacity: 150,
      menuHighlights: '4 Starters, 5 Main Courses, 2 Desserts, 2 Beverages, 1 Live Counter',
      servicesIncluded: 'Premium Buffet Decoration, Fine Ceramic Crockery, 4 Servers, Live Station Chef, Waste Disposal',
      isFeatured: true,
    },
    {
      id: 'platinum',
      name: 'Platinum Package',
      description: 'A lavish, luxury menu tailored for large weddings, elite corporate galas, and grand celebrations.',
      price: 1799,
      guestCapacity: 300,
      menuHighlights: '6 Starters, 7 Main Courses, 3 Desserts, 3 Beverages, 2 Live Counters, Custom Salad Bar',
      servicesIncluded: 'Luxury Floral Buffet Setup, Fine-Bone China & Premium Cutlery, 8 Servers, Event Supervisor, Live Chefs',
      isFeatured: false,
    },
  ];

  const plans = packagesList.length > 0 ? packagesList : defaultPackages;

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen pb-16">
      
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal text-white text-center mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-primary text-xs uppercase font-extrabold tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
            Catering Packages
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto">
            Choose a plan that fits your guest capacity and menu preferences, or request a custom event quote.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-card border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.isFeatured
                  ? 'border-primary ring-2 ring-primary/20 scale-[1.03] shadow-xl z-10'
                  : 'border-border shadow-sm hover:shadow-md'
              }`}
            >
              {/* Featured Ribbon */}
              {pkg.isFeatured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-2xl text-foreground">{pkg.name}</h3>
                  <p className="text-sm text-foreground/75 mt-2.5 leading-relaxed min-h-[50px]">{pkg.description}</p>
                </div>

                <div className="border-t border-b border-border py-6">
                  <span className="text-stone-400 text-xs font-bold uppercase block mb-1">Price per guest</span>
                  <p className="text-4xl md:text-5xl font-black text-primary">
                    ${pkg.price}
                    <span className="text-sm font-normal text-foreground/60"> / plate</span>
                  </p>
                  <p className="text-xs text-foreground/50 mt-1 flex items-center space-x-1">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>Optimized for up to {pkg.guestCapacity} guests</span>
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase text-foreground/50 tracking-wider">Menu Inclusions</h4>
                  <ul className="space-y-2.5 text-sm">
                    {pkg.menuHighlights.split(',').map((highlight) => (
                      <li key={highlight} className="flex items-start space-x-2.5">
                        <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                        <span>{highlight.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Inclusions */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <h4 className="font-bold text-xs uppercase text-foreground/50 tracking-wider">Services Inclusions</h4>
                  <ul className="space-y-2.5 text-sm">
                    {pkg.servicesIncluded.split(',').map((svc) => (
                      <li key={svc} className="flex items-start space-x-2.5">
                        <Check className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-foreground/85">{svc.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/booking?packageId=${pkg.id}`}
                  className={`block text-center py-3.5 rounded-xl font-bold text-sm shadow-md transition-all duration-300 ${
                    pkg.isFeatured
                      ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-foreground/5 border border-border hover:bg-foreground/10 text-foreground hover:scale-[1.01]'
                  }`}
                >
                  Book {pkg.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="bg-gradient-to-r from-charcoal to-stone-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="bg-white/10 text-stone-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Need Something Unique?
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight">Custom Event Packages</h3>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              We cater events of all shapes and sizes. If our standard packages don't match your menu ideas, guest count, or budget, our master chefs can draft custom recipes and custom pricing just for you.
            </p>
            <div className="pt-4">
              <Link
                href="/booking"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary-hover text-white font-bold rounded-xl shadow-md transition-all"
              >
                <span>Draft Custom Plan</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
