"use client";

import { useId, useState } from "react";

/**
 * Spam trap. Hidden from people (off-screen, not tabbable, not announced by
 * screen readers) but present in the DOM, so form-filling bots populate it.
 * `/api/lead` silently accepts and discards any submission where it is set.
 *
 * Usage:
 *   const honeypot = useHoneypot();
 *   ...
 *   <HoneypotField {...honeypot.props} />
 *   submitLead({ ...fields, website: honeypot.value })
 */
export function useHoneypot() {
  const [value, setValue] = useState("");
  return {
    value,
    props: { value, onChange: setValue },
  };
}

export default function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  // Several forms can share a page (contact + newsletter), so the id must be unique.
  const id = useId();

  return (
    <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
