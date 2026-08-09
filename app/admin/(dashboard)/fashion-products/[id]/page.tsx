import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("fashion_products").select("*").eq("id", id).single();

  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/fashion-products"
        className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy"
      >
        <ChevronLeft size={16} /> Back to Products
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">Edit Product</h1>
      <div className="mt-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
