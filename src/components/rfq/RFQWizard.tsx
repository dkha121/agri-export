"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { COUNTRIES, type CountryOption } from "@/lib/countries";
import {
  COMPANY_TYPES,
  FREQUENCIES,
  type FieldErrors,
  QUANTITY_UNITS,
  RFQ_INCOTERMS,
  RFQ_STEPS,
  collectErrors,
  isFreeEmail,
} from "@/lib/rfq-schema";
import { buildRfqSummaryPdf, downloadBytes } from "@/lib/rfq-summary";
import { cn, formatDate } from "@/lib/utils";
import { FileUpload } from "../forms/FileUpload";
import { CheckboxField, Honeypot, RadioCards, SelectField, TextAreaField, TextField } from "../forms/fields";
import { Button } from "../ui/Button";
import { Alert, ArrowLeft, ArrowRight, Check, Download, Plus } from "../ui/icons";

export interface RfqProductOption {
  slug: string;
  name: string;
  /** English name for the (English) RFQ summary PDF. */
  nameEn: string;
  category: string;
  grades: string[];
  packings: string[];
}
export interface RfqCategoryOption {
  key: string;
  name: string;
}

interface Draft {
  category: string;
  productSlug: string;
  productOther: string;
  grade: string;
  ownSpec: boolean;
  specNotes: string;
  quantity: string;
  unit: string;
  frequency: string;
  packing: string;
  country: string;
  port: string;
  incoterm: string;
  deliveryWindow: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  companyType: string;
  message: string;
  consent: boolean;
}

const EMPTY: Draft = {
  category: "",
  productSlug: "",
  productOther: "",
  grade: "",
  ownSpec: false,
  specNotes: "",
  quantity: "",
  unit: "MT",
  frequency: "",
  packing: "",
  country: "",
  port: "",
  incoterm: "",
  deliveryWindow: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  companyType: "",
  message: "",
  consent: false,
};

const STORAGE_KEY = "rfq-draft-v1";
const DELIVERY_WINDOWS = ["Within 1 month", "1 – 3 months", "3 – 6 months", "6 – 12 months", "Flexible / annual contract"];

/**
 * RFQ Wizard (§16): Product → Specification → Quantity/Packaging →
 * Destination/Incoterm → Company/Upload. Values persist in sessionStorage,
 * each step validates before continuing, the server re-validates everything.
 */
export function RFQWizard({
  products,
  categories,
  countries,
  brand,
  responseSla,
}: {
  products: RfqProductOption[];
  categories: RfqCategoryOption[];
  countries: CountryOption[];
  brand: string;
  responseSla: string | null;
}) {
  const { t, l, locale } = useI18n();
  const r = t.rfq;
  const errText = (code?: string) => (code ? (t.errors[code] ?? code) : undefined);
  const countryLabel = (v: string) => countries.find((c) => c.value === v)?.label ?? v;
  const params = useSearchParams();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string>();
  const [result, setResult] = useState<{ id: string; receivedAt: string; draft: Draft; fileName?: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const startedAt = useRef(0);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Restore draft, then apply query-string preselection (?product=&qty=&unit=&country=&category=).
  useEffect(() => {
    startedAt.current = Date.now();
    let restored: Draft = EMPTY;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = { ...EMPTY, ...JSON.parse(raw) };
    } catch {
      /* storage unavailable — start fresh */
    }
    const slug = params.get("product");
    const product = products.find((p) => p.slug === slug);
    const next = { ...restored };
    if (product) {
      if (next.productSlug !== product.slug) {
        next.grade = "";
        next.packing = "";
      }
      next.productSlug = product.slug;
      next.category = product.category;
    } else if (params.get("category") && categories.some((c) => c.key === params.get("category"))) {
      next.category = params.get("category")!;
    }
    const qty = params.get("qty");
    if (qty && Number(qty) > 0) next.quantity = qty;
    const unit = params.get("unit");
    if (unit && (QUANTITY_UNITS as readonly string[]).includes(unit)) next.unit = unit;
    const country = params.get("country");
    if (country && COUNTRIES.includes(country)) next.country = country;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage/URL
    setDraft(next);
    setStep(product ? 1 : 0);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }, [draft, hydrated]);

  const set = useCallback(<K extends keyof Draft>(key: K, value: Draft[K]) => {
    if (!started.current) {
      started.current = true;
      track("rfq_start", { source: "wizard" });
    }
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }, []);

  const product = products.find((p) => p.slug === draft.productSlug);
  const categoryProducts = products.filter((p) => p.category === draft.category);
  const gradeOptions = product?.grades ?? [];
  const packingOptions = [...(product?.packings ?? []), ...r.packingExtra];

  const payload = () => ({ ...draft, quantity: draft.quantity === "" ? undefined : Number(draft.quantity) });

  const focusTop = () => {
    requestAnimationFrame(() => {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const validateStep = (index: number) => collectErrors(payload(), RFQ_STEPS[index].fields);

  const next = () => {
    const errs = validateStep(step);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    track("rfq_step_complete", { step: RFQ_STEPS[step].id });
    setStep((s) => Math.min(s + 1, RFQ_STEPS.length - 1));
    focusTop();
  };

  const back = () => {
    setShowSummary(false);
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    focusTop();
  };

  const goTo = (index: number) => {
    if (index >= step) return;
    setShowSummary(false);
    setErrors({});
    setStep(index);
    focusTop();
  };

  const submit = async () => {
    const errs = collectErrors(payload());
    if (Object.keys(errs).length) {
      const firstStep = RFQ_STEPS.findIndex((s) => s.fields.some((f) => errs[f]));
      setErrors(errs);
      setShowSummary(true);
      if (firstStep !== step) setStep(firstStep);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSubmitting(true);
    setServerError(undefined);
    track("rfq_submit", { product: draft.productSlug });
    try {
      const fd = new FormData();
      fd.set("payload", JSON.stringify(payload()));
      fd.set("hp", hp);
      fd.set("startedAt", String(startedAt.current));
      fd.set("locale", locale);
      if (file) fd.set("attachment", file);
      const res = await fetch("/api/rfq", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        track("rfq_error", { status: res.status });
        if (json.fieldErrors && Object.keys(json.fieldErrors).length) {
          const fe = json.fieldErrors as FieldErrors;
          setErrors(fe);
          const firstStep = RFQ_STEPS.findIndex((s) => s.fields.some((f) => fe[f]));
          if (firstStep >= 0) setStep(firstStep);
          setShowSummary(true);
        }
        setServerError(errText(json.error) ?? r.genericError);
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      track("rfq_complete", { id: json.id, product: draft.productSlug });
      setResult({ id: json.id, receivedAt: json.receivedAt, draft, fileName: file?.name });
      focusTop();
    } catch {
      setServerError(r.networkError);
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  };

  const productLabel = (d: Draft) =>
    d.productSlug === "other" ? d.productOther || r.success.otherProduct : products.find((p) => p.slug === d.productSlug)?.name ?? "—";
  // The RFQ summary PDF is an English working document for the sales team.
  const productLabelEn = (d: Draft) =>
    d.productSlug === "other" ? d.productOther || "Other product" : products.find((p) => p.slug === d.productSlug)?.nameEn ?? "—";

  const addAnother = () => {
    const keep: Draft = {
      ...EMPTY,
      country: draft.country,
      port: draft.port,
      incoterm: draft.incoterm,
      deliveryWindow: draft.deliveryWindow,
      company: draft.company,
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      companyType: draft.companyType,
    };
    setDraft(keep);
    setFile(null);
    setResult(null);
    setErrors({});
    setStep(0);
    focusTop();
  };

  const downloadSummary = () => {
    if (!result) return;
    const d = result.draft;
    const bytes = buildRfqSummaryPdf({
      id: result.id,
      receivedAt: formatDate(result.receivedAt),
      brand,
      productLabel: productLabelEn(d),
      grade: d.ownSpec ? "Buyer's own specification" + (d.grade ? ` (ref: ${d.grade})` : "") : d.grade,
      quantity: `${d.quantity} ${d.unit} · ${d.frequency}`,
      packing: d.packing,
      destination: [d.port, d.country].filter(Boolean).join(", "),
      incoterm: d.incoterm,
      deliveryWindow: d.deliveryWindow,
      company: `${d.company} (${d.companyType})`,
      contact: `${d.name} · ${d.email} · ${d.phone}`,
      attachment: result.fileName,
      notes: [d.specNotes, d.message].filter(Boolean).join(" / ") || undefined,
    });
    downloadBytes(bytes, `${result.id}-summary.pdf`);
    track("document_download", { id: "rfq-summary" });
  };

  /* ------------------------------------------------------------------ Success (§16.2) */
  if (result) {
    const d = result.draft;
    return (
      <div className="mx-auto max-w-[760px]">
        <div className="rounded-md border border-line bg-white p-6 sm:p-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
            <Check size={28} strokeWidth={2.25} />
          </span>
          <h2 ref={headingRef} tabIndex={-1} className="t-h2 mt-6 outline-none">
            {r.success.title}
          </h2>
          <p className="mt-3 text-[16px] text-muted">
            {r.success.body(d.email)}
            {responseSla ? ` ${responseSla}.` : ""}
          </p>
          <div className="mt-8 rounded-sm bg-ivory p-5">
            <p className="t-label text-muted">{r.success.id}</p>
            <p className="mt-1 font-mono text-[24px] font-semibold tracking-[0.04em] text-forest-700">{result.id}</p>
          </div>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {[
              [r.success.product, productLabel(d)],
              [r.success.quantity, `${d.quantity} ${r.options.units[d.unit] ?? d.unit}`],
              [r.success.destination, [d.port, countryLabel(d.country)].filter(Boolean).join(", ")],
              [r.success.incoterm, d.incoterm],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-4">
                <dt className="t-label text-muted">{k}</dt>
                <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={downloadSummary} icon={<Download size={18} />}>
              {r.success.download}
            </Button>
            <Button variant="secondary" onClick={addAnother} icon={<Plus size={18} />}>
              {r.success.another}
            </Button>
          </div>
          <p className="mt-6 text-[14px] text-muted">
            {r.success.browseA}{" "}
            <Link href={l("/downloads")} className="font-semibold text-forest-700 underline underline-offset-4">
              {r.success.browseLink}
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors);
  const stepMeta = RFQ_STEPS[step];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-8">
        {/* Progress (§6 RFQWizard: 5 steps + progress) */}
        <nav aria-label={r.progress} className="mb-8">
          <p className="mb-3 text-[13px] font-semibold text-muted sm:hidden">{r.stepOf(step + 1, RFQ_STEPS.length)}</p>
          <ol className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {RFQ_STEPS.map((s, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    disabled={i >= step}
                    aria-current={current ? "step" : undefined}
                    className="group flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
                  >
                    <span className={cn("h-1 w-full rounded-full", done ? "bg-forest-700" : current ? "bg-gold-500" : "bg-line")} />
                    <span className={cn("hidden text-[12px] font-bold uppercase tracking-[0.08em] sm:block", current ? "text-ink" : done ? "text-forest-700 group-hover:underline" : "text-muted")}>
                      <span className="mr-1">{String(i + 1).padStart(2, "0")}</span>
                      {r.steps[i]}
                    </span>
                    <span className="sr-only">
                      {done ? r.stepDone : current ? r.stepCurrent : r.stepTodo}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (step === RFQ_STEPS.length - 1) submit();
            else next();
          }}
          className="relative rounded-md border border-line bg-white p-5 sm:p-8"
          aria-labelledby="rfq-step-title"
        >
          <Honeypot value={hp} onChange={setHp} />
          <p className="t-label text-green-500">{r.stepOf(step + 1, RFQ_STEPS.length)}</p>
          <h2 id="rfq-step-title" ref={headingRef} tabIndex={-1} className="t-h3 mt-2 outline-none">
            {r.stepTitles[step]}
          </h2>

          {(showSummary && errorList.length > 0) || serverError ? (
            <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-sm border border-error/40 bg-error/5 p-4 outline-none">
              <p className="flex items-center gap-2 text-[15px] font-bold text-error">
                <Alert size={18} /> {serverError ?? r.checkFields(errorList.length)}
              </p>
              {errorList.length > 0 && (
                <ul className="mt-2 space-y-1 pl-7 text-[14px]">
                  {errorList.map(([k, msg]) => (
                    <li key={k}>
                      <a href={`#${k === "attachment" ? "attachment" : k}`} className="text-error underline underline-offset-2">
                        {errText(msg)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          <div className="mt-8 space-y-7">
            {/* STEP 1 — Product */}
            {stepMeta.id === "product" && (
              <>
                <RadioCards
                  name="category"
                  legend={r.category}
                  required
                  columns={3}
                  value={draft.category}
                  error={errors.category}
                  onChange={(v) => {
                    set("category", v);
                    set("productSlug", "");
                    set("grade", "");
                    set("packing", "");
                  }}
                  options={categories.map((c) => ({ value: c.key, label: c.name }))}
                />
                {draft.category && (
                  <SelectField
                    id="productSlug"
                    label={r.product}
                    required
                    value={draft.productSlug}
                    error={errors.productSlug}
                    onChange={(e) => {
                      set("productSlug", e.target.value);
                      set("grade", "");
                      set("packing", "");
                    }}
                  >
                    <option value="">{r.selectProduct}</option>
                    {categoryProducts.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                    <option value="other">{r.other}</option>
                  </SelectField>
                )}
                {draft.productSlug === "other" && (
                  <TextField
                    id="productOther"
                    label={r.whichProduct}
                    required
                    value={draft.productOther}
                    error={errors.productOther}
                    onChange={(e) => set("productOther", e.target.value)}
                    maxLength={200}
                  />
                )}
              </>
            )}

            {/* STEP 2 — Specification */}
            {stepMeta.id === "spec" && (
              <>
                <CheckboxField id="ownSpec" checked={draft.ownSpec} onChange={(v) => set("ownSpec", v)}>
                  <strong>{r.ownSpec}</strong>
                  <span className="block text-[14px] text-muted">{r.ownSpecHint}</span>
                </CheckboxField>
                {!draft.ownSpec &&
                  (gradeOptions.length ? (
                    <RadioCards
                      name="grade"
                      legend={r.grade}
                      required
                      value={draft.grade}
                      error={errors.grade}
                      onChange={(v) => set("grade", v)}
                      options={gradeOptions.map((g) => ({ value: g, label: g }))}
                    />
                  ) : (
                    <TextField
                      id="grade"
                      label={r.grade}
                      required
                      value={draft.grade}
                      error={errors.grade}
                      onChange={(e) => set("grade", e.target.value)}
                      hint={r.gradeHint}
                    />
                  ))}
                <TextAreaField
                  id="specNotes"
                  label={draft.ownSpec ? r.notesOwn : r.notesCustom}
                  optional
                  value={draft.specNotes}
                  error={errors.specNotes}
                  onChange={(e) => set("specNotes", e.target.value)}
                  maxLength={2000}
                  hint={r.notesHint}
                />
              </>
            )}

            {/* STEP 3 — Quantity & packaging */}
            {stepMeta.id === "quantity" && (
              <>
                <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
                  <TextField
                    id="quantity"
                    label={r.quantity}
                    required
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={draft.quantity}
                    error={errors.quantity}
                    onChange={(e) => set("quantity", e.target.value)}
                  />
                  <SelectField id="unit" label={r.unit} required value={draft.unit} error={errors.unit} onChange={(e) => set("unit", e.target.value)}>
                    {QUANTITY_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {r.options.units[u] ?? u}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <RadioCards
                  name="frequency"
                  legend={r.frequency}
                  required
                  value={draft.frequency}
                  error={errors.frequency}
                  onChange={(v) => set("frequency", v)}
                  options={FREQUENCIES.map((f) => ({ value: f, label: r.options.frequencies[f] ?? f }))}
                />
                <RadioCards
                  name="packing"
                  legend={r.packing}
                  required
                  value={draft.packing}
                  error={errors.packing}
                  onChange={(v) => set("packing", v)}
                  options={packingOptions.map((p) => ({ value: p, label: p }))}
                />
              </>
            )}

            {/* STEP 4 — Destination */}
            {stepMeta.id === "destination" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField id="country" label={r.country} required value={draft.country} error={errors.country} onChange={(e) => set("country", e.target.value)}>
                    <option value="">{r.selectCountry}</option>
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </SelectField>
                  <TextField
                    id="port"
                    label={r.port}
                    optional
                    value={draft.port}
                    error={errors.port}
                    onChange={(e) => set("port", e.target.value)}
                    hint={r.portHint}
                    maxLength={120}
                  />
                </div>
                <RadioCards
                  name="incoterm"
                  legend={r.incoterm}
                  required
                  columns={3}
                  value={draft.incoterm}
                  error={errors.incoterm}
                  onChange={(v) => set("incoterm", v)}
                  options={RFQ_INCOTERMS.map((term) => ({
                    value: term,
                    label: term === "Not sure yet" ? r.incotermDesc[term] : term,
                    description: term === "Not sure yet" ? undefined : r.incotermDesc[term],
                  }))}
                />
                <SelectField
                  id="deliveryWindow"
                  label={r.delivery}
                  required
                  value={draft.deliveryWindow}
                  error={errors.deliveryWindow}
                  onChange={(e) => set("deliveryWindow", e.target.value)}
                >
                  <option value="">{r.select}</option>
                  {DELIVERY_WINDOWS.map((w) => (
                    <option key={w} value={w}>
                      {r.options.delivery[w] ?? w}
                    </option>
                  ))}
                </SelectField>
              </>
            )}

            {/* STEP 5 — Company */}
            {stepMeta.id === "company" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField id="company" label={r.company} required autoComplete="organization" value={draft.company} error={errors.company} onChange={(e) => set("company", e.target.value)} />
                  <TextField id="name" label={r.name} required autoComplete="name" value={draft.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
                  <TextField
                    id="email"
                    label={r.email}
                    required
                    type="email"
                    autoComplete="email"
                    value={draft.email}
                    error={errors.email}
                    onChange={(e) => set("email", e.target.value)}
                    hint={draft.email && isFreeEmail(draft.email) ? r.freeEmail : undefined}
                  />
                  <TextField
                    id="phone"
                    label={r.phone}
                    required
                    type="tel"
                    autoComplete="tel"
                    value={draft.phone}
                    error={errors.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    hint={r.phoneHint}
                  />
                </div>
                <SelectField id="companyType" label={r.companyType} required value={draft.companyType} error={errors.companyType} onChange={(e) => set("companyType", e.target.value)}>
                  <option value="">{r.select}</option>
                  {COMPANY_TYPES.map((c) => (
                    <option key={c} value={c}>
                      {r.options.companyTypes[c] ?? c}
                    </option>
                  ))}
                </SelectField>
                <FileUpload id="attachment" file={file} onChange={setFile} error={errors.attachment} />
                <TextAreaField id="message" label={r.message} optional value={draft.message} error={errors.message} onChange={(e) => set("message", e.target.value)} maxLength={2000} />
                <CheckboxField id="consent" checked={draft.consent} onChange={(v) => set("consent", v)} error={errors.consent} required>
                  {r.consentA(brand)}{" "}
                  <Link href={l("/privacy")} target="_blank" className="font-semibold text-forest-700 underline underline-offset-2">
                    {r.consentLink}
                  </Link>
                  .
                </CheckboxField>
              </>
            )}
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={back} icon={undefined}>
                <ArrowLeft size={18} /> {r.back}
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}
            {step < RFQ_STEPS.length - 1 ? (
              <Button type="submit" disabled={!hydrated} icon={<ArrowRight size={18} />}>
                {r.continue}
              </Button>
            ) : (
              <Button type="submit" disabled={!hydrated} loading={submitting}>
                {r.send}
              </Button>
            )}
          </div>
        </form>
        <p className="mt-4 text-[13px] text-muted">{r.savedNote}</p>
      </div>

      {/* Live summary */}
      <aside className="hidden lg:col-span-4 lg:block" aria-label={r.summaryAria}>
        <div className="sticky top-[92px] rounded-md border border-line bg-white p-6">
          <p className="t-label text-muted">{r.summaryTitle}</p>
          <dl className="mt-4 space-y-3 text-[14px]">
            {[
              [r.summary.product, draft.productSlug ? productLabel(draft) : ""],
              [r.summary.spec, draft.ownSpec ? r.ownSpecShort : draft.grade],
              [r.summary.quantity, draft.quantity ? `${draft.quantity} ${r.options.units[draft.unit] ?? draft.unit}` : ""],
              [r.summary.packing, draft.packing],
              [r.summary.destination, [draft.port, draft.country && countryLabel(draft.country)].filter(Boolean).join(", ")],
              [r.summary.incoterm, draft.incoterm],
              [r.summary.delivery, draft.deliveryWindow ? (r.options.delivery[draft.deliveryWindow] ?? draft.deliveryWindow) : ""],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line pb-3 last:border-b-0">
                <dt className="text-muted">{k}</dt>
                <dd className={cn("text-right font-semibold", !v && "font-normal text-muted")}>{v || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[12.5px] leading-5 text-muted">
            {r.noCommitment} {responseSla ?? r.reviewNote}
          </p>
        </div>
      </aside>
    </div>
  );
}
