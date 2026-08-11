// ============================================================
// SMILISH GROUP — Static Content Data
// All public website content lives here for easy CMS migration
// ============================================================

export const BRAND = {
  name: "Smilish Group",
  tagline: "Building Businesses. Creating Value.",
  coreMessage: "Fashion. Technology. Real Estate.",
  monogram: "SG",
  phone: "+234 000 000 0000",
  email: "hello@smilishgroup.com",
  whatsapp: "+234 000 000 0000",
  location: "Nigeria, Africa",
  socials: {
    instagram: "#",
    twitter: "#",
    linkedin: "#",
    facebook: "#",
  },
};

export const BRANCHES = [
  {
    id: "fashion",
    name: "Smilish Fashion",
    slug: "fashion",
    tagline: "Wear Your Identity",
    description:
      "Quality clothing that helps customers express identity, confidence and culture. From custom tailoring to African wear, streetwear and corporate attire.",
    color: "#D4AF37",
    href: "/fashion",
    icon: "Shirt",
  },
  {
    id: "ai",
    name: "Smilish AI Automation",
    slug: "automation",
    tagline: "Automate. Scale. Win.",
    description:
      "Help businesses save time, reduce repetitive work, improve customer experience and increase operational efficiency through intelligent automation.",
    color: "#0B1F3A",
    href: "/automation",
    icon: "Bot",
  },
  {
    id: "realestate",
    name: "Smilish Real Estate",
    slug: "real-estate",
    tagline: "Find Your Place",
    description:
      "Discover property opportunities through useful property information, marketing and transaction support. Land, houses, apartments, offices and more.",
    color: "#D4AF37",
    href: "/real-estate",
    icon: "Building2",
  },
];

export const VALUES = [
  {
    title: "Quality",
    description: "Never sacrifice quality simply to increase volume.",
    icon: "Star",
  },
  {
    title: "Innovation",
    description: "Use technology to solve practical problems.",
    icon: "Lightbulb",
  },
  {
    title: "Trust",
    description: "Be transparent with customers and partners.",
    icon: "Shield",
  },
  {
    title: "Creativity",
    description: "Encourage original ideas and solutions.",
    icon: "Palette",
  },
  {
    title: "Customer First",
    description: "Design around real customer needs.",
    icon: "Heart",
  },
  {
    title: "Long-Term Thinking",
    description: "Build assets and businesses that become more valuable over time.",
    icon: "TrendingUp",
  },
];

export const FASHION_SERVICES = [
  "Custom Tailoring",
  "African Wear",
  "Streetwear",
  "Corporate Wear",
  "Wedding & Event Wear",
  "Fashion Consultation",
];

export const FASHION_PRODUCTS = [
  {
    id: "1",
    name: "Classic Agbada Set",
    slug: "classic-agbada-set",
    category: "African Wear",
    price: 85000,
    description:
      "Elegantly crafted Agbada in premium Aso-oke fabric. A timeless statement of African heritage and sophistication.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    featured: true,
    status: "published",
  },
  {
    id: "2",
    name: "Senator Suit",
    slug: "senator-suit",
    category: "African Wear",
    price: 55000,
    description:
      "Sharp, tailored Senator wear in high-quality fabric. Perfect for formal occasions and business events.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    featured: true,
    status: "published",
  },
  {
    id: "3",
    name: "Premium Kaftan",
    slug: "premium-kaftan",
    category: "African Wear",
    price: 35000,
    description:
      "Flowing kaftan in rich embroidered fabric. Comfortable, elegant and unmistakably African.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    featured: true,
    status: "published",
  },
  {
    id: "4",
    name: "Signature Hoodie",
    slug: "signature-hoodie",
    category: "Streetwear",
    price: 18000,
    description:
      "Premium heavyweight hoodie with Smilish embroidery. Crafted for comfort and street-ready style.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    featured: false,
    status: "published",
  },
  {
    id: "5",
    name: "Corporate Shirt",
    slug: "corporate-shirt",
    category: "Corporate Wear",
    price: 22000,
    description:
      "Crisp, tailored corporate shirt in premium cotton. Available for individual and bulk staff uniform orders.",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    featured: false,
    status: "published",
  },
  {
    id: "6",
    name: "Native Shirt",
    slug: "native-shirt",
    category: "African Wear",
    price: 28000,
    description:
      "Beautifully embroidered native shirt. A wardrobe essential for the modern African man.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    featured: false,
    status: "published",
  },
];

export const AI_SERVICES = [
  {
    id: "1",
    name: "AI Customer Service Agent",
    slug: "ai-customer-service",
    description:
      "Deploy an intelligent AI agent that handles customer inquiries 24/7, reducing response time and improving satisfaction.",
    features: ["24/7 availability", "Multi-channel support", "Human handoff", "Analytics dashboard"],
    industries: ["E-commerce", "Healthcare", "Finance", "Hospitality"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    featured: true,
  },
  {
    id: "2",
    name: "AI Sales Assistant",
    slug: "ai-sales-assistant",
    description:
      "Qualify leads automatically, nurture prospects and close more deals with an AI-powered sales pipeline.",
    features: ["Lead qualification", "Follow-up automation", "CRM integration", "Conversion tracking"],
    industries: ["Real Estate", "SaaS", "Retail", "Professional Services"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "AI Booking Agent",
    slug: "ai-booking-agent",
    description:
      "Automate appointment scheduling, confirmations and reminders. Eliminate back-and-forth booking friction.",
    features: ["Calendar integration", "SMS/email reminders", "Rescheduling", "No-show reduction"],
    industries: ["Healthcare", "Beauty", "Consulting", "Events"],
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    featured: false,
  },
  {
    id: "4",
    name: "AI Knowledge Assistant",
    slug: "ai-knowledge-assistant",
    description:
      "Build a custom AI knowledge base that answers questions about your business, products and processes instantly.",
    features: ["Custom knowledge base", "Document ingestion", "Instant answers", "Staff training tool"],
    industries: ["All industries"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    featured: false,
  },
];

export const PROPERTIES = [
  {
    id: "1",
    title: "3-Bedroom Luxury Apartment",
    slug: "3-bedroom-luxury-apartment-lekki",
    type: "Apartment",
    transaction: "For Sale",
    price: 85000000,
    location: "Lekki Phase 1, Lagos",
    bedrooms: 3,
    bathrooms: 3,
    area: "180 sqm",
    description:
      "Stunning 3-bedroom apartment in the heart of Lekki Phase 1. Modern finishes, 24/7 security, swimming pool and gym.",
    features: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator", "Water Treatment"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    status: "Available",
    featured: true,
  },
  {
    id: "2",
    title: "Commercial Land — 2 Plots",
    slug: "commercial-land-2-plots-abuja",
    type: "Land",
    transaction: "For Sale",
    price: 45000000,
    location: "Gwarinpa, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    area: "1000 sqm",
    description:
      "Prime commercial land in Gwarinpa, Abuja. Fully documented with Certificate of Occupancy. Ideal for commercial development.",
    features: ["C of O", "Survey Plan", "Accessible Road", "Electricity", "Commercial Zone"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    status: "Available",
    featured: true,
  },
  {
    id: "3",
    title: "4-Bedroom Detached House",
    slug: "4-bedroom-detached-house-ikeja",
    type: "House",
    transaction: "For Sale",
    price: 120000000,
    location: "Ikeja GRA, Lagos",
    bedrooms: 4,
    bathrooms: 4,
    area: "350 sqm",
    description:
      "Spacious 4-bedroom detached house in the prestigious Ikeja GRA. Large compound, BQ, and all modern amenities.",
    features: ["BQ", "Large Compound", "Swimming Pool", "24/7 Security", "Generator", "CCTV"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    status: "Available",
    featured: true,
  },
  {
    id: "4",
    title: "Office Space — Open Plan",
    slug: "office-space-victoria-island",
    type: "Office",
    transaction: "For Rent",
    price: 8000000,
    location: "Victoria Island, Lagos",
    bedrooms: 0,
    bathrooms: 2,
    area: "250 sqm",
    description:
      "Modern open-plan office space on Victoria Island. Fully fitted, high-speed internet, meeting rooms and reception area.",
    features: ["High-Speed Internet", "Meeting Rooms", "Reception", "AC", "Generator", "Parking"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    status: "Available",
    featured: false,
  },
  {
    id: "5",
    title: "2-Bedroom Flat",
    slug: "2-bedroom-flat-surulere",
    type: "Apartment",
    transaction: "For Rent",
    price: 1800000,
    location: "Surulere, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    area: "110 sqm",
    description:
      "Well-maintained 2-bedroom flat in a serene estate in Surulere. Close to schools, markets and major roads.",
    features: ["Estate Security", "Parking", "Water", "Tiled Floors", "Modern Kitchen"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    status: "Available",
    featured: false,
  },
  {
    id: "6",
    title: "Shop Space in Commercial Plaza",
    slug: "shop-space-commercial-plaza-ibadan",
    type: "Shop",
    transaction: "For Rent",
    price: 1200000,
    location: "Ring Road, Ibadan",
    bedrooms: 0,
    bathrooms: 1,
    area: "60 sqm",
    description:
      "Strategically located shop space in a busy commercial plaza. High foot traffic, good visibility and easy access.",
    features: ["High Foot Traffic", "Security", "Electricity", "Water", "Storage Room"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    status: "Available",
    featured: false,
  },
];

export const PROJECTS = [
  {
    id: "1",
    title: "Bridal Collection 2024",
    slug: "bridal-collection-2024",
    category: "fashion",
    description:
      "A stunning collection of custom bridal outfits crafted for a Lagos wedding. Agbada, gele and matching accessories.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    date: "2024-06-15",
    featured: true,
  },
  {
    id: "2",
    title: "Corporate Uniform — FinTech Company",
    slug: "corporate-uniform-fintech",
    category: "fashion",
    description:
      "Designed and produced 200+ staff uniforms for a leading Nigerian fintech company. Corporate shirts, trousers and branded caps.",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    date: "2024-03-10",
    featured: false,
  },
  {
    id: "3",
    title: "AI Customer Service Deployment",
    slug: "ai-customer-service-ecommerce",
    category: "ai",
    description:
      "Deployed a full AI customer service agent for a Lagos e-commerce brand. Reduced response time by 80% and improved satisfaction scores.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    date: "2024-08-01",
    featured: true,
  },
  {
    id: "4",
    title: "Lead Automation — Real Estate Agency",
    slug: "lead-automation-real-estate",
    category: "ai",
    description:
      "Built a complete lead qualification and follow-up automation workflow for a real estate agency. 3x increase in qualified leads.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    date: "2024-05-20",
    featured: true,
  },
  {
    id: "5",
    title: "Luxury Apartment Sale — Lekki",
    slug: "luxury-apartment-sale-lekki",
    category: "realestate",
    description:
      "Successfully facilitated the sale of a 4-bedroom luxury apartment in Lekki Phase 1. Full documentation and transaction support.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    date: "2024-07-12",
    featured: true,
  },
  {
    id: "6",
    title: "Commercial Land Acquisition — Abuja",
    slug: "commercial-land-abuja",
    category: "realestate",
    description:
      "Guided a client through the acquisition of 5 plots of commercial land in Gwarinpa, Abuja. Full due diligence and documentation.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    date: "2024-04-05",
    featured: false,
  },
];

export const HOW_WE_WORK = [
  {
    step: "01",
    title: "Discover",
    description: "We listen carefully to understand your needs, goals and context before proposing any solution.",
  },
  {
    step: "02",
    title: "Design",
    description: "We design a tailored approach — whether that's a garment, an automation workflow or a property strategy.",
  },
  {
    step: "03",
    title: "Deliver",
    description: "We execute with precision and keep you informed at every stage until the job is done right.",
  },
  {
    step: "04",
    title: "Support",
    description: "We stay available after delivery to ensure you get lasting value from every engagement.",
  },
];

export const formatPrice = (price: number, currency = "₦") => {
  if (price >= 1_000_000) {
    return `${currency}${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (price >= 1_000) {
    return `${currency}${(price / 1_000).toFixed(0)}K`;
  }
  return `${currency}${price.toLocaleString()}`;
};
