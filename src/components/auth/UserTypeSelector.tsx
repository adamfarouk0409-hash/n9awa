import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { UserRole } from "@/types/user";

interface UserTypeSelectorProps {
  onSelect: (role: UserRole) => void;
}

const OPTIONS = [
  {
    role: "client" as UserRole,
    icon: "👤",
    label: "Client",
    desc: "Je cherche une femme de ménage.",
  },
  {
    role: "cleaner" as UserRole,
    icon: "🧹",
    label: "Professionnelle",
    desc: "Je souhaite proposer mes services.",
  },
];

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-1">Créer un compte</h2>
      <p className="text-sm text-gray-500 mb-7">
        Quel type de compte souhaitez-vous créer ?
      </p>

      <div className="space-y-4">
        {OPTIONS.map(({ role, icon, label, desc }) => (
          <motion.button
            key={role}
            type="button"
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(38,120,209,0.12)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(role)}
            className="w-full flex items-center gap-4 p-5 bg-white border-2 border-[#E5E7EB] rounded-2xl text-left hover:border-[#2678D1] transition-all group"
          >
            <div className="w-14 h-14 bg-[#EAF2F6] rounded-xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-[#2678D1]/10 transition-colors">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1F2937] group-hover:text-[#2678D1] transition-colors">
                {label}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
            </div>
            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-[#2678D1] transition-colors flex-shrink-0"
            />
          </motion.button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="text-[#2678D1] font-semibold hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
