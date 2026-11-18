"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "@/data/faq";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
      {FAQS.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-[56px] group cursor-pointer"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-xs font-bold text-[#D40820] tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#111315] group-hover:text-[#D40820] transition-colors">
                  {item.question}
                </span>
              </span>
              <span className="shrink-0 rounded-full border border-[#E5E7EB] p-2 text-[#111315] group-hover:border-[#D40820]">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-panel`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-8 sm:pl-10 pr-6 text-sm sm:text-base leading-relaxed text-[#667085] max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
