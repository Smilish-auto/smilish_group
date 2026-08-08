import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, AtSign, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/SectionHeading";
import { ContactForm } from "@/components/form/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Smilish Group about Fashion, AI Automation or Real Estate.",
};

const details = [
  { icon: Phone, label: "Phone", value: "+234 000 000 0000" },
  { icon: Mail, label: "Email", value: "hello@smilishgroup.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us" },
  { icon: AtSign, label: "Instagram", value: "smilishgroup" },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-balance mt-5 font-display text-4xl font-medium leading-[1.1] text-navy-deep sm:text-5xl">
            Let&apos;s build something valuable together.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/60">
            Whether it&apos;s a tailored outfit, an AI system for your business, or your next
            property move — reach out and the right team will follow up.
          </p>

          <ul className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-navy">
                  <d.icon size={18} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-navy/45">
                    {d.label}
                  </p>
                  <p className="text-sm font-medium text-navy-deep">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
