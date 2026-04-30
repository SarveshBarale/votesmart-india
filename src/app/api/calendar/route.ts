import { NextRequest, NextResponse } from "next/server";
import { CalendarEventSchema } from "@/lib/validations/journey";

/**
 * Google Calendar API integration.
 *
 * In production this route:
 * 1. Receives the user's OAuth access token from the Authorization header
 *    (obtained via Firebase Auth / Google Sign-In with calendar scope).
 * 2. Calls the Google Calendar API on behalf of the user.
 * 3. Creates an event in their primary calendar.
 *
 * The client secret never leaves the server — only the user's access token
 * is sent from the browser, keeping credentials secure.
 */

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

export async function POST(req: NextRequest) {
  // Validate Authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Authentication required. Please sign in with Google." },
      { status: 401 }
    );
  }
  const accessToken = authHeader.slice(7);

  // Parse & validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = CalendarEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const { title, description, startDate, endDate, reminderMinutes } = parsed.data;

  // Build Google Calendar event payload
  const calendarEvent = {
    summary: title,
    description: `${description ?? ""}\n\nCreated by VoteSmart India — For official updates visit eci.gov.in`,
    start: { date: startDate, timeZone: "Asia/Kolkata" },
    end: { date: endDate, timeZone: "Asia/Kolkata" },
    reminders: {
      useDefault: false,
      overrides: reminderMinutes
        ? [{ method: "popup", minutes: reminderMinutes }]
        : [],
    },
    source: {
      title: "VoteSmart India",
      url: process.env.NEXT_PUBLIC_APP_URL ?? "https://votesmart.india",
    },
  };

  try {
    const res = await fetch(
      `${CALENDAR_API_BASE}/calendars/primary/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendarEvent),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        {
          success: false,
          error:
            error?.error?.message ??
            "Failed to create calendar event. Please try again.",
        },
        { status: res.status }
      );
    }

    const created = await res.json();
    return NextResponse.json(
      {
        success: true,
        data: { eventId: created.id, htmlLink: created.htmlLink },
        message: "Election reminder added to your Google Calendar.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to connect to Google Calendar. Please try again." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405 }
  );
}
