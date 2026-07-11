import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "wouter"
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CreditCard,
  MapPin,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react"

import AppLayout from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ReservationStatus = "Confirmée" | "En attente" | "Terminée" | "Annulée"

type Reservation = {
  id: number
  service: string
  cleaner: string
  cleanerCity: string
  date: string
  time: string
  duration: string
  city: string
  address: string
  price: string
  status: ReservationStatus
  paymentMethod: string
  paymentStatus: string
  rating: string
  servicesCount: number
  notes: string
}

const reservationData: Reservation[] = [
  {
    id: 1,
    service: "Nettoyage maison",
    cleaner: "Salma B.",
    cleanerCity: "Casablanca",
    date: "12 juillet 2026",
    time: "09:00",
    duration: "3 heures",
    city: "Casablanca",
    address: "Rue Hassan II, Maarif, Casablanca",
    price: "320 MAD",
    status: "Confirmée",
    paymentMethod: "Carte bancaire",
    paymentStatus: "Payé",
    rating: "4.9",
    servicesCount: 87,
    notes: "Le client souhaite que le nettoyage commence par la cuisine.",
  },
  {
    id: 2,
    service: "Nettoyage en profondeur",
    cleaner: "Youssef El Amrani",
    cleanerCity: "Rabat",
    date: "18 juillet 2026",
    time: "14:30",
    duration: "4 heures",
    city: "Rabat",
    address: "Avenue Mohammed V, Rabat",
    price: "480 MAD",
    status: "En attente",
    paymentMethod: "Carte bancaire",
    paymentStatus: "À valider",
    rating: "4.8",
    servicesCount: 64,
    notes: "Prévoir un nettoyage en profondeur pour les sols et les sanitaires.",
  },
  {
    id: 3,
    service: "Nettoyage bureau",
    cleaner: "Imane Z.",
    cleanerCity: "Marrakech",
    date: "02 juillet 2026",
    time: "08:30",
    duration: "2 heures",
    city: "Marrakech",
    address: "Quartier Guéliz, Marrakech",
    price: "260 MAD",
    status: "Terminée",
    paymentMethod: "Carte bancaire",
    paymentStatus: "Payé",
    rating: "5.0",
    servicesCount: 53,
    notes: "Le bureau est déjà prêt pour la semaine suivante.",
  },
  {
    id: 4,
    service: "Nettoyage après déménagement",
    cleaner: "Karim A.",
    cleanerCity: "Tanger",
    date: "28 juin 2026",
    time: "10:00",
    duration: "5 heures",
    city: "Tanger",
    address: "Boulevard Pasteur, Tanger",
    price: "610 MAD",
    status: "Annulée",
    paymentMethod: "Carte bancaire",
    paymentStatus: "Remboursé",
    rating: "4.7",
    servicesCount: 41,
    notes: "La réservation a été annulée à la demande du client.",
  },
]

function ReservationDetails() {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const reservation = useMemo(
    () => reservationData.find((item) => item.id === Number(params.id)),
    [params.id]
  )

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

  if (loading) {
    return (
      <AppLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="h-4 w-40 rounded bg-[#E5E7EB]" />
              <div className="mt-4 h-8 w-64 rounded bg-[#E5E7EB]" />
              <div className="mt-3 h-4 w-full rounded bg-[#E5E7EB]" />
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="h-5 w-32 rounded bg-[#E5E7EB]" />
                <div className="mt-4 h-24 rounded bg-[#E5E7EB]" />
              </div>
              <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="h-5 w-32 rounded bg-[#E5E7EB]" />
                <div className="mt-4 h-24 rounded bg-[#E5E7EB]" />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!reservation) {
    return (
      <AppLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-3xl">
            <Card className="rounded-[24px] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold text-[#1F2937]">Réservation introuvable</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-sm text-gray-500">Cette réservation n&apos;existe pas ou n&apos;est plus disponible.</p>
                <Link href="/reservations">
                  <Button className="mt-5 rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                    Retour aux réservations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)] sm:p-8">
            <Link href="/reservations" className="inline-flex items-center gap-2 text-sm font-medium text-[#2678D1]">
              <ArrowLeft className="h-4 w-4" />
              Retour aux réservations
            </Link>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#2678D1]">
                  <Sparkles className="h-4 w-4" />
                  Réservation #{reservation.id.toString().padStart(4, "0")}
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-[#1F2937]">Réservation #{reservation.id.toString().padStart(4, "0")}</h1>
                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                  Retrouvez toutes les informations concernant votre réservation.
                </p>
              </div>
              {renderStatusBadge(reservation.status)}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Informations principales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="mt-1 font-semibold text-[#1F2937]">{reservation.service}</p>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <p className="text-sm text-gray-500">Prestataire</p>
                    <p className="mt-1 font-semibold text-[#1F2937]">{reservation.cleaner}</p>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <p className="text-sm text-gray-500">Statut</p>
                    <div className="mt-2">{renderStatusBadge(reservation.status)}</div>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="mt-1 font-semibold text-[#1F2937]">{reservation.price}</p>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:col-span-2">
                    <p className="text-sm text-gray-500">Durée estimée</p>
                    <p className="mt-1 font-semibold text-[#1F2937]">{reservation.duration}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Date, heure et adresse</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 text-[#2678D1]" />
                      Date
                    </div>
                    <p className="mt-2 font-semibold text-[#1F2937]">{reservation.date}</p>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 className="h-4 w-4 text-[#2678D1]" />
                      Heure
                    </div>
                    <p className="mt-2 font-semibold text-[#1F2937]">{reservation.time}</p>
                  </div>
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-[#2678D1]" />
                      Adresse
                    </div>
                    <p className="mt-2 font-semibold text-[#1F2937]">{reservation.address}</p>
                    <p className="mt-1 text-sm text-gray-500">{reservation.city}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Prestataire</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2F6] text-sm font-semibold text-[#2678D1]">
                      {reservation.cleaner.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">{reservation.cleaner}</p>
                      <p className="text-sm text-gray-500">{reservation.cleanerCity}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#F9FAFB] px-3 py-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {reservation.rating}
                    </div>
                    <div className="rounded-full bg-[#F9FAFB] px-3 py-2">
                      {reservation.servicesCount} services
                    </div>
                    <div className="rounded-full bg-[#F9FAFB] px-3 py-2">{reservation.cleanerCity}</div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full border-[#D1D5DB] text-[#4B5563]">
                      Voir le profil
                    </Button>
                    <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                      Contacter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Paiement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-6 pt-0">
                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="font-semibold text-[#1F2937]">{reservation.price}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <span className="text-sm text-gray-500">Méthode</span>
                    <span className="font-semibold text-[#1F2937]">{reservation.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <span className="text-sm text-gray-500">État</span>
                    <span className="font-semibold text-[#1F2937]">{reservation.paymentStatus}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Notes</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-sm text-gray-600">
                    {reservation.notes}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2">
                {reservation.status === "Confirmée" || reservation.status === "En attente" ? (
                  <>
                    <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                      Reprogrammer
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50">
                      Annuler
                    </Button>
                  </>
                ) : reservation.status === "Terminée" ? (
                  <>
                    <Button size="sm" className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                      Laisser un avis
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full border-[#D1D5DB] text-[#4B5563]">
                      Réserver à nouveau
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
        </div>
      </div>
    </AppLayout>
  )
}

export default ReservationDetails
