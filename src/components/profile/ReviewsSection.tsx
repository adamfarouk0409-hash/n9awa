import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Cleaner } from "@/data/searchData";

interface ReviewsSectionProps {
  cleaner: Cleaner;
}

export function ReviewsSection({ cleaner }: ReviewsSectionProps) {
  const { reviews, rating, reviewCount } = cleaner;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#1F2937]">Avis des clients</h2>
        <div className="flex items-center gap-1.5">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-[#1F2937] text-sm">{rating}</span>
          <span className="text-gray-400 text-sm">· {reviewCount} avis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review, i) => (
          <motion.div
            key={`${review.name}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {review.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1F2937] text-sm truncate">{review.name}</p>
                <p className="text-xs text-gray-400">{review.city} · {review.date}</p>
              </div>
              <div className="flex gap-0.5 flex-shrink-0">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
