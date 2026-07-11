import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { authService } from "@/services/authService";

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await authService.forgotPassword(data.email);
    setSentEmail(data.email);
    setSent(true);
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#2678D1] transition mb-6"
            >
              <ArrowLeft size={15} />
              Retour à la connexion
            </Link>

            <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
              Mot de passe oublié ?
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Entrez votre email et nous vous enverrons un lien de réinitialisation.
            </p>

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

              <motion.button
                whileHover={{ y: -1, boxShadow: "0 8px 20px rgba(38,120,209,0.28)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2678D1] hover:bg-[#1F85C4] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle size={32} className="text-emerald-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">Lien envoyé !</h3>
            <p className="text-sm text-gray-500 mb-1">
              Nous avons envoyé un lien de réinitialisation à
            </p>
            <p className="text-sm font-semibold text-[#2678D1] mb-6">{sentEmail}</p>
            <p className="text-xs text-gray-400 mb-6">
              Vérifiez votre boîte de réception et vos spams.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#2678D1] font-semibold hover:underline"
            >
              <ArrowLeft size={14} />
              Retour à la connexion
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
