import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { InspectionRow } from "@/lib/supabase/types";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled", "Rescheduled"];
const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
  Rescheduled: "bg-purple-100 text-purple-700",
};

export default async function AdminInspectionsPage() {
  const supabase = await createClient();
  const { data: inspections, error } = await supabase
    .from("property_inspections")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy-deep">Inspections</h1>
      <p className="mt-1 text-sm text-navy/55">Property inspection requests from the public site.</p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Couldn&apos;t load inspections: {error.message}
        </p>
      )}

      {!error && (!inspections || inspections.length === 0) && (
        <p className="mt-10 text-sm text-navy/50">No inspection requests yet.</p>
      )}

      {inspections && inspections.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-mist text-xs uppercase tracking-wide text-navy/50">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Property</th>
                <th className="px-5 py-3 font-medium">Requested Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(inspections as InspectionRow[]).map((i) => (
                <tr key={i.id} className="border-b border-line align-top last:border-0 hover:bg-mist/60">
                  <td className="px-5 py-3">
                    <p className="font-medium text-navy-deep">{i.customer_name}</p>
                    <p className="text-xs text-navy/50">
                      {i.phone} {i.email && `· ${i.email}`}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-navy/60">{i.property_title ?? "—"}</td>
                  <td className="px-5 py-3 text-navy/60">
                    {i.inspection_date
                      ? new Date(i.inspection_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
                      : "—"}{" "}
                    {i.inspection_time ?? ""}
                  </td>
                  <td className="px-5 py-3">
                    <StatusSelect
                      table="property_inspections"
                      id={i.id}
                      value={i.status}
                      options={STATUSES}
                      colorMap={statusColors}
                    />
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
