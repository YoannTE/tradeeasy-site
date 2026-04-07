import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimplifyPro",
  description: "Professional trading indicators and tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
