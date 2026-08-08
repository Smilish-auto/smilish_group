// Smilish Real Estate — Book Inspection Form
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { PROPERTIES } from "@/lib/data";
import { toast } from "sonner";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function RealEstateInspection() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", property: "", date: "", time: "", message: "",
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
    toast.success("Inspection request submitted! Our agent will confirm your appointment within 24 hours.");
    setForm({ name: "", phone: "", email: "", property: "", date: "", time: "", message: "" });
  };

  const inputCls = "w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors";
  const labelCls = "block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2";

  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <Link href="/real-estate" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] text-sm font-body mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Real Estate
          </Link>
          <SectionLabel>Property Inspection</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            Book an <span className="text-[#D4AF37]">Inspection</span>
          </h1>
          <p className="text-white/60 font-body max-w-xl">Schedule a property inspection at your preferred date and time. Our agent will confirm within 24 hours.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F8FA]">
        <div className="container max-w-2xl">
          <div className="bg-white border border-gray-100 rounded-sm p-8 lg:p-12 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-2">Inspection Request</h2>
            <p className="text-gray-500 text-sm mb-8 font-body">Fill in your details and we'll arrange the inspection.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className={labelCls}>Full Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputCls} /></div>
                <div><label className={labelCls}>Phone Number *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+234 000 000 0000" className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputCls} /></div>
              <div>
                <label className={labelCls}>Property</label>
                <select name="property" value={form.property} onChange={handleChange} className={`${inputCls} bg-white`}>
                  <option value="">Select a property (optional)</option>
                  {PROPERTIES.map((p) => <option key={p.id} value={p.title}>{p.title} — {p.location}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className={labelCls}>Preferred Date *</label><input type="date" name="date" value={form.date} onChange={handleChange} required className={inputCls} /></div>
                <div>
                  <label className={labelCls}>Preferred Time</label>
                  <select name="time" value={form.time} onChange={handleChange} className={`${inputCls} bg-white`}>
                    <option value="">Select time</option>
                    {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div><label className={labelCls}>Additional Message</label><textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Any specific requirements or questions about the property..." className={`${inputCls} resize-none`} /></div>
              <button type="submit" disabled={submitting} className="btn-gold rounded-sm w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70">
                {submitting ? "Submitting..." : <><Send size={16} /> Book Inspection</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

