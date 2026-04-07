import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Video: CollectionConfig = {
  slug: "videos",
  admin: {
    group: "Content",
    useAsTitle: "title",
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
      label: "Title",
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
      label: "YouTube URL",
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: [
        { label: "Installation", value: "installation" },
        { label: "Usage", value: "usage" },
        { label: "Strategy", value: "strategy" },
        { label: "Trading Live", value: "trading_live" },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Display Order",
    },
    {
      name: "publishDate",
      type: "date",
      label: "Publish Date",
    },
  ],
};
