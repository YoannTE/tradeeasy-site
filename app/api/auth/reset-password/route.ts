import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";

const resetPasswordBodySchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = resetPasswordBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input. Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const { token, password } = parsed.data;
    const payload = await getPayload({ config });

    await payload.resetPassword({
      collection: "users",
      data: { token, password },
      overrideAccess: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[reset-password] Error:", error);

    const message =
      error instanceof Error && error.message.includes("Token")
        ? "This reset link is invalid or has expired. Please request a new one."
        : "Something went wrong. Please try again.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
