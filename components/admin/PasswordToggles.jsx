"use client";

import { useCallback, useEffect, useState } from "react";

const revealedIds = new Set();

function lockRevealed(input) {
  if (input.dataset.adeLocked !== "1") {
    const proto = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "type");
    Object.defineProperty(input, "type", {
      configurable: true,
      get() {
        return "text";
      },
      set() {},
    });
    proto?.set?.call(input, "text");
    input.dataset.adeLocked = "1";
  }
  if (input.getAttribute("type") !== "text") input.setAttribute("type", "text");
}

function unlock(input) {
  if (input.dataset.adeLocked === "1") {
    Reflect.deleteProperty(input, "type");
    delete input.dataset.adeLocked;
  }
  input.type = "password";
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.5 10.7A2.5 2.5 0 0 0 12 14.5M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a18.4 18.4 0 0 1-4.1 4.7M6.1 6.4C3.7 8 2 12 2 12a18.7 18.7 0 0 0 6.2 5.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PasswordToggles() {
  const [toggles, setToggles] = useState([]);

  const measure = useCallback(() => {
    const inputs = document.querySelectorAll(
      'input[type="password"], input[data-ade-password]',
    );
    const next = [];
    inputs.forEach((input) => {
      if (!input.dataset.adePassword) {
        input.dataset.adePassword = Math.random().toString(36).slice(2);
      }
      const id = input.dataset.adePassword;
      const rect = input.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return;
      if (revealedIds.has(id)) lockRevealed(input);
      next.push({
        id,
        top: rect.top + rect.height / 2 - 16,
        left: rect.right - 40,
        revealed: revealedIds.has(id),
      });
    });
    setToggles((current) => {
      if (
        current.length === next.length &&
        current.every(
          (item, index) =>
            item.id === next[index].id &&
            item.top === next[index].top &&
            item.left === next[index].left &&
            item.revealed === next[index].revealed,
        )
      ) {
        return current;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    const observer = new MutationObserver(() => {
      document.querySelectorAll('input[data-ade-locked="1"]').forEach((input) => {
        if (input.getAttribute("type") !== "text") input.setAttribute("type", "text");
      });
      schedule();
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["type", "class", "style", "hidden"],
    });
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
    };
  }, [measure]);

  function toggleVisibility(id) {
    const input = document.querySelector(`input[data-ade-password="${CSS.escape(id)}"]`);
    if (!input) return;
    if (revealedIds.has(id)) {
      revealedIds.delete(id);
      unlock(input);
    } else {
      revealedIds.add(id);
      lockRevealed(input);
    }
    measure();
  }

  return toggles.map((toggle) => (
    <button
      key={toggle.id}
      type="button"
      className="ade-password-toggle"
      aria-label={toggle.revealed ? "Hide password" : "Show password"}
      aria-pressed={toggle.revealed}
      style={{ top: toggle.top, left: toggle.left }}
      onMouseDown={(event) => event.preventDefault()}
          onClick={() => toggleVisibility(toggle.id)}
    >
      {toggle.revealed ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  ));
}
