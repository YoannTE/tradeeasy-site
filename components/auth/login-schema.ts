import { z } from "zod";

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email(t("emailRequired")),
    password: z.string().min(1, t("passwordRequired")),
  });
}

/** Default schema for non-translated contexts (API routes) */
export const loginSchema = createLoginSchema((key) => {
  const defaults: Record<string, string> = {
    emailRequired: "Please enter a valid email address",
    passwordRequired: "Password is required",
  };
  return defaults[key] || key;
});

export type LoginFormData = z.infer<typeof loginSchema>;
