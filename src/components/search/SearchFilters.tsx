import { motion } from "framer-motion";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

interface SearchFiltersProps {
  mode: "customer" | "cleaner";
  onOpenMobileFilters: () => void;
}

export function SearchFilters({ onOpenMobileFilters }: SearchFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4"
    >
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">📍 Ville</label>
          <select className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition">
            <option value="">Toutes les villes</option>
            {["Casablanca", "Rabat", "Marrakech", "Fès", "Meknès", "Agadir", "Tanger"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">🔎 Nom</label>
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition"
          />
        </div>

        <div className="flex-1 min-w-[130px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">⭐ Note min.</label>
          <select className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition">
            <option value="">Toutes</option>
            <option>4.5+</option>
            <option>4.0+</option>
            <option>3.5+</option>
          </select>
        </div>

        <div className="flex-1 min-w-[130px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">💰 Budget max</label>
          <select className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition">
            <option value="">Tous les budgets</option>
            <option>80 MAD/h</option>
            <option>120 MAD/h</option>
            <option>150 MAD/h</option>
            <option>200 MAD/h</option>
          </select>
        </div>

        <div className="flex-1 min-w-[130px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">🧹 Service</label>
          <select className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition">
            <option value="">Tous les services</option>
            {["Ménage", "Repassage", "Vitres", "Grand nettoyage", "Cuisine", "Bureaux"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">🕒 Disponibilité</label>
          <select className="w-full text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition">
            <option value="">Toutes</option>
            {["Temps plein", "Temps partiel", "Mission unique", "Week-end", "Disponible aujourd'hui"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-0 items-end self-end">
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] text-gray-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#F9FAFB] transition">
            <RotateCcw size={13} />
            Réinitialiser
          </button>
          <button className="flex items-center gap-1.5 bg-[#2678D1] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1F85C4] transition">
            Appliquer
          </button>
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 border border-[#E5E7EB] text-gray-500 px-3 py-2 rounded-xl text-sm hover:bg-[#F9FAFB] transition"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
