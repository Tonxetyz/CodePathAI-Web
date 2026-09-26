"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Period = "monthly" | "annual";
type Plan = {
  id: string;
  name: string;
  monthly: number;
  annualMonthly: number;
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    annualMonthly: 0,
    features: ["Доступ к базе знаний", "5 микро-уроков в день", "Комьюнити в Telegram"],
  },
  {
    id: "pro",
    name: "Pro Dev",
    monthly: 990,
    annualMonthly: 790,
    popular: true,
    features: ["Безлимитный ИИ-наставник", "Разбор багов построчно", "Песочница кода на ПК", "Синхронизация web + mobile"],
  },
  {
    id: "ultimate",
    name: "Ultimate Mentor",
    monthly: 2490,
    annualMonthly: 1990,
    features: ["Код-ревью реальных проектов", "Личные консультации", "Всё из Pro Dev", "Приоритетная поддержка"],
  },
];

function fireConfetti() {
  const colors = ["#A855F7", "#7C3AED", "#4C1D95", "#34D399"];
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    origin: { y: 0.35 },
    colors,
    scalar: 0.9,
  });
}

export function Pricing({ onSelect }: { onSelect?: (plan: { id: string; name: string; price: number; period: Period }) => void }) {
  const [period, setPeriod] = useState<Period>("monthly");

  function toggle(annual: boolean) {
    const next: Period = annual ? "annual" : "monthly";
    setPeriod(next);
    if (annual) fireConfetti();
  }

  function priceFor(plan: Plan) {
    return period === "annual" ? plan.annualMonthly : plan.monthly;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto flex items-center gap-3">
        <Label htmlFor="period-switch" className={cn(period === "monthly" && "text-[var(--ink)]")}>
          Помесячно
        </Label>
        <Switch id="period-switch" checked={period === "annual"} onCheckedChange={toggle} />
        <Label htmlFor="period-switch" className={cn("inline-flex items-center gap-2", period === "annual" && "text-[var(--ink)]")}>
          Ежегодно
          <span className="rounded-full bg-[var(--teal-soft)] px-2 py-0.5 text-xs font-bold text-[var(--teal)]">−20%</span>
        </Label>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 0.84, 0.44, 1] }}
            className={cn(
              "glass relative flex flex-col rounded-3xl p-8",
              plan.popular && "md:-translate-y-3 border-[var(--violet)]/60 shadow-[0_0_0_1px_var(--violet),0_30px_70px_var(--glow)]",
            )}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet)] px-3 py-1 text-xs font-bold text-white shadow-lg">
                <Sparkles size={12} /> Popular
              </span>
            )}
            <h3 className="text-lg font-bold text-[var(--ink)]">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1.5 font-mono">
              <NumberFlow
                value={priceFor(plan)}
                format={{ style: "decimal" }}
                className="text-3xl font-extrabold text-[var(--ink)]"
              />
              <span className="text-lg font-extrabold text-[var(--ink)]">₽</span>
              <span className="text-sm text-[var(--ink-soft)]">/ мес</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]">
                  <Check size={16} className="mt-0.5 flex-none text-[var(--teal)]" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => onSelect?.({ id: plan.id, name: plan.name, price: priceFor(plan), period })}
              variant={plan.popular ? "default" : "outline"}
              className="mt-7 w-full"
            >
              {plan.monthly === 0 ? "Начать бесплатно" : "Выбрать тариф"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
