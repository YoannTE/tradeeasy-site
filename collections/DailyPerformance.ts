import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

const assetOptions = [
  { label: "DAX 40", value: "dax40" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "EUR/USD", value: "eurusd" },
  { label: "Or", value: "gold" },
  { label: "Dow Jones", value: "dowjones" },
  { label: "Nasdaq", value: "nasdaq" },
  { label: "S&P 500", value: "sp500" },
  { label: "Solana", value: "solana" },
];

export const DailyPerformance: CollectionConfig = {
  slug: "daily-performance",
  labels: {
    singular: "Performance quotidienne",
    plural: "Performances quotidiennes",
  },
  admin: {
    group: "Performances",
    useAsTitle: "date",
    defaultColumns: ["date", "updatedAt"],
    description: "Publie ici les screenshots de trades du jour.",
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
        description: "Jour de trading concerné par ces screenshots.",
      },
    },
    {
      name: "screenshots",
      type: "array",
      label: "Screenshots",
      labels: {
        singular: "Screenshot",
        plural: "Screenshots",
      },
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        description:
          "Jusqu'à 6 screenshots (3 par ligne, 2 lignes) — un par actif.",
      },
      fields: [
        {
          name: "asset",
          type: "select",
          label: "Actif",
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
