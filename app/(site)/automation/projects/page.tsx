import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { getAutomationProjects } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Automation Projects",
  description: "Case studies of AI automation systems built and deployed by Smilish AI Automation.",
};

export default async function AutomationProjectsPage() {
  const automationProjects = await getAutomationProjects();

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Smilish AI Automation</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">
        Case Studies
      </h1>

      {automationProjects.length === 0 && (
        <p className="mt-12 text-sm text-navy/50">No case studies published yet — check back soon.</p>
      )}

      <div className="mt-12 divide-y divide-line border-t border-line">
        {automationProjects.map((p) => (
          <article key={p.slug} id={p.slug} className="scroll-mt-24 py-12">
            <div className="flex flex-wrap items-center gap-3">
              {p.client_business && (
                <span className="rounded-full border border-navy/25 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-navy">
                  {p.client_business}
                </span>
              )}
              {p.project_date && (
                <span className="font-mono text-xs text-navy/40">
                  {new Date(p.project_date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              )}
            </div>
            <h2 className="mt-4 font-display text-2xl font-medium text-navy-deep">{p.title}</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Problem</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{p.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Solution</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{p.solution}</p>
              </div>
            </div>

            {p.workflow_tools.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">
                  Tools Used
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.workflow_tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-mist px-3 py-1 font-mono text-[11px] text-navy/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {p.results.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Results</p>
                <ul className="mt-2 space-y-1.5">
                  {p.results.map((r) => (
                    <li key={r} className="text-sm text-navy-deep">
                      — {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
