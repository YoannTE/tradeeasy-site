import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "@/collections/Users";
import { Subscription } from "@/collections/Subscription";
import { Media } from "@/collections/Media";
import { Video } from "@/collections/Video";
import { Testimonial } from "@/collections/Testimonial";
import { TradeScreenshot } from "@/collections/TradeScreenshot";
import { PromoCode } from "@/collections/PromoCode";
import { Guide } from "@/collections/Guide";
import { DailyPerformance } from "@/collections/DailyPerformance";
import { Faq } from "@/collections/Faq";
import { ProcessedStripeEvent } from "@/collections/ProcessedStripeEvent";
import { seedDatabase } from "@/lib/seed";
import { DailyBrief } from "@/globals/DailyBrief";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " · SimplifyPro Admin",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/simplifypro-app-icon.svg",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/components/payload-admin/Logo#Logo",
        Icon: "/components/payload-admin/Icon#Icon",
      },
      beforeDashboard: [
        "/components/payload-admin/BeforeDashboard#BeforeDashboard",
      ],
    },
  },
  collections: [
    Users,
    Subscription,
    Media,
    Video,
    Testimonial,
    TradeScreenshot,
    PromoCode,
    Guide,
    DailyPerformance,
    Faq,
    ProcessedStripeEvent,
  ],
  globals: [DailyBrief],
  localization: {
    locales: [
      { label: "Français", code: "fr" },
      { label: "English", code: "en" },
      { label: "Español", code: "es" },
      { label: "Deutsch", code: "de" },
    ],
    defaultLocale: "fr",
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@admin.com",
          password: "password",
          role: "admin",
          tradingviewUsername: "admin_simplifypro",
        },
      });
    }

    await seedDatabase(payload);
  },
});
