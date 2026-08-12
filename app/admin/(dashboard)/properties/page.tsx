import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/lib/format";
import type { PropertyRow } from "@/lib/supabase/types";

const statusStyles: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  Reserved: "bg-amber-100 text-amber-700",
  Sold: "bg-navy/10 text-navy/60",
  Rented: "bg-navy/10 text-navy/60",
  Unavailable: "bg-red-100 text-red-600",
};

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-navy-deep">Properties</h1>
          <p className="mt-1 text-sm text-navy/55">Everything shown on /real-estate.</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep"
        >
          <Plus size={15} /> New Property
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Couldn&apos;t load properties: {error.message}
        </p>
      )}

      {!error && (!properties || properties.length === 0) && (
        <p className="mt-10 text-sm text-navy/50">No properties yet — add your first one.</p>
      )}

      {properties && properties.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-mist text-xs uppercase tracking-wide text-navy/50">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Published</th>
              </tr>
            </thead>
            <tbody>
              {(properties as PropertyRow[]).map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-mist/60">
                  <td className="px-5 py-3">
                    <Link href={`/admin/properties/${p.id}`} className="font-medium text-navy-deep hover:text-gold">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-navy/60">{p.location ?? "—"}</td>
                  <td className="px-5 py-3 font-mono text-navy/70">{formatNaira(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-navy/60">{p.published ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
