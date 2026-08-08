import { TextAreaField, TextField } from "./Field";
import { SubmittableForm } from "./SubmittableForm";

export function InspectionForm({ propertyTitle }: { propertyTitle?: string }) {
  return (
    <SubmittableForm
      submitLabel="Book Inspection"
      successTitle="Inspection requested"
      successBody="An agent will call to confirm your inspection date and time shortly."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required placeholder="Your name" />
        <TextField label="Phone Number" name="phone" required placeholder="+234" />
      </div>
      <TextField label="Email" name="email" type="email" required placeholder="you@email.com" />
      <TextField
        label="Property"
        name="property"
        required
        defaultValue={propertyTitle}
        readOnly={Boolean(propertyTitle)}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Preferred Date" name="date" type="date" required />
        <TextField label="Preferred Time" name="time" type="time" required />
      </div>
      <TextAreaField label="Message" name="message" placeholder="Anything the agent should know" />
    </SubmittableForm>
  );
}
