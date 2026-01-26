'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, ExternalLink } from "lucide-react";


interface DemoButtonsProps {
  videoUrl?: string;
  prototypeUrl?: string;
  variant?: "page" | "sheet";
}

export default function DemoButtons({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  prototypeUrl = "https://example.com",
  variant = "page",
}: DemoButtonsProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const wrapperClass =
    variant === "sheet"
      ? "mt-6 flex flex-col items-center gap-3" // always column
      : "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4";

  const btnClass =
    variant === "sheet"
      ? "w-full max-w-[260px] gap-2" // or min-w, your call
      : "min-w-[220px] gap-2 sm:min-w-0 sm:h-11 sm:px-8";


  return (
    <>
      <div className={wrapperClass}>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsVideoOpen(true)}
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          Watch the prototype demo
        </Button>

        <Button
          size="lg"
          asChild
          className="min-w-[220px] bg-adxc gap-2 sm:min-w-0 sm:h-11 sm:px-8"
        >
          <a href={prototypeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            Try it yourself
          </a>
        </Button>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="min-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Prototype Demo</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={videoUrl}
              title="Prototype Demo"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
