// Smilish AI Automation — Automation Audit Form
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

const INDUSTRIES = ["E-Commerce", "Real Estate", "Healthcare", "Finance", "Hospitality", "Education", "Retail", "Professional Services", "Manufacturing", "Other"];
const BUSINESS_SIZES = ["1-5 employees", "6-20 employees", "21-50 employees", "51-100 employees", "100+ employees"];

export default function AutomationAudit() {
  const [form, setForm] = useState({
    name: "", company: "", industry: "", phone: "", email: "",
    businessSize: "", currentTools: "", biggestProblem: "",
    repetitiveTasks: "", customerSupportProcess: "", additionalInfo: "",
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
    toast.success("Audit request submitted! We'll contact you within 24 hours to schedule your free automation audit.");
    setForm({ name: "", company: "", industry: "", phone: "", email: "", businessSize: "", currentTools: "", biggestProblem: "", repetitiveTasks: "", customerSupportProcess: "", additionalInfo: "" });
  };

  const inputCls = "w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors";
  const labelCls = "block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2";

  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <Link href="/automation" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] text-sm font-body mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to AI Automation
          </Link>
          <SectionLabel>Free Automation Audit</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            Discover Your <span className="text-[#D4AF37]">Automation Potential</span>
          </h1>
          <p className="text-white/60 font-body max-w-xl">Tell us about your business and we'll identify exactly which workflows we can automate — and what the impact would be.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F8FA]">
        <div className="container max-w-3xl">
          <div className="bg-white border border-gray-100 rounded-sm p-8 lg:p-12 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-2">Automation Audit Form</h2>
            <p className="text-gray-500 text-sm mb-8 font-body">This takes about 5 minutes. The more detail you provide, the more valuable your audit will be.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className={labelCls}>Your Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className={inputCls} /></div>
                <div><label className={labelCls}>Company Name *</label><input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Your company" className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Industry *</label>
                  <select name="industry" value={form.industry} onChange={handleChange} required className={`${inputCls} bg-white`}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Business Size</label>
                  <select name="businessSize" value={form.businessSize} onChange={handleChange} className={`${inputCls} bg-white`}>
                    <option value="">Select size</option>
                    {BUSINESS_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className={labelCls}>Phone Number *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+234 000 000 0000" className={inputCls} /></div>
                <div><label className={labelCls}>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>Current Tools & Software</label><input type="text" name="currentTools" value={form.currentTools} onChange={handleChange} placeholder="e.g. WhatsApp, Excel, Google Sheets, CRM name..." className={inputCls} /></div>
              <div><label className={labelCls}>Biggest Business Problem *</label><textarea name="biggestProblem" value={form.biggestProblem} onChange={handleChange} required rows={3} placeholder="What is the biggest operational challenge your business faces right now?" className={`${inputCls} resize-none`} /></div>
              <div><label className={labelCls}>Most Repetitive Tasks</label><textarea name="repetitiveTasks" value={form.repetitiveTasks} onChange={handleChange} rows={3} placeholder="List the tasks your team does repeatedly every day or week..." className={`${inputCls} resize-none`} /></div>
              <div><label className={labelCls}>Customer Support Process</label><textarea name="customerSupportProcess" value={form.customerSupportProcess} onChange={handleChange} rows={3} placeholder="How do you currently handle customer inquiries and support?" className={`${inputCls} resize-none`} /></div>
              <div><label className={labelCls}>Additional Information</label><textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} rows={3} placeholder="Anything else you'd like us to know..." className={`${inputCls} resize-none`} /></div>
              <button type="submit" disabled={submitting} className="btn-gold rounded-sm w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70">
                {submitting ? "Submitting..." : <><Send size={16} /> Submit Audit Request</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
