const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

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

  const admin = await prisma.user.create({
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
  const silverPkg = await prisma.package.create({
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

  const platinumPkg = await prisma.package.create({
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

  // 5. Create Menu Items
  const menuItems = [
    // Starters
    {
      name: 'Paneer Tikka',
      description: 'Cottage cheese cubes marinated in yogurt spices, grilled in clay oven.',
      price: 150,
      category: 'Starters',
      availability: true,
      dietaryTag: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Chicken Seekh Kebab',
      description: 'Minced chicken skewers spiced with fresh herbs, roasted over hot charcoal.',
      price: 180,
      category: 'Starters',
      availability: true,
      dietaryTag: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Crispy Spring Rolls',
      description: 'Crisp wrapper rolled with shredded vegetables and sweet-sour glaze.',
      price: 120,
      category: 'Starters',
      availability: true,
      dietaryTag: 'VEGAN',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },

    // Main Course
    {
      name: 'Butter Chicken',
      description: 'Tender chicken tikka cooked in rich, creamy tomato gravy with butter and fenugreek.',
      price: 350,
      category: 'Main Course',
      availability: true,
      dietaryTag: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese cubes tossed in sweetish cream, cashew, and tomato gravy.',
      price: 280,
      category: 'Main Course',
      availability: true,
      dietaryTag: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Aromatic Veg Pulao',
      description: 'Fragrant basmati rice cooked with fresh seasonal vegetables and whole spices.',
      price: 200,
      category: 'Main Course',
      availability: true,
      dietaryTag: 'VEGAN',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    },

    // Desserts
    {
      name: 'Hot Gulab Jamun',
      description: 'Sweet berry-sized milk solids fried and soaked in cardamom rose syrup.',
      price: 80,
      category: 'Desserts',
      availability: true,
      dietaryTag: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Creamy Rasmalai',
      description: 'Flattened paneer discs soaked in thickened, saffron-flavored milk.',
      price: 100,
      category: 'Desserts',
      availability: true,
      dietaryTag: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1621303837474-61fd7e72251a?auto=format&fit=crop&w=800&q=80',
    },

    // Snacks
    {
      name: 'Crispy Samosa',
      description: 'Golden pastry shell stuffed with spicy potato and pea filling.',
      price: 40,
      category: 'Snacks',
      availability: true,
      dietaryTag: 'VEGAN',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80',
    },

    // Beverages
    {
      name: 'Mint Mojito',
      description: 'Refreshing carbonated water with lime juice, sugar syrup, and fresh mint leaves.',
      price: 110,
      category: 'Beverages',
      availability: true,
      dietaryTag: 'VEGAN',
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    },

    // Live Counters
    {
      name: 'Live Pasta Counter',
      description: 'Penne or fusilli made live in Alfredo, Marinara, or Pesto sauce with veggies.',
      price: 250,
      category: 'Live Counters',
      availability: true,
      dietaryTag: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    },
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
