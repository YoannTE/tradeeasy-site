import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const TradeScreenshot: CollectionConfig = {
  slug: "trade-screenshots",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "asset",
      type: "text",
      label: "Asset",
      admin: {
        description: 'e.g. "EUR/USD"',
      },
    },
    {
      name: "result",
      type: "text",
      label: "Result",
      admin: {
        description: 'e.g. "+120 pips"',
      },
    },
    {
      name: "tradeDate",
      type: "date",
      label: "Trade Date",
    },
  ],
};
