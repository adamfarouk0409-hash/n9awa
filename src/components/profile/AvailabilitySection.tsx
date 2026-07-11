import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { Cleaner } from "@/data/cleaners";
import { availabilityDisplayOptions } from "@/data/services";

interface AvailabilitySectionProps {
  cleaner: Cleaner;
}

export function AvailabilitySection({ cleaner }: AvailabilitySectionProps) {
  const isActive = (opt: string) =>
    cleaner.availability === opt ||
    (cleaner.availability === "Disponible aujourd'hui" && opt === "Mission unique");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-4">Disponibilité</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {availabilityDisplayOptions.map((opt) => (
          <div
            key={opt}
            className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl border text-center transition-all ${
              isActive(opt)
                ? "border-[#2678D1] bg-[#EAF2F6] text-[#2678D1]"
                : "border-[#E5E7EB] bg-[#F9FAFB] text-gray-400"
            }`}
          >
            {isActive(opt) ? (
              <CheckCircle size={20} className="mb-2 text-[#2678D1]" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 mb-2" />
            )}
            <span className="text-xs font-semibold">{opt}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
