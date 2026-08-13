// Smilish Fashion — Custom Design Order Form
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { toast } from "sonner";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

const OUTFIT_TYPES = ["Agbada", "Senator Wear", "Native Shirt", "Kaftan", "T-Shirt", "Hoodie", "Joggers", "Sweatshirt", "Jacket", "Cap", "Corporate Shirt", "Staff Uniform", "Custom Outfit"];
const FABRIC_OPTIONS = ["Aso-oke", "Ankara", "Lace", "Cotton", "Polyester", "Denim", "Silk", "Wool", "Other"];

export default function FashionCustom() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", outfitType: "", fabric: "", color: "",
    measurements: "", preferredStyle: "", deadline: "", instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Custom order submitted! We'll contact you within 24 hours to discuss your design.");
    setForm({ name: "", phone: "", email: "", outfitType: "", fabric: "", color: "", measurements: "", preferredStyle: "", deadline: "", instructions: "" });
  };

  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <Link href="/fashion" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] text-sm font-body mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Fashion
          </Link>
          <SectionLabel>Custom Design</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            Your Vision. <span className="text-[#D4AF37]">Our Craft.</span>
          </h1>
          <p className="text-white/60 font-body max-w-xl">Tell us exactly what you want and we'll create it for you — from fabric selection to final fitting.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F8FA]">
        <div className="container max-w-3xl">
          <div className="bg-white border border-gray-100 rounded-sm p-8 lg:p-12 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-2">Custom Order Form</h2>
            <p className="text-gray-500 text-sm mb-8 font-body">Fill in as much detail as possible. We'll reach out to confirm and discuss your design.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+234 000 000 0000" className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Outfit Type *</label>
                  <select name="outfitType" value={form.outfitType} onChange={handleChange} required className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors bg-white">
                    <option value="">Select outfit type</option>
                    {OUTFIT_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Fabric Preference</label>
                  <select name="fabric" value={form.fabric} onChange={handleChange} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors bg-white">
                    <option value="">Select fabric</option>
                    {FABRIC_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Colour Preference</label>
                  <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="e.g. Navy blue, Gold, White" className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Deadline</label>
                  <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Measurements</label>
                <textarea name="measurements" value={form.measurements} onChange={handleChange} rows={3} placeholder="Chest, waist, hip, height, sleeve length, etc." className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors resize-none" />
              </div>
              <div>
                <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Preferred Style</label>
                <input type="text" name="preferredStyle" value={form.preferredStyle} onChange={handleChange} placeholder="Describe the style or reference a look" className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors" />
              </div>
              <div>
                <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Additional Instructions</label>
                <textarea name="instructions" value={form.instructions} onChange={handleChange} rows={4} placeholder="Any other details, special requirements or questions..." className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={submitting} className="btn-gold rounded-sm w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70">
                {submitting ? "Submitting..." : <><Send size={16} /> Submit Custom Order</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

