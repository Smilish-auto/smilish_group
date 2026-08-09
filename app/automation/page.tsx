import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Headset,
  Target,
  Mail,
  CalendarClock,
  Workflow,
  BookOpen,
  Bot,
  Bell,
  UtensilsCrossed,
  Store,
  Building2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { GlossyBackdrop } from "@/components/GlossyBackdrop";
import { AutomationAuditForm } from "@/components/form/AutomationAuditForm";
import { CTA } from "@/components/CTA";
import { featuredAutomationServices } from "@/lib/data/automation";
import { automationProjects } from "@/lib/data/automation";

export const metadata: Metadata = {
  title: "Smilish AI Automation",
  description:
    "AI customer service, lead generation, booking automation and business workflow automation that helps businesses save time and scale.",
};

const whatWeAutomate = [
  { icon: Headset, label: "AI Customer Service" },
  { icon: Target, label: "Lead Generation & Qualification" },
  { icon: Mail, label: "Email Automation" },
  { icon: CalendarClock, label: "Booking Automation" },
  { icon: Workflow, label: "Business Workflow Automation" },
  { icon: BookOpen, label: "AI Knowledge Bases" },
  { icon: Bot, label: "AI Website Agents" },
  { icon: Bell, label: "CRM & Notification Workflows" },
];

const howItWorks = [
  { step: "01", title: "Audit", detail: "We map your current process and find where time is actually being lost." },
  { step: "02", title: "Build", detail: "We design and build the automation or AI agent around your specific workflow." },
  { step: "03", title: "Deploy", detail: "We connect it to your existing tools and go live with your team." },
  { step: "04", title: "Optimize", detail: "We monitor performance and refine the system as your business changes." },
];

const whoWeHelp = [
  { icon: UtensilsCrossed, label: "Food & Restaurants" },
  { icon: Store, label: "Retail & E-commerce" },
  { icon: Building2, label: "Real Estate" },
  { icon: Briefcase, label: "B2B Services" },
];

export default function AutomationHubPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep">
        <GlossyBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow tone="light">Smilish AI Automation</Eyebrow>
          <h1 className="text-balance mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-6xl">
            Give your business back its <span className="italic text-gold-soft">time</span>.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            We design and build AI customer service, lead qualification and workflow automation
            systems that handle the repetitive work — so your team can focus on what needs a human.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#audit" variant="gold">
              Request a Free Audit
            </Button>
            <Button href="/automation/services" variant="ghost-light">
              See Automation Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* What We Automate */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="What We Automate" title="If it's repetitive, it can probably be automated" />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {whatWeAutomate.map((item) => (
            <div key={item.label} className="rounded-2xl border border-line p-5">
              <item.icon size={20} className="text-navy" />
              <p className="mt-4 text-sm font-medium leading-snug text-navy-deep">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="How It Works" title="From audit to a live system, in four steps" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <div key={s.step}>
                <p className="font-mono text-sm text-navy/40">{s.step}</p>
                <p className="mt-3 font-display text-xl font-medium text-navy-deep">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Solutions */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Automation Solutions" title="Ready-to-deploy AI products" tone="light" />
            <Link
              href="/automation/services"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-white hover:text-gold-soft"
            >
              View all services <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAutomationServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Who We Help" title="Built for businesses with real customer volume" />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {whoWeHelp.map((w) => (
            <div key={w.label} className="rounded-2xl bg-mist p-6 text-center">
              <w.icon size={22} className="mx-auto text-navy" />
              <p className="mt-3 text-sm font-medium text-navy-deep">{w.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Case Studies" title="Systems we've built and shipped" />
            <Link
              href="/automation/projects"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
            >
              View all projects <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {automationProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/automation/projects#${p.slug}`}
                className="group rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(11,31,58,0.35)]"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">
                  {p.clientBusiness}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium text-navy-deep">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/60">{p.problem}</p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-navy">
                  Read the full case study
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <section id="audit" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Free Automation Audit"
            title="Tell us where the time is going"
            description="Answer a few questions about your business and we'll follow up with a short, honest audit of what's worth automating first."
          />
          <div className="rounded-2xl border border-line bg-mist p-6 sm:p-10">
            <AutomationAuditForm />
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Work With Smilish AI Automation"
        title="Let's find the hours hiding in your workflow."
        primaryLabel="Request a Free Audit"
        primaryHref="#audit"
      />
    </>
  );
}
