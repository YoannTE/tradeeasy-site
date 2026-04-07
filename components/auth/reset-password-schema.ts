import { z } from "zod";

export function createResetPasswordSchema(t: (key: string) => string) {
  return z
    .object({
      password: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMismatch"),
      path: ["confirmPassword"],
    });
}

/** Default schema for non-translated contexts (API routes) */
export const resetPasswordSchema = createResetPasswordSchema((key) => {
  const defaults: Record<string, string> = {
    passwordMin: "Password must be at least 8 characters",
    confirmPasswordRequired: "Please confirm your password",
    passwordsMismatch: "Passwords do not match",
  };
  return defaults[key] || key;
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
