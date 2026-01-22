"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    href: string;
    label: string;
};

const NAV_ITEMS: readonly NavItem[] = [
    { href: "/brands", label: "Brands" },
    { href: "/data-providers", label: "Data Providers" },
    { href: "/ai-platforms", label: "AI Platforms" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                {/* Optional title / logo */}
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                    <ArrowLeft
                        className="h-4 w-4 transition group-hover:-translate-x-0.5"
                        aria-hidden
                    />
                    Back to the main page
                </Link>

                <nav aria-label="Primary">
                    <ul className="flex gap-3 rounded-full bg-zinc-100 px-3 py-2">
                        {NAV_ITEMS.map((item) => {
                            const active = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={[
                                            "rounded-full px-4 py-1 text-sm font-medium transition",
                                            active
                                                ? "bg-white text-zinc-950"
                                                : "text-zinc-600 hover:text-white hover:bg-zinc-800",
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
