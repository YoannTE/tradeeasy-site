import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

const assetOptions = [
  { label: "Nasdaq", value: "nasdaq" },
  { label: "Dow Jones", value: "dowjones" },
  { label: "S&P 500", value: "sp500" },
  { label: "Gold", value: "gold" },
  { label: "DAX 40", value: "dax40" },
  { label: "EUR/USD", value: "eurusd" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Solana", value: "solana" },
];

export const DailyPerformance: CollectionConfig = {
  slug: "daily-performance",
  admin: {
    group: "Content",
    useAsTitle: "date",
    defaultColumns: ["date", "updatedAt"],
    description: "Upload your daily trading screenshots here.",
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  defaultSort: "-date",
  fields: [
    {
      name: "date",
      type: "date",
      label: "Date",
      required: true,
      unique: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "yyyy-MM-dd",
        },
        description: "The trading day for these screenshots.",
      },
    },
    {
      name: "screenshots",
      type: "array",
      label: "Screenshots",
      required: true,
      minRows: 1,
      maxRows: 8,
      admin: {
        description: "Add one screenshot per asset (up to 8).",
      },
      fields: [
        {
          name: "asset",
          type: "select",
          label: "Asset",
          required: true,
          options: assetOptions,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Screenshot",
          required: true,
        },
      ],
    },
  ],
};
