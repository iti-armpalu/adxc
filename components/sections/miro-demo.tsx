import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { MIRO_DEMO_VIDEO_ID, PROTOTYPE_URL } from "@/lib/demo";
import { cn } from "@/lib/utils";

export function MiroDemo({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <h2 className="mx-auto max-w-3xl text-balance text-center text-heading">
                    See ADXC working inside Miro
                </h2>

                <div className="grid gap-4 md:grid-cols-[3fr_2fr] md:gap-6">
                    <YouTubeEmbed
                        id={MIRO_DEMO_VIDEO_ID}
                        title="Miro x ADXC demo"
                        poster="/youtube-thumbnail-adxc-miro-demo.png"
                        className="shadow-lg"
                    />

                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-primary p-8 text-center text-primary-foreground shadow-lg md:items-start md:p-10 md:text-left">
                        <p className="text-caption text-primary-muted">Hands-on demo</p>
                        <h3>See it in action</h3>
                        <p className="max-w-sm text-primary-subtle">
                            Explore the platform yourself and discover how it can transform workflows
                        </p>
                        <Button size="lg" asChild className="mt-2 bg-card text-primary hover:bg-primary-subtle">
                            <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
                                Try it yourself
                                <ArrowUpRight className="size-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}