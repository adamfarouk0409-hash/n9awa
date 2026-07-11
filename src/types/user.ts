export type UserRole = "client" | "professionnelle" | "admin";

export interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  role: UserRole;
  createdAt: string;
  experience?: number;
  services?: string[];
  availability?: string;
  biography?: string;
}

export interface RegisterData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  password: string;
  ville: string;
  role: UserRole;
  experience?: number;
  services?: string[];
  availability?: string;
  biography?: string;
}
