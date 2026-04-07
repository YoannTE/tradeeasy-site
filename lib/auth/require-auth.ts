import { redirect } from "next/navigation";
import { getUser } from "./get-user";

/**
 * Require authentication for a Server Component page.
 * Redirects to /login if the user is not authenticated.
 * Returns the authenticated user.
 */
export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
