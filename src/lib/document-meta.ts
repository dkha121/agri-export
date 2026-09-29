import "server-only";
import type { DocumentItem } from "@/content/types";
import type { DocumentRowData } from "@/components/docs/DownloadRow";
import { createDb } from "./data";
import { buildDocumentPdf } from "./document-files";

const cache = new Map<string, number>();

/** Adds the real file size (§19 "Show file type and size"). */
export function withFileSize(docs: DocumentItem[]): DocumentRowData[] {
  return docs.map((d) => {
    if (d.access !== "public") return d;
    if (!cache.has(d.id)) {
      const en = createDb("en").getDocument(d.id);
      cache.set(d.id, en ? buildDocumentPdf(en).byteLength : 0);
    }
    return { ...d, sizeBytes: cache.get(d.id) };
  });
}
