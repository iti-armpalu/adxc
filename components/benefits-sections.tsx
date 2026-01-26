import type { ReactNode } from "react"

type BenefitItem = {
  title: string
  description: string
//   icon: ReactNode
}

type BenefitsSectionProps = {
  title: string
  items: readonly BenefitItem[]
  className?: string
}

export function BenefitsSection({ title, items, className }: BenefitsSectionProps) {
  return (
    <section className={["bg-white px-6 py-24", className].filter(Boolean).join(" ")}>
      <div className="mx-auto text-center">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-5xl font-black">{title}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex-1 border border-pink-200 rounded-2xl p-8 bg-gradient-to-br from-pink-50 to-white"
            >
              {/* <div className="mb-5 flex justify-center text-[#66023c]">
                <span className="inline-flex h-9 w-9 items-center justify-center">
                  {item.icon}
                </span>
              </div> */}

              <h3 className="text-gray-900 font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
