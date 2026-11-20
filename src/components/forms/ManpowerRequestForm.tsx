"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, ExternalLink, Info, MessageCircle, Pencil } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { COMPANY } from "@/data/company";
import { selectionLines, totalWorkers, useWorkforceSelection } from "@/lib/workforce-selection";

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

type Errors = Partial<Record<keyof FormState, string>>;

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

const INDUSTRIES = [
  "Oil & Gas",
  "Civil & Construction",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Industrial & MEP",
  "Onshore Operations",
  "Offshore Operations",
];
const DURATIONS = ["Short-Term (1–3 Months)", "Medium-Term (3–6 Months)", "Long-Term (6+ Months)", "Shutdown / Turnaround"];

const FIELD =
  "w-full min-h-[2.75rem] rounded-md border bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

export function ManpowerRequestForm() {
  const uid = useId();
  const reduce = useReducedMotion();
  const roles = useWorkforceSelection();
  const total = totalWorkers(roles);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const hasRoles = roles.length > 0;

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (f.fullName.trim().length < 2) e.fullName = "Enter your full name.";
    if (f.companyName.trim().length < 2) e.companyName = "Enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid work email address.";
    const digits = f.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) e.phone = "Enter a valid phone or WhatsApp number, e.g. +971 50 123 4567.";
    if (!hasRoles && !f.workforceCategory.trim())
      e.workforceCategory = "Type the trades you need.";
    if (!hasRoles) {
      const n = Number(f.workersCount);
      if (!Number.isInteger(n) || n < 1) e.workersCount = "Enter the number of workers (minimum 1).";
    }
    if (!f.projectLocation.trim()) e.projectLocation = "Enter the project location.";
    return e;
  };

  const buildMessage = (f: FormState) => {
    const lines = [
      "*MANPOWER REQUEST — Pak Arab Manpower Supply LLC*",
      "",
      `*Name:* ${f.fullName.trim()}`,
      `*Company:* ${f.companyName.trim()}`,
      `*Email:* ${f.email.trim()}`,
      `*Phone / WhatsApp:* ${f.phone.trim()}`,
      "",
      `*Industry:* ${f.industry}`,
    ];
    if (hasRoles) {
      lines.push(`*Selected workforce (${roles.length} roles, ${total} workers):*`, ...selectionLines(roles));
      if (f.workforceCategory.trim()) lines.push(`*Other trades:* ${f.workforceCategory.trim()}`);
    } else {
      lines.push(`*Workforce required:* ${f.workforceCategory.trim()}`, `*Number of workers:* ${f.workersCount}`);
    }
    lines.push(
      `*Project location:* ${f.projectLocation.trim()}`,
      `*Contract duration:* ${f.projectDuration}`,
      `*Required mobilisation date:* ${f.expectedStartDate || "To be discussed"}`,
    );
    if (f.additionalRequirements.trim()) lines.push("", `*Additional requirements:* ${f.additionalRequirements.trim()}`);
    return lines.join("\n");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setOpened(false);
    setPreview(buildMessage(form));
  };

  // Preview dialog: focus, Escape to close, focus returns to the submit button
  useEffect(() => {
    if (!preview) return;
    dialogRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    const submit = submitRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      submit?.focus();
    };
  }, [preview]);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const a11y = (k: keyof FormState) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    className: `${FIELD} ${errors[k] ? "border-brand" : "border-line focus:border-navy-900"}`,
  });

  const Field = ({ k, label, required, children, span }: { k: keyof FormState; label: string; required?: boolean; children: ReactNode; span?: boolean }) => (
    <div className={span ? "sm:col-span-2" : ""}>
      <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}{" "}
        {required ? (
          <span className="text-brand" aria-hidden="true">*</span>
        ) : (
          <span className="font-normal text-slate">(optional)</span>
        )}
      </label>
      {children}
      {errors[k] && (
        <p id={`${uid}-${k}-err`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-brand-dark">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {errors[k]}
        </p>
      )}
    </div>
  );

  const waUrl = preview ? buildWhatsAppUrl(preview) : "";

  return (
    <form
      id="request-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Manpower request"
      className="scroll-mt-28 space-y-5 rounded-xl border border-line bg-white p-5 shadow-sm sm:p-8"
    >
      <p className="text-sm text-slate">
        Fields marked <span className="text-brand">*</span> are required.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Field({ k: "fullName", label: "Full name", required: true, children: <input type="text" autoComplete="name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} {...a11y("fullName")} /> })}
        {Field({ k: "companyName", label: "Company name", required: true, children: <input type="text" autoComplete="organization" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} {...a11y("companyName")} /> })}
        {Field({ k: "email", label: "Work email", required: true, children: <input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} {...a11y("email")} /> })}
        {Field({ k: "phone", label: "Phone / WhatsApp", required: true, children: <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" value={form.phone} onChange={(e) => update("phone", e.target.value)} {...a11y("phone")} /> })}
        {Field({
          k: "industry",
          label: "Industry",
          required: true,
          children: (
            <select value={form.industry} onChange={(e) => update("industry", e.target.value)} {...a11y("industry")}>
              {INDUSTRIES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ),
        })}
        {Field({ k: "projectLocation", label: "Project location", required: true, children: <input type="text" value={form.projectLocation} onChange={(e) => update("projectLocation", e.target.value)} {...a11y("projectLocation")} /> })}
        {Field({
          k: "workforceCategory",
          label: hasRoles ? "Other trades (not in your selection)" : "Trades / workforce required",
          required: !hasRoles,
          span: !hasRoles ? false : true,
          children: <input type="text" placeholder="e.g. 10 scaffolders, 4 riggers" value={form.workforceCategory} onChange={(e) => update("workforceCategory", e.target.value)} {...a11y("workforceCategory")} />,
        })}
        {!hasRoles &&
          Field({ k: "workersCount", label: "Number of workers", required: true, children: <input type="number" inputMode="numeric" min={1} value={form.workersCount} onChange={(e) => update("workersCount", e.target.value)} {...a11y("workersCount")} /> })}
        {Field({
          k: "projectDuration",
          label: "Contract duration",
          children: (
            <select value={form.projectDuration} onChange={(e) => update("projectDuration", e.target.value)} {...a11y("projectDuration")}>
              {DURATIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ),
        })}
        {Field({ k: "expectedStartDate", label: "Required mobilisation date", children: <input type="date" value={form.expectedStartDate} onChange={(e) => update("expectedStartDate", e.target.value)} {...a11y("expectedStartDate")} /> })}
        {Field({
          k: "additionalRequirements",
          label: "Additional requirements",
          span: true,
          children: (
            <textarea rows={3} placeholder="Shift pattern, certifications, CICPA site access, transport, etc." value={form.additionalRequirements} onChange={(e) => update("additionalRequirements", e.target.value)} {...a11y("additionalRequirements")} />
          ),
        })}
      </div>

      <button
        ref={submitRef}
        type="submit"
        className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-3.5 text-base font-bold text-navy-950 transition-[filter] hover:brightness-95"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Review &amp; send via WhatsApp
      </button>
      <p className="flex items-start gap-2 text-xs text-slate">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        Your details are not stored on this website. They are placed into a WhatsApp message to {COMPANY.whatsapp.display} that you review and send yourself.
      </p>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setPreview(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${uid}-pv-title`}
              initial={reduce ? { opacity: 0 } : { y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 32, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[88svh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="border-b border-line px-5 py-4">
                <h2 id={`${uid}-pv-title`} className="text-lg font-bold text-navy-900">
                  Check your WhatsApp message
                </h2>
                <p className="text-sm text-slate">This exact text will open in WhatsApp, ready to send to {COMPANY.whatsapp.display}.</p>
              </div>
              <pre className="flex-1 overflow-y-auto whitespace-pre-wrap break-words bg-mist px-5 py-4 font-sans text-sm leading-relaxed text-navy-900">
                {preview.replace(/\*/g, "")}
              </pre>
              <div className="space-y-3 border-t border-line px-5 py-4">
                {opened && (
                  <p role="status" className="rounded-md border-l-4 border-whatsapp bg-whatsapp/10 p-3 text-sm text-navy-900">
                    WhatsApp has been opened. Your request is <strong>not sent yet</strong>: press <strong>Send</strong> in WhatsApp to deliver it to our team.
                  </p>
                )}
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-semibold text-navy-900 hover:bg-mist"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" /> Edit details
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-conversion="lead"
                    onClick={() => setOpened(true)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-whatsapp px-5 text-sm font-bold text-navy-950 hover:brightness-95"
                  >
                    {opened ? "Open WhatsApp again" : "Open WhatsApp"}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
