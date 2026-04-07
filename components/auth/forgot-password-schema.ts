import { z } from "zod";

export function createForgotPasswordSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email(t("emailRequired")),
  });
}

/** Default schema for non-translated contexts (API routes) */
export const forgotPasswordSchema = createForgotPasswordSchema((key) => {
  const defaults: Record<string, string> = {
    emailRequired: "Please enter a valid email address",
  };
  return defaults[key] || key;
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
