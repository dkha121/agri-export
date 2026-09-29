import { company } from "@/content/company";
import { getI18n } from "@/i18n/server";

/**
 * Site-wide notice while business data is illustrative (§1, §23, §24
 * "No placeholder metrics/claims remain in production"). Turn off with
 * `company.previewNotice = false` once verified data is loaded.
 */
export async function PreviewNotice() {
  if (!company.previewNotice) return null;
  const { t } = await getI18n();
  return (
    <div data-print-hidden className="bg-forest-900 text-white/85">
      <p className="container-x py-2 text-center text-[12.5px] leading-5">
        <span className="font-bold text-gold-500">{t.preview.bold}</span> {t.preview.text}
      </p>
    </div>
  );
}
