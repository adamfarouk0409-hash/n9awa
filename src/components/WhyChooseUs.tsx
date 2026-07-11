import { motion } from "framer-motion";
import { features } from "@/data/whyChooseUs";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Pourquoi choisir N9AWA ?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Une plateforme pensée pour la confiance, la qualité et la simplicité.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(38,120,209,0.10)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-5 p-7 bg-white rounded-[20px] border border-[#E5E7EB] group cursor-default"
            >
              <div className="w-12 h-12 bg-[#EAF2F6] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#2678D1] transition-colors duration-300">
                <feature.icon
                  size={22}
                  className="text-[#2678D1] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-[#1F2937] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
