import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { featuredCleaners } from "@/data/cleaners";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCleaners() {
  return (
    <section className="py-24 bg-[#EAF2F6]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Nos Femmes de Ménage
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Des professionnelles vérifiées, expérimentées et prêtes à intervenir chez vous.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredCleaners.map((cleaner) => (
            <motion.div
              key={cleaner.name}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(38,120,209,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E5E7EB] group"
              data-testid={`card-cleaner-${cleaner.name.toLowerCase().replace(/ /g, "-")}`}
            >
              {/* Header with avatar */}
              <div className={`bg-gradient-to-br ${cleaner.headerGradient} p-8 flex flex-col items-center`}>
                <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-4">
                  {cleaner.initials}
                </div>
                <h3 className="text-white font-bold text-xl">{cleaner.name}</h3>
                <p className="text-white/80 text-sm mt-1">{cleaner.city}</p>
              </div>

              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: Math.round(cleaner.rating) }).map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({cleaner.rating})</span>
                  {cleaner.verified && (
                    <div className="ml-auto flex items-center gap-1 bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <BadgeCheck size={12} />
                      Vérifiée
                    </div>
                  )}
                </div>

                {/* Experience */}
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold text-[#1F2937]">{cleaner.experience} ans</span>{" "}
                  d'expérience
                </p>

                {/* Services tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cleaner.services.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-[#EAF2F6] text-[#2678D1] font-medium px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#2678D1] hover:bg-[#1F85C4] text-white rounded-xl text-sm font-semibold transition-colors duration-200"
                  data-testid={`button-voir-profil-${cleaner.name.toLowerCase().replace(/ /g, "-")}`}
                >
                  Voir le profil
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
