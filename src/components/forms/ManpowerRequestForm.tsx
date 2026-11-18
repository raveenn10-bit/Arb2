"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { COMPANY } from "@/data/company";

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  workforceCategory: string;
  workersCount: string;
  projectLocation: string;
  projectDuration: string;
  expectedStartDate: string;
  additionalRequirements: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  industry: "Oil & Gas",
  workforceCategory: "",
  workersCount: "",
  projectLocation: "Abu Dhabi",
  projectDuration: "Long-Term (6+ Months)",
  expectedStartDate: "",
  additionalRequirements: "",
};

export function ManpowerRequestForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid work email address.";
    if (!form.phone.trim() || form.phone.trim().length < 7)
      nextErrors.phone = "Enter a valid phone or WhatsApp number.";
    if (!form.workforceCategory.trim())
      nextErrors.workforceCategory = "Specify the required trade or workforce category.";
    if (!form.workersCount.trim() || Number(form.workersCount) < 1)
      nextErrors.workersCount = "Enter the number of workers (minimum 1).";
    if (!form.projectLocation.trim())
      nextErrors.projectLocation = "Project location is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = [
      "MANPOWER REQUEST — PAK ARAB MANPOWER SUPPLY LLC",
      "----------------------------------------",
      `Full Name: ${form.fullName}`,
      `Company Name: ${form.companyName}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone}`,
      `Industry: ${form.industry}`,
      `Workforce Category: ${form.workforceCategory}`,
      `Number of Workers: ${form.workersCount}`,
      `Project Location: ${form.projectLocation}`,
      `Project Duration: ${form.projectDuration}`,
      `Expected Start Date: ${form.expectedStartDate || "To be discussed"}`,
      `Additional Requirements: ${form.additionalRequirements || "None specified"}`,
    ].join("\n");

    const url = buildWhatsAppUrl(message);
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="mr-fullName" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Full Name <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-fullName"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="mr-companyName" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Company Name <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-companyName"
            type="text"
            required
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="Organization or contractor name"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.companyName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="mr-email" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Email Address <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="name@company.ae"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label htmlFor="mr-phone" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Phone / WhatsApp Number <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+971 5X XXX XXXX"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="mr-industry" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Industry <span className="text-[#D40820]">*</span>
          </label>
          <select
            id="mr-industry"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            className="w-full rounded-md border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          >
            <option>Oil &amp; Gas</option>
            <option>Civil &amp; Construction</option>
            <option>Mechanical Engineering</option>
            <option>Electrical Engineering</option>
            <option>Industrial &amp; MEP</option>
            <option>Onshore Operations</option>
            <option>Offshore Operations</option>
          </select>
        </div>

        {/* Workforce Category */}
        <div>
          <label htmlFor="mr-category" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Workforce Category <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-category"
            type="text"
            required
            value={form.workforceCategory}
            onChange={(e) => update("workforceCategory", e.target.value)}
            placeholder="e.g. Multi Welders, Steel Fixers, Electricians"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.workforceCategory && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.workforceCategory}
            </p>
          )}
        </div>

        {/* Number of Workers */}
        <div>
          <label htmlFor="mr-count" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Number of Workers <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-count"
            type="number"
            min={1}
            required
            value={form.workersCount}
            onChange={(e) => update("workersCount", e.target.value)}
            placeholder="e.g. 25"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.workersCount && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.workersCount}
            </p>
          )}
        </div>

        {/* Project Location */}
        <div>
          <label htmlFor="mr-location" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Project Location <span className="text-[#D40820]">*</span>
          </label>
          <input
            id="mr-location"
            type="text"
            required
            value={form.projectLocation}
            onChange={(e) => update("projectLocation", e.target.value)}
            placeholder="e.g. Musaffah, Ruwais, Dubai"
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {errors.projectLocation && (
            <p className="mt-1 text-xs text-[#D40820] flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.projectLocation}
            </p>
          )}
        </div>

        {/* Project Duration */}
        <div>
          <label htmlFor="mr-duration" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Project Duration
          </label>
          <select
            id="mr-duration"
            value={form.projectDuration}
            onChange={(e) => update("projectDuration", e.target.value)}
            className="w-full rounded-md border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          >
            <option>Short-Term (1–3 Months)</option>
            <option>Medium-Term (3–6 Months)</option>
            <option>Long-Term (6+ Months)</option>
            <option>Shutdown / Turnaround</option>
          </select>
        </div>

        {/* Expected Start Date */}
        <div>
          <label htmlFor="mr-start" className="block text-xs font-semibold text-[#111315] mb-1.5">
            Expected Start Date
          </label>
          <input
            id="mr-start"
            type="date"
            value={form.expectedStartDate}
            onChange={(e) => update("expectedStartDate", e.target.value)}
            className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
        </div>
      </div>

      {/* Additional Requirements */}
      <div>
        <label htmlFor="mr-notes" className="block text-xs font-semibold text-[#111315] mb-1.5">
          Additional Requirements
        </label>
        <textarea
          id="mr-notes"
          rows={3}
          value={form.additionalRequirements}
          onChange={(e) => update("additionalRequirements", e.target.value)}
          placeholder="Shift details, onshore/offshore requirements, certifications, or transportation needs..."
          className="w-full rounded-md border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111315] focus:border-[#D40820] focus:outline-none"
        />
      </div>

      {/* Live Summary */}
      {(form.companyName || form.workforceCategory || form.workersCount) && (
        <div className="rounded-lg bg-[#F5F6F8] p-3.5 text-xs text-[#667085] border border-[#E5E7EB]">
          <span className="font-semibold text-[#111315]">Request Summary: </span>
          {form.workersCount ? `${form.workersCount}x ` : ""}
          {form.workforceCategory || "Manpower"} ({form.industry}) for{" "}
          {form.companyName || "your project"} in {form.projectLocation || "UAE"} —{" "}
          {form.projectDuration}.
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#111315] hover:bg-[#1fb858] transition-colors min-h-[48px] cursor-pointer"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>Send Request via WhatsApp ({COMPANY.whatsapp.display})</span>
      </button>

      {preparedUrl && (
        <div className="rounded-md bg-[#F5F6F8] border border-[#E5E7EB] p-3.5 text-xs text-[#111315] flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" />
          <div>
            Your formatted WhatsApp message has been prepared. Please send the message inside
            WhatsApp to complete your enquiry with our team.{" "}
            <a
              href={preparedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D40820] underline"
            >
              Open WhatsApp again
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
