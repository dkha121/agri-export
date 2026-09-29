/**
 * Localisation overlays. Each locale provides partial objects that are merged
 * over the canonical (English) content in /src/content:
 *  - objects merge recursively
 *  - arrays of the SAME length merge element by element (by index)
 *  - arrays of a DIFFERENT length (or arrays of strings) replace the base array
 * IDs, slugs, numbers, codes and `facets` are never translated.
 */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export function deepMerge<T>(base: T, overlay: DeepPartial<T> | undefined): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base)) {
    const ov = overlay as unknown as unknown[];
    if (!Array.isArray(ov)) return base;
    if (ov.length !== base.length || base.some((b) => typeof b !== "object" || b === null)) {
      return ov as unknown as T;
    }
    return base.map((b, i) => deepMerge(b, ov[i] as DeepPartial<typeof b>)) as unknown as T;
  }
  if (typeof base === "object" && base !== null) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(overlay as Record<string, unknown>)) {
      if (v === undefined) continue;
      const b = (base as Record<string, unknown>)[k];
      out[k] = b === undefined ? v : deepMerge(b, v as DeepPartial<typeof b>);
    }
    return out as T;
  }
  return overlay as T;
}
