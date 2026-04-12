import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");

  const items: TestimonialItem[] = [0, 1, 2, 3, 4, 5].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    content: t(`items.${i}.content`),
    rating: Number(t.raw(`items.${i}.rating`)),
  }));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-center text-zinc-400">{t("subtitle")}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div>
                <StarRating rating={item.rating} />
                <p className="mt-4 text-zinc-300 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-800 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
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
