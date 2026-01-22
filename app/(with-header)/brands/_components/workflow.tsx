import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { Bot, Brain, FileText, CheckCircle } from "lucide-react";

const steps = [
    {
        number: 1,
        icon: Bot,
        title: "AI Request",
        description: "AI agents query ADXC when completing tasks inside workflows.",
    },
    {
        number: 2,
        icon: Brain,
        title: "Orchestration",
        description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it.",
    },
    {
        number: 3,
        icon: FileText,
        title: "Abstract Answer",
        description: "The customer sees an abstract of the answer and price.",
    },
    {
        number: 4,
        icon: CheckCircle,
        title: "Full Answer",
        description: "The user approves and ADXC pulls only the relevant data to answer the question.",
    },
];

const Workflow = () => {
    return (
        <section className="relative py-20 md:py-28">

            <div className="relative z-10 mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
                        ADXC gives you access to{" "}
                        <span className="text-gradient">all the data you need</span>, while you only pay for what you use
                    </h2>
                    <p className="text-base text-muted-foreground md:text-lg">
                        ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col items-start xl:flex-row">
                    {/* Left side - Graph */}

                    <SquaresScatterToCard />


                    {/* Right side - Steps */}
                    <div className="relative xl:max-w-[300px] mx-auto my-auto">
                        {/* Connecting line */}
                        {/* <div className="absolute left-5 top-0 h-full w-px bg-black from-primary/50 via-primary to-primary/50" /> */}

                        <div className="space-y-6">
                            {steps.map((step) => (
                                <div key={step.number} className="relative flex items-center gap-5">
                                    {/* Number badge */}
                                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-black shadow-glow">
                                        <span className="text-base font-bold text-primary-foreground">{step.number}</span>
                                    </div>

                                    {/* Content card */}
                                    <div className="flex-1 rounded-xl border border-border bg-gradient-card p-4 transition-all hover:border-primary/30 hover:shadow-card">
                                        <h3 className="mb-1 text-base font-semibold">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
