import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type ProjectBranch } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore recent projects across Smilish Fashion, AI Automation and Real Estate.",
};

const filters: ("All" | ProjectBranch)[] = ["All", "Fashion", "AI Automation", "Real Estate"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const { branch } = await searchParams;
  const active = branch ?? "All";
  const filtered = active === "All" ? projects : projects.filter((p) => p.branch === active);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Our Work</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">Projects</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-navy/60">
        A running record of what we&apos;ve built and delivered across all three Smilish businesses.
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === "All" ? "/projects" : `/projects?branch=${encodeURIComponent(f)}`}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
              active === f ? "border-navy bg-navy text-white" : "border-line text-navy/60 hover:border-navy"
            }`}
          >
            {f}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={`${p.branch}-${p.slug}`} project={p} />
        ))}
      </div>
    </section>
  );
}
