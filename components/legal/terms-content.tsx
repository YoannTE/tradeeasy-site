import { getTranslations } from "next-intl/server";

const sectionKeys = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
  "section7",
  "section8",
  "section9",
  "section10",
  "section11",
  "section12",
] as const;

export async function TermsContent() {
  const t = await getTranslations("legal.terms");

  return (
    <>
      {sectionKeys.map((key) => (
        <section key={key}>
          <h2>{t(`${key}.title`)}</h2>
          <p>{t(`${key}.content`)}</p>
        </section>
      ))}
    </>
  );
}
