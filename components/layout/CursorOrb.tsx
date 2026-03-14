"use client";

import { useEffect, useState } from "react";

export function CursorOrb() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className="fixed w-4 h-4 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          background: "radial-gradient(circle, rgba(0,212,255,0.8) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)",
          boxShadow: "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(139,92,246,0.3)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
        aria-hidden
      />
      {/* Trailing fade */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)",
          transition: "left 0.2s ease-out, top 0.2s ease-out",
        }}
        aria-hidden
      />
    </>
  );
}
