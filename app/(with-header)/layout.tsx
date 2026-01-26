import Header from "@/components/header";


export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
