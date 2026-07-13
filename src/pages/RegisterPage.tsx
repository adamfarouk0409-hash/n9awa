import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { UserTypeSelector } from "@/components/auth/UserTypeSelector";
import { useAuth } from "@/hooks/useAuth";
import { cities } from "@/data/cities";
import { serviceNames, availabilityOptions } from "@/data/services";
import { profileService } from "@/services/profileService";
import type { UserRole } from "@/types/user";

const registerSchema = z
  .object({
    prenom: z.string().min(2, "Minimum 2 caractères"),
    nom: z.string().min(2, "Minimum 2 caractères"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(10, "Numéro invalide (min 10 chiffres)"),
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string().min(1, "Ce champ est requis"),
    ville: z.string().min(1, "Choisissez une ville"),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, "Acceptez les conditions d'utilisation"),
    experience: z.string().optional(),
    availability: z.string().optional(),
    biography: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500">{msg}</p>;
}

const inputClass = (hasError: boolean) =>
  `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition ${
    hasError ? "border-red-400" : "border-[#E5E7EB]"
  }`;

function RegisterForm({
  role,
  onBack,
}: {
  role: UserRole;
  onBack: () => void;
}) {
  const { register: authRegister } = useAuth();
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  });

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError("");
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setAvatarFile(null);
      setAvatarPreview(null);
      return;
    }

    const validationError = profileService.validateAvatarFile(file);
    if (validationError) {
      setAvatarFile(null);
      setAvatarPreview(null);
      setAvatarError(validationError);
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    try {
      const user = await authRegister({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        password: data.password,
        ville: data.ville,
        role,
        experience: data.experience ? Number(data.experience) : undefined,
        services: role === "cleaner" ? selectedServices : undefined,
        availability: data.availability,
        biography: data.biography,
      });

      if (role === "cleaner" && avatarFile) {
        try {
          await profileService.uploadAvatar(user.id, avatarFile);
        } catch (uploadError) {
          setServerError(
            uploadError instanceof Error
              ? uploadError.message
              : "Impossible de télécharger la photo de profil."
          );
          return;
        }
      }

      navigate("/");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Une erreur est survenue.");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#2678D1] transition mb-5"
      >
        <ChevronLeft size={15} />
        Retour
      </button>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">{role === "client" ? "👤" : "🧹"}</span>
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">
            Compte {role === "client" ? "Client" : "Professionnelle"}
          </h2>
          <p className="text-xs text-gray-400">Remplissez vos informations</p>
        </div>
      </div>

      <SocialButtons />

      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-[#E5E7EB]" />
        <span className="mx-3 text-xs text-gray-400">ou</span>
        <div className="flex-1 border-t border-[#E5E7EB]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
              Prénom <span className="text-[#2678D1]">*</span>
            </label>
            <input
              {...register("prenom")}
              placeholder="Fatima"
              className={inputClass(!!errors.prenom)}
            />
            <FieldError msg={errors.prenom?.message} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
              Nom <span className="text-[#2678D1]">*</span>
            </label>
            <input
              {...register("nom")}
              placeholder="Benali"
              className={inputClass(!!errors.nom)}
            />
            <FieldError msg={errors.nom?.message} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
            Email <span className="text-[#2678D1]">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="votre@email.ma"
            autoComplete="email"
            className={inputClass(!!errors.email)}
          />
          <FieldError msg={errors.email?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
            Téléphone <span className="text-[#2678D1]">*</span>
          </label>
          <input
            {...register("telephone")}
            type="tel"
            placeholder="0661234567"
            className={inputClass(!!errors.telephone)}
          />
          <FieldError msg={errors.telephone?.message} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
              Mot de passe <span className="text-[#2678D1]">*</span>
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClass(!!errors.password) + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <FieldError msg={errors.password?.message} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
              Confirmer <span className="text-[#2678D1]">*</span>
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClass(!!errors.confirmPassword) + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <FieldError msg={errors.confirmPassword?.message} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
            Ville <span className="text-[#2678D1]">*</span>
          </label>
          <select
            {...register("ville")}
            className={inputClass(!!errors.ville) + " bg-white"}
          >
            <option value="">Choisissez une ville</option>
            {cities.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <FieldError msg={errors.ville?.message} />
        </div>

        {/* Professionnelle extra fields */}
        <AnimatePresence>
          {role === "cleaner" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="border-t border-[#E5E7EB] pt-4">
                <p className="text-xs font-semibold text-[#2678D1] mb-3 uppercase tracking-wide">
                  Informations professionnelles
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
                      Années d'expérience
                    </label>
                    <input
                      {...register("experience")}
                      type="number"
                      min="0"
                      placeholder="Ex: 5"
                      className={inputClass(false)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
                      Disponibilité
                    </label>
                    <select
                      {...register("availability")}
                      className={inputClass(false) + " bg-white"}
                    >
                      <option value="">Choisir</option>
                      {availabilityOptions.slice(0, 4).map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#1F2937] mb-2">
                    Services proposés
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceNames.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all ${
                          selectedServices.includes(s)
                            ? "bg-[#2678D1] border-[#2678D1] text-white"
                            : "bg-white border-[#E5E7EB] text-gray-600 hover:border-[#2678D1]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2937] mb-1.5">
                    Biographie courte
                  </label>
                  <textarea
                    {...register("biography")}
                    rows={3}
                    placeholder="Décrivez votre expérience et vos points forts..."
                    className={inputClass(false) + " resize-none"}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2937] mb-3">
                    Photo de profil
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="h-24 w-24 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB]">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Aperçu de la photo de profil"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          Aucune photo sélectionnée
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        id="avatar"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleAvatarChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="avatar"
                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-medium text-[#2678D1] hover:border-[#1E63AF] hover:text-[#1E63AF] transition"
                      >
                        Choisir une photo
                      </label>
                      <p className="text-xs text-gray-500">
                        JPG, PNG ou WEBP — maximum 5 Mo.
                      </p>
                      {avatarError && (
                        <p className="text-xs text-red-500">{avatarError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-2.5">
          <input
            {...register("acceptTerms")}
            id="acceptTerms"
            type="checkbox"
            className="w-4 h-4 mt-0.5 accent-[#2678D1] flex-shrink-0"
          />
          <label htmlFor="acceptTerms" className="text-xs text-gray-600 leading-relaxed">
            J'accepte les{" "}
            <a href="#" className="text-[#2678D1] hover:underline">
              conditions d'utilisation
            </a>{" "}
            et la{" "}
            <a href="#" className="text-[#2678D1] hover:underline">
              politique de confidentialité
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-red-500">{errors.acceptTerms.message}</p>
        )}

        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600"
          >
            {serverError}
          </motion.div>
        )}

        <motion.button
          whileHover={{ y: -1, boxShadow: "0 8px 20px rgba(38,120,209,0.28)" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#2678D1] hover:bg-[#1F85C4] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={15} className="animate-spin" />}
          {isSubmitting ? "Création en cours..." : "Créer mon compte"}
        </motion.button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="text-[#2678D1] font-semibold hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole | null>(null);

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {!role ? (
          <motion.div
            key="type-selector"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <UserTypeSelector onSelect={setRole} />
          </motion.div>
        ) : (
          <motion.div
            key="register-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <RegisterForm role={role} onBack={() => setRole(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
