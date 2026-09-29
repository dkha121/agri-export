import "server-only";
import { randomInt } from "node:crypto";
import { appendFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

/**
 * Development storage adapter for form submissions.
 *
 * Writes JSON records, uploaded files and an append-only audit log under
 * `./data` (git-ignored). In production replace this module with:
 *   - CRM / email routing for leads (§25 "Sales: RFQ routing, CRM/email destination")
 *   - object storage with signed URLs + virus scanning for uploads (§21 "Files")
 *   - a persistent audit log
 * The API routes only depend on the three functions exported here.
 */

const ROOT = path.join(process.cwd(), "data");
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** RFQ-YYYYMMDD-XXXX (§16.2). */
export async function createRfqId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
    const id = `RFQ-${date}-${suffix}`;
    if (!(await exists(path.join(ROOT, "rfq", `${id}.json`)))) return id;
  }
  throw new Error("Could not allocate RFQ id");
}

export async function saveRecord(kind: "rfq" | "contact", id: string, record: unknown) {
  const dir = path.join(ROOT, kind);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${id}.json`), JSON.stringify(record, null, 2), "utf8");
}

export async function saveUpload(id: string, fileName: string, bytes: Uint8Array) {
  const dir = path.join(ROOT, "uploads");
  await mkdir(dir, { recursive: true });
  const stored = `${id}__${fileName}`;
  await writeFile(path.join(dir, stored), bytes);
  return stored;
}

export async function audit(event: string, details: Record<string, unknown>) {
  await mkdir(ROOT, { recursive: true });
  const line = JSON.stringify({ at: new Date().toISOString(), event, ...details });
  await appendFile(path.join(ROOT, "audit.log"), line + "\n", "utf8");
}
