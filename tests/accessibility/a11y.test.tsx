import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { GlossaryGrid } from "@/components/features/glossary/GlossaryGrid";
import { TimelineView } from "@/components/features/timeline/TimelineView";
import { AccessibilitySection } from "@/components/features/accessibility/AccessibilitySection";
import { MisinfoSection } from "@/components/features/misinfo/MisinfoSection";
import { AssistantChat } from "@/components/features/assistant/AssistantChat";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { ElectionCard } from "@/components/features/elections/ElectionCard";
import { TIMELINE_DATA } from "@/lib/data/timeline";
import { ELECTIONS_DATA } from "@/lib/data/elections";

expect.extend(toHaveNoViolations);

// Suppress known react-hot-toast noise
jest.mock("react-hot-toast", () => ({
  Toaster: () => null,
}));

describe("Accessibility — axe violations", () => {
  it("GlossaryGrid has no axe violations", async () => {
    const { container } = render(<GlossaryGrid />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("TimelineView has no axe violations", async () => {
    const { container } = render(<TimelineView items={TIMELINE_DATA} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("AccessibilitySection has no axe violations", async () => {
    const { container } = render(<AccessibilitySection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("MisinfoSection has no axe violations", async () => {
    const { container } = render(<MisinfoSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Disclaimer has no axe violations", async () => {
    const { container } = render(<Disclaimer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ElectionCard has no axe violations", async () => {
    const { container } = render(
      <ElectionCard election={ELECTIONS_DATA[0]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("AssistantChat has no axe violations", async () => {
    // Extend timeout for complex component
    const { container } = render(<AssistantChat />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe("Accessibility — ARIA attributes", () => {
  it("timeline buttons have aria-expanded", () => {
    const { container } = render(<TimelineView items={TIMELINE_DATA} />);
    const buttons = container.querySelectorAll("button[aria-expanded]");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("chat log has aria-live=polite", () => {
    const { container } = render(<AssistantChat />);
    const log = container.querySelector('[aria-live="polite"]');
    expect(log).not.toBeNull();
  });

  it("disclaimer has role=note", () => {
    const { container } = render(<Disclaimer />);
    expect(container.querySelector('[role="note"]')).not.toBeNull();
  });

  it("glossary search has role=searchbox", () => {
    const { container } = render(<GlossaryGrid />);
    expect(container.querySelector('[role="searchbox"]')).not.toBeNull();
  });

  it("glossary terms have role=listitem", () => {
    const { container } = render(<GlossaryGrid />);
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items.length).toBeGreaterThan(0);
  });

  it("accessibility features have role=listitem", () => {
    const { container } = render(<AccessibilitySection />);
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items.length).toBeGreaterThan(0);
  });
});

describe("Accessibility — keyboard navigation", () => {
  it("ElectionCard button is focusable", () => {
    const { container } = render(<ElectionCard election={ELECTIONS_DATA[0]} />);
    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.tabIndex).not.toBe(-1);
  });

  it("glossary search input is focusable", () => {
    const { container } = render(<GlossaryGrid />);
    const input = container.querySelector("input[type=search]");
    expect(input).not.toBeNull();
    expect(input?.hasAttribute("tabindex") ? input.getAttribute("tabindex") : "0").not.toBe("-1");
  });

  it("all interactive elements in TimelineView are buttons with accessible names", () => {
    const { container } = render(<TimelineView items={TIMELINE_DATA} />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      // Each button should have accessible text (either textContent or aria-label)
      const hasText = (btn.textContent?.trim().length ?? 0) > 0;
      const hasLabel = btn.hasAttribute("aria-label");
      expect(hasText || hasLabel).toBe(true);
    });
  });
});
