import { useEffect, useState } from "react"
import { useLocation } from "wouter"
import {
  Bell,
  CheckCircle2,
  Eye,
  Globe2,
  KeyRound,
  MoonStar,
  Save,
  Settings2,
  ShieldCheck,
  SunMedium,
  Trash2,
} from "lucide-react"

import AppLayout from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

function Settings() {
  const [, _navigate] = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
              <div className="h-4 w-36 rounded bg-[#E5E7EB]" />
              <div className="mt-4 h-8 w-64 rounded bg-[#E5E7EB]" />
              <div className="mt-3 h-4 w-full max-w-2xl rounded bg-[#E5E7EB]" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="h-5 w-32 rounded bg-[#E5E7EB]" />
                <div className="mt-4 space-y-3">
                  <div className="h-14 rounded bg-[#E5E7EB]" />
                  <div className="h-14 rounded bg-[#E5E7EB]" />
                </div>
              </div>
              <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="h-5 w-32 rounded bg-[#E5E7EB]" />
                <div className="mt-4 space-y-3">
                  <div className="h-14 rounded bg-[#E5E7EB]" />
                  <div className="h-14 rounded bg-[#E5E7EB]" />
                </div>
              </div>
            </div>
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#2678D1]">
                  <Settings2 className="h-4 w-4" />
                  Paramètres
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-[#1F2937]">Paramètres</h1>
                <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                  Personnalisez votre expérience et gérez les paramètres de votre compte.
                </p>
              </div>
              <Button className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]">
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  {[
                    { label: "Notifications par e-mail", description: "Réservations, confirmations et rappels", checked: true },
                    { label: "Notifications push", description: "Mises à jour en temps réel", checked: true },
                    { label: "Promotions et offres", description: "Remises et nouveautés", checked: false },
                    { label: "Rappels de réservation", description: "Avant chaque visite prévue", checked: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div>
                        <p className="font-medium text-[#1F2937]">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Langue</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <label className="mb-2 block text-sm font-medium text-[#4B5563]">Interface</label>
                    <Select defaultValue="fr">
                      <SelectTrigger className="rounded-full border-[#D1D5DB] bg-white">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Préférences d&apos;adresse</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Ville par défaut</label>
                    <Input defaultValue="Casablanca" className="rounded-full border-[#D1D5DB]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Adresse favorite</label>
                    <Input defaultValue="Rue Hassan II, Maarif" className="rounded-full border-[#D1D5DB]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Confidentialité et sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                        <KeyRound className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937]">Changer le mot de passe</p>
                        <p className="text-sm text-gray-500">Mettez à jour vos accès</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full border-[#D1D5DB] text-[#4B5563]">
                      Modifier
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                        <Eye className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937]">Sessions actives</p>
                        <p className="text-sm text-gray-500">2 appareils connectés</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full border-[#D1D5DB] text-[#4B5563]">
                      Gérer
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937]">Authentification à deux facteurs</p>
                        <p className="text-sm text-gray-500">Disponible prochainement</p>
                      </div>
                    </div>
                    <Badge className="rounded-full border-amber-200 bg-amber-50 text-amber-700">Bientôt</Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937]">Adresse e-mail vérifiée</p>
                        <p className="text-sm text-gray-500">Votre compte est sécurisé</p>
                      </div>
                    </div>
                    <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">Vérifiée</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Apparence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  {[
                    { label: "Mode clair", description: "Interface lumineuse", icon: SunMedium, checked: true },
                    { label: "Mode sombre", description: "Interface plus sombre", icon: MoonStar, checked: false },
                    { label: "Utiliser le thème du système", description: "Suit les préférences de votre appareil", icon: Globe2, checked: false },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1F2937]">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <Switch defaultChecked={item.checked} />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Préférences de service</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Prestataire préféré</label>
                    <Input defaultValue="Salma B." className="rounded-full border-[#D1D5DB]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Type de nettoyage préféré</label>
                    <Input defaultValue="Nettoyage maison" className="rounded-full border-[#D1D5DB]" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-[#4B5563]">Créneaux horaires favoris</label>
                    <Input defaultValue="Matin (09:00 - 12:00)" className="rounded-full border-[#D1D5DB]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="rounded-[24px] border border-rose-200 bg-rose-50 shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold text-rose-700">Zone de danger</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-6 pt-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <Trash2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-rose-700">Supprimer mon compte</p>
                  <p className="text-sm text-rose-600">Cette action est irréversible. Elle supprimera définitivement toutes vos données de réservation et vos préférences.</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-100">
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
