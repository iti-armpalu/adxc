import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";


export function SolutionSection() {
  return (
    <Section size="md" className="bg-white">
      <Container size="lg">
        <SectionHeader
          title={
            <>
              You are already solving the internal data part of the problem. We can help you solve the other half.
            </>
          }
          size="md"
          align="center"
        />

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-200">
          <Image
            src="/miro-glean.png"
            alt="Internal data and external data coming together to create a complete solution"
            width={1280}
            height={720}
            className="h-auto w-full object-cover"
            priority={false}
          />
        </div>
      </Container>
    </Section>
  );
}
