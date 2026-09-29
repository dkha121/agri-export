import type { CSSProperties } from "react";
import type { Step } from "@/content/operations";
import { cn } from "@/lib/utils";

/**
 * Numbered process flow (§7.6, §12, §13). Horizontal with a connecting line
 * on desktop (line draws in on scroll, degrades to static), vertical on mobile.
 */
export function ProcessFlow({ steps, onDark, detailed }: { steps: Step[]; onDark?: boolean; detailed?: boolean }) {
  return (
    <div data-reveal className="relative">
      <div aria-hidden className={cn("absolute left-[22px] top-0 h-full w-px lg:left-0 lg:top-[22px] lg:h-px lg:w-full", onDark ? "bg-white/15" : "bg-line")} />
      <div aria-hidden className="chain-progress absolute left-0 top-[22px] hidden h-px w-full bg-gold-500 lg:block" />
      <ol
        className="relative grid gap-8 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:gap-6"
        style={{ "--cols": steps.length } as CSSProperties}
      >
        {steps.map((s, i) => (
          <li key={s.id} className="relative flex gap-5 lg:flex-col lg:gap-0">
            <span
              className={cn(
                "relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold",
                onDark ? "border-gold-500 bg-forest-900 text-gold-500" : "border-green-500 bg-ivory text-forest-700",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="lg:mt-6">
              <h3 className={cn("t-label", onDark ? "text-white" : "text-ink")}>{s.title}</h3>
              <p className={cn("mt-2 text-[15px] leading-6", onDark ? "text-white/70" : "text-muted")}>{s.summary}</p>
              {detailed && s.points && (
                <ul className={cn("mt-3 space-y-1.5 text-[13.5px] leading-5", onDark ? "text-white/80" : "text-ink/80")}>
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-gold-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
