export interface BlogArticle {
  category: string;
  title: string;
  description: string;
  gradient: string;
  icon: string;
}

export const articles: BlogArticle[] = [
  {
    category: "Conseils",
    title: "10 conseils pour garder votre maison propre",
    description:
      "Découvrez nos astuces simples et efficaces pour maintenir un intérieur impeccable au quotidien sans effort.",
    gradient: "from-blue-400 via-[#2678D1] to-blue-700",
    icon: "🏠",
  },
  {
    category: "Guides",
    title: "Comment réussir un grand nettoyage ?",
    description:
      "Tout ce que vous devez savoir pour organiser et réaliser un grand nettoyage complet de votre logement.",
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    icon: "✨",
  },
  {
    category: "Astuces",
    title: "Les erreurs à éviter pendant le ménage",
    description:
      "Ces erreurs courantes vous font perdre du temps et de l'argent. Apprenez à les éviter pour un ménage parfait.",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    icon: "💡",
  },
];
