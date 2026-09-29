"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Subtle fade-up for elements marked `data-reveal` (§5.4). Content is fully
 * visible without JS; the hidden initial state only applies once this runs,
 * and elements already on screen are revealed immediately.
 */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-visible");
      else io.observe(el);
    });
    root.classList.add("motion-ready");
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
