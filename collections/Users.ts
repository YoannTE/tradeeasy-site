import type { CollectionConfig } from "payload";
import {
  adminOrOwnReadAccess,
  adminOrOwnUpdateAccess,
  adminOnlyAccess,
} from "./access/admin-only";
import { onTradingviewAccessGranted } from "./hooks/on-tradingview-access-granted";
import { onNewUserCreated } from "./hooks/on-new-user-created";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Subscribers",
    useAsTitle: "email",
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
        // Auto-generate referralCode on creation if not set
        if (operation === "create" && data && !data.referralCode) {
          data.referralCode = crypto.randomUUID().slice(0, 8);
        }
        return data;
      },
    ],
    afterChange: [onTradingviewAccessGranted, onNewUserCreated],
    afterLogin: [
      async ({ req, user }) => {
        // Update lastLoginAt directly via SQL to avoid triggering hooks
        try {
          const db = req.payload.db?.pool;
          if (db) {
            await db.query(
              "UPDATE users SET last_login_at = NOW() WHERE id = $1",
              [user.id],
            );
          }
        } catch {
          // Non-critical, silently ignore
        }
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
    },
    {
      name: "tradingviewUsername",
      type: "text",
      label: "TradingView Username",
      unique: true,
      required: true,
    },
    {
      name: "tradingviewAccessStatus",
      type: "select",
      label: "TradingView Access Status",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Granted", value: "granted" },
        { label: "Revoked", value: "revoked" },
      ],
    },
    {
      name: "tradingviewAccessGrantedAt",
      type: "date",
      label: "TradingView Access Granted At",
    },
    {
      name: "stripeCustomerId",
      type: "text",
      label: "Stripe Customer ID",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "referralCode",
      type: "text",
      label: "Referral Code",
      unique: true,
      admin: {
        description: "Auto-generated on creation if left empty",
      },
    },
    {
      name: "referredBy",
      type: "relationship",
      relationTo: "users",
      label: "Referred By",
    },
    {
      name: "lastLoginAt",
      type: "date",
      label: "Last Login At",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
};
