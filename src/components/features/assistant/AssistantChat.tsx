"use client";

import { useState, useRef, useEffect, useId } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { getAssistantAnswer, QUICK_QUESTIONS } from "@/lib/utils/assistant";
import { ChatMessageSchema } from "@/lib/validations/journey";
import type { ChatMessage } from "@/types";

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "assistant",
  content:
    "Namaste! 🙏 I'm your VoteSmart India assistant. I can help you understand the Indian election process — voter registration, polling day, EVM, VVPAT, and more. What would you like to know?",
  timestamp: new Date(),
};

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "assistant";
  return (
    <div
      className={clsx(
        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
        isBot
          ? "bg-navy-50 text-navy-900 self-start rounded-bl-sm"
          : "bg-gradient-to-r from-saffron-600 to-saffron-400 text-white self-end rounded-br-sm"
      )}
      role="article"
      aria-label={isBot ? "Assistant message" : "Your message"}
    >
      {/* Render newlines as <br> */}
      {message.content.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < message.content.split("\n").length - 1 && <br />}
        </span>
      ))}
    </div>
  );
}

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    const parsed = ChatMessageSchema.safeParse({ content: text });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    setError("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: parsed.data.content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Simulate network latency for a realistic feel
    setTimeout(() => {
      const response = getAssistantAnswer(parsed.data.content);
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setThinking(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  };

  return (
    <Card>
      <CardTitle icon="🤖">Smart Election Assistant</CardTitle>
      <p className="text-gray-500 text-sm mb-3">
        Ask any question about the Indian election process. Factual and non-partisan answers only.
      </p>

      {/* Chat window */}
      <div
        className="border border-gray-200 rounded-xl overflow-hidden"
        aria-label="Election assistant chat"
      >
        {/* Messages */}
        <div
          className="flex flex-col gap-2.5 p-3 h-64 overflow-y-auto bg-white"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
          aria-atomic="false"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {thinking && (
            <div
              className="self-start flex gap-1.5 bg-navy-50 rounded-2xl rounded-bl-sm px-4 py-3"
              aria-label="Assistant is thinking"
              role="status"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 bg-navy-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>

        {/* Quick chips */}
        <div
          className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-gray-100 bg-gray-50"
          role="group"
          aria-label="Quick question suggestions"
        >
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              disabled={thinking}
              className="text-xs bg-saffron-50 text-saffron-600 border border-saffron-100 px-2.5 py-1 rounded-full hover:bg-saffron-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Quick question: ${q}`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 p-2.5 border-t border-gray-200 bg-white"
          aria-label="Send a question"
        >
          <label htmlFor={inputId} className="sr-only">
            Type your question about elections
          </label>
          <textarea
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) sendMessage(input.trim());
              }
            }}
            placeholder="Ask about elections, registration, voting..."
            rows={2}
            maxLength={500}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
            aria-describedby={error ? "chat-error" : undefined}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="self-end"
          >
            Send
          </Button>
        </form>
        {error && (
          <p
            id="chat-error"
            className="text-red-600 text-xs px-3 pb-2"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
      </div>

      <p className="text-gray-400 text-xs mt-2">
        This assistant answers general process questions only. Always verify with{" "}
        <a
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-600 underline"
        >
          eci.gov.in
        </a>{" "}
        or call 1950.
      </p>
    </Card>
  );
}
