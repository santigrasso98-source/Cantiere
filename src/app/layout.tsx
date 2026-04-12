import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cantiere | Arquitectura & Construcción",
  description: "Cantiere es un estudio de arquitectura y construcción especializado en residencias minimalistas de alta gama y espacios comerciales en Argentina. Descubrí nuestra visión y portfolio en cantiere.com.ar.",
  keywords: "Arquitectura, Construcción, Casa Minimalista, Villa Moderna, Estudio de Diseño, Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
