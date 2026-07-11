import { useEffect, useMemo, useState } from "react"
import { useLocation } from "wouter"
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react"

import AppLayout from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type NotificationItem = {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
  category: "reservation" | "promotion" | "system"
  icon: "reservation" | "enroute" | "finished" | "payment" | "promo" | "change"
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Réservation confirmée",
    description: "Votre réservation du 12 juillet à 09:00 a été confirmée.",
    time: "Il y a 2 h",
    unread: true,
    category: "reservation",
    icon: "reservation",
  },
  {
    id: 2,
    title: "Le prestataire est en route",
    description: "Salma B. arrive dans 10 minutes.",
    time: "Il y a 1 h",
    unread: false,
    category: "reservation",
    icon: "enroute",
  },
  {
    id: 3,
    title: "Nettoyage terminé",
    description: "Le nettoyage de votre bureau a été marqué comme terminé.",
    time: "Hier",
    unread: false,
    category: "reservation",
    icon: "finished",
  },
  {
    id: 4,
    title: "Paiement confirmé",
    description: "Le paiement de 320 MAD a été accepté.",
    time: "2 jours",
    unread: true,
    category: "system",
    icon: "payment",
  },
  {
    id: 5,
    title: "Nouvelle promotion",
    description: "-15% sur votre prochaine réservation ce mois-ci.",
    time: "Il y a 3 j",
    unread: true,
    category: "promotion",
    icon: "promo",
  },
]

function Notifications() {
  const [, navigate] = useLocation()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications)
  const [filter, setFilter] = useState<"Toutes" | "Non lues" | "Réservations" | "Promotions">("Toutes")

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    if (filter === "Toutes") return items
    if (filter === "Non lues") return items.filter((i) => i.unread)
    if (filter === "Réservations") return items.filter((i) => i.category === "reservation")
    return items.filter((i) => i.category === "promotion")
  }, [filter, items])

  const markAllAsRead = () => setItems((s) => s.map((i) => ({ ...i, unread: false })))
  const deleteOne = (id: number) => setItems((s) => s.filter((i) => i.id !== id))
  const toggleRead = (id: number) => setItems((s) => s.map((i) => (i.id === id ? { ...i, unread: false } : i)))

  return (
    <AppLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 overflow-x-hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)] sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-medium text-[#2678D1]">
                  <Bell className="h-4 w-4" />
                  Notifications
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-[#1F2937]">Notifications</h1>
                <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                  Retrouvez toutes les mises à jour concernant votre compte et vos réservations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 min-w-0">
                <div className="hidden sm:block text-sm text-gray-600 flex-shrink-0">Filtre:</div>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {(["Toutes", "Non lues", "Réservations", "Promotions"] as const).map((f) => (
                    <Button
                      key={f}
                      variant={filter === f ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(f)}
                      className={`rounded-full ${filter === f ? "bg-[#2678D1] text-white" : "border-[#D1D5DB] text-[#4B5563]"}`}
                    >
                      {f}
                    </Button>
                  ))}
                </div>
                <div className="flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={markAllAsRead} className="rounded-full">
                    Tout marquer comme lu
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="w-full rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm box-border overflow-hidden max-w-full">
                  <div className="animate-pulse flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#E5E7EB]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 rounded bg-[#E5E7EB]" />
                      <div className="h-3 w-1/2 rounded bg-[#E5E7EB]" />
                    </div>
                    <div className="h-4 w-16 rounded bg-[#E5E7EB]" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <Card className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm box-border overflow-hidden max-w-full">
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold text-[#1F2937]">Aucune notification</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-sm text-gray-500">Vous êtes à jour.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filtered.map((n) => (
                <Card
                  key={n.id}
                  className={`w-full rounded-[22px] border ${n.unread ? "border-[#2678D1] bg-white" : "border-[#E5E7EB] bg-white"} shadow-sm box-border overflow-hidden max-w-full`} 
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          {n.icon === "reservation" ? <CalendarDays className="h-5 w-5" /> : n.icon === "enroute" ? <UserRound className="h-5 w-5" /> : n.icon === "finished" ? <CheckCircle2 className="h-5 w-5" /> : n.icon === "payment" ? <CreditCard className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-[#1F2937]">{n.title}</h3>
                            {n.unread && <Badge className="rounded-full bg-[#2678D1] text-white">Nouveau</Badge>}
                          </div>
                          <p className="mt-1 text-sm text-gray-600 break-words">{n.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="text-xs text-gray-400">{n.time}</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="rounded-full" onClick={() => toggleRead(n.id)}>
                            Marquer lu
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full text-rose-600" onClick={() => deleteOne(n.id)}>
                            Supprimer
                          </Button>
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

export default Notifications
