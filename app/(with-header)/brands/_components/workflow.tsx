import { SectionHeader } from "@/components/section-header";
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

                {/* Section header */}
                {/* <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        ADXC gives you access to all the data you need, while you only pay for what you use
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model.
                    </p>
                </div> */}

                <SectionHeader
                    title="ADXC gives you access to all the data you need, while you only pay for what you use"
                    description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
                />

                {/* Two-column layout */}
                <div className="flex flex-col items-start xl:flex-row gap-6">
                    {/* Left side - Graph */}

                    <SquaresScatterToCard />


                    {/* Right side - Steps */}
                    <div className="relative xl:max-w-[300px] mx-auto my-auto">

                        <div className="space-y-6">
                            {steps.map((step) => (

                                <div
                                    key={step.number}
                                    className="bg-white rounded-xl border border-slate-200 p-2 md:p-4 hover:border-adxc hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">

                                        <span className="text-base font-bold text-adxc">{step.number}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                                </div>


                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-12 max-w-2xl mx-auto leading-relaxed">
                    No long-term contracts - Access mumtiple premium datasets - Spend caps set per task/user
                </p>


            </div>
        </section>
    );
};

export default Workflow;
