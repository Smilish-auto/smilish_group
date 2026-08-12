"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function StatusSelect({
  table,
  id,
  value,
  options,
  colorMap,
}: {
  table: string;
  id: string;
  value: string;
  options: string[];
  colorMap: Record<string, string>;
}) {
  const [current, setCurrent] = useState(value);
  const [saving, setSaving] = useState(false);

  async function handleChange(newValue: string) {
    setCurrent(newValue);
    setSaving(true);
    const supabase = createClient();
    await supabase.from(table).update({ status: newValue }).eq("id", id);
    setSaving(false);
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${colorMap[current] ?? "bg-mist text-navy/60"}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
