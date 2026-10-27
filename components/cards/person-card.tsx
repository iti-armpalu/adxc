import Image from "next/image";
import { cn } from "@/lib/utils";

export type Person = {
    name: string;
    title: string;
    image: string;
    linkedin: string;
    bio?: string;
};

type Props = {
    person: Person;
    horizontal?: boolean;
    className?: string;
};

export function PersonCard({ person, horizontal = false, className }: Props) {
    const { name, title, image, linkedin, bio } = person;

    return (
        <div
            className={cn(
                "flex h-full rounded-xl border bg-card p-4 shadow-sm sm:p-6",
                horizontal ? "items-start gap-4 text-left sm:gap-5" : "flex-col items-center text-center",
                className
            )}
        >
            <Image
                src={image}
                alt=""
                width={192}
                height={192}
                sizes="96px"
                className={cn(
                    "shrink-0 rounded-full object-cover",
                    horizontal ? "size-16 sm:size-20" : "size-20 sm:size-24"
                )}
            />

            <div className={cn("flex flex-1 flex-col", !horizontal && "mt-4 items-center")}>
                <p className="text-sm font-semibold text-foreground sm:text-base">{name}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{title}</p>
                {bio && <p className="mt-3 text-sm leading-relaxed text-foreground-alt">{bio}</p>}
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-xs font-medium text-primary hover:underline"
                >
                    <LinkedInIcon className="size-4" />
                    LinkedIn
                </a>
            </div>
        </div>
    );
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}