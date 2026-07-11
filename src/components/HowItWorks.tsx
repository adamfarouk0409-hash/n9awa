import { motion } from "framer-motion";
import { clientSteps, proSteps } from "@/data/howItWorks";

function StepList({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="flex gap-4 items-start"
        >
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg"
              style={{ backgroundColor: color }}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-0.5 h-12 mt-1"
                style={{ borderLeft: `2px dashed ${color}40` }}
              />
            )}
          </div>
          <div className="pt-2 pb-8">
            <p className="font-semibold text-[#1F2937] text-lg">{step}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-[#EAF2F6]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Trouver ou proposer des services de ménage n'a jamais été aussi simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[20px] p-10 shadow-sm border border-[#E5E7EB]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#EAF2F6] rounded-xl flex items-center justify-center text-xl">
                🏠
              </div>
              <h3 className="text-2xl font-bold text-[#2678D1]">Pour les Clients</h3>
            </div>
            <StepList steps={clientSteps} color="#2678D1" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-[20px] p-10 shadow-sm border border-[#E5E7EB]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#EAF2F6] rounded-xl flex items-center justify-center text-xl">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-[#1F85C4]">Pour les Professionnelles</h3>
            </div>
            <StepList steps={proSteps} color="#1F85C4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
