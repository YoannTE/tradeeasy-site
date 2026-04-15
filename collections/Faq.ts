import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Faq: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "Question fréquente",
    plural: "Questions fréquentes",
  },
  admin: {
    group: "Contenu",
    useAsTitle: "question",
    defaultColumns: ["question", "displayOrder", "updatedAt"],
    description: "Questions / réponses affichées sur la page tarifs.",
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  defaultSort: "displayOrder",
  fields: [
    {
      name: "question",
      type: "text",
      label: "Question",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      label: "Réponse",
      required: true,
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Ordre d'affichage",
      defaultValue: 0,
      admin: {
        description: "Les plus petits nombres apparaissent en premier.",
      },
    },
  ],
};
