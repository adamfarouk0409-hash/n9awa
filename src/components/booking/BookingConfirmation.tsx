import { motion } from "framer-motion";
import { Check, Home, Calendar, Clock, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import type { Cleaner } from "@/data/cleaners";
import type { AddressData } from "./AddressForm";

interface BookingConfirmationProps {
  cleaner: Cleaner;
  service: string;
  date: string;
  time: string;
  address: AddressData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingConfirmation({ cleaner, service, date, time, address }: BookingConfirmationProps) {
  const [, navigate] = useLocation();

  const details = [
    { icon: <Calendar size={15} className="text-[#2678D1]" />, label: "Date", value: formatDate(date) },
    { icon: <Clock size={15} className="text-[#2678D1]" />, label: "Heure", value: time },
    { icon: <MapPin size={15} className="text-[#2678D1]" />, label: "Adresse", value: `${address.adresse}, ${address.quartier}, ${address.city}` },
  ];

  return (
    <div className="flex flex-col items-center text-center py-6">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <Check size={44} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-[#1F2937] mb-3"
      >
        Réservation confirmée !
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 mb-8 max-w-md"
      >
        Votre demande a été envoyée avec succès à{" "}
        <span className="font-semibold text-[#1F2937]">{cleaner.name}</span>. Elle vous
        contactera très prochainement pour confirmer les détails.
      </motion.p>

      {/* Booking recap card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 text-left mb-6"
      >
        {/* Cleaner row */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#F3F4F6] mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cleaner.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
          >
            {cleaner.initials}
          </div>
          <div>
            <p className="font-bold text-[#1F2937]">{cleaner.name}</p>
            <p className="text-xs text-gray-400">{service}</p>
          </div>
        </div>

        <div className="space-y-3">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-3">
              <div className="mt-0.5">{d.icon}</div>
              <div>
                <p className="text-xs text-gray-400">{d.label}</p>
                <p className="text-sm font-semibold text-[#1F2937]">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="flex-1 flex items-center justify-center gap-2 bg-[#2678D1] hover:bg-[#1F85C4] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-blue-100"
        >
          <Home size={15} />
          Retour à l'accueil
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-[#2678D1] text-[#2678D1] py-3.5 rounded-xl font-semibold text-sm hover:bg-[#EAF2F6] transition-colors"
        >
          Voir mes réservations
        </motion.button>
      </motion.div>
    </div>
  );
}
