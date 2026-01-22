import Header from "@/components/header";


export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
