import { fashionProjects } from "./fashion";
import { automationProjects } from "./automation";

export type ProjectBranch = "Fashion" | "AI Automation" | "Real Estate";

export interface UnifiedProject {
  slug: string;
  branch: ProjectBranch;
  title: string;
  summary: string;
  client?: string;
  date: string;
  featured: boolean;
  href: string;
}

const realEstateProjects: UnifiedProject[] = [
  {
    slug: "smilish-gardens-estate-launch",
    branch: "Real Estate",
    title: "Smilish Gardens Estate — Phase 1 Launch",
    summary:
      "Marketing, plot allocation and inspection coordination for the first phase of a 40-plot gated estate along the Lekki-Epe corridor.",
    date: "2025-08-15",
    featured: true,
    href: "/project/smilish-gardens-estate-launch",
  },
  {
    slug: "victoria-island-portfolio",
    branch: "Real Estate",
    title: "Victoria Island Rental Portfolio",
    summary:
      "Ongoing marketing and tenant placement for a portfolio of serviced apartments across Victoria Island.",
    date: "2025-05-10",
    featured: false,
    href: "/project/victoria-island-portfolio",
  },
];

export const projects: UnifiedProject[] = [
  ...fashionProjects.map((p) => ({
    slug: p.slug,
    branch: "Fashion" as const,
    title: p.title,
    summary: p.description,
    client: p.clientName,
    date: p.date,
    featured: p.featured,
    href: `/project/${p.slug}`,
  })),
  ...automationProjects.map((p) => ({
    slug: p.slug,
    branch: "AI Automation" as const,
    title: p.title,
    summary: p.solution,
    client: p.clientBusiness,
    date: p.date,
    featured: p.featured,
    href: `/project/${p.slug}`,
  })),
  ...realEstateProjects,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
