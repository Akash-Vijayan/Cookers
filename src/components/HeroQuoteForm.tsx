'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Calendar, ArrowRight, Check } from 'lucide-react';

export default function HeroQuoteForm() {
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEvent, setHeroEvent] = useState('Wedding');
  const [heroGuests, setHeroGuests] = useState('Less than 100');
  const [heroDate, setHeroDate] = useState('');
  const [heroLocation, setHeroLocation] = useState('');
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroLoading(true);

    console.log('Hero Quote Request:', {
      name: heroName,
      phone: heroPhone,
      eventType: heroEvent,
      guestCount: heroGuests,
      date: heroDate,
      location: heroLocation,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHeroLoading(false);
    setHeroSuccess(true);
    setHeroName('');
    setHeroPhone('');
    setHeroDate('');
    setHeroLocation('');
    setTimeout(() => setHeroSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Bespoke Catering Estimate Frosted Glassmorphism Card */}
      <div className="relative bg-card/85 backdrop-blur-xl border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 hover:border-brass/50 transition-all duration-300">
        <div className="space-y-5">
          <div className="border-b border-border/60 pb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-brass font-extrabold block text-left">
              Bespoke Catering Estimate
            </span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
              Fast 2-Min Calculation
            </span>
          </div>

          {heroSuccess ? (
            <div className="py-8 text-center space-y-3 animate-fade-in">
              <div className="h-12 w-12 bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-foreground font-serif">Estimate Request Received!</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Our catering manager will reach out via WhatsApp / phone shortly with a custom menu estimate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleHeroSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="e.g. Akash"
                    className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={heroPhone}
                    onChange={(e) => setHeroPhone(e.target.value)}
                    placeholder="e.g. +91 94431"
                    className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Event Type
                  </label>
                  <div className="relative">
                    <select
                      value={heroEvent}
                      onChange={(e) => setHeroEvent(e.target.value)}
                      className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground pl-4 pr-10 py-3 rounded-xl outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="Wedding">Wedding Catering</option>
                      <option value="Corporate">Corporate Feast</option>
                      <option value="House Warming">House Warming</option>
                      <option value="Birthday">Birthday Stall</option>
                      <option value="Other">Other Event</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Guest Count
                  </label>
                  <div className="relative">
                    <select
                      value={heroGuests}
                      onChange={(e) => setHeroGuests(e.target.value)}
                      className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground pl-4 pr-10 py-3 rounded-xl outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="Less than 100">Less than 100</option>
                      <option value="100 - 250">100 - 250</option>
                      <option value="250 - 500">250 - 500</option>
                      <option value="500 - 1000">500 - 1000</option>
                      <option value="1000+">1000+ Guests</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Venue Location
                  </label>
                  <input
                    type="text"
                    required
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    placeholder="e.g. Palayamkottai"
                    className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-brass font-extrabold block text-left">
                    Event Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={heroDate}
                      onChange={(e) => setHeroDate(e.target.value)}
                      className="w-full bg-input-bg/90 backdrop-blur-md border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/15 text-xs text-foreground pl-4 pr-10 py-3 rounded-xl outline-none transition relative"
                    />
                    <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={heroLoading}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#9E1B22] to-[#8A151C] hover:brightness-110 active:scale-[0.99] text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 min-h-[46px] group"
              >
                <span>{heroLoading ? 'Submitting request...' : 'Get Instant Quote'}</span>
                {!heroLoading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-white" />
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Secondary Links below form */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
        <Link
          href="/menu"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brass hover:text-primary transition group"
        >
          <span>Explore Plated Menus</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-border">•</span>
        <Link
          href="/packages"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
        >
          <span>View Catering Packages</span>
        </Link>
      </div>
    </div>
  );
}
