import Image from "next/image";

const IMAGES = [
    { src: "/miro-canvas-26.png", alt: "Miro Canvas26 conference stage presentation" },
    { src: "/miro-canvas.png", alt: "ADXC integrated within Miro collaborative workspace" },
];

export function MiroLaunch() {
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">Instantly access 100 million users through Miro</h2>
                    {/* TODO: copy references Canvas26 in June, now past; update with marketing */}
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        At launch, we will be integrated with Miro, giving their 100 million users access to ADXC
                        inside their workflows. We will be on-stage with Miro launching at their Canvas26 event in
                        June.
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
                    {IMAGES.map((img) => (
                        <div key={img.src} className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
                        </div>
                    ))}
                </div>

                <p className="mx-auto max-w-5xl rounded-xl bg-primary p-6 text-center text-lg font-medium text-primary-foreground sm:p-10 sm:text-xl">
                    Data providers that sign up now will get immediate access to these customers via ADXC, and be
                    part of our launch presentation on stage.
                </p>
            </div>
        </section>
    );
}