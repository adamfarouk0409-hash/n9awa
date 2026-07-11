import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/blog";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Blog() {
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
            Conseils & Astuces
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Des articles pratiques pour vous aider à maintenir un intérieur propre et agréable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div
              key={article.title}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(38,120,209,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E5E7EB] group cursor-pointer"
              data-testid={`card-blog-${article.title.toLowerCase().replace(/ /g, "-").slice(0, 30)}`}
            >
              {/* Image area */}
              <div
                className={`h-52 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <span className="text-7xl relative z-10 drop-shadow-lg">{article.icon}</span>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-7">
                <h3 className="font-bold text-[#1F2937] text-lg mb-3 leading-snug group-hover:text-[#2678D1] transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{article.description}</p>
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-[#2678D1] text-sm font-semibold hover:gap-3 transition-all duration-200"
                  data-testid={`link-lire-plus-${article.category.toLowerCase()}`}
                >
                  Lire plus <ArrowRight size={15} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
