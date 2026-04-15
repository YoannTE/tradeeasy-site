import type { CollectionConfig } from "payload";
import { adminOnlyReadAccess, adminOnlyAccess } from "./access/admin-only";

export const PromoCode: CollectionConfig = {
  slug: "promo-codes",
  labels: {
    singular: "Code promo",
    plural: "Codes promo",
  },
  admin: {
    group: "Marketing",
    useAsTitle: "code",
    description: "Codes de réduction utilisables au checkout.",
    defaultColumns: [
      "code",
      "discountType",
      "discountValue",
      "active",
      "currentUses",
      "validUntil",
    ],
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
      admin: {
        description: "Le code que le client saisit (ex : BIENVENUE20).",
      },
    },
    {
      name: "discountType",
      type: "select",
      label: "Type de remise",
      required: true,
      options: [
        { label: "Pourcentage (%)", value: "percentage" },
        { label: "Montant fixe (€)", value: "fixed_amount" },
      ],
    },
    {
      name: "discountValue",
      type: "number",
      label: "Valeur de la remise",
      required: true,
    },
    {
      name: "appliesTo",
      type: "select",
      label: "Appliqué à",
      defaultValue: "both",
      options: [
        { label: "Mensuel", value: "monthly" },
        { label: "Annuel", value: "annual" },
        { label: "Les deux", value: "both" },
      ],
    },
    {
      name: "duration",
      type: "select",
      label: "Durée",
      defaultValue: "once",
      options: [
        { label: "Une seule fois", value: "once" },
        { label: "Plusieurs mois", value: "repeating" },
        { label: "À vie", value: "forever" },
      ],
    },
    {
      name: "validFrom",
      type: "date",
      label: "Valide à partir du",
    },
    {
      name: "validUntil",
      type: "date",
      label: "Valide jusqu'au",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Actif",
      defaultValue: true,
    },
    {
      name: "maxUses",
      type: "number",
      label: "Nombre d'utilisations maximum",
      admin: {
        description: "Laisser vide pour illimité.",
      },
    },
    {
      name: "currentUses",
      type: "number",
      label: "Utilisations actuelles",
      defaultValue: 0,
      admin: {
        readOnly: true,
        description:
          "Incrémenté automatiquement à chaque paiement réussi — ne pas modifier manuellement.",
      },
    },
  ],
};
