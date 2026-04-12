import type { CollectionConfig } from "payload";
import { adminOnlyAccess } from "./access/admin-only";

export const ProcessedStripeEvent: CollectionConfig = {
  slug: "processed-stripe-events",
  admin: {
    group: "System",
    useAsTitle: "eventId",
  },
  access: {
    read: adminOnlyAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "eventId",
      type: "text",
      label: "Stripe Event ID",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "eventType",
      type: "text",
      label: "Event Type",
      required: true,
    },
    {
      name: "processedAt",
      type: "date",
      label: "Processed At",
      required: true,
    },
  ],
};
