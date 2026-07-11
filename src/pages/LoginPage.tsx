import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useLocation, useSearch } from "wouter";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const search = useSearch();
  const redirect = new URLSearchParams(search).get("redirect") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    try {
      await login(data.email, data.password);
      navigate(redirect);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Une erreur est survenue.");
    }
  };

  const isBookingRedirect = redirect.startsWith("/booking");

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-1">Connexion</h2>
        <p className="text-sm text-gray-500">Heureux de vous revoir sur N9AWA</p>
      </div>

      {isBookingRedirect && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-sm text-amber-700 flex items-start gap-2"
        >
          <span className="text-base flex-shrink-0">🔒</span>
          <span>Veuillez vous connecter pour confirmer votre réservation.</span>
        </motion.div>
      )}

      <SocialButtons />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-[#E5E7EB]" />
        <span className="mx-3 text-xs text-gray-400 font-medium">ou</span>
        <div className="flex-1 border-t border-[#E5E7EB]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="votre@email.ma"
            autoComplete="email"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition ${
              errors.email ? "border-red-400" : "border-[#E5E7EB]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-semibold text-[#1F2937]">
              Mot de passe
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#2678D1] hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition ${
                errors.password ? "border-red-400" : "border-[#E5E7EB]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Afficher le mot de passe"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            {...register("rememberMe")}
            id="rememberMe"
            type="checkbox"
            className="w-4 h-4 accent-[#2678D1] rounded"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Se souvenir de moi
          </label>
        </div>

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
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </motion.button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Vous n'avez pas encore de compte ?{" "}
        <Link href="/register" className="text-[#2678D1] font-semibold hover:underline">
          Créer un compte
        </Link>
      </p>

      <div className="mt-5 bg-[#EAF2F6] rounded-xl p-3.5 text-xs text-gray-500 space-y-0.5">
        <p className="font-semibold text-[#2678D1] mb-1">Comptes de démonstration :</p>
        <p>yasmine@test.ma / password123 &nbsp;(Client)</p>
        <p>fatima@test.ma &nbsp;/ password123 &nbsp;(Professionnelle)</p>
      </div>
    </AuthLayout>
  );
}
