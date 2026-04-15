import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";
import { publicReadAccess, adminOnlyAccess } from "./access/admin-only";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Média",
    plural: "Médias",
  },
  admin: {
    group: "Contenu",
    useAsTitle: "alt",
    description: "Bibliothèque d'images du site.",
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        fit: "cover",
      },
      {
        name: "card",
        width: 800,
        height: 600,
        fit: "cover",
      },
      {
        name: "avatar",
        width: 200,
        height: 200,
        fit: "cover",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texte alternatif",
      required: true,
      admin: {
        description: "Description courte de l'image (accessibilité et SEO).",
      },
    },
  ],
};
