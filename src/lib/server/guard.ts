import "server-only";

/**
 * Anti-spam & rate limiting for public forms (§21 "Forms: server validation +
 * anti-spam + rate limiting + audit log").
 *
 * The in-memory limiter is per server instance — fine for a single Node
 * process. For serverless / multi-instance production, back it with Redis or
 * the platform's rate-limit / WAF feature.
 */

const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true as const };
}

export function clientIp(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "local";
}

/** Honeypot + minimum fill time. Returns a reason when the submission looks automated. */
export function botCheck(honeypot: unknown, startedAt: unknown, minMs = 3000): string | null {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return "honeypot";
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) return "missing-timestamp";
  if (Date.now() - started < minMs) return "too-fast";
  return null;
}

/** Magic-byte check so a renamed executable can't pass as a PDF/DOCX/XLSX. */
export function sniffFile(bytes: Uint8Array, name: string): boolean {
  const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
  if (ext === ".pdf") return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
  if (ext === ".docx" || ext === ".xlsx") return bytes[0] === 0x50 && bytes[1] === 0x4b; // PK (OOXML zip)
  return false;
}

export function safeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(-80);
}
