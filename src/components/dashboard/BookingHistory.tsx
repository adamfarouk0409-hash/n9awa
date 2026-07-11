import { CalendarDays, MapPin, Sparkles, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type HistoryItem = {
  cleaner: string
  service: string
  date: string
  location: string
  status: "Terminé" | "Annulé"
  price: string
  rating?: string
}

type HistoryEntry = HistoryItem & {
  parsedDate: Date
}

type GroupedHistory = {
  key: string
  label: string
  entries: HistoryEntry[]
}

const history: HistoryItem[] = [
  {
    cleaner: "Youssef El Amrani",
    service: "Nettoyage maison",
    date: "12 Janvier 2026",
    location: "Casablanca",
    status: "Terminé",
    price: "180 MAD",
    rating: "4.8",
  },
  {
    cleaner: "Salma B.",
    service: "Nettoyage en profondeur",
    date: "28 Décembre 2025",
    location: "Rabat",
    status: "Terminé",
    price: "320 MAD",
    rating: "4.9",
  },
  {
    cleaner: "Imane Z.",
    service: "Nettoyage bureau",
    date: "19 Décembre 2025",
    location: "Marrakech",
    status: "Annulé",
    price: "240 MAD",
  },
  {
    cleaner: "Karim A.",
    service: "Nettoyage après déménagement",
    date: "04 Décembre 2025",
    location: "Tanger",
    status: "Terminé",
    price: "410 MAD",
    rating: "5.0",
  },
  {
    cleaner: "Nadia M.",
    service: "Nettoyage maison",
    date: "22 Novembre 2025",
    location: "Casablanca",
    status: "Terminé",
    price: "195 MAD",
    rating: "4.7",
  },
]

const monthMap: Record<string, number> = {
  janvier: 0,
  février: 1,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  aout: 7,
  septembre: 8,
  octob: 9,
  octobre: 9,
  novembre: 10,
  décembre: 11,
  decembre: 11,
}

function parseFrenchDate(value: string) {
  const match = value.trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/u)

  if (!match) {
    return null
  }

  const [, day, rawMonth, year] = match
  const monthIndex = monthMap[rawMonth.toLowerCase()]

  if (monthIndex === undefined) {
    return null
  }

  const parsedDate = new Date(Number(year), monthIndex, Number(day))

  if (
    parsedDate.getFullYear() !== Number(year) ||
    parsedDate.getMonth() !== monthIndex ||
    parsedDate.getDate() !== Number(day)
  ) {
    return null
  }

  return parsedDate
}

function groupHistory(items: HistoryItem[]): GroupedHistory[] {
  const parsedEntries = items
    .map((item) => ({
      ...item,
      parsedDate: parseFrenchDate(item.date),
    }))
    .filter((item): item is HistoryEntry => item.parsedDate instanceof Date && !Number.isNaN(item.parsedDate.getTime()))

  parsedEntries.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())

  const groups = new Map<string, HistoryEntry[]>()

  parsedEntries.forEach((item) => {
    const key = `${item.parsedDate.getFullYear()}-${item.parsedDate.getMonth()}`
    const existing = groups.get(key)

    if (existing) {
      existing.push(item)
      return
    }

    groups.set(key, [item])
  })

  return Array.from(groups.entries())
    .map(([key, entries]) => ({
      key,
      label: new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
      }).format(entries[0].parsedDate),
      entries: entries.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime()),
    }))
    .sort((a, b) => b.entries[0].parsedDate.getTime() - a.entries[0].parsedDate.getTime())
}

function BookingHistory() {
  const groupedHistory = groupHistory(history)

  return (
    <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-5 sm:p-6">
        <div>
          <CardTitle className="text-lg font-semibold text-[#1F2937]">
            Historique des réservations
          </CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            Votre historique de prestations de ménage et services.
          </p>
        </div>
        <Badge className="rounded-full border-[#E5E7EB] bg-[#EAF2F6] text-[#2678D1]">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          5 passées
        </Badge>
      </CardHeader>

      <CardContent className="grid gap-4 p-5 pt-0 sm:p-6 sm:pt-0">
        {groupedHistory.map((group) => (
          <div key={group.key} className="rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-medium capitalize text-[#2678D1]">
              <CalendarDays className="h-4 w-4" />
              {group.label}
            </div>

            <div className="mt-4 space-y-3">
              {group.entries.map((item) => (
                <div
                  key={`${item.date}-${item.service}`}
                  className="grid grid-cols-1 gap-4 rounded-[18px] border border-[#E5E7EB] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2678D1]/40 md:grid-cols-[minmax(0,1.3fr)_minmax(220px,0.95fr)_auto] md:items-center"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2F6] text-sm font-semibold text-[#2678D1]">
                      •
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1F2937]">{item.service}</p>
                      <p className="text-sm text-gray-500">{item.cleaner}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-gray-500 md:justify-self-center">
                    <div className="flex items-center gap-1.5 md:justify-center">
                      <CalendarDays className="h-4 w-4 text-[#2678D1]" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:justify-center">
                      <MapPin className="h-4 w-4 text-[#2678D1]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 md:items-end md:justify-self-end">
                    <Badge
                      className={`rounded-full border ${
                        item.status === "Terminé"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {item.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]">
                      <span>{item.price}</span>
                      {item.rating ? (
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {item.rating}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default BookingHistory
