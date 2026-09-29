"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { Search } from "../ui/icons";
import { DownloadRow, type DocumentRowData } from "./DownloadRow";

/** Download center library with type / category / keyword filters. */
export function DocumentLibrary({ docs, categoryOfProduct, categories }: { docs: DocumentRowData[]; categoryOfProduct: Record<string, string>; categories: { key: string; name: string }[] }) {
  const { t } = useI18n();
  const d = t.downloads;
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const types = useMemo(() => [...new Set(docs.map((d) => d.type))], [docs]);

  const list = docs.filter((d) => {
    if (type && d.type !== type) return false;
    if (category && !d.productSlugs.some((s) => categoryOfProduct[s] === category)) return false;
    if (q && !`${d.title} ${d.description ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="grid gap-4 rounded-md border border-line bg-white p-5 md:grid-cols-[1fr_220px_220px]">
        <div>
          <label htmlFor="doc-q" className="mb-1.5 block text-[13px] font-semibold">
            {d.search}
          </label>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="doc-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-[48px] w-full rounded-sm border border-line bg-white pl-10 pr-3 text-[15px]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="doc-type" className="mb-1.5 block text-[13px] font-semibold">
            {d.type}
          </label>
          <select id="doc-type" value={type} onChange={(e) => setType(e.target.value)} className="h-[48px] w-full rounded-sm border border-line bg-white px-3 text-[15px]">
            <option value="">{d.allTypes}</option>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {d.types[ty] ?? ty}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="doc-cat" className="mb-1.5 block text-[13px] font-semibold">
            {d.category}
          </label>
          <select id="doc-cat" value={category} onChange={(e) => setCategory(e.target.value)} className="h-[48px] w-full rounded-sm border border-line bg-white px-3 text-[15px]">
            <option value="">{d.allCategories}</option>
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mb-2 mt-5 text-[15px] text-muted" aria-live="polite">
        {d.count(list.length)}
      </p>
      <ul className={cn("rounded-md border border-line bg-white px-5", !list.length && "hidden")}>
        {list.map((d) => (
          <DownloadRow key={d.id} doc={d} />
        ))}
      </ul>
      {!list.length && <p className="rounded-md border border-dashed border-line bg-white p-8 text-center text-muted">{d.empty}</p>}
    </div>
  );
}
