import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#2678D1] via-[#1F85C4] to-[#1a6db5]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Prêt à trouver votre prochaine solution de ménage ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Rejoignez plus de 1 200 clients satisfaits et trouvez la professionnelle idéale près de chez vous.
          </p>
          <motion.a
            href="#"
            whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-white text-[#2678D1] px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transition-shadow duration-300"
            data-testid="button-cta-je-trouve"
          >
            JE TROUVE
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
