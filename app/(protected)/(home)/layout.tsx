import Header from "@/components/header/header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showDemoButtons={false} />
      {children}
    </>
  );
}
