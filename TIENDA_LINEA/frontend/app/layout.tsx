import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Tienda en Línea",
  description: "Tienda en línea desarrollada con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}