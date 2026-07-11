export interface GalleryItem {
  label: string;
  gradient: string;
  icon: string;
}

export const galleryItems: GalleryItem[] = [
  { label: "Salon", gradient: "from-sky-300 to-sky-500", icon: "🛋️" },
  { label: "Cuisine", gradient: "from-amber-300 to-amber-500", icon: "🍳" },
  { label: "Salle de bain", gradient: "from-teal-300 to-teal-500", icon: "🚿" },
  { label: "Chambre", gradient: "from-purple-300 to-purple-500", icon: "🛏️" },
  { label: "Linge", gradient: "from-rose-300 to-rose-500", icon: "🧺" },
  { label: "Bureau", gradient: "from-slate-300 to-slate-500", icon: "🏢" },
];
