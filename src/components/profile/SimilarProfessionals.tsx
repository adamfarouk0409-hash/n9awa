import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { cleaners } from "@/data/searchData";
import { CleanerCard } from "@/components/search/CleanerCard";
import type { Cleaner } from "@/data/searchData";

interface SimilarProfessionalsProps {
  currentId: number;
}

export function SimilarProfessionals({ currentId }: SimilarProfessionalsProps) {
  const [, navigate] = useLocation();
  const similar = cleaners.filter((c: Cleaner) => c.id !== currentId).slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-10"
    >
      <h2 className="text-xl font-bold text-[#1F2937] mb-5">Professionnelles similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {similar.map((c: Cleaner, i: number) => (
          <div key={c.id} onClick={() => navigate(`/cleaner/${c.id}`)} className="cursor-pointer">
            <CleanerCard cleaner={c} index={i} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
