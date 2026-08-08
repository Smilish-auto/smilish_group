// Smilish Fashion — Product Detail Page
import { Link, useParams } from "wouter";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { FASHION_PRODUCTS, BRAND } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function FashionProduct() {
  const { slug } = useParams<{ slug: string }>();
  const product = FASHION_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-[#0B1F3A] mb-4">Product Not Found</h1>
            <Link href="/fashion/products" className="btn-gold rounded-sm px-6 py-3">Back to Products</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const related = FASHION_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <Layout>
      <div className="bg-[#F7F8FA] pt-24 lg:pt-28 pb-16">
        <div className="container">
          <Link href="/fashion/products" className="inline-flex items-center gap-2 text-[#0B1F3A]/60 hover:text-[#D4AF37] text-sm font-body mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="rounded-sm overflow-hidden aspect-[4/3]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Details */}
            <div>
              <SectionLabel>{product.category}</SectionLabel>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-3">{product.name}</h1>
              <div className="font-display text-3xl font-bold text-[#D4AF37] mb-6">₦{product.price.toLocaleString()}</div>
              <p className="text-gray-600 leading-relaxed font-body mb-8">{product.description}</p>
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <span className="font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase w-20 shrink-0 pt-0.5">Category</span>
                  <span className="text-gray-600 text-sm font-body">{product.category}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase w-20 shrink-0 pt-0.5">Status</span>
                  <span className="text-green-600 text-sm font-semibold font-body capitalize">{product.status}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=Hi, I'm interested in the ${product.name} (₦${product.price.toLocaleString()})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-sm py-4 flex items-center justify-center gap-2 flex-1"
                >
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
                <a href={`tel:${BRAND.phone}`} className="btn-navy rounded-sm py-4 flex items-center justify-center gap-2 flex-1">
                  <Phone size={18} /> Call to Order
                </a>
              </div>
              <p className="text-gray-400 text-xs font-body mt-4 text-center">
                Custom sizing available. Contact us for measurements and delivery timeline.
              </p>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <div key={p.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden">
                    <div className="relative overflow-hidden h-48">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-1">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-[#D4AF37]">₦{p.price.toLocaleString()}</span>
                        <Link href={`/fashion/product/${p.slug}`} className="text-[#0B1F3A] hover:text-[#D4AF37] text-sm font-semibold transition-colors font-body">View →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
