import { getPayload } from "payload";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const payload = await getPayload({ config });

  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    limit: 10,
    sort: "createdAt",
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <span className="text-4xl text-zinc-700 leading-none">
                &ldquo;
              </span>
              <p className="mt-2 text-zinc-300 italic leading-relaxed">
                {item.content}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-700" />
                <div>
                  <p className="font-semibold text-white">{item.clientName}</p>
                  <p className="text-sm text-zinc-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
