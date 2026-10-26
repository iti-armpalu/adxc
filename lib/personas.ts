export type Persona = { href: string; label: string };

export const PERSONAS: Persona[] = [
  { href: "/data-providers", label: "For data providers" },
  { href: "/brands", label: "For brands" },
  { href: "/ai-platforms", label: "For AI platforms" },
  { href: "/agencies", label: "For agencies" },
];

export function getPersona(pathname: string): Persona | null {
  return (
    PERSONAS.find((p) => pathname === p.href || pathname.startsWith(`${p.href}/`)) ?? null
  );
}