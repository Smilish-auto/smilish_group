import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNotificationEmail, buildNotificationHtml } from "@/lib/email";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, email, property, date, time, message } = body as Record<string, string>;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const supabase = await createClient();

  // Best-effort match the typed property name to a real listing so the
  // admin panel can link back to it — falls back to storing the raw text.
  let propertyId: string | null = null;
  if (property) {
    const { data: match } = await supabase
      .from("properties")
      .select("id")
      .ilike("title", property)
      .maybeSingle();
    propertyId = match?.id ?? null;
  }

  const { error } = await supabase.from("property_inspections").insert({
    customer_name: name,
    phone: phone || null,
    email: email || null,
    property_id: propertyId,
    property_title: property || null,
    inspection_date: date || null,
    inspection_time: time || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await sendNotificationEmail({
    subject: `New Inspection Request — ${name}`,
    html: buildNotificationHtml("New Inspection Request", {
      Name: name,
      Phone: phone,
      Email: email,
      Property: property,
      Date: date,
      Time: time,
      Message: message,
    }),
  });

  return NextResponse.json({ ok: true });
}
