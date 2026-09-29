"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

/**
 * Tabs / StickyNav (§6, §9): in-page section navigation whose active item
 * follows the scroll position. Horizontally scrollable on small screens.
 */
export function StickySectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // Keep the active tab visible in the horizontal scroller.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (el && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label={t.nav.onThisPage} className="sticky top-[68px] z-30 border-y border-line bg-ivory/95 backdrop-blur-md">
      <div className="container-x">
        <ul ref={listRef} className="no-scrollbar -mx-2 flex overflow-x-auto">
          {sections.map((s) => (
            <li key={s.id} data-id={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className={cn(
                  "relative flex h-[52px] items-center px-3 text-[14px] font-semibold transition-colors lg:px-4",
                  active === s.id ? "text-forest-700" : "text-muted hover:text-ink",
                )}
              >
                {s.label}
                {active === s.id && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 bg-gold-500 lg:inset-x-4" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
