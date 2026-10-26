import { X, Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";


export default function ProblemSection() {
  return (
    <Section
      size="lg"
      className="bg-adxc rounded-2xl mx-4"
    >
      <Container>
        <SectionHeader
          title="The problem is data is sold like albums. But AI changes that"
          size="md"
          align="center"
          className="text-white"
        />

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Old World Card */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-10 relative overflow-hidden">
            <h3 className="text-xl font-bold text-red-700 mb-6">Old world:</h3>

            <div className="space-y-6">
              <div className="flex gap-3">
                <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Buying data is like buying a whole album to listen to 1 song.
                </p>
              </div>

              <div className="flex gap-3">
                <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Expensive. Inefficient. Prohibitive.
                </p>
              </div>

              <div className="flex gap-3">
                <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Designed for humans, who need to see whole datasets to work with them.
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center px-4">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>

          {/* AI World Card */}
          <div className="flex-1 bg-pink-50 border border-pink-200 rounded-2xl p-10 relative overflow-hidden shadow-sm">
            <h3 className="text-xl font-bold text-[#66023c] mb-6">AI world:</h3>

            <div className="space-y-6">
              <div className="flex gap-3">
                <Check className="w-4 h-4 text-[#66023c] mt-1 flex-shrink-0" />
                <p className="text-gray-800 font-medium">
                  AI agents can retrieve only the data needed to answer a question, without the user seeing the full dataset.
                </p>
              </div>

              <div className="bg-white border border-pink-200 rounded-xl p-4 shadow-sm">
                <p className="text-[#66023c] font-bold text-xl">
                  This means you should only pay for the data you use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
