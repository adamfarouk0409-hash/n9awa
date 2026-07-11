import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Service" },
  { label: "Date & heure" },
  { label: "Adresse" },
  { label: "Récapitulatif" },
  { label: "Confirmation" },
];

interface BookingStepperProps {
  step: number;
}

export function BookingStepper({ step }: BookingStepperProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm px-6 py-5">
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const num = i + 1;
          const isDone = num < step;
          const isCurrent = num === step;

          return (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor: isDone
                      ? "#10B981"
                      : isCurrent
                      ? "#2678D1"
                      : "#F3F4F6",
                    borderColor: isDone
                      ? "#10B981"
                      : isCurrent
                      ? "#2678D1"
                      : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                >
                  {isDone ? (
                    <Check size={16} className="text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className={`text-sm font-bold ${
                        isCurrent ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {num}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium hidden sm:block whitespace-nowrap ${
                    isCurrent
                      ? "text-[#2678D1]"
                      : isDone
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-2 mb-4 sm:mb-0 relative h-0.5 bg-[#E5E7EB] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: isDone ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
