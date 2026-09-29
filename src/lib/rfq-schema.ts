import { z } from "zod";

/**
 * RFQ schema shared by the client wizard (per-step validation) and the API
 * route (authoritative server-side validation) — §16.
 */

export const QUANTITY_UNITS = ["MT", "kg", "20 ft container", "40 ft container", "cartons"] as const;
export const FREQUENCIES = ["One-off / trial order", "Monthly", "Quarterly", "Annual contract"] as const;
export const COMPANY_TYPES = [
  "Importer / Distributor",
  "Food manufacturer",
  "Retail / Private label",
  "Roaster / Processor",
  "Trading company",
  "Other",
] as const;
export const RFQ_INCOTERMS = ["FOB", "CFR", "CIF", "DAP", "Not sure yet"] as const;

export const ALLOWED_UPLOAD_EXT = [".pdf", ".docx", ".xlsx"] as const;
export const ALLOWED_UPLOAD_MIME = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "mail.ru", "qq.com", "163.com", "proton.me", "protonmail.com", "live.com"];
export const isFreeEmail = (email: string) => FREE_EMAIL_DOMAINS.includes(email.split("@")[1]?.toLowerCase() ?? "");

const optionalText = (max: number) => z.string().trim().max(max, { error: "too_long" }).optional().or(z.literal(""));

export const rfqSchema = z
  .object({
    // Step 1 — Product
    category: z.string({ error: "category_required" }).min(1, { error: "category_required" }),
    productSlug: z.string({ error: "product_required" }).min(1, { error: "product_required" }),
    productOther: optionalText(200),
    // Step 2 — Specification
    grade: optionalText(200),
    ownSpec: z.boolean().default(false),
    specNotes: optionalText(2000),
    // Step 3 — Quantity & packaging
    quantity: z.coerce
      .number({ error: "quantity_required" })
      .positive({ error: "quantity_positive" })
      .max(1_000_000, { error: "quantity_too_large" }),
    unit: z.enum(QUANTITY_UNITS, { error: "unit_required" }),
    frequency: z.enum(FREQUENCIES, { error: "frequency_required" }),
    packing: z.string({ error: "packing_required" }).min(1, { error: "packing_required" }),
    // Step 4 — Destination
    country: z.string({ error: "country_required" }).min(2, { error: "country_required" }),
    port: optionalText(120),
    incoterm: z.enum(RFQ_INCOTERMS, { error: "incoterm_required" }),
    deliveryWindow: z.string({ error: "delivery_required" }).min(1, { error: "delivery_required" }),
    // Step 5 — Company
    company: z.string({ error: "company_required" }).trim().min(2, { error: "company_required" }).max(160),
    name: z.string({ error: "name_required" }).trim().min(2, { error: "name_required" }).max(120),
    email: z.email({ error: "email_invalid" }),
    phone: z
      .string({ error: "phone_required" })
      .trim()
      .min(6, { error: "phone_required" })
      .max(40)
      .regex(/^[+()\d\s.-]+$/, { error: "phone_invalid" }),
    companyType: z.enum(COMPANY_TYPES, { error: "company_type_required" }),
    message: optionalText(2000),
    consent: z.literal(true, { error: "consent_required" }),
  })
  .superRefine((v, ctx) => {
    for (const issue of crossFieldIssues(v)) ctx.addIssue({ code: "custom", path: [issue.field], message: issue.message });
  });

/**
 * Cross-field rules. Kept outside the zod object so the wizard can check them
 * per step — zod only runs refinements once every base field is valid.
 */
function crossFieldIssues(v: { productSlug?: unknown; productOther?: unknown; ownSpec?: unknown; grade?: unknown }) {
  const issues: { field: string; message: string }[] = [];
  const text = (x: unknown) => (typeof x === "string" ? x.trim() : "");
  if (v.productSlug === "other" && !text(v.productOther)) {
    issues.push({ field: "productOther", message: "product_other_required" });
  }
  // Buyers may upload their own spec instead of choosing a grade (§16.1).
  if (!v.ownSpec && !text(v.grade)) {
    issues.push({ field: "grade", message: "grade_required" });
  }
  return issues;
}

export type RfqInput = z.input<typeof rfqSchema>;
export type RfqData = z.output<typeof rfqSchema>;

/**
 * Validation messages are stable codes (e.g. "email_invalid"); the UI maps
 * them to the visitor's language via the `errors` dictionary.
 */

/** Fields validated at each wizard step. */
export const RFQ_STEPS = [
  { id: "product", title: "Product", fields: ["category", "productSlug", "productOther"] },
  { id: "spec", title: "Specification", fields: ["grade", "ownSpec", "specNotes"] },
  { id: "quantity", title: "Qty / Pack", fields: ["quantity", "unit", "frequency", "packing"] },
  { id: "destination", title: "Destination", fields: ["country", "port", "incoterm", "deliveryWindow"] },
  { id: "company", title: "Company", fields: ["company", "name", "email", "phone", "companyType", "message", "consent"] },
] as const;

export type FieldErrors = Record<string, string>;

export function collectErrors(input: unknown, fields?: readonly string[]): FieldErrors {
  const result = rfqSchema.safeParse(input);
  if (result.success) return {};
  const errors: FieldErrors = {};
  const add = (key: string, message: string) => {
    if (!key || errors[key] || (fields && !fields.includes(key))) return;
    errors[key] = message;
  };
  for (const issue of result.error.issues) add(String(issue.path[0] ?? ""), issue.message);
  if (input && typeof input === "object") {
    for (const issue of crossFieldIssues(input as Record<string, unknown>)) add(issue.field, issue.message);
  }
  return errors;
}

export function validateUpload(file: { name: string; size: number; type: string }): string | null {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!(ALLOWED_UPLOAD_EXT as readonly string[]).includes(ext)) return "file_type";
  if (file.type && !ALLOWED_UPLOAD_MIME.includes(file.type)) return "file_mime";
  if (file.size > MAX_UPLOAD_BYTES) return "file_size";
  if (file.size === 0) return "file_empty";
  return null;
}

/* ------------------------------------------------------------------ Contact form */

export const contactSchema = z.object({
  topic: z.string().min(1, { error: "topic_required" }),
  name: z.string().trim().min(2, { error: "name_required" }).max(120),
  company: z.string().trim().min(2, { error: "company_required" }).max(160),
  email: z.email({ error: "email_invalid" }),
  country: z.string().min(2, { error: "country_required" }),
  message: z.string().trim().min(10, { error: "message_short" }).max(3000),
  consent: z.literal(true, { error: "consent_required" }),
});
export type ContactData = z.output<typeof contactSchema>;

export const CONTACT_TOPICS = ["sourcing", "samples", "documents", "eudr", "fsvp", "retail-brand", "private-label", "visit", "other"] as const;
