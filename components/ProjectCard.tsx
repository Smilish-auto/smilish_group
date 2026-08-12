import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { UnifiedProject } from "@/lib/supabase/queries";

const branchStyles: Record<UnifiedProject["branch"], string> = {
  Fashion: "text-gold border-gold/30",
  "AI Automation": "text-navy border-navy/25",
  "Real Estate": "text-ink border-ink/20",
};

export function ProjectCard({ project }: { project: UnifiedProject }) {
  return (
    <Link
      href={project.href}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(11,31,58,0.4)]"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${branchStyles[project.branch]}`}
          >
            {project.branch}
          </span>
          <ArrowUpRight
            size={16}
            className="text-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
          />
        </div>
        <h3 className="mt-4 font-display text-lg font-medium leading-snug text-navy-deep">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/60">{project.summary}</p>
      </div>
      {project.client && (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-navy/40">
          {project.client}
        </p>
      )}
    </Link>
  );
}
