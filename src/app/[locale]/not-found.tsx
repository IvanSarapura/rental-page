import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem 0",
        textAlign: "center",
      }}
    >
      <Container>
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link href="/">Volver al inicio</Link>
      </Container>
    </main>
  );
}
