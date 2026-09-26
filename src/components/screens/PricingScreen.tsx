"use client";

import { Pricing } from "@/components/ui/pricing";
import { useToast } from "@/components/ToastProvider";

export function PricingScreen() {
  const toast = useToast();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="mx-auto max-w-[60ch] text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--violet)]">Тарифы</span>
        <h2 className="mt-2 text-[clamp(1.7rem,2.8vw,2.35rem)] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
          Выбери темп обучения
        </h2>
      </div>

      <Pricing
        onSelect={(plan) => {
          if (plan.price === 0) {
            toast(`Тариф «${plan.name}» подключён. Открой раздел «Вход / Регистрация», чтобы начать.`, "success");
          } else {
            toast(`Тариф «${plan.name}» выбран — ${plan.price.toLocaleString("ru-RU")} ₽ / мес`, "success");
          }
        }}
      />
    </div>
  );
}
