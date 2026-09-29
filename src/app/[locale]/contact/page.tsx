import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Mail, MapPin, Phone } from "@/components/ui/icons";
import { IllustrativeBadge } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { getCountryOptions } from "@/lib/countries";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.contact.metaTitle, description: t.contact.metaDesc, path: "/contact" });
}

export default async function ContactPage() {
  const { t, l, db, locale } = await getI18n();
  const c = t.contact;
  const company = db.company;
  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.contact }]}
        kicker={c.kicker}
        title={c.title}
        intro={c.intro}
        actions={
          <Link href={l("/request-quote")} className={buttonClass("primary")}>
            {t.common.requestAQuote} <ArrowRight size={18} className="arrow-nudge" />
          </Link>
        }
      />

      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="min-h-[600px]" />}>
              <ContactForm countries={getCountryOptions(locale)} />
            </Suspense>
          </div>

          <aside className="space-y-8 lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="t-label text-muted">{c.contactsTitle}</h2>
                <IllustrativeBadge label={c.placeholderContacts} />
              </div>
              <ul className="space-y-4">
                {db.contacts.map((ct) => (
                  <li key={ct.email} className="rounded-md border border-line bg-white p-5">
                    <p className="text-[16px] font-bold">{ct.team}</p>
                    <p className="text-[13.5px] text-muted">{ct.region}</p>
                    <p className="mt-2 text-[14.5px]">
                      {ct.name} · <span className="text-muted">{ct.languages}</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-5">
                      <a href={`mailto:${ct.email}`} className="inline-flex min-h-[40px] items-center gap-2 text-[14.5px] font-semibold text-forest-700 hover:underline">
                        <Mail size={16} /> {ct.email}
                      </a>
                      <a href={`tel:${ct.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-[40px] items-center gap-2 text-[14.5px] font-semibold text-forest-700 hover:underline">
                        <Phone size={16} /> {ct.phone}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md bg-forest-900 p-6 text-white">
              <h2 className="t-label text-gold-500">{c.headOffice}</h2>
              <p className="mt-3 text-[16px] font-bold">{company.legalName}</p>
              <p className="mt-1 text-[14.5px] text-white/75">{company.headquarters}</p>
              <p className="mt-3 text-[14.5px] text-white/75">{company.hours}</p>
              <p className="mt-3 text-[14.5px]">
                WhatsApp: <span className="font-semibold">{company.whatsapp}</span>
              </p>
            </div>

            <div>
              <h2 className="t-label mb-4 text-muted">{c.offices}</h2>
              <ul className="divide-y divide-line rounded-md border border-line bg-white">
                {db.offices.map((o) => (
                  <li key={o.name} className="flex gap-3 p-4">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <p className="text-[15px] font-bold">{o.name}</p>
                      <p className="text-[14px] text-muted">{o.address}</p>
                      <p className="text-[13px] text-muted">{o.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
