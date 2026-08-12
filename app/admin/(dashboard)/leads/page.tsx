import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { LeadRow } from "@/lib/supabase/types";

const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Converted", "Lost", "Archived"];
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-purple-100 text-purple-700",
  Proposal: "bg-indigo-100 text-indigo-700",
  Converted: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-600",
  Archived: "bg-navy/10 text-navy/50",
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy-deep">Leads</h1>
      <p className="mt-1 text-sm text-navy/55">
        Everyone who has submitted the Contact, Custom Design, or Automation Audit forms.
      </p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Couldn&apos;t load leads: {error.message}
        </p>
      )}

      {!error && (!leads || leads.length === 0) && (
        <p className="mt-10 text-sm text-navy/50">No leads yet — they&apos;ll show up here once someone fills a form.</p>
      )}

      {leads && leads.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-mist text-xs uppercase tracking-wide text-navy/50">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Branch</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {(leads as LeadRow[]).map((l) => (
                <tr key={l.id} className="border-b border-line align-top last:border-0 hover:bg-mist/60">
                  <td className="px-5 py-3 font-medium text-navy-deep">{l.name}</td>
                  <td className="px-5 py-3 text-navy/60">
                    <div>{l.phone}</div>
                    <div>{l.email}</div>
                  </td>
                  <td className="px-5 py-3 text-navy/60">{l.branch ?? "—"}</td>
                  <td className="px-5 py-3 text-navy/60">{l.source ?? "—"}</td>
                  <td className="px-5 py-3">
                    <StatusSelect table="leads" id={l.id} value={l.status} options={STATUSES} colorMap={statusColors} />
                  </td>
                  <td className="px-5 py-3 text-navy/50">
                    {new Date(l.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
