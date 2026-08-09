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
