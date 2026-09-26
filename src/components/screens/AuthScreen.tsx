"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OctoMascot } from "@/components/ui/octo-mascot";
import { AuthCard } from "@/components/ui/auth-card";
import { useSession } from "@/components/SessionProvider";
import { useToast } from "@/components/ToastProvider";

export function AuthScreen() {
  const { user, login, logout } = useSession();
  const toast = useToast();

  if (user) {
    return (
      <div className="mx-auto max-w-[440px] py-10 text-center">
        <OctoMascot size={160} showSpeech={false} className="mx-auto" />
        <h2 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">Привет, {user.name}!</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Ты вошёл как {user.email}. Сессия сохранена локально для демо-режима.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            toast("Ты вышел из аккаунта", "info");
          }}
          className="mt-6"
        >
          <LogOut size={16} /> Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="mb-7 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--violet)]">
          Вход / Регистрация
        </span>
        <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)]">Стань AI-оператором</h2>
      </div>
      <AuthCard
        onAuthenticated={(u) => {
          login(u);
          toast(`Добро пожаловать, ${u.name}!`, "success");
        }}
      />
    </div>
  );
}
