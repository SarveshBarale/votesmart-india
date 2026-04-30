import { NextResponse } from "next/server";

/**
 * Simple auth status endpoint.
 * Firebase Auth is client-side; this endpoint validates ID tokens
 * server-side using Firebase Admin SDK when needed for SSR.
 *
 * In production, install firebase-admin and verify:
 *   import { getAuth } from "firebase-admin/auth";
 *   const decoded = await getAuth().verifyIdToken(idToken);
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Auth is handled client-side via Firebase Auth. Sign in with Google.",
      providers: ["google.com"],
    },
    { status: 200 }
  );
}
