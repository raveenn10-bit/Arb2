"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { FAQS } from "@/data/faq";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQS.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              id={`${item.id}-q`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-[56px] group cursor-pointer"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-xs font-bold text-brand tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-brand transition-colors">
                  {item.question}
                </span>
              </span>
              <span className="shrink-0 rounded-full border border-line p-2 text-navy-900 group-hover:border-brand">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            {/* Answer is always in the HTML (crawlable for Google & AI engines); visually collapsed when closed */}
            <motion.div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-q`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="pb-5 pl-8 sm:pl-10 pr-6 text-sm sm:text-base leading-relaxed text-slate max-w-3xl">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
