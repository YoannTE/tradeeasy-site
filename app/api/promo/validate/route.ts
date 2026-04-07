import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";
import { cookies } from "next/headers";

const promoSchema = z.object({
  code: z.string().min(1).max(50),
});

const messages = {
  en: {
    noCode: "Please provide a promo code.",
    invalid: "Invalid or expired promo code.",
    generic: "Something went wrong.",
  },
  fr: {
    noCode: "Veuillez fournir un code promo.",
    invalid: "Code promo invalide ou expire.",
    generic: "Une erreur est survenue.",
  },
} as const;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
  const msg = messages[locale];

  try {
    const body = await request.json();
    const parsed = promoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, message: msg.noCode },
        { status: 400 },
      );
    }

    const { code } = parsed.data;
    const payload = await getPayload({ config });

    // Look up the promo code (overrideAccess because PromoCode is admin-only read)
    const result = await payload.find({
      collection: "promo-codes",
      overrideAccess: true,
      where: {
        and: [{ code: { equals: code } }, { active: { equals: true } }],
      },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return NextResponse.json({ valid: false, message: msg.invalid });
    }

    const promo = result.docs[0];
    const now = new Date();

    // Check validity period
    if (promo.validFrom && new Date(promo.validFrom) > now) {
      return NextResponse.json({ valid: false, message: msg.invalid });
    }

    if (promo.validUntil && new Date(promo.validUntil) < now) {
      return NextResponse.json({ valid: false, message: msg.invalid });
    }

    // Check usage limit
    if (
      promo.maxUses !== null &&
      promo.maxUses !== undefined &&
      typeof promo.currentUses === "number" &&
      promo.currentUses >= promo.maxUses
    ) {
      return NextResponse.json({ valid: false, message: msg.invalid });
    }

    // Do NOT increment currentUses here — that happens at checkout
    return NextResponse.json({
      valid: true,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      appliesTo: promo.appliesTo,
    });
  } catch (error) {
    console.error("[promo/validate] Error:", error);
    return NextResponse.json(
      { valid: false, message: msg.generic },
      { status: 500 },
    );
  }
}
