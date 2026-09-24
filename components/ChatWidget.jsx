"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { answerQuestion, welcomeMessage } from "./chatKnowledge";

let messageId = 1;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [suggestions, setSuggestions] = useState(welcomeMessage.suggestions);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  const send = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;

    const userMessage = { id: `user-${messageId++}`, role: "user", text };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setSuggestions([]);
    setTyping(true);

    replyTimer.current = setTimeout(() => {
      const answer = answerQuestion(text);
      setMessages((current) => [
        ...current,
        { id: `bot-${messageId++}`, role: "bot", ...answer },
      ]);
      setSuggestions(answer.suggestions);
      setTyping(false);
    }, 650);
  };

  const openChat = () => {
    setOpen(true);
    setShowTeaser(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6" style={{ zIndex: 100 }}>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with Edge"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/60"
          >
            <header className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary px-4 py-3.5 text-white">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                E
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-emerald-300" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">Chat Us</p>
                <p className="text-xs text-white/80">Online · Agile Digital Edge</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15"
              >
                <X size={18} />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-gradient-to-br from-primary to-emerald-500 text-white"
                        : "rounded-bl-md border border-white/10 bg-white/5 text-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.links?.length > 0 && (
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {message.links.map((link) =>
                          link.href.startsWith("http") ? (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-sky-300 underline-offset-2 hover:underline"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-xs font-semibold text-sky-300 underline-offset-2 hover:underline"
                            >
                              {link.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {suggestions.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200 transition hover:border-primary/50 hover:bg-primary/15"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services, pricing..."
                aria-label="Message"
                className="h-10 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-primary/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white transition enabled:hover:brightness-110 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="flex items-end justify-end gap-3">
        {showTeaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative mb-1 max-w-[220px]"
            >
              <button
                type="button"
                onClick={openChat}
                className="rounded-2xl rounded-br-md border border-white/10 bg-[#0b0f19]/95 px-4 py-3 text-left text-sm text-gray-100 shadow-xl shadow-black/40 backdrop-blur-xl"
              >
                Hi — need help with a project?
              </button>
              <button
                type="button"
                aria-label="Dismiss greeting"
                onClick={() => setShowTeaser(false)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-[#161b27] text-gray-300"
              >
                <X size={12} />
              </button>
            </motion.div>
        )}

        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-iteration-count:2]" />
          )}
          {open ? <X size={22} className="relative" /> : <MessageCircle size={24} className="relative" />}
        </button>
      </div>
    </div>
  );
}
