import { Inter, Exo_2 } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { PromoBanner } from "@/components/layout/promo-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["800"],
  style: ["italic"],
});

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${exo2.variable} ${inter.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            <PromoBanner />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
