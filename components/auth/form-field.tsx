"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function FormField({
  label,
  type = "text",
  placeholder,
  error,
  registration,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={registration.name} className="text-zinc-300">
        {label}
      </Label>
      <Input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500"
        aria-invalid={!!error}
        {...registration}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
