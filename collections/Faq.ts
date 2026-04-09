import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Faq: CollectionConfig = {
  slug: "faqs",
  admin: {
    group: "Content",
    useAsTitle: "question",
    defaultColumns: ["question", "displayOrder", "updatedAt"],
    description: "Frequently asked questions displayed on the pricing page.",
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
      label: "Answer",
      required: true,
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first.",
      },
    },
  ],
};
