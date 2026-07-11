import { motion } from "framer-motion";
import { languages } from "@/data/languages";

export function LanguagesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-4">Langues parlées</h2>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <motion.span
            key={lang.label}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] text-[#1F2937] px-4 py-2 rounded-xl text-sm font-medium"
          >
            <span className="text-lg">{lang.flag}</span>
            {lang.label}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
}
