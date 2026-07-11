export type Availability =
  | "Temps plein"
  | "Temps partiel"
  | "Mission unique"
  | "Week-end"
  | "Disponible aujourd'hui";

export interface Review {
  name: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  initials: string;
  gradient: string;
}

export interface Cleaner {
  id: number;
  name: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  city: string;
  experience: number;
  rating: number;
  reviewCount: number;
  availability: Availability;
  pricePerHour: number;
  services: string[];
  description: string;
  bio: string;
  reviews: Review[];
  verified: boolean;
  initials: string;
  gradient: string;
  headerGradient: string;
}

export interface FeaturedCleaner extends Cleaner {}

export const cleaners: Cleaner[] = [
  {
    id: 1,
    name: "Fatima Benali",
    age: 34,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Casablanca",
    experience: 6,
    rating: 4.9,
    reviewCount: 128,
    availability: "Temps plein",
    pricePerHour: 120,
    services: ["Ménage", "Repassage", "Grand nettoyage"],
    description: "Professionnelle avec plus de 6 ans d'expérience spécialisée dans le nettoyage de maisons et appartements.",
    bio: "Bonjour, je m'appelle Fatima Benali. Depuis plus de 6 ans, j'accompagne des familles et des professionnels dans leurs besoins de nettoyage. Sérieuse, ponctuelle et organisée, je mets un point d'honneur à offrir un service de qualité et à respecter les attentes de chaque client. Je travaille avec des produits efficaces et respectueux de l'environnement, et j'adapte toujours mon intervention à vos préférences.",
    reviews: [
      { name: "Youssef Amrani", city: "Casablanca", rating: 5, date: "Juin 2026", text: "Très professionnelle et très ponctuelle. Ma maison était impeccable après son passage. Je recommande sans hésiter.", initials: "YA", gradient: "from-blue-400 to-blue-600" },
      { name: "Siham Benkirane", city: "Rabat", rating: 5, date: "Mai 2026", text: "Excellente prestation ! Elle a nettoyé ma cuisine et ma salle de bain en un temps record. Résultat impeccable.", initials: "SB", gradient: "from-rose-400 to-rose-600" },
      { name: "Omar Tahiri", city: "Casablanca", rating: 5, date: "Avril 2026", text: "Je fais appel à Fatima tous les mois. Sérieuse, discrète et efficace. Je la recommande chaleureusement.", initials: "OT", gradient: "from-emerald-400 to-emerald-600" },
      { name: "Nadia Chraibi", city: "Casablanca", rating: 4, date: "Mars 2026", text: "Très bonne prestation. Quelques petits détails auraient pu être mieux finis mais dans l'ensemble très satisfaite.", initials: "NC", gradient: "from-amber-400 to-amber-600" },
      { name: "Rachid El Idrissi", city: "Tanger", rating: 5, date: "Février 2026", text: "Notre appartement était dans un état difficile après des travaux. Elle a fait un grand nettoyage parfait. Merci !", initials: "RE", gradient: "from-purple-400 to-purple-600" },
      { name: "Lamia Bouziane", city: "Agadir", rating: 5, date: "Janvier 2026", text: "Ponctuelle, soigneuse et agréable. Elle fait attention à tous les détails et respecte parfaitement ma maison.", initials: "LB", gradient: "from-sky-400 to-sky-600" },
    ],
    verified: true,
    initials: "FB",
    gradient: "from-blue-400 to-blue-600",
    headerGradient: "from-rose-400 to-pink-500",
  },
  {
    id: 2,
    name: "Khadija Mrabet",
    age: 28,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Rabat",
    experience: 4,
    rating: 4.7,
    reviewCount: 87,
    availability: "Temps partiel",
    pricePerHour: 100,
    services: ["Ménage", "Vitres", "Cuisine"],
    description: "Sérieuse et ponctuelle, je m'occupe du ménage avec soin et discrétion dans votre domicile.",
    bio: "Bonjour, je suis Khadija Mrabet, professionnelle du ménage depuis 4 ans. Passionnée par le travail bien fait, j'apporte soin et rigueur dans chaque mission. Discrète et fiable, je m'intègre facilement à votre environnement pour que vous retrouviez un intérieur propre et agréable à chaque fois.",
    reviews: [
      { name: "Karim Bensouda", city: "Rabat", rating: 5, date: "Juin 2026", text: "Khadija est très sérieuse. Les vitres n'ont jamais été aussi propres. Parfaite pour un entretien régulier.", initials: "KB", gradient: "from-purple-400 to-purple-600" },
      { name: "Amina El Fassi", city: "Salé", rating: 5, date: "Mai 2026", text: "Je recommande fortement Khadija. Elle est douce avec mes affaires et très minutieuse dans son travail.", initials: "AE", gradient: "from-teal-400 to-teal-600" },
      { name: "Mehdi Alami", city: "Rabat", rating: 4, date: "Avril 2026", text: "Bonne prestation globale. Elle arrive toujours à l'heure et fait son travail avec soin.", initials: "MA", gradient: "from-sky-400 to-sky-600" },
      { name: "Sara Benbrahim", city: "Rabat", rating: 5, date: "Mars 2026", text: "Très contente de Khadija ! Elle s'occupe de ma cuisine avec beaucoup d'attention. Je renouvelle sans hésiter.", initials: "SB", gradient: "from-rose-400 to-rose-600" },
      { name: "Hassan Idrissi", city: "Kénitra", rating: 5, date: "Février 2026", text: "Professionnelle et efficace. Elle comprend rapidement ce qu'on attend d'elle et livre un résultat excellent.", initials: "HI", gradient: "from-amber-400 to-amber-600" },
      { name: "Loubna Tahir", city: "Rabat", rating: 4, date: "Janvier 2026", text: "Très agréable et travailleuse. Mon appartement était propre de A à Z après son passage.", initials: "LT", gradient: "from-emerald-400 to-emerald-600" },
    ],
    verified: true,
    initials: "KM",
    gradient: "from-purple-400 to-purple-600",
    headerGradient: "from-violet-400 to-purple-500",
  },
  {
    id: 3,
    name: "Aicha Tazi",
    age: 41,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Marrakech",
    experience: 10,
    rating: 5.0,
    reviewCount: 203,
    availability: "Disponible aujourd'hui",
    pricePerHour: 150,
    services: ["Ménage", "Repassage", "Grand nettoyage", "Vitres"],
    description: "Expérimentée et fiable, avec plus de 10 ans dans le secteur, je garantis un travail impeccable.",
    bio: "Je suis Aicha Tazi, avec plus de 10 ans d'expérience dans le nettoyage résidentiel et professionnel. Ma priorité : votre satisfaction. Habituée aux grandes surfaces, villas et appartements, je propose un service complet et minutieux. Mes clients me font confiance depuis des années et je le mérite chaque jour.",
    reviews: [
      { name: "Yassine Kettani", city: "Marrakech", rating: 5, date: "Juin 2026", text: "Aicha est tout simplement la meilleure. Après 10 ans dans le domaine ça se voit vraiment dans son travail.", initials: "YK", gradient: "from-emerald-400 to-emerald-600" },
      { name: "Fatine Ouali", city: "Marrakech", rating: 5, date: "Mai 2026", text: "Notre villa était parfaitement nettoyée pour une fête. Aicha a tout géré avec calme et efficacité.", initials: "FO", gradient: "from-blue-400 to-blue-600" },
      { name: "Driss Benali", city: "Agadir", rating: 5, date: "Avril 2026", text: "Venue pour un grand nettoyage après travaux. Résultat impeccable, elle travaille vite et bien.", initials: "DB", gradient: "from-rose-400 to-rose-600" },
      { name: "Zineb Hajoui", city: "Marrakech", rating: 5, date: "Mars 2026", text: "J'ai recommandé Aicha à toute ma famille. Elle est fiable, discrète et toujours disponible.", initials: "ZH", gradient: "from-amber-400 to-amber-600" },
      { name: "Soufiane Berrada", city: "Casablanca", rating: 5, date: "Février 2026", text: "Elle fait le repassage comme une professionnelle. Chemises parfaitement pliées, rien à redire.", initials: "SB", gradient: "from-purple-400 to-purple-600" },
      { name: "Imane Fassi", city: "Marrakech", rating: 5, date: "Janvier 2026", text: "10 sur 10. Aicha est ponctuelle, efficace et très agréable. On se sent en confiance avec elle.", initials: "IF", gradient: "from-sky-400 to-sky-600" },
    ],
    verified: true,
    initials: "AT",
    gradient: "from-emerald-400 to-emerald-600",
    headerGradient: "from-teal-400 to-emerald-500",
  },
  {
    id: 4,
    name: "Naima Lahlou",
    age: 31,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Fès",
    experience: 5,
    rating: 4.8,
    reviewCount: 64,
    availability: "Week-end",
    pricePerHour: 90,
    services: ["Ménage", "Cuisine", "Repassage"],
    description: "Disponible les week-ends pour l'entretien complet de votre maison. Références disponibles.",
    bio: "Bonjour, je m'appelle Naima Lahlou. Disponible les week-ends et sur missions ponctuelles, je suis une professionnelle consciencieuse qui aime le travail bien fait. Chaque maison mérite une attention particulière, et c'est ce que j'apporte à chacune de mes interventions.",
    reviews: [
      { name: "Adil Benkirane", city: "Fès", rating: 5, date: "Juin 2026", text: "Naima vient chez nous chaque week-end. Elle est devenue indispensable. Fiable et très sérieuse.", initials: "AB", gradient: "from-rose-400 to-rose-600" },
      { name: "Meryem Idrissi", city: "Fès", rating: 5, date: "Mai 2026", text: "Très satisfaite de Naima. Elle fait la cuisine et le ménage avec le même soin. Top !", initials: "MI", gradient: "from-teal-400 to-teal-600" },
      { name: "Khalid Slimani", city: "Meknès", rating: 5, date: "Avril 2026", text: "Ponctuelle, discrète et efficace. Exactement ce que je cherchais pour les week-ends.", initials: "KS", gradient: "from-sky-400 to-sky-600" },
      { name: "Hayat Amraoui", city: "Fès", rating: 4, date: "Mars 2026", text: "Très bonne prestation dans l'ensemble. Elle est attentive aux détails et fait son travail consciencieusement.", initials: "HA", gradient: "from-amber-400 to-amber-600" },
      { name: "Youssef Chraibi", city: "Fès", rating: 5, date: "Février 2026", text: "Naima nous a vraiment facilité la vie. Elle prend en charge tout l'entretien de la maison le week-end.", initials: "YC", gradient: "from-purple-400 to-purple-600" },
      { name: "Asma Benali", city: "Fès", rating: 5, date: "Janvier 2026", text: "Super expérience. Elle respecte notre maison et nos affaires. Je la recommande vivement.", initials: "AB", gradient: "from-blue-400 to-blue-600" },
    ],
    verified: true,
    initials: "NL",
    gradient: "from-rose-400 to-rose-600",
    headerGradient: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    name: "Soukaina Filali",
    age: 26,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Agadir",
    experience: 3,
    rating: 4.6,
    reviewCount: 42,
    availability: "Temps plein",
    pricePerHour: 80,
    services: ["Ménage", "Vitres", "Bureaux"],
    description: "Jeune professionnelle dynamique, spécialisée dans le nettoyage de bureaux et espaces commerciaux.",
    bio: "Je suis Soukaina Filali, jeune professionnelle dynamique spécialisée dans l'entretien de bureaux et espaces commerciaux. Réactive et organisée, je m'adapte rapidement à vos horaires et contraintes. Mon objectif : vous offrir un espace de travail propre et motivant.",
    reviews: [
      { name: "Ismail Bennani", city: "Agadir", rating: 5, date: "Juin 2026", text: "Soukaina entretient notre bureau depuis 6 mois. Toujours impeccable, réactive et fiable. Très contente.", initials: "IB", gradient: "from-amber-400 to-amber-600" },
      { name: "Sana Alaoui", city: "Agadir", rating: 4, date: "Mai 2026", text: "Sérieuse et efficace. Elle nettoie les vitres de notre showroom à la perfection. Résultat brillant.", initials: "SA", gradient: "from-blue-400 to-blue-600" },
      { name: "Hamid Tazi", city: "Tiznit", rating: 5, date: "Avril 2026", text: "Très bonne prestation. Soukaina est dynamique et travaille rapidement. Je recommande pour les bureaux.", initials: "HT", gradient: "from-teal-400 to-teal-600" },
      { name: "Rania Berrada", city: "Agadir", rating: 5, date: "Mars 2026", text: "Parfaite pour l'entretien hebdomadaire de nos locaux. Toujours à l'heure et très professionnelle.", initials: "RB", gradient: "from-sky-400 to-sky-600" },
      { name: "Tarik Ouali", city: "Agadir", rating: 4, date: "Février 2026", text: "Bon travail dans l'ensemble. Quelques détails à améliorer mais reste une bonne professionnelle.", initials: "TO", gradient: "from-emerald-400 to-emerald-600" },
      { name: "Leila Filali", city: "Agadir", rating: 5, date: "Janvier 2026", text: "Soukaina est une vraie professionnelle. Nos bureaux n'ont jamais été aussi propres. Merci !", initials: "LF", gradient: "from-rose-400 to-rose-600" },
    ],
    verified: false,
    initials: "SF",
    gradient: "from-amber-400 to-amber-600",
    headerGradient: "from-sky-400 to-blue-500",
  },
  {
    id: 6,
    name: "Zineb Hassani",
    age: 37,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Tanger",
    experience: 8,
    rating: 4.9,
    reviewCount: 156,
    availability: "Temps partiel",
    pricePerHour: 130,
    services: ["Ménage", "Grand nettoyage", "Repassage", "Cuisine"],
    description: "8 ans d'expérience dans des villas et appartements de standing. Excellentes références.",
    bio: "Bonjour, je suis Zineb Hassani. Avec 8 ans d'expérience auprès de familles et particuliers exigeants, je propose un service de ménage haut de gamme. Mes références parlent pour moi. Je travaille avec professionnalisme, discrétion et efficacité.",
    reviews: [
      { name: "Mehdi Bennani", city: "Tanger", rating: 5, date: "Juin 2026", text: "Zineb travaille dans notre villa depuis 3 ans. Elle est irréprochable. Discrétion et efficacité au rendez-vous.", initials: "MB", gradient: "from-sky-400 to-sky-600" },
      { name: "Sofia El Fassi", city: "Tanger", rating: 5, date: "Mai 2026", text: "La meilleure que j'aie eue. Elle fait le grand nettoyage chaque trimestre et le résultat est toujours parfait.", initials: "SE", gradient: "from-rose-400 to-rose-600" },
      { name: "Anass Chraibi", city: "Tétouan", rating: 5, date: "Avril 2026", text: "Zineb est venue pour un grand nettoyage. Qualité de travail remarquable. Je la rappellerai certainement.", initials: "AC", gradient: "from-purple-400 to-purple-600" },
      { name: "Nour Benali", city: "Tanger", rating: 5, date: "Mars 2026", text: "Son repassage est parfait. Chemises, robes, pantalons... tout est impeccable. Très satisfaite.", initials: "NB", gradient: "from-teal-400 to-teal-600" },
      { name: "Samir Idrissi", city: "Tanger", rating: 4, date: "Février 2026", text: "Bonne expérience avec Zineb. Professionnelle et organisée, elle sait gérer les grandes surfaces.", initials: "SI", gradient: "from-amber-400 to-amber-600" },
      { name: "Kawtar Alaoui", city: "Tanger", rating: 5, date: "Janvier 2026", text: "Zineb est une perle rare. Fiable, honnête et très compétente. Je la recommande à tous mes proches.", initials: "KA", gradient: "from-blue-400 to-blue-600" },
    ],
    verified: true,
    initials: "ZH",
    gradient: "from-sky-400 to-sky-600",
    headerGradient: "from-fuchsia-400 to-pink-500",
  },
  {
    id: 7,
    name: "Loubna Ouali",
    age: 45,
    nationality: "Marocaine",
    nationalityFlag: "🇲🇦",
    city: "Meknès",
    experience: 12,
    rating: 4.8,
    reviewCount: 178,
    availability: "Temps plein",
    pricePerHour: 110,
    services: ["Ménage", "Repassage", "Grand nettoyage"],
    description: "12 ans d'expérience au service de familles marocaines et expatriées. Discrète et digne de confiance.",
    bio: "Je m'appelle Loubna Ouali. Forte de 12 ans d'expérience au service de familles marocaines et expatriées, je suis reconnue pour mon sérieux, ma discrétion et ma fiabilité. Je traite chaque maison avec le même soin que si c'était la mienne. Mes clients renouvellent régulièrement leur confiance, ce qui est ma plus belle récompense.",
    reviews: [
      { name: "Pierre Lefebvre", city: "Meknès", rating: 5, date: "Juin 2026", text: "Loubna travaille pour nous depuis 5 ans. Elle est irremplaçable. Fiable, discrète et très compétente.", initials: "PL", gradient: "from-teal-400 to-teal-600" },
      { name: "Fatima Ziani", city: "Meknès", rating: 5, date: "Mai 2026", text: "Une femme en or. Elle connaît notre maison comme la sienne et prend tout en charge avec sérieux.", initials: "FZ", gradient: "from-blue-400 to-blue-600" },
      { name: "Ahmed Lahlou", city: "Fès", rating: 5, date: "Avril 2026", text: "Venue pour un grand nettoyage de printemps. Résultat exceptionnel. Elle travaille vite et bien.", initials: "AL", gradient: "from-purple-400 to-purple-600" },
      { name: "Claire Martin", city: "Meknès", rating: 4, date: "Mars 2026", text: "Très professionnelle. Le repassage est particulièrement soigné. Nous sommes très contents de Loubna.", initials: "CM", gradient: "from-rose-400 to-rose-600" },
      { name: "Hamid Bensalah", city: "Meknès", rating: 5, date: "Février 2026", text: "Loubna mérite 6 étoiles. Toujours disponible, toujours souriante et toujours efficace.", initials: "HB", gradient: "from-amber-400 to-amber-600" },
      { name: "Noura El Alami", city: "Meknès", rating: 5, date: "Janvier 2026", text: "Après 12 ans de métier, ça se voit dans chaque geste. Ma maison n'a jamais été aussi propre.", initials: "NA", gradient: "from-sky-400 to-sky-600" },
    ],
    verified: true,
    initials: "LO",
    gradient: "from-teal-400 to-teal-600",
    headerGradient: "from-teal-400 to-cyan-500",
  },
  {
    id: 8,
    name: "Samira Benkirane",
    age: 33,
    nationality: "Algérienne",
    nationalityFlag: "🇩🇿",
    city: "Casablanca",
    experience: 7,
    rating: 4.7,
    reviewCount: 95,
    availability: "Mission unique",
    pricePerHour: 120,
    services: ["Grand nettoyage", "Vitres", "Bureaux"],
    description: "Spécialiste du grand nettoyage et remise en état. Idéale pour fin de bail ou après déménagement.",
    bio: "Je suis Samira Benkirane, spécialiste du grand nettoyage et de la remise en état depuis 7 ans. Je suis la personne qu'il vous faut pour un déménagement, une fin de bail ou un nettoyage en profondeur après travaux. Je travaille avec des équipements professionnels pour des résultats irréprochables.",
    reviews: [
      { name: "Kamal Bouzid", city: "Casablanca", rating: 5, date: "Juin 2026", text: "Samira a fait la remise en état de notre appartement pour la fin de bail. Propriétaire bluffé. Caution récupérée !", initials: "KB", gradient: "from-violet-400 to-violet-600" },
      { name: "Dalila Oubraham", city: "Casablanca", rating: 5, date: "Mai 2026", text: "Grand nettoyage après travaux de peinture. Elle a tout géré seule avec efficacité. Parfait.", initials: "DO", gradient: "from-blue-400 to-blue-600" },
      { name: "Réda Hafidi", city: "Casablanca", rating: 4, date: "Avril 2026", text: "Très bon travail sur les vitres de notre bureau. Elles brillent comme jamais. Je recommande.", initials: "RH", gradient: "from-teal-400 to-teal-600" },
      { name: "Nadia Amara", city: "Mohammedia", rating: 5, date: "Mars 2026", text: "Samira est venue pour notre déménagement. Appartement rendu dans un état parfait. Merci !", initials: "NA", gradient: "from-emerald-400 to-emerald-600" },
      { name: "Yassin Cherif", city: "Casablanca", rating: 5, date: "Février 2026", text: "Excellente spécialiste du grand nettoyage. Elle utilise de bons produits et livre un résultat impeccable.", initials: "YC", gradient: "from-rose-400 to-rose-600" },
      { name: "Imane Boudjemaa", city: "Casablanca", rating: 4, date: "Janvier 2026", text: "Bonne expérience. Elle est rigoureuse et fait attention à ne rien abîmer. Je la recommande.", initials: "IB", gradient: "from-amber-400 to-amber-600" },
    ],
    verified: true,
    initials: "SB",
    gradient: "from-violet-400 to-violet-600",
    headerGradient: "from-violet-400 to-purple-600",
  },
  {
    id: 9,
    name: "Houda Chakir",
    age: 29,
    nationality: "Tunisienne",
    nationalityFlag: "🇹🇳",
    city: "Rabat",
    experience: 4,
    rating: 4.5,
    reviewCount: 38,
    availability: "Temps partiel",
    pricePerHour: 95,
    services: ["Ménage", "Cuisine", "Vitres"],
    description: "Méticuleuse et organisée, j'assure un nettoyage complet adapté à vos besoins et votre emploi du temps.",
    bio: "Bonjour, je suis Houda Chakir. Originaire de Tunisie, je vis à Rabat depuis 5 ans et je mets mes 4 ans d'expérience au service des familles et particuliers. Méticuleuse, organisée et souriante, j'adapte toujours mes interventions à votre rythme de vie pour un résultat qui vous satisfait pleinement.",
    reviews: [
      { name: "Amal Benali", city: "Rabat", rating: 5, date: "Juin 2026", text: "Houda est très minutieuse et très agréable. Elle s'adapte parfaitement à nos habitudes. Très contente !", initials: "AB", gradient: "from-pink-400 to-pink-600" },
      { name: "Jalal Tazi", city: "Salé", rating: 4, date: "Mai 2026", text: "Bonne prestation. Houda est organisée et fait son travail sérieusement. Je ferai de nouveau appel à elle.", initials: "JT", gradient: "from-blue-400 to-blue-600" },
      { name: "Samia Khattabi", city: "Rabat", rating: 5, date: "Avril 2026", text: "Très satisfaite. Elle cuisine et nettoie avec le même sérieux. Parfaite pour une aide quotidienne.", initials: "SK", gradient: "from-teal-400 to-teal-600" },
      { name: "Omar Cherkaoui", city: "Rabat", rating: 4, date: "Mars 2026", text: "Ponctuelle et efficace. Les vitres et le ménage étaient impeccables après son passage.", initials: "OC", gradient: "from-amber-400 to-amber-600" },
      { name: "Rim Bensalah", city: "Rabat", rating: 5, date: "Février 2026", text: "Houda est douce et professionnelle. Elle respecte notre espace et fait attention à nos affaires.", initials: "RB", gradient: "from-emerald-400 to-emerald-600" },
      { name: "Karim El Harti", city: "Temara", rating: 4, date: "Janvier 2026", text: "Très bonne expérience dans l'ensemble. Elle est fiable et s'intègre facilement dans notre routine.", initials: "KE", gradient: "from-purple-400 to-purple-600" },
    ],
    verified: false,
    initials: "HC",
    gradient: "from-pink-400 to-pink-600",
    headerGradient: "from-pink-400 to-fuchsia-500",
  },
];

export const featuredCleaners: FeaturedCleaner[] = cleaners.slice(0, 6);
