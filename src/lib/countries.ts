import type { Locale } from "@/i18n/config";

/**
 * Destination countries for RFQ / contact forms. The submitted value is the
 * English name (for the sales team); the label follows the page language.
 */
const COUNTRY_CODES: [string, string][] = [
  ["Algeria", "DZ"], ["Argentina", "AR"], ["Australia", "AU"], ["Austria", "AT"], ["Bahrain", "BH"], ["Bangladesh", "BD"],
  ["Belgium", "BE"], ["Brazil", "BR"], ["Bulgaria", "BG"], ["Cambodia", "KH"], ["Canada", "CA"], ["Chile", "CL"], ["China", "CN"],
  ["Colombia", "CO"], ["Croatia", "HR"], ["Cyprus", "CY"], ["Czechia", "CZ"], ["Denmark", "DK"], ["Egypt", "EG"], ["Estonia", "EE"],
  ["Finland", "FI"], ["France", "FR"], ["Germany", "DE"], ["Ghana", "GH"], ["Greece", "GR"], ["Hong Kong SAR", "HK"], ["Hungary", "HU"],
  ["India", "IN"], ["Indonesia", "ID"], ["Iraq", "IQ"], ["Ireland", "IE"], ["Israel", "IL"], ["Italy", "IT"], ["Japan", "JP"],
  ["Jordan", "JO"], ["Kazakhstan", "KZ"], ["Kenya", "KE"], ["Kuwait", "KW"], ["Latvia", "LV"], ["Lebanon", "LB"], ["Lithuania", "LT"],
  ["Luxembourg", "LU"], ["Malaysia", "MY"], ["Malta", "MT"], ["Mexico", "MX"], ["Morocco", "MA"], ["Netherlands", "NL"],
  ["New Zealand", "NZ"], ["Nigeria", "NG"], ["Norway", "NO"], ["Oman", "OM"], ["Pakistan", "PK"], ["Peru", "PE"], ["Philippines", "PH"],
  ["Poland", "PL"], ["Portugal", "PT"], ["Qatar", "QA"], ["Romania", "RO"], ["Russia", "RU"], ["Saudi Arabia", "SA"], ["Senegal", "SN"],
  ["Serbia", "RS"], ["Singapore", "SG"], ["Slovakia", "SK"], ["Slovenia", "SI"], ["South Africa", "ZA"], ["South Korea", "KR"],
  ["Spain", "ES"], ["Sri Lanka", "LK"], ["Sweden", "SE"], ["Switzerland", "CH"], ["Taiwan", "TW"], ["Tanzania", "TZ"],
  ["Thailand", "TH"], ["Tunisia", "TN"], ["Türkiye", "TR"], ["Ukraine", "UA"], ["United Arab Emirates", "AE"], ["United Kingdom", "GB"],
  ["United States", "US"], ["Uruguay", "UY"], ["Uzbekistan", "UZ"], ["Vietnam", "VN"],
];

export const COUNTRIES = [...COUNTRY_CODES.map(([name]) => name), "Other"];

export type CountryOption = { value: string; label: string };

/** Build country options on the server (labels computed once, so SSR and hydration match). */
export function getCountryOptions(locale: Locale): CountryOption[] {
  if (locale === "en") return COUNTRIES.map((c) => ({ value: c, label: c }));
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const opts = COUNTRY_CODES.map(([value, code]) => ({ value, label: names.of(code) ?? value }));
  opts.sort((a, b) => a.label.localeCompare(b.label, locale));
  return [...opts, { value: "Other", label: locale === "vi" ? "Khác" : "Other" }];
}
