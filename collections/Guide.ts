import type { CollectionConfig } from "payload";
import { adminOnlyAccess } from "./access/admin-only";

export const Guide: CollectionConfig = {
  slug: "guides",
  labels: {
    singular: "Guide",
    plural: "Guides",
  },
  admin: {
    group: "Contenu",
    useAsTitle: "title",
    description: "Guides pas-à-pas (installation, usage, stratégie…).",
    defaultColumns: ["title", "category", "difficulty", "published", "order"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return { published: { equals: true } };
    },
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug (URL)",
      unique: true,
      required: true,
      admin: {
        description:
          "Identifiant pour l'URL (ex : installer-simplifypro-tradingview).",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      options: [
        { label: "Installation", value: "installation" },
        { label: "Utilisation", value: "usage" },
        { label: "Stratégie", value: "strategy" },
        { label: "Dépannage", value: "troubleshooting" },
      ],
    },
    {
      name: "difficulty",
      type: "select",
      label: "Difficulté",
      options: [
        { label: "Débutant", value: "beginner" },
        { label: "Intermédiaire", value: "intermediate" },
        { label: "Avancé", value: "advanced" },
      ],
    },
    {
      name: "estimatedTime",
      type: "text",
      label: "Temps estimé",
      admin: {
        description: 'Exemple : "5 minutes"',
      },
    },
    {
      name: "steps",
      type: "array",
      label: "Étapes",
      labels: {
        singular: "Étape",
        plural: "Étapes",
      },
      fields: [
        {
          name: "stepTitle",
          type: "text",
          label: "Titre de l'étape",
          required: true,
        },
        {
          name: "stepContent",
          type: "textarea",
          label: "Contenu",
          required: true,
        },
        {
          name: "stepImage",
          type: "upload",
          label: "Image",
          relationTo: "media",
        },
        {
          name: "stepTip",
          type: "textarea",
          label: "Astuce / conseil",
        },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      label: "Publié",
      defaultValue: false,
    },
    {
      name: "publishDate",
      type: "date",
      label: "Date de publication",
    },
    {
      name: "order",
      type: "number",
      label: "Ordre d'affichage",
    },
  ],
};
