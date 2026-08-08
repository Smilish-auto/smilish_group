"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../Button";

/**
 * Client-side form shell shared by the Contact, Custom Design, Automation
 * Audit and Inspection Request forms.
 *
 * NOTE: This currently simulates a submission and shows a confirmation
 * state. Wiring it to a real endpoint is a Phase 3 (Lead & Request
 * Management) task — see the project README for the suggested approach
 * (an API route that writes to Postgres/Supabase and notifies the team).
 */
export function SubmittableForm({
  children,
  submitLabel,
  successTitle,
  successBody,
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successBody: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 700);
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
      <Button type="submit" variant="gold" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
