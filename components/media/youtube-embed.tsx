"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    id: string;
    title: string;
    poster?: string; // custom thumbnail; the player loads only on click
    className?: string;
};

export function YouTubeEmbed({ id, title, poster, className }: Props) {
    const [playing, setPlaying] = useState(!poster);

    return (
        <div className={cn("relative aspect-video w-full overflow-hidden rounded-xl bg-muted", className)}>
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}${poster ? "?autoplay=1" : ""}`}
                    title={title}
                    loading="lazy"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                poster && (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play video: ${title}`}
                        className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                        <Image src={poster} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
                        <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                        <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-105 sm:size-20">
                            <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
                        </span>
                    </button>
                )
            )}
        </div>
    );
}