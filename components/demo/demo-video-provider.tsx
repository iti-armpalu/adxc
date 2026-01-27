"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type DemoVideoState = {
    open: boolean;
    url: string | null;
    title: string;
};

type DemoVideoContextValue = {
    openVideo: (url: string, title?: string) => void;
    closeVideo: () => void;
};

const DemoVideoContext = createContext<DemoVideoContextValue | null>(null);

export function DemoVideoProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<DemoVideoState>({
        open: false,
        url: null,
        title: "Prototype Demo",
    });

    const value = useMemo<DemoVideoContextValue>(
        () => ({
            openVideo: (url, title = "Prototype Demo") =>
                setState({ open: true, url, title }),
            closeVideo: () => setState((s) => ({ ...s, open: false })),
        }),
        []
    );

    return (
        <DemoVideoContext.Provider value={value}>
            {children}

            {/* Single global dialog */}
            <Dialog open={state.open} onOpenChange={(open) => setState((s) => ({ ...s, open }))}>
                <DialogContent className="min-w-4xl p-0 overflow-hidden">
                    <DialogHeader className="p-4 pb-0">
                        <DialogTitle>ADXC Prototype Demo</DialogTitle>
                    </DialogHeader>

                    <div className="aspect-video w-full">
                        {state.url ? (
                            <iframe
                                key={state.url} // ensures reset when URL changes
                                src={state.url}
                                title={state.title}
                                className="h-full w-full"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                allowFullScreen
                            />
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </DemoVideoContext.Provider>
    );
}

export function useDemoVideo() {
    const ctx = useContext(DemoVideoContext);
    if (!ctx) throw new Error("useDemoVideo must be used within DemoVideoProvider");
    return ctx;
}
