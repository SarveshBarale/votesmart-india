import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimelineView } from "@/components/features/timeline/TimelineView";
import { TIMELINE_DATA } from "@/lib/data/timeline";

describe("TimelineView", () => {
  it("renders all timeline items", () => {
    render(<TimelineView items={TIMELINE_DATA} />);
    TIMELINE_DATA.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("all items start collapsed", () => {
    render(<TimelineView items={TIMELINE_DATA} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands an item when clicked", async () => {
    const user = userEvent.setup();
    render(<TimelineView items={TIMELINE_DATA} />);

    const firstButton = screen.getAllByRole("button")[0];
    await user.click(firstButton);

    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(TIMELINE_DATA[0].details)).toBeInTheDocument();
  });

  it("collapses an item when clicked again", async () => {
    const user = userEvent.setup();
    render(<TimelineView items={TIMELINE_DATA} />);

    const firstButton = screen.getAllByRole("button")[0];
    await user.click(firstButton);
    await user.click(firstButton);

    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes previous item when a new one is opened", async () => {
    const user = userEvent.setup();
    render(<TimelineView items={TIMELINE_DATA} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("has accessible region for each expanded item", async () => {
    const user = userEvent.setup();
    render(<TimelineView items={TIMELINE_DATA} />);

    const firstButton = screen.getAllByRole("button")[0];
    await user.click(firstButton);

    const regions = screen.getAllByRole("region");
    expect(regions.length).toBeGreaterThan(0);
  });

  it("renders step numbers", () => {
    render(<TimelineView items={TIMELINE_DATA} />);
    TIMELINE_DATA.forEach((item) => {
      expect(screen.getByText(`Step ${item.step}`)).toBeInTheDocument();
    });
  });

  it("renders all 7 timeline stages", () => {
    render(<TimelineView items={TIMELINE_DATA} />);
    expect(TIMELINE_DATA).toHaveLength(7);
    expect(screen.getByText("Election Announcement")).toBeInTheDocument();
    expect(screen.getByText("Result Declaration")).toBeInTheDocument();
  });

  it("timeline list has accessible label", () => {
    render(<TimelineView items={TIMELINE_DATA} />);
    expect(
      screen.getByRole("list", { name: /election timeline stages/i })
    ).toBeInTheDocument();
  });
});
