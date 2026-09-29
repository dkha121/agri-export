import type { Locale } from "./config";

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTHS_SHORT: Record<Locale, string[]> = {
  en: MONTHS_EN,
  vi: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
};

/**
 * Unambiguous dates (§19): "29 Sep 2026" in English, "29 tháng 9, 2026" in
 * Vietnamese. Implemented by hand so server and client output always match.
 */
export function formatDate(iso: string, locale: Locale = "en"): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return locale === "vi" ? `${d} tháng ${m}, ${y}` : `${d} ${MONTHS_EN[m - 1]} ${y}`;
}

/** Replace {name} placeholders. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}
