import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { PlaceholderArt } from "./PlaceholderArt";

/**
 * Responsive image with editorial focal point. Renders the real photo when
 * `image.src` is set; otherwise a generated, clearly labelled placeholder
 * following the photography direction for that image type (§5.5).
 *
 * To add real photography: put files in /public/images/... and set `src`
 * on the MediaAsset in /src/content — no component changes needed.
 */
export async function Media({
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  zoom,
  showLabel = true,
  decorative,
  labelPosition = "bottom",
}: {
  image: MediaAsset;
  className?: string;
  sizes?: string;
  preload?: boolean;
  zoom?: boolean;
  showLabel?: boolean;
  decorative?: boolean;
  labelPosition?: "top" | "bottom";
}) {
  const { t } = await getI18n();
  const alt = decorative ? "" : image.alt;
  return (
    <div className={cn("relative overflow-hidden bg-sand", className)}>
      {image.src ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={preload ? undefined : "lazy"}
          className={cn("object-cover", zoom && "img-zoom")}
          style={{ objectPosition: image.focal ?? "50% 50%" }}
        />
      ) : (
        <div
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : alt}
          aria-hidden={decorative || undefined}
          className={cn("absolute inset-0", zoom && "img-zoom")}
        >
          <PlaceholderArt kind={image.kind} motif={image.motif} seed={`${image.caption ?? ""}${image.alt}`} />
        </div>
      )}
      {!image.src && showLabel && (
        <span
          aria-hidden
          className={cn("pointer-events-none absolute left-3 z-[1]", labelPosition === "top" ? "top-3" : "bottom-3", " inline-flex max-w-[calc(100%-24px)] items-center gap-1.5 truncate rounded-sm bg-forest-900/75 px-2 py-1 text-[10.5px] font-semibold leading-4 tracking-[0.02em] text-white backdrop-blur-sm")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <span className="truncate">
            {t.common.photoPlaceholder} · {image.caption ?? image.alt}
          </span>
        </span>
      )}
    </div>
  );
}
