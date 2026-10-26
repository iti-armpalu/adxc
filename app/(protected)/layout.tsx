import { requireUnlocked } from "@/lib/gate/session";
import { Header } from "@/components/layout/header";
import { DemoVideoProvider } from "@/components/demo/demo-video-provider";
import { AudiencePortalSection } from "@/components/audience-portal-section";
import { AudienceCards } from "@/components/sections/audience-cards";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireUnlocked();

  return (
    <DemoVideoProvider>
      <Header />
      <main className="relative flex min-h-dvh flex-col pt-header">{children}</main>
      <AudienceCards />
    </DemoVideoProvider>
  );
}