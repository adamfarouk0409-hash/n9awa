import { motion } from "framer-motion";
import { CheckCircle, MapPin, Star, Clock, Briefcase, Zap } from "lucide-react";
import type { Cleaner } from "@/data/searchData";

interface ProfileHeaderProps {
  cleaner: Cleaner;
}

export function ProfileHeader({ cleaner }: ProfileHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-[#E5E7EB] pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative flex-shrink-0">
            <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${cleaner.gradient} flex items-center justify-center text-white font-bold text-3xl shadow-lg`}>
              {cleaner.initials}
            </div>
            {cleaner.verified && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow">
                <CheckCircle size={20} className="text-[#2678D1]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">{cleaner.name}</h1>
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {cleaner.availability}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
              <span>{cleaner.nationalityFlag} {cleaner.nationality}, {cleaner.age} ans</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1"><MapPin size={13} />{cleaner.city}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1"><Briefcase size={13} />{cleaner.experience} ans d'expérience</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className={i < Math.floor(cleaner.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                ))}
                <span className="font-bold text-[#1F2937] ml-1">{cleaner.rating}</span>
                <span className="text-gray-400 text-sm">({cleaner.reviewCount} avis)</span>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Zap size={13} className="text-amber-500" />
                Répond en moins de 30 min
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock size={13} className="text-[#2678D1]" />
                450 missions réalisées
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
