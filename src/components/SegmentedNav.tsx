"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScreenId } from "@/lib/screens";

export function SegmentedNav({
  items,
  active,
  onChange,
}: {
  items: { id: ScreenId; label: string; icon: LucideIcon }[];
  active: ScreenId;
  onChange: (id: ScreenId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Разделы платформы"
      className="inline-flex flex-wrap items-center gap-1 rounded-full border p-1.5 mx-auto"
      style={{ borderColor: "var(--line)", background: "var(--surface)", backdropFilter: "blur(14px)" }}
    >
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              isActive ? "text-[var(--paper)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="segmented-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--ink)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
