import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";

const bodySchema = z.object({
  userId: z.union([z.string(), z.number()]),
});

/**
 * POST /api/admin/grant-tradingview-access
 * Admin-only endpoint. Flips a user's tradingviewAccessStatus to "granted",
 * which triggers the onTradingviewAccessGranted hook (trial activation + email).
 */
export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const userId = parsed.data.userId;

    const target = await payload.findByID({
      collection: "users",
      id: userId,
      overrideAccess: true,
    });

    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (target.tradingviewAccessStatus === "granted") {
      return NextResponse.json({
        data: { id: target.id, alreadyGranted: true },
      });
    }

    const updated = await payload.update({
      collection: "users",
      id: userId,
      overrideAccess: true,
      data: { tradingviewAccessStatus: "granted" },
    });

    return NextResponse.json({
      data: { id: updated.id, status: updated.tradingviewAccessStatus },
    });
  } catch (error) {
    console.error("[api] grant-tradingview-access failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
