import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Testimonials() {
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
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de N9AWA.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(38,120,209,0.10)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-[20px] p-8 border border-[#E5E7EB] relative"
              data-testid={`card-testimonial-${t.name.toLowerCase().replace(/ /g, "-")}`}
            >
              <Quote
                size={32}
                className="text-[#2678D1]/15 absolute top-6 right-6"
                fill="currentColor"
              />
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" className="text-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-7 text-sm">"{t.review}"</p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
