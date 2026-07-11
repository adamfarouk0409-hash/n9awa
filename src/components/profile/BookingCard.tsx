import { motion } from "framer-motion";
import { Star, MessageCircle, CalendarCheck, CheckCircle, Zap } from "lucide-react";
import { useLocation } from "wouter";
import type { Cleaner } from "@/data/cleaners";

interface BookingCardProps {
  cleaner: Cleaner;
  sticky?: boolean;
}

export function BookingCard({ cleaner, sticky = false }: BookingCardProps) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white rounded-2xl border border-[#E5E7EB] shadow-lg p-6 ${sticky ? "sticky top-24" : ""}`}
    >
      <div className="flex items-end justify-between mb-1">
        <div>
          <span className="text-xs text-gray-400">À partir de</span>
          <p className="text-3xl font-bold text-[#1F2937]">
            {cleaner.pricePerHour} <span className="text-base font-normal text-gray-400">MAD/h</span>
          </p>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-sm text-[#1F2937]">{cleaner.rating}</span>
          <span className="text-gray-400 text-xs">({cleaner.reviewCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {cleaner.availability}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Zap size={11} className="text-amber-500" />
          Répond vite
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <motion.button
          whileHover={{ y: -1, boxShadow: "0 8px 20px rgba(38,120,209,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/booking/${cleaner.id}`)}
          className="w-full flex items-center justify-center gap-2 bg-[#2678D1] hover:bg-[#1F85C4] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          <CalendarCheck size={15} />
          Réserver maintenant
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 border border-[#2678D1] text-[#2678D1] py-3 rounded-xl font-semibold text-sm hover:bg-[#EAF2F6] transition-colors"
        >
          <MessageCircle size={15} />
          Contacter
        </motion.button>
      </div>

      <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-2">
        {[
          { icon: <CheckCircle size={13} className="text-emerald-500" />, text: "Professionnelle vérifiée" },
          { icon: <CheckCircle size={13} className="text-emerald-500" />, text: "Paiement 100% sécurisé" },
          { icon: <CheckCircle size={13} className="text-emerald-500" />, text: "Annulation gratuite" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
            {item.icon}
            {item.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
