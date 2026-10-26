"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoVideo } from "@/components/demo/demo-video-provider";
import { DEMO_VIDEO_URL, PROTOTYPE_URL } from "@/lib/demo";
import { cn } from "@/lib/utils";

type Props = {
    layout?: "inline" | "stacked" | "section";
    onAction?: () => void; // e.g. close the menu sheet
    videoUrl?: string;
    prototypeUrl?: string;
};

const wrapperClass = {
    inline: "flex items-center gap-2",
    stacked: "flex flex-col gap-2",
    section: "flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4",
};

export function DemoActions({
    layout = "inline",
    onAction,
    videoUrl = DEMO_VIDEO_URL,
    prototypeUrl = PROTOTYPE_URL,
}: Props) {
    const { openVideo } = useDemoVideo();
    const size = layout === "section" ? "lg" : "default";
    const btnClass = cn(layout === "stacked" && "w-full", layout === "section" && "sm:px-8");

    return (
        <div className={wrapperClass[layout]}>
            <Button
                variant="outline"
                size={size}
                className={btnClass}
                onClick={() => {
                    onAction?.();
                    openVideo(videoUrl, "ADXC prototype demo");
                }}
            >
                <Play className="size-4" />
                Watch the prototype
            </Button>

            <Button size={size} asChild className={btnClass}>
                <a href={prototypeUrl} target="_blank" rel="noopener noreferrer" onClick={onAction}>
                    Try it yourself
                    <ArrowUpRight className="size-4" />
                </a>
            </Button>
        </div>
    );
}