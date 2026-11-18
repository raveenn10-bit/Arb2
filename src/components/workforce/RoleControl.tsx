"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { QtyStepper } from "./QtyStepper";
import { selection, useWorkforceSelection } from "@/lib/workforce-selection";
import type { WorkforceRole } from "@/data/workforce";

/** Quantity + add/remove control for one workforce role, synced with the shared selection. */
export function RoleControl({ role, idPrefix = "qty" }: { role: WorkforceRole; idPrefix?: string }) {
  const list = useWorkforceSelection();
  const selected = list.find((r) => r.id === role.id);
  const [draftQty, setDraftQty] = useState(1);
  const qty = selected ? selected.qty : draftQty;

  const setQty = (n: number) => (selected ? selection.setQty(role.id, n) : setDraftQty(n));
  const toggle = () =>
    selected
      ? selection.remove(role.id)
      : selection.add({ id: role.id, title: role.title, environment: role.environment }, draftQty);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <QtyStepper id={`${idPrefix}-${role.id}`} value={qty} onChange={setQty} label={role.title} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!!selected}
        aria-label={selected ? `Added: ${role.title}. Press to remove from request` : `Add ${role.title} to request`}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-md px-3.5 text-sm font-semibold transition-colors ${
          selected
            ? "bg-navy-900 text-white hover:bg-navy-800"
            : "border border-navy-900/20 bg-white text-navy-900 hover:border-brand hover:bg-brand hover:text-white"
        }`}
      >
        {selected ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        <span>{selected ? "Added" : "Add"}</span>
      </button>
    </div>
  );
}
