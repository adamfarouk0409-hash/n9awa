export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  review: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Samira El Idrissi",
    city: "Casablanca",
    rating: 5,
    review:
      "J'utilise N9AWA depuis 6 mois et je suis absolument ravie. Fatima vient chaque semaine et ma maison n'a jamais été aussi propre. La réservation est simple et le paiement sécurisé me rassure.",
    initials: "SI",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Youssef Amrani",
    city: "Rabat",
    rating: 5,
    review:
      "Service impeccable ! J'ai trouvé une professionnelle qualifiée en moins de 10 minutes. Le grand nettoyage de mon appartement a été réalisé parfaitement. Je recommande vivement N9AWA.",
    initials: "YA",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Nadia Benkirane",
    city: "Marrakech",
    rating: 5,
    review:
      "Enfin une application marocaine qui marche vraiment bien ! L'interface est belle, les professionnelles sont vérifiées et le support client répond rapidement. N9AWA a changé ma vie.",
    initials: "NB",
    color: "from-emerald-400 to-teal-500",
  },
];
