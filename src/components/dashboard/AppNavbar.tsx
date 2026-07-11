import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, Search, Settings, User, X } from "lucide-react"
import { Link, useLocation } from "wouter"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

type NavItem = {
  label: string
  href: string
}

const navLinks: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Tableau de bord", href: "/dashboard" },
  { label: "Réservations", href: "/search" },
]

function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [location, navigate] = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate("/")
  }

  const initials = user ? `${user.prenom[0]}${user.nom[0]}`.toUpperCase() : ""

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 bg-white transition-shadow duration-300"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center"
            data-testid="link-logo"
          >
            <img
              src="/n9awa_nobg.png"
              alt="N9AWA Logo"
              style={{ height: 64, width: 64, transform: "scale(1.5)", transformOrigin: "left center" }}
            />
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = location === link.href

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-[#2678D1]" : "text-[#1F2937] hover:text-[#2678D1]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center gap-2.5 rounded-full border border-[#E5E7EB] px-3 py-1.5 transition-all hover:border-[#2678D1]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2678D1] to-[#1F85C4] text-xs font-bold text-white">
                    {initials}
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">{user.prenom}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-[#E5E7EB] bg-white py-1.5 shadow-xl"
                    >
                      <div className="mb-1 border-b border-[#F3F4F6] px-4 py-2.5">
                        <p className="text-xs font-bold text-[#1F2937]">
                          {user.prenom} {user.nom}
                        </p>
                        <p className="truncate text-xs text-gray-400">{user.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-[#EAF2F6] px-2 py-0.5 text-xs font-medium text-[#2678D1]">
                          {user.role === "client" ? "Client" : "Professionnelle"}
                        </span>
                      </div>

                      <button
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#1F2937] transition-colors hover:bg-[#F9FAFB]"
                      >
                        <User size={14} className="text-gray-400" />
                        Mon profil
                      </button>
                      <button
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#1F2937] transition-colors hover:bg-[#F9FAFB]"
                      >
                        <LayoutDashboard size={14} className="text-gray-400" />
                        Tableau de bord
                      </button>

                      <div className="mt-1 border-t border-[#F3F4F6] pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
                        >
                          <LogOut size={14} />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-full border border-[#2678D1] px-5 py-2 text-sm font-semibold text-[#2678D1] transition-colors duration-200 hover:bg-[#EAF2F6]"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#2678D1] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1F85C4] hover:shadow-md"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="rounded-lg p-2 text-[#1F2937] hover:bg-[#EAF2F6]"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Ouvrir le menu"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#E5E7EB] bg-white lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-2 font-medium text-[#1F2937] transition-colors hover:text-[#2678D1]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && user ? (
                <div className="space-y-2 border-t border-[#E5E7EB] pt-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2678D1] to-[#1F85C4] text-sm font-bold text-white">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1F2937]">
                        {user.prenom} {user.nom}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link
                    href="/login"
                    className="flex-1 rounded-full border border-[#2678D1] px-4 py-2.5 text-center text-sm font-semibold text-[#2678D1]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-full bg-[#2678D1] px-4 py-2.5 text-center text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}

export default AppNavbar
