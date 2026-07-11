import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/data/stats";

function AnimatedCounter({
  value,
  suffix,
  isFloat,
}: {
  value: number;
  suffix: string;
  isFloat?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, isFloat]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2678D1] to-[#1F85C4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-5xl lg:text-6xl font-bold font-heading mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isFloat={stat.isFloat}
                />
              </div>
              <p className="text-blue-100 font-medium text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
