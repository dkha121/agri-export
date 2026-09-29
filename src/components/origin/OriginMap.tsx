"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, MapPin } from "../ui/icons";
import { CITIES, CON_DAO, HOANG_SA, MAP_H, MAP_W, PHU_QUOC, TRUONG_SA, VIETNAM_PATH, project } from "./vietnam-geo";

export interface OriginPin {
  slug: string;
  name: string;
  region: string;
  provinces: string[];
  coordinates: [number, number];
  crops: string[];
  harvest: string;
  climate: string;
  altitude: string;
  summary: string;
  products: { name: string; href: string }[];
}

/**
 * OriginMap (§6, §7.4, §10) — Vietnam SVG with one pin per real sourcing
 * region. Pins are real <button>s (keyboard + touch); selecting one opens the
 * detail panel. A list/accordion fallback gives the same information without
 * the map (§19 "Accessible list fallback; not color/hover only").
 */
export function OriginMap({ origins, headingLevel = "h3" }: { origins: OriginPin[]; headingLevel?: "h2" | "h3" }) {
  const { t } = useI18n();
  const m = t.originMap;
  const [selected, setSelected] = useState(origins[0]?.slug);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const current = origins.find((o) => o.slug === selected) ?? origins[0];
  const H = headingLevel;

  const select = (slug: string) => {
    setSelected(slug);
    track("origin_select", { origin: slug });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Map */}
      <div className="lg:col-span-6">
        <div className="relative mx-auto aspect-[500/560] w-full max-w-[520px]">
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" role="img" aria-labelledby="map-title map-desc">
            <title id="map-title">{m.title}</title>
            <desc id="map-desc">
              {m.desc(
                origins.length,
                origins.map((o) => o.name).join(", "),
              )}
            </desc>
            <defs>
              <pattern id="sea-lines" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M0 10 L10 0" stroke="#163F35" strokeOpacity="0.05" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width={MAP_W} height={MAP_H} fill="url(#sea-lines)" />
            <path d={VIETNAM_PATH} fill="#163F35" stroke="#102A24" strokeWidth="1.5" strokeLinejoin="round" />
            <ellipse cx={PHU_QUOC[0]} cy={PHU_QUOC[1]} rx="5" ry="9" fill="#163F35" />
            <circle cx={CON_DAO[0]} cy={CON_DAO[1]} r="2.5" fill="#163F35" />
            {HOANG_SA.map(([x, y], i) => (
              <circle key={`hs${i}`} cx={x} cy={y} r="2.2" fill="#163F35" />
            ))}
            <text x={HOANG_SA[0][0] - 6} y={HOANG_SA[0][1] - 22} className="fill-[#56645E] text-[12px] font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
              {m.hoangSa}
            </text>
            {TRUONG_SA.map(([x, y], i) => (
              <circle key={`ts${i}`} cx={x} cy={y} r="2.2" fill="#163F35" />
            ))}
            <text x={TRUONG_SA[0][0] - 6} y={TRUONG_SA[0][1] - 26} className="fill-[#56645E] text-[12px] font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
              {m.truongSa}
            </text>
            <text x="330" y="360" className="fill-[#56645E] text-[11px] tracking-[0.3em]" style={{ fontFamily: "var(--font-sans)" }}>
              {m.eastSea}
            </text>
            {CITIES.map((c) => (
              <g key={c.name}>
                <circle cx={c.pos[0]} cy={c.pos[1]} r="3" fill="#F7F5EF" stroke="#102A24" />
                <text
                  x={c.pos[0] - 7}
                  y={c.pos[1] + 4}
                  textAnchor="end"
                  className="fill-white text-[11.5px] font-bold"
                  stroke="#102A24"
                  strokeWidth={3}
                  paintOrder="stroke"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.name === "Hanoi" ? m.hanoi : m.hcmc}
                </text>
              </g>
            ))}
          </svg>

          {origins.map((o) => {
            const [x, y] = project(o.coordinates);
            const active = o.slug === current?.slug;
            const showLabel = active || hovered === o.slug;
            return (
              <button
                key={o.slug}
                type="button"
                onClick={() => select(o.slug)}
                onFocus={() => setHovered(o.slug)}
                onBlur={() => setHovered(null)}
                onMouseEnter={() => setHovered(o.slug)}
                onMouseLeave={() => setHovered(null)}
                aria-pressed={active}
                aria-label={`${o.name}: ${o.crops.join(", ")}`}
                className="group absolute z-[1] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
              >
                {active && <span aria-hidden className="absolute h-9 w-9 animate-ping rounded-full bg-gold-500/40 motion-reduce:hidden" />}
                <span
                  aria-hidden
                  className={cn(
                    "relative flex items-center justify-center rounded-full border-2 transition-all duration-200",
                    active ? "h-6 w-6 border-white bg-gold-500" : "h-4 w-4 border-white bg-gold-500/90 group-hover:h-5 group-hover:w-5",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-900" />
                </span>
                {showLabel && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-full top-1/2 ml-1 -translate-y-1/2 whitespace-nowrap rounded-sm bg-forest-900 px-2 py-1 text-[12px] font-bold text-white shadow-soft"
                  >
                    {o.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[12px] text-muted">{m.note}</p>
      </div>

      {/* Desktop: selector list + detail panel */}
      <div className="hidden lg:col-span-6 lg:block">
        <p className="t-label mb-3 text-muted" id="origin-list-label">
          {m.regions}
        </p>
        <ul aria-labelledby="origin-list-label" className="flex flex-wrap gap-2">
          {origins.map((o) => (
            <li key={o.slug}>
              <button
                type="button"
                aria-pressed={o.slug === current?.slug}
                onClick={() => select(o.slug)}
                className={cn(
                  "min-h-[40px] rounded-full border px-4 text-[13.5px] font-semibold transition-colors",
                  o.slug === current?.slug ? "border-forest-700 bg-forest-700 text-white" : "border-line bg-white text-ink hover:border-green-500",
                )}
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
        {current && (
          <div key={current.slug} className="anim-fade mt-6 rounded-md border border-line bg-white p-8" aria-live="polite">
            <OriginDetail origin={current} H={H} />
          </div>
        )}
      </div>

      {/* Mobile / tablet: accordion list fallback */}
      <div className="lg:hidden">
        <ul className="divide-y divide-line rounded-md border border-line bg-white">
          {origins.map((o) => {
            const open = openMobile === o.slug;
            return (
              <li key={o.slug}>
                <H className="m-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`origin-acc-${o.slug}`}
                    onClick={() => {
                      setOpenMobile(open ? null : o.slug);
                      select(o.slug);
                    }}
                    className="flex min-h-[60px] w-full items-center gap-3 px-5 text-left"
                  >
                    <MapPin size={18} className="shrink-0 text-green-500" />
                    <span className="flex-1">
                      <span className="block text-[16px] font-bold">{o.name}</span>
                      <span className="block text-[13px] text-muted">{o.crops.join(" · ")}</span>
                    </span>
                    <ChevronDown className={cn("shrink-0 transition-transform", open && "rotate-180")} />
                  </button>
                </H>
                {open && (
                  <div id={`origin-acc-${o.slug}`} className="px-5 pb-6">
                    <OriginDetail origin={o} H={H} hideTitle />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function OriginDetail({ origin, H, hideTitle }: { origin: OriginPin; H: "h2" | "h3"; hideTitle?: boolean }) {
  const { t, l } = useI18n();
  const m = t.originMap;
  return (
    <div>
      {!hideTitle && (
        <>
          <p className="t-label text-green-500">{origin.region}</p>
          <H className="t-h3 mt-2 text-ink">{origin.name}</H>
        </>
      )}
      <p className={cn("text-[15px] leading-6 text-muted", !hideTitle && "mt-3")}>{origin.summary}</p>
      <dl className="mt-5 grid gap-x-6 gap-y-4 text-[14px] leading-5 sm:grid-cols-2">
        <div>
          <dt className="t-label text-muted">{m.provinces}</dt>
          <dd className="mt-1 font-semibold">{origin.provinces.join(", ")}</dd>
        </div>
        <div>
          <dt className="t-label text-muted">{m.crops}</dt>
          <dd className="mt-1 font-semibold">{origin.crops.join(", ")}</dd>
        </div>
        <div>
          <dt className="t-label text-muted">{m.harvest}</dt>
          <dd className="mt-1 font-semibold">{origin.harvest}</dd>
        </div>
        <div>
          <dt className="t-label text-muted">{m.altClimate}</dt>
          <dd className="mt-1 font-semibold">
            {origin.altitude} · {origin.climate}
          </dd>
        </div>
      </dl>
      {origin.products.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="t-label text-muted">{m.productsFrom}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {origin.products.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-flex min-h-[36px] items-center text-[14px] font-semibold text-forest-700 hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link href={l(`/origins/${origin.slug}`)} className="group mt-5 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-forest-700 hover:underline">
        {m.explore(origin.name)} <ArrowRight size={18} className="arrow-nudge" />
      </Link>
    </div>
  );
}
