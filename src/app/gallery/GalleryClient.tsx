'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { SOCIAL } from '@/lib/siteConfig';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
  caption: string;
}

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Setups', 'Food', 'Live Stations', 'Team', 'Events'];

  const defaultItems = [
    {
      id: 'd1',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      category: 'Setups',
      caption: 'Grand Ballroom Wedding Floral Buffet Setup',
    },
    {
      id: 'd2',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      category: 'Food',
      caption: 'Live Grill Charcoal Seekh Kebabs',
    },
    {
      id: 'd3',
      imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
      category: 'Food',
      caption: 'Decadent Mini Pastries & Chocolate Fountain',
    },
    {
      id: 'd4',
      imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
      category: 'Live Stations',
      caption: 'Master Chef Preparing Live Alfredo Pasta',
    },
    {
      id: 'd5',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      category: 'Team',
      caption: 'Executive Chefs Board Finalizing Banquet Plans',
    },
    {
      id: 'd6',
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      category: 'Events',
      caption: 'Happy Guests at a Summer Backyard Corporate Event',
    },
    {
      id: 'd7',
      imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80',
      category: 'Live Stations',
      caption: 'Colorful Live Cotton Candy Station Spinner',
    },
    {
      id: 'd8',
      imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
      category: 'Live Stations',
      caption: 'Theater Popcorn Counter Machine popping live',
    },
  ];

  const allItems = [...initialItems, ...defaultItems];

  const filteredItems = activeTab === 'All'
    ? allItems
    : allItems.filter(item => item.category.toLowerCase().replace(' ', '') === activeTab.toLowerCase().replace(' ', ''));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground pb-20">
      
      {/* Header Banner */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 bg-card/45 border-b border-border/45 backdrop-blur-sm overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-6">
            <Link href="/" className="hover:text-brass transition">Home</Link>
            <span className="text-brass/30">&bull;</span>
            <span className="text-brass">Gallery</span>
          </div>

          <div className="text-center space-y-4 flex flex-col items-center">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
              Visual Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
              Photo <span className="font-serif italic text-brass">Gallery</span>
            </h1>
            <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our live cooking stalls, lavish buffet spreads, and memorable event setups across Tirunelveli.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition cursor-pointer ${
                activeTab === cat
                  ? 'bg-carmine text-bone shadow-md'
                  : 'bg-card border border-border text-foreground/75 hover:border-brass/50 hover:text-brass'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-card border border-border rounded-3xl text-foreground/50">
            <ImageIcon className="mx-auto h-12 w-12 text-foreground/20 mb-4" />
            <p className="font-semibold text-lg">No photos found in this album.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-md cursor-pointer border border-border hover:border-brass/50 hover:-translate-y-1 transition-all duration-300 bg-card"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#240808] via-[#240808]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-bone">
                  <span className="bg-carmine text-bone text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full self-start mb-2 shadow">
                    {item.category}
                  </span>
                  <p className="font-semibold text-sm leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Instagram Follow Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 text-center transition-all duration-300 hover:border-brass/50 shadow-xl"
        >
          <span className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-carmine/10 blur-2xl transition-opacity group-hover:opacity-80" aria-hidden />
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-carmine text-bone shadow-lg mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
            <InstagramIcon className="h-7 w-7" />
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            See it all live on Instagram
          </h2>
          <p className="text-foreground/75 text-sm md:text-base max-w-md mx-auto mt-2">
            Behind-the-scenes plating, setups, and real event highlights posted daily. Follow
            <span className="text-brass font-bold">&nbsp;@{SOCIAL.instagram.split('/').pop()}</span>
          </p>
          <span className="inline-flex items-center space-x-1 mt-6 rounded-full border border-brass/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brass transition group-hover:bg-brass group-hover:text-cacao">
            <span>Visit @{SOCIAL.instagram.split('/').pop()}</span>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 md:px-12 animate-fade-in select-none">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-[60vh] max-w-4xl">
              <Image
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].caption}
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-center text-white max-w-lg">
              <span className="text-brass text-xs font-bold uppercase tracking-wider block mb-1">
                {filteredItems[lightboxIndex].category}
              </span>
              <p className="text-base font-medium leading-relaxed">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

          <button
            onClick={nextPhoto}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold font-mono">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}

    </div>
  );
}
