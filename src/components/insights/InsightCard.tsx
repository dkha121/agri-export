import Link from "next/link";
import type { Insight } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { Media } from "../media/Media";
import { ArrowRight } from "../ui/icons";

export async function InsightCard({ insight, large }: { insight: Insight; large?: boolean }) {
  const { t, l, date } = await getI18n();
  return (
    <article className="group relative flex h-full flex-col">
      <Media image={insight.image} className={cn("rounded-md", large ? "aspect-[16/10]" : "aspect-[3/2]")} zoom sizes="(min-width: 1024px) 33vw, 100vw" showLabel={false} />
      <div className="flex flex-1 flex-col pt-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
          <span className="t-label text-green-500">{t.insights.pillars[insight.pillar]}</span>
          <span aria-hidden>·</span>
          <time dateTime={insight.publishedAt}>{date(insight.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{t.common.minRead(insight.readingMinutes)}</span>
        </p>
        <h3 className={cn("mt-3 text-ink", large ? "t-h3" : "text-[20px] font-bold leading-7")}>
          <Link href={l(`/insights/${insight.slug}`)} className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-4">
            {insight.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-6 text-muted">{insight.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[15px] font-semibold text-forest-700">
          {t.common.readArticle} <ArrowRight size={18} className="arrow-nudge" />
        </span>
      </div>
    </article>
  );
}
