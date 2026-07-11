import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[#EAF2F6] flex items-center justify-center mb-5">
        <SearchX size={32} className="text-[#2678D1]" />
      </div>
      <h3 className="text-xl font-bold text-[#1F2937] mb-2">Aucun résultat trouvé</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-xs">
        Essayez de modifier vos critères de recherche ou élargissez votre zone géographique.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="bg-[#2678D1] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1F85C4] transition"
      >
        Réinitialiser les filtres
      </motion.button>
    </motion.div>
  );
}
