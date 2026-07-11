import { CleanerCard } from "./CleanerCard";
import { JobCard } from "./JobCard";
import type { Cleaner, JobOffer } from "@/data/searchData";

interface ResultsGridProps {
  mode: "customer" | "cleaner";
  cleaners: Cleaner[];
  jobs: JobOffer[];
}

export function ResultsGrid({ mode, cleaners, jobs }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {mode === "customer"
        ? cleaners.map((c, i) => <CleanerCard key={c.id} cleaner={c} index={i} />)
        : jobs.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
    </div>
  );
}
