import { YouTubeEmbed } from "@/components/media/youtube-embed";

const VIDEO_DEMOS = [
    { id: "W5PVbgoAqkU", title: "ADXC front-end demo with Josh" },
    { id: "tk1I70S3_eA", title: "ADXC back-end demo with George" },
];

export function VideoDemos() {
    return (
        <section className="bg-brand-50">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Video demos</p>
                    <h2 className="text-balance text-primary">Inside the platform: product walkthroughs</h2>
                </div>

                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-6">
                    {VIDEO_DEMOS.map((demo) => (
                        <div key={demo.id} className="space-y-4">
                            <YouTubeEmbed id={demo.id} title={demo.title} className="shadow-lg" />
                            <h3 className="text-center text-lg">{demo.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}