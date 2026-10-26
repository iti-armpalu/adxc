"use client";

import { useActionState, useState } from "react";
import { AlertCircle, ArrowRight, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { unlock, type UnlockState } from "@/lib/gate/actions";
import { GATE_CONTACT_EMAIL } from "@/lib/gate/config";

const initialState: UnlockState = { error: null, failures: 0 };
const HELP_AFTER_FAILURES = 3;

const mailtoHref = `mailto:${GATE_CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Requesting access to ADXC"
)}&body=${encodeURIComponent(
    "Hi,\n\nI'd like access to the ADXC investor site. Please share the password.\n\nThanks!"
)}`;

export function GateForm({ next }: { next: string }) {
    const [state, action, isPending] = useActionState(unlock, initialState);
    const [showPassword, setShowPassword] = useState(false);
    // Failure number the user has typed past (hides the error)
    const [clearedAt, setClearedAt] = useState(0);
    // Failure number at which the help dialog was closed
    const [dismissedAt, setDismissedAt] = useState(0);

    const showError = Boolean(state.error) && clearedAt < state.failures;
    const helpOpen = state.failures >= HELP_AFTER_FAILURES && dismissedAt < state.failures;

    return (
        <div className="w-full max-w-sm sm:max-w-md">
            <form action={action} className="flex flex-col gap-3 sm:flex-row">
                <input type="hidden" name="next" value={next} />

                {/* key remounts on each failure to replay the shake */}
                <div
                    key={state.failures}
                    className={`relative flex-1 ${state.failures ? "animate-adxc-shake motion-reduce:animate-none" : ""
                        }`}
                >
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-invalid={showError || undefined}
                        aria-describedby={showError ? "gate-error" : undefined}
                        autoFocus={state.failures > 0}
                        required
                        onChange={() => setClearedAt(state.failures)}
                        className="h-12 px-10 text-center sm:pl-4 sm:text-left"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                </div>

                <Button type="submit" disabled={isPending} className="group h-12 w-full sm:w-auto sm:px-6">
                    {isPending ? "Unlocking…" : "Unlock"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </form>

            <p
                id="gate-error"
                role="alert"
                className="mt-2 flex min-h-5 items-center justify-center gap-2 text-sm text-destructive-text sm:justify-start"
            >
                {showError && (
                    <>
                        <AlertCircle className="size-4 shrink-0" />
                        {state.error}
                    </>
                )}
            </p>

            <p className="mt-4 text-center text-sm text-muted-foreground">
                Don&apos;t have a password?{" "}
                <a
                    href={mailtoHref}
                    className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                    Request access
                </a>
            </p>

            <Dialog open={helpOpen} onOpenChange={(open) => !open && setDismissedAt(state.failures)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Need the password?</DialogTitle>
                        <DialogDescription>
                            If you don&apos;t have it or it&apos;s not working, reach out and we&apos;ll share
                            access.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Button asChild className="w-full">
                            <a href={mailtoHref}>
                                <Mail className="size-4" />
                                Email us to request access
                            </a>
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setDismissedAt(state.failures)}
                        >
                            I&apos;ll try again
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}