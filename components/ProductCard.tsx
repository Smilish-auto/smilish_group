import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FashionProductRow } from "@/lib/supabase/types";
import { formatNaira } from "@/lib/format";
import { PlaceholderArt } from "./PlaceholderArt";

export function ProductCard({ product }: { product: FashionProductRow }) {
  const outOfStock = product.status === "Out of Stock";
  return (
    <Link
      href={`/fashion/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_24px_50px_-25px_rgba(11,31,58,0.4)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <PlaceholderArt variant="fashion" label={product.name} className="h-full w-full" />
        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            Out of Stock
          </span>
        )}
        {!outOfStock && product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-navy-deep">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy/45">
          {product.category}
        </p>
        <h3 className="mt-1.5 flex items-start justify-between gap-2 font-display text-lg font-medium text-navy-deep">
          {product.name}
          <ArrowUpRight
            size={16}
            className="mt-1.5 shrink-0 text-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
          />
        </h3>
        <p className="mt-2 font-mono text-sm text-navy">{formatNaira(product.price)}</p>
      </div>
    </Link>
  );
}
