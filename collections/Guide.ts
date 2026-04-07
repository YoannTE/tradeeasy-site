import type { CollectionConfig } from "payload";
import { adminOnlyAccess } from "./access/admin-only";

export const Guide: CollectionConfig = {
  slug: "guides",
  admin: {
    group: "Content",
    useAsTitle: "title",
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
      label: "Title",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      required: true,
      admin: {
        description:
          "URL-friendly identifier (e.g. install-simplifypro-tradingview)",
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
      label: "Category",
      options: [
        { label: "Installation", value: "installation" },
        { label: "Usage", value: "usage" },
        { label: "Strategy", value: "strategy" },
        { label: "Troubleshooting", value: "troubleshooting" },
      ],
    },
    {
      name: "difficulty",
      type: "select",
      label: "Difficulty",
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
      ],
    },
    {
      name: "estimatedTime",
      type: "text",
      label: "Estimated Time",
      admin: {
        description: 'e.g. "5 minutes"',
      },
    },
    {
      name: "steps",
      type: "array",
      label: "Steps",
      fields: [
        {
          name: "stepTitle",
          type: "text",
          label: "Step Title",
          required: true,
        },
        {
          name: "stepContent",
          type: "textarea",
          label: "Step Content",
          required: true,
        },
        {
          name: "stepImage",
          type: "upload",
          label: "Step Image",
          relationTo: "media",
        },
        {
          name: "stepTip",
          type: "textarea",
          label: "Tip / Advice",
        },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      label: "Published",
      defaultValue: false,
    },
    {
      name: "publishDate",
      type: "date",
      label: "Publish Date",
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
    },
  ],
};
