import { CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BookingItem = {
  cleaner: string
  service: string
  date: string
  time: string
  location: string
  status: "Confirmed" | "Pending"
  price: string
  initials: string
}

const bookings: BookingItem[] = [
  {
    cleaner: "Youssef El Amrani",
    service: "Ménage maison",
    date: "Samedi, 6 juillet",
    time: "10:00",
    location: "Casablanca",
    status: "Confirmed",
    price: "220 MAD",
    initials: "YE",
  },
  {
    cleaner: "Salma B.",
    service: "Ménage en profondeur",
    date: "Dimanche, 7 juillet",
    time: "14:30",
    location: "Rabat",
    status: "Pending",
    price: "340 MAD",
    initials: "SB",
  },
  {
    cleaner: "Imane Z.",
    service: "Ménage de bureau",
    date: "Lundi, 8 juillet",
    time: "18:00",
    location: "Marrakech",
    status: "Confirmed",
    price: "280 MAD",
    initials: "IZ",
  },
  {
    cleaner: "Karim A.",
    service: "Ménage de déménagement",
    date: "Mercredi, 10 juillet",
    time: "09:30",
    location: "Tangier",
    status: "Pending",
    price: "410 MAD",
    initials: "KA",
  },
]

function UpcomingBooking() {
  return (
    <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-5 sm:p-6">
        <div>
          <CardTitle className="text-lg font-semibold text-[#1F2937]">
            Réservations à venir
          </CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            Vos prochaines prestations de ménage sont déjà planifiées.
          </p>
        </div>
        <Badge className="rounded-full border-[#E5E7EB] bg-[#EAF2F6] text-[#2678D1]">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          4 prévues
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-5 pt-0 sm:p-6 sm:pt-0">
        {bookings.map((booking) => (
          <div
            key={`${booking.cleaner}-${booking.date}`}
            className="flex flex-col gap-4 rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2678D1]/40 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-[#E5E7EB] bg-white">
                <AvatarFallback className="bg-gradient-to-br from-[#2678D1] to-[#1F85C4] text-sm font-semibold text-white">
                  {booking.initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold text-[#1F2937]">{booking.cleaner}</p>
                <p className="text-sm text-gray-500">{booking.service}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 sm:justify-end">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#2678D1]" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-[#2678D1]" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#2678D1]" />
                <span>{booking.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <Badge
                className={`rounded-full border ${
                  booking.status === "Confirmed"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {booking.status === "Confirmed" ? "Confirmé" : "En attente"}
              </Badge>
              <p className="text-sm font-semibold text-[#1F2937]">{booking.price}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default UpcomingBooking
