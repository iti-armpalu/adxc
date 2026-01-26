"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import DemoButtons from "@/components/demo/demo-buttons";
import Logo from "./logo";

const NAV_ITEMS = [
    { href: "/brands", label: "Brands & SMEs" },
    { href: "/data-providers", label: "Data Providers" },
    { href: "/ai-platforms", label: "AI Platforms" },
] as const;

export default function Header() {
    return (
        <header className="w-full border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                >
                    <Logo size="md" variant="full" theme="light" showGlow />
                </Link>

                {/* Hamburger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="flex flex-col">
                        <SheetHeader className="space-y-0">
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/"
                                >
                                    <Logo size="md" variant="full" theme="light" showGlow />
                                </Link>

                                <SheetTitle className="sr-only">Menu</SheetTitle>
                            </div>
                        </SheetHeader>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-4 px-4 pb-6">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-base font-medium text-foreground/80 hover:text-foreground transition"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Demo buttons */}
                        <div className="border-t pt-6">
                            <DemoButtons variant="sheet" />

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}