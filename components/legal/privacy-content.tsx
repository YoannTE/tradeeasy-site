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
] as const;

export async function PrivacyContent() {
  const t = await getTranslations("legal.privacy");

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
