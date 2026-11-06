import { Check, Sprout } from "lucide-react";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

const accent = (...routes: string[]) =>
    routes.map((r) => getPersona(r)?.color).filter(Boolean) as string[];

export function Traction({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Traction</p>
                    <h2 className="text-balance text-foreground">
                        We are pre-launch, but have <span className="text-heading">providers</span>,{" "}
                        <span className="text-heading">clients</span>, and{" "}
                        <span className="text-heading">distribution</span> already in place
                    </h2>
                </div>

                <div className="space-y-4">
                    {/* Top row: ADXC itself */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
                        <Tile label="Funding rounds" className="md:col-span-2 lg:col-span-5">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="flex flex-col rounded-lg bg-muted p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-lg font-semibold text-foreground">Pre-seed</p>
                                        <span className="rounded-full bg-card px-2.5 py-0.5 text-xs font-medium text-mid-alt">
                                            Closed
                                        </span>
                                    </div>
                                    <p className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
                                        $450k <span className="text-base font-medium text-foreground-alt">raised</span>
                                    </p>
                                    <p className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                                        SAFE
                                        <Check className="size-4" aria-hidden />
                                    </p>
                                </div>

                                <div className="flex flex-col rounded-lg bg-primary p-4 text-primary-foreground">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-lg font-semibold">Seed</p>
                                        <span className="rounded-full bg-card px-2.5 py-0.5 text-xs font-semibold text-primary">
                                            Open
                                        </span>
                                    </div>
                                    <p className="mt-6 text-3xl font-semibold tracking-tight">
                                        $2M <span className="text-base font-medium text-primary-muted">target</span>
                                    </p>
                                    <p className="mt-1 flex items-center justify-between text-sm text-primary-muted">
                                        Q1 2027
                                        <Sprout className="size-4" aria-hidden />
                                    </p>
                                </div>
                            </div>
                        </Tile>

                        <Tile label="Product" className="lg:col-span-4">
                            <ul className="divide-y">
                                {["V1 platform built & working", "Integrated with key partners", "Patent pending technology"].map(
                                    (item) => (
                                        <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                                            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                                            <span className="text-foreground">{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </Tile>

                        <Tile label="Launching" className="lg:col-span-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-t-4 border-primary pt-3">
                                    <p className="text-2xl font-semibold text-foreground">Nov &apos;26</p>
                                    <p className="mt-1 flex items-center gap-2 font-semibold text-primary">
                                        Beta
                                        <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs">Now</span>
                                    </p>
                                </div>
                                <div className="border-t-4 border-border-3 pt-3">
                                    <p className="text-2xl font-semibold text-foreground">Jan &apos;27</p>
                                    <p className="mt-1 text-foreground-alt">Full</p>
                                </div>
                            </div>
                            <p className="mt-auto pt-8 text-3xl font-semibold tracking-tight text-primary">
                                $150k <span className="text-base font-medium text-foreground-alt">live revenue</span>
                            </p>
                        </Tile>
                    </div>

                    {/* Bottom row: audiences. On desktop, tiles share row tracks so dividers align */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto] lg:gap-y-0">
                        <RowTile
                            label="Launch data providers"
                            accent={accent("/data-providers")}
                            footer={<FooterText title="Revenue share">Providers earn on every question they help answer.</FooterText>}
                        >
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                                {/* Plain <img> for SVG per convention */}
                                <img src="/yougov-logo.svg" alt="YouGov" className="h-6 w-auto" />
                                <img src="/quid-logo.svg" alt="Quid" className="h-5 w-auto" />
                                <img src="/serpstat-logo.svg" alt="Serpstat" className="h-5 w-auto" />
                                <span className="rounded-full border border-dashed border-border-4 px-3 py-1 text-xs text-muted-foreground">
                                    More coming soon
                                </span>
                            </div>
                        </RowTile>

                        <RowTile
                            label="Launch AI partners"
                            accent={accent("/ai-platforms")}
                            footer={
                                <FooterText title="Distribution">
                                    Partnership + GTM with leading AI platforms. MCP for any AI tool.
                                </FooterText>
                            }
                        >
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <img src="/miro-logo.svg" alt="Miro" className="h-7 w-24 shrink-0 object-contain object-left" />
                                    <span className="text-sm text-foreground-alt">
                                        Co-marketing + GTM agreed. Miro&apos;s sales team incentivised on ADXC from Feb &apos;27.
                                    </span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <img src="/jasper-logo.svg" alt="Jasper" className="h-7 w-24 shrink-0 object-contain object-left" />
                                    <span className="text-sm text-foreground-alt">Integration 2026, GTM 2027.</span>
                                </li>
                            </ul>
                        </RowTile>

                        <RowTile
                            label="Clients"
                            accent={accent("/brands", "/agencies")}
                            className="md:col-span-2 lg:col-span-1"
                            divider={false}
                            footer={
                                <div className="grid grid-cols-2 gap-6 text-sm text-foreground-alt">
                                    <p className="border-t pt-4">Reseller agreement for agencies</p>
                                    <p className="border-t pt-4">Strategic marketing tasks</p>
                                </div>
                            }
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-semibold text-primary">Launch client</p>
                                    <div className="mt-3 flex min-h-14 items-center">
                                        <img src="/dept-logo.svg" alt="DEPT" className="h-7 w-auto" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-primary">Focus</p>
                                    <div className="mt-3 flex min-h-14 items-center">
                                        <p className="text-lg font-semibold leading-snug text-foreground">SME brands + agencies</p>
                                    </div>
                                </div>
                            </div>
                        </RowTile>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- Pieces ---------- */

function TileLabel({ label, accent }: { label: string; accent?: string[] }) {
    return (
        <h3 className="text-caption mb-5 flex items-center gap-2 text-xs text-muted-foreground">
            {accent?.map((color) => (
                <span key={color} aria-hidden className="size-2 rounded-full" style={{ backgroundColor: color }} />
            ))}
            {label}
        </h3>
    );
}

// Top-row tile: label + free content
function Tile({
    label,
    accent,
    className,
    children,
}: {
    label: string;
    accent?: string[];
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("flex flex-col rounded-xl border bg-card p-6 shadow-sm", className)}>
            <TileLabel label={label} accent={accent} />
            {children}
        </div>
    );
}

function RowTile({
    label,
    accent,
    footer,
    divider = true,
    className,
    children,
}: {
    label: string;
    accent?: string[];
    footer: React.ReactNode;
    divider?: boolean; // false when the footer draws its own lines
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "flex flex-col rounded-xl border bg-card p-6 shadow-sm lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0",
                className
            )}
        >
            <TileLabel label={label} accent={accent} />
            <div>{children}</div>
            <div className={cn("mt-6", divider && "border-t pt-4")}>{footer}</div>
        </div>
    );
}

function FooterText({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <p className="font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-foreground-alt">{children}</p>
        </>
    );
}