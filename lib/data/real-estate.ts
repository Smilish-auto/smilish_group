export type TransactionType = "For Sale" | "For Rent" | "Lease" | "Investment";
export type PropertyStatus = "Available" | "Reserved" | "Sold" | "Rented" | "Unavailable";

export interface Property {
  slug: string;
  title: string;
  description: string;
  price: number;
  priceUnit: "total" | "per year" | "per month";
  location: string;
  state: string;
  city: string;
  areaSqm?: number;
  propertyType: "Land" | "House" | "Apartment" | "Office" | "Shop" | "Commercial" | "Estate";
  transactionType: TransactionType;
  bedrooms?: number;
  bathrooms?: number;
  landSizeSqm?: number;
  features: string[];
  documentation: string;
  agentName: string;
  agentPhone: string;
  status: PropertyStatus;
  featured: boolean;
}

export const properties: Property[] = [
  {
    slug: "lekki-phase-1-4bed-duplex",
    title: "4-Bedroom Detached Duplex, Lekki Phase 1",
    description:
      "A fully finished 4-bedroom detached duplex with a boys' quarters, ensuite bedrooms and a private compound in a serene, gated close within Lekki Phase 1.",
    price: 185000000,
    priceUnit: "total",
    location: "Lekki Phase 1",
    state: "Lagos",
    city: "Lekki",
    areaSqm: 450,
    propertyType: "House",
    transactionType: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    landSizeSqm: 650,
    features: ["Boys' Quarters", "Fitted Kitchen", "24/7 Estate Security", "Parking for 4 Cars"],
    documentation: "Certificate of Occupancy (C of O)",
    agentName: "Chidera Okonkwo",
    agentPhone: "+234 000 000 0001",
    status: "Available",
    featured: true,
  },
  {
    slug: "ikeja-gra-office-suite",
    title: "Furnished Office Suite, Ikeja GRA",
    description:
      "A ready-to-move-in 220sqm office suite on the second floor of a modern commercial building, with dedicated parking and backup power.",
    price: 4500000,
    priceUnit: "per year",
    location: "Ikeja GRA",
    state: "Lagos",
    city: "Ikeja",
    areaSqm: 220,
    propertyType: "Office",
    transactionType: "For Rent",
    features: ["24/7 Power Backup", "Elevator Access", "Dedicated Parking", "Fibre Internet Ready"],
    documentation: "Deed of Sublease Available",
    agentName: "Tunde Bakare",
    agentPhone: "+234 000 000 0002",
    status: "Available",
    featured: true,
  },
  {
    slug: "epe-waterfront-land",
    title: "1,000 sqm Waterfront Land, Epe",
    description:
      "Dry, fenced waterfront land in a fast-appreciating corridor of Epe, suitable for a private residence or short-let development.",
    price: 28000000,
    priceUnit: "total",
    location: "Agemowo, Epe",
    state: "Lagos",
    city: "Epe",
    areaSqm: 1000,
    propertyType: "Land",
    transactionType: "For Sale",
    landSizeSqm: 1000,
    features: ["Waterfront", "Fenced & Gated", "Dry Land", "Good Road Access"],
    documentation: "Registered Survey & Deed of Assignment",
    agentName: "Chidera Okonkwo",
    agentPhone: "+234 000 000 0001",
    status: "Available",
    featured: true,
  },
  {
    slug: "victoria-island-2bed-apartment",
    title: "2-Bedroom Serviced Apartment, Victoria Island",
    description:
      "A serviced 2-bedroom apartment with a full-time concierge, gym and pool access, ideal for young professionals and short-let investors.",
    price: 6500000,
    priceUnit: "per year",
    location: "Victoria Island",
    state: "Lagos",
    city: "Victoria Island",
    areaSqm: 120,
    propertyType: "Apartment",
    transactionType: "For Rent",
    bedrooms: 2,
    bathrooms: 3,
    features: ["Concierge", "Gym & Pool Access", "Serviced", "Standby Generator"],
    documentation: "Tenancy Agreement",
    agentName: "Tunde Bakare",
    agentPhone: "+234 000 000 0002",
    status: "Reserved",
    featured: false,
  },
  {
    slug: "abuja-guzape-shop",
    title: "Retail Shop Space, Guzape District",
    description:
      "A 60sqm ground-floor retail shop on a busy commercial strip in Guzape, previously operated as a boutique showroom.",
    price: 2200000,
    priceUnit: "per year",
    location: "Guzape District",
    state: "FCT — Abuja",
    city: "Abuja",
    areaSqm: 60,
    propertyType: "Shop",
    transactionType: "For Rent",
    features: ["High Foot Traffic", "Street-Facing Frontage", "Shared Parking"],
    documentation: "Tenancy Agreement",
    agentName: "Amara Nwosu",
    agentPhone: "+234 000 000 0003",
    status: "Available",
    featured: false,
  },
  {
    slug: "ibeju-lekki-estate-plots",
    title: "Serviced Plots, Smilish Gardens Estate",
    description:
      "500sqm serviced plots inside a developing gated estate along the Lekki-Epe corridor, with allocation available on select rows.",
    price: 15000000,
    priceUnit: "total",
    location: "Smilish Gardens Estate",
    state: "Lagos",
    city: "Ibeju-Lekki",
    areaSqm: 500,
    propertyType: "Estate",
    transactionType: "Investment",
    landSizeSqm: 500,
    features: ["Gated Estate", "Perimeter Fencing", "Estate Road Network", "Flexible Payment Plan"],
    documentation: "Registered Survey — C of O in View",
    agentName: "Amara Nwosu",
    agentPhone: "+234 000 000 0003",
    status: "Available",
    featured: true,
  },
  {
    slug: "ajah-3bed-terrace",
    title: "3-Bedroom Terrace Duplex, Ajah",
    description:
      "A newly built 3-bedroom terrace duplex inside a serviced estate off the Lekki-Epe expressway, walking distance from the estate mall and school.",
    price: 78000000,
    priceUnit: "total",
    location: "Off Lekki-Epe Expressway",
    state: "Lagos",
    city: "Ajah",
    areaSqm: 220,
    propertyType: "House",
    transactionType: "For Sale",
    bedrooms: 3,
    bathrooms: 4,
    landSizeSqm: 300,
    features: ["Estate Mall Nearby", "Ensuite Bedrooms", "Fitted Kitchen", "24/7 Estate Security"],
    documentation: "Deed of Assignment — Governor's Consent in Progress",
    agentName: "Chidera Okonkwo",
    agentPhone: "+234 000 000 0001",
    status: "Available",
    featured: false,
  },
  {
    slug: "wuse-2-commercial-complex",
    title: "Commercial Complex Floor, Wuse 2",
    description:
      "A full 300sqm floor in a busy commercial complex, previously fitted as a bank branch — suitable for a showroom, clinic or corporate office.",
    price: 12000000,
    priceUnit: "per year",
    location: "Wuse 2",
    state: "FCT — Abuja",
    city: "Abuja",
    areaSqm: 300,
    propertyType: "Commercial",
    transactionType: "For Rent",
    features: ["Previously Fitted", "Standby Generator", "Ample Parking", "High Visibility Frontage"],
    documentation: "Tenancy Agreement",
    agentName: "Amara Nwosu",
    agentPhone: "+234 000 000 0003",
    status: "Available",
    featured: false,
  },
  {
    slug: "banana-island-luxury-penthouse",
    title: "Luxury Penthouse, Banana Island",
    description:
      "A five-bedroom penthouse with private pool and skyline views, fully finished with imported fittings throughout — one of a limited number in the building.",
    price: 950000000,
    priceUnit: "total",
    location: "Banana Island",
    state: "Lagos",
    city: "Ikoyi",
    areaSqm: 680,
    propertyType: "Apartment",
    transactionType: "For Sale",
    bedrooms: 5,
    bathrooms: 6,
    features: ["Private Pool", "Skyline Views", "Imported Fittings", "Private Elevator Access"],
    documentation: "Certificate of Occupancy (C of O)",
    agentName: "Tunde Bakare",
    agentPhone: "+234 000 000 0002",
    status: "Reserved",
    featured: true,
  },
];

export const featuredProperties = properties.filter((p) => p.featured);
export const propertyTypes = ["Land", "House", "Apartment", "Office", "Shop", "Commercial", "Estate"];
export const propertyStates = Array.from(new Set(properties.map((p) => p.state)));
