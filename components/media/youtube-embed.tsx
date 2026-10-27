import { cn } from "@/lib/utils";

type Props = { id: string; title: string; className?: string };

export function YouTubeEmbed({ id, title, className }: Props) {
    return (
        <div className={cn("aspect-video w-full overflow-hidden rounded-xl bg-muted", className)}>
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title}
                loading="lazy"
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}