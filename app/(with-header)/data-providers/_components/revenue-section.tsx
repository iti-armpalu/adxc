import { DollarSign, RefreshCw, Workflow } from "lucide-react"

const revenueCards = [
  {
    icon: DollarSign,
    title: "Access to the SME Market",
    description:
      "Enable monetisation of SME customers that were previously uneconomical to serve.",
  },
  {
    icon: RefreshCw,
    title: "Recurring Use of the Same Data",
    description:
      "Monetise the same data repeatedly across multiple agent-driven use cases.",
  },
  {
    icon: Workflow,
    title: "Embedded Distribution",
    description:
      "Distribute data directly within agent workflows where decisions are made.",
  },
]

export function RevenueSection() {
  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            This unlocks a new revenue stream for you, without disrupting your core business
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {revenueCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6 text-adxc" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {card.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-12 max-w-2xl mx-auto leading-relaxed">
          Creates a new revenue layer without disrupting the existing business.
        </p>
      </div>
    </section>
  )
}
