'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChefHat, Sparkles, Users, Utensils, CheckCircle2, ArrowRight } from 'lucide-react';

interface MenuPackage {
  id: string;
  category: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  tagline: string;
  startingPrice: string;
  servings: string;
  popularFor: string;
  heroImage: string;
  keyDishes: {
    name: string;
    description: string;
    tag?: string;
  }[];
  highlights: string[];
}

const MENU_PACKAGES: MenuPackage[] = [
  {
    id: 'wedding',
    category: 'wedding',
    tabLabel: 'Royal Wedding Feast',
    title: 'Grand South Indian Wedding Banquet',
    subtitle: 'Elai Sappadu (Traditional Banana Leaf Feast)',
    tagline: 'An authentic multi-course celebration prepared with 100% traditional recipes',
    startingPrice: '₹350',
    servings: '100 to 5,000+ Guests',
    popularFor: 'Weddings & Reception Galas',
    heroImage: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80',
    keyDishes: [
      { name: 'Special Tirunelveli Wheat Halwa', description: 'Made with 100% pure cow ghee & Thamirabarani river water recipe', tag: 'Signature' },
      { name: 'Seeraga Samba Mutton Biryani', description: 'Slow-cooked in copper thaauli over authentic wood fire', tag: 'Bestseller' },
      { name: 'Traditional Ennai Kathirikai', description: 'Smoky roasted brinjal curry with stone-ground sesame masala', tag: 'Heritage' },
      { name: 'Kathirikai Gotsu & Poriyal', description: 'Fresh seasonal vegetables cooked with hand-ground spices', tag: 'Authentic' },
      { name: 'Elaneer Payasam & Jigarthanda', description: 'Chilled tender coconut dessert & artisanal milk beverage', tag: 'Chef Special' }
    ],
    highlights: [
      'Authentic Banana Leaf (Elai) Setup & Service',
      '50+ Uniformed Professional Servers',
      'Unlimited Refills & Traditional Welcome Drinks',
      'Eco-Friendly Waste Disposal & Table Cleaning'
    ]
  },
  {
    id: 'corporate',
    category: 'corporate',
    tabLabel: 'Corporate Banquet',
    title: 'Executive Corporate & Conference Buffet',
    subtitle: 'Contemporary Multi-Cuisine Dining',
    tagline: 'Punctual, hygienic, and premium presentation tailored for corporate excellence',
    startingPrice: '₹450',
    servings: '50 to 2,000+ Delegates',
    popularFor: 'Corporate Meetings, Product Launches & Galas',
    heroImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
    keyDishes: [
      { name: 'Butter Chicken & Paneer Tikka Masala', description: 'Rich creamy gravy prepared with fresh cream & spices', tag: 'North Special' },
      { name: 'Ghee Rice & Artisan Naan Spread', description: 'Fragrant basmati rice garnished with fried cashews & herbs', tag: 'Popular' },
      { name: 'Live Grill & Kebab Counter', description: 'Sizzling hot paneer, chicken, and fish skewers grilled live', tag: 'Live Station' },
      { name: 'Exotic Fruit Platter & Mousse', description: 'Fresh seasonal sliced fruits & Belgian chocolate mousse cups', tag: 'Dessert' }
    ],
    highlights: [
      'Chafing Dish Warmers & Luxury Crockery',
      'Dedicated On-site Event Manager',
      'Custom Diet Options (Jain, Vegan, Gluten-Free)',
      'Strict ISO Food Safety & Hygiene Protocols'
    ]
  },
  {
    id: 'housewarming',
    category: 'housewarming',
    tabLabel: 'House Warming & Pooja',
    title: 'Auspicious Griha Pravesam Pure Veg Spread',
    subtitle: 'Sattvic Traditional Cooking',
    tagline: 'Pure vegetarian recipes prepared with devotion, hygiene, and unmatched flavor',
    startingPrice: '₹280',
    servings: '30 to 1,000+ Guests',
    popularFor: 'House Warmings, Upanayanam & Temple Functions',
    heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    keyDishes: [
      { name: 'Sambar & Vadai Platter', description: 'Crispy Medu Vadai with rich drumstick arachuvitta sambar', tag: 'Traditional' },
      { name: 'Pineapple & Jackfruit Rava Kesari', description: 'Aromatic pure ghee sweet with real fruit chunks', tag: 'Auspicious' },
      { name: 'Curd Rice with Pomegranate', description: 'Creamy seasoned curd rice served with homemade pickles', tag: 'Comfort' },
      { name: 'Special Filter Coffee Station', description: 'Freshly brewed Kumbakonam degree filter coffee served hot', tag: 'Beverage' }
    ],
    highlights: [
      '100% Pure Vegetarian Kitchen Guarantee',
      'No Garlic/Onion Menu Customization Available',
      'Compact & Clean Setup for Home Spaces',
      'Timely Delivery for Auspicious Muhurtham Hours'
    ]
  },
  {
    id: 'live-stalls',
    category: 'live-stalls',
    tabLabel: 'Live Stalls & Snacks',
    title: 'Interactive Live Cooking Stalls & Chaat',
    subtitle: 'Fun & Engaging Event Counters',
    tagline: 'Sizzling live counters that delight guests with hot, fresh, instant delicacies',
    startingPrice: '₹200',
    servings: '100+ Guests',
    popularFor: 'Birthday Parties, Sangeet & Evening Receptions',
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    keyDishes: [
      { name: 'Delhi Chaat & Pani Puri Counter', description: 'Crispy puris filled with spicy mint water, tamarind chutney & potato', tag: 'Live Chaat' },
      { name: 'Hot Dosa & Uthappam Station', description: 'Crispy paper dosas, podi dosas & cheese uthappams cooked live', tag: 'Live Counter' },
      { name: 'Kulfi & Ice Cream Parlor Counter', description: 'Matka kulfi, falooda & artisanal scooped ice creams', tag: 'Sweet Counter' },
      { name: 'Mocktail & Fresh Juice Bar', description: 'Chilled watermelon, mint mojito & tender coconut punches', tag: 'Refreshment' }
    ],
    highlights: [
      'Uniformed Chef Stalls with Themed Decor',
      'High-Speed Live Cooking Stations',
      'Custom Counter Combinations',
      'Child-Friendly & Interactive Food Setup'
    ]
  }
];

export default function SignatureMenuTeaser() {
  const [activeTab, setActiveTab] = useState<string>('wedding');

  const currentPkg = MENU_PACKAGES.find(p => p.id === activeTab) || MENU_PACKAGES[0];

  return (
    <div className="w-full">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-2 sm:gap-3 mb-10 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap sm:flex-wrap justify-start sm:justify-center px-2 py-1">
        {MENU_PACKAGES.map((pkg) => {
          const isActive = pkg.id === activeTab;
          return (
            <button
              key={pkg.id}
              onClick={() => setActiveTab(pkg.id)}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 border whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer ${
                isActive
                  ? 'bg-carmine text-white border-carmine shadow-lg shadow-carmine/25 scale-[1.02] sm:scale-105'
                  : 'bg-card/80 text-foreground/80 border-border hover:border-brass/50 hover:text-brass hover:bg-card'
              }`}
            >
              <Utensils className={`h-3.5 w-3.5 ${isActive ? 'text-brass' : 'text-muted-foreground'}`} />
              <span>{pkg.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Showcase Card */}
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brass/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image & Quick Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brass/30 shadow-xl group">
              <Image
                src={currentPkg.heroImage}
                alt={currentPkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-brass/90 backdrop-blur-md text-foreground text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border border-white/20">
                {currentPkg.popularFor}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Starts From</p>
                  <p className="text-2xl font-serif font-bold">{currentPkg.startingPrice} <span className="text-xs font-normal font-sans opacity-80">/ Plate</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Capacity</p>
                  <p className="text-xs font-bold">{currentPkg.servings}</p>
                </div>
              </div>
            </div>

            {/* Package Key Highlights Checklist */}
            <div className="bg-background/60 border border-border/60 rounded-2xl p-4 space-y-2.5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-brass flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Key Package Inclusions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/85">
                {currentPkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-carmine shrink-0 mt-0.5" />
                    <span className="leading-tight">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Key Dishes List */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2 border-b border-border/60 pb-5">
              <span className="text-brass text-xs font-extrabold tracking-widest uppercase block">
                {currentPkg.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">
                {currentPkg.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                {currentPkg.tagline}
              </p>
            </div>

            {/* Featured Dishes List */}
            <div className="space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-foreground/90 flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-brass" /> Featured Menu Items Highlight:
              </p>
              
              <div className="space-y-2.5">
                {currentPkg.keyDishes.map((dish, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-background/80 hover:bg-background border border-border/60 hover:border-brass/40 rounded-xl transition-all duration-300 flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-foreground group-hover:text-brass transition">
                          {dish.name}
                        </span>
                        {dish.tag && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider bg-brass/15 text-brass border border-brass/30 px-2 py-0.5 rounded-full">
                            {dish.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/packages"
                className="px-6 py-3 bg-carmine hover:bg-carmine-hover text-white text-xs font-bold uppercase tracking-widest rounded-xl transition shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>View All Package Items</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/booking"
                className="px-6 py-3 bg-transparent hover:bg-brass/10 border border-brass/40 text-brass text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Customize This Menu</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
