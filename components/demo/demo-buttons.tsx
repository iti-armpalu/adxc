'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, ExternalLink } from "lucide-react";


interface DemoButtonsProps {
  videoUrl?: string;
  prototypeUrl?: string;
}

export default function DemoButtons({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - replace with actual demo video
  prototypeUrl = "https://example.com", // Placeholder - replace with actual prototype URL
}: DemoButtonsProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-8">
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
          className="gap-2"
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
