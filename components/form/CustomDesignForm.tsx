import { FileField, SelectField, TextAreaField, TextField } from "./Field";
import { SubmittableForm } from "./SubmittableForm";
import { fashionCategories } from "@/lib/data/fashion";

export function CustomDesignForm() {
  return (
    <SubmittableForm
      submitLabel="Submit Custom Request"
      successTitle="Custom request submitted"
      successBody="Our tailoring team will review your details and reach out to confirm measurements and pricing."
      endpoint="/api/leads"
      extraFields={{ formType: "Custom Design Request", branch: "Fashion" }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required placeholder="Your name" />
        <TextField label="Phone Number" name="phone" required placeholder="+234" />
      </div>
      <TextField label="Email" name="email" type="email" required placeholder="you@email.com" />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Outfit Type" name="outfitType" required options={fashionCategories} />
        <TextField label="Preferred Fabric" name="fabric" placeholder="e.g. Cashmere, Guinea Brocade" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Preferred Color" name="color" placeholder="e.g. Navy & Gold" />
        <TextField label="Deadline" name="deadline" type="date" />
      </div>
      <TextField label="Measurements" name="measurements" placeholder="Chest, waist, length, shoulder…" />
      <TextField label="Preferred Style Reference" name="style" placeholder="Link or short description" />
      <FileField label="Reference Image" name="referenceImage" />
      <TextAreaField label="Additional Instructions" name="instructions" placeholder="Anything else we should know" />
    </SubmittableForm>
  );
}
