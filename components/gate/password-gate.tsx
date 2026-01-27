"use client";

import { unlockAction } from "@/lib/gate-actions";
import { useActionState, useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { AlertCircle, ArrowRight, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = { nextPath: string };

type UnlockState = { ok: true } | { ok: false; error: string };

const initialState: UnlockState = { ok: false, error: "" };

export default function PasswordGate({ nextPath }: Props) {
    const [state, action, isPending] = useActionState(unlockAction, initialState);
    const [isShaking, setIsShaking] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Client-only fail counter
    const [failCount, setFailCount] = useState(0);
    const [helpOpen, setHelpOpen] = useState(false);

    const contactEmail = "iti@1pa.ai";
    const mailtoHref = useMemo(() => {
        const subject = encodeURIComponent("Requesting access to ADXC");
        const body = encodeURIComponent(
            "Hi,\n\nI’d like access to ADXC. Please share the password.\n\nThanks!"
        );
        return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }, [contactEmail]);


    useEffect(() => {
        if (!state.ok && "error" in state && state.error) {
            setFailCount((c) => {
                const next = c + 1;
                if (next >= 3) setHelpOpen(true);
                return next;
            });

            // show error temporarily
            setShowError(true);
            setIsShaking(false);

            const raf = requestAnimationFrame(() => setIsShaking(true));
            const hide = window.setTimeout(() => setShowError(false), 2000);
            const stopShake = window.setTimeout(() => setIsShaking(false), 550);

            return () => {
                cancelAnimationFrame(raf);
                clearTimeout(hide);
                clearTimeout(stopShake);
            };
        }

        // Success (you redirect server-side, but keep tidy if behavior changes)
        if (state.ok) {
            setFailCount(0);
            setHelpOpen(false);
            setShowError(false);
            setIsShaking(false);
        }

    }, [state]);

    return (

        <div
            className={`w-full max-w-xs transition-transform ${isShaking ? "animate-shake" : ""
                }`}
        >
            <form action={action} className="space-y-3">
                {/* where to redirect after unlock */}
                <input type="hidden" name="next" value={nextPath} />
                <div className="relative">
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        required
                        disabled={isPending}
                        className={`h-12 bg-background border-border text-foreground placeholder:text-muted-foreground text-center ${showError && !state.ok && "error" in state ? "border-destructive" : ""
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>


                {showError && !state.ok && "error" in state ? (
                    <div className={`w-full flex items-center justify-center gap-2 text-destructive text-sm`}>
                        <AlertCircle className="w-4 h-4" />
                        <span>
                            {state.error}
                        </span>
                    </div>
                ) : null}


                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-adxc text-primary-foreground hover:bg-primary/90 font-medium group"
                >
                    {isPending ? "Unlocking…" : "Unlock"}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </form>

            {/* After 3 failures: show a helpful panel */}
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Need the password?</DialogTitle>
                        <DialogDescription>
                            If you don’t have it or it’s not working, reach out and we’ll share access.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Primary CTA */}
                        <Button asChild className="w-full">
                            <a
                                href={mailtoHref}
                                className="inline-flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Email us to request access
                            </a>
                        </Button>

                        {/* Secondary action */}
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setHelpOpen(false)}
                        >
                            I’ll try again
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    );
}
