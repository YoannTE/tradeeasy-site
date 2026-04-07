import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Get the currently authenticated user from Payload cookies.
 * For use in Server Components only.
 * Returns the User object or null if not authenticated.
 */
export async function getUser() {
  try {
    const payload = await getPayload({ config });
    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });
    return user ?? null;
  } catch (_error) {
    // Silently fail when database is not connected (dev without PostgreSQL)
    // In production with a real database, this will work correctly
    return null;
  }
}
