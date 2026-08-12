import { SelectField, TextAreaField, TextField } from "./Field";
import { SubmittableForm } from "./SubmittableForm";

export function ContactForm() {
  return (
    <SubmittableForm
      submitLabel="Send Message"
      successTitle="Message received"
      successBody="Thanks for reaching out — someone from the Smilish Group team will get back to you within one business day."
      endpoint="/api/leads"
      extraFields={{ formType: "Contact Form" }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required placeholder="Your name" />
        <TextField label="Phone Number" name="phone" required placeholder="+234" />
      </div>
      <TextField label="Email" name="email" type="email" required placeholder="you@email.com" />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Interested Branch"
          name="branch"
          options={["Fashion", "AI Automation", "Real Estate", "General Inquiry"]}
        />
        <TextField label="Service" name="service" placeholder="e.g. Custom Agbada, AI Agent…" />
      </div>
      <TextAreaField label="Message" name="message" required placeholder="Tell us what you need…" />
    </SubmittableForm>
  );
}
