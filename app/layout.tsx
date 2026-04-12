import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SimplifyPro",
  description: "Professional trading indicators and tools",
  icons: {
    icon: "/icon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
