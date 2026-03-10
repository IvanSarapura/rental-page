export default function NewsletterPage() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1rem 4rem" }}>
      <div style={{ textAlign: "center", maxWidth: "36rem" }}>
        <p style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "1rem" }}>
          COMING SOON
        </p>
        <h1 style={{ fontFamily: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, color: "var(--color-foreground)", marginBottom: "1rem" }}>
          Newsletter
        </h1>
        <p style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-muted)" }}>
          Stay up to date with our latest office listings, market insights, and exclusive offers. This page is currently under development.
        </p>
      </div>
    </main>
  );
}
