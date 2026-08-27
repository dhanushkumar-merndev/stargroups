"use server";

import { companies } from "@/lib/companies";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "interest" | "message", string>>;
  fields?: {
    name?: string;
    email?: string;
    phone?: string;
    interest?: string;
    message?: string;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Indian mobile numbers, with or without +91 / 0 prefix and spacing
const PHONE_RE = /^(\+?91[\s-]?)?[0]?[6-9]\d{9}$/;

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot: real people leave this hidden field empty.
  const website = String(formData.get("website") ?? "").trim();

  const submittedFields = { name, email, phone, interest, message };

  if (website) {
    // Silently accept and discard obvious bot submissions.
    return { status: "success", message: "Thanks — we'll be in touch shortly." };
  }

  const errors: EnquiryState["errors"] = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && !PHONE_RE.test(phone.replace(/[\s-]/g, "")))
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (!interest || !companies.some((c) => c.slug === interest))
    errors.interest = "Please choose what you need help with.";
  if (message.length < 10)
    errors.message = "Please tell us a little more — at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please review and correct the highlighted fields.",
      errors,
      fields: submittedFields,
    };
  }

  const company = companies.find((c) => c.slug === interest);

  // NOTE: delivery is not wired up yet. Validated enquiries are logged
  // server-side only. To actually deliver these, send `enquiry` from here via
  // your email provider (Resend/SES/SMTP) or push it into the group's CRM.
  const enquiry = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: phone || null,
    company: company?.name ?? interest,
    message,
  };
  console.log("[enquiry]", JSON.stringify(enquiry));

  return {
    status: "success",
    message: `Thanks ${name.split(" ")[0]} — your enquiry for ${company?.name} is in. We usually reply the same working day.`,
  };
}
