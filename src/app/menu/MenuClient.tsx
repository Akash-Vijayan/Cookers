'use client';

import React, { useState } from 'react';
import { Search, Utensils, Check, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
  dietaryTag: string; // VEG, NON_VEG, VEGAN
  imageUrl: string;
}

interface MenuClientProps {
  initialItems: MenuItem[];
}

export default function MenuClient({ initialItems }: MenuClientProps) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Snacks', 'Beverages', 'Live Counters'];
  const dietaryOptions = ['All', 'VEG', 'NON_VEG', 'VEGAN'];

  // Apply filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDietary =
      selectedDietary === 'All' || item.dietaryTag.toUpperCase() === selectedDietary.toUpperCase();

    return matchesSearch && matchesCategory && matchesDietary;
  });

  const getDietaryBadge = (tag: string) => {
    switch (tag.toUpperCase()) {
      case 'VEG':
        return (
          <span className="flex items-center space-x-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>VEG</span>
          </span>
        );
      case 'VEGAN':
        return (
          <span className="flex items-center space-x-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
            <span>VEGAN</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>NON-VEG</span>
          </span>
        );
    }
  };

  return (
    <div className="py-16">
      
      {/* Page Header */}
      <section className="relative py-12 bg-charcoal text-white text-center mb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-secondary text-xs uppercase font-extrabold tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Gourmet Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Our Catering Menu</h1>
          <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto">
            Browse our wide selection of appetizers, traditional slow-cooked mains, live pasta selections, and artisanal sweet counters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filters Panel */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold uppercase text-foreground/50 mb-2">Search Dishes</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Paneer Tikka, Mojito..."
                  className="w-full pl-10 pr-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Dietary */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase text-foreground/50 mb-2">Dietary Restrictions</label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((diet) => (
                  <button
                    key={diet}
                    onClick={() => setSelectedDietary(diet)}
                    className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedDietary === diet
                        ? 'bg-primary border-primary text-white shadow-sm'
                        : 'border-border hover:bg-foreground/5 text-foreground/80'
                    }`}
                  >
                    {diet === 'All' ? 'All Dietary' : diet}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase text-foreground/50 mb-2">Food Categories</label>
            <div className="flex space-x-2 pb-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-secondary text-white shadow-md'
                      : 'hover:bg-foreground/5 text-foreground/75 border border-transparent hover:border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-3xl text-foreground/50">
            <Utensils className="mx-auto h-12 w-12 text-foreground/20 mb-4" />
            <p className="font-semibold text-lg">No dishes match your active filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDietary('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  !item.availability ? 'opacity-65' : ''
                }`}
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {getDietaryBadge(item.dietaryTag)}
                    </div>
                    {!item.availability && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                        Temporarily Unavailable
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-extrabold text-lg group-hover:text-primary transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-foreground/2 dark:bg-foreground/1">
                  <span className="text-xs text-foreground/50 font-bold uppercase">{item.category}</span>
                  <span className="text-primary font-black text-lg">${item.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
