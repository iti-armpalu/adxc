"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";

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
import { logoutAction } from "@/lib/gate-logout";

const NAV_ITEMS = [
    { href: "/brands", label: "For brands" },
    { href: "/data-providers", label: "For data providers" },
    { href: "/ai-platforms", label: "For AI platforms" },
] as const;

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/">
                    <Logo size="md" variant="full" theme="light" showGlow />
                </Link>
                <div className="flex items-center gap-2">

                    {/* Hamburger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu" className="bg-pink-100 hover:bg-pink-200">
                                <Menu className="h-5 w-5 text-adxc" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="flex flex-col">
                            <SheetHeader className="space-y-0">
                                <div className="flex items-center justify-between">
                                    <Link href="/" onClick={() => setOpen(false)}>
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
                                        onClick={() => setOpen(false)}
                                        className="text-base font-medium text-foreground/80 hover:text-foreground transition"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Demo buttons */}
                            <div className="border-t pt-6">
                                <DemoButtons
                                    variant="sheet"
                                    onAction={() => setOpen(false)}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logout */}
                    <form action={logoutAction}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    );
}
