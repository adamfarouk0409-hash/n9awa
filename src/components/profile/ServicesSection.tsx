import { motion } from "framer-motion";
import type { Cleaner } from "@/data/cleaners";
import { serviceIcons } from "@/data/services";

interface ServicesSectionProps {
  cleaner: Cleaner;
}

export function ServicesSection({ cleaner }: ServicesSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-4">Services proposés</h2>
      <div className="flex flex-wrap gap-3">
        {cleaner.services.map((service) => (
          <motion.div
            key={service}
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 bg-[#EAF2F6] text-[#1F2937] px-4 py-2.5 rounded-xl text-sm font-medium border border-[#2678D1]/10"
          >
            <span className="text-base">{serviceIcons[service] ?? "✨"}</span>
            {service}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
