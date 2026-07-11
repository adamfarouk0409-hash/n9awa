export interface Stat {
  value: number;
  suffix: string;
  label: string;
  isFloat?: boolean;
}

export const stats: Stat[] = [
  { value: 250, suffix: "+", label: "Professionnelles" },
  { value: 1200, suffix: "+", label: "Clients satisfaits" },
  { value: 5000, suffix: "+", label: "Prestations réalisées" },
  { value: 4.9, suffix: "★", label: "Note moyenne", isFloat: true },
];
