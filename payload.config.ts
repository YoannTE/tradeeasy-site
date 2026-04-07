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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
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
  },
});
