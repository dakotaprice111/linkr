"use client";

export function FloatingOrbs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden
    >
      {/* Dark grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Neon orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-60 blur-[80px] animate-[drift_20s_ease-in-out_infinite_alternate]"
        style={{
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50 blur-[70px] animate-[drift_25s_ease-in-out_infinite_alternate]"
        style={{
          right: "15%",
          top: "40%",
          background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-55 blur-[65px] animate-[drift_22s_ease-in-out_infinite_alternate]"
        style={{
          left: "40%",
          bottom: "10%",
          background: "radial-gradient(circle, #F43F5E 0%, transparent 70%)",
          animationDelay: "-10s",
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-40 blur-[60px] animate-[drift_18s_ease-in-out_infinite_alternate]"
        style={{
          right: "30%",
          bottom: "30%",
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          animationDelay: "-7s",
        }}
      />
    </div>
  );
}
