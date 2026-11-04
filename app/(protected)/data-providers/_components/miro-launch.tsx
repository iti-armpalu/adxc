import Image from "next/image";

export function MiroLaunch() {
    return (
        <section>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">Instantly access 100 million users through Miro</h2>
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        At launch, we will be integrated with Miro, giving their 100 million users access to ADXC
                        inside their workflows.
                    </p>
                </div>

                <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl bg-muted">
                    <Image
                        src="/miro-canvas.png"
                        alt="ADXC integrated within Miro collaborative workspace"
                        fill
                        sizes="(min-width: 768px) 48rem, 100vw"
                        className="object-contain"
                    />
                </div>

                <p className="mx-auto max-w-3xl rounded-xl bg-primary p-6 text-center text-lg font-medium text-primary-foreground sm:p-10 sm:text-xl">
                    Data providers that sign up now will get immediate access to these customers via ADXC.
                </p>
            </div>
        </section>
    );
}