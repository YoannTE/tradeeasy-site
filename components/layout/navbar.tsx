import { getUser } from "@/lib/auth/get-user";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const user = await getUser();

  const userProp =
    user && user.email ? { id: user.id, email: user.email } : null;

  return <NavbarClient user={userProp} />;
}
