"use client";

import Link from "next/link";
import { useState } from "react";
import type { Step } from "@/content/operations";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "../ui/icons";

/**
 * Farm → Buyer value chain (§7.6). Dark section; each step shows one short
 * description on click / hover / focus and links to the Supply Chain page.
 * The connecting line draws in on scroll and degrades to a static line.
 */
export function ValueChain({ steps }: { steps: Step[] }) {
  const { t, l } = useI18n();
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <div>
      {/* Desktop / tablet: interactive stepper */}
      <div className="hidden md:block" data-reveal>
        <div className="relative">
          <div aria-hidden className="absolute left-[22px] right-[22px] top-[22px] h-px bg-white/15" />
          <div aria-hidden className="chain-progress absolute left-[22px] right-[22px] top-[22px] h-px bg-gold-500" />
          <div role="tablist" aria-label={t.valueChain.stepsAria} className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}>
            {steps.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                id={`vc-tab-${s.id}`}
                aria-selected={i === active}
                aria-controls="vc-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + steps.length) % steps.length;
                    setActive(next);
                    document.getElementById(`vc-tab-${steps[next].id}`)?.focus();
                  }
                }}
                className="group flex flex-col items-start gap-4 rounded-sm pb-2 text-left"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border text-[13px] font-bold transition-colors duration-200",
                    i === active ? "border-gold-500 bg-gold-500 text-forest-900" : "border-white/30 bg-forest-900 text-white/80 group-hover:border-gold-500",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("t-label transition-colors", i === active ? "text-gold-500" : "text-white/80")}>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div id="vc-panel" role="tabpanel" aria-labelledby={`vc-tab-${step.id}`} className="mt-10 grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-12">
          <p key={step.id} className="anim-fade font-serif text-[28px] leading-9 text-white lg:col-span-8 lg:text-[34px] lg:leading-[42px]">
            {step.summary}
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <Link href={l("/supply-chain")} className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-white hover:underline">
              {t.valueChain.link} <ArrowRight size={18} className="arrow-nudge text-gold-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: vertical list, all descriptions visible (no hover dependency) */}
      <ol className="space-y-6 md:hidden">
        {steps.map((s, i) => (
          <li key={s.id} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500 text-[13px] font-bold text-gold-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="t-label text-white">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-6 text-white/70">{s.summary}</p>
            </div>
          </li>
        ))}
        <li>
          <Link href={l("/supply-chain")} className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-white">
            {t.valueChain.link} <ArrowRight size={18} className="arrow-nudge text-gold-500" />
          </Link>
        </li>
      </ol>
    </div>
  );
}
