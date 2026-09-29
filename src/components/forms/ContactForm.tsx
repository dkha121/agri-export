"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import type { CountryOption } from "@/lib/countries";
import { CONTACT_TOPICS, contactSchema } from "@/lib/rfq-schema";
import { Button } from "../ui/Button";
import { Alert, Check } from "../ui/icons";
import { CheckboxField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";

type Errors = Record<string, string>;

export function ContactForm({ countries }: { countries: CountryOption[] }) {
  const { t, l, locale } = useI18n();
  const f = t.contact.form;
  const params = useSearchParams();
  const [values, setValues] = useState({ topic: "", name: "", company: "", email: "", country: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState<string>();
  const startedAt = useRef(0);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const topic = params.get("topic");
    const doc = params.get("doc");
    if (topic && (CONTACT_TOPICS as readonly string[]).includes(topic)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- prefill from URL once
      setValues((v) => ({ ...v, topic, message: doc ? f.prefillDoc(doc) : v.message }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const msg = (code?: string) => (code ? (t.errors[code] ?? code) : undefined);

  const set = (k: keyof typeof values, v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(undefined);
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) {
        const k = String(i.path[0]);
        if (!errs[k]) errs[k] = i.message;
      }
      setErrors(errs);
      requestAnimationFrame(() => alertRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, hp, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setErrors(json.fieldErrors ?? {});
        setServerError(msg(json.error) ?? f.generic);
        setStatus("idle");
        requestAnimationFrame(() => alertRef.current?.focus());
        return;
      }
      track("contact_submit", { topic: values.topic, locale });
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setServerError(f.network);
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-md border border-line bg-white p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check size={24} />
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
          {f.doneTitle}
        </h2>
        <p className="mt-2 text-[16px] text-muted">{f.doneBody(values.email)}</p>
        <p className="mt-6 text-[15px]">
          {f.doneRfqA}{" "}
          <Link href={l("/request-quote")} className="font-semibold text-forest-700 underline underline-offset-4">
            {f.doneRfqLink}
          </Link>{" "}
          {f.doneRfqB}
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <form noValidate onSubmit={submit} className="relative space-y-6 rounded-md border border-line bg-white p-6 sm:p-8" aria-labelledby="contact-form-title">
      <Honeypot value={hp} onChange={setHp} />
      <h2 id="contact-form-title" className="t-h3">
        {f.title}
      </h2>
      {(errorList.length > 0 || serverError) && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="rounded-sm border border-error/40 bg-error/5 p-4 outline-none">
          <p className="flex items-center gap-2 text-[15px] font-bold text-error">
            <Alert size={18} /> {serverError ?? f.checkFields}
          </p>
          {errorList.length > 0 && (
            <ul className="mt-2 space-y-1 pl-7 text-[14px]">
              {errorList.map(([k, m]) => (
                <li key={k}>
                  <a href={`#c-${k}`} className="text-error underline">
                    {msg(m)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <SelectField id="c-topic" label={f.topic} required value={values.topic} error={errors.topic} onChange={(e) => set("topic", e.target.value)}>
        <option value="">{f.selectTopic}</option>
        {CONTACT_TOPICS.map((topic) => (
          <option key={topic} value={topic}>
            {t.contact.topics[topic]}
          </option>
        ))}
      </SelectField>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="c-name" label={f.name} required autoComplete="name" value={values.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
        <TextField id="c-company" label={f.company} required autoComplete="organization" value={values.company} error={errors.company} onChange={(e) => set("company", e.target.value)} />
        <TextField id="c-email" label={f.email} type="email" required autoComplete="email" value={values.email} error={errors.email} onChange={(e) => set("email", e.target.value)} />
        <SelectField id="c-country" label={f.country} required value={values.country} error={errors.country} onChange={(e) => set("country", e.target.value)}>
          <option value="">{f.selectCountry}</option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField id="c-message" label={f.message} required value={values.message} error={errors.message} onChange={(e) => set("message", e.target.value)} maxLength={3000} />
      <CheckboxField id="c-consent" checked={values.consent} onChange={(v) => set("consent", v)} error={errors.consent} required>
        {f.consentA}{" "}
        <Link href={l("/privacy")} target="_blank" className="font-semibold text-forest-700 underline underline-offset-2">
          {f.consentLink}
        </Link>
        .
      </CheckboxField>
      <Button type="submit" loading={status === "sending"} className="w-full sm:w-auto">
        {f.send}
      </Button>
    </form>
  );
}
