# DD Cookers — High-Performance Luxury Catering Platform

DD Cookers is a premier full-stack catering and event hospitality web platform built for exceptional speed, pristine luxury aesthetics, and seamless lead generation in Tirunelveli and Tamil Nadu.

---

## 🚀 Performance Architecture & Image Optimization

### 1. Next.js High-Speed Image Engine
- **Modern Next-Gen Formats**: Automatic conversion to **AVIF** and **WebP** (`next.config.ts`), cutting payload size by **60–80%** compared to traditional PNG/JPEG.
- **Responsive Device Breakpoints**: Adaptive `sizes` attributes ensure mobile devices only download 380px–640px representations rather than full-resolution desktop images.
- **Lossless & Optimized Local Assets**: Local brand assets (`hero-bg.png`, `founder.png`, `logo.png`) are pre-compressed and served with immutable 1-year browser cache headers (`Cache-Control: public, max-age=31536000, immutable`).
- **Priority LCP Preloading**: Above-the-fold hero background and founder portraits use `priority` and `quality={85}` to achieve instant **Largest Contentful Paint (LCP < 1.0s)**.
- **Native Async Lazy Loading**: Below-the-fold catalog items, team portraits, and gallery photos utilize `loading="lazy"` and `quality={75-80}` for instant time-to-interactive.

---

## 📖 Page Architecture Breakdown (~100 Words per Module)

### 🏠 1. Homepage (`/`)
The flagship landing page combines a high-resolution Kanniyakumari coastal sunrise hero background, an authoritative grounded founder portrait, an interactive instant catering quote estimator (`HeroQuoteForm`), animated count-up metrics, a curated package showcase with multi-dish modal teasers, and verified customer testimonials. Designed for maximum conversion and ultra-fast first contentful paint.

---

### 🏛️ 2. About Us Page (`/about`)
Showcases DD Cookers' culinary journey since 2008 in Tirunelveli. Features our modern 2000+ sq. ft. central kitchen capability, mass-meal thermal transport capacity (5000+ guests/day), core company values (Purity, Promptness, Culinary Artistry), and profiles of our master chef team with verified kitchen experience badges.

---

### 🍲 3. Catering Services (`/services`)
An overview hub categorizing DD Cookers' three core operational pillars: Full-Service Catering, Specialized Bulk Cooking Solutions, and Interactive Live Food Stalls. Includes custom menu card inquiry triggers, pricing scope summaries, and direct deep-links to dedicated service detail pages with comprehensive inclusion lists.

---

### 🍽️ 4. Gourmet Menu Catalog (`/menu`)
An interactive, ultra-fast searchable digital menu presenting traditional South Indian breakfast delicacies, authentic Dum Biryanis, celebratory curries, and live counters. Features quick category filters (Breakfast, Biryani, Starters, Live Counters, Desserts) with dietary tags (Veg/Non-Veg indicators) and visual dish cards.

---

### 📸 5. Visual Portfolio & Gallery (`/gallery`)
A responsive masonry image showcase exhibiting real banquets, lavish floral buffet tables, charcoal grill setups, and live dessert stations across Tirunelveli. Features high-speed category filtering, full-screen lightbox modal preview, and an Instagram community connection card.

---

### 📦 6. Event Packages & Pricing (`/packages`)
Curated tier-based event catering packages (Silver Vegetarian Feast, Golden Traditional Banquet, Royal Non-Veg Extravaganza). Clear per-plate price breakdown, guest capacity limits, full dish lists, service staff inclusions, and direct one-click booking wizard pre-fill integration.

---

### 📅 7. Interactive Booking Wizard (`/booking`)
A step-by-step event configuration engine guiding clients through Event Context, Guest Capacity slider (10 to 500+ persons), Menu Tier selection, Live Stall add-ons, and real-time live cost calculations with instant booking confirmation.

---

### 📞 8. Contact Us & Inquiries (`/contact`)
Direct communication portal featuring our verified operating address (*6/20, Chukkuparai Therivilai, Agastheeswaram, Kovalam, Tamil Nadu 629701*), direct phone/WhatsApp click-to-call links, operational hours (09:00 AM – 10:00 PM), and an interactive validation-equipped contact form.

---

### 🔐 9. Authentication & User Profile (`/login`, `/register`, `/profile`)
Member authentication system with JWT secure sessions. Enables clients to register accounts, review real-time booking request statuses (Pending, Approved, In Review), track event timelines, and download invoice summaries.

---

### ⚙️ 10. Admin Command Center (`/admin`)
An administrative operations suite for the catering management team. Features live monthly revenue analytics charts, customer inquiry response tools, and full CRUD control over the menu catalog and event bookings.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16.3 (Turbopack, App Router, React 19)
- **Styling**: Tailwind CSS (Custom Luxury Ivory, Crimson `#A61C24` & Brass `#B58446` Palette)
- **Database & ORM**: SQLite / PostgreSQL with Prisma ORM
- **Icons**: Lucide React (Optimized tree-shaking imports)
- **Fonts**: Google Fonts (`Geist` Sans & `Fraunces` Luxury Serif with `display: swap`)

---

## ⚡ Build & Development Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run TypeScript & ESLint validation
npm run lint

# Generate production build with static pre-rendering
npm run build

# Start production server
npm start
```
