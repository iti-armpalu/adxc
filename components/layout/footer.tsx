import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { PERSONAS } from "@/lib/personas";
import { GATE_CONTACT_EMAIL } from "@/lib/gate/config";
import { CopyEmail } from "./copy-email";

const MAIN_SITE = "https://adxc.ai";

const EXPLORE = [
    { href: "/", label: "Overview" },
    ...PERSONAS.map((p) => ({ href: p.href, label: p.label })),
];

const LEGAL = [
    { label: "Privacy notice", href: `${MAIN_SITE}/legal/privacy` },
    { label: "Terms of service", href: `${MAIN_SITE}/legal/terms` },
    { label: "Cookie policy", href: `${MAIN_SITE}/legal/cookies` },
];

const HEADING = "text-sm font-medium text-primary-foreground";
const LINK = "text-sm text-brand-200 transition-colors hover:text-primary-foreground";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="adxc-brand relative isolate overflow-hidden bg-brand-700 text-primary-foreground">
            {/* Halo glow + grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 90% at 70% 100%, var(--color-brand-400) 0%, transparent 70%)",
                }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
                    {/* Brand */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block transition-opacity hover:opacity-70">
                            {/* Plain <img> for SVG per convention */}
                            <img
                                src="/adxc-logo-with-tagline.svg"
                                alt="ADXC"
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-brand-100">
                            The Agentic Data Exchange that gives companies access to the marketing data they need, and
                            only charges for what they use.
                        </p>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Footer" className="space-y-4">
                        <p className={HEADING}>Explore</p>
                        <ul className="space-y-2.5">
                            {EXPLORE.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={LINK}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div className="space-y-4">
                        <p className={HEADING}>Get in touch</p>
                        <ul className="space-y-2.5">
                            <li>
                                <CopyEmail email={GATE_CONTACT_EMAIL} className={LINK} />
                            </li>
                            <li>
                                <a
                                    href={MAIN_SITE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${LINK} inline-flex items-center gap-1`}
                                >
                                    Visit adxc.ai
                                    <ArrowUpRight className="size-4" aria-hidden />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-brand-300">
                        &copy; {year} ADXC. All rights reserved.
                        <span className="mt-1 block sm:ml-2 sm:mt-0 sm:inline">
                            Confidential investor preview. Please don&apos;t share this link.
                        </span>
                    </p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {LEGAL.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-brand-200 transition-colors hover:text-primary-foreground"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}