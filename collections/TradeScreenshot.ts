import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const TradeScreenshot: CollectionConfig = {
  slug: "trade-screenshots",
  labels: {
    singular: "Screenshot de trade",
    plural: "Screenshots de trades",
  },
  admin: {
    group: "Performances",
    useAsTitle: "title",
    description: "Preuves de trades individuelles (galerie).",
    defaultColumns: ["title", "asset", "result", "tradeDate"],
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Titre",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "asset",
      type: "text",
      label: "Actif tradé",
      admin: {
        description: 'Exemple : "EUR/USD"',
      },
    },
    {
      name: "result",
      type: "text",
      label: "Résultat",
      admin: {
        description: 'Exemple : "+120 pips"',
      },
    },
    {
      name: "tradeDate",
      type: "date",
      label: "Date du trade",
    },
  ],
};
