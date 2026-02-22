import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title?: string
  value: string
  description: React.ReactNode
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="border-stone-200 bg-card shadow-sm">
      <CardContent className="p-6 text-center sm:p-8">
        <p className="text-lg sm:text-xl font-semibold text-foreground text-center mb-3">{title}</p>
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
