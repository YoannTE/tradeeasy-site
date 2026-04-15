import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Video: CollectionConfig = {
  slug: "videos",
  labels: {
    singular: "Vidéo",
    plural: "Vidéos",
  },
  admin: {
    group: "Contenu",
    useAsTitle: "title",
    description: "Vidéos YouTube affichées dans la section tutoriels.",
    defaultColumns: ["title", "category", "displayOrder", "publishDate"],
  },
  access: {
    read: publicReadAccess,
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
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "youtubeUrl",
      type: "text",
      label: "URL YouTube",
      required: true,
      admin: {
        description: "Lien complet vers la vidéo YouTube.",
      },
    },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      options: [
        { label: "Installation", value: "installation" },
        { label: "Utilisation", value: "usage" },
        { label: "Stratégie", value: "strategy" },
        { label: "Trading en direct", value: "trading_live" },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Ordre d'affichage",
      admin: {
        description: "Les plus petits nombres apparaissent en premier.",
      },
    },
    {
      name: "publishDate",
      type: "date",
      label: "Date de publication",
    },
  ],
};
