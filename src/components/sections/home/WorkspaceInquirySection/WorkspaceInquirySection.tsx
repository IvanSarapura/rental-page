"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import styles from "./WorkspaceInquirySection.module.css";

type FieldId = "fullName" | "company" | "phone" | "email" | "location" | "numberOfPeople";
type InputType = "text" | "tel" | "email" | "number";

const FIELD_IDS: readonly { id: FieldId; type: InputType }[] = [
  { id: "fullName", type: "text" },
  { id: "company", type: "text" },
  { id: "phone", type: "tel" },
  { id: "email", type: "email" },
  { id: "location", type: "text" },
  { id: "numberOfPeople", type: "number" },
] as const;

type FormValues = Record<FieldId, string>;

export default function WorkspaceInquirySection() {
  const t = useTranslations("WorkspaceInquirySection");

  const [values, setValues] = useState<FormValues>(
    () => Object.fromEntries(FIELD_IDS.map((f) => [f.id, ""])) as FormValues
  );
  const [errors, setErrors] = useState<Set<FieldId>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function handleChange(id: FieldId, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors.has(id)) {
      setErrors((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const empty = new Set(
      FIELD_IDS.map((f) => f.id).filter((id) => !values[id].trim())
    ) as Set<FieldId>;

    if (empty.size > 0) {
      setErrors(empty);
      return;
    }

    // TODO: replace with real API call via bookingService / contact endpoint
    setSubmitted(true);
  }

  return (
    <section className={styles.section}>
      <Image
        src="/images/office2.png"
        alt="Modern office with city view"
        fill
        className={styles.bgImage}
        sizes="100vw"
        priority={false}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.card}>
          {submitted ? (
            /* ── Estado de éxito ───────────────────────── */
            <div className={styles.successState}>
              <div className={styles.successIcon} aria-hidden="true">
                <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M15 26.5L22 33.5L37 18.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className={styles.successTitle}>{t("successTitle")}</h2>
              <p className={styles.successBody}>{t("successBody")}</p>
            </div>
          ) : (
            /* ── Formulario ────────────────────────────── */
            <>
              <header className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{t("title")}</h2>
                <p className={styles.cardSubtitle}>{t("subtitle")}</p>
              </header>

              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldsGrid}>
                  {FIELD_IDS.map(({ id, type }) => (
                    <div key={id} className={styles.field}>
                      <label htmlFor={id} className={styles.label}>
                        {t(`${id}Label` as Parameters<typeof t>[0])}
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          placeholder={t(`${id}Placeholder` as Parameters<typeof t>[0])}
                          value={values[id]}
                          onChange={(e) => handleChange(id, e.target.value)}
                          className={`${styles.input} ${errors.has(id) ? styles.inputError : ""}`}
                          autoComplete={id === "email" ? "email" : undefined}
                          aria-invalid={errors.has(id)}
                        />
                        {errors.has(id) && (
                          <span
                            className={styles.errorAsterisk}
                            aria-hidden="true"
                            data-tooltip={t("required")}
                          >
                            *
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  {t("submit")}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
