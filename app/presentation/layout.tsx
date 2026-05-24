import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./presentation.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SimplifyPro — Présentation",
  description:
    "Arrêtez de deviner. Commencez à trader avec certitude. Découvrez la méthode SimplifyPro.",
  robots: { index: false, follow: false },
};

export default function PresentationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} antialiased bg-[#0b0f14] text-white overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
