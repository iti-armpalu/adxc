import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header/header";
import { COOKIE_NAME, verify } from "@/lib/gate-token";
import { DemoVideoProvider } from "@/components/demo/demo-video-provider";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const secret = process.env.SITE_GATE_COOKIE_SECRET;
    if (!secret) {
        // Fail closed in prod; you can throw instead if you prefer.
        redirect("/gate");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token || !secret) {
        redirect("/gate?next=/");
    }

    const decoded = verify(token, secret);
    if (!decoded) {
        redirect("/gate?next=/");
    }

    // verify() already checks exp; if you want an extra guard:
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp <= now) {
        redirect("/gate?next=/");
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <DemoVideoProvider>
                <Header />
                <main className="flex-1">{children}</main>
            </DemoVideoProvider>
        </div>
    );
}
