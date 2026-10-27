"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(t);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
        } catch {
            // Clipboard blocked: the address is still selectable text
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy email address ${email}`}
            className={cn("group inline-flex items-center gap-2 text-left", className)}
        >
            <span className="select-all">{email}</span>
            {copied ? (
                <Check className="size-4" aria-hidden />
            ) : (
                <Copy className="size-4 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
            )}
            <span aria-live="polite" className="sr-only">
                {copied ? "Email copied to clipboard" : ""}
            </span>
        </button>
    );
}