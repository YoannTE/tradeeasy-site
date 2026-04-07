import { z } from "zod";

export const contactSubjectKeys = [
  "general",
  "technical",
  "billing",
  "partnership",
  "other",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.enum(contactSubjectKeys, {
    message: "Please select a subject",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
