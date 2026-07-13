import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { filterCities } from "@/data/cities";
import { serviceNames, availabilityOptions, budgetRanges, ratingOptions, experienceRanges } from "@/data/services";

interface FilterSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">📍 Ville</h3>
        <div className="space-y-2">
          {filterCities.map((city) => (
            <label key={city.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2678D1] accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{city.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-5">
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">💰 Budget (MAD/h)</h3>
        <div className="space-y-2">
          {budgetRanges.map((b) => (
            <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="budget" className="w-4 h-4 accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-5">
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">⭐ Note minimale</h3>
        <div className="space-y-2">
          {ratingOptions.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="rating" className="w-4 h-4 accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-5">
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">🧹 Services</h3>
        <div className="space-y-2">
          {serviceNames.map((s) => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-5">
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">🕒 Disponibilité</h3>
        <div className="space-y-2">
          {availabilityOptions.map((a) => (
            <label key={a} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{a}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-5">
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">💼 Expérience</h3>
        <div className="space-y-2">
          {experienceRanges.map((e) => (
            <label key={e} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="exp" className="w-4 h-4 accent-[#2678D1]" />
              <span className="text-sm text-gray-600 group-hover:text-[#2678D1] transition-colors">{e}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <button className="w-full bg-[#2678D1] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1F85C4] transition">
          Appliquer les filtres
        </button>
        <button className="w-full border border-[#E5E7EB] text-gray-500 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F9FAFB] transition">
          Réinitialiser
        </button>
      </div>
    </div>
  );
}

export function FilterSidebar({ mobileOpen, onClose }: FilterSidebarProps) {
  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 sticky top-24">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={15} className="text-[#2678D1]" />
            <h2 className="font-semibold text-[#1F2937] text-sm">Filtres</h2>
          </div>
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={15} className="text-[#2678D1]" />
                    <h2 className="font-semibold text-[#1F2937] text-sm">Filtres</h2>
                  </div>
                  <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#EAF2F6] text-gray-500 transition">
                    <X size={18} />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
