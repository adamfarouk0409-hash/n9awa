import { Facebook, Instagram, Linkedin } from "lucide-react";

const n9awaLogo = "/n9awa_nobg.png";

const columns = [
  {
    title: "Entreprise",
    links: ["À propos", "Services", "Premium", "Contact"],
  },
  {
    title: "Villes",
    links: ["Casablanca", "Rabat", "Marrakech", "Agadir", "Tanger"],
  },
  {
    title: "Support",
    links: ["FAQ", "Conditions d'utilisation", "Politique de confidentialité"],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1F2937] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={n9awaLogo} alt="N9AWA" className="h-14 w-auto mb-4 brightness-200" />
            <p className="text-gray-400 text-sm leading-relaxed">
              La plateforme de ménage de confiance au Maroc. Qualité, sécurité et simplicité.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 N9AWA. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#2678D1] transition-colors duration-200"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#2678D1] transition-colors duration-200"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#2678D1] transition-colors duration-200"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
