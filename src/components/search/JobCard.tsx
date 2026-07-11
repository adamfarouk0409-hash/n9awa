import { motion } from "framer-motion";
import { MapPin, Clock, Banknote, Calendar, ArrowRight } from "lucide-react";
import type { JobOffer } from "@/data/searchData";

interface JobCardProps {
  job: JobOffer;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const scheduleColor: Record<string, string> = {
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
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.gradient} flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm`}>
            {job.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#1F2937] text-base mb-1 truncate">{job.customerName}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span>{job.nationalityFlag} {job.nationality}</span>
              <span>•</span>
              <span>{job.age} ans</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={10} />
              {job.city}
            </div>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1">
            <Calendar size={10} />
            {job.publishedAt}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2678D1] text-white">
            🧹 {job.service}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${scheduleColor[job.schedule] ?? "bg-gray-100 text-gray-600"}`}>
            <Clock size={10} />
            {job.schedule}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
          {job.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-1.5">
            <Banknote size={16} className="text-[#2678D1]" />
            <div>
              <span className="text-xs text-gray-400">Budget</span>
              <p className="font-bold text-[#1F2937] text-base leading-none">{job.budget} MAD</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-[#2678D1] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#1F85C4] transition-colors"
          >
            Voir l'annonce
            <ArrowRight size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
