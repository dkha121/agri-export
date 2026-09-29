/**
 * Minimal dependency-free PDF writer (A4, Helvetica, WinAnsi).
 * Runs in both the browser (RFQ summary) and on the server (spec sheets,
 * placeholder documents). Good enough for tabular data sheets; replace with
 * a full PDF pipeline if richer layouts are needed later.
 */

type RGB = [number, number, number];

const hex = (h: string): RGB => {
  const n = parseInt(h.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export const PDF_COLORS = {
  forest: hex("#102A24"),
  forest700: hex("#163F35"),
  green: hex("#3F725D"),
  gold: hex("#D4A53A"),
  ivory: hex("#F7F5EF"),
  sand: hex("#E9E3D5"),
  ink: hex("#14201C"),
  muted: hex("#56645E"),
  border: hex("#D8DED9"),
  white: hex("#FFFFFF"),
  error: hex("#A9493D"),
};

export const PAGE_W = 595.28;
export const PAGE_H = 841.89;

const WIN_ANSI: Record<string, number> = {
  "€": 0x80, "‚": 0x82, "„": 0x84, "…": 0x85, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95,
  "–": 0x96, "—": 0x97, "™": 0x99,
};
const REPLACE: Record<string, string> = { "≤": "<=", "≥": ">=", "≈": "~", "₂": "2", "→": "->", "×": "x", "−": "-", "ư": "u", "ơ": "o", "đ": "d", "Đ": "D", "Ư": "U", "Ơ": "O" };

function encode(text: string): string {
  let out = "";
  for (const raw of text) {
    let ch = REPLACE[raw] ?? raw;
    if (ch.length === 1 && ch.charCodeAt(0) > 255 && !WIN_ANSI[ch]) {
      ch = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
    }
    for (const c of ch) {
      const code = WIN_ANSI[c] ?? c.charCodeAt(0);
      if (c === "(" || c === ")" || c === "\\") out += "\\" + c;
      else if (code < 32) continue;
      else if (code < 127) out += c;
      else if (code <= 255) out += "\\" + code.toString(8).padStart(3, "0");
      else out += "?";
    }
  }
  return out;
}

/** Approximate Helvetica width — sufficient for wrapping body text. */
export function textWidth(text: string, size: number, bold = false) {
  let w = 0;
  for (const c of text) {
    if ("il.,:;'|!".includes(c)) w += 0.26;
    else if ("mwMW".includes(c)) w += 0.84;
    else if (c === " ") w += 0.28;
    else if (c >= "A" && c <= "Z") w += 0.66;
    else if (c >= "0" && c <= "9") w += 0.556;
    else w += 0.52;
  }
  return w * size * (bold ? 1.06 : 1);
}

export function wrap(text: string, maxWidth: number, size: number, bold = false): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next, size, bold) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

interface TextOpts {
  size?: number;
  bold?: boolean;
  color?: RGB;
}

export class PdfDoc {
  private pages: string[][] = [];
  private current: string[] = [];
  private watermarkText?: string;

  constructor(opts: { watermark?: string } = {}) {
    this.watermarkText = opts.watermark;
    this.addPage();
  }

  addPage() {
    this.current = [];
    this.pages.push(this.current);
  }

  get pageCount() {
    return this.pages.length;
  }

  /** Semi-transparent diagonal stamp drawn on top of the page content. */
  private watermarkOps(text: string) {
    const [r, g, b] = PDF_COLORS.gold;
    const angle = Math.PI / 5;
    const c = Math.cos(angle).toFixed(4);
    const s = Math.sin(angle).toFixed(4);
    return `q /GS1 gs ${r} ${g} ${b} rg BT /F2 72 Tf ${c} ${s} -${s} ${c} 120 180 Tm (${encode(text)}) Tj ET Q`;
  }

  /** y is measured from the top of the page. */
  text(x: number, y: number, str: string, { size = 10, bold = false, color = PDF_COLORS.ink }: TextOpts = {}) {
    const [r, g, b] = color;
    this.current.push(
      `BT ${r} ${g} ${b} rg /${bold ? "F2" : "F1"} ${size} Tf ${x.toFixed(2)} ${(PAGE_H - y).toFixed(2)} Td (${encode(str)}) Tj ET`,
    );
  }

  /** Writes wrapped text and returns the y position after the last line. */
  paragraph(x: number, y: number, str: string, maxWidth: number, opts: TextOpts & { leading?: number } = {}) {
    const size = opts.size ?? 10;
    const leading = opts.leading ?? size * 1.45;
    let cy = y;
    for (const line of wrap(str, maxWidth, size, opts.bold)) {
      this.text(x, cy, line, opts);
      cy += leading;
    }
    return cy;
  }

  rect(x: number, y: number, w: number, h: number, color: RGB) {
    const [r, g, b] = color;
    this.current.push(`${r} ${g} ${b} rg ${x.toFixed(2)} ${(PAGE_H - y - h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  line(x1: number, y1: number, x2: number, y2: number, color: RGB = PDF_COLORS.border, width = 0.75) {
    const [r, g, b] = color;
    this.current.push(
      `${r} ${g} ${b} RG ${width} w ${x1.toFixed(2)} ${(PAGE_H - y1).toFixed(2)} m ${x2.toFixed(2)} ${(PAGE_H - y2).toFixed(2)} l S`,
    );
  }

  toBytes(): Uint8Array {
    const objects: string[] = [];
    const add = (body: string) => {
      objects.push(body);
      return objects.length;
    };
    const catalogId = add("");
    const pagesId = add("");
    const f1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const f2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const pageIds: number[] = [];
    const gs = add("<< /Type /ExtGState /ca 0.14 /CA 0.14 >>");
    for (const ops of this.pages) {
      const stream = [...ops, ...(this.watermarkText ? [this.watermarkOps(this.watermarkText)] : [])].join("\n");
      const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> /ExtGState << /GS1 ${gs} 0 R >> >> /Contents ${contentId} 0 R >>`,
        ),
      );
    }
    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    let out = "%PDF-1.4\n%âãÏÓ\n";
    const offsets: number[] = [];
    objects.forEach((body, i) => {
      offsets.push(out.length);
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = out.length;
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) out += `${String(off).padStart(10, "0")} 00000 n \n`;
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;

    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
  }
}

/* ------------------------------------------------------------------ Shared layout helpers */

export const MARGIN = 48;
export const CONTENT_W = PAGE_W - MARGIN * 2;

export function drawHeader(doc: PdfDoc, brand: string, kicker: string) {
  doc.rect(0, 0, PAGE_W, 64, PDF_COLORS.forest);
  doc.text(MARGIN, 38, brand.toUpperCase(), { size: 13, bold: true, color: PDF_COLORS.white });
  const w = textWidth(kicker.toUpperCase(), 8, true);
  doc.text(PAGE_W - MARGIN - w, 37, kicker.toUpperCase(), { size: 8, bold: true, color: PDF_COLORS.gold });
}

export function drawFooter(doc: PdfDoc, left: string, right: string) {
  doc.line(MARGIN, PAGE_H - 44, PAGE_W - MARGIN, PAGE_H - 44);
  doc.text(MARGIN, PAGE_H - 28, left, { size: 7.5, color: PDF_COLORS.muted });
  doc.text(PAGE_W - MARGIN - textWidth(right, 7.5), PAGE_H - 28, right, { size: 7.5, color: PDF_COLORS.muted });
}

/** Two-column label/value table; returns y after the table. */
export function drawKeyValueTable(doc: PdfDoc, y: number, rows: [string, string][], labelW = 170) {
  let cy = y;
  rows.forEach(([label, value], i) => {
    const lines = wrap(value, CONTENT_W - labelW - 16, 10);
    const h = Math.max(24, lines.length * 14 + 10);
    if (i % 2 === 0) doc.rect(MARGIN, cy, CONTENT_W, h, PDF_COLORS.ivory);
    doc.text(MARGIN + 10, cy + 16, label, { size: 9.5, bold: true, color: PDF_COLORS.muted });
    lines.forEach((line, li) =>
      doc.text(MARGIN + labelW, cy + 16 + li * 14, line, {
        size: 10,
        color: value === "Pending verification" ? PDF_COLORS.error : PDF_COLORS.ink,
      }),
    );
    cy += h;
  });
  doc.line(MARGIN, cy, PAGE_W - MARGIN, cy);
  return cy;
}
