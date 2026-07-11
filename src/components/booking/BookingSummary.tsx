import { motion } from "framer-motion";
import { CheckCircle, MapPin, Calendar, Clock, Star } from "lucide-react";
import type { Cleaner } from "@/data/cleaners";
import type { AddressData } from "./AddressForm";
import { ESTIMATED_HOURS } from "@/data/services";

interface BookingSummaryProps {
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-[#F3F4F6] last:border-0">
      <span className="text-sm text-gray-500 flex-shrink-0 mr-4">{label}</span>
      <span className="text-sm font-semibold text-[#1F2937] text-right">{value}</span>
    </div>
  );
}

export function BookingSummary({ cleaner, service, date, time, address }: BookingSummaryProps) {
  const total = cleaner.pricePerHour * ESTIMATED_HOURS;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-1">
        Récapitulatif de votre réservation
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Vérifiez les informations avant de confirmer
      </p>

      <div className="space-y-4">
        {/* Cleaner card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cleaner.gradient} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
          >
            {cleaner.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[#1F2937]">{cleaner.name}</h3>
              {cleaner.verified && (
                <CheckCircle size={15} className="text-[#2678D1]" />
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={12} /> {cleaner.city}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} fill="#F59E0B" className="text-amber-400" />
              <span className="text-xs font-semibold text-[#1F2937]">{cleaner.rating}</span>
              <span className="text-xs text-gray-400">({cleaner.reviewCount} avis)</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-[#2678D1]">{cleaner.pricePerHour}</p>
            <p className="text-xs text-gray-400">MAD / heure</p>
          </div>
        </div>

        {/* Booking details */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <h3 className="font-semibold text-[#1F2937] text-sm mb-2">Détails de la prestation</h3>
          <Row label="Service" value={service} />
          <Row
            label="Date"
            value={
              <span className="flex items-center gap-1.5 justify-end">
                <Calendar size={13} className="text-[#2678D1]" />
                {formatDate(date)}
              </span> as unknown as string
            }
          />
          <Row
            label="Heure"
            value={
              <span className="flex items-center gap-1.5 justify-end">
                <Clock size={13} className="text-[#2678D1]" />
                {time}
              </span> as unknown as string
            }
          />
          <Row
            label="Adresse"
            value={`${address.adresse}, ${address.quartier}, ${address.city}${address.etage ? ` – ${address.etage}` : ""}`}
          />
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <h3 className="font-semibold text-[#1F2937] text-sm mb-3">Estimation du coût</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{cleaner.pricePerHour} MAD × {ESTIMATED_HOURS} heures</span>
              <span className="text-[#1F2937] font-medium">{cleaner.pricePerHour * ESTIMATED_HOURS} MAD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Durée estimée</span>
              <span className="text-[#1F2937] font-medium">{ESTIMATED_HOURS} heures</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex justify-between items-center">
            <span className="font-bold text-[#1F2937]">Total estimé</span>
            <span className="text-2xl font-bold text-[#2678D1]">{total} MAD</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Le prix final sera confirmé après accord avec la prestataire.
          </p>
        </div>

        {/* Trust badges */}
        <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-4 flex flex-wrap gap-4">
          {[
            "Professionnelle vérifiée",
            "Paiement sécurisé",
            "Annulation gratuite jusqu'à 24h avant",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
