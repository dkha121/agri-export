import { CONTENT_W, MARGIN, PDF_COLORS, PdfDoc, drawFooter, drawHeader, drawKeyValueTable } from "@/lib/pdf";

export interface RfqSummaryInput {
  id: string;
  receivedAt: string;
  brand: string;
  productLabel: string;
  grade: string;
  quantity: string;
  packing: string;
  destination: string;
  incoterm: string;
  deliveryWindow: string;
  company: string;
  contact: string;
  attachment?: string;
  notes?: string;
}

/** "Download RFQ Summary" on the success state (§16.2). Generated in the browser. */
export function buildRfqSummaryPdf(s: RfqSummaryInput): Uint8Array {
  const pdf = new PdfDoc();
  drawHeader(pdf, s.brand, "Request for quote");
  pdf.text(MARGIN, 110, "REQUIREMENT RECEIVED", { size: 8, bold: true, color: PDF_COLORS.green });
  pdf.text(MARGIN, 140, s.id, { size: 24, bold: true });
  pdf.text(MARGIN, 162, `Submitted ${s.receivedAt}`, { size: 9, color: PDF_COLORS.muted });

  const rows: [string, string][] = [
    ["Product", s.productLabel],
    ["Grade / specification", s.grade],
    ["Quantity", s.quantity],
    ["Packing", s.packing],
    ["Destination", s.destination],
    ["Incoterm", s.incoterm],
    ["Delivery window", s.deliveryWindow],
    ["Company", s.company],
    ["Contact", s.contact],
  ];
  if (s.attachment) rows.push(["Attached specification", s.attachment]);
  if (s.notes) rows.push(["Notes", s.notes]);
  const y = drawKeyValueTable(pdf, 190, rows);

  pdf.paragraph(
    MARGIN,
    y + 30,
    "Our export team will review your requirements and reply by email. Please quote the RFQ ID above in any correspondence. This summary is not an offer or a contract.",
    CONTENT_W,
    { size: 9.5, color: PDF_COLORS.muted },
  );
  drawFooter(pdf, s.brand, s.id);
  return pdf.toBytes();
}

export function downloadBytes(bytes: Uint8Array, filename: string, type = "application/pdf") {
  const blob = new Blob([bytes as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
