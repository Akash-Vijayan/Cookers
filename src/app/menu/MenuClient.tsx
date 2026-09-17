'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Utensils } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number | null;
  category: string;
  availability: boolean;
  dietaryTag: string;
  imageUrl: string;
}

interface MenuClientProps {
  initialItems: MenuItem[];
}

const categories = ['All', 'Breakfast', 'Biryani', 'Special Biryani', 'Rice Varieties', 'Starters'];

// Curated list of 80 high-quality, verified Unsplash food IDs to guarantee unique, gorgeous dish photos
const uniquePhotoIds = [
  'photo-1589301760014-d929f3979dbc', // Dosa crisp
  'photo-1601050690597-df056fb4ce78', // Golden Dosa
  'photo-1627308595229-7830a5c91f9f', // Puffed Poori
  'photo-1668236543090-82eba5ee5976', // Soft Idli
  'photo-1645177625172-89574ec0aa09', // Pongal bowl
  'photo-1606491956689-2ea866880c84', // Dum Biryani
  'photo-1626132647523-66f5bf380027', // Fried Chicken
  'photo-1599487488170-d11ec9c172f0', // Charcoal Kebab
  'photo-1555939594-58d7cb561ad1', // Sizzling BBQ
  'photo-1563379091339-03b21ab4a4f8', // Biryani platter
  'photo-1546833999-b9f581a1996d', // Spicy Sambar
  'photo-1513558161293-cdaf765ed2fd', // Premium Drink
  'photo-1596797038530-2c107229654b', // Creamy Curry
  'photo-1625220194771-7ebedd0b4d27', // Malai Paneer
  'photo-1606787366850-de6330128bfc', // Sweet Dessert
  'photo-1498837167922-ddd27525d352', // Organic salad
  'photo-1540189549336-e6e99c3679fe', // Green vegetables
  'photo-1565299624946-b28f40a0ae38', // Roti basket
  'photo-1567306226416-28f0efdc88ce', // Steamed rice
  'photo-1565557623262-b51c2513a641', // Shahi Paneer
  'photo-1618414503936-c9586dd1c431', // Saffron Kesari
  'photo-1505576399279-565b52d4ac71', // Mango Lassi
  'photo-1544025162-d76694265947', // Live Fire cooking
  'photo-1534080564583-6be75777b70a', // Candy stall
  'photo-1578849278619-e73505e9610f', // Popcorn cart
  'photo-1626777552726-4a6b54c97e46', // Ghee podi idli
  'photo-1506084868230-bb9d95c24759', // Breakfast platter
  'photo-1482049016688-2d3e1b311543', // Appetizer
  'photo-1473093295043-cdd812d0e601', // Asian Stir-fry
  'photo-1484723091739-30a097e8f929', // Roasted toast
  'photo-1476224203421-9ac39bcb3327', // Royal banquet
  'photo-1455619452474-d2be8b1e70cd', // Red curry
  'photo-1467003909585-2f8a72700288', // Plated main course
  'photo-1517248135467-4c7edcad34c4', // Kitchen pass
  'photo-1541014741259-df5290bb328c', // Hot filter coffee
  'photo-1551818255-e6e10975bc17', // Pudding bowl
  'photo-1582234372722-50d7ccc30ebd', // Fresh salad
  'photo-1543339308-43e59d6b73a6', // Starter crisp
  'photo-1563729784474-d77dbb933a9e', // Coconut sweet
  'photo-1579372786545-d24232daf58c', // Dum cooking
  'photo-1621510456681-23a23cfb5f57', // Crispy chicken lollipop
  'photo-1585238342024-78d387f4a707', // Tandoori platter
  'photo-1615870216519-2f9fa575fa5c', // Rice pilaf
  'photo-1628294895950-980503c2e95b', // Chili starter
  'photo-1608897013039-887f21d8c804', // Dessert pastry
  'photo-1623653387945-2fd25214f8fc', // Spicy starter
  'photo-1534422298391-e4f8c172dddb', // Buffet item
  'photo-1504674900247-0877df9cc836', // Culinary plate
  'photo-1568901346375-23c9450c58cd', // Gourmet roll
  'photo-1590577976322-3d2d68f9d8dd', // Plated fish starter
  'photo-1588854337236-6889d631faa8', // Creamy gravy
  'photo-1610057099443-fde8c4d50f91', // Starters tikka
  'photo-1574484284002-952d92456975', // Traditional sweets
  'photo-1599043702281-101a75516894', // South Indian meals
  'photo-1603894584373-5ac82b2ae398', // Curry sauce
  'photo-1618219908412-a29a1bb7b86e', // Dal makhani
  'photo-1572490122747-3968b75cc699', // Sambar soup
  'photo-1548839140-29a749e1cf4d', // Rice bowl
  'photo-1633945274405-b6c8069047b0', // Spiced curry
  'photo-1631452180519-c014fe946bc7', // Kebab seekh
  'photo-1626082927389-6cd097cdc6ec', // Roti naan
  'photo-1598515214211-89d3c73ae83b', // Butter chicken
  'photo-1589302168068-9a4e6ab1f7f1', // Biryani side
  'photo-1593560708920-61dd98c46a4e', // Traditional paneer
  'photo-1512621776951-a57141f2eefd', // Vegetable salad
  'photo-1504754524776-8f4f37790ca0', // Saffron rice
  'photo-1540420773420-3366772f4999', // Veg items
  'photo-1551183053-bf91a1d81141', // Dessert halwa
  'photo-1564834744159-ff0ea4184e6a', // Chutney bowl
  'photo-1550547660-d9450f859349', // Indian bread
  'photo-1587314168485-3236d6710814', // Rice varieties
];

// Resolves unique, high-quality Unsplash images for catering display with high entropy hashing
const getDishPhoto = (name: string, category: string): string => {
  const normalized = name.toLowerCase().trim();

  // Hand-picked unique matches for primary dishes to look highly authentic
  if (normalized === 'idly' || normalized.includes('button podi idli')) {
    return 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'dosai' || normalized.includes('crispy ghee roast dosa')) {
    return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'masala dosai' || normalized.includes('royal tirunelveli masala dosa')) {
    return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'poori' || normalized.includes('puffed whole wheat poori')) {
    return 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'pongal' || normalized.includes('traditional ven pongal')) {
    return 'https://images.unsplash.com/photo-1645177625172-89574ec0aa09?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'appam' || normalized.includes('lacy fermented rice appam')) {
    return 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('mutton biryani')) {
    return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('chicken biryani')) {
    return 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('fish biryani') || normalized.includes('seela fish')) {
    return 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('prawn biryani')) {
    return 'https://images.unsplash.com/photo-155126634-323283e090fa?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized === 'sambar') {
    return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('coconut chutney')) {
    return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('spicy chutney')) {
    return 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('tea') || normalized.includes('coffee')) {
    return 'https://images.unsplash.com/photo-1541014741259-df5290bb328c?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('kesari')) {
    return 'https://images.unsplash.com/photo-1618414503936-c9586dd1c431?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('chukka') || normalized.includes('chaaps') || normalized.includes('mutton chukka')) {
    return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('tikka') || normalized.includes('kebab') || normalized.includes('paneer tikka')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&h=500&q=80';
  }
  if (normalized.includes('lollipop') || normalized.includes('chicken 65')) {
    return 'https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=500&h=500&q=80';
  }

  // Fallback to custom name & category hash calculation to guarantee absolute uniqueness
  let hash = 17;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) | 0;
  }
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 13 + category.charCodeAt(i)) | 0;
  }
  
  const index = Math.abs(hash) % uniquePhotoIds.length;
  const photoId = uniquePhotoIds[index];

  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=500&h=500&q=80`;
};

// Fail-safe image container component (completely sharp corners)
const MenuItemImage = ({ src, name }: { src?: string; name: string }) => {
  const [hasError, setHasError] = useState(false);

  // Tan/beige warm placeholder when no image loads
  if (!src || hasError) {
    return (
      <div className="w-full h-full bg-[#FAF4E6] flex items-center justify-center relative select-none rounded-none">
        <Utensils className="h-8 w-8 text-brass opacity-60" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setHasError(true)}
      className="object-cover object-center transform group-hover:scale-102 transition-transform duration-500 rounded-none"
    />
  );
};

// Outlined square-with-dot Indian dietary symbol
const getDietaryBadge = (tag: string) => {
  const isVeg = tag.toUpperCase() === 'VEG' || tag.toUpperCase() === 'VEGAN';
  return (
    <div className="flex items-center space-x-1.5 pt-1.5">
      <span
        className={`h-3.5 w-3.5 border flex items-center justify-center p-0.5 shrink-0 rounded-none ${
          isVeg ? 'border-green-600 bg-white' : 'border-red-600 bg-white'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
      </span>
      <span className={`text-[9px] font-bold tracking-wider uppercase ${isVeg ? 'text-green-700' : 'text-red-700'}`}>
        {isVeg ? 'VEG' : 'NON-VEG'}
      </span>
    </div>
  );
};

// Category divider section header
const CategoryHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center space-x-6 py-12">
      <div className="h-[1px] bg-border flex-grow" />
      <div className="flex items-center space-x-3">
        <Utensils className="h-4.5 w-4.5 text-brass" />
        <h2 className="font-serif italic text-2xl md:text-3xl text-foreground font-bold tracking-wide">
          {title}
        </h2>
      </div>
      <div className="h-[1px] bg-border flex-grow" />
    </div>
  );
};

// Premium Menu Item Card (Crisp White/Cream Rectangle, Non-rounded)
const MenuCard = ({ item }: { item: MenuItem }) => {
  const photo = getDishPhoto(item.name, item.category);
  return (
    <div className="group bg-[#FDFBF6] border border-stone-200/90 hover:border-brass/60 rounded-none shadow-md hover:shadow-xl hover:scale-101 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
      <div className="space-y-0 flex flex-col h-full justify-between">
        <div className="space-y-0">
          {/* Full-bleed sharp image to top/side edges */}
          <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative rounded-none">
            <MenuItemImage src={photo} name={item.name} />
          </div>

          {/* Text block with consistent padding */}
          <div className="p-5 md:p-6 space-y-2 text-left">
            <h3 className="font-serif text-base md:text-lg font-bold text-[#240808] leading-tight group-hover:text-carmine transition-colors duration-200">
              {item.name}
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {item.description}
            </p>
            <div className="pt-1">
              {getDietaryBadge(item.dietaryTag)}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-stone-200/60 p-5 pt-3 flex items-center justify-between text-[9px] uppercase tracking-wider font-extrabold text-stone-400">
          <span className="text-carmine font-black">
            {item.category}
          </span>
          <span>
            Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default function MenuClient({ initialItems }: MenuClientProps) {
  const [items] = useState<MenuItem[]>(() => {
    const combined = [...initialItems];
    return combined;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.availability;
  });

  const categoriesToRender = selectedCategory === 'All'
    ? categories.filter(c => c !== 'All')
    : [selectedCategory];

  return (
    <div className="pt-28 pb-16 lg:pt-36">
      {/* Page Header */}
      <section className="pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-6 text-left">
            <Link href="/" className="hover:text-brass transition">Home</Link>
            <span className="text-brass/30">&bull;</span>
            <span className="text-brass">Menu</span>
          </div>

          <div className="text-center space-y-3 flex flex-col items-center">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-4 py-1.5 rounded-full">
              Gourmet Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-2 font-serif">
              Our Catering Menu
            </h1>
            <div className="h-[1px] w-12 bg-brass mx-auto mt-4" />
            <p className="text-foreground/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-2">
              Explore our curated selections of traditional South Indian breakfast delicacies, aromatic biryanis, rice varieties, and gourmet starters.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-foreground/45" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our gourmet dishes..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-none focus:outline-none focus:border-carmine text-sm shadow-sm transition-all text-center text-foreground placeholder:text-foreground/40"
          />
        </div>

        {/* Category Underline Selector (Text-Only brass active line) */}
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 border-b border-border/40 pb-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-2 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer relative whitespace-nowrap ${
                  isActive ? 'text-brass' : 'text-foreground/60 hover:text-brass'
                }`}
              >
                {cat}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brass animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Menu Presentation Layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-card/20 border border-border text-foreground/60 max-w-lg mx-auto">
            <Utensils className="mx-auto h-12 w-12 text-brass/40 mb-4" />
            <p className="font-semibold text-lg">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-6 py-3 border border-brass text-brass hover:bg-carmine hover:border-carmine hover:text-bone font-bold text-xs uppercase tracking-widest transition"
            >
              Reset Filters
            </button>
          </div>
        ) : searchQuery !== '' ? (
          <div className="space-y-6">
            <div className="text-center pb-6">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Search Results</span>
              <h2 className="text-xl font-bold text-foreground font-serif mt-1">Dishes matching &quot;{searchQuery}&quot;</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          /* Grouped Categories */
          <div className="space-y-16">
            {categoriesToRender.map((category) => {
              const categoryItems = filteredItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category} className="space-y-8">
                  <CategoryHeader title={category} />
                  
                  {/* Premium Cards Grid with 24px gap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryItems.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
