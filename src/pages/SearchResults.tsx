import { useState } from "react";
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
import { cleaners, jobOffers } from "@/data/searchData";

export default function SearchResults() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const rawMode = params.get("mode");
  const mode: "customer" | "cleaner" = rawMode === "cleaner" ? "cleaner" : "customer";

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const isCustomer = mode === "customer";
  const count = isCustomer ? cleaners.length : jobOffers.length;
  const resultLabel = isCustomer ? "professionnelles trouvées" : "offres disponibles";

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
              <SortBar count={showEmpty ? 0 : count} label={resultLabel} />
            </div>

            {showEmpty ? (
              <EmptyState onReset={() => setShowEmpty(false)} />
            ) : (
              <>
                <ResultsGrid mode={mode} cleaners={cleaners} jobs={jobOffers} />
                <Pagination total={count + 33} perPage={count} />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
