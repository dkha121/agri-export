import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { t, l } = await getI18n();
  return (
    <section className="bg-ivory">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="t-label text-green-500">404</p>
        <h1 className="t-h1 mt-4">{t.notFound.title}</h1>
        <p className="t-lead mt-5 max-w-[52ch] text-muted">{t.notFound.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={l("/products")} className={buttonClass("primary")}>
            {t.notFound.browse}
          </Link>
          <Link href={l("/contact")} className={buttonClass("secondary")}>
            {t.notFound.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
