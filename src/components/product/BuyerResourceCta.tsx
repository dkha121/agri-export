import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { docHref } from "@/lib/utils";
import { buttonClass } from "../ui/Button";
import { Download, Upload } from "../ui/icons";

/** Buyer resource CTA under the product grid (§8). */
export async function BuyerResourceCta() {
  const { t, l } = await getI18n();
  return (
    <section className="bg-sand" aria-labelledby="buyer-res-title">
      <div className="container-x grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-7">
          <p className="t-label text-green-500">{t.products.resKicker}</p>
          <h2 id="buyer-res-title" className="t-h3 mt-3">
            {t.products.resTitle}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-7 text-muted">{t.products.resBody}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Link href={l("/request-quote")} className={buttonClass("primary")}>
            <Upload size={18} /> {t.products.resUpload}
          </Link>
          <a href={docHref("catalog-2026")} className={buttonClass("secondary")}>
            <Download size={18} /> {t.products.resCatalog}
          </a>
        </div>
      </div>
    </section>
  );
}
