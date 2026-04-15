import type { CollectionConfig } from "payload";
import {
  adminOrOwnByUserFieldAccess,
  adminOnlyAccess,
} from "./access/admin-only";

const STRIPE_SYNCED_DESCRIPTION =
  "Synchronisé depuis Stripe — ne pas modifier manuellement.";

export const Subscription: CollectionConfig = {
  slug: "subscriptions",
  labels: {
    singular: "Abonnement",
    plural: "Abonnements",
  },
  admin: {
    group: "Abonnés",
    useAsTitle: "stripeSubscriptionId",
    description: "Abonnements synchronisés automatiquement depuis Stripe.",
    defaultColumns: ["user", "type", "status", "nextRenewalDate"],
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
      label: "Client",
    },
    {
      name: "type",
      type: "select",
      label: "Formule",
      options: [
        { label: "Mensuel", value: "monthly" },
        { label: "Annuel", value: "annual" },
      ],
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "status",
      type: "select",
      label: "Statut",
      options: [
        { label: "Essai", value: "trial" },
        { label: "Actif", value: "active" },
        { label: "Paiement échoué", value: "payment_failed" },
        { label: "Annulé", value: "cancelled" },
        { label: "Expiré", value: "expired" },
      ],
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Date de début",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "trialActivatedAt",
      type: "date",
      label: "Essai activé le",
    },
    {
      name: "trialEndDate",
      type: "date",
      label: "Fin de l'essai",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "nextRenewalDate",
      type: "date",
      label: "Prochain renouvellement",
      admin: {
        readOnly: true,
        description: STRIPE_SYNCED_DESCRIPTION,
      },
    },
    {
      name: "stripeSubscriptionId",
      type: "text",
      label: "ID Abonnement Stripe",
      unique: true,
    },
    {
      name: "paymentFailedAt",
      type: "date",
      label: "Échec de paiement le",
      admin: {
        readOnly: true,
        description:
          "Date du premier échec de paiement — utilisé pour la période de grâce.",
      },
    },
    {
      name: "stripeEventId",
      type: "text",
      label: "Dernier ID événement Stripe (obsolète)",
      admin: {
        readOnly: true,
        description:
          "Obsolète — l'idempotence est gérée par la collection Événements Stripe traités.",
      },
    },
    {
      name: "promoCodeUsed",
      type: "relationship",
      relationTo: "promo-codes",
      label: "Code promo utilisé",
    },
    {
      name: "lastSyncedAt",
      type: "date",
      label: "Dernière synchro",
    },
  ],
};
