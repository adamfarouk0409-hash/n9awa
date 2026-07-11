import { CheckCircle, Star, CreditCard, Clock, Phone, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: CheckCircle,
    title: "Professionnelles vérifiées",
    description: "Chaque prestataire est vérifiée, formée et évaluée par notre équipe.",
  },
  {
    icon: Star,
    title: "Qualité garantie",
    description: "Satisfaction garantie ou remboursement. Votre confort est notre priorité.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description: "Paiements 100% sécurisés. Vos données sont protégées en tout temps.",
  },
  {
    icon: Clock,
    title: "Intervention rapide",
    description: "Trouvez une professionnelle disponible dans votre quartier en quelques minutes.",
  },
  {
    icon: Phone,
    title: "Support client",
    description: "Notre équipe est disponible 7j/7 pour vous accompagner et répondre à vos questions.",
  },
  {
    icon: Shield,
    title: "Service fiable",
    description: "Des milliers de clients nous font confiance chaque mois partout au Maroc.",
  },
];
