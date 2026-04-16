"use client";

import { useEffect, useRef, useState } from "react";

type UseRevealOptions = {
  /** Threshold de visibilidad para disparar el reveal (0–1). Default: 0.15 */
  threshold?: number;
  /** rootMargin para IntersectionObserver. Default: "0px 0px -40px 0px" */
  rootMargin?: string;
  /** Si true, el elemento se revela solo una vez y no vuelve a ocultarse. Default: true */
  once?: boolean;
};

/**
 * Hook que observa un elemento del DOM y devuelve si ha entrado en el viewport.
 * Diseñado para animar sections con data-reveal en globals.css.
 *
 * @example
 * const { ref, isVisible } = useReveal();
 * <div ref={ref} data-reveal={isVisible ? "visible" : undefined} />
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
