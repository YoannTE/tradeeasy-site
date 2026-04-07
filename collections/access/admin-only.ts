import type { Access } from "payload";

/**
 * Read access: public (everyone can read)
 */
export const publicReadAccess: Access = () => true;

/**
 * Write access: admin only
 */
export const adminOnlyAccess: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

/**
 * Read/Write access: admin only (for private collections like PromoCode)
 */
export const adminOnlyReadAccess: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

/**
 * Read access: admin reads all, user reads own records only
 * Returns a query filter for non-admin users.
 */
export const adminOrOwnReadAccess: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return { id: { equals: user.id } };
};

/**
 * Read access for related collections (e.g., Subscription)
 * Admin reads all, user reads only records where `user` field matches their ID
 */
export const adminOrOwnByUserFieldAccess: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return { user: { equals: user.id } };
};

/**
 * Update access: admin updates all, user updates own only
 */
export const adminOrOwnUpdateAccess: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return { id: { equals: user.id } };
};
