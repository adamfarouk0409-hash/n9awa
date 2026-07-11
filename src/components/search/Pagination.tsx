import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  perPage: number;
}

export function Pagination({ total, perPage }: PaginationProps) {
  const [current, setCurrent] = useState(1);
  const pages = Math.ceil(total / perPage);

  const getPages = () => {
    if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, "...", pages];
    if (current >= pages - 2) return [1, "...", pages - 3, pages - 2, pages - 1, pages];
    return [1, "...", current - 1, current, current + 1, "...", pages];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <motion.button
        whileTap={{ scale: 0.92 }}
        disabled={current === 1}
        onClick={() => setCurrent((p) => Math.max(1, p - 1))}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E5E7EB] text-gray-500 hover:border-[#2678D1] hover:text-[#2678D1] disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.92 }}
            onClick={() => setCurrent(page as number)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
              current === page
                ? "bg-[#2678D1] text-white shadow-sm"
                : "border border-[#E5E7EB] text-gray-600 hover:border-[#2678D1] hover:text-[#2678D1]"
            }`}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        whileTap={{ scale: 0.92 }}
        disabled={current === pages}
        onClick={() => setCurrent((p) => Math.min(pages, p + 1))}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E5E7EB] text-gray-500 hover:border-[#2678D1] hover:text-[#2678D1] disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
}
