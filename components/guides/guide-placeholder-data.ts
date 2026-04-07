export interface PlaceholderStep {
  stepTitle: string;
  stepContent: string;
  stepTip?: string;
  stepImage?: string;
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

export function getPlaceholderGuides(
  t: (key: string) => string,
): PlaceholderGuide[] {
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
        },
        {
          stepTitle: t("placeholder.guide1.steps.1.title"),
          stepContent: t("placeholder.guide1.steps.1.content"),
          stepImage: "/images/guides/step2-indicators.png",
        },
        {
          stepTitle: t("placeholder.guide1.steps.2.title"),
          stepContent: t("placeholder.guide1.steps.2.content"),
        },
        {
          stepTitle: t("placeholder.guide1.steps.3.title"),
          stepContent: t("placeholder.guide1.steps.3.content"),
        },
        {
          stepTitle: t("placeholder.guide1.steps.4.title"),
          stepContent: t("placeholder.guide1.steps.4.content"),
        },
        {
          stepTitle: t("placeholder.guide1.steps.5.title"),
          stepContent: t("placeholder.guide1.steps.5.content"),
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
