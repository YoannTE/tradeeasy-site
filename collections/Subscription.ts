import type { CollectionConfig } from "payload";
import {
  adminOrOwnByUserFieldAccess,
  adminOnlyAccess,
} from "./access/admin-only";

const STRIPE_SYNCED_DESCRIPTION =
  "Synced from Stripe webhooks — do not edit manually";

export const Subscription: CollectionConfig = {
  slug: "subscriptions",
  admin: {
    group: "Subscribers",
    useAsTitle: "stripeSubscriptionId",
  },
  access: {
    read: adminOrOwnByUserFieldAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: "User",
    },
    {
      name: "type",
      type: "select",
      label: "Plan Type",
      options: [
        { label: "Monthly", value: "monthly" },
        { label: "Annual", value: "annual" },
      ],
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Trial", value: "trial" },
        { label: "Active", value: "active" },
        { label: "Payment Failed", value: "payment_failed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Expired", value: "expired" },
      ],
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "trialActivatedAt",
      type: "date",
      label: "Trial Activated At",
    },
    {
      name: "trialEndDate",
      type: "date",
      label: "Trial End Date",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "nextRenewalDate",
      type: "date",
      label: "Next Renewal Date",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "stripeSubscriptionId",
      type: "text",
      label: "Stripe Subscription ID",
      unique: true,
    },
    {
      name: "stripeEventId",
      type: "text",
      label: "Last Stripe Event ID",
      unique: true,
    },
    {
      name: "promoCodeUsed",
      type: "relationship",
      relationTo: "promo-codes",
      label: "Promo Code Used",
    },
    {
      name: "lastSyncedAt",
      type: "date",
      label: "Last Synced At",
    },
  ],
};
