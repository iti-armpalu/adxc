"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Lock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DemoActions } from "@/components/demo/demo-actions";
import { lock } from "@/lib/gate/actions";
import { PERSONAS, getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";
import { CopyEmail } from "@/components/layout/copy-email";
import { GATE_CONTACT_EMAIL } from "@/lib/gate/config";
import { MAIN_SITE_URL } from "@/lib/demo";

const NAV_ITEMS = [{ href: "/", label: "Overview", color: "var(--color-brand-600)" }, ...PERSONAS];

export function Header() {
    const pathname = usePathname();
    const persona = getPersona(pathname);
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <header className="adxc-brand fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-header max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                <Link href="/" className="shrink-0 transition-opacity hover:opacity-70">
                    <img src="/adxc-logo-with-tagline.svg" alt="ADXC" className="h-7 w-auto md:h-9" />
                </Link>

                <div className="flex items-center gap-2">
                    {persona && (
                        <div className="hidden sm:block">
                            <DemoActions />
                        </div>
                    )}

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu" className="size-10">
                                <Menu className="size-5 text-primary" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="bg-card flex w-full flex-col gap-0 sm:max-w-sm">
                            <SheetHeader className="h-header justify-center border-b px-4">
                                <Link href="/" onClick={close} className="w-fit">
                                    <img src="/adxc-logo-with-tagline.svg" alt="ADXC" className="h-7 w-auto" />
                                </Link>
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                            </SheetHeader>

                            <nav aria-label="Main" className="flex flex-col gap-1 p-4">
                                {NAV_ITEMS.map((item) => {
                                    const active = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={close}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium transition-colors",
                                                active
                                                    ? "bg-primary-subtle text-primary"
                                                    : "text-foreground-alt hover:bg-ghost-hover hover:text-foreground"
                                            )}
                                        >
                                            <span
                                                aria-hidden
                                                className="size-2 shrink-0 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {persona && (
                                <div className="px-4 pt-6 sm:hidden">
                                    <DemoActions layout="stacked" onAction={close} />
                                </div>
                            )}

                            <div className="mt-auto space-y-1 border-t p-4">
                                <CopyEmail
                                    email={GATE_CONTACT_EMAIL}
                                    className="w-full rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-ghost-hover hover:text-foreground"
                                />
                                <a
                                    href={MAIN_SITE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-ghost-hover hover:text-foreground"
                                >
                                    Visit adxc.ai
                                    <ArrowUpRight className="size-4" aria-hidden />
                                </a>
                                <form action={lock}>
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        className="w-full justify-start px-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <Lock className="size-4" />
                                        Lock site
                                    </Button>
                                </form>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}