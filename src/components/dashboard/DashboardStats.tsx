import {
  ArrowUpRight,
  CalendarCheck2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type StatCardData = {
  title: string
  value: string
  description: string
  trend: string
  icon: typeof CalendarCheck2
  accent: string
}

const stats: StatCardData[] = [
  {
    title: "Réservations totales",
    value: "24",
    description: "Réservations cette année",
    trend: "+12% ce mois",
    icon: CalendarCheck2,
    accent: "bg-[#EAF2F6] text-[#2678D1]",
  },
  {
    title: "Réservations à venir",
    value: "3",
    description: "Prestations confirmées",
    trend: "2 à Casablanca",
    icon: Sparkles,
    accent: "bg-[#F0FDF4] text-green-600",
  },
  {
    title: "Services terminés",
    value: "19",
    description: "Services réalisés avec succès",
    trend: "98% de satisfaction",
    icon: ShieldCheck,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Prestataires favoris",
    value: "7",
    description: "Professionnelles sauvegardées",
    trend: "4 favoris actifs",
    icon: HeartHandshake,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    title: "Dépenses du mois",
    value: "3 200 MAD",
    description: "Dépenses mensuelles",
    trend: "Budget stable",
    icon: ArrowUpRight,
    accent: "bg-[#F5F3FF] text-violet-600",
  },
  {
    title: "Note moyenne",
    value: "4.9/5",
    description: "Note moyenne",
    trend: "Basé sur 42 avis",
    icon: Star,
    accent: "bg-[#FFF7ED] text-orange-500",
  },
]

function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map(({ title, value, description, trend, icon: Icon, accent }) => (
        <Card
          key={title}
          className="group rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-24px_rgba(38,120,209,0.45)]"
        >
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-[#1F2937] sm:text-[1.7rem]">
                  {value}
                </p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-sm text-gray-500">{description}</p>
              <Badge className="rounded-full border-[#E5E7EB] bg-[#F9FAFB] text-[#2678D1]">
                {trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

export default DashboardStats
