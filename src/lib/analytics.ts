/**
 * Analytics events (§21, §24): product views, spec/document downloads,
 * RFQ starts / step completions / completions. Events are pushed to
 * `window.dataLayer` so any tag manager or analytics tool can consume them.
 */
export type AnalyticsEvent =
  | "product_view"
  | "document_download"
  | "spec_download"
  | "rfq_start"
  | "rfq_step_complete"
  | "rfq_submit"
  | "rfq_complete"
  | "rfq_error"
  | "contact_submit"
  | "filter_change"
  | "origin_select";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props, ts: Date.now() });
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props);
  }
}
