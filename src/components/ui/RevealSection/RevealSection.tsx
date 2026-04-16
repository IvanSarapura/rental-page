"use client";

import type { ReactNode, CSSProperties, ElementType, ComponentPropsWithoutRef } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealSectionProps<T extends ElementType = "div"> = {
  children: ReactNode;
  /** Delay de animación en ms (0–360). Se mapea a data-reveal-delay 1-6 */
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Clase CSS adicional para el wrapper */
  className?: string;
  style?: CSSProperties;
  /** Tag HTML del wrapper. Default: "div" */
  as?: T;
  threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "style" | "as">;

/**
 * Client wrapper ligero que observa su propio elemento con IntersectionObserver
 * y activa la animación [data-reveal="visible"] definida en globals.css.
 *
 * Los server components hijos se renderizan normalmente en el servidor;
 * solo la lógica de visibilidad es client-side.
 */
export default function RevealSection({
  children,
  delay = 0,
  className,
  style,
  as: Tag = "div",
  threshold = 0.12,
  ...rest
}: RevealSectionProps) {
  const { ref, isVisible } = useReveal<HTMLElement>({ threshold });

  const Comp = Tag as ElementType;

  return (
    <Comp
      ref={ref}
      data-reveal={isVisible ? "visible" : ""}
      data-reveal-delay={delay > 0 ? String(delay) : undefined}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
