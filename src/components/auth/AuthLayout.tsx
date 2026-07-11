import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Star } from "lucide-react";

const n9awaLogo = "/n9awa_nobg.png";

const TRUST_POINTS = [
  "Plus de 250 professionnelles vérifiées",
  "Réservation rapide et sécurisée",
  "Paiement 100% garanti",
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F4F7FA]">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gradient-to-br from-[#2678D1] via-[#1e6ebe] to-[#1a5ca0] relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-16 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-24 right-8 w-56 h-56 rounded-full bg-white/8 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-2.5 mb-16 w-fit">
            <img
              src={n9awaLogo}
              alt="N9AWA"
              className="w-11 h-11 object-contain brightness-0 invert"
            />
            <span className="text-white font-bold text-2xl tracking-tight">N9AWA</span>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4"
            >
              Bienvenue sur N9AWA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-blue-100 text-lg leading-relaxed mb-10 max-w-sm"
            >
              Trouvez une femme de ménage de confiance partout au Maroc.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 mb-10"
            >
              {TRUST_POINTS.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm font-medium">{t}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 max-w-sm border border-white/10"
            >
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} fill="white" className="text-white" />
                ))}
              </div>
              <p className="text-white text-sm font-medium mb-1.5 leading-relaxed">
                "Service exceptionnel ! Je recommande N9AWA à toute ma famille."
              </p>
              <p className="text-blue-200 text-xs">Samira E. — Casablanca</p>
            </motion.div>
          </div>

          <p className="text-blue-200/50 text-xs">© 2025 N9AWA. Tous droits réservés.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8 lg:py-0">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden w-fit">
            <img src={n9awaLogo} alt="N9AWA" className="w-9 h-9 object-contain" />
            <span className="text-[#2678D1] font-bold text-xl">N9AWA</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-8"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
