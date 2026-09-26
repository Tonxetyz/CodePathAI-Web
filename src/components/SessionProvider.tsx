"use client";

import { createContext, useContext, useEffect, useState } from "react";

type DemoUser = { name: string; email: string };
type SessionCtx = {
  user: DemoUser | null;
  login: (user: DemoUser) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionCtx | null>(null);
const STORAGE_KEY = "codepathai-demo-session";

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ponytail: private-window/blocked storage is fine to ignore for a demo session
    }
  }, []);

  function login(next: DemoUser) {
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>{children}</SessionContext.Provider>
  );
}
