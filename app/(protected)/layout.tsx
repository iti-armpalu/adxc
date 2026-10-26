import { requireUnlocked } from "@/lib/gate/session";
import { DemoVideoProvider } from "@/components/demo/demo-video-provider";
import { AudiencePortalSection } from "@/components/audience-portal-section";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    await requireUnlocked();

    return (
        <DemoVideoProvider>
            <main className="relative flex min-h-screen flex-col mt-15">{children}</main>
            <AudiencePortalSection />
        </DemoVideoProvider>
    );
}