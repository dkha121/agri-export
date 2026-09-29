import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/utils";

/**
 * 12-month availability strip. Encodes state with pattern + text, not colour
 * alone (§19): peak = solid + "Peak", available = light, off = hatched outline.
 */
export async function SeasonCalendar({ values, label }: { values: number[]; label: string }) {
  const { t } = await getI18n();
  const text = [t.common.season.off, t.common.season.available, t.common.season.peak];
  const months = t.common.months;
  return (
    <figure>
      <figcaption className="sr-only">{label}</figcaption>
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {values.map((v, i) => (
          <li key={months[i]} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "h-9 w-full rounded-sm",
                v === 2 && "bg-forest-700",
                v === 1 && "bg-green-500/35",
                v === 0 && "border border-dashed border-line bg-white",
              )}
              title={`${months[i]}: ${text[v]}`}
            />
            <span className="text-[12px] font-semibold text-muted">
              {months[i]}
              <span className="sr-only">: {text[v]}</span>
            </span>
          </li>
        ))}
      </ol>
      <div aria-hidden className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-muted">
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm bg-forest-700" /> {text[2]}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm bg-green-500/35" /> {text[1]}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm border border-dashed border-line bg-white" /> {text[0]}
        </span>
      </div>
    </figure>
  );
}
