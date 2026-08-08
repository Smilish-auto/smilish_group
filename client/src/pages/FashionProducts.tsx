// Smilish Fashion — All Products Page
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { FASHION_PRODUCTS } from "@/lib/data";

const CATEGORIES = ["All", "African Wear", "Streetwear", "Corporate Wear"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function FashionProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? FASHION_PRODUCTS
    : FASHION_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <SectionLabel>Smilish Fashion</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">All Products</h1>
          <p className="text-white/60 font-body max-w-xl">Browse our full collection of African wear, streetwear, corporate attire and custom outfits.</p>
        </div>
      </section>
      <section className="py-16 lg:py-20 bg-[#F7F8FA]">
        <div className="container">
          <div className="flex gap-2 flex-wrap mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono-accent tracking-widest uppercase rounded-sm border transition-all ${
                  activeCategory === cat
                    ? "bg-[#D4AF37] text-[#061426] border-[#D4AF37]"
                    : "bg-white text-[#0B1F3A] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden">
                <div className="relative overflow-hidden h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-2.5 py-1 font-mono-accent tracking-wide">{product.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 font-body line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-[#D4AF37] text-xl">₦{product.price.toLocaleString()}</span>
                    <Link href={`/fashion/product/${product.slug}`} className="text-[#0B1F3A] hover:text-[#D4AF37] text-sm font-semibold transition-colors font-body">View →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
