import { PersonCard, type Person } from "@/components/cards/person-card";

const ADVISORS: Person[] = [
    {
        name: "Rachel Higham",
        title: "Tech/governance advisor",
        image: "/rachel.jpeg",
        linkedin: "https://www.linkedin.com/in/rachel-higham-a033991/",
        bio: "Advises on architecture strategy, data governance, and institutional-grade board practices.",
    },
    {
        name: "Shahid Sadiq",
        title: "Commercial advisor",
        image: "/shahid.jpeg",
        linkedin: "https://www.linkedin.com/in/shahid-sadiq-537399162/",
        bio: "Supports on business model, pricing strategy, unit economics, and enterprise packaging.",
    },
];

export function Advisors() {
    return (
        <section>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Advisory board</p>
                    <h2 className="text-balance text-primary">We are advised by the best in the world</h2>
                </div>

                <ul className="flex flex-wrap justify-center gap-4">
                    {ADVISORS.map((a) => (
                        <li key={a.name} className="w-full sm:w-[calc(50%-0.5rem)] sm:max-w-lg">
                            <PersonCard person={a} horizontal />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}