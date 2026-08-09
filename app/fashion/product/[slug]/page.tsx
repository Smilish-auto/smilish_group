import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { fashionProducts } from "@/lib/data/fashion";
import { formatNaira } from "@/lib/format";
import { CTA } from "@/components/CTA";

export function generateStaticParams() {
  return fashionProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = fashionProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function FashionProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = fashionProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const outOfStock = product.status === "Out of Stock";

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/fashion/products"
          className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy"
        >
          <ChevronLeft size={16} /> Back to Products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-2xl">
            <PlaceholderArt variant="fashion" label={product.name} className="h-full w-full" patternSize="18px 18px" />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-navy/45">
              {product.category} · {product.sku}
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-navy-deep sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 font-mono text-2xl text-navy">{formatNaira(product.price)}</p>
            <p className="mt-6 text-base leading-relaxed text-navy/65">{product.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Fabric</dt>
                <dd className="mt-1 text-sm text-navy-deep">{product.fabric}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Colors</dt>
                <dd className="mt-1 text-sm text-navy-deep">{product.colors.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Sizes</dt>
                <dd className="mt-1 text-sm text-navy-deep">{product.sizes.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Availability</dt>
                <dd className="mt-1 text-sm text-navy-deep">
                  {outOfStock ? "Out of Stock" : `${product.stock} in stock`}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/fashion#custom-design" variant="navy">
                {outOfStock ? "Request When Back in Stock" : "Order This Piece"}
              </Button>
              <Button href="/contact" variant="ghost-dark">
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Smilish Fashion"
        title="Want this tailored to your exact measurements?"
        description="Every piece can be adjusted to fit — submit a custom design request and our team will confirm details with you."
        primaryHref="/fashion#custom-design"
        primaryLabel="Start a Custom Design"
      />
    </>
  );
}
