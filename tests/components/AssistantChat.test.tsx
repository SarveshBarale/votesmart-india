import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssistantChat } from "@/components/features/assistant/AssistantChat";

// Mock crypto.randomUUID
Object.defineProperty(globalThis, "crypto", {
  value: { randomUUID: () => Math.random().toString(36).slice(2) },
});

describe("AssistantChat", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the initial greeting message", () => {
    render(<AssistantChat />);
    expect(screen.getByText(/Namaste/i)).toBeInTheDocument();
  });

  it("renders quick question chips", () => {
    render(<AssistantChat />);
    expect(screen.getByText(/How do I register/i)).toBeInTheDocument();
    expect(screen.getByText(/What is NOTA/i)).toBeInTheDocument();
  });

  it("renders the text input area", () => {
    render(<AssistantChat />);
    expect(
      screen.getByPlaceholderText(/Ask about elections/i)
    ).toBeInTheDocument();
  });

  it("sends a message when Send button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const input = screen.getByPlaceholderText(/Ask about elections/i);
    await user.type(input, "What is NOTA?");

    const sendButton = screen.getByRole("button", { name: /send message/i });
    await user.click(sendButton);

    // The sent message appears in the chat log (role=article)
    const messages = screen.getAllByRole("article");
    expect(messages.some((m) => m.textContent?.includes("What is NOTA?"))).toBe(true);
  });

  it("shows thinking indicator after message is sent", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const input = screen.getByPlaceholderText(/Ask about elections/i);
    await user.type(input, "How do I vote?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Thinking dots should appear before response arrives
    expect(screen.getByRole("status", { name: /thinking/i })).toBeInTheDocument();
  });

  it("shows bot response after timeout", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const input = screen.getByPlaceholderText(/Ask about elections/i);
    await user.type(input, "What is NOTA?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    act(() => {
      jest.advanceTimersByTime(700);
    });

    await waitFor(() => {
      expect(screen.getByText(/None of the Above/i)).toBeInTheDocument();
    });
  });

  it("clears the input after sending", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const input = screen.getByPlaceholderText(/Ask about elections/i) as HTMLTextAreaElement;
    await user.type(input, "test message");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(input.value).toBe("");
  });

  it("disables Send button when input is empty", () => {
    render(<AssistantChat />);
    const sendButton = screen.getByRole("button", { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it("enables Send button when input has text", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    await user.type(
      screen.getByPlaceholderText(/Ask about elections/i),
      "hello"
    );
    expect(screen.getByRole("button", { name: /send message/i })).not.toBeDisabled();
  });

  it("sends message when Enter is pressed (without Shift)", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const input = screen.getByPlaceholderText(/Ask about elections/i);
    await user.type(input, "What is EVM?");
    await user.keyboard("{Enter}");

    expect(screen.getByText("What is EVM?")).toBeInTheDocument();
  });

  it("sends quick chip question when clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantChat />);

    const chip = screen.getByRole("button", { name: /Quick question: What is NOTA/i });
    await user.click(chip);

    // The sent message appears in the chat log (role=article)
    const messages = screen.getAllByRole("article");
    expect(messages.some((m) => m.textContent?.includes("What is NOTA?"))).toBe(true);
  });

  it("shows validation error for message over 500 chars", async () => {
    render(<AssistantChat />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    // Bypass browser maxLength by firing change directly with 501 chars
    fireEvent.change(input, { target: { value: "a".repeat(501) } });
    fireEvent.keyDown(input, { key: "Enter" });
    // Zod rejects >500 chars — error alert should appear
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has accessible chat log with aria-live", () => {
    render(<AssistantChat />);
    const log = screen.getByRole("log");
    expect(log).toHaveAttribute("aria-live", "polite");
  });

  it("has accessible label on the textarea", () => {
    render(<AssistantChat />);
    const textarea = screen.getByLabelText(/Type your question about elections/i);
    expect(textarea).toBeInTheDocument();
  });
});
