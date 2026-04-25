export interface PlaceholderStep {
  stepTitle: string;
  stepContent?: string;
  stepTip?: string;
  stepImage?: string;
  subSteps?: string[];
}

export interface PlaceholderGuide {
  title: string;
  slug: string;
  description: string;
  category: "installation" | "usage" | "strategy" | "troubleshooting";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  steps: PlaceholderStep[];
}

type Translator = (key: string) => string;

function buildSubSteps(
  t: Translator,
  baseKey: string,
  count: number,
): string[] {
  return Array.from({ length: count }, (_, i) => t(`${baseKey}.${i}`));
}

export function getPlaceholderGuides(t: Translator): PlaceholderGuide[] {
  return [
    {
      title: t("placeholder.guide1.title"),
      slug: "install-simplifypro-tradingview",
      description: t("placeholder.guide1.description"),
      category: "installation",
      difficulty: "beginner",
      estimatedTime: "5",
      steps: [
        {
          stepTitle: t("placeholder.guide1.steps.0.title"),
          stepContent: t("placeholder.guide1.steps.0.content"),
          stepImage: "/images/guides/step1-open-tradingview.png",
          subSteps: buildSubSteps(t, "placeholder.guide1.steps.0.subSteps", 2),
        },
        {
          stepTitle: t("placeholder.guide1.steps.1.title"),
          stepContent: t("placeholder.guide1.steps.1.content"),
          stepImage: "/images/guides/step2-indicators.png",
          subSteps: buildSubSteps(t, "placeholder.guide1.steps.1.subSteps", 3),
        },
        {
          stepTitle: t("placeholder.guide1.steps.2.title"),
          stepContent: t("placeholder.guide1.steps.2.content"),
          stepImage: "/images/guides/step3-configure.png",
          subSteps: buildSubSteps(t, "placeholder.guide1.steps.2.subSteps", 3),
        },
        {
          stepTitle: t("placeholder.guide1.steps.3.title"),
          stepContent: t("placeholder.guide1.steps.3.content"),
          stepImage: "/images/guides/step4-start-trading.png",
          stepTip: t("placeholder.guide1.steps.3.tip"),
        },
      ],
    },
    {
      title: t("placeholder.guide2.title"),
      slug: "understanding-buy-sell-signals",
      description: t("placeholder.guide2.description"),
      category: "usage",
      difficulty: "beginner",
      estimatedTime: "3",
      steps: [
        {
          stepTitle: t("placeholder.guide2.steps.0.title"),
          stepContent: t("placeholder.guide2.steps.0.content"),
        },
        {
          stepTitle: t("placeholder.guide2.steps.1.title"),
          stepContent: t("placeholder.guide2.steps.1.content"),
        },
        {
          stepTitle: t("placeholder.guide2.steps.2.title"),
          stepContent: t("placeholder.guide2.steps.2.content"),
        },
        {
          stepTitle: t("placeholder.guide2.steps.3.title"),
          stepContent: t("placeholder.guide2.steps.3.content"),
        },
      ],
    },
    {
      title: t("placeholder.guide3.title"),
      slug: "setting-up-alerts",
      description: t("placeholder.guide3.description"),
      category: "usage",
      difficulty: "intermediate",
      estimatedTime: "5",
      steps: [
        {
          stepTitle: t("placeholder.guide3.steps.0.title"),
          stepContent: t("placeholder.guide3.steps.0.content"),
        },
        {
          stepTitle: t("placeholder.guide3.steps.1.title"),
          stepContent: t("placeholder.guide3.steps.1.content"),
        },
        {
          stepTitle: t("placeholder.guide3.steps.2.title"),
          stepContent: t("placeholder.guide3.steps.2.content"),
        },
        {
          stepTitle: t("placeholder.guide3.steps.3.title"),
          stepContent: t("placeholder.guide3.steps.3.content"),
        },
        {
          stepTitle: t("placeholder.guide3.steps.4.title"),
          stepContent: t("placeholder.guide3.steps.4.content"),
        },
      ],
    },
  ];
}
