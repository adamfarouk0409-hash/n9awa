import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { serviceCards } from "@/data/services";

interface ServiceSelectionProps {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function ServiceSelection({ value, onChange, error }: ServiceSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-1">Choisissez un service</h2>
      <p className="text-gray-500 text-sm mb-6">Sélectionnez le type de nettoyage souhaité</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {serviceCards.map((card) => {
          const selected = value === card.title;
          return (
            <motion.button
              key={card.title}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(card.title)}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                selected
                  ? "border-[#2678D1] bg-[#EAF2F6]"
                  : "border-[#E5E7EB] bg-white hover:border-[#2678D1]/40"
              }`}
            >
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-[#2678D1] rounded-full flex items-center justify-center"
                >
                  <Check size={13} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${
                  selected ? "bg-[#2678D1]" : "bg-[#EAF2F6]"
                }`}
              >
                <card.icon
                  size={22}
                  className={selected ? "text-white" : "text-[#2678D1]"}
                />
              </div>
              <p
                className={`font-semibold text-sm mb-1 ${
                  selected ? "text-[#2678D1]" : "text-[#1F2937]"
                }`}
              >
                {card.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {card.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-red-500 flex items-center gap-1.5"
        >
          ⚠ {error}
        </motion.p>
      )}
    </div>
  );
}
