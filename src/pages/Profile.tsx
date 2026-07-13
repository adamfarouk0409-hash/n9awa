import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
import { useLocation } from "wouter"
import {
  Bell,
  CheckCircle2,
  Clock3,
  Globe2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MoonStar,
  Phone,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react"

import AppLayout from "@/components/layout/AppLayout"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { profileService } from "@/services/profileService"

type ProfileForm = {
  prenom: string
  nom: string
  email: string
  telephone: string
  ville: string
  adresse: string
}

function Profile() {
  const { user, logout } = useAuth()
  const [, navigate] = useLocation()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarError, setAvatarError] = useState("")
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [profile, setProfile] = useState<ProfileForm>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    adresse: "",
  })

  const initials = useMemo(() => {
    const first = profile.prenom?.trim().charAt(0) || user?.prenom?.trim().charAt(0) || user?.email?.charAt(0) || "U"
    const second = profile.nom?.trim().charAt(0) || user?.nom?.trim().charAt(0) || (user?.email?.split("@")[0].charAt(1)) || "N"
    return `${first}${second}`.toUpperCase()
  }, [profile.nom, profile.prenom])

  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      setLoading(true)
      setErrorMessage("")
      try {
        if (!user) return

        // Fetch the profile row matching the current authenticated user
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name,last_name,phone,city,address,role,avatar_url")
          .eq("user_id", user.id)
          .maybeSingle()

        if (error) {
          console.warn("Failed to fetch profile:", error)
          setErrorMessage("Impossible de charger le profil.")
        }

        if (data) {
          if (!mounted) return
          setAvatarUrl((data.avatar_url as string) || null)
          setProfile({
            prenom: (data.first_name as string) || "",
            nom: (data.last_name as string) || "",
            email: user.email || "",
            telephone: (data.phone as string) || "",
            ville: (data.city as string) || "",
            adresse: (data.address as string) || "",
          })
        } else {
          // No profile row found — fall back to auth user
          setProfile((p) => ({
            ...p,
            email: user.email || p.email,
          }))
        }
      } catch (err) {
        console.error(err)
        setErrorMessage("Une erreur est survenue lors du chargement du profil.")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [user])

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const handleSave = async () => {
    setErrorMessage("")
    setMessage("")
    if (!user) {
      setErrorMessage("Utilisateur non authentifié.")
      return
    }

    setSaving(true)
    try {
      const updates = {
        first_name: profile.prenom || null,
        last_name: profile.nom || null,
        phone: profile.telephone || null,
        city: profile.ville || null,
        address: profile.adresse || null,
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .maybeSingle()

      if (error) {
        console.error("Profile update error:", error)
        setErrorMessage("Impossible d'enregistrer les modifications.")
        return
      }

      setMessage("Modifications enregistrées avec succès.")
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      setErrorMessage("Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const setPreviewForFile = (file: File) => {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }
    setAvatarPreviewUrl(URL.createObjectURL(file))
  }

  const clearPreview = () => {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
      setAvatarPreviewUrl(null)
    }
  }

  const handleNewAvatarFile = (file: File) => {
    setAvatarError("")
    const validationError = profileService.validateAvatarFile(file)
    if (validationError) {
      clearPreview()
      setAvatarFile(null)
      setAvatarError(validationError)
      return
    }
    setAvatarFile(file)
    setPreviewForFile(file)
  }

  const handleAvatarFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    if (!file) return
    handleNewAvatarFile(file)
    event.target.value = ""
  }

  const handleAvatarDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(true)
  }

  const handleAvatarDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
  }

  const handleAvatarDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0] ?? null
    if (!file) return
    handleNewAvatarFile(file)
  }

  const resizeAndCropToSquare = async (file: File): Promise<File> => {
    const imageBitmap = await createImageBitmap(file)
    const size = Math.min(imageBitmap.width, imageBitmap.height)
    const sx = Math.floor((imageBitmap.width - size) / 2)
    const sy = Math.floor((imageBitmap.height - size) / 2)
    const targetSize = 512

    const canvas = document.createElement("canvas")
    canvas.width = targetSize
    canvas.height = targetSize
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Impossible de préparer l'image pour l'envoi.")

    ctx.drawImage(imageBitmap, sx, sy, size, size, 0, 0, targetSize, targetSize)

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, file.type || "image/png", 0.92)
    })

    if (!blob) {
      throw new Error("Impossible de générer l'image redimensionnée.")
    }

    const extension = file.name.split(".").pop() ?? "png"
    return new File([blob], `avatar.${extension}`, { type: blob.type })
  }

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      setAvatarError("Sélectionnez une image avant de l'envoyer.")
      return
    }
    if (!user) {
      setAvatarError("Utilisateur non authentifié.")
      return
    }

    setAvatarError("")
    setUploadingAvatar(true)

    try {
      const preparedFile = await resizeAndCropToSquare(avatarFile)
      const uploadedUrl = await profileService.uploadAvatar(user.id, preparedFile)
      setAvatarUrl(uploadedUrl)
      setAvatarFile(null)
      clearPreview()
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre avatar a bien été enregistré.",
      })
    } catch (err) {
      setAvatarError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi de la photo de profil."
      )
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleChangeAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
              <div className="h-4 w-36 rounded bg-[#E5E7EB]" />
              <div className="mt-4 h-8 w-56 rounded bg-[#E5E7EB]" />
              <div className="mt-3 h-4 w-full max-w-2xl rounded bg-[#E5E7EB]" />
            </div>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="h-24 w-24 rounded-full bg-[#E5E7EB]" />
                <div className="mt-5 h-5 w-32 rounded bg-[#E5E7EB]" />
                <div className="mt-3 h-4 w-full rounded bg-[#E5E7EB]" />
              </div>
              <div className="space-y-6">
                <div className="animate-pulse rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                  <div className="h-5 w-32 rounded bg-[#E5E7EB]" />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="h-16 rounded bg-[#E5E7EB]" />
                    <div className="h-16 rounded bg-[#E5E7EB]" />
                  </div>
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
                  <Sparkles className="h-4 w-4" />
                  Mon profil
                </div>
                <h1 className="mt-2 text-3xl font-semibold text-[#1F2937]">Mon profil</h1>
                <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                  Gérez vos informations personnelles et vos préférences.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => navigate("/notifications")}
                  variant="outline"
                  className="rounded-full border-[#D1D5DB] text-[#4B5563]"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  onClick={() => navigate("/parametres")}
                  variant="outline"
                  className="rounded-full border-[#D1D5DB] text-[#4B5563]"
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button
                  onClick={() => setIsEditing((current) => !current)}
                  className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]"
                >
                  {isEditing ? "Annuler" : "Modifier"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleAvatarFileSelect}
                  />

                  {avatarUrl ? (
                  <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white">
                    <img
                      src={avatarUrl}
                      alt="Photo de profil"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`group relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed bg-[#F9FAFB] transition ${
                      dragActive
                        ? "border-[#2678D1] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] bg-white"
                    }`}
                    onDragOver={handleAvatarDragOver}
                    onDragLeave={handleAvatarDragLeave}
                    onDrop={handleAvatarDrop}
                    onClick={handleChangeAvatarClick}
                  >
                    {avatarPreviewUrl ? (
                      <img
                        src={avatarPreviewUrl}
                        alt="Aperçu de la nouvelle photo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Avatar className="h-24 w-24 border border-[#E5E7EB] bg-[#EAF2F6]">
                        <AvatarFallback className="text-lg font-semibold text-[#2678D1]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-white/80 p-2 text-center text-xs text-gray-500 backdrop-blur-sm">
                      <span className="font-medium text-[#1F2937]">
                        {dragActive ? "Relâchez pour importer" : "Glissez-déposez ou cliquez"}
                      </span>
                      <span>JPG, PNG, WEBP • max 5 Mo</span>
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-[#1F2937]">
                      {profile.prenom} {profile.nom}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-1">
                        <Mail className="h-4 w-4 text-[#2678D1]" />
                        {profile.email}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#2678D1]" />
                        {profile.telephone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2678D1]" />
                        {profile.ville}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={handleChangeAvatarClick}
                        variant="outline"
                        className="rounded-full border-[#D1D5DB] text-[#4B5563]"
                        disabled={uploadingAvatar}
                      >
                        {uploadingAvatar ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Téléchargement...
                          </>
                        ) : (
                          "Changer la photo"
                        )}
                      </Button>
                      {avatarFile && !uploadingAvatar && (
                        <Button
                          type="button"
                          onClick={handleAvatarUpload}
                          className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]"
                        >
                          Enregistrer la photo
                        </Button>
                      )}
                    </div>
                    {avatarError && (
                      <p className="mt-2 text-xs text-red-500">{avatarError}</p>
                    )}
                    <p className="mt-3 text-sm text-gray-500">{profile.adresse}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Nom</label>
                    <Input
                      value={profile.nom}
                      onChange={(event) => handleChange("nom", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Prénom</label>
                    <Input
                      value={profile.prenom}
                      onChange={(event) => handleChange("prenom", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Email</label>
                    <Input
                      value={profile.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Téléphone</label>
                    <Input
                      value={profile.telephone}
                      onChange={(event) => handleChange("telephone", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Ville</label>
                    <Input
                      value={profile.ville}
                      onChange={(event) => handleChange("ville", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4B5563]">Adresse</label>
                    <Input
                      value={profile.adresse}
                      onChange={(event) => handleChange("adresse", event.target.value)}
                      disabled={!isEditing}
                      className="rounded-full border-[#D1D5DB]"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-semibold text-[#1F2937]">Sécurité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 pt-0">
                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Modifier le mot de passe</p>
                          <p className="text-sm text-gray-500">Réinitialiser votre accès en un clic</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full border-[#D1D5DB] text-[#4B5563]">
                        Modifier
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <Clock3 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Dernière connexion</p>
                          <p className="text-sm text-gray-500">Aujourd&apos;hui à 09:12</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Adresse e-mail vérifiée</p>
                          <p className="text-sm text-gray-500">Votre adresse est sécurisée</p>
                        </div>
                      </div>
                      <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">
                        Vérifiée
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-semibold text-[#1F2937]">Préférences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 pt-0">
                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Notifications par e-mail</p>
                          <p className="text-sm text-gray-500">Réservations et rappels</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Notifications push</p>
                          <p className="text-sm text-gray-500">Mises à jour en temps réel</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <Globe2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Langue</p>
                          <p className="text-sm text-gray-500">Préférée pour l’interface</p>
                        </div>
                      </div>
                      <div className="rounded-full border border-[#D1D5DB] bg-white px-3 py-1 text-sm font-medium text-[#4B5563]">
                        Français
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F6] text-[#2678D1]">
                          <MoonStar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">Mode sombre</p>
                          <p className="text-sm text-gray-500">Préparation de l&apos;expérience</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">Compte</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 p-6 pt-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {message || "Vos informations sont prêtes à être synchronisées."}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleSave}
                      className="rounded-full bg-[#2678D1] text-white hover:bg-[#1E63AF]"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les modifications
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
