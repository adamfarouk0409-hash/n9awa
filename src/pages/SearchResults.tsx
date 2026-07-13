import { useEffect, useMemo, useState } from "react";
import { useSearch } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchFilters } from "@/components/search/SearchFilters";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SortBar } from "@/components/search/SortBar";
import { ResultsGrid } from "@/components/search/ResultsGrid";
import { Pagination } from "@/components/search/Pagination";
import { EmptyState } from "@/components/search/EmptyState";
import { jobOffers } from "@/data/searchData";
import type { Availability, Cleaner } from "@/data/cleaners";
import { supabase } from "@/lib/supabase";

type CleanerRecord = Record<string, unknown>;

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      // fall back to comma splitting below
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const mapCleanerRecord = (record: CleanerRecord): Cleaner => {
  const name = typeof record.name === "string" ? record.name : "Professionnelle";
  const initials =
    typeof record.initials === "string"
      ? record.initials
      : name
          .split(" ")
          .map((part) => part[0] ?? "")
          .join("")
          .slice(0, 2)
          .toUpperCase();

  return {
    id: Number(record.id ?? 0),
    name,
    age: Number(record.age ?? 30),
    nationality: typeof record.nationality === "string" ? record.nationality : "Marocaine",
    nationalityFlag: typeof record.nationality_flag === "string" ? record.nationality_flag : "🇲🇦",
    city: typeof record.city === "string" ? record.city : "",
    experience: Number(record.experience ?? 0),
    rating: Number(record.rating ?? 0),
    reviewCount: Number(record.review_count ?? record.reviewCount ?? 0),
    availability: (record.availability as Availability) ?? "Disponible aujourd'hui",
    pricePerHour: Number(record.price_per_hour ?? record.pricePerHour ?? 80),
    services: toStringArray(record.services),
    description: typeof record.description === "string" ? record.description : "Professionnelle disponible",
    bio: typeof record.bio === "string" ? record.bio : "Professionnelle disponible",
    reviews: [],
    verified: Boolean(record.verified),
    initials,
    gradient: typeof record.gradient === "string" ? record.gradient : "from-blue-400 to-blue-600",
    headerGradient:
      typeof record.header_gradient === "string"
        ? record.header_gradient
        : typeof record.gradient === "string"
          ? record.gradient
          : "from-blue-400 to-blue-600",
  };
};

export default function SearchResults() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const rawMode = params.get("mode");
  const mode: "customer" | "cleaner" = rawMode === "cleaner" ? "cleaner" : "customer";
  const selectedCity = params.get("city")?.trim() || params.get("ville")?.trim() || "";
  const normalizedCity = selectedCity.toLowerCase();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(mode === "customer");

  const isCustomer = mode === "customer";
  const filteredCleaners = useMemo(() => {
    if (!normalizedCity) return cleaners;
    return cleaners.filter((cleaner) => cleaner.city.toLowerCase() === normalizedCity);
  }, [cleaners, normalizedCity]);

  const count = isCustomer ? filteredCleaners.length : jobOffers.length;
  const resultLabel = isCustomer ? "professionnelles trouvées" : "offres disponibles";
  const shouldShowEmpty = !loading && filteredCleaners.length === 0 && isCustomer;

  useEffect(() => {
    if (mode !== "customer") {
      setCleaners([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadCleaners = async () => {
      setLoading(true);

      const { data, error } = await supabase.from("cleaners").select("*").eq("is_active", true);

      if (!isMounted) return;

      if (error) {
        setCleaners([]);
        setLoading(false);
        return;
      }

      setCleaners((data ?? []).map(mapCleanerRecord));
      setLoading(false);
    };

    void loadCleaners();

    return () => {
      isMounted = false;
    };
  }, [mode, search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA]">
      <Navbar />

      <SearchHeader mode={mode} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchFilters mode={mode} onOpenMobileFilters={() => setMobileFiltersOpen(true)} />
        </div>

        <div className="flex gap-6">
          <FilterSidebar mobileOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />

          <div className="flex-1 min-w-0">
            <div className="mb-5">
              <SortBar count={shouldShowEmpty ? 0 : count} label={resultLabel} />
            </div>

            {loading ? (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                Chargement des professionnelles...
              </div>
            ) : shouldShowEmpty ? (
              <EmptyState onReset={() => undefined} />
            ) : (
              <>
                <ResultsGrid mode={mode} cleaners={filteredCleaners} jobs={jobOffers} />
                <Pagination total={count + 33} perPage={count || 1} />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
