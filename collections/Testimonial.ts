import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Testimonial: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Témoignage",
    plural: "Témoignages",
  },
  admin: {
    group: "Contenu",
    useAsTitle: "clientName",
    description: "Témoignages clients affichés sur le site.",
    defaultColumns: ["clientName", "rating", "date"],
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      label: "Nom du client",
      required: true,
    },
    {
      name: "role",
      type: "text",
      label: "Rôle / métier",
    },
    {
      name: "content",
      type: "textarea",
      label: "Témoignage",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      label: "Note (sur 5)",
      min: 1,
      max: 5,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Photo",
    },
    {
      name: "date",
      type: "date",
      label: "Date",
    },
  ],
};
