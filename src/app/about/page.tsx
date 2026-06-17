import React from 'react';
import { prisma } from '@/lib/db';
import { Award, Target, Flame, Heart, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

async function getChefs() {
  try {
    return await prisma.chef.findMany();
  } catch (error) {
    console.error('About Page chefs fetch error:', error);
    return [];
  }
}

export const revalidate = 600; // Cache for 10 minutes

export default async function AboutPage() {
  const chefs = await getChefs();

  const defaultChefs = [
    {
      id: '1',
      name: 'Rajeev Kapoor',
      designation: 'Executive Head Chef',
      specialty: 'Traditional Indian & Mughlai Feasts',
      experience: 16,
      bio: 'Chef Rajeev spent years mastering spices in northern India. He curates rich, nostalgic curries and slow-cooked biryanis.',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      designation: 'Sous Chef',
      specialty: 'Live Italian & Contemporary Pasta',
      experience: 9,
      bio: 'Chef Sarah brings passion for live interaction and fresh doughs. She runs our famous live pasta, pizza, and stir-fry counters.',
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const chefList = chefs.length > 0 ? chefs : defaultChefs;

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-charcoal text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
          <span className="text-primary text-xs uppercase font-extrabold tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Our Heritage
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
            About Cookers
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Pioneering grand culinary events and live interactive food stations since 2012. Learn our mission, quality commitments, and meet our chefs.
          </p>
        </div>
      </section>

      {/* 2. Story & Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Our Journey</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Serving Happiness for Over a Decade</h2>
          <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
            Cookers was founded with a simple vision: to turn party food into a memorable theatrical experience. Starting as a small kitchen in Queens, NY, we introduced our first live cotton candy spinner and popcorn cart. Over the years, we expanded into fine wedding buffets, corporate banquets, and multi-cuisine customized event menus.
          </p>
          <p className="text-foreground/75 leading-relaxed text-sm">
            Today, we handle events ranging from intimate family birthdays of 30 guests to massive corporate summits and grand wedding receptions of over 500 guests, maintaining the same artisanal care in every dish.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-extrabold text-lg text-primary">2012</h4>
              <p className="text-xs text-foreground/70 mt-1">Cookers launched with live snacks counters.</p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-extrabold text-lg text-secondary">2018</h4>
              <p className="text-xs text-foreground/70 mt-1">Expanded to full wedding banquets & corporate gala menus.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
            alt="Chefs prepping buffet"
            className="rounded-3xl shadow-xl border border-border w-full object-cover h-[450px]"
          />
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-20 bg-foreground/5 dark:bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center space-y-4">
            <div className="mx-auto inline-flex bg-primary/10 p-3 rounded-2xl text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-lg">Our Mission</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              To craft flawless and delicious dining experiences through culinary theater, outstanding services, and fresh custom recipes.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center space-y-4">
            <div className="mx-auto inline-flex bg-secondary/10 p-3 rounded-2xl text-secondary">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-lg">Our Vision</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              To be the most innovative premium catering brand, celebrated for merging multi-cuisine dining with interactive food stations.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center space-y-4">
            <div className="mx-auto inline-flex bg-primary/10 p-3 rounded-2xl text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-lg">Core Values</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Uncompromising hygiene, focus on fresh local ingredients, transparency in pricing, and a passion for guest hospitality.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Hygiene & Safety Commitment */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-red-500/10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex bg-white/20 p-2.5 rounded-xl text-white">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Hygiene First: ISO 22000 Clean Kitchen Protocols
            </h3>
            <p className="text-white/95 text-sm md:text-base leading-relaxed">
              We know that delicious food is nothing without safety. Our industrial kitchen adheres to strict Hazard Analysis Critical Control Point (HACCP) rules. From double-masked kitchen prep crews to insulated thermal containers, we ensure food safety from our stoves to your plate.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 space-y-3.5 text-sm backdrop-blur-md">
            <p className="font-bold border-b border-white/20 pb-2">Our Safety Benchmarks:</p>
            <p className="flex items-center space-x-2">✔ <span>Daily temperature log checks of cold stores</span></p>
            <p className="flex items-center space-x-2">✔ <span>Medical health clearances for cooking staff</span></p>
            <p className="flex items-center space-x-2">✔ <span>Sanitized utensils & biodegradable service plates</span></p>
          </div>
        </div>
      </section>

      {/* 5. Chefs Profiles Grid */}
      <section id="chefs" className="py-24 bg-foreground/5 dark:bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Kitchen Artisans</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Meet Our Master Chefs</h2>
            <p className="text-foreground/70 text-base leading-relaxed">
              Our culinary board comprises experienced gourmands specializing in traditional clay grills, continental live tosses, and dessert creations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefList.map((chef) => (
              <div
                key={chef.id}
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={chef.imageUrl}
                    alt={chef.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white font-extrabold text-xl">{chef.name}</h3>
                      <p className="text-secondary text-xs font-bold uppercase tracking-wider mt-0.5">{chef.designation}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-foreground/50 border-b border-border pb-3">
                    <span className="flex items-center space-x-1">
                      <ChefHat className="h-4 w-4 text-primary shrink-0" />
                      <span>{chef.specialty}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-secondary shrink-0" />
                      <span>{chef.experience} Yrs Exp</span>
                    </span>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed italic">
                    "{chef.bio}"
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
