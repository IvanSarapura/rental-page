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
  { id: "fullName",       label: "Full Name",        placeholder: "John Doe",           type: "text"  },
  { id: "company",        label: "Company",           placeholder: "Acme Inc.",          type: "text"  },
  { id: "phone",          label: "Phone",             placeholder: "+1 (555) 000-0000",  type: "tel"   },
  { id: "email",          label: "Email",             placeholder: "john@acme.com",      type: "email" },
  { id: "location",       label: "Location",          placeholder: "New York, NY",       type: "text"  },
  { id: "numberOfPeople", label: "Number of people",  placeholder: "e.g. 10",            type: "number"},
] as const;

type FormValues = Record<string, string>;

export default function WorkspaceInquirySection() {
  const [values, setValues] = useState<FormValues>(
    () => Object.fromEntries(fields.map((f) => [f.id, ""]))
  );

  function handleChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar con el endpoint de contacto
    console.log("Form submitted:", values);
  }

  return (
    <section className={styles.section}>
      {/* Imagen de fondo */}
      <Image
        src="/images/office2.png"
        alt="Modern office with city view"
        fill
        className={styles.bgImage}
        sizes="100vw"
        priority={false}
      />

      {/* Gradiente de abajo hacia arriba */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Card del formulario */}
      <div className={styles.content}>
        <div className={styles.card}>
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
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={styles.input}
                    autoComplete={field.id === "email" ? "email" : undefined}
                  />
                </div>
              ))}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
