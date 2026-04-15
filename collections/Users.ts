import type { CollectionConfig } from "payload";
import {
  adminOrOwnReadAccess,
  adminOrOwnUpdateAccess,
  adminOnlyAccess,
  adminOnlyFieldAccess,
} from "./access/admin-only";
import { onTradingviewAccessGranted } from "./hooks/on-tradingview-access-granted";
import { onNewUserCreated } from "./hooks/on-new-user-created";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Utilisateur",
    plural: "Utilisateurs",
  },
  auth: {
    maxLoginAttempts: 0,
  },
  admin: {
    group: "Abonnés",
    useAsTitle: "email",
    description: "Les comptes clients et leur accès TradingView.",
    defaultColumns: [
      "email",
      "firstName",
      "lastName",
      "tradingviewAccessStatus",
      "createdAt",
    ],
  },
  access: {
    read: adminOrOwnReadAccess,
    create: adminOnlyAccess,
    update: adminOrOwnUpdateAccess,
    delete: adminOnlyAccess,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && data && !data.referralCode) {
          data.referralCode = crypto.randomUUID().slice(0, 8);
        }
        return data;
      },
    ],
    afterChange: [onTradingviewAccessGranted, onNewUserCreated],
    afterLogin: [],
  },
  fields: [
    {
      name: "role",
      type: "select",
      label: "Rôle",
      defaultValue: "editor",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Éditeur", value: "editor" },
      ],
      admin: {
        description: "Niveau d'accès au back-office.",
      },
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "firstName",
      type: "text",
      label: "Prénom",
    },
    {
      name: "lastName",
      type: "text",
      label: "Nom",
    },
    {
      name: "tradingviewUsername",
      type: "text",
      label: "Nom d'utilisateur TradingView",
      unique: true,
      required: true,
      admin: {
        description:
          "Identifiant TradingView du client (utilisé pour lui donner accès à l'indicateur).",
      },
    },
    {
      name: "tradingviewAccessStatus",
      type: "select",
      label: "Statut accès TradingView",
      defaultValue: "pending",
      options: [
        { label: "En attente", value: "pending" },
        { label: "Accordé", value: "granted" },
        { label: "Révoqué", value: "revoked" },
      ],
      admin: {
        description: "Est-ce que l'indicateur a été partagé à ce client ?",
      },
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "tradingviewAccessGrantedAt",
      type: "date",
      label: "Accès accordé le",
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "stripeCustomerId",
      type: "text",
      label: "ID Client Stripe",
      admin: {
        position: "sidebar",
        description: "Référence Stripe — ne pas modifier.",
      },
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "referralCode",
      type: "text",
      label: "Code de parrainage",
      unique: true,
      admin: {
        description: "Généré automatiquement à la création.",
      },
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "referredBy",
      type: "relationship",
      relationTo: "users",
      label: "Parrainé par",
      access: {
        update: adminOnlyFieldAccess,
      },
    },
    {
      name: "lastLoginAt",
      type: "date",
      label: "Dernière connexion",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      access: {
        update: adminOnlyFieldAccess,
      },
    },
  ],
};
