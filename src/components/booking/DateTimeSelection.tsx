import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import { timeSlots } from "@/data/services";

interface DateTimeSelectionProps {
  date: string;
  time: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
  errors?: { date?: string; time?: string };
}

function todayString() {
  return new Date().toISOString().split("T")[0];
}

export function DateTimeSelection({
  date,
  time,
  onDateChange,
  onTimeChange,
  errors,
}: DateTimeSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-1">
        Choisissez une date et une heure
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Sélectionnez le jour et le créneau horaire qui vous conviennent
      </p>

      {/* Date picker */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 mb-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2937] mb-3">
          <CalendarDays size={16} className="text-[#2678D1]" />
          Date d'intervention
        </label>
        <input
          type="date"
          min={todayString()}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2678D1]/20 focus:border-[#2678D1] transition ${
            errors?.date ? "border-red-400" : "border-[#E5E7EB]"
          }`}
        />
        {errors?.date && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-red-500"
          >
            ⚠ {errors.date}
          </motion.p>
        )}
      </div>

      {/* Time slots */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2937] mb-3">
          <Clock size={16} className="text-[#2678D1]" />
          Heure de début
        </label>
        <div className="grid grid-cols-4 gap-2.5">
          {timeSlots.map((slot) => {
            const selected = time === slot;
            return (
              <motion.button
                key={slot}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => onTimeChange(slot)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                  selected
                    ? "bg-[#2678D1] border-[#2678D1] text-white shadow-md"
                    : "bg-white border-[#E5E7EB] text-gray-600 hover:border-[#2678D1] hover:text-[#2678D1]"
                }`}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
        {errors?.time && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-red-500"
          >
            ⚠ {errors.time}
          </motion.p>
        )}
      </div>
    </div>
  );
}
