import { createDb } from "@/lib/data";
import { buildDocumentPdf } from "@/lib/document-files";

const { getDocument, getDocuments } = createDb("en");

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocuments()
    .filter((d) => d.access === "public")
    .map((d) => ({ id: d.id }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/documents/[id]">) {
  const { id } = await ctx.params;
  const doc = getDocument(id);
  if (!doc || doc.access !== "public") {
    return new Response("Document not found", { status: 404 });
  }
  const bytes = buildDocumentPdf(doc);
  return new Response(bytes as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.id}-${doc.version.replace(/\s+/g, "")}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
