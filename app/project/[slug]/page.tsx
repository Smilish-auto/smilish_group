import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import { CTA } from "@/components/CTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const branchStyles: Record<string, string> = {
  Fashion: "text-gold border-gold/30",
  "AI Automation": "text-navy border-navy/25",
  "Real Estate": "text-ink border-ink/20",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const branchHref =
    project.branch === "Fashion"
      ? "/fashion/projects"
      : project.branch === "AI Automation"
        ? "/automation/projects"
        : "/real-estate/properties";

  return (
    <>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href="/projects"
          className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy"
        >
          <ChevronLeft size={16} /> Back to Projects
        </Link>

        <span
          className={`mt-8 inline-block rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${branchStyles[project.branch]}`}
        >
          {project.branch}
        </span>
        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-navy-deep sm:text-4xl">
          {project.title}
        </h1>
        {project.client && (
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-navy/40">
            {project.client}
          </p>
        )}
        <p className="mt-6 text-base leading-relaxed text-navy/65">{project.summary}</p>

        <Link
          href={branchHref}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold"
        >
          See more {project.branch} work →
        </Link>
      </section>

      <CTA
        title="Have a similar project in mind?"
        description="Tell us what you're trying to build and the right Smilish team will follow up."
      />
    </>
  );
}
