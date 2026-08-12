"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ReadToggle({ id, initialRead }: { id: string; initialRead: boolean }) {
  const [read, setRead] = useState(initialRead);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    const next = !read;
    setRead(next);
    setSaving(true);
    const supabase = createClient();
    await supabase.from("contact_messages").update({ read: next }).eq("id", id);
    setSaving(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
        read ? "bg-mist text-navy/50" : "bg-blue-100 text-blue-700"
      }`}
    >
      {read ? <Check size={12} /> : <Circle size={8} fill="currentColor" />}
      {read ? "Read" : "Unread"}
    </button>
  );
}
