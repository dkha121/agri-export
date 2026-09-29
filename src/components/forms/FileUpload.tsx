"use client";

import { useRef, useState } from "react";
import { MAX_UPLOAD_BYTES, validateUpload } from "@/lib/rfq-schema";
import { useI18n } from "@/i18n/client";
import { cn, formatBytes } from "@/lib/utils";
import { Close, FileText, Upload } from "../ui/icons";
import { FieldError } from "./fields";

/**
 * FileUpload (§6, §16.1): PDF / DOCX / XLSX, max size shown and validated
 * client-side; the server re-validates type, size and magic bytes.
 */
export function FileUpload({
  id,
  file,
  onChange,
  error: externalError,
}: {
  id: string;
  file: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}) {
  const { t } = useI18n();
  const u = t.rfq.upload;
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [drag, setDrag] = useState(false);
  const shownCode = error ?? externalError;
  const shownError = shownCode ? (t.errors[shownCode] ?? shownCode) : undefined;

  const accept = (f: File | undefined | null) => {
    if (!f) return;
    const problem = validateUpload(f);
    if (problem) {
      setError(problem);
      onChange(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError(undefined);
    onChange(f);
  };

  return (
    <div>
      <p id={`${id}-label`} className="mb-2 text-[14.5px] font-semibold">
        {u.label} <span className="ml-1 text-[13px] font-normal text-muted">{u.optional}</span>
      </p>
      {file ? (
        <div className="flex items-center gap-3 rounded-sm border border-forest-700 bg-green-50 p-4">
          <FileText size={22} className="shrink-0 text-forest-700" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold">{file.name}</p>
            <p className="text-[13px] text-muted">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm hover:bg-white"
            aria-label={u.remove(file.name)}
          >
            <Close size={20} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            accept(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed bg-white px-6 py-8 text-center transition-colors",
            drag ? "border-forest-700 bg-green-50" : shownError ? "border-error" : "border-line",
          )}
        >
          <Upload size={26} className="text-green-500" />
          <p className="text-[15px]">
            <span className="hidden sm:inline">{u.drag}</span>
            <button type="button" onClick={() => inputRef.current?.click()} className="min-h-[44px] font-semibold text-forest-700 underline underline-offset-4">
              {u.choose}
            </button>
          </p>
          <p id={`${id}-hint`} className="text-[13px] text-muted">
            {u.hint(formatBytes(MAX_UPLOAD_BYTES))}
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.docx,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint${shownError ? ` ${id}-error` : ""}`}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => accept(e.target.files?.[0])}
      />
      <FieldError id={`${id}-error`} message={shownError} />
      <p className="mt-2 text-[12.5px] leading-5 text-muted">{u.privacy}</p>
    </div>
  );
}
