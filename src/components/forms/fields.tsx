"use client";

import type { ComponentProps, ReactNode } from "react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { Alert } from "../ui/icons";

/*
 * Form rules (§6.2): 52px inputs, 140px textarea, labels always outside the
 * input (no placeholder-as-label), error directly under the field and linked
 * with aria-describedby, accessible required marker, ≥44px touch targets.
 */

const control =
  "w-full rounded-sm border bg-white px-4 text-[16px] text-ink transition-colors placeholder:text-muted/70 hover:border-green-500 focus:border-forest-700 disabled:bg-ivory";

function Label({ htmlFor, children, required, optional }: { htmlFor: string; children: ReactNode; required?: boolean; optional?: boolean }) {
  const { t } = useI18n();
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[14.5px] font-semibold text-ink">
      {children}
      {required && (
        <span className="ml-0.5 text-error" aria-hidden>
          *
        </span>
      )}
      {required && <span className="sr-only"> {t.forms.required}</span>}
      {optional && <span className="ml-1.5 text-[13px] font-normal text-muted">{t.forms.optional}</span>}
    </label>
  );
}

/** Shows a validation message; accepts either an error code or ready text. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  const { t } = useI18n();
  if (!message) return null;
  message = t.errors[message] ?? message;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[14px] leading-5 text-error">
      <Alert size={16} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return [error ? `${id}-error` : "", hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;
}

interface BaseProps {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  optional?: boolean;
  className?: string;
}

export function TextField({ id, label, error, hint, required, optional, className, ...input }: BaseProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        {...input}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint ? "1" : undefined)}
        className={cn(control, "h-[52px]", error ? "border-error" : "border-line")}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[13.5px] leading-5 text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  optional,
  className,
  children,
  ...select
}: BaseProps & Omit<ComponentProps<"select">, "id">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={id}
          {...select}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint ? "1" : undefined)}
          className={cn(control, "h-[52px] appearance-none pr-10", error ? "border-error" : "border-line")}
        >
          {children}
        </select>
        <svg aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[13.5px] leading-5 text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextAreaField({ id, label, error, hint, required, optional, className, ...ta }: BaseProps & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <textarea
        id={id}
        name={id}
        {...ta}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint ? "1" : undefined)}
        className={cn(control, "min-h-[140px] py-3 leading-6", error ? "border-error" : "border-line")}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[13.5px] leading-5 text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Radio group rendered as selectable cards, with fieldset/legend (§19). */
export function RadioCards({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
  columns = 2,
}: {
  name: string;
  legend: ReactNode;
  options: { value: string; label: ReactNode; description?: ReactNode }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  columns?: 2 | 3;
}) {
  const { t } = useI18n();
  return (
    <fieldset id={name} tabIndex={-1} aria-describedby={error ? `${name}-error` : undefined} className="outline-none">
      <legend className="mb-3 text-[14.5px] font-semibold">
        {legend}
        {required && (
          <span className="ml-0.5 text-error" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only"> {t.forms.required}</span>}
      </legend>
      <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "flex min-h-[56px] cursor-pointer items-start gap-3 rounded-sm border bg-white p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-500",
                checked ? "border-forest-700 bg-green-50" : error ? "border-error" : "border-line hover:border-green-500",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-forest-700 focus-visible:shadow-none focus-visible:outline-none"
              />
              <span>
                <span className="block text-[15px] font-semibold leading-5">{o.label}</span>
                {o.description && <span className="mt-1 block text-[13px] leading-5 text-muted">{o.description}</span>}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

export function CheckboxField({
  id,
  checked,
  onChange,
  children,
  error,
  required,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  error?: string;
  required?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-forest-700"
        />
        <label htmlFor={id} className="cursor-pointer text-[15px] leading-6">
          {children}
          {required && <span className="sr-only"> {t.forms.required}</span>}
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Invisible honeypot — bots fill it, people never see it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useI18n();
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_website">{t.forms.honeypot}</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
