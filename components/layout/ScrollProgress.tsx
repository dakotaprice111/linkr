"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]"
      initial={{ scaleX: 0 }}
      style={{ transformOrigin: "left", scaleX: progress / 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    />
  );
}
