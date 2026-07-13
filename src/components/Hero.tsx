import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle, Star, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { cities } from "@/data/cities";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const n9awaLogo = "/n9awa_nobg.png";

export function Hero() {
  const [selectedCity, setSelectedCity] = useState("");
  const [mode, setMode] = useState<"client" | "pro">("client");
  const [, navigate] = useLocation();
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <section className="min-h-[90vh] pt-24 pb-16 bg-gradient-to-br from-white via-[#EAF2F6]/40 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#EAF2F6] text-[#2678D1] text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#2678D1] animate-pulse" />
              Disponible dans 20 villes au Maroc
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] leading-tight mb-6">
              Le ménage devient{" "}
              <span className="text-[#2678D1]">simple</span>{" "}
              avec N9AWA
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
              Trouvez une femme de ménage qualifiée ou trouvez des missions de ménage partout au Maroc.
            </p>

            {/* Search Card */}
            <div className="bg-white rounded-[20px] p-7 shadow-xl border border-[#E5E7EB]">
              {/* City selector */}
              <div className="relative mb-5">
                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-5 py-4 border border-[#E5E7EB] rounded-2xl text-left hover:border-[#2678D1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20"
                      data-testid="button-city-selector"
                    >
                      <span className={selectedCity ? "text-[#1F2937] font-medium" : "text-gray-400"}>
                        {selectedCity || "Choisissez une ville"}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] rounded-2xl border border-[#E5E7EB] bg-white p-0 shadow-xl"
                  >
                    <Command>
                      <CommandInput placeholder="Rechercher une ville..." className="h-11 border-0 focus:ring-0" />
                      <CommandList>
                        <CommandEmpty className="py-4 text-sm text-gray-500">Aucune ville trouvée.</CommandEmpty>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city.name);
                              setCityOpen(false);
                            }}
                            className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm text-[#1F2937] hover:bg-[#EAF2F6] data-[selected=true]:bg-[#EAF2F6] data-[selected=true]:text-[#1F2937]"
                            data-testid={`option-city-${city.name.toLowerCase()}`}
                          >
                            <span>{city.name}</span>
                            {selectedCity === city.name ? <Check size={16} className="text-[#2678D1]" /> : null}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Toggle buttons */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => setMode("client")}
                  className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all duration-200 border ${
                    mode === "client"
                      ? "bg-[#2678D1] text-white border-[#2678D1] shadow-md"
                      : "bg-white text-[#2678D1] border-[#2678D1] hover:bg-[#EAF2F6]"
                  }`}
                  data-testid="button-mode-client"
                >
                  👩 Je cherche une femme de ménage
                </button>
                <button
                  onClick={() => setMode("pro")}
                  className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all duration-200 border ${
                    mode === "pro"
                      ? "bg-[#2678D1] text-white border-[#2678D1] shadow-md"
                      : "bg-white text-[#2678D1] border-[#2678D1] hover:bg-[#EAF2F6]"
                  }`}
                  data-testid="button-mode-pro"
                >
                  🧹 Je cherche du ménage à faire
                </button>
              </div>

              {/* CTA button */}
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(38,120,209,0.35)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/search?mode=${mode === "client" ? "customer" : "cleaner"}`)}
                className="w-full py-4 bg-[#2678D1] hover:bg-[#1F85C4] text-white rounded-2xl text-lg font-bold transition-colors duration-200"
                data-testid="button-je-trouve"
              >
                JE TROUVE
              </motion.button>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                  <span>Professionnelles vérifiées</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>
                  <span>Plus de 1200 clients satisfaits</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative blobs */}
            <div className="absolute w-72 h-72 rounded-full bg-[#2678D1]/15 blur-3xl top-0 right-0" />
            <div className="absolute w-56 h-56 rounded-full bg-[#1F85C4]/10 blur-3xl bottom-0 left-0" />

            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-[#EAF2F6] to-[#dbeeff] rounded-full flex items-center justify-center shadow-2xl shadow-blue-100">
                <img
                  src={n9awaLogo}
                  alt="Professionnelle N9AWA"
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-xl"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-8 top-10 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Vérifiée</p>
                  <p className="text-sm font-bold text-[#1F2937]">Fatima B.</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 bottom-12 bg-white rounded-2xl shadow-lg px-4 py-3"
              >
                <div className="flex mb-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill="#F59E0B" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#1F2937]">1200+ clients</p>
                <p className="text-xs text-gray-400">satisfaits</p>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
