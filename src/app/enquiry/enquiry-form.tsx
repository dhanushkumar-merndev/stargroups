"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  AlertCircle,
} from "lucide-react";
import { companies } from "@/lib/companies";
import { submitEnquiry, type EnquiryState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: EnquiryState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#e81932] via-[#d61229] to-[#b80b1f] px-8 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_-6px_rgba(224,20,44,0.45),0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_36px_-6px_rgba(224,20,44,0.55)] active:scale-[0.98] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Sending enquiry…</span>
        </>
      ) : (
        <>
          <span>Send enquiry</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-sg-red animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);

  // Maintain form input values in client state so they never get lost on error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  // Sync state if returned from server
  useEffect(() => {
    if (state.fields) {
      setFormData((prev) => ({
        name: state.fields?.name ?? prev.name,
        email: state.fields?.email ?? prev.email,
        phone: state.fields?.phone ?? prev.phone,
        interest: state.fields?.interest ?? prev.interest,
        message: state.fields?.message ?? prev.message,
      }));
    }
  }, [state.fields]);

  // Auto-open WhatsApp with pre-filled enquiry parameters when submission is successful
  useEffect(() => {
    if (state.status === "success" && state.whatsappUrl) {
      const timer = setTimeout(() => {
        window.open(state.whatsappUrl, "_blank", "noopener,noreferrer");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.status, state.whatsappUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (state.status === "success") {
    return (
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/80 bg-gradient-to-b from-white/95 via-white/85 to-white/70 p-8 sm:p-12 text-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.08),0_12px_36px_-12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl animate-in fade-in duration-300">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-emerald-600 border border-emerald-200/60 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,1)]">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h2 className="font-display text-2xl font-bold text-sg-dark-ink sm:text-3xl">
          Enquiry received.
        </h2>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-sg-dark-muted sm:text-base">
          {state.message}
        </p>

        {state.whatsappUrl && (
          <div className="mt-7 flex flex-col items-center gap-3">
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(16,185,129,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-emerald-500 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-6px_rgba(16,185,129,0.55)] active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Continue to WhatsApp</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-xs text-sg-dark-muted">
              Redirecting to WhatsApp with your details… If it didn&apos;t open, click above.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-black/[0.06] pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-4 py-2 text-xs font-medium text-sg-dark-muted backdrop-blur-md shadow-sm">
            <Clock className="h-3.5 w-3.5 text-sg-red" />
            Typical reply time: within a few business hours
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="text-xs font-medium text-sg-dark-muted transition-colors hover:text-sg-red cursor-pointer underline underline-offset-4"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-5 sm:p-8 md:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.07),0_10px_30px_-10px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl"
    >
      {/* Header bar */}
      <div className="mb-6 sm:mb-8 border-b border-black/[0.06] pb-5 sm:pb-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-sg-dark-ink">
          Project &amp; Partnership Enquiry
        </h3>
        <p className="mt-1 text-xs text-sg-dark-muted">
          Directly routed to the appropriate venture team
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <label
            htmlFor="name"
            className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sg-dark-ink"
          >
            <span>
              Your Name <span className="text-sg-red font-bold">*</span>
            </span>
          </label>
          <div
            className={cn(
              "group relative flex items-center rounded-2xl border bg-white/70 backdrop-blur-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 hover:bg-white/90 hover:border-black/[0.14] focus-within:bg-white focus-within:border-sg-red focus-within:ring-4 focus-within:ring-sg-red/12 focus-within:shadow-[0_8px_25px_-6px_rgba(224,20,44,0.18),inset_0_1px_1px_rgba(255,255,255,1)]",
              state.errors?.name
                ? "border-sg-red bg-sg-red-tint/30 ring-2 ring-sg-red/20"
                : "border-black/[0.08]"
            )}
          >
            <div className="pointer-events-none absolute left-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.03] text-sg-dark-muted/70 transition-colors group-focus-within:bg-sg-red-tint group-focus-within:text-sg-red">
              <User className="h-4 w-4" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
              aria-invalid={!!state.errors?.name}
              className="w-full bg-transparent py-3.5 pl-12 pr-4 text-base sm:text-sm text-sg-dark-ink placeholder:text-sg-dark-muted/50 outline-none min-h-[52px]"
            />
          </div>
          <FieldError>{state.errors?.name}</FieldError>
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sg-dark-ink"
          >
            <span>
              Work Email <span className="text-sg-red font-bold">*</span>
            </span>
          </label>
          <div
            className={cn(
              "group relative flex items-center rounded-2xl border bg-white/70 backdrop-blur-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 hover:bg-white/90 hover:border-black/[0.14] focus-within:bg-white focus-within:border-sg-red focus-within:ring-4 focus-within:ring-sg-red/12 focus-within:shadow-[0_8px_25px_-6px_rgba(224,20,44,0.18),inset_0_1px_1px_rgba(255,255,255,1)]",
              state.errors?.email
                ? "border-sg-red bg-sg-red-tint/30 ring-2 ring-sg-red/20"
                : "border-black/[0.08]"
            )}
          >
            <div className="pointer-events-none absolute left-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.03] text-sg-dark-muted/70 transition-colors group-focus-within:bg-sg-red-tint group-focus-within:text-sg-red">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={!!state.errors?.email}
              className="w-full bg-transparent py-3.5 pl-12 pr-4 text-base sm:text-sm text-sg-dark-ink placeholder:text-sg-dark-muted/50 outline-none min-h-[52px]"
            />
          </div>
          <FieldError>{state.errors?.email}</FieldError>
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label
            htmlFor="phone"
            className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sg-dark-ink"
          >
            <span>
              Phone{" "}
              <span className="text-[0.7rem] font-normal lowercase tracking-normal text-sg-dark-muted">
                (optional)
              </span>
            </span>
          </label>
          <div
            className={cn(
              "group relative flex items-center rounded-2xl border bg-white/70 backdrop-blur-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 hover:bg-white/90 hover:border-black/[0.14] focus-within:bg-white focus-within:border-sg-red focus-within:ring-4 focus-within:ring-sg-red/12 focus-within:shadow-[0_8px_25px_-6px_rgba(224,20,44,0.18),inset_0_1px_1px_rgba(255,255,255,1)]",
              state.errors?.phone
                ? "border-sg-red bg-sg-red-tint/30 ring-2 ring-sg-red/20"
                : "border-black/[0.08]"
            )}
          >
            <div className="pointer-events-none absolute left-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.03] text-sg-dark-muted/70 transition-colors group-focus-within:bg-sg-red-tint group-focus-within:text-sg-red">
              <Phone className="h-4 w-4" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-invalid={!!state.errors?.phone}
              className="w-full bg-transparent py-3.5 pl-12 pr-4 text-base sm:text-sm text-sg-dark-ink placeholder:text-sg-dark-muted/50 outline-none min-h-[52px]"
            />
          </div>
          <FieldError>{state.errors?.phone}</FieldError>
        </div>

        {/* Company / Interest */}
        <div className="sm:col-span-1">
          <label
            htmlFor="interest"
            className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sg-dark-ink"
          >
            <span>
              Select Company / Need <span className="text-sg-red font-bold">*</span>
            </span>
          </label>
          <div
            className={cn(
              "group relative flex items-center rounded-2xl border bg-white/70 backdrop-blur-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 hover:bg-white/90 hover:border-black/[0.14] focus-within:bg-white focus-within:border-sg-red focus-within:ring-4 focus-within:ring-sg-red/12 focus-within:shadow-[0_8px_25px_-6px_rgba(224,20,44,0.18),inset_0_1px_1px_rgba(255,255,255,1)]",
              state.errors?.interest
                ? "border-sg-red bg-sg-red-tint/30 ring-2 ring-sg-red/20"
                : "border-black/[0.08]"
            )}
          >
            <div className="pointer-events-none absolute left-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.03] text-sg-dark-muted/70 transition-colors group-focus-within:bg-sg-red-tint group-focus-within:text-sg-red">
              <Building2 className="h-4 w-4" />
            </div>
            <select
              id="interest"
              name="interest"
              required
              value={formData.interest}
              onChange={handleChange}
              aria-invalid={!!state.errors?.interest}
              className="w-full appearance-none bg-transparent py-3.5 pl-12 pr-10 text-base sm:text-sm text-sg-dark-ink outline-none min-h-[52px] cursor-pointer"
            >
              <option value="" disabled>
                Choose a Star Groups venture…
              </option>
              {companies.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-white text-sg-dark-ink">
                  {c.name} — {c.sector}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.04] text-sg-dark-muted">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <FieldError>{state.errors?.interest}</FieldError>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sg-dark-ink"
          >
            <span>
              Project Details <span className="text-sg-red font-bold">*</span>
            </span>
            <span className="text-[0.7rem] font-normal lowercase tracking-normal text-sg-dark-muted">
              scope, budget or timeline
            </span>
          </label>
          <div
            className={cn(
              "group relative flex rounded-2xl border bg-white/70 backdrop-blur-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 hover:bg-white/90 hover:border-black/[0.14] focus-within:bg-white focus-within:border-sg-red focus-within:ring-4 focus-within:ring-sg-red/12 focus-within:shadow-[0_8px_25px_-6px_rgba(224,20,44,0.18),inset_0_1px_1px_rgba(255,255,255,1)]",
              state.errors?.message
                ? "border-sg-red bg-sg-red-tint/30 ring-2 ring-sg-red/20"
                : "border-black/[0.08]"
            )}
          >
            <div className="pointer-events-none absolute left-3 top-3.5 flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.03] text-sg-dark-muted/70 transition-colors group-focus-within:bg-sg-red-tint group-focus-within:text-sg-red">
              <MessageSquare className="h-4 w-4" />
            </div>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're building, key requirements, goals, or any specific questions..."
              aria-invalid={!!state.errors?.message}
              className="w-full resize-y bg-transparent py-3.5 pl-12 pr-4 text-base sm:text-sm text-sg-dark-ink placeholder:text-sg-dark-muted/50 outline-none min-h-[120px] sm:min-h-[130px]"
            />
          </div>
          <FieldError>{state.errors?.message}</FieldError>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-sg-red/30 bg-sg-red-tint/80 p-4 text-xs font-medium text-sg-red shadow-sm backdrop-blur-md animate-in fade-in duration-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-sg-red" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Footer / Submit area */}
      <div className="mt-7 sm:mt-9 flex flex-col items-stretch sm:items-center justify-between gap-4 border-t border-black/[0.06] pt-6 sm:flex-row">
        <SubmitButton />
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.05] bg-white/50 px-3.5 py-1.5 text-xs text-sg-dark-muted backdrop-blur-md shadow-sm">
          <ShieldCheck className="h-4 w-4 text-sg-red" />
          <span>Direct confidential group dispatch</span>
        </div>
      </div>
    </form>
  );
}
