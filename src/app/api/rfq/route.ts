import { createDb } from "@/lib/data";
import { collectErrors, rfqSchema, validateUpload } from "@/lib/rfq-schema";
import { botCheck, clientIp, rateLimit, safeFileName, sniffFile } from "@/lib/server/guard";
import { audit, createRfqId, saveRecord, saveUpload } from "@/lib/server/store";

/**
 * POST /api/rfq — authoritative RFQ intake (§16, §21).
 * multipart/form-data: `payload` (JSON), optional `attachment` (PDF/DOCX/XLSX),
 * `hp` honeypot and `startedAt` timestamp for bot detection.
 */
export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`rfq:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    await audit("rfq.rate_limited", { ip });
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const bot = botCheck(form.get("hp"), form.get("startedAt"));
  if (bot) {
    await audit("rfq.blocked", { ip, reason: bot });
    // Respond generically so bots learn nothing.
    return Response.json({ ok: false, error: "blocked" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(String(form.get("payload") ?? "{}"));
  } catch {
    return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const parsed = rfqSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "fix_fields", fieldErrors: collectErrors(payload) },
      { status: 422 },
    );
  }
  const data = parsed.data;
  if (data.productSlug !== "other" && !createDb("en").getProduct(data.productSlug)) {
    return Response.json({ ok: false, error: "unknown_product", fieldErrors: { productSlug: "product_required" } }, { status: 422 });
  }

  const id = await createRfqId();
  let attachment: { name: string; size: number; stored: string } | undefined;
  const file = form.get("attachment");
  if (file && typeof file !== "string" && file.size > 0) {
    const problem = validateUpload(file);
    if (problem) {
      return Response.json({ ok: false, error: problem, fieldErrors: { attachment: problem } }, { status: 422 });
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!sniffFile(bytes, file.name)) {
      await audit("rfq.upload_rejected", { ip, name: file.name });
      return Response.json(
        { ok: false, error: "file_content", fieldErrors: { attachment: "file_content" } },
        { status: 422 },
      );
    }
    // NOTE: production must virus-scan and store in private object storage (§16.1, §21).
    const stored = await saveUpload(id, safeFileName(file.name), bytes);
    attachment = { name: file.name, size: file.size, stored };
  }

  const receivedAt = new Date().toISOString();
  const locale = form.get("locale") === "vi" ? "vi" : "en";
  await saveRecord("rfq", id, { id, receivedAt, status: "new", locale, ip, data, attachment });
  await audit("rfq.received", { id, ip, product: data.productSlug, country: data.country });

  return Response.json({ ok: true, id, receivedAt }, { status: 201 });
}
