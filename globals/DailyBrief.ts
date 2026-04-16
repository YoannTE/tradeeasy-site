import type { GlobalConfig } from "payload";
import {
  publicReadAccess,
  adminOnlyAccess,
} from "@/collections/access/admin-only";
import { translateDailyBriefHook } from "./hooks/translate-daily-brief";

export const DailyBrief: GlobalConfig = {
  slug: "daily-brief",
  label: "Brief du jour",
  admin: {
    group: "Contenu",
    description:
      "Modifie ici le brief quotidien. Les traductions EN/ES/DE sont générées automatiquement à l'enregistrement.",
  },
  access: {
    read: publicReadAccess,
    update: adminOnlyAccess,
  },
  hooks: {
    afterChange: [translateDailyBriefHook],
  },
  fields: [
    {
      name: "date",
      type: "text",
      label: "Date",
      required: true,
      admin: {
        description:
          'Écris la date en toutes lettres, ex: "Jeudi 17 avril 2026".',
      },
    },
    {
      name: "recapBody",
      type: "textarea",
      label: "Recap d'hier",
      required: true,
      admin: { description: "Section rouge. Résumé de la veille." },
    },
    {
      name: "agendaSublabel",
      type: "text",
      label: "Agenda — Sous-titre",
      admin: { description: 'Ex: "Journée piège", "Journée calme", etc.' },
    },
    {
      name: "agendaBody",
      type: "textarea",
      label: "Agenda du jour",
      required: true,
      admin: { description: "Section orange. Les événements clés." },
    },
    {
      name: "geopoliticsBody",
      type: "textarea",
      label: "Contexte géopolitique",
      required: true,
      admin: { description: "Section bleue. La toile de fond." },
    },
    {
      name: "tomorrowLabel",
      type: "text",
      label: "Demain — Titre",
      admin: { description: 'Ex: "Demain — Vendredi 17 avril".' },
    },
    {
      name: "tomorrowBody",
      type: "textarea",
      label: "Demain — Contenu",
      required: true,
      admin: { description: "Section grise. Ce qui arrive demain." },
    },
    {
      name: "readingBody",
      type: "textarea",
      label: "Lecture rapide",
      required: true,
      admin: { description: "Section verte. Ton analyse et tes conseils." },
    },
    {
      name: "translations",
      type: "json",
      admin: {
        hidden: true,
        description: "Traductions auto-générées (ne pas modifier).",
      },
    },
  ],
};
