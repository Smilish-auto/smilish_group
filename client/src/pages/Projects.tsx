// Smilish Group — Projects Page with filter tabs
import { useState } from "react";
import { Link } from "wouter";
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { PROJECTS } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

const FILTERS = [
  { value: "all", label: "All Projects" },
  { value: "fashion", label: "Fashion" },
  { value: "ai", label: "AI Automation" },
  { value: "realestate", label: "Real Estate" },
];

const CATEGORY_LABELS: Record<string, string> = {
  fashion: "Fashion",
  ai: "AI Automation",
  realestate: "Real Estate",
};

const CATEGORY_LINKS: Record<string, string> = {
  fashion: "/fashion",
  ai: "/automation",
  realestate: "/real-estate",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const headerRef = useFadeUp();

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <SectionLabel>Our Work</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            Projects That <span className="text-[#D4AF37]">Speak</span>
          </h1>
          <p className="text-white/60 font-body max-w-xl">
            A selection of our work across fashion, AI automation and real estate.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F7F8FA]">
        <div className="container">
          {/* Filter Tabs */}
          <div ref={headerRef} className="fade-up flex gap-2 flex-wrap mb-12">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 text-xs font-mono-accent tracking-widest uppercase rounded-sm border transition-all ${
                  activeFilter === filter.value
                    ? "bg-[#D4AF37] text-[#061426] border-[#D4AF37]"
                    : "bg-white text-[#0B1F3A] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-xl text-[#0B1F3A] mb-2">No projects found</p>
              <p className="text-gray-500 text-sm font-body">Try a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-2.5 py-1 font-mono-accent tracking-wide">
                        {CATEGORY_LABELS[project.category]}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#0B1F3A] text-white text-xs font-semibold px-2.5 py-1 font-mono-accent tracking-wide">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-2 leading-snug">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 font-body line-clamp-3">{project.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-body">
                        <Calendar size={12} />
                        {new Date(project.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                      </div>
                      <Link
                        href={CATEGORY_LINKS[project.category]}
                        className="text-[#D4AF37] font-semibold text-xs font-body hover:underline"
                      >
                        View Branch →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
