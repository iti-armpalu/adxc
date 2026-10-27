import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOUNDER_VIDEO_URL, PROTOTYPE_URL } from "@/lib/demo";

export function FounderVideo() {
    return (
        <section className="bg-brand-50">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <h2 className="mx-auto max-w-3xl text-balance text-center text-primary">
                    Watch our founder&apos;s explanation with more details
                </h2>

                <div className="grid gap-4 md:grid-cols-[3fr_2fr] md:gap-6">
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-lg">
                        <iframe
                            src={FOUNDER_VIDEO_URL}
                            title="ADXC founder explanation"
                            loading="lazy"
                            className="size-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-primary p-8 text-center text-primary-foreground shadow-lg md:items-start md:p-10 md:text-left">
                        <h3>See it in action</h3>
                        <p className="max-w-sm text-brand-100">
                            Explore the platform yourself and discover how it can transform workflows
                        </p>
                        <Button
                            size="lg"
                            asChild
                            className="mt-2 bg-card text-primary hover:bg-brand-50"
                        >
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