import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-500">Tout ce que vous devez savoir avant de commencer.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-[#E5E7EB] rounded-[16px] px-6 overflow-hidden shadow-sm"
                data-testid={`accordion-faq-${i}`}
              >
                <AccordionTrigger className="text-left font-semibold text-[#1F2937] py-5 hover:no-underline hover:text-[#2678D1]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
