import { useEffect, useMemo, useState } from "react"
import { useLocation } from "wouter"
import { CalendarDays, Clock3, MapPin, Search, Sparkles, UserRound } from "lucide-react"

import AppLayout from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ReservationStatus = "Confirmée" | "En attente" | "Terminée" | "Annulée"

type Reservation = {
  id: number
  service: string
  cleaner: string
  date: string
  time: string
  city: string
  address: string
  price: string
  status: ReservationStatus
}

const initialReservations: Reservation[] = [
  {
    id: 1,
    service: "Nettoyage maison",
    cleaner: "Salma B.",
    date: "12 juillet 2026",
    time: "09:00",
    city: "Casablanca",
    address: "Rue Hassan II, Maarif",
    price: "320 MAD",
    status: "Confirmée",
  },
  {
    id: 2,
    service: "Nettoyage en profondeur",
    cleaner: "Youssef El Amrani",
    date: "18 juillet 2026",
    time: "14:30",
    city: "Rabat",
    address: "Avenue Mohammed V",
    price: "480 MAD",
    status: "En attente",
  },
  {
    id: 3,
    service: "Nettoyage bureau",
    cleaner: "Imane Z.",
    date: "02 juillet 2026",
    time: "08:30",
    city: "Marrakech",
    address: "Quartier Guéliz",
    price: "260 MAD",
    status: "Terminée",
  },
  {
    id: 4,
    service: "Nettoyage après déménagement",
    cleaner: "Karim A.",
    date: "28 juin 2026",
    time: "10:00",
    city: "Tanger",
    address: "Boulevard Pasteur",
    price: "610 MAD",
    status: "Annulée",
  },
]

const statusTabs: Array<{ key: "Toutes" | ReservationStatus; label: string }> = [
  { key: "Toutes", label: "Toutes" },
  { key: "Confirmée", label: "À venir" },
  { key: "Terminée", label: "Terminées" },
  { key: "Annulée", label: "Annulées" },
]

function Reservations() {
  const [, setLocation] = useLocation()
  const [reservations] = useState<Reservation[]>(initialReservations)
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"Toutes" | ReservationStatus>("Toutes")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredReservations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return reservations.filter((reservation) => {
      const matchesFilter =
        activeFilter === "Toutes" ||
        (activeFilter === "Confirmée" && reservation.status === "Confirmée") ||
        (activeFilter === "Terminée" && reservation.status === "Terminée") ||
        (activeFilter === "Annulée" && reservation.status === "Annulée")

      const matchesQuery =
        !normalizedQuery ||
        reservation.service.toLowerCase().includes(normalizedQuery) ||
        reservation.city.toLowerCase().includes(normalizedQuery) ||
        reservation.cleaner.toLowerCase().includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query, reservations])

  const summary = useMemo(() => {
    const total = reservations.length
    const aVenir = reservations.filter((item) => item.status === "Confirmée" || item.status === "En attente").length
    const terminees = reservations.filter((item) => item.status === "Terminée").length
    const annulees = reservations.filter((item) => item.status === "Annulée").length

    return [
      { label: "Total", value: total.toString(), accent: "bg-[#EAF2F6] text-[#2678D1]" },
      { label: "À venir", value: aVenir.toString(), accent: "bg-emerald-50 text-emerald-700" },
      { label: "Terminées", value: terminees.toString(), accent: "bg-sky-50 text-sky-700" },
      { label: "Annulées", value: annulees.toString(), accent: "bg-rose-50 text-rose-700" },
    ]
  }, [reservations])

  const renderStatusBadge = (status: ReservationStatus) => {
    const classes =
      status === "Confirmée"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : status === "En attente"
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : status === "Terminée"
            ? "border-sky-200 bg-sky-50 text-sky-700"
            : "border-rose-200 bg-rose-50 text-rose-700"

    return <Badge className={`rounded-full border ${classes}`}>{status}</Badge>
  }

  return (
    <AppLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)] sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#2678D1]">
                  <Sparkles className="h-4 w-4" />
                  Mes réservations
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-[#1F2937]">Mes réservations</h1>
                <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                  Consultez, gérez et suivez toutes vos réservations en un seul endroit.
                </p>
              </div>

              <Button className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                <Sparkles className="mr-2 h-4 w-4" />
                Réserver un service
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
              <Card key={item.label} className="rounded-[20px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${item.accent}`}>
                    {item.label}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-[#1F2937]">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <label className="flex w-full items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 text-sm text-gray-500 lg:max-w-md">
                  <Search className="h-4 w-4 text-[#2678D1]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher par service, ville ou prestataire"
                    className="w-full border-0 bg-transparent outline-none placeholder:text-gray-400"
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  {statusTabs.map((tab) => {
                    const isActive = activeFilter === tab.key

                    return (
                      <Button
                        key={tab.key}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(tab.key)}
                        className={`rounded-full ${isActive ? "bg-[#2678D1] text-white" : "border-[#D1D5DB] text-[#4B5563]"}`}
                      >
                        {tab.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-28 rounded bg-[#E5E7EB]" />
                    <div className="h-5 w-48 rounded bg-[#E5E7EB]" />
                    <div className="h-4 w-full rounded bg-[#E5E7EB]" />
                    <div className="h-10 w-full rounded-full bg-[#E5E7EB]" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredReservations.length === 0 ? (
            <Card className="rounded-[24px] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold text-[#1F2937]">Aucune réservation</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-sm text-gray-500">Vous n&apos;avez encore effectué aucune réservation.</p>
                <Button className="mt-5 rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                  Réserver un service
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="rounded-[22px] border border-[#E5E7EB] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2678D1]/40">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-semibold text-[#1F2937]">{reservation.service}</h2>
                          {renderStatusBadge(reservation.status)}
                        </div>

                        <div className="mt-3 grid gap-3 text-sm text-gray-600 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <UserRound className="h-4 w-4 text-[#2678D1]" />
                            <span>{reservation.cleaner}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-[#2678D1]" />
                            <span>{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-[#2678D1]" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#2678D1]" />
                            <span>{reservation.city}</span>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-500">{reservation.address}</p>
                      </div>

                      <div className="flex flex-col gap-3 xl:min-w-[220px] xl:items-end">
                        <div className="text-xl font-semibold text-[#1F2937]">{reservation.price}</div>

                        <div className="flex flex-wrap gap-2">
                          {reservation.status === "Confirmée" || reservation.status === "En attente" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLocation(`/reservations/${reservation.id}`)}
                                className="rounded-full border-[#D1D5DB] text-[#4B5563]"
                              >
                                Voir les détails
                              </Button>
                              <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                                Reprogrammer
                              </Button>
                              <Button variant="outline" size="sm" className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50">
                                Annuler
                              </Button>
                            </>
                          ) : reservation.status === "Terminée" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLocation(`/reservations/${reservation.id}`)}
                                className="rounded-full border-[#D1D5DB] text-[#4B5563]"
                              >
                                Voir les détails
                              </Button>
                              <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                                Laisser un avis
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                              Réserver à nouveau
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default Reservations
