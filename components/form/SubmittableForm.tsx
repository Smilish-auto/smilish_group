"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../Button";

export function SubmittableForm({
  children,
  submitLabel,
  successTitle,
  successBody,
  endpoint,
  extraFields,
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  /** API route this form posts to, e.g. "/api/leads" or "/api/inspections". */
  endpoint: string;
  /** Extra values to send alongside the form's own fields (e.g. formType, branch). */
  extraFields?: Record<string, string>;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = { ...extraFields };
    formData.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
      // File inputs aren't uploaded yet — silently skipped for now.
    });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong — please try again.");
      }

      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-mist p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto text-gold" size={36} />
        <h3 className="mt-4 font-display text-xl font-medium text-navy-deep">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy/60">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" variant="gold" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
