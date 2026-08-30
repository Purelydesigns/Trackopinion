"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * Dropdown styled to match the rest of the form.
 *
 * A native `<select>` renders its open list with the operating system's own
 * chrome — on Windows that is a hard blue highlight and grey text, which sits
 * badly next to everything else here. This is a listbox built from a button and
 * a panel so the open state matches the design.
 *
 * Keyboard support mirrors a native select: Up/Down move through options, Home
 * and End jump to the ends, Enter or Space commits, Escape closes and returns
 * focus to the trigger.
 */
export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  labelClassName = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  labelClassName?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* Close on click outside. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /* Keep the highlighted option in view when navigating by keyboard. */
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function commit(option: string) {
    onChange(option);
    setOpen(false);
    rootRef.current?.querySelector("button")?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(options[active]);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <label id={`${id}-label`} className={labelClassName} htmlFor={`${id}-button`}>
        {label}
      </label>

      <button
        id={`${id}-button`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-button`}
        onClick={() => {
          setActive(Math.max(0, options.indexOf(value)));
          setOpen((v) => !v);
        }}
        className={`w-full flex items-center justify-between gap-2 rounded-lg border bg-white px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
          open ? "border-accent" : "border-gray-200 hover:border-gray-300"
        } ${value ? "text-gray-900" : "text-gray-400"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          aria-hidden
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={-1}
          className="absolute z-30 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl"
        >
          {options.map((option, i) => {
            const selected = option === value;
            return (
              <li key={option} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(option)}
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === active ? "bg-highlight text-primary" : "text-gray-700"
                  } ${selected ? "font-semibold" : "font-medium"}`}
                >
                  {option}
                  {selected && <Check aria-hidden className="w-4 h-4 shrink-0" strokeWidth={3} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
