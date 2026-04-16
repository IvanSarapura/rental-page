"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./StickyBookBar.module.css";

type StickyBookBarProps = {
  propertyId: string;
  price: number;
  currency: string;
  period: string;
  available: boolean;
  bookLabel: string;
  unavailableLabel: string;
  /** Reserved for future aria-label usage */
  priceLabel?: string;
};

export default function StickyBookBar({
  propertyId,
  price,
  currency,
  period,
  available,
  bookLabel,
  unavailableLabel,
}: StickyBookBarProps) {
  const [visible, setVisible] = useState(false);
  // Ref passed via data attribute from the server component (anchor element id)
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById("book-btn-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the original CTA is out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sentinelRef}
      className={`${styles.bar} ${visible ? styles.barVisible : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.priceBlock}>
        <span className={styles.price}>
          {currency}
          {price.toLocaleString()}
        </span>
        <span className={styles.period}>/ {period}</span>
      </div>

      {available ? (
        <Link
          href={`/booking/${propertyId}`}
          className={styles.bookBtn}
          tabIndex={visible ? 0 : -1}
        >
          {bookLabel}
        </Link>
      ) : (
        <span className={styles.bookBtnDisabled}>{unavailableLabel}</span>
      )}
    </div>
  );
}
