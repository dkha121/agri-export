import { getI18n } from "@/i18n/server";
import type { SpecRow } from "@/lib/data";
import { cn } from "@/lib/utils";
import { IllustrativeBadge } from "../ui/primitives";

/**
 * SpecTable (§6, §9.2): two-column technical table rendered from the
 * category schema. No card-per-spec. On mobile it stays a label/value list
 * without horizontal overflow (§18). Missing values show "Pending verification".
 */
export async function SpecTable({ rows, caption, verified, compact }: { rows: SpecRow[]; caption: string; verified: boolean; compact?: boolean }) {
  const { t } = await getI18n();
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <table className="w-full border-collapse text-left">
        <caption className="border-b border-line bg-ivory px-5 py-3 text-left">
          <span className="flex flex-wrap items-center justify-between gap-2">
            <span className="t-label text-muted">{caption}</span>
            <IllustrativeBadge verified={verified} label={t.common.illustrativeValues} />
          </span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{t.product.specTitle}</th>
            <th scope="col">{t.common.value}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-line last:border-b-0 even:bg-ivory/50 max-sm:flex max-sm:flex-col max-sm:gap-0.5 max-sm:py-3">
              <th
                scope="row"
                className={cn("align-top font-semibold text-muted sm:w-[44%]", compact ? "px-5 py-2.5 text-[14px]" : "px-5 py-3.5 text-[15px] max-sm:py-0")}
              >
                {r.label}
                {r.help && <span className="block text-[12.5px] font-normal leading-5 text-muted">{r.help}</span>}
              </th>
              <td className={cn("align-top font-semibold", compact ? "px-5 py-2.5 text-[14px]" : "px-5 py-3.5 text-[15px] max-sm:py-0")}>
                {r.value ?? <span className="font-medium text-error">{t.common.pendingVerification}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
