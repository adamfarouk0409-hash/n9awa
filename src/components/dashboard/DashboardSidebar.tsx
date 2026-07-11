import { useState } from "react"
import {
  Activity,
  CalendarDays,
  ChevronRight,
  History,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type NavItem = {
  id: string
  label: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "bookings", label: "Réservations", icon: CalendarDays },
  { id: "history", label: "Historique", icon: History },
  { id: "favorites", label: "Prestataires favoris", icon: HeartHandshake },
  { id: "activity", label: "Activité", icon: Activity },
  { id: "settings", label: "Paramètres", icon: Settings },
]

function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <div className="fixed left-4 top-4 z-[60] lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-[#D1D5DB] bg-white/95 shadow-lg backdrop-blur"
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#E5E7EB] bg-white/95 px-4 py-5 shadow-[18px_0_80px_-35px_rgba(38,120,209,0.38)] backdrop-blur transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2678D1] text-white shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F2937]">N9AWA</p>
              <p className="text-xs text-gray-500">Tableau de bord</p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-[#4B5563] lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-8 flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveItem(item.id)
                  setMobileOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-[#EAF2F6] text-[#2678D1] shadow-sm"
                    : "text-[#4B5563] hover:bg-[#F8FAFC] hover:text-[#1F2937]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? "bg-[#2678D1] text-white" : "bg-[#F3F4F6] text-[#4B5563]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </span>
                <ChevronRight className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-50"}`} />
              </button>
            )
          })}
        </nav>

        <div className="mt-4 rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-[#D1D5DB] bg-[#EAF2F6] text-[#2678D1]">
              <AvatarFallback className="bg-[#EAF2F6] text-[#2678D1]">YE</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-[#1F2937]">Youssef El Amrani</p>
              <p className="text-sm text-gray-500">Client</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-[#4B5563]"
              aria-label="Paramètres du profil"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full justify-start rounded-full border-[#D1D5DB] bg-white text-[#4B5563] hover:bg-[#F3F4F6]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar
