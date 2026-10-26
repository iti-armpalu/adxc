"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DemoActions } from "@/components/demo/demo-actions";
import { lock } from "@/lib/gate/actions";
import { PERSONAS, getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [{ href: "/", label: "Overview" }, ...PERSONAS];

export function Header() {
    const pathname = usePathname();
    const persona = getPersona(pathname);
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
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

                        <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-sm">
                            <SheetHeader className="h-header justify-center border-b px-4">
                                <Link href="/" onClick={close} className="w-fit">
                                    <img src="/adxc-logo-with-tagline.svg" alt="ADXC" className="h-7 w-auto" />
                                </Link>
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                            </SheetHeader>

                            <nav aria-label="Main" className="flex flex-col px-4">
                                {NAV_ITEMS.map((item) => {
                                    const active = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={close}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(
                                                "border-b py-4 text-lg font-medium transition-colors",
                                                active ? "text-primary" : "text-foreground-alt hover:text-foreground"
                                            )}
                                        >
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

                            <form action={lock} className="mt-auto border-t p-4">
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                                >
                                    <Lock className="size-4" />
                                    Lock site
                                </Button>
                            </form>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}