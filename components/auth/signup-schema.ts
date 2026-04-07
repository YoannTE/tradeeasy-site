import { z } from "zod";

export function createSignupSchema(t: (key: string) => string) {
  return z
    .object({
      email: z.string().email(t("emailRequired")),
      password: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
      tradingviewUsername: z
        .string()
        .min(1, t("tvUsernameRequired"))
        .min(3, t("tvUsernameMin")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMismatch"),
      path: ["confirmPassword"],
    });
}

/** Default schema for non-translated contexts (API routes) */
export const signupSchema = createSignupSchema((key) => {
  const defaults: Record<string, string> = {
    emailRequired: "Please enter a valid email address",
    passwordMin: "Password must be at least 8 characters",
    confirmPasswordRequired: "Please confirm your password",
    tvUsernameRequired: "TradingView username is required",
    tvUsernameMin: "TradingView username must be at least 3 characters",
    passwordsMismatch: "Passwords do not match",
  };
  return defaults[key] || key;
});

export type SignupFormData = z.infer<typeof signupSchema>;
