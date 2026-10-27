import { Check } from "lucide-react";
import { DataFlowDiagram } from "@/components/data-flow/data-flow-diagram";
import { cn } from "@/lib/utils";

export type HowItWorksStep = { title: string; description: string };

type Props = {
    title: string;
    description?: string;
    steps: HowItWorksStep[];
    highlights?: string[];
    className?: string;
};

export function HowItWorks({ title, description, steps, highlights, className }: Props) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">{title}</h2>
                    {description && (
                        <p className="mt-4 text-pretty text-lg text-foreground-alt">{description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start xl:gap-10\">
                    <DataFlowDiagram />

                    <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        {steps.map((step, i) => (
                            <li key={step.title} className="flex gap-4 rounded-xl border bg-card p-5 shadow-sm">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-subtle font-bold tabular-nums text-primary">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="text-base text-primary">{step.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {highlights?.length ? (
                    <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
                        {highlights.map((h) => (
                            <li key={h} className="inline-flex items-center gap-2 text-sm font-medium text-foreground-alt">
                                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                                {h}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </section>
    );
}