import { Container } from "./layout/container"
import { Section } from "./layout/section"

import { SectionHeader } from "./sections/section-header";
import { Card, CardContent } from "./ui/card";

const VIDEO_DEMOS = [
    { videoUrl: "https://www.youtube.com/embed/W5PVbgoAqkU?si=n8CCRCYf5wUrrgQn", title: "ADXC front-end demo with Josh" },
    { videoUrl: "https://www.youtube.com/embed/tk1I70S3_eA?si=aa2o5uwAhE1I3JJy", title: "ADXC back-end demo with George" },
]

export default function VideoDemosSection() {

    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Video Demos</span>
                    <SectionHeader
                        title="Inside the platform: product walkthroughs"
                        size="sm"
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {VIDEO_DEMOS.map((demo, i) => (
                        <Card key={i} className="border-none bg-card shadow-none overflow-hidden">
                            <CardContent className="px-8 flex flex-col gap-3">
                                <div className="w-full aspect-video rounded-xl bg-muted overflow-hidden">
                                    <iframe
                                        className="w-full h-full"
                                        src={demo.videoUrl}
                                        title={demo.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />

                                </div>
                                <h3 className="text-xl font-bold text-foreground text-center">{demo.title}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </Container>
        </Section>
    )
}
