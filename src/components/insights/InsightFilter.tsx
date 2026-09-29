"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { InsightPillar } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

/** Content-pillar filter for the buyer resource center (§15), synced to ?pillar=. */
export function InsightFilter({ items, pillars, cards }: { items: { slug: string; pillar: InsightPillar }[]; pillars: InsightPillar[]; cards: Record<string, ReactNode> }) {
  const { t } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = params.get("pillar") ?? "";
  const list = active ? items.filter((i) => i.pillar === active) : items;

  const choose = (p: string) => router.replace(p ? `${pathname}?pillar=${encodeURIComponent(p)}` : pathname, { scroll: false });

  return (
    <div>
      <div role="group" aria-label={t.insights.filterAria} className="no-scrollbar -mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-1">
        {(["", ...pillars] as const).map((p) => (
          <button
            key={p || "all"}
            type="button"
            aria-pressed={active === p}
            onClick={() => choose(p)}
            className={cn(
              "min-h-[44px] shrink-0 rounded-full border px-5 text-[14px] font-semibold transition-colors",
              active === p ? "border-forest-700 bg-forest-700 text-white" : "border-line bg-white hover:border-green-500",
            )}
          >
            {p ? t.insights.pillars[p] : t.insights.allTopics}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {t.insights.count(list.length)}
      </p>
      <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {list.map((i) => (
          <li key={i.slug}>{cards[i.slug]}</li>
        ))}
      </ul>
    </div>
  );
}
