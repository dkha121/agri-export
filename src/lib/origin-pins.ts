import type { OriginPin } from "@/components/origin/OriginMap";
import type { I18n } from "@/i18n/server";
import { productHref } from "./data";

/** Serialisable, localised origin data for the client-side map. */
export function getOriginPins({ db, l }: Pick<I18n, "db" | "l">): OriginPin[] {
  return db.getOrigins().map((o) => ({
    slug: o.slug,
    name: o.name,
    region: o.region,
    provinces: o.provinces,
    coordinates: o.coordinates,
    crops: o.crops,
    harvest: o.harvest,
    climate: o.climate,
    altitude: o.altitude,
    summary: o.summary,
    products: db.getProductsByOrigin(o.slug).map((p) => ({ name: p.name, href: l(productHref(p)) })),
  }));
}
