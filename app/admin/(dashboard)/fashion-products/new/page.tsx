import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/fashion-products"
        className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy"
      >
        <ChevronLeft size={16} /> Back to Products
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">New Product</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
