import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { Mail, Phone } from "../ui/icons";
import { Logo } from "./Logo";

/** Dark forest footer with legal identity + sales contact (§6 Footer). */
export async function Footer() {
  const { t, l, db } = await getI18n();
  const company = db.company;
  const year = 2026;
  const columns = [
    {
      title: t.nav.products,
      links: [...db.getCategories().map((c) => ({ label: c.name, href: l(`/products/${c.slug}`) })), { label: t.nav.allProducts, href: l("/products") }],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.origins, href: l("/origins") },
        { label: t.nav.capabilities, href: l("/capabilities") },
        { label: t.footer.qualityCerts, href: l("/quality") },
        { label: t.nav.supplyChain, href: l("/supply-chain") },
        { label: t.nav.logistics, href: l("/logistics") },
        { label: t.nav.sustainability, href: l("/sustainability") },
      ],
    },
    {
      title: t.footer.buyerResources,
      links: [
        { label: t.footer.requestQuote, href: l("/request-quote") },
        { label: t.nav.downloads, href: l("/downloads") },
        { label: t.nav.insights, href: l("/insights") },
        { label: t.footer.contactSales, href: l("/contact") },
      ],
    },
  ];

  return (
    <footer className="on-dark bg-forest-900 text-white">
      <div className="container-x pb-10 pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-6 max-w-sm font-serif text-[26px] leading-8 text-white">{t.meta.siteTitle}</p>
            <p className="mt-4 max-w-sm text-[15px] leading-6 text-white/65">{t.footer.pitch}</p>
            <div className="mt-8 space-y-2 text-[15px]">
              <a href={`mailto:${company.salesEmail}`} className="flex min-h-[44px] items-center gap-3 text-white hover:text-gold-500">
                <Mail size={18} className="text-gold-500" /> {company.salesEmail}
              </a>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="flex min-h-[44px] items-center gap-3 text-white hover:text-gold-500">
                <Phone size={18} className="text-gold-500" /> {company.phone}
              </a>
              <p className="pl-[30px] text-[13px] text-white/55">{company.hours}</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="t-label text-gold-500">{col.title}</p>
                <ul className="mt-5 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="inline-flex min-h-[40px] items-center text-[15px] text-white/80 hover:text-white hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/15 pt-8 text-[13px] leading-5 text-white/60 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-semibold text-white/85">{company.legalName}</p>
            <p>{company.registration}</p>
            <p>{company.headquarters}</p>
          </div>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-2 lg:col-span-5 lg:justify-end">
            <Link href={l("/privacy")} className="inline-flex min-h-[32px] items-center hover:text-white hover:underline">
              {t.footer.privacy}
            </Link>
            <Link href={l("/downloads")} className="inline-flex min-h-[32px] items-center hover:text-white hover:underline">
              {t.nav.downloads}
            </Link>
            <span className="inline-flex min-h-[32px] items-center">
              © {year} {company.brand}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
