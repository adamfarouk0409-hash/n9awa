import { motion } from "framer-motion";
import { Briefcase, Award, ThumbsUp, ShieldCheck } from "lucide-react";
import type { Cleaner } from "@/data/searchData";

interface ExperienceSectionProps {
  cleaner: Cleaner;
}

export function ExperienceSection({ cleaner }: ExperienceSectionProps) {
  const stats = [
    {
      icon: <Briefcase size={22} className="text-[#2678D1]" />,
      value: `${cleaner.experience} ans`,
      label: "d'expérience",
      bg: "bg-blue-50",
    },
    {
      icon: <Award size={22} className="text-amber-500" />,
      value: "450",
      label: "missions réalisées",
      bg: "bg-amber-50",
    },
    {
      icon: <ThumbsUp size={22} className="text-emerald-500" />,
      value: "98%",
      label: "taux de satisfaction",
      bg: "bg-emerald-50",
    },
    {
      icon: <ShieldCheck size={22} className="text-purple-500" />,
      value: "Vérifiée",
      label: "professionnelle",
      bg: "bg-purple-50",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-4">En chiffres</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 flex flex-col items-center text-center`}>
            <div className="mb-2">{stat.icon}</div>
            <p className="text-xl font-bold text-[#1F2937]">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
