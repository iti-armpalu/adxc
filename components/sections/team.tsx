import Image from "next/image";

const TEAM = [
    { name: "Roy Armale", title: "Founder, Partnerships", image: "/roy.jpeg", linkedin: "https://www.linkedin.com/in/royarmale/" },
    { name: "Josh Hedley-Dent", title: "Co-founder, Head of Revenue", image: "/josh.jpeg", linkedin: "https://www.linkedin.com/in/joshuahedleydent/" },
    { name: "George Chatzigiannis", title: "Co-founder, Head of Product", image: "/george.jpeg", linkedin: "https://www.linkedin.com/in/georgechatzigiannis/" },
    { name: "Joseph Mattouk", title: "Data Engineer", image: "/joseph.jpeg", linkedin: "https://www.linkedin.com/in/joseph-mattouk-20b880222/" },
    { name: "Iti Armpalu", title: "Front-end Developer", image: "/iti.jpeg", linkedin: "https://www.linkedin.com/in/itiarmpalu/" },
];

export function Team() {
    return (
        <section className="bg-brand-50">
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
                            className="flex w-[calc(50%-0.5rem)] flex-col items-center rounded-xl border bg-card p-4 text-center shadow-sm sm:w-[calc(33.333%-0.667rem)] sm:p-6 lg:w-[calc(20%-0.8rem)]"
                        >
                            <Image
                                src={m.image}
                                alt=""
                                width={192}
                                height={192}
                                sizes="96px"
                                className="size-20 rounded-full object-cover sm:size-24"
                            />
                            <p className="mt-4 text-sm font-semibold text-foreground sm:text-base">{m.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{m.title}</p>
                            <a
                                href={m.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${m.name} on LinkedIn`}
                                className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-primary hover:underline"
                            >
                                <LinkedInIcon className="size-4" />
                                LinkedIn
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}