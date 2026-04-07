import { getTranslations } from "next-intl/server";

const sectionKeys = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
] as const;

export async function DisclaimerContent() {
  const t = await getTranslations("legal.disclaimer");

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
