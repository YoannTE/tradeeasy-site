"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  contactFormSchema,
  contactSubjectKeys,
  type ContactFormValues,
} from "./contact-form-schema";

export function ContactForm() {
  const t = useTranslations("contact");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    void data;
    toast.success(t("form.successToast"));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8"
    >
      <div className="mb-5">
        <Label htmlFor="name" className="mb-2 block text-sm text-zinc-400">
          {t("form.name")}
        </Label>
        <Input
          id="name"
          placeholder={t("form.namePlaceholder")}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-5">
        <Label htmlFor="email" className="mb-2 block text-sm text-zinc-400">
          {t("form.email")}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t("form.emailPlaceholder")}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-5">
        <Label htmlFor="subject" className="mb-2 block text-sm text-zinc-400">
          {t("form.subject")}
        </Label>
        <select
          id="subject"
          {...register("subject")}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          defaultValue=""
        >
          <option value="" disabled className="bg-zinc-900 text-zinc-500">
            {t("form.subjectPlaceholder")}
          </option>
          {contactSubjectKeys.map((key) => (
            <option key={key} value={key} className="bg-zinc-900">
              {t(`subjects.${key}`)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="message" className="mb-2 block text-sm text-zinc-400">
          {t("form.message")}
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        {isSubmitting ? t("form.sending") : t("form.submit")}
      </Button>
    </form>
  );
}
