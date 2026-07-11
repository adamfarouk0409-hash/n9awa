import { motion } from "framer-motion";
import { MapPin, Clock, Star, CheckCircle, MessageCircle, Eye } from "lucide-react";
import { useLocation } from "wouter";
import type { Cleaner } from "@/data/searchData";

interface CleanerCardProps {
  cleaner: Cleaner;
  index: number;
}

export function CleanerCard({ cleaner, index }: CleanerCardProps) {
  const [, navigate] = useLocation();
  const availabilityColor: Record<string, string> = {
    "Temps plein": "bg-green-100 text-green-700",
    "Temps partiel": "bg-blue-100 text-blue-700",
    "Mission unique": "bg-amber-100 text-amber-700",
    "Week-end": "bg-purple-100 text-purple-700",
    "Disponible aujourd'hui": "bg-emerald-100 text-emerald-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(38,120,209,0.12)" }}
      className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cleaner.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm`}>
            {cleaner.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-[#1F2937] text-base truncate">{cleaner.name}</h3>
              {cleaner.verified && (
                <CheckCircle size={15} className="text-[#2678D1] flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(cleaner.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{cleaner.rating} ({cleaner.reviewCount})</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{cleaner.nationalityFlag} {cleaner.nationality}</span>
              <span>•</span>
              <span>{cleaner.age} ans</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${availabilityColor[cleaner.availability] ?? "bg-gray-100 text-gray-600"}`}>
            <Clock size={10} />
            {cleaner.availability}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EAF2F6] text-[#2678D1]">
            <MapPin size={10} />
            {cleaner.city}
          </span>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">
          {cleaner.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {cleaner.services.map((s) => (
            <span key={s} className="px-2.5 py-1 bg-[#EAF2F6] text-[#2678D1] text-xs rounded-lg font-medium">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div>
            <span className="text-xs text-gray-400">À partir de</span>
            <p className="font-bold text-[#1F2937] text-base">{cleaner.pricePerHour} MAD<span className="text-xs font-normal text-gray-400">/h</span></p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/cleaner/${cleaner.id}`)}
              className="flex items-center gap-1.5 border border-[#2678D1] text-[#2678D1] px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#EAF2F6] transition-colors"
            >
              <Eye size={12} />
              Voir le profil
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 bg-[#2678D1] text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#1F85C4] transition-colors"
            >
              <MessageCircle size={12} />
              Contacter
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
