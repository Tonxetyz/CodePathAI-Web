"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HINTS = [
  "Привет! Готов написать свой первый API на Python?",
  "Выбери трек для старта!",
  "Промпт + чёткая задача = рабочий код с первого раза.",
  "Я слежу за твоим прогрессом. Не подведи Окто!",
];

export function OctoMascot({
  size = 260,
  showSpeech = true,
  className = "",
}: {
  size?: number;
  showSpeech?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const svg = svgRef.current;
      const wrap = wrapRef.current;
      if (!svg || !wrap) return;

      const pupils = svg.querySelectorAll<SVGCircleElement>(".octo-pupil");
      pupils.forEach((p) => {
        const r = p.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(3, Math.hypot(dx, dy) / 60);
        const ang = Math.atan2(dy, dx);
        p.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
      });

      const wr = wrap.getBoundingClientRect();
      const wcx = wr.left + wr.width / 2;
      const wcy = wr.top + wr.height / 2;
      const nx = (e.clientX - wcx) / (window.innerWidth / 2);
      const ny = (e.clientY - wcy) / (window.innerHeight / 2);
      setTilt({ x: Math.max(-1, Math.min(1, nx)) * 6, y: Math.max(-1, Math.min(1, ny)) * -4 });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!showSpeech) return;
    const id = setInterval(() => setHintIndex((i) => (i + 1) % HINTS.length), 4200);
    return () => clearInterval(id);
  }, [showSpeech]);

  return (
    <div ref={wrapRef} className={`relative inline-block ${className}`}>
      {showSpeech && (
        <div className="absolute -top-4 left-1/2 z-10 w-max max-w-[260px] -translate-x-1/2 -translate-y-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={hintIndex}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
              className="glass relative rounded-2xl px-4 py-3 text-sm font-medium text-[var(--ink)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              {HINTS[hintIndex]}
              <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[var(--line)] bg-[var(--card-bg)]" />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <motion.div
        animate={{ rotate: tilt.x, y: tilt.y }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 260 300"
          width={size}
          height={(size * 300) / 260}
          xmlns="http://www.w3.org/2000/svg"
          className="octo-wrap"
          style={{ filter: "drop-shadow(0 24px 60px var(--glow))", cursor: "pointer" }}
        >
          <defs>
            <radialGradient id="octoHead" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#c9a8ff" />
              <stop offset="55%" stopColor="var(--violet)" />
              <stop offset="100%" stopColor="var(--violet-2)" />
            </radialGradient>
            <linearGradient id="octoTent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--violet)" />
              <stop offset="100%" stopColor="var(--violet-2)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <g className="octo-tentacle t1">
            <path d="M95 175 C80 210, 60 210, 55 245 C52 265, 65 275, 60 292" stroke="url(#octoTent)" strokeWidth="18" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-tentacle t6">
            <path d="M165 175 C180 210, 200 210, 205 245 C208 265, 195 275, 200 292" stroke="url(#octoTent)" strokeWidth="18" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-tentacle t2">
            <path d="M110 185 C104 220, 88 225, 90 258 C91 275, 102 280, 98 296" stroke="url(#octoTent)" strokeWidth="16" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-tentacle t5">
            <path d="M150 185 C156 220, 172 225, 170 258 C169 275, 158 280, 162 296" stroke="url(#octoTent)" strokeWidth="16" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-tentacle t3">
            <path d="M125 190 C122 225, 112 235, 118 265 C121 280, 130 282, 128 298" stroke="url(#octoTent)" strokeWidth="14" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-tentacle t4">
            <path d="M135 190 C138 225, 148 235, 142 265 C139 280, 130 282, 132 298" stroke="url(#octoTent)" strokeWidth="14" strokeLinecap="round" fill="none" />
          </g>
          <g className="octo-head-group">
            <ellipse cx="130" cy="120" rx="78" ry="70" fill="url(#octoHead)" />
            <line x1="130" y1="52" x2="130" y2="30" stroke="var(--violet)" strokeWidth="3" strokeLinecap="round" />
            <circle className="octo-chip-dot" cx="130" cy="26" r="6" fill="#c9a8ff" />
            <ellipse cx="98" cy="110" rx="24" ry="28" fill="var(--paper)" />
            <ellipse cx="162" cy="110" rx="24" ry="28" fill="var(--paper)" />
            <circle className="octo-pupil" cx="102" cy="116" r="11" fill="var(--ink)" />
            <circle className="octo-pupil" cx="166" cy="116" r="11" fill="var(--ink)" />
            <circle cx="98" cy="111" r="4" fill="var(--paper)" />
            <circle cx="162" cy="111" r="4" fill="var(--paper)" />
            <path d="M112 148 Q130 158 148 148" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
          </g>
          <style>{`
            .octo-tentacle { animation: octo-wiggle 4.5s ease-in-out infinite; transform-origin: top center; }
            .octo-tentacle.t2 { animation-delay: .12s; } .octo-tentacle.t3 { animation-delay: .24s; }
            .octo-tentacle.t4 { animation-delay: .06s; } .octo-tentacle.t5 { animation-delay: .18s; } .octo-tentacle.t6 { animation-delay: .3s; }
            .octo-wrap:hover .octo-tentacle { animation-duration: 1.3s; }
            .octo-head-group { animation: octo-bob 3.6s ease-in-out infinite; }
            .octo-wrap:hover .octo-head-group { animation-duration: 1.3s; }
            .octo-chip-dot { animation: octo-pulse 2.2s ease-in-out infinite; }
            .octo-pupil { transition: transform .12s linear; }
            @keyframes octo-wiggle { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(3deg); } }
            @keyframes octo-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
            @keyframes octo-pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
            @media (prefers-reduced-motion: reduce) {
              .octo-tentacle, .octo-head-group, .octo-chip-dot { animation: none !important; }
            }
          `}</style>
        </svg>
      </motion.div>
    </div>
  );
}
