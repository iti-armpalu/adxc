import { PersonCard, type Person } from "@/components/cards/person-card";

const TEAM: Person[] = [
    { name: "Roy Armale", title: "Founder, Chairman", bio: "ex CPO WPP Open, now CPO DEPT", image: "/roy.jpeg", linkedin: "https://www.linkedin.com/in/royarmale/" },
    { name: "Josh Hedley-Dent", title: "Co-founder, Commercial", bio: "ex startup CMO, marketing advisor to Fortune 500", image: "/josh.jpeg", linkedin: "https://www.linkedin.com/in/joshuahedleydent/" },
    { name: "George Chatzigiannis", title: "Co-founder, Product", bio: "ex Lead Software Engineer M&S, On, WPP", image: "/george.jpeg", linkedin: "https://www.linkedin.com/in/georgechatzigiannis/" },
    { name: "[Announcement soon]", title: "Co-founder, Engineering", bio: "Leading AI Architect" },
    { name: "Joseph Mattouk", title: "Data Engineer", image: "/joseph.jpeg", linkedin: "https://www.linkedin.com/in/joseph-mattouk-20b880222/" },
    { name: "Slava Yakovenko", title: "Data Engineer", image: "/slava.jpeg", linkedin: "https://www.linkedin.com/in/yakovenko/" },
    { name: "Amina Sinanovic", title: "Data Engineer", linkedin: "https://www.linkedin.com/in/amina-sinanovi%C4%87-872035243/" },
    { name: "Iti Armpalu", title: "Front-end Developer", image: "/iti.jpeg", linkedin: "https://www.linkedin.com/in/itiarmpalu/" },
];

export function Team() {
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Team and key roles</p>
                    <h2 className="text-balance text-heading">
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
                            className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
                        >
                            <PersonCard person={m} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}