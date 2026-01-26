"use client"

import { ArrowRight, Bot, Briefcase, Building2, Database, Lock, Search, Shield, Users } from "lucide-react";

const previousReality = [
    {
        icon: Users,
        title: "Human-Centric Data Access",
        description: "Data accessed and interpreted by humans",
    },
    {
        icon: Database,
        title: "Full Dataset Requirement",
        description: "Full datasets required to extract value",
    },
    {
        icon: Shield,
        title: "High Operational Overhead",
        description: "High operational and compliance overhead",
    },
    {
        icon: Building2,
        title: "Enterprise-Only Economics",
        description: "Economically viable only for large enterprises",
    },
]

const newReality = [
    {
        icon: Bot,
        title: "Agent-Native Data Access",
        description: "Data accessed by AI agents",
    },
    {
        icon: Search,
        title: "Query-Based Retrieval",
        description: "Only the information required to answer a query is retrieved",
    },
    {
        icon: Lock,
        title: "Zero Dataset Exposure",
        description: "No exposure to full datasets",
    },
    {
        icon: Briefcase,
        title: "SME-Grade Workflows",
        description: "Enables enterprise-grade workflows for SMEs",
    },
]

export function AIAgentsSection() {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-6xl">


                <div className="text-center mb-16">

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                        AI agents make this SME market accessible
                    </h2>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-stretch">
                    {/* Left Column - Previous Reality */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 md:p-8">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600 mb-4">
                                Previous Reality
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-semibold text-slate-700">
                                Human-Centric Data Access
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {previousReality.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center Divider */}
                    <div className="hidden lg:flex flex-col items-center justify-center px-4">
                        <div className="flex-1 w-px bg-slate-200" />
                        <div className="py-4">
                            <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                                Structural Shift
                            </div>
                        </div>
                        <div className="flex-1 w-px bg-slate-200" />
                    </div>

                    {/* Mobile Divider */}
                    <div className="flex lg:hidden items-center justify-center gap-4 py-2">
                        <div className="flex-1 h-px bg-slate-200" />
                        <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Structural Shift
                        </div>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Right Column - New Reality */}
                    <div className="bg-white rounded-xl border border-emerald-200 p-6 md:p-8 relative overflow-hidden">
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-emerald-50 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 mb-4">
                                    New Reality
                                </span>
                                <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                                    Agent-Native Data Access
                                </h3>
                            </div>
                            <div className="space-y-6">
                                {newReality.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto leading-relaxed">
                    AI agents transform data from a static asset into a queryable service.
                </p>


            </div>
        </section>
    );
}
