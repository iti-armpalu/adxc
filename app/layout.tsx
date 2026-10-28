import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

/* ---------- metadata ---------- */

export const metadata: Metadata = {
  title: { template: "%s | ADXC Investors", default: "ADXC Investors" },
  description:
    "The Agentic Data Exchange that gives companies access to the marketing data they need, and only charges for what they use.",
  robots: { index: false, follow: false },
};

/* ---------- root layout ---------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}