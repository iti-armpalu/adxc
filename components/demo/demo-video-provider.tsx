"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DemoVideoContextValue = {
    openVideo: (url: string, title?: string) => void;
    closeVideo: () => void;
};

const DemoVideoContext = createContext<DemoVideoContextValue | null>(null);

export function DemoVideoProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState({ url: "", title: "Prototype demo" });

    const value = useMemo<DemoVideoContextValue>(
        () => ({
            openVideo: (url, title = "Prototype demo") => {
                setVideo({ url, title });
                setOpen(true);
            },
            closeVideo: () => setOpen(false),
        }),
        []
    );

    return (
        <DemoVideoContext.Provider value={value}>
            {children}

            {/* Single global dialog; content unmounts on close, which stops playback */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
                    <DialogHeader className="p-4">
                        <DialogTitle>{video.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full bg-black">
                        {video.url && (
                            <iframe
                                key={video.url}
                                src={video.url}
                                title={video.title}
                                className="size-full"
                                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                                allowFullScreen
                            />
                        )}
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