"use client";

import Link from "next/link";
import { company } from "@/content/company";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

/** Placeholder logo — replace with the company's SVG logo (§25 Brand). */
export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  const { t, l } = useI18n();
  return (
    <Link href={l("/")} className={cn("group inline-flex min-h-[44px] items-center gap-2.5", className)} aria-label={t.nav.homeAria(company.brand)}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="shrink-0">
        <rect width="34" height="34" rx="4" fill={onDark ? "#F7F5EF" : "#163F35"} />
        <path d="M9 24c0-8 5.5-13.5 16-14-.3 9.8-5.8 15-14.2 15" fill="none" stroke="#D4A53A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10.5 23.5l8-8" stroke={onDark ? "#163F35" : "#F7F5EF"} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={cn("font-serif text-[23px] leading-[22px]", onDark ? "text-white" : "text-forest-900")}>{company.brand}</span>
        <span className={cn("mt-1 text-[9.5px] font-bold uppercase tracking-[0.2em]", onDark ? "text-gold-500" : "text-green-500 lg:max-xl:hidden")}>{t.nav.logoTagline}</span>
      </span>
    </Link>
  );
}
