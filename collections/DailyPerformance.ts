import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

const assetOptions = [
  { label: "DAX 40", value: "dax40" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "EUR/USD", value: "eurusd" },
  { label: "Gold", value: "gold" },
  { label: "Dow Jones", value: "dowjones" },
  { label: "Nasdaq", value: "nasdaq" },
  { label: "S&P 500", value: "sp500" },
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
      maxRows: 6,
      admin: {
        description:
          "Add up to 6 screenshots (3 per row, 2 rows) — one per asset.",
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
          name: "timeframe",
          type: "text",
          label: "Chart timeframe",
          admin: {
            placeholder: "e.g. 1 minute Chart",
            description:
              "Optional. If left empty, a default timeframe will be shown for the selected asset.",
          },
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
