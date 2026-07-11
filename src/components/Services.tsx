import { motion } from "framer-motion";
import { serviceCards } from "@/data/services";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Nos Services
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Des solutions de nettoyage professionnelles pour chaque besoin, partout au Maroc.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCards.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(38,120,209,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-[20px] p-8 border border-[#E5E7EB] cursor-pointer group"
              data-testid={`card-service-${service.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <div className="mb-6">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-14 h-14 bg-[#EAF2F6] rounded-2xl flex items-center justify-center group-hover:bg-[#2678D1] transition-colors duration-300"
                >
                  <service.icon
                    size={26}
                    className="text-[#2678D1] group-hover:text-white transition-colors duration-300"
                  />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
