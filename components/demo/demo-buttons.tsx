"use client";

import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { useDemoVideo } from "@/components/demo/demo-video-provider";

interface DemoButtonsProps {
  prototypeUrl?: string;
  variant?: "page" | "sheet";
  onAction?: () => void; // close sheet if needed
  videoUrl?: string;     // allow per-page override
}

const DEFAULT_VIDEO_URL =
  "https://player.vimeo.com/video/1158814922?autoplay=1&title=0&byline=0&portrait=0";


export default function DemoButtons({
  prototypeUrl = "https://adxc.netlify.app/login",
  variant = "page",
  onAction,
  videoUrl = DEFAULT_VIDEO_URL,
}: DemoButtonsProps) {
  const { openVideo } = useDemoVideo();

  const wrapperClass =
    variant === "sheet"
      ? "mt-6 flex flex-col items-center gap-3"
      : "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4";

  const btnClass =
    variant === "sheet"
      ? "w-full max-w-[260px] gap-2"
      : "min-w-[220px] gap-2 sm:min-w-0 sm:h-11 sm:px-8";

  return (
    <div className={wrapperClass}>
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          onAction?.(); // close sheet if present
          openVideo(videoUrl, "Prototype Demo");
        }}
        className={btnClass}
      >
        <Play className="w-4 h-4" />
        Watch the prototype demo
      </Button>

      <Button size="lg" asChild className={`bg-adxc ${btnClass}`}>
        <a
          href={prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAction}
        >
          <ExternalLink className="w-4 h-4" />
          Try it yourself
        </a>
      </Button>
    </div>
  );
}
