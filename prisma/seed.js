import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing database
  await prisma.contactMessage.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.chef.deleteMany({});
  await prisma.galleryItem.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  const _admin = await prisma.user.create({
    data: {
      name: 'DD Admin',
      email: 'admin@cookers.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'customer@gmail.com',
      password: customerPassword,
      role: 'USER',
    },
  });

  console.log('Users seeded successfully.');

  // 3. Create Packages
  const _silverPkg = await prisma.package.create({
    data: {
      name: 'Silver Package',
      description: 'Ideal for intimate gatherings, small birthdays, or cozy family get-togethers.',
      price: 499,
      guestCapacity: 50,
      menuHighlights: '2 Starters, 3 Main Courses, 1 Dessert, 1 Beverage',
      servicesIncluded: 'Buffet Table Setup, Basic Ceramic Crockery, 2 Servers, Trash Management',
      isFeatured: false,
    },
  });

  const goldPkg = await prisma.package.create({
    data: {
      name: 'Gold Package',
      description: 'Our most popular choice. Great for corporate events, grand birthdays, and mid-sized weddings.',
      price: 999,
      guestCapacity: 150,
      menuHighlights: '4 Starters, 5 Main Courses, 2 Desserts, 2 Beverages, 1 Live Counter',
      servicesIncluded: 'Premium Buffet Decoration, Fine Ceramic Crockery, 4 Servers, Live Station Chef, Waste Disposal',
      isFeatured: true,
    },
  });

  const _platinumPkg = await prisma.package.create({
    data: {
      name: 'Platinum Package',
      description: 'A lavish, luxury menu tailored for large weddings, elite corporate galas, and grand celebrations.',
      price: 1799,
      guestCapacity: 300,
      menuHighlights: '6 Starters, 7 Main Courses, 3 Desserts, 3 Beverages, 2 Live Counters, Custom Salad Bar',
      servicesIncluded: 'Luxury Floral Buffet Setup, Fine-Bone China & Premium Cutlery, 8 Servers, Event Supervisor, Live Chefs',
      isFeatured: false,
    },
  });

  console.log('Packages seeded successfully.');

  // 4. Create Services
  const services = [
    {
      name: 'Wedding Catering',
      description: 'Elegant multi-course feasts, floral buffet styling, and high-end service for your special day.',
      basePrice: 50000,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      category: 'Catering',
    },
    {
      name: 'Corporate Catering',
      description: 'Professional catering for board meetings, annual events, and office parties with punctual delivery.',
      basePrice: 30000,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      category: 'Catering',
    },
    {
      name: 'Birthday Catering',
      description: 'Fun, tasty, and customized menus to make birthday celebrations special for kids and adults alike.',
      basePrice: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      category: 'Catering',
    },
    {
      name: 'Live Cooking Station',
      description: 'Watch our master chefs toss pasta, bake pizzas, or sizzle stir-fry live right before your guests.',
      basePrice: 20000,
      imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
      category: 'Live Station',
    },
    {
      name: 'Popcorn Station',
      description: 'Fresh, warm popcorn popped live in theater-style machines. Perfect for movie nights and kids parties.',
      basePrice: 5000,
      imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
      category: 'Counter',
    },
    {
      name: 'Cotton Candy Station',
      description: 'Sweet, fluffy spun cotton candy in multiple colors and flavors, served live on sticks.',
      basePrice: 5000,
      imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80',
      category: 'Counter',
    },
    {
      name: 'BBQ Counter',
      description: 'Charcoal grilled kebabs, tikkas, and smoked veggies prepared live with signature marinades.',
      basePrice: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      category: 'Live Station',
    },
    {
      name: 'Juice Counter',
      description: 'Freshly squeezed seasonal fruits, mocktails, and refreshing summer coolers served chilled.',
      basePrice: 10000,
      imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
      category: 'Counter',
    },
    {
      name: 'Dessert Counter',
      description: 'A decadent collection of pastries, traditional sweets, chocolate fountains, and ice creams.',
      basePrice: 18000,
      imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
      category: 'Counter',
    },
    {
      name: 'Custom Event Catering',
      description: 'Tailored event coordination where we design custom recipes, themes, and layouts specifically for you.',
      basePrice: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820aac597?auto=format&fit=crop&w=800&q=80',
      category: 'Catering',
    },
  ];

  for (const svc of services) {
    await prisma.service.create({ data: svc });
  }
  console.log('Services seeded successfully.');

  // 5. Create Menu Items — DD Cookers Real Menu
  const menuItems = [
    // ===== BREAKFAST (14 items) =====
    { name: 'Idly', description: 'Soft, fluffy steamed rice cakes — a classic South Indian breakfast staple.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80' },
    { name: 'Dosai', description: 'Crispy golden rice and lentil crepe served with sambar and chutney.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80' },
    { name: 'Poori', description: 'Puffed whole wheat deep-fried bread served with potato masala.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pongal', description: 'Creamy rice and lentils tempered with pepper, cumin, ginger, and cashews.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1645177625172-89574ec0aa09?auto=format&fit=crop&w=500&q=80' },
    { name: 'Masala Dosai', description: 'Crisp rice crepe stuffed with spiced potato filling and red garlic chutney.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Appam', description: 'Lacy fermented rice crepe with soft center, served with coconut milk.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80' },
    { name: 'Onion Dosai', description: 'Crispy crepe loaded with caramelized onions, green chillies, and coriander.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Podi Dosai', description: 'Crispy rice crepe coated with house-ground spiced lentil powder and ghee.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Sambar', description: 'Slow-simmered vegetable stew with drumsticks, tamarind, and hand-pounded spices.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Coconut Chutney', description: 'Freshly grated coconut ground with green chillies and tempered with mustard seeds.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80' },
    { name: 'Spicy Chutney', description: 'Tangy and spicy tomato-onion chutney roasted with red chillies and south Indian spices.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80' },
    { name: 'Vada', description: 'Crispy golden deep-fried lentil doughnuts seasoned with pepper, ginger, and curry leaves.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Tea Coffee', description: 'Freshly brewed filter coffee and aromatic tea — traditional Tamil Nadu style.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kesari', description: 'Warm, fragrant semolina sweet cooked with ghee, saffron, cashews, and raisins.', category: 'Breakfast', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80' },

    // ===== BIRYANI (4 items) =====
    { name: 'Mutton Biryani', description: 'Tender mutton pieces layered with aromatic basmati rice, slow-cooked dum style.', category: 'Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Biryani', description: 'Juicy chicken marinated in exotic spices, layered with fragrant basmati rice.', category: 'Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Seela Fish Biryani', description: 'Fresh Seela fish fillets cooked with spices and long-grain basmati rice.', category: 'Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Prawn Biryani', description: 'Succulent prawns cooked with south Indian spices and aromatic rice.', category: 'Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },

    // ===== SPECIAL BIRYANI (14 items) =====
    { name: 'Hyderabadi Biryani', description: 'Classic Hyderabadi dum biryani with saffron-infused rice and slow-cooked meat.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Aatukaal Biryani (Seeraga Samba)', description: 'Tirunelveli-style goat leg biryani with aromatic seeraga samba rice.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Biryani', description: 'Country chicken biryani with traditional spices and hand-pounded masala.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Turkey Biryani', description: 'Tender turkey meat slow-cooked with fragrant basmati rice and exotic spices.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kaadai Biryani', description: 'Quail biryani — a rare delicacy with tender quail and aromatic rice.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Egg Biryani', description: 'Boiled eggs cooked with spiced rice and aromatic herbs.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Idiyappam Biryani', description: 'String hoppers infused with biryani spices — a unique Tirunelveli specialty.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Semiya Biryani', description: 'Vermicelli biryani — delicate sevai cooked with spices and ghee.', category: 'Special Biryani', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mushroom Biryani', description: 'Fresh mushrooms cooked with aromatic rice and whole spices.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Paneer Biryani', description: 'Cottage cheese cubes layered with saffron rice and mild spices.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veg Biryani (Gopi 65, Gravy)', description: 'Vegetable biryani topped with crispy Gopi 65 and rich gravy.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Plain Biryani', description: 'Aromatic basmati rice cooked with whole garam masala — simple and flavorful.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kushka Biryani', description: 'Spiced plain biryani rice — the perfect accompaniment to any gravy.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Thakkali Biryani', description: 'Tangy tomato-based biryani with south Indian spice blend.', category: 'Special Biryani', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },

    // ===== RICE VARIETIES (15 items) =====
    { name: 'Mutton Ghee Rice', description: 'Fragrant basmati rice cooked with tender mutton pieces and pure ghee.', category: 'Rice Varieties', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Ghee Rice', description: 'Aromatic rice cooked with succulent chicken pieces and ghee.', category: 'Rice Varieties', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Normal Rice (Mutton)', description: 'Steamed rice served with mutton curry — simple comfort food.', category: 'Rice Varieties', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Normal Rice (Chicken)', description: 'Steamed rice served with chicken curry — a wholesome meal.', category: 'Rice Varieties', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Marunthu Soru', description: 'Medicinal rice cooked with herbs and traditional spices — a Tirunelveli specialty.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Curd Rice', description: 'Creamy yogurt rice tempered with mustard, curry leaves, and green chillies.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Lemon Rice', description: 'Tangy rice tempered with peanuts, mustard seeds, turmeric, and fresh lemon.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Tamarind Rice', description: 'Tangy puliyodharai rice with tamarind paste, peanuts, and south Indian spices.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Coconut Rice', description: 'Mild and fragrant rice mixed with freshly grated coconut and tempering.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Candy Rice', description: 'Sweet jaggery-infused rice with cardamom, cashews, and ghee.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Tomato Rice', description: 'Tangy rice cooked with ripe tomatoes, onions, and aromatic spices.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Sambar Rice', description: 'Rice mixed with hot sambar, ghee, and a medley of vegetables.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Curry Leaves Rice', description: 'Aromatic rice infused with fresh curry leaves and south Indian tempering.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Coriander Rice', description: 'Fresh coriander-infused rice with mild spices and lemon juice.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veg Rice', description: 'Mixed vegetable rice cooked with seasonal vegetables and mild spices.', category: 'Rice Varieties', availability: true, dietaryTag: 'VEG', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },

    // ===== STARTERS (41 items) =====
    // Mutton Starters (6)
    { name: 'Mutton Chaaps', description: 'Tender mutton ribs marinated in spices and grilled to smoky perfection.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Chukka', description: 'Spicy and dry mutton fry with roasted coconut and curry leaves.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Vettai Kari', description: 'Country-style mutton curry slow-cooked in iron wok with rustic spices.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Boneless Gravy', description: 'Succulent boneless mutton pieces in a rich, aromatic gravy.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Fry', description: 'Crispy-fried mutton pieces tossed with onions and spicy masala.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Keema', description: 'Minced mutton cooked with onions, tomatoes, and aromatic spices.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },

    // Chicken Starters (14)
    { name: 'Chicken 65', description: 'The iconic spicy deep-fried chicken with red chilli marinade.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Boneless', description: 'Tender boneless chicken pieces marinated and fried to golden perfection.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chettinad Chicken', description: 'Fiery Chettinad-style chicken with freshly ground spice paste.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Dragon Chicken', description: 'Crispy chicken tossed in a sweet and spicy dragon sauce.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Pakoda', description: 'Crispy gram flour-battered chicken fritters with spicy masala.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Garlic Chicken', description: 'Chicken pieces infused with roasted garlic and bold spices.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Golden Chicken', description: 'Golden-fried crispy chicken with a crunchy outer layer.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pepper Chicken 65', description: 'Spicy pepper-infused Chicken 65 with a bold black pepper kick.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Grill Chicken', description: 'Charcoal-grilled whole chicken pieces with smoky tandoori marinade.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Manchurian', description: 'Indo-Chinese style chicken balls in a tangy manchurian sauce.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Tikka', description: 'Succulent chicken chunks marinated in yogurt and spices, grilled in clay oven.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Lollipop', description: 'Crispy drumette chicken wings tossed in spicy Schezwan sauce.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Semi Gravy', description: 'Tender chicken pieces in a thick, luscious masala gravy.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Chukka', description: 'Dry, spicy chicken masala with roasted onions and curry leaves.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Chaaps (Coconut Mixing)', description: 'Chicken chaaps tossed with freshly grated coconut and mild spices.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },

    // Nattu Kozhi Starters (12)
    { name: 'Nattu Kozhi 65', description: 'Country chicken deep-fried with traditional red chilli marinade.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Dry Masala', description: 'Country chicken cooked dry with hand-pounded masala paste.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Golden Fry', description: 'Golden-fried country chicken with crispy turmeric coating.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Pepper 65', description: 'Pepper-spiked country chicken 65 with bold black pepper flavor.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Green', description: 'Country chicken with green chilli and coriander-based green masala.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Manchurian', description: 'Country chicken in Indo-Chinese manchurian sauce — a fusion delicacy.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Tikka', description: 'Country chicken tikka marinated in spices and grilled on charcoal.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Semi Gravy', description: 'Country chicken in a thick, rich semi-gravy masala.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Chukka', description: 'Dry country chicken masala with roasted coconut and curry leaves.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Grill Full', description: 'Whole country chicken grilled with tandoori marinade over charcoal.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Nattu Kozhi Chaaps', description: 'Country chicken chaaps grilled with bold spices and aromatic herbs.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pepper Chicken', description: 'Succulent chicken pieces tossed with freshly cracked black pepper.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },

    // Kaadai (Quail) Starters (8)
    { name: 'Golden Kaadai', description: 'Golden-fried quail with crispy turmeric and spice coating.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pepper 65 Kaadai', description: 'Pepper-spiked quail 65 with bold and spicy flavor.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pepper Kaadai', description: 'Quail cooked with freshly ground pepper and south Indian spices.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Grill Kaadai', description: 'Charcoal-grilled quail with smoky tandoori marinade.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kaadai Manchurian', description: 'Quail pieces in Indo-Chinese manchurian sauce — a unique fusion.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kaadai Semi Gravy', description: 'Quail in a thick, luscious semi-gravy masala.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kaadai Chukka', description: 'Dry quail masala with roasted spices and curry leaves.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
    { name: 'Kaadai Chaaps', description: 'Grilled quail chaaps with bold spices and aromatic herbs.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },

    // Additional Starters (1)
    { name: 'Pepper Chicken 65', description: 'Bold pepper-infused chicken 65 with a fiery kick.', category: 'Starters', availability: true, dietaryTag: 'NON_VEG', imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80' },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
  console.log('Menu Items seeded successfully.');

  // 6. Create Chefs
  const chefs = [
    {
      name: 'Rajeev Kapoor',
      designation: 'Executive Head Chef',
      specialty: 'Traditional Indian & Mughlai Feasts',
      experience: 16,
      bio: 'Chef Rajeev spent years mastering spices in northern India. He curates rich, nostalgic curries and slow-cooked biryanis that define our premium wedding packages.',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Sarah Jenkins',
      designation: 'Sous Chef',
      specialty: 'Live Italian & Contemporary Pasta',
      experience: 9,
      bio: 'Chef Sarah brings passion for live interaction and fresh doughs. She runs our famous live pasta, pizza, and stir-fry counters with theatrical flair.',
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Marcus Bell',
      designation: 'Pastry & Dessert Chef',
      specialty: 'Artisanal Confectionery & Sweet Stations',
      experience: 11,
      bio: 'Chef Marcus is a chocolatier who curates dessert buffets featuring cotton candy spinners, molten fountains, traditional sweets, and delicate French pastries.',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  for (const chef of chefs) {
    await prisma.chef.create({ data: chef });
  }
  console.log('Chefs seeded successfully.');

  // 7. Create Testimonials
  const testimonials = [
    {
      customerName: 'Aishwarya Roy',
      content: 'Cookers handled our wedding food for 250 guests. The Gold Package was amazing! The Live Pasta and BBQ tikkas were the highlight. Every single guest praised the taste!',
      rating: 5,
      isApproved: true,
      eventDate: '2026-05-12',
    },
    {
      customerName: 'Robert D.',
      content: 'We used their Corporate Catering for our company summit. Extremely punctual, professional buffet decoration, and hygienic setup. Highly recommended!',
      rating: 5,
      isApproved: true,
      eventDate: '2026-06-02',
    },
    {
      customerName: 'Nisha Sharma',
      content: 'The Cotton Candy and Popcorn machines were a huge hit at my son\'s 5th birthday. The staff was clean and very friendly with the children.',
      rating: 4,
      isApproved: true,
      eventDate: '2026-05-28',
    },
    {
      customerName: 'David Miller',
      content: 'Excellent food, custom pricing structure, and super smooth process. The mock pricing estimator on their booking site was extremely accurate.',
      rating: 5,
      isApproved: false, // Pending approval
      eventDate: '2026-06-15',
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('Testimonials seeded successfully.');

  // 8. Create Contact Messages
  const contactMessages = [
    {
      name: 'Amit Patel',
      email: 'amit.patel@yahoo.com',
      message: 'Hello, do you support pure Jain catering menus for a small family gathering of 40 people? Let me know the prices.',
      status: 'UNREAD',
    },
    {
      name: 'Clarissa Vance',
      email: 'clarissa@vancemedia.com',
      message: 'Looking for a quote for corporate office lunch box delivery for 100 staff members daily. Please call back.',
      status: 'RESOLVED',
    },
  ];

  for (const msg of contactMessages) {
    await prisma.contactMessage.create({ data: msg });
  }
  console.log('Contact Messages seeded successfully.');

  // 9. Create a Sample Booking for our Customer
  await prisma.booking.create({
    data: {
      userId: customer.id,
      eventType: 'Birthday Party',
      date: '2026-08-25',
      time: '18:30',
      venue: 'Sheraton Grand Hall, Suite B',
      guestCount: 80,
      packageId: goldPkg.id,
      estimatedPrice: 79920, // 80 guests * 999
      status: 'APPROVED',
      specialRequests: 'Please make sure there are plenty of vegetarian snacks for our elders. Live station needs to setup by 17:30.',
      optionalServices: 'Popcorn Station, Cotton Candy Station',
    },
  });

  console.log('Sample booking seeded.');
  console.log('Database Seeding Completed Successfully! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
