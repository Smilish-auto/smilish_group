import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { fashionCategories, fashionProducts } from "@/lib/data/fashion";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Smilish Fashion products — Agbada, Senator wear, native shirts, streetwear and more.",
};

export default async function FashionProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category
    ? fashionProducts.filter((p) => p.category === category)
    : fashionProducts;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Smilish Fashion</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">
        Products
      </h1>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <Link
          href="/fashion/products"
          className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
            !category ? "border-navy bg-navy text-white" : "border-line text-navy/60 hover:border-navy"
          }`}
        >
          All
        </Link>
        {fashionCategories.map((c) => (
          <Link
            key={c}
            href={`/fashion/products?category=${encodeURIComponent(c)}`}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
              category === c ? "border-navy bg-navy text-white" : "border-line text-navy/60 hover:border-navy"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-navy/50">
          No products in this category yet — check back soon or explore another category.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
