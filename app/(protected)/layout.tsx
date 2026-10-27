import { requireUnlocked } from "@/lib/gate/session";
import { Header } from "@/components/layout/header";
import { PersonaTheme } from "@/components/layout/persona-theme";
import { DemoVideoProvider } from "@/components/demo/demo-video-provider";
import { AudienceCards } from "@/components/sections/audience-cards";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireUnlocked();

  return (
    <DemoVideoProvider>
      <PersonaTheme>
        <Header />
        <main className="relative flex min-h-dvh flex-col pt-header">{children}</main>
        <AudienceCards />
      </PersonaTheme>
    </DemoVideoProvider>
  );
}