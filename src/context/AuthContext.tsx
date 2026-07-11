import { createContext, useContext, useEffect, useState } from "react";
import type { User, RegisterData } from "@/types/user";
import { authService } from "@/services/authService";
import { supabase } from "@/lib/supabase";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (data: RegisterData) => Promise<User>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const u = await authService.getCurrentUser();
        if (mounted) setUser(u);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    // Listen for Supabase auth changes so we can adopt Supabase sessions later.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sUser = session?.user ?? null;
      if (sUser) {
        // We don't yet link DB profiles here — provide a minimal mapping so UI can react to auth.
        setUser((current) =>
          current
            ? current
            : {
                id: sUser.id,
                prenom: "",
                nom: "",
                email: sUser.email ?? "",
                telephone: "",
                ville: "",
                role: "client",
                createdAt: new Date().toISOString(),
              }
        );
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      // unsubscribe listener when unmounting
      // listener might be undefined on older clients
      // @ts-ignore
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    // fire-and-forget sign out; keep UI responsive
    authService.logout().catch(() => {});
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    const u = await authService.register(data);
    setUser(u);
    return u;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
