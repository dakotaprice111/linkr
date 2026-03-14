"use client";

import { motion } from "framer-motion";

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "neon" | "glass";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function NeonButton({
  children,
  href,
  onClick,
  variant = "neon",
  className = "",
  type = "button",
  disabled = false,
}: NeonButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]";
  const styles =
    variant === "neon"
      ? "btn-neon text-white"
      : "btn-glass text-white/90 hover:text-white";

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${styles} ${className}`}
        whileHover={{ boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
      whileHover={disabled ? undefined : { boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
