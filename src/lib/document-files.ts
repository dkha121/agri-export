import "server-only";
import { company } from "@/content/company";
import type { DocumentItem } from "@/content/types";
import { createDb } from "@/lib/data";

// Controlled export documents are issued in English (WinAnsi PDF fonts).
const { getCategory, getCertificates, getClaimableCertificates, getFacility, getOrigin, getProduct, getSpecRows } = createDb("en");
import { formatDate } from "@/lib/utils";
import { CONTENT_W, MARGIN, PDF_COLORS, PdfDoc, drawFooter, drawHeader, drawKeyValueTable } from "@/lib/pdf";

/**
 * Generates the downloadable PDF for a document record. Until the verified
 * file is uploaded to the document library, every file is stamped as a
 * placeholder so it cannot be mistaken for a controlled document (§24).
 * Files are always generated from the English record.
 */
export function buildDocumentPdf(doc: DocumentItem): Uint8Array {
  if (doc.type === "Specification" && doc.productSlugs[0]) {
    const bytes = buildSpecSheet(doc);
    if (bytes) return bytes;
  }
  const pdf = new PdfDoc({ watermark: doc.sample ? "SAMPLE" : "PLACEHOLDER" });
  drawHeader(pdf, company.brand, doc.type);
  let y = 110;
  pdf.text(MARGIN, y, doc.type.toUpperCase(), { size: 8, bold: true, color: PDF_COLORS.green });
  y = pdf.paragraph(MARGIN, y + 22, doc.title, CONTENT_W, { size: 20, bold: true, leading: 26 });
  if (doc.description) y = pdf.paragraph(MARGIN, y + 6, doc.description, CONTENT_W, { size: 11, color: PDF_COLORS.muted });

  const rows: [string, string][] = [
    ["Document ID", doc.id],
    ["Version", doc.version],
    ["Published", formatDate(doc.publishedAt)],
    ["Language", doc.locale],
    ["Access", doc.access === "public" ? "Public" : "On request"],
  ];
  if (doc.type === "Certificate") {
    const cert = getCertificates().find((c) => c.documentId === doc.id);
    if (cert) {
      rows.push(
        ["Scheme", cert.scheme],
        ["Legal entity / facility", cert.entity],
        ["Scope", cert.scope],
        ["Certificate no.", cert.number ?? "Not published"],
        ["Valid", `${formatDate(cert.issued)} – ${formatDate(cert.expires)}`],
        ["Status", cert.status.replace("-", " ")],
      );
    }
  }
  if (doc.type === "Sample COA") {
    rows.push(
      ["Lot code", "VN-XX-26-0000 (example)"],
      ["Moisture", "[result] % — limit per contract"],
      ["Aflatoxin B1", "[result] µg/kg — accredited lab"],
      ["Total aflatoxins", "[result] µg/kg"],
      ["Salmonella", "Not detected / 25 g (example format)"],
      ["Laboratory", "[ISO/IEC 17025 accredited lab name]"],
    );
  }
  y = drawKeyValueTable(pdf, y + 20, rows);

  pdf.rect(MARGIN, y + 24, CONTENT_W, 70, PDF_COLORS.ivory);
  pdf.text(MARGIN + 14, y + 46, doc.sample ? "REFERENCE ONLY — SAMPLE DOCUMENT" : "PLACEHOLDER FILE", {
    size: 9,
    bold: true,
    color: PDF_COLORS.error,
  });
  pdf.paragraph(
    MARGIN + 14,
    y + 62,
    doc.sample
      ? "This sample shows the layout and parameters we report. It is not evidence for any shipment; lot-specific COAs are issued per contract."
      : "This file is generated for the website preview. Replace it with the verified, version-controlled document before production.",
    CONTENT_W - 28,
    { size: 9, color: PDF_COLORS.ink },
  );
  drawFooter(pdf, `${company.legalName} · ${company.salesEmail}`, `${doc.id} · ${doc.version}`);
  return pdf.toBytes();
}

function buildSpecSheet(doc: DocumentItem): Uint8Array | null {
  const product = getProduct(doc.productSlugs[0]);
  if (!product) return null;
  const category = getCategory(product.category);
  const pdf = new PdfDoc({ watermark: product.verified ? undefined : "ILLUSTRATIVE" });
  drawHeader(pdf, company.brand, "Product specification");

  let y = 108;
  pdf.text(MARGIN, y, (category?.name ?? product.category).toUpperCase(), { size: 8, bold: true, color: PDF_COLORS.green });
  y = pdf.paragraph(MARGIN, y + 24, product.name, CONTENT_W, { size: 22, bold: true, leading: 28 });
  const origin = product.originIds.map((id) => getOrigin(id)?.name).filter(Boolean).join(" · ");
  pdf.text(MARGIN, y + 4, `Origin: ${origin}, Vietnam   ·   Crop: ${product.crop}   ·   ${doc.version} · ${formatDate(doc.publishedAt)}`, {
    size: 9,
    color: PDF_COLORS.muted,
  });
  y = pdf.paragraph(MARGIN, y + 28, product.overview, CONTENT_W, { size: 10, leading: 15 });

  pdf.text(MARGIN, y + 20, "SPECIFICATION", { size: 8, bold: true, color: PDF_COLORS.green });
  const specRows = getSpecRows(product).map((r) => [r.label, r.value ?? "Pending verification"] as [string, string]);
  y = drawKeyValueTable(pdf, y + 30, specRows);

  pdf.text(MARGIN, y + 26, "PACKING & LOGISTICS", { size: 8, bold: true, color: PDF_COLORS.green });
  const facility = getFacility(product.facilityId);
  const certs = getClaimableCertificates(product.certificateIds);
  y = drawKeyValueTable(pdf, y + 36, [
    ["Packing options", product.packings.map((p) => `${p.name} ${p.netWeight}`).join("; ")],
    ["Container loading", product.packings.map((p) => p.loading).filter(Boolean).join("; ") || "On request"],
    ["Loading ports", product.loadingPorts.join(", ")],
    ["Incoterms", product.incoterms.join(", ")],
    ["MOQ", product.moq ?? "On request"],
    ["Processing facility", facility?.name ?? "Partner facility — disclosed on request"],
    ["Certifications (valid)", certs.length ? certs.map((c) => `${c.schemeShort} (${c.entity})`).join("; ") : "None claimed"],
  ]);

  const footerLeft = `${company.legalName} · ${company.salesEmail} · ${company.phone}`;
  let noteY = y + 28;
  if (noteY > 745) {
    drawFooter(pdf, footerLeft, `${doc.id} · page 1`);
    pdf.addPage();
    drawHeader(pdf, company.brand, "Product specification (cont.)");
    noteY = 100;
  }
  pdf.paragraph(
    MARGIN,
    noteY,
    "Values are illustrative for the website preview and must be replaced by the verified specification. Final specification is agreed per contract and confirmed by pre-shipment sample.",
    CONTENT_W,
    { size: 8.5, color: PDF_COLORS.muted },
  );
  drawFooter(pdf, footerLeft, pdf.pageCount > 1 ? `${doc.id} · page ${pdf.pageCount}` : doc.id);
  return pdf.toBytes();
}
