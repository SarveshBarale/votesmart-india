import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GlossaryGrid } from "@/components/features/glossary/GlossaryGrid";

describe("GlossaryGrid", () => {
  it("renders the glossary heading", () => {
    render(<GlossaryGrid />);
    expect(screen.getByRole("heading", { name: /election glossary/i })).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<GlossaryGrid />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders all glossary terms by default", () => {
    render(<GlossaryGrid />);
    expect(screen.getByText(/Electronic Voting Machine/i)).toBeInTheDocument();
    expect(screen.getAllByText(/VVPAT/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NOTA/i).length).toBeGreaterThan(0);
  });

  it("filters terms when searching", async () => {
    const user = userEvent.setup();
    render(<GlossaryGrid />);

    const search = screen.getByRole("searchbox");
    // Search for 'Mysore Paints' which only appears in the Indelible Ink definition
    await user.type(search, "Mysore Paints");

    expect(screen.getByText(/Indelible Ink/i)).toBeInTheDocument();
    // EVM heading should be filtered out
    expect(screen.queryByRole("heading", { name: /Electronic Voting Machine/i })).not.toBeInTheDocument();
  });

  it("shows no-results message for unmatched search", async () => {
    const user = userEvent.setup();
    render(<GlossaryGrid />);

    await user.type(screen.getByRole("searchbox"), "xyznonexistentterm");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    render(<GlossaryGrid />);

    await user.type(screen.getByRole("searchbox"), "nota");
    expect(screen.getByText(/None of the Above/i)).toBeInTheDocument();
  });

  it("search works on definition text", async () => {
    const user = userEvent.setup();
    render(<GlossaryGrid />);

    await user.type(screen.getByRole("searchbox"), "Mysore Paints");
    // Should find indelible ink term
    expect(screen.getByText(/Indelible Ink/i)).toBeInTheDocument();
  });

  it("related term buttons filter to that term", async () => {
    const user = userEvent.setup();
    render(<GlossaryGrid />);

    // Find and click a related term button
    const relatedButtons = screen.getAllByRole("button", { name: /Search for related term/i });
    if (relatedButtons.length > 0) {
      await user.click(relatedButtons[0]);
      // After clicking, the search input should be populated
      const search = screen.getByRole("searchbox") as HTMLInputElement;
      expect(search.value.length).toBeGreaterThan(0);
    }
  });

  it("has accessible search label", () => {
    render(<GlossaryGrid />);
    expect(screen.getByLabelText(/search glossary terms/i)).toBeInTheDocument();
  });

  it("glossary list has accessible label", () => {
    render(<GlossaryGrid />);
    expect(screen.getByRole("list", { name: /glossary terms/i })).toBeInTheDocument();
  });
});
