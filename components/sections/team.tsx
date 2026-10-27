import { PersonCard, type Person } from "@/components/cards/person-card";

const TEAM: Person[] = [
    { name: "Roy Armale", title: "Founder, Partnerships", image: "/roy.jpeg", linkedin: "https://www.linkedin.com/in/royarmale/" },
    { name: "Josh Hedley-Dent", title: "Co-founder, Head of Revenue", image: "/josh.jpeg", linkedin: "https://www.linkedin.com/in/joshuahedleydent/" },
    { name: "George Chatzigiannis", title: "Co-founder, Head of Product", image: "/george.jpeg", linkedin: "https://www.linkedin.com/in/georgechatzigiannis/" },
    { name: "Joseph Mattouk", title: "Data Engineer", image: "/joseph.jpeg", linkedin: "https://www.linkedin.com/in/joseph-mattouk-20b880222/" },
    { name: "Iti Armpalu", title: "Front-end Developer", image: "/iti.jpeg", linkedin: "https://www.linkedin.com/in/itiarmpalu/" },
];

export function Team() {
    return (
        <section>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Team and key roles</p>
                    <h2 className="text-balance text-primary">
                        Our founder built the AI platform for the largest ad agency in the world
                    </h2>
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        and each of our co-founders has 15 years of experience in the field
                    </p>
                </div>

                <ul className="flex flex-wrap justify-center gap-4">
                    {TEAM.map((m) => (
                        <li
                            key={m.name}
                            className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]"
                        >
                            <PersonCard person={m} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}