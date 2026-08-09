export type ProductStatus = "Published" | "Out of Stock" | "Draft" | "Archived";

export interface FashionProduct {
  slug: string;
  name: string;
  category: string;
  fabric: string;
  price: number;
  discount?: number;
  colors: string[];
  sizes: string[];
  stock: number;
  sku: string;
  featured: boolean;
  status: ProductStatus;
  description: string;
}

export const fashionCategories = [
  "Agbada",
  "Senator Wear",
  "Native Shirts",
  "Kaftans",
  "Streetwear",
  "Corporate Wear",
  "Wedding and Event Wear",
  "Fashion Consultation",
];

export const fashionProducts: FashionProduct[] = [
  {
    slug: "royal-navy-agbada",
    name: "Royal Navy Agbada",
    category: "Agbada",
    fabric: "Hand-embroidered Cashmere",
    price: 185000,
    colors: ["Navy", "Gold Trim"],
    sizes: ["M", "L", "XL", "XXL", "Custom"],
    stock: 6,
    sku: "SF-AGB-001",
    featured: true,
    status: "Published",
    description:
      "A ceremonial agbada in deep navy cashmere with hand-worked gold embroidery along the collar and cuffs. Tailored fully custom to your measurements for weddings, chieftaincy and formal occasions.",
  },
  {
    slug: "obsidian-senator-set",
    name: "Obsidian Senator Set",
    category: "Senator Wear",
    fabric: "Italian Wool Blend",
    price: 95000,
    colors: ["Black", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    stock: 12,
    sku: "SF-SEN-014",
    featured: true,
    status: "Published",
    description:
      "A sharply tailored two-piece senator set built for boardrooms and formal events, finished with a structured collar and mother-of-pearl buttons.",
  },
  {
    slug: "gilded-native-shirt",
    name: "Gilded Native Shirt",
    category: "Native Shirts",
    fabric: "Premium Cotton Guinea Brocade",
    price: 42000,
    colors: ["White/Gold", "Navy/Gold"],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    sku: "SF-NAT-032",
    featured: true,
    status: "Published",
    description:
      "Breathable guinea brocade native shirt with gold thread detailing at the neckline — a versatile piece for Friday wear and casual celebrations.",
  },
  {
    slug: "heritage-kaftan",
    name: "Heritage Kaftan",
    category: "Kaftans",
    fabric: "Silk-Cotton Blend",
    price: 68000,
    colors: ["Ivory", "Deep Navy"],
    sizes: ["M", "L", "XL", "Custom"],
    stock: 9,
    sku: "SF-KAF-009",
    featured: false,
    status: "Published",
    description:
      "A relaxed-fit kaftan cut from a silk-cotton blend that drapes cleanly — comfortable enough for daily wear, sharp enough for guests.",
  },
  {
    slug: "monogram-street-hoodie",
    name: "Monogram Street Hoodie",
    category: "Streetwear",
    fabric: "Heavyweight French Terry",
    price: 28000,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 34,
    sku: "SF-STR-101",
    featured: true,
    status: "Published",
    description:
      "Heavyweight hoodie with an embroidered SG monogram at the chest and a boxy, oversized fit true to Smilish streetwear proportions.",
  },
  {
    slug: "atelier-joggers",
    name: "Atelier Joggers",
    category: "Streetwear",
    fabric: "Brushed Cotton Fleece",
    price: 22000,
    colors: ["Black", "Stone Grey"],
    sizes: ["S", "M", "L", "XL"],
    stock: 0,
    sku: "SF-STR-108",
    featured: false,
    status: "Out of Stock",
    description:
      "Tapered joggers with a ribbed cuff and side-seam pocket, designed as the everyday counterpart to the Monogram collection.",
  },
  {
    slug: "corporate-oxford-shirt",
    name: "Corporate Oxford Shirt",
    category: "Corporate Wear",
    fabric: "Egyptian Cotton",
    price: 32000,
    colors: ["White", "Sky Blue", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 18,
    sku: "SF-COR-021",
    featured: false,
    status: "Published",
    description:
      "A precision-cut Oxford shirt for corporate wardrobes and staff uniforms, available for bulk order with company branding on request.",
  },
  {
    slug: "midnight-wedding-kaftan",
    name: "Midnight Wedding Kaftan",
    category: "Wedding and Event Wear",
    fabric: "Embellished Silk",
    price: 145000,
    colors: ["Midnight Navy", "Gold Embroidery"],
    sizes: ["M", "L", "XL", "Custom"],
    stock: 4,
    sku: "SF-WED-005",
    featured: true,
    status: "Published",
    description:
      "A statement kaftan for grooms and guests, hand-embellished with gold thread along the neckline and cuffs — built for the reception, not just the ceremony.",
  },
  {
    slug: "signature-cap",
    name: "Signature Cap",
    category: "Streetwear",
    fabric: "Cotton Twill",
    price: 12000,
    colors: ["Black", "Navy", "Stone"],
    sizes: ["One Size"],
    stock: 41,
    sku: "SF-STR-115",
    featured: false,
    status: "Published",
    description:
      "A structured six-panel cap with a subtly embroidered SG monogram — the easiest way into the Smilish streetwear line.",
  },
  {
    slug: "consultation-fitting",
    name: "Personal Styling & Fitting Session",
    category: "Fashion Consultation",
    fabric: "N/A",
    price: 15000,
    colors: [],
    sizes: [],
    stock: 999,
    sku: "SF-CON-001",
    featured: false,
    status: "Published",
    description:
      "A one-on-one session with a Smilish stylist to plan an outfit, take measurements, or refine a wardrobe for an upcoming event — fee is credited toward any order placed the same day.",
  },
];

export const featuredFashionProducts = fashionProducts.filter((p) => p.featured);

export interface FashionProject {
  slug: string;
  title: string;
  category: string;
  clientName?: string;
  date: string;
  featured: boolean;
  description: string;
}

export const fashionProjects: FashionProject[] = [
  {
    slug: "adeyemi-wedding-agbada",
    title: "Adeyemi Wedding Agbada Collection",
    category: "Wedding & Event Wear",
    clientName: "Private Client",
    date: "2025-11-02",
    featured: true,
    description:
      "A five-piece agbada commission for a groom and his train, unifying navy and gold across five custom fits for the traditional ceremony.",
  },
  {
    slug: "lagos-fintech-uniforms",
    title: "Lagos Fintech Staff Uniforms",
    category: "Corporate Wear",
    clientName: "Confidential Fintech Client",
    date: "2025-09-14",
    featured: true,
    description:
      "60 units of branded corporate shirts and blazers produced and fitted for a fintech company's Lagos head office launch.",
  },
  {
    slug: "streetwear-capsule-vol2",
    title: "Streetwear Capsule Vol. 2",
    category: "Streetwear",
    date: "2025-06-30",
    featured: false,
    description:
      "An in-house capsule drop of 200 units across hoodies, joggers and caps, styled and shot for the Smilish Instagram launch.",
  },
];
