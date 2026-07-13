import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

const n9awaLogo = "/n9awa_nobg.png";

export function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Contact", href: "/contact" },
    ...(isLoading || !isAuthenticated
      ? []
      : [
          { label: "Réservations", href: "/reservations" },
          { label: "Notifications", href: "/notifications" },
        ]),
    ...(user?.role === "cleaner" && isAuthenticated
      ? [{ label: "Tableau de bord", href: "/dashboard" }]
      : []),
  ];

  const showUserMenu = !isLoading && isAuthenticated && !!user;
  const showAuthButtons = !isLoading && !isAuthenticated;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const initials = user
    ? `${user.prenom[0]}${user.nom[0]}`.toUpperCase()
    : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center"
            data-testid="link-logo"
          >
            <img
              src={n9awaLogo}
              alt="N9AWA Logo"
              style={{ height: 64, width: 64, transform: "scale(1.5)", transformOrigin: "left center" }}
            />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#1F2937] font-medium hover:text-[#2678D1] transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}

            {showUserMenu ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2.5 pl-3 pr-3 py-1.5 rounded-full border border-[#E5E7EB] hover:border-[#2678D1] transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2678D1] to-[#1F85C4] flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">
                    {user.prenom}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-[#E5E7EB] shadow-xl py-1.5 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-[#F3F4F6] mb-1">
                        <p className="text-xs font-bold text-[#1F2937]">
                          {user.prenom} {user.nom}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-xs bg-[#EAF2F6] text-[#2678D1] px-2 py-0.5 rounded-full font-medium">
                          {user.role === "client" ? "Client" : "Professionnelle"}
                        </span>
                      </div>

                      {[
                        { icon: <User size={14} />, label: "Mon profil", action: () => { setDropdownOpen(false); navigate("/profil"); } },
                        { icon: <User size={14} />, label: "Paramètres", action: () => { setDropdownOpen(false); navigate("/parametres"); } },
                        ...(user?.role === "cleaner"
                          ? [{ icon: <LayoutDashboard size={14} />, label: "Tableau de bord", action: () => { setDropdownOpen(false); navigate("/dashboard"); } }]
                          : []),
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#1F2937] hover:bg-[#F9FAFB] transition-colors text-left"
                        >
                          <span className="text-gray-400">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}

                      <div className="border-t border-[#F3F4F6] mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut size={14} />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : showAuthButtons ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="border border-[#2678D1] text-[#2678D1] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#EAF2F6] transition-colors duration-200"
                  data-testid="link-connexion"
                >
                  Connexion
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#2678D1] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#1F85C4] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  data-testid="link-inscription"
                >
                  Inscription
                </button>
              </>
            ) : null}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-[#1F2937] hover:bg-[#EAF2F6]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-[#E5E7EB] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#1F2937] font-medium hover:text-[#2678D1] transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {showUserMenu ? (
                <div className="border-t border-[#E5E7EB] pt-4 space-y-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2678D1] to-[#1F85C4] flex items-center justify-center text-white text-sm font-bold">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1F2937]">
                        {user.prenom} {user.nom}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition"
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { navigate("/login"); setMobileOpen(false); }}
                    className="flex-1 text-center border border-[#2678D1] text-[#2678D1] px-4 py-2.5 rounded-full text-sm font-semibold"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => { navigate("/register"); setMobileOpen(false); }}
                    className="flex-1 text-center bg-[#2678D1] text-white px-4 py-2.5 rounded-full text-sm font-semibold"
                  >
                    Inscription
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
