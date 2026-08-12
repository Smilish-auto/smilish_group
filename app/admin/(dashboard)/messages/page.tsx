import { createClient } from "@/lib/supabase/server";
import { ReadToggle } from "@/components/admin/ReadToggle";
import type { ContactMessageRow } from "@/lib/supabase/types";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy-deep">Messages</h1>
      <p className="mt-1 text-sm text-navy/55">Everyone who has submitted the Contact page form.</p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Couldn&apos;t load messages: {error.message}
        </p>
      )}

      {!error && (!messages || messages.length === 0) && (
        <p className="mt-10 text-sm text-navy/50">No messages yet.</p>
      )}

      {messages && messages.length > 0 && (
        <div className="mt-8 space-y-3">
          {(messages as ContactMessageRow[]).map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 ${m.read ? "border-line bg-white" : "border-gold/40 bg-gold/5"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-navy-deep">{m.name}</p>
                  <p className="mt-0.5 text-xs text-navy/50">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-navy/40">
                    {new Date(m.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                  <ReadToggle id={m.id} initialRead={m.read} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
