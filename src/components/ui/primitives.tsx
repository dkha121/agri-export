"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { CertificateStatus, Metric } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { ChevronRight, Info } from "./icons";

export function Kicker({ children, onDark, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={cn("t-label flex items-center gap-3", onDark ? "text-gold-500" : "text-green-500", className)}>
      <span aria-hidden className={cn("h-px w-8", onDark ? "bg-gold-500" : "bg-green-500")} />
      {children}
    </p>
  );
}

export function SectionHeader({
  kicker,
  title,
  intro,
  onDark,
  align = "left",
  action,
  id,
  as: Tag = "h2",
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 lg:mb-14",
        Boolean(action) && "lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center",
      )}
    >
      <div className={cn("max-w-[760px]", align === "center" && "mx-auto")}>
        {kicker && (
          <Kicker onDark={onDark} className={cn("mb-4", align === "center" && "justify-center")}>
            {kicker}
          </Kicker>
        )}
        <Tag id={id} className={cn(Tag === "h1" ? "t-h1" : "t-h2", onDark ? "text-white" : "text-ink")}>
          {title}
        </Tag>
        {intro && <div className={cn("t-lead mt-5", onDark ? "text-white/75" : "text-muted")}>{intro}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Tag({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "green" | "gold" | "dark"; className?: string }) {
  const tones = {
    neutral: "bg-white text-ink border border-line",
    green: "bg-green-50 text-forest-700 border border-green-500/25",
    gold: "bg-gold-500/15 text-forest-900 border border-gold-500/40",
    dark: "bg-white/10 text-white border border-white/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold leading-4", tones[tone], className)}>
      {children}
    </span>
  );
}

/**
 * Marks mock / unverified business data (§23: "Use clearly labelled mock
 * placeholders until verified data is provided"). Renders nothing for verified data.
 */
export function IllustrativeBadge({ verified = false, onDark, className, label }: { verified?: boolean; onDark?: boolean; className?: string; label?: string }) {
  const { t } = useI18n();
  if (verified) return null;
  return (
    <span
      title={t.common.illustrativeTitle}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.08em]",
        onDark ? "bg-white/10 text-gold-500" : "bg-sand text-muted",
        className,
      )}
    >
      <Info size={11} strokeWidth={2.25} />
      {label ?? t.common.illustrative}
    </span>
  );
}

export function Breadcrumb({ items, onDark }: { items: { label: string; href?: string }[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={cn("flex flex-wrap items-center gap-1 text-[13px]", onDark ? "text-white/70" : "text-muted")}>
        {items.map((item, i) => (
          <li key={item.label + i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} className="opacity-60" />}
            {item.href ? (
              <Link href={item.href} className={cn("rounded-sm py-1 hover:underline", onDark ? "hover:text-white" : "hover:text-ink")}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={onDark ? "text-white" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Large number + short label (§6 MetricBlock — CMS driven). */
export function MetricBlock({ metric, onDark, showDefinition, className }: { metric: Metric; onDark?: boolean; showDefinition?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-2">
        <span className={cn("font-serif text-[44px] leading-[1] lg:text-[56px]", onDark ? "text-white" : "text-forest-700")}>{metric.value}</span>
      </div>
      <span className={cn("text-[15px] font-semibold leading-6", onDark ? "text-white/90" : "text-ink")}>{metric.label}</span>
      {showDefinition && metric.definition && <span className={cn("t-small", onDark ? "text-white/60" : "text-muted")}>{metric.definition}</span>}
      {!metric.verified && <IllustrativeBadge onDark={onDark} className="self-start" />}
    </div>
  );
}

const statusStyles: Record<CertificateStatus, { cls: string; dot: string }> = {
  valid: { cls: "text-success bg-white ring-1 ring-inset ring-success/40", dot: "bg-success" },
  "renewal-pending": { cls: "text-forest-900 bg-gold-500/20", dot: "bg-gold-500" },
  expired: { cls: "text-error bg-error/10", dot: "bg-error" },
};

export function StatusBadge({ status }: { status: CertificateStatus }) {
  const { t } = useI18n();
  const s = statusStyles[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-bold leading-4", s.cls)}>
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {t.common.status[status]}
    </span>
  );
}
