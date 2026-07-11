import { Bell, CalendarDays } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function DashboardHeader() {
  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-24px_rgba(38,120,209,0.35)]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2F6] text-[#2678D1]">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#2678D1]">Tableau de bord</p>
            <h2 className="text-xl font-bold text-[#1F2937] sm:text-2xl">
              Bonjour, Adam 👋
            </h2>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-[#E5E7EB] bg-white text-[#1F2937] transition-all duration-200 hover:border-[#2678D1] hover:bg-[#EAF2F6] hover:text-[#2678D1]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Avatar className="h-11 w-11 border border-[#E5E7EB] shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-[#2678D1] to-[#1F85C4] text-sm font-semibold text-white">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Card>
  )
}

export default DashboardHeader
