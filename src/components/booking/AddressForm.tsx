import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cities } from "@/data/cities";

export interface AddressData {
  city: string;
  quartier: string;
  adresse: string;
  etage: string;
  instructions: string;
}

interface AddressFormProps {
  value: AddressData;
  onChange: (v: AddressData) => void;
  errors?: Partial<Record<keyof AddressData, string>>;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
        {label}
        {required && <span className="text-[#2678D1] ml-0.5">*</span>}
        {!required && <span className="text-gray-400 text-xs ml-1">(optionnel)</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-500"
        >
          ⚠ {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass = (hasError?: string) =>
  `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition ${
    hasError ? "border-red-400" : "border-[#E5E7EB]"
  }`;

export function AddressForm({ value, onChange, errors }: AddressFormProps) {
  const set = (key: keyof AddressData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-1">
        Adresse de l'intervention
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Renseignez l'adresse où la prestataire doit intervenir
      </p>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} className="text-[#2678D1]" />
          <span className="text-sm font-semibold text-[#1F2937]">Localisation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Ville" required error={errors?.city}>
            <select
              value={value.city}
              onChange={set("city")}
              className={inputClass(errors?.city) + " bg-white"}
            >
              <option value="">Choisissez une ville</option>
              {cities.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Quartier" required error={errors?.quartier}>
            <input
              type="text"
              placeholder="Ex: Maarif, Agdal..."
              value={value.quartier}
              onChange={set("quartier")}
              className={inputClass(errors?.quartier)}
            />
          </Field>
        </div>

        <Field label="Adresse complète" required error={errors?.adresse}>
          <input
            type="text"
            placeholder="Numéro, rue, résidence..."
            value={value.adresse}
            onChange={set("adresse")}
            className={inputClass(errors?.adresse)}
          />
        </Field>

        <Field label="Étage / Appartement" error={errors?.etage}>
          <input
            type="text"
            placeholder="Ex: 3ème étage, Appt 12"
            value={value.etage}
            onChange={set("etage")}
            className={inputClass()}
          />
        </Field>

        <div className="border-t border-[#E5E7EB] pt-5">
          <Field label="Informations complémentaires" error={errors?.instructions}>
            <textarea
              rows={4}
              placeholder="Appartement au 3ème étage. Merci d'apporter vos produits de nettoyage."
              value={value.instructions}
              onChange={set("instructions")}
              className={inputClass() + " resize-none"}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
