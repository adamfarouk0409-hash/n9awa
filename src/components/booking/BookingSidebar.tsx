import { motion } from "framer-motion";
import { Star, Calendar, Clock, CheckCircle } from "lucide-react";
import type { Cleaner } from "@/data/cleaners";
import { ESTIMATED_HOURS } from "@/data/services";

interface BookingSidebarProps {
  cleaner: Cleaner;
  service: string;
  date: string;
  time: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function BookingSidebar({ cleaner, service, date, time }: BookingSidebarProps) {
  const total = cleaner.pricePerHour * ESTIMATED_HOURS;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="sticky top-24"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        {/* Cleaner header */}
        <div
          className={`bg-gradient-to-br ${cleaner.headerGradient} p-5 flex items-center gap-3`}
        >
          <div className="w-14 h-14 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {cleaner.initials}
          </div>
          <div>
            <p className="font-bold text-white">{cleaner.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} fill="white" className="text-white" />
              <span className="text-white/90 text-xs font-semibold">{cleaner.rating}</span>
              <span className="text-white/60 text-xs">({cleaner.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400">À partir de</p>
              <p className="text-2xl font-bold text-[#1F2937]">
                {cleaner.pricePerHour}{" "}
                <span className="text-sm font-normal text-gray-400">MAD/h</span>
              </p>
            </div>
            {cleaner.verified && (
              <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle size={11} />
                Vérifiée
              </div>
            )}
          </div>

          <div className="border-t border-[#F3F4F6] pt-4 space-y-3">
            {/* Selected service */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Service</p>
              {service ? (
                <p className="text-sm font-semibold text-[#1F2937]">{service}</p>
              ) : (
                <p className="text-sm text-gray-300 italic">Non sélectionné</p>
              )}
            </div>

            {/* Selected date */}
            <div className="flex items-start gap-2">
              <Calendar size={14} className="text-[#2678D1] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Date</p>
                {date ? (
                  <p className="text-sm font-semibold text-[#1F2937]">{formatDate(date)}</p>
                ) : (
                  <p className="text-sm text-gray-300 italic">Non sélectionnée</p>
                )}
              </div>
            </div>

            {/* Selected time */}
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-[#2678D1] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Heure</p>
                {time ? (
                  <p className="text-sm font-semibold text-[#1F2937]">{time}</p>
                ) : (
                  <p className="text-sm text-gray-300 italic">Non sélectionnée</p>
                )}
              </div>
            </div>
          </div>

          {/* Total */}
          {service && date && time && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#EAF2F6] rounded-xl p-3.5 border-t border-[#F3F4F6]"
            >
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{ESTIMATED_HOURS} heures estimées</span>
                <span>{cleaner.pricePerHour} MAD/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#1F2937]">Total estimé</span>
                <span className="text-lg font-bold text-[#2678D1]">{total} MAD</span>
              </div>
            </motion.div>
          )}

          {/* Trust */}
          <div className="space-y-1.5 pt-1">
            {["Paiement sécurisé", "Annulation gratuite"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle size={11} className="text-emerald-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
