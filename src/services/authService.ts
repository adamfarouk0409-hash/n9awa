import type { User, RegisterData } from "@/types/user";
import { supabase } from "@/lib/supabase";

function mapSupabaseUserToUser(su: any): User {
  const metadata = (su?.user_metadata ?? su?.user_metadata) ?? su?.raw_user_meta_data ?? {};
  const rawRole = (metadata?.role ?? "client") as User["role"];

  return {
    id: su.id,
    prenom: (metadata?.first_name ?? metadata?.prenom ?? "") as string,
    nom: (metadata?.last_name ?? metadata?.nom ?? "") as string,
    email: su.email ?? "",
    telephone: (metadata?.telephone ?? "") as string,
    ville: (metadata?.ville ?? "") as string,
    role: rawRole,
    createdAt: (su.created_at ?? new Date().toISOString()) as string,
  } as User;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message || "Erreur lors de la connexion.");
    }

    if (!user) {
      throw new Error("Impossible de récupérer l'utilisateur après la connexion.");
    }

    return mapSupabaseUserToUser(user);
  },

  async register(data: RegisterData): Promise<User> {
    const { prenom, nom, email, password, role, telephone, ville } = data as RegisterData & {
      password: string;
    };

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: prenom,
          last_name: nom,
          role,
          telephone,
          ville,
        },
      },
    });

    if (error) {
      throw new Error(error.message || "Erreur lors de la création du compte.");
    }

    const suUser = signUpData?.user ?? signUpData?.user;
    if (!suUser) {
      // Some projects require email confirmation; return best-effort info
      throw new Error("Inscription effectuée, mais aucun utilisateur retourné par Supabase.");
    }

    return mapSupabaseUserToUser(suUser);
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // Non-fatal for the app, but surface readable error if needed
      throw new Error(error.message || "Erreur lors de la déconnexion.");
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) return null;
    if (!user) return null;
    return mapSupabaseUserToUser(user);
  },

  // keep a simple forgotPassword wrapper if needed later
  async forgotPassword(_email: string): Promise<void> {
    // Supabase handles password reset via email; implement when backend endpoint is desired
    return Promise.resolve();
  },
};
