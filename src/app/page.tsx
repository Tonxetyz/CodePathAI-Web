"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, CreditCard, LogIn, MonitorDown } from "lucide-react";
import { Velaris } from "@/components/ui/velaris";
import { SegmentedNav } from "@/components/SegmentedNav";
import { ToastProvider } from "@/components/ToastProvider";
import { SessionProvider, useSession } from "@/components/SessionProvider";
import { AboutScreen } from "@/components/screens/AboutScreen";
import { PricingScreen } from "@/components/screens/PricingScreen";
import { AuthScreen } from "@/components/screens/AuthScreen";
import { DownloadScreen } from "@/components/screens/DownloadScreen";
import type { ScreenId } from "@/lib/screens";

const NAV_ITEMS: { id: ScreenId; label: string; icon: typeof Compass }[] = [
  { id: "about", label: "О платформе", icon: Compass },
  { id: "pricing", label: "Тарифы", icon: CreditCard },
  { id: "auth", label: "Вход / Регистрация", icon: LogIn },
  { id: "download", label: "Скачать", icon: MonitorDown },
];

function HeaderAvatar() {
  const { user } = useSession();
  if (!user) return null;
  return (
    <div
      className="w-9 h-9 rounded-full grid place-items-center font-bold text-sm flex-none"
      style={{ background: "var(--violet)", color: "var(--paper)" }}
      title={user.email}
    >
      {user.name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<ScreenId>("about");

  return (
    <div className="min-h-screen">
      <Velaris />
      <header className="sticky top-0 z-40 border-b" style={{ background: "color-mix(in srgb, var(--paper) 72%, transparent)", backdropFilter: "blur(14px)", borderColor: "var(--line)" }}>
        <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-2.5 font-extrabold text-[1.05rem] whitespace-nowrap">
            <span
              className="w-8 h-8 rounded-[9px] grid place-items-center font-mono text-xs font-bold flex-none"
              style={{ background: "var(--violet)", color: "var(--paper)" }}
            >
              CP
            </span>
            CodePath AI
          </div>
          <HeaderAvatar />
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-6 pt-8">
        <div className="mb-10 flex justify-center overflow-x-auto">
          <SegmentedNav items={NAV_ITEMS} active={screen} onChange={setScreen} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
          >
            {screen === "about" && <AboutScreen onGoPricing={() => setScreen("pricing")} />}
            {screen === "pricing" && <PricingScreen />}
            {screen === "auth" && <AuthScreen />}
            {screen === "download" && <DownloadScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="max-w-[1180px] mx-auto px-6 py-9 mt-10 border-t flex flex-wrap items-center justify-between gap-4 text-sm" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
        <span className="font-mono text-xs">CodePath AI © 2026</span>
        <span>Учись кодить в связке с нейросетями</span>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </SessionProvider>
  );
}
