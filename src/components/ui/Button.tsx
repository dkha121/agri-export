import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Buttons per §6 / §6.1: 52px height, radius 4, primary forest-700 → forest-900
 * on hover, secondary transparent with 1px green border → light green surface.
 * Loading keeps the button width (spinner overlays the label).
 */
type Variant = "primary" | "secondary" | "gold" | "on-dark" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-white hover:bg-forest-900 disabled:bg-disabled disabled:text-white aria-disabled:bg-disabled",
  secondary:
    "bg-transparent text-forest-700 border border-green-500 hover:bg-green-50 disabled:border-line disabled:text-[var(--disabled-fg)]",
  gold: "bg-gold-500 text-forest-900 hover:brightness-95 disabled:bg-disabled",
  "on-dark": "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/70",
  ghost: "bg-transparent text-forest-700 hover:bg-green-50",
};

const sizes: Record<Size, string> = {
  md: "min-h-[52px] px-6 text-[15px]",
  sm: "min-h-[44px] px-4 text-[14px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "relative inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-[0.01em] transition-colors duration-200 select-none disabled:cursor-not-allowed whitespace-nowrap",
    variants[variant],
    sizes[size],
    className,
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  icon,
  loading,
  className,
  children,
  disabled,
  ...rest
}: CommonProps & ComponentProps<"button"> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClass(variant, size, className)}
    >
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {children}
        {icon}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="spinner" />
        </span>
      )}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link {...rest} className={cn(buttonClass(variant, size, className), "group")}>
      {children}
      {icon}
    </Link>
  );
}

/** Text CTA with arrow nudge (e.g. "View spec →"). */
export function TextLink({
  children,
  className,
  onDark,
  ...rest
}: ComponentProps<typeof Link> & { onDark?: boolean }) {
  return (
    <Link
      {...rest}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold underline-offset-4 hover:underline",
        onDark ? "text-white" : "text-forest-700",
        className,
      )}
    >
      {children}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className="arrow-nudge">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
