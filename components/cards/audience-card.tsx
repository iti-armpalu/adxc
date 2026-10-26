import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Persona } from "@/lib/personas";

export function AudienceCard({ persona }: { persona: Persona }) {
    const { href, label, description, Icon, color } = persona;

    return (
        <Link
            href={href}
            className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <Card className="h-full transition-all duration-150 group-hover:ring-primary">
                <CardHeader className="flex flex-col items-center gap-3 text-center">
                    <div
                        className="flex size-14 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: color ?? "var(--primary)" }}
                    >
                        <Icon className="size-8 text-primary-foreground" strokeWidth={1.5} aria-hidden />
                    </div>
                    <CardTitle className="text-base font-semibold text-foreground">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center text-sm leading-relaxed">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}