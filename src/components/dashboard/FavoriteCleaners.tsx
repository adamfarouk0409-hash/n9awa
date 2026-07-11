import { HeartHandshake, MessageCircleMore, Sparkles, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Cleaner = {
  name: string
  initials: string
  rating: string
  services: number
  serviceType: string
  city: string
  badge: string
  highlight: string
}

const cleaners: Cleaner[] = [
  {
    name: "Salma B.",
    initials: "SB",
    rating: "4.9",
    services: 87,
    serviceType: "Nettoyage en profondeur",
    city: "Casablanca",
    badge: "Très fiable",
    highlight: "Top prestataire",
  },
  {
    name: "Youssef El Amrani",
    initials: "YE",
    rating: "4.8",
    services: 64,
    serviceType: "Nettoyage maison",
    city: "Rabat",
    badge: "Très fiable",
    highlight: "Réservation fréquente",
  },
  {
    name: "Imane Z.",
    initials: "IZ",
    rating: "5.0",
    services: 53,
    serviceType: "Nettoyage bureau",
    city: "Marrakech",
    badge: "Top prestataire",
    highlight: "Réputée",
  },
  {
    name: "Karim A.",
    initials: "KA",
    rating: "4.7",
    services: 41,
    serviceType: "Nettoyage maison",
    city: "Tanger",
    badge: "Très fiable",
    highlight: "À l’aise avec les grands espaces",
  },
]

function FavoriteCleaners() {
  return (
    <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-5 sm:p-6">
        <div>
          <CardTitle className="text-lg font-semibold text-[#1F2937]">
            Prestataires favoris
          </CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            Les professionnels que vous réservez le plus souvent.
          </p>
        </div>
        <Badge className="rounded-full border-[#E5E7EB] bg-[#EAF2F6] text-[#2678D1]">
          <HeartHandshake className="mr-1 h-3.5 w-3.5" />
          4 prioritaires
        </Badge>
      </CardHeader>

      <CardContent className="grid gap-4 p-5 pt-0 sm:p-6 sm:pt-0">
        {cleaners.map((cleaner) => (
          <div
            key={cleaner.name}
            className="grid gap-4 rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2678D1]/40 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_auto] lg:items-center"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-[#E5E7EB] bg-[#EAF2F6] text-[#2678D1]">
                <AvatarFallback className="bg-[#EAF2F6] text-[#2678D1]">
                  {cleaner.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[#1F2937]">{cleaner.name}</p>
                  <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">
                    {cleaner.badge}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{cleaner.serviceType}</p>
              </div>
            </div>

            <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-[#1F2937]">{cleaner.rating}</span>
                <span className="text-gray-500">Note</span>
              </div>
              <div>
                <span className="font-medium text-[#1F2937]">{cleaner.services}</span>{" "}
                <span className="text-gray-500">services</span>
              </div>
              <div className="text-gray-500">{cleaner.city}</div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <Button className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                <Sparkles className="mr-2 h-4 w-4" />
                Réserver à nouveau
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-[#D1D5DB] bg-white text-[#1F2937] hover:bg-[#F3F4F6]"
              >
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Contacter
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default FavoriteCleaners
