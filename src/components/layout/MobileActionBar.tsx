"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { splitLocale } from "@/i18n/config";
import { buttonClass } from "../ui/Button";

/**
 * Sticky bottom CTA on mobile/tablet (§4.1, §18). Product detail pages render
 * their own bar ("Request Quote / Download Spec") and the RFQ page needs none.
 * Body gets matching bottom padding (.has-mobile-bar) so content is never covered.
 */
export function MobileActionBar() {
  const { t, l } = useI18n();
  const { path } = splitLocale(usePathname());
  const isProductDetail = /^\/products\/[^/]+\/[^/]+/.test(path);
  if (isProductDetail || path.startsWith("/request-quote")) return null;
  return (
    <div
      data-print-hidden
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-[640px] gap-3">
        <Link href={l("/products")} className={buttonClass("secondary", "sm", "flex-1")}>
          {t.mobileBar.products}
        </Link>
        <Link href={l("/request-quote")} className={buttonClass("primary", "sm", "flex-[1.4]")}>
          {t.common.requestQuote}
        </Link>
      </div>
    </div>
  );
}
