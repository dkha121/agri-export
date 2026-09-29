import type { ReactNode } from "react";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/utils";
import { Media } from "../media/Media";
import { Breadcrumb, Kicker } from "../ui/primitives";

/** Inner-page hero: breadcrumb, kicker, H1, lead, optional actions and image. */
export function PageHero({
  breadcrumb,
  kicker,
  title,
  intro,
  actions,
  image,
  dark,
  children,
}: {
  breadcrumb: { label: string; href?: string }[];
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  image?: MediaAsset;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={cn(dark ? "on-dark bg-forest-900 text-white" : "bg-ivory")}>
      <div className={cn("container-x pt-8 lg:pt-12", image ? "pb-14 lg:pb-20" : "pb-12 lg:pb-16")}>
        <Breadcrumb items={breadcrumb} onDark={dark} />
        <div className={cn("grid items-center gap-10 lg:gap-16", image && "lg:grid-cols-12")}>
          <div className={cn(image ? "lg:col-span-6" : "max-w-[880px]")}>
            {kicker && (
              <Kicker onDark={dark} className="mb-5">
                {kicker}
              </Kicker>
            )}
            <h1 className={cn("t-h1", dark ? "text-white" : "text-ink")}>{title}</h1>
            {intro && <div className={cn("t-lead mt-6 max-w-[62ch]", dark ? "text-white/75" : "text-muted")}>{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {image && (
            <div className="lg:col-span-6">
              <Media image={image} className="aspect-[4/3] rounded-md" preload sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
