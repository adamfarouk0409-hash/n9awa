import { motion } from "framer-motion";
import type { Cleaner } from "@/data/searchData";

interface AboutSectionProps {
  cleaner: Cleaner;
}

export function AboutSection({ cleaner }: AboutSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-3">À propos</h2>
      <p className="text-gray-600 leading-relaxed text-sm">{cleaner.bio}</p>
    </motion.section>
  );
}
