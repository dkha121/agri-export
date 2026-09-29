import { randomUUID } from "node:crypto";
import { contactSchema } from "@/lib/rfq-schema";
import { botCheck, clientIp, rateLimit } from "@/lib/server/guard";
import { audit, saveRecord } from "@/lib/server/store";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const bot = botCheck(body.hp, body.startedAt);
  if (bot) {
    await audit("contact.blocked", { ip, reason: bot });
    return Response.json({ ok: false, error: "blocked" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return Response.json({ ok: false, error: "fix_fields", fieldErrors }, { status: 422 });
  }

  const id = `MSG-${randomUUID().slice(0, 8).toUpperCase()}`;
  await saveRecord("contact", id, { id, receivedAt: new Date().toISOString(), ip, data: parsed.data });
  await audit("contact.received", { id, ip, topic: parsed.data.topic });
  return Response.json({ ok: true, id }, { status: 201 });
}
