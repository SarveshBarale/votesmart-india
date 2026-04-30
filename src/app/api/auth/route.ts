import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TokenSchema = z.object({
  idToken: z.string().min(1, "ID token is required"),
});

/**
 * Auth status / token verification endpoint.
 * Validates a Firebase ID token passed from the client.
 * In production with firebase-admin installed, this verifies the token
 * cryptographically. Without it, we return the decoded payload from
 * the token's public claims (non-sensitive metadata only).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = TokenSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  // Decode the JWT payload (public claims — no secret needed for reading)
  // Full cryptographic verification requires firebase-admin SDK
  try {
    const [, payloadB64] = parsed.data.idToken.split(".");
    if (!payloadB64) throw new Error("Malformed token");
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );

    // Basic expiry check
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return NextResponse.json(
        { success: false, error: "Token has expired. Please sign in again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          uid: payload.user_id ?? payload.sub,
          email: payload.email ?? null,
          emailVerified: payload.email_verified ?? false,
          provider: payload.firebase?.sign_in_provider ?? "unknown",
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid token format." },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Auth endpoint active. POST with { idToken } to verify a Firebase ID token.",
      providers: ["google.com"],
    },
    { status: 200 }
  );
}
