import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AutomationService } from "@/lib/data/automation";

export function ServiceCard({ service }: { service: AutomationService }) {
  return (
    <Link
      href={`/automation/service/${service.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-navy p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_50px_-25px_rgba(0,0,0,0.6)]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold-soft">
            {service.pricingType}
          </p>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
          />
        </div>
        <h3 className="mt-3 font-display text-xl font-medium text-white">{service.name}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/60">{service.summary}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {service.industries.slice(0, 2).map((ind) => (
          <span
            key={ind}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-white/50"
          >
            {ind}
          </span>
        ))}
      </div>
    </Link>
  );
}
