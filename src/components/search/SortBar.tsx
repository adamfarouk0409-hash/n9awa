import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/data/services";

interface SortBarProps {
  count: number;
  label: string;
}

export function SortBar({ count, label }: SortBarProps) {
  const [active, setActive] = useState("recent");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        <span className="font-bold text-[#1F2937] text-base">{count}</span> {label}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <ArrowUpDown size={12} />
          Trier par
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {sortOptions.map((opt) => (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                active === opt.value
                  ? "bg-[#2678D1] text-white shadow-sm"
                  : "bg-white border border-[#E5E7EB] text-gray-600 hover:border-[#2678D1] hover:text-[#2678D1]"
              }`}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
