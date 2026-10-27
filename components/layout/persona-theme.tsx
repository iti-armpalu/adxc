"use client";

import { usePathname } from "next/navigation";
import { getPersona } from "@/lib/personas";

// Sets data-persona so globals.css can swap the semantic colour tokens
export function PersonaTheme({ children }: { children: React.ReactNode }) {
    const persona = getPersona(usePathname());
    return <div data-persona={persona ? persona.href.slice(1) : undefined}>{children}</div>;
}