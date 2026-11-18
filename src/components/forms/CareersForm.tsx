"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { COMPANY } from "@/data/company";

interface CareersState {
  fullName: string;
  phone: string;
  email: string;
  profession: string;
  experience: string;
  currentLocation: string;
  preferredCategory: string;
  additionalInfo: string;
}

const INITIAL: CareersState = {
  fullName: "",
  phone: "",
  email: "",
  profession: "",
  experience: "",
  currentLocation: "",
  preferredCategory: "Onshore / Offshore MEP",
  additionalInfo: "",
};

export function CareersForm() {
  const [form, setForm] = useState<CareersState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof CareersState, string>>>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);

  const validate = () => {
    const next: Partial<Record<keyof CareersState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phone.trim() || form.phone.trim().length < 7)
      next.phone = "Valid phone number is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Valid email address is required.";
    if (!form.profession.trim()) next.profession = "Trade or profession is required.";
    if (!form.experience.trim()) next.experience = "Years of experience is required.";
    if (!form.currentLocation.trim())
      next.currentLocation = "Current location is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = [
      "CAREER / JOB ENQUIRY — PAK ARAB MANPOWER SUPPLY LLC",
      "----------------------------------------",
      `Full Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Profession / Trade: ${form.profession}`,
      `Years of Experience: ${form.experience}`,
      `Current Location: ${form.currentLocation}`,
      `Preferred Division: ${form.preferredCategory}`,
      `Additional Information: ${form.additionalInfo || "None"}`,
      "",
      "Note: I will attach my CV directly in this WhatsApp chat.",
    ].join("\n");

    const url = buildWhatsAppUrl(msg);
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const update = (field: keyof CareersState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-line bg-white p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="car-name" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Full Name <span className="text-brand">*</span>
          </label>
          <input
            id="car-name"
            type="text"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="car-phone" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Phone Number <span className="text-brand">*</span>
          </label>
          <input
            id="car-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+971 5X XXX XXXX"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="car-email" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Email Address <span className="text-brand">*</span>
          </label>
          <input
            id="car-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="car-prof" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Profession / Trade <span className="text-brand">*</span>
          </label>
          <input
            id="car-prof"
            type="text"
            value={form.profession}
            onChange={(e) => update("profession", e.target.value)}
            placeholder="e.g. GTAW Welder, Pipe Fitter, Mason"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.profession && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.profession}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="car-exp" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Years of Experience <span className="text-brand">*</span>
          </label>
          <input
            id="car-exp"
            type="text"
            value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
            placeholder="e.g. 5 Years (UAE / GCC)"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.experience && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.experience}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="car-loc" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Current Location <span className="text-brand">*</span>
          </label>
          <input
            id="car-loc"
            type="text"
            value={form.currentLocation}
            onChange={(e) => update("currentLocation", e.target.value)}
            placeholder="e.g. Abu Dhabi, UAE"
            className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm min-h-[2.75rem]"
          />
          {errors.currentLocation && (
            <p className="mt-1 text-xs text-brand flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.currentLocation}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="car-cat" className="block text-xs font-semibold text-navy-900 mb-1.5">
          Preferred Category
        </label>
        <select
          id="car-cat"
          value={form.preferredCategory}
          onChange={(e) => update("preferredCategory", e.target.value)}
          className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm min-h-[2.75rem]"
        >
          <option>Onshore / Offshore MEP</option>
          <option>Civil &amp; Construction</option>
          <option>Mechanical &amp; Electrical</option>
          <option>Supervision, Safety &amp; Admin</option>
        </select>
      </div>

      <div>
        <label htmlFor="car-info" className="block text-xs font-semibold text-navy-900 mb-1.5">
          Additional Information
        </label>
        <textarea
          id="car-info"
          rows={3}
          value={form.additionalInfo}
          onChange={(e) => update("additionalInfo", e.target.value)}
          placeholder="Trade certificates, availability, or project background (do not include passport or Emirates ID numbers here)."
          className="w-full rounded-md border border-line px-3.5 py-2.5 text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-bold text-navy-900 hover:bg-[#1fb858] transition-colors min-h-[3rem] cursor-pointer"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>Continue to WhatsApp &amp; Attach CV ({COMPANY.whatsapp.display})</span>
      </button>

      {preparedUrl && (
        <div className="rounded-md bg-mist border border-line p-3.5 text-xs text-navy-900 flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" />
          <div>
            WhatsApp has been opened with your enquiry details. Please send the message and
            attach your CV file manually inside the WhatsApp chat.{" "}
            <a
              href={preparedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline"
            >
              Re-open WhatsApp
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
