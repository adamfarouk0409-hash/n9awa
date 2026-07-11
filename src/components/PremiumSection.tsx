import { motion } from "framer-motion";
import { CheckCircle, Zap } from "lucide-react";
import { clientBenefits, proBenefits } from "@/data/premium";

interface PremiumCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  highlighted?: boolean;
  price: string;
}

function PremiumCard({ title, subtitle, benefits, highlighted, price }: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`relative rounded-[20px] p-10 flex flex-col ${
        highlighted
          ? "bg-[#2678D1] text-white shadow-2xl shadow-blue-200"
          : "bg-white border border-[#E5E7EB] text-[#1F2937] shadow-sm"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Zap size={12} /> Populaire
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? "text-white" : "text-[#1F2937]"}`}>
          {title}
        </h3>
        <p className={`text-sm ${highlighted ? "text-blue-100" : "text-gray-500"}`}>{subtitle}</p>
      </div>
      <div className={`text-4xl font-bold mb-8 ${highlighted ? "text-white" : "text-[#2678D1]"}`}>
        {price}
        <span className={`text-sm font-normal ml-1 ${highlighted ? "text-blue-100" : "text-gray-400"}`}>/mois</span>
      </div>
      <ul className="space-y-4 flex-1 mb-8">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3">
            <CheckCircle
              size={18}
              className={highlighted ? "text-blue-200" : "text-[#2678D1]"}
            />
            <span className={`text-sm font-medium ${highlighted ? "text-blue-50" : "text-[#1F2937]"}`}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-200 ${
          highlighted
            ? "bg-white text-[#2678D1] hover:shadow-lg"
            : "bg-[#2678D1] text-white hover:bg-[#1F85C4] hover:shadow-lg"
        }`}
        data-testid={`button-premium-${title.toLowerCase().replace(/ /g, "-")}`}
      >
        Devenir Premium
      </motion.button>
    </motion.div>
  );
}

export function PremiumSection() {
  return (
    <section className="py-24 bg-[#EAF2F6]/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Passez au Premium
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Débloquez des avantages exclusifs pour une expérience encore meilleure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <PremiumCard
            title="Premium Client"
            subtitle="Pour ceux qui veulent le meilleur service"
            benefits={clientBenefits}
            price="99 MAD"
          />
          <PremiumCard
            title="Premium Professionnelle"
            subtitle="Pour développer votre activité rapidement"
            benefits={proBenefits}
            highlighted
            price="149 MAD"
          />
        </div>
      </div>
    </section>
  );
}
