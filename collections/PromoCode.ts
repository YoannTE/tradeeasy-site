import type { CollectionConfig } from "payload";
import { adminOnlyReadAccess, adminOnlyAccess } from "./access/admin-only";

// NOTE: currentUses will be incremented atomically in Round 3
// (raw SQL, not read-then-write) to avoid race conditions.

export const PromoCode: CollectionConfig = {
  slug: "promo-codes",
  admin: {
    group: "Marketing",
    useAsTitle: "code",
  },
  access: {
    read: adminOnlyReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "code",
      type: "text",
      label: "Code",
      unique: true,
      required: true,
    },
    {
      name: "discountType",
      type: "select",
      label: "Discount Type",
      required: true,
      options: [
        { label: "Percentage", value: "percentage" },
        { label: "Fixed Amount", value: "fixed_amount" },
      ],
    },
    {
      name: "discountValue",
      type: "number",
      label: "Discount Value",
      required: true,
    },
    {
      name: "appliesTo",
      type: "select",
      label: "Applies To",
      defaultValue: "both",
      options: [
        { label: "Monthly", value: "monthly" },
        { label: "Annual", value: "annual" },
        { label: "Both", value: "both" },
      ],
    },
    {
      name: "duration",
      type: "select",
      label: "Duration",
      defaultValue: "once",
      options: [
        { label: "Once", value: "once" },
        { label: "Repeating", value: "repeating" },
        { label: "Forever", value: "forever" },
      ],
    },
    {
      name: "validFrom",
      type: "date",
      label: "Valid From",
    },
    {
      name: "validUntil",
      type: "date",
      label: "Valid Until",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
      defaultValue: true,
    },
    {
      name: "maxUses",
      type: "number",
      label: "Max Uses",
    },
    {
      name: "currentUses",
      type: "number",
      label: "Current Uses",
      defaultValue: 0,
      admin: {
        readOnly: true,
        description:
          "Incremented atomically via raw SQL (Round 3) — do not edit manually",
      },
    },
  ],
};
