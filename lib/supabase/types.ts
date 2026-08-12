export type ProductStatus = "Draft" | "Published" | "Out of Stock" | "Archived";

export interface FashionProductRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discount: number | null;
  category: string | null;
  fabric: string | null;
  sizes: string[];
  colors: string[];
  stock_quantity: number;
  sku: string | null;
  main_image: string | null;
  gallery_images: string[];
  featured: boolean;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export type FashionProductInput = Omit<FashionProductRow, "id" | "created_at" | "updated_at">;

export type ContentStatus = "Draft" | "Published" | "Archived";

export interface FashionProjectRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  client_name: string | null;
  images: string[];
  project_date: string | null;
  featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}
export type FashionProjectInput = Omit<FashionProjectRow, "id" | "created_at" | "updated_at">;

export type PricingType = "Custom Quote" | "Monthly Retainer" | "One-Time Build";

export interface AutomationServiceRow {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  description: string | null;
  features: string[];
  industries: string[];
  pricing_type: PricingType | null;
  images: string[];
  case_study: string | null;
  featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}
export type AutomationServiceInput = Omit<AutomationServiceRow, "id" | "created_at" | "updated_at">;

export interface AutomationProjectRow {
  id: string;
  title: string;
  slug: string;
  client_business: string | null;
  problem: string | null;
  solution: string | null;
  workflow_tools: string[];
  results: string[];
  screenshots: string[];
  video_url: string | null;
  project_date: string | null;
  featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}
export type AutomationProjectInput = Omit<AutomationProjectRow, "id" | "created_at" | "updated_at">;

export type PropertyType = "Land" | "House" | "Apartment" | "Office" | "Shop" | "Commercial" | "Estate";
export type TransactionType = "For Sale" | "For Rent" | "Lease" | "Investment";
export type PropertyStatus = "Available" | "Reserved" | "Sold" | "Rented" | "Unavailable";

export interface PropertyRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  price_unit: "total" | "per year" | "per month";
  location: string | null;
  state: string | null;
  city: string | null;
  area_sqm: number | null;
  property_type: PropertyType | null;
  transaction_type: TransactionType | null;
  bedrooms: number | null;
  bathrooms: number | null;
  land_size_sqm: number | null;
  features: string[];
  property_images: string[];
  floor_plan: string | null;
  video_url: string | null;
  latitude: number | null;
  longitude: number | null;
  documentation_status: string | null;
  agent_name: string | null;
  agent_phone: string | null;
  status: PropertyStatus;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}
export type PropertyInput = Omit<PropertyRow, "id" | "created_at" | "updated_at">;

export type InspectionStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rescheduled";

export interface InspectionRow {
  id: string;
  customer_name: string;
  phone: string | null;
  email: string | null;
  property_id: string | null;
  property_title: string | null;
  inspection_date: string | null;
  inspection_time: string | null;
  status: InspectionStatus;
  message: string | null;
  created_at: string;
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Converted" | "Lost" | "Archived";

export interface LeadRow {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  branch: string | null;
  service: string | null;
  source: string | null;
  status: LeadStatus;
  details: Record<string, unknown>;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface MediaRow {
  id: string;
  file_path: string;
  file_name: string;
  alt_text: string | null;
  description: string | null;
  created_at: string;
}
