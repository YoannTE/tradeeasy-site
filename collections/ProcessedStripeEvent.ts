import type { CollectionConfig } from "payload";
import { adminOnlyAccess } from "./access/admin-only";

export const ProcessedStripeEvent: CollectionConfig = {
  slug: "processed-stripe-events",
  labels: {
    singular: "Événement Stripe traité",
    plural: "Événements Stripe traités",
  },
  admin: {
    group: "Système",
    useAsTitle: "eventId",
    description:
      "Journal interne des événements Stripe (garantit l'idempotence des webhooks).",
    defaultColumns: ["eventId", "eventType", "processedAt"],
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
      label: "ID événement Stripe",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "eventType",
      type: "text",
      label: "Type d'événement",
      required: true,
    },
    {
      name: "processedAt",
      type: "date",
      label: "Traité le",
      required: true,
    },
  ],
};
