import { Home, Sparkles, Building2, Sun, Shirt, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceName =
  | "Ménage"
  | "Repassage"
  | "Vitres"
  | "Grand nettoyage"
  | "Cuisine"
  | "Bureaux";

export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const serviceCards: ServiceCard[] = [
  {
    icon: Home,
    title: "Ménage à domicile",
    description: "Un nettoyage complet de votre maison par des professionnelles expérimentées et vérifiées.",
  },
  {
    icon: Sparkles,
    title: "Grand nettoyage",
    description: "Nettoyage en profondeur pour les grandes occasions ou un départ sur de bonnes bases.",
  },
  {
    icon: Building2,
    title: "Nettoyage de bureaux",
    description: "Des espaces de travail propres et sains pour vous et vos collaborateurs.",
  },
  {
    icon: Sun,
    title: "Nettoyage des vitres",
    description: "Des vitres impeccables pour laisser entrer la lumière et profiter de la vue.",
  },
  {
    icon: Shirt,
    title: "Repassage",
    description: "Vos vêtements repassés avec soin par des mains expertes et attentionnées.",
  },
  {
    icon: Package,
    title: "Nettoyage après déménagement",
    description: "Remise en état complète après un déménagement pour un nouveau départ propre.",
  },
];

export const serviceIcons: Record<string, string> = {
  Ménage: "🏠",
  Repassage: "🧺",
  Vitres: "🪟",
  "Grand nettoyage": "🧹",
  Cuisine: "🍽️",
  Bureaux: "🏢",
};

export const serviceNames: ServiceName[] = [
  "Ménage",
  "Repassage",
  "Vitres",
  "Grand nettoyage",
  "Cuisine",
  "Bureaux",
];

export const availabilityOptions: string[] = [
  "Temps plein",
  "Temps partiel",
  "Mission unique",
  "Week-end",
  "Disponible aujourd'hui",
];

export const availabilityDisplayOptions: string[] = [
  "Temps plein",
  "Temps partiel",
  "Mission unique",
  "Week-end",
];

export interface SortOption {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { label: "Plus récent", value: "recent" },
  { label: "Meilleure note", value: "rating" },
  { label: "Prix croissant", value: "price_asc" },
  { label: "Prix décroissant", value: "price_desc" },
  { label: "Expérience", value: "experience" },
];

export const budgetRanges: string[] = [
  "Moins de 80",
  "80 – 120",
  "120 – 150",
  "Plus de 150",
];

export const ratingOptions: string[] = [
  "4.5 et plus",
  "4.0 et plus",
  "3.5 et plus",
];

export const experienceRanges: string[] = [
  "Moins de 2 ans",
  "2 – 5 ans",
  "5 – 10 ans",
  "Plus de 10 ans",
];

export const timeSlots: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const ESTIMATED_HOURS = 3;
