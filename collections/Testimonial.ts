import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

export const Testimonial: CollectionConfig = {
  slug: "testimonials",
  admin: {
    group: "Content",
    useAsTitle: "clientName",
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
      label: "Client Name",
      required: true,
    },
    {
      name: "role",
      type: "text",
      label: "Role",
    },
    {
      name: "content",
      type: "textarea",
      label: "Content",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      label: "Rating",
      min: 1,
      max: 5,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Avatar",
    },
    {
      name: "date",
      type: "date",
      label: "Date",
    },
  ],
};
