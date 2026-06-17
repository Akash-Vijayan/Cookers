'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string; // Setups, Food, Live Stations, Team, Events
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

  // Combine DB items with static defaults
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
    <div className="py-16">
      
      {/* Banner */}
      <section className="relative py-12 bg-charcoal text-white text-center mb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-primary text-xs uppercase font-extrabold tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Media Gallery</h1>
          <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto">
            Take a visual tour of our grand buffet presentations, chef plating details, live cooking stations, and real client parties.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 border-b border-border pb-4 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-foreground/5 text-foreground/75 border border-transparent'
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
                className="group relative h-72 rounded-3xl overflow-hidden shadow-md cursor-pointer border border-border/40 hover:-translate-y-1 transition-all duration-300 bg-stone-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="bg-primary/95 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded self-start mb-2">
                    {item.category}
                  </span>
                  <p className="font-semibold text-sm leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 md:px-12 animate-fade-in select-none">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Photo Container */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center space-y-4">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center text-white max-w-lg">
              <span className="text-secondary text-xs font-bold uppercase tracking-wider block mb-1">
                {filteredItems[lightboxIndex].category}
              </span>
              <p className="text-base font-medium leading-relaxed">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Photo index counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold font-mono">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}

    </div>
  );
}
