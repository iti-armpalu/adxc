import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Benefit = {
    icon: LucideIcon;
    title: string;
    description: string;
};

type Props = {
    title: string;
    description?: string;
    benefits: Benefit[];
    className?: string;
};

export function Benefits({ title, description, benefits, className }: Props) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">{title}</h2>
                    {description && (
                        <p className="mt-4 text-pretty text-lg text-foreground-alt">{description}</p>
                    )}
                </div>

                <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                    {benefits.map(({ icon: Icon, title, description }) => (
                        <li
                            key={title}
                            className="flex gap-4 rounded-xl border bg-card p-5 shadow-sm md:flex-col md:p-8"
                        >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-subtle md:size-12">
                                <Icon className="size-5 text-primary md:size-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="text-lg text-primary md:text-xl">{title}</h3>
                                <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}