import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "@/data/gallery";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % galleryItems.length : null));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#1F2937] mb-4">Galerie</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {galleryItems.map((item, i) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLightbox(i)}
            className={`relative h-32 sm:h-40 rounded-xl bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2678D1]`}
            aria-label={`Voir photo ${item.label}`}
          >
            <span className="text-4xl">{item.icon}</span>
            <span className="text-white text-xs font-semibold drop-shadow">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg h-80 rounded-2xl bg-gradient-to-br ${galleryItems[lightbox].gradient} flex flex-col items-center justify-center gap-4 relative`}
            >
              <span className="text-7xl">{galleryItems[lightbox].icon}</span>
              <span className="text-white text-lg font-bold">{galleryItems[lightbox].label}</span>

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition"
                aria-label="Précédent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition"
                aria-label="Suivant"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
