import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/components/admin/PropertyForm";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: property } = await supabase.from("properties").select("*").eq("id", id).single();

  if (!property) notFound();

  return (
    <div>
      <Link href="/admin/properties" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Properties
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">Edit Property</h1>
      <div className="mt-8">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}
