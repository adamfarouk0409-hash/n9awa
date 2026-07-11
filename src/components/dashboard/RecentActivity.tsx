import { BellRing, CheckCircle2, Clock3, Sparkles, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ActivityItem = {
  title: string
  description: string
  time: string
  accent: "success" | "info" | "warning" | "danger"
  service?: string
}

const activities: ActivityItem[] = [
  {
    title: "Nouvelle réservation créée",
    description: "Salma B. a accepté une nouvelle demande pour Casablanca.",
    time: "Il y a 2h",
    accent: "info",
    service: "Nettoyage maison",
  },
  {
    title: "Prestataire assigné",
    description: "Youssef El Amrani a été assigné à votre réservation de Rabat.",
    time: "Il y a 4h",
    accent: "success",
    service: "Nettoyage en profondeur",
  },
  {
    title: "Paiement confirmé",
    description: "Le paiement de 320 MAD a été validé avec succès.",
    time: "Hier",
    accent: "success",
    service: "Nettoyage bureau",
  },
  {
    title: "Service terminé",
    description: "Le nettoyage à Marrakech a été marqué comme terminé.",
    time: "Il y a 1j",
    accent: "success",
    service: "Nettoyage maison",
  },
  {
    title: "Réservation confirmée",
    description: "Votre réservation pour Tanger est désormais confirmée.",
    time: "Il y a 2j",
    accent: "info",
    service: "Nettoyage après déménagement",
  },
  {
    title: "Réservation annulée",
    description: "Une réservation a été annulée et le crédit a été remis.",
    time: "Il y a 3j",
    accent: "danger",
    service: "Nettoyage bureau",
  },
  {
    title: "Nouveau message reçu",
    description: "Imane Z. vous a envoyé un message concernant le service.",
    time: "Il y a 4j",
    accent: "warning",
    service: "Nettoyage maison",
  },
]

function renderAccent(accent: ActivityItem["accent"]) {
  switch (accent) {
    case "success":
      return "bg-emerald-100 text-emerald-700"
    case "info":
      return "bg-sky-100 text-sky-700"
    case "warning":
      return "bg-amber-100 text-amber-700"
    case "danger":
      return "bg-rose-100 text-rose-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

function renderIcon(accent: ActivityItem["accent"]) {
  switch (accent) {
    case "success":
      return <CheckCircle2 className="h-4 w-4" />
    case "info":
      return <BellRing className="h-4 w-4" />
    case "warning":
      return <Clock3 className="h-4 w-4" />
    case "danger":
      return <XCircle className="h-4 w-4" />
    default:
      return <Sparkles className="h-4 w-4" />
  }
}

function RecentActivity() {
  return (
    <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-5 sm:p-6">
        <div>
          <CardTitle className="text-lg font-semibold text-[#1F2937]">
            Activité récente
          </CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            Les dernières mises à jour liées à vos réservations.
          </p>
        </div>
        <Badge className="rounded-full border-[#E5E7EB] bg-[#EAF2F6] text-[#2678D1]">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          En direct
        </Badge>
      </CardHeader>

      <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
        <div className="rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={`${activity.title}-${activity.time}`}
                className="group rounded-[16px] border border-transparent bg-white p-4 transition-all duration-200 hover:border-[#2678D1]/30 hover:bg-[#F8FBFF]"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${renderAccent(activity.accent)}`}>
                    {renderIcon(activity.accent)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#1F2937]">{activity.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>

                    {activity.service ? (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#2678D1]" />
                        <span className="text-sm text-gray-500">{activity.service}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {index < activities.length - 1 ? (
                  <div className="ml-[1.125rem] mt-3 h-4 border-l border-dashed border-[#E5E7EB]" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity
