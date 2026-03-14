"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { end: 12500, suffix: "", label: "Total Products" },
  { end: 12847, suffix: "", label: "Active Creators" },
  { end: 94, suffix: "", label: "Countries Reached" },
  { end: 2300000, suffix: "", label: "Total Payouts ($)", format: (n: number) => `$${(n / 1e6).toFixed(1)}M` },
];

function useCountUp(end: number, duration: number, active: boolean, format?: (n: number) => string) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, active]);
  return format ? format(count) : count.toLocaleString();
}

function StatItem({
  end,
  label,
  duration = 2000,
  active,
  format,
}: {
  end: number;
  label: string;
  duration?: number;
  active: boolean;
  format?: (n: number) => string;
}) {
  const value = useCountUp(end, duration, active, format);
  return (
    <div className="text-center px-6 py-4">
      <div className="font-display text-3xl md:text-4xl font-bold text-[var(--accent-cyan)]">
        {value}
      </div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto glass rounded-2xl border border-white/10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <StatItem
              key={s.label}
              end={s.end}
              label={s.label}
              active={inView}
              format={(s as { format?: (n: number) => string }).format}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
