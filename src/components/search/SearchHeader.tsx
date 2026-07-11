import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  mode: "customer" | "cleaner";
}

export function SearchHeader({ mode }: SearchHeaderProps) {
  const isCustomer = mode === "customer";

  return (
    <section className="bg-white border-b border-[#E5E7EB] pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#EAF2F6] text-[#2678D1] text-xs font-semibold px-3 py-1 rounded-full">
              <Search size={12} />
              Recherche
            </span>
            <span className="text-xs text-gray-400">
              {isCustomer ? "Mode : Je cherche une femme de ménage" : "Mode : Je cherche des missions"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-2">
            {isCustomer ? "Trouver une femme de ménage" : "Trouver des missions de ménage"}
          </h1>
          <p className="text-gray-500 text-base">
            {isCustomer
              ? "Découvrez des professionnelles qualifiées près de chez vous."
              : "Découvrez les dernières offres de ménage disponibles."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
