"use client";

import { useId, useState } from "react";

type Props = { children: React.ReactNode; marker?: string };

export function Footnote({ children, marker = "*" }: Props) {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
        <span className="relative inline-block">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                aria-label="Show footnote"
                onClick={() => setOpen((o) => !o)}
                onBlur={() => setOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
                className="-m-1 p-1 align-super text-[0.8em] font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            >
                {marker}
            </button>
            {open && (
                <span
                    id={id}
                    role="note"
                    className="absolute left-1/2 top-full z-20 mt-2 w-60 -translate-x-1/2 rounded-lg border bg-card p-3 text-left text-xs font-normal leading-relaxed text-foreground-alt shadow-lg"
                >
                    {children}
                </span>
            )}
        </span>
    );
}