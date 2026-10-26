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
import { logoutAction } from "@/lib/gate-logout";
import Image from "next/image";

const NAV_ITEMS = [
    { href: "/data-providers", label: "For data providers" },
    { href: "/brands", label: "For brands" },
    { href: "/ai-platforms", label: "For AI platforms" },
    { href: "/agencies", label: "For agencies" },
] as const;

export default function Header({ showDemoButtons = true }: { showDemoButtons?: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">



                {/* Logo */}
                <Link href="/" className="shrink-0 hover:opacity-70 transition-opacity w-[120px]">
                    <img
                        src="/adxc-logo-with-tagline.svg"
                        alt="ADXC logo"
                        className="transition-all duration-300 w-auto h-7 sm:h-8 lg:h-10"
                    />
                </Link>


                <div className="hidden sm:inline-flex">
                    {showDemoButtons ? <DemoButtons /> : null}
                </div>

                <div className="flex items-center gap-2">
                    {/* Hamburger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu" className="h-10 w-10 bg-ghost hover:bg-ghost-hover">
                                <Menu className="h-5 w-5 text-primary" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="flex flex-col">
                            <SheetHeader className="space-y-0">
                                <div className="flex items-center justify-between">
                                    <Link href="/" onClick={() => setOpen(false)}>
                                        <img
                                            src="/adxc-logo-with-tagline.svg"
                                            alt="ADXC logo"
                                            className="transition-all duration-300 w-auto h-7 sm:h-8 lg:h-10"
                                        />

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
                                        className="text-base font-medium text-foreground-alt hover:text-foreground transition"
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
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    );
}