"use client";

import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

/**
 * Brand lock-up: Owi Chewi logo + company name (TrustVN).
 * On dark backgrounds the logo sits on an ivory tile so its brown lettering keeps contrast.
 */
export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  const { t, l } = useI18n();
  return (
    <Link href={l("/")} className={cn("group inline-flex min-h-[44px] items-center gap-3", className)} aria-label={t.nav.homeAria(company.brand)}>
      <span className={cn("flex shrink-0 items-center justify-center", onDark && "rounded-md bg-ivory px-2.5 py-1.5")}>
        <Image src={company.logo} alt={company.retailBrand} width={967} height={654} unoptimized preload className={cn("w-auto", onDark ? "h-10" : "h-11 lg:h-12")} />
      </span>
      <span aria-hidden className={cn("h-9 w-px", onDark ? "bg-white/20" : "bg-line")} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={cn("font-serif text-[23px] leading-[22px]", onDark ? "text-white" : "text-forest-900")}>{company.brand}</span>
        <span className={cn("mt-1 text-[9.5px] font-bold uppercase tracking-[0.2em]", onDark ? "text-gold-500" : "text-green-500 lg:max-xl:hidden")}>{t.nav.logoTagline}</span>
      </span>
    </Link>
  );
}
