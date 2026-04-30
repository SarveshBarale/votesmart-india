import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationTabs } from "@/components/features/registration/RegistrationTabs";
import { ElectionCard } from "@/components/features/elections/ElectionCard";
import { ELECTIONS_DATA } from "@/lib/data/elections";

describe("RegistrationTabs", () => {
  it("renders the registration guide heading", () => {
    render(<RegistrationTabs />);
    expect(screen.getByRole("heading", { name: /voter registration guide/i })).toBeInTheDocument();
  });

  it("renders all four tab buttons", () => {
    render(<RegistrationTabs />);
    expect(screen.getByRole("tab", { name: /new registration/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /correction/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /nri voters/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /verify/i })).toBeInTheDocument();
  });

  it("shows Form 6 panel by default", () => {
    render(<RegistrationTabs />);
    expect(screen.getByRole("tab", { name: /new registration/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText(/New Registration \(Form 6\)/i)).toBeInTheDocument();
  });

  it("switches to Correction tab when clicked", async () => {
    const user = userEvent.setup();
    render(<RegistrationTabs />);
    await user.click(screen.getByRole("tab", { name: /correction/i }));
    expect(screen.getByRole("tab", { name: /correction/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText(/Correction \/ Update \(Form 8\)/i)).toBeInTheDocument();
  });

  it("switches to NRI Voters tab when clicked", async () => {
    const user = userEvent.setup();
    render(<RegistrationTabs />);
    await user.click(screen.getByRole("tab", { name: /nri voters/i }));
    expect(screen.getByText(/NRI Voters \(Form 6A\)/i)).toBeInTheDocument();
  });

  it("switches to Verify tab when clicked", async () => {
    const user = userEvent.setup();
    render(<RegistrationTabs />);
    await user.click(screen.getByRole("tab", { name: /verify/i }));
    expect(screen.getByText(/Verify Registration/i)).toBeInTheDocument();
  });

  it("tablist has accessible label", () => {
    render(<RegistrationTabs />);
    expect(screen.getByRole("tablist", { name: /registration form types/i })).toBeInTheDocument();
  });

  it("active tab panel is visible", () => {
    render(<RegistrationTabs />);
    const activePanel = screen.getByRole("tabpanel", { hidden: false });
    expect(activePanel).toBeInTheDocument();
  });

  it("inactive tab panels are hidden", () => {
    render(<RegistrationTabs />);
    const allPanels = screen.getAllByRole("tabpanel", { hidden: true });
    // 4 panels total, 3 should be hidden
    const hiddenPanels = allPanels.filter((p) => p.hasAttribute("hidden"));
    expect(hiddenPanels.length).toBe(3);
  });

  it("official link is present", () => {
    render(<RegistrationTabs />);
    expect(screen.getAllByRole("link", { name: /voters.eci.gov.in/i }).length).toBeGreaterThan(0);
  });
});

describe("ElectionCard", () => {
  const election = ELECTIONS_DATA[0]; // Lok Sabha

  it("renders the election title", () => {
    render(<ElectionCard election={election} />);
    expect(screen.getByText(election.title)).toBeInTheDocument();
  });

  it("renders the short description", () => {
    render(<ElectionCard election={election} />);
    expect(screen.getByText(election.shortDesc)).toBeInTheDocument();
  });

  it("starts collapsed", () => {
    render(<ElectionCard election={election} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("expands when clicked", async () => {
    const user = userEvent.setup();
    render(<ElectionCard election={election} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("shows details after expanding", async () => {
    const user = userEvent.setup();
    render(<ElectionCard election={election} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText(election.details[0])).toBeInTheDocument();
  });

  it("collapses when clicked again", async () => {
    const user = userEvent.setup();
    render(<ElectionCard election={election} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("renders frequency and conductedBy badges", () => {
    render(<ElectionCard election={election} />);
    expect(screen.getByText(election.frequency)).toBeInTheDocument();
    expect(screen.getByText(election.conductedBy)).toBeInTheDocument();
  });

  it("button has aria-controls pointing to detail region", () => {
    render(<ElectionCard election={election} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-controls", `election-detail-${election.id}`);
  });
});
