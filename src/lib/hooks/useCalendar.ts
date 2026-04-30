"use client";

import { useState, useCallback } from "react";
import { auth } from "@/lib/firebase";
import type { CalendarEvent } from "@/types";

interface CalendarState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/**
 * Google Calendar integration.
 * Uses the Google Calendar API via a server-side route to avoid
 * exposing OAuth secrets in the browser.
 */
export function useCalendar() {
  const [state, setState] = useState<CalendarState>({
    loading: false,
    success: false,
    error: null,
  });

  const addEvent = useCallback(async (event: CalendarEvent) => {
    setState({ loading: true, success: false, error: null });
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Authentication required. Please sign in with Google.");

      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add event to calendar");
      }

      setState({ loading: false, success: true, error: null });
    } catch (err) {
      setState({
        loading: false,
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, []);

  /**
   * Opens a pre-filled Google Calendar URL in a new tab.
   * This is the fallback when the full API integration is not configured.
   */
  const openGoogleCalendarUrl = useCallback((event: CalendarEvent) => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      details: event.description,
      dates: `${event.startDate.replace(/-/g, "")}/${event.endDate.replace(/-/g, "")}`,
    });
    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setState({ loading: false, success: true, error: null });
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, success: false, error: null });
  }, []);

  return {
    ...state,
    addEvent,
    openGoogleCalendarUrl,
    reset,
  };
}

// Default election reminder events
export const DEFAULT_ELECTION_EVENTS: CalendarEvent[] = [
  {
    title: "Check Voter Registration — VoteSmart India",
    description:
      "Verify your name in the electoral roll at voters.eci.gov.in. Call 1950 for help.",
    startDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    reminderMinutes: 1440,
  },
  {
    title: "Election Registration Deadline — VoteSmart India",
    description:
      "Last date to register as a new voter. Visit voters.eci.gov.in or call 1950.",
    startDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    reminderMinutes: 1440,
  },
];
