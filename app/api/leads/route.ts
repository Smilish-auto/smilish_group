import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNotificationEmail, buildNotificationHtml } from "@/lib/email";

/**
 * Handles the Contact, Custom Design, and Automation Audit forms — all
 * three are "someone is interested in something" submissions, so they all
 * land in the `leads` table. Whatever fields aren't first-class columns
 * (outfit type, fabric, business size, etc.) go into `details` as-is.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { formType, name, phone, email, branch, service, ...rest } = body as Record<string, string>;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    phone: phone || null,
    email: email || null,
    branch: branch || null,
    service: service || null,
    source: formType || "Website Form",
    details: rest,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await sendNotificationEmail({
    subject: `New ${formType || "lead"} — ${name}`,
    html: buildNotificationHtml(formType || "New Lead", {
      Name: name,
      Phone: phone,
      Email: email,
      Branch: branch,
      Service: service,
      ...Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, String(v)])),
    }),
  });

  return NextResponse.json({ ok: true });
}
