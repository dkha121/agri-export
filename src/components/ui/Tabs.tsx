"use client";

import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible tabs (WAI-ARIA tabs pattern, arrow-key navigation). Panels are
 * passed pre-rendered so server components can live inside them.
 */
export function Tabs({ items, label }: { items: { id: string; label: ReactNode; content: ReactNode }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const base = useId();
  const tabId = (id: string) => `${base}-tab-${id}`;
  const panelId = (id: string) => `${base}-panel-${id}`;

  return (
    <div>
      <div role="tablist" aria-label={label} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {items.map((item, i) => (
          <button
            key={item.id}
            id={tabId(item.id)}
            role="tab"
            type="button"
            aria-selected={active === item.id}
            aria-controls={panelId(item.id)}
            tabIndex={active === item.id ? 0 : -1}
            onClick={() => setActive(item.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const next = items[(i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length];
              setActive(next.id);
              document.getElementById(tabId(next.id))?.focus();
            }}
            className={cn(
              "min-h-[44px] shrink-0 rounded-full border px-5 text-[14px] font-semibold transition-colors",
              active === item.id ? "border-forest-700 bg-forest-700 text-white" : "border-line bg-white text-ink hover:border-green-500",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div key={item.id} id={panelId(item.id)} role="tabpanel" aria-labelledby={tabId(item.id)} hidden={active !== item.id} tabIndex={0} className="mt-8 outline-none">
          {item.content}
        </div>
      ))}
    </div>
  );
}
