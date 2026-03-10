"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import styles from "./WorkspaceInquirySection.module.css";

type FieldConfig = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
};

const fields: readonly FieldConfig[] = [
  { id: "fullName",       label: "Full Name",       placeholder: "John Doe",          type: "text"   },
  { id: "company",        label: "Company",          placeholder: "Acme Inc.",         type: "text"   },
  { id: "phone",          label: "Phone",            placeholder: "+1 (555) 000-0000", type: "tel"    },
  { id: "email",          label: "Email",            placeholder: "john@acme.com",     type: "email"  },
  { id: "location",       label: "Location",         placeholder: "New York, NY",      type: "text"   },
  { id: "numberOfPeople", label: "Number of people", placeholder: "e.g. 10",           type: "number" },
] as const;

type FormValues = Record<string, string>;

export default function WorkspaceInquirySection() {
  const [values, setValues] = useState<FormValues>(
    () => Object.fromEntries(fields.map((f) => [f.id, ""]))
  );
  const [errors, setErrors]       = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function handleChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    // Limpiar error del campo al escribir
    if (errors.has(id)) {
      setErrors((prev) => { const s = new Set(prev); s.delete(id); return s; });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validar campos no vacíos
    const empty = new Set(
      fields.map((f) => f.id).filter((id) => !values[id].trim())
    );

    if (empty.size > 0) {
      setErrors(empty);
      return;
    }

    // TODO: conectar con endpoint de contacto
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
              <h2 className={styles.successTitle}>
                Thank you for getting in touch!
              </h2>
              <p className={styles.successBody}>
                We appreciate you contacting us. One of our colleagues will get
                back to you shortly.
                <br />
                Have a great day!
              </p>
            </div>
          ) : (
            /* ── Formulario ────────────────────────────── */
            <>
              <header className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Let us find your ideal workspace</h2>
                <p className={styles.cardSubtitle}>
                  Complete the form and a WeWork team member will be in touch with you shortly.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldsGrid}>
                  {fields.map((field) => (
                    <div key={field.id} className={styles.field}>
                      <label htmlFor={field.id} className={styles.label}>
                        {field.label}
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={values[field.id]}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className={`${styles.input} ${errors.has(field.id) ? styles.inputError : ""}`}
                          autoComplete={field.id === "email" ? "email" : undefined}
                          aria-invalid={errors.has(field.id)}
                        />
                        {errors.has(field.id) && (
                          <span
                            className={styles.errorAsterisk}
                            aria-hidden="true"
                            data-tooltip="This field is required"
                          >
                            *
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Submit
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
