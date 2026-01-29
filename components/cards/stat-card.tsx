import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  value: string
  description: React.ReactNode
}

export function StatCard({ value, description }: StatCardProps) {
  return (
    <Card className="border-stone-200 bg-card shadow-sm">
      <CardContent className="p-6 text-center sm:p-8">
        <h3 className="mb-4 text-5xl font-bold text-adxc sm:text-6xl md:text-7xl">
          {value}
        </h3>
        <p className="text-sm leading-relaxed text-stone-500 sm:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
