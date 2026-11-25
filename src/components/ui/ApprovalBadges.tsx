import { BadgeCheck } from "lucide-react";

/** Client-confirmed approvals shown on the site (hero + footer). */
export const APPROVALS = ["MOHRE Approved", "TAQA Approved"] as const;

/** Glass approval badges for dark backgrounds (hero). */
export function ApprovalBadges({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const sm = size === "sm";
  return (
    <ul aria-label="Approvals" className={`flex flex-wrap gap-2 ${sm ? "" : "sm:gap-3"} ${className}`}>
      {APPROVALS.map((label) => (
        <li
          key={label}
          className={`inline-flex items-center rounded-md border border-white/20 bg-white/10 backdrop-blur-md font-bold text-white shadow-sm ${
            sm ? "gap-1.5 px-2.5 py-1.5 text-[0.6875rem]" : "gap-2 px-3.5 py-2 text-xs sm:text-sm"
          }`}
        >
          <span className={`inline-flex items-center justify-center rounded-full bg-brand ${sm ? "h-4 w-4" : "h-5 w-5"}`}>
            <BadgeCheck className={sm ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden="true" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
