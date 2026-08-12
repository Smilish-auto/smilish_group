import { SelectField, TextAreaField, TextField } from "./Field";
import { SubmittableForm } from "./SubmittableForm";

export function AutomationAuditForm() {
  return (
    <SubmittableForm
      submitLabel="Request Free Audit"
      successTitle="Audit request received"
      successBody="We'll review your business details and follow up with a short automation audit call within 48 hours."
      endpoint="/api/leads"
      extraFields={{ formType: "Automation Audit Request", branch: "AI Automation" }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required placeholder="Your name" />
        <TextField label="Company" name="company" required placeholder="Your company" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone Number" name="phone" required placeholder="+234" />
        <TextField label="Email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Industry" name="industry" required placeholder="e.g. Food, Real Estate, Retail" />
        <SelectField
          label="Business Size"
          name="businessSize"
          options={["1–5 staff", "6–20 staff", "21–50 staff", "50+ staff"]}
        />
      </div>
      <TextField label="Current Tools" name="currentTools" placeholder="e.g. WhatsApp, Google Sheets, CRM" />
      <TextAreaField label="Biggest Problem Right Now" name="biggestProblem" required />
      <TextAreaField label="Most Repetitive Tasks" name="repetitiveTasks" />
      <TextAreaField label="Current Customer Support Process" name="supportProcess" />
      <TextAreaField label="Additional Information" name="additionalInfo" />
    </SubmittableForm>
  );
}
