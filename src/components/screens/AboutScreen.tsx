"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, Zap, ArrowRight } from "lucide-react";
import { OctoMascot } from "@/components/ui/octo-mascot";
import { cn } from "@/lib/utils";

const WEEK = [
  { d: "Пн", h: 38, done: true },
  { d: "Вт", h: 64, done: true },
  { d: "Ср", h: 48, done: true },
  { d: "Чт", h: 24, done: false },
  { d: "Пт", h: 82, done: false, current: true },
  { d: "Сб", h: 19, done: false },
  { d: "Вс", h: 10, done: false },
];

const FORMULA = [
  {
    pct: "80%",
    accent: "var(--violet)",
    title: "Точный промптинг",
    items: ["Роль, данные, задача, ограничения, формат", "Разбор ответа нейросети", "Контроль качества перед запуском"],
  },
  {
    pct: "20%",
    accent: "var(--teal)",
    title: "Контроль базы",
    items: ["Чтение структуры проекта", "Точечная правка условий", "Запуск и ручная доводка"],
  },
  {
    pct: "100%",
    accent: "var(--rose)",
    title: "Реальные проекты",
    items: ["Telegram-боты и парсеры", "Сайты и мини-приложения", "Портфолио с первого месяца"],
  },
];

const PATH = [
  { title: "Старт: как общаться с AI", meta: "Урок 1 · завершено", xp: "+20 XP", status: "done" as const },
  { title: "Структура сильного промпта", meta: "Урок 2 · завершено", xp: "+30 XP", status: "done" as const },
  { title: "Найди ошибку в сниппете", meta: "Задание дня · доступно", xp: "+20 XP", status: "available" as const },
  { title: "Собери первый API", meta: "Откроется после урока", xp: "+50 XP", status: "locked" as const },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 0.84, 0.44, 1] as const },
  }),
};

export function AboutScreen({ onGoPricing }: { onGoPricing: () => void }) {
  return (
    <div className="flex flex-col gap-24 pb-10">
      {/* Hero */}
      <section className="grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center pt-6">
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs mb-6"
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--teal)" }} />
            Кроссплатформенная среда • Web + Mobile
          </span>
          <h1 className="font-black tracking-tight leading-[1.08] text-[clamp(2.2rem,4.2vw,3.4rem)] max-w-[15ch]">
            Научись кодить в связке с нейросетями
          </h1>
          <p className="mt-5 text-lg max-w-[46ch]" style={{ color: "var(--ink-soft)" }}>
            Пиши точные промпты для Claude, GPT и Gemini, понимай сгенерированный код и запускай реальные проекты — с телефона и с компьютера.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-8">
            <button
              onClick={onGoPricing}
              className="inline-flex items-center gap-2 rounded-[3px] px-6 py-3.5 font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--violet)", color: "var(--paper)" }}
            >
              Стать AI-оператором <ArrowRight size={16} />
            </button>
            <a
              href="#formula"
              className="inline-flex items-center gap-2 rounded-[3px] px-6 py-3.5 font-bold text-sm border transition-colors hover:border-[var(--ink)]"
              style={{ borderColor: "var(--line)" }}
            >
              Как это работает
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
          className="relative rounded-[18px] border p-4.5 mx-auto w-full max-w-[420px]"
          style={{ background: "var(--surface)", borderColor: "var(--line)", backdropFilter: "blur(14px)", boxShadow: "0 26px 50px rgba(0,0,0,0.14)" }}
        >
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--line)" }}>
            <span className="text-[0.83rem] font-bold">Мой учебный путь</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem]" style={{ color: "var(--ink-soft)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--teal)" }} />
              синхронизировано
            </span>
          </div>
          <div className="flex justify-between items-end pt-5 pb-4">
            <div>
              <span className="font-mono text-[0.69rem] font-semibold uppercase tracking-wide" style={{ color: "var(--violet)" }}>
                Трек 01 · Python + AI
              </span>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight">Пишем первый API</h3>
            </div>
            <span className="font-mono text-2xl font-extrabold tracking-tight" style={{ color: "var(--teal)" }}>
              68%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--paper-2)" }}>
            <motion.span
              className="block h-full rounded-full"
              style={{ background: `linear-gradient(90deg, var(--violet), var(--violet))` }}
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            />
          </div>
          <div className="grid grid-cols-7 items-end gap-2 py-5 mt-1 border-b" style={{ height: 118, borderColor: "var(--line)" }}>
            {WEEK.map((day) => (
              <div key={day.d} className="grid gap-1.5 justify-items-center items-end h-full font-mono text-[0.63rem]" style={{ color: "var(--ink-soft)" }}>
                <span
                  className="w-full rounded-t-[6px] rounded-b-[2px]"
                  style={{
                    height: `${day.h}%`,
                    background: day.current ? "var(--violet)" : day.done ? "var(--teal)" : "var(--paper-2)",
                    boxShadow: day.current ? "0 0 0 4px var(--violet-soft)" : "none",
                  }}
                />
                {day.d}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4 p-3 rounded-[10px]" style={{ background: "var(--violet-soft)" }}>
            <span
              className="w-[30px] h-[30px] grid place-items-center rounded-lg font-mono text-xs font-bold flex-none"
              style={{ background: "var(--card-bg)", color: "var(--violet)" }}
            >
              ↳
            </span>
            <p className="text-[0.77rem] m-0" style={{ color: "var(--ink-soft)" }}>
              Следующая задача
              <strong className="block text-[0.88rem]" style={{ color: "var(--ink)" }}>
                Объясни ошибку в запросе
              </strong>
            </p>
          </div>
          <span
            className="absolute -right-6 -bottom-8 -z-10 rotate-[-5deg] rounded-xl px-4 py-3 font-mono text-[0.7rem] font-semibold border"
            style={{ background: "var(--teal-soft)", color: "var(--teal)", borderColor: "color-mix(in srgb, var(--teal) 22%, transparent)" }}
          >
            + 3 дня подряд
          </span>
        </motion.div>
      </section>

      {/* Формула успеха */}
      <section id="formula">
        <div className="max-w-[62ch] mb-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--violet)" }}>
            Формула успеха
          </span>
          <h2 className="mt-2 font-extrabold text-[clamp(1.7rem,2.8vw,2.35rem)] leading-tight tracking-tight">
            Не заучивай синтаксис — управляй разработкой
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FORMULA.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              variants={fadeUp}
              className="group relative rounded-[20px] p-7 border overflow-hidden transition-transform hover:-translate-y-1.5"
              style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(240px circle at 30% 20%, color-mix(in srgb, ${f.accent} 16%, transparent), transparent 70%)` }}
              />
              <span className="relative font-mono text-4xl font-extrabold" style={{ color: f.accent }}>
                {f.pct}
              </span>
              <h3 className="relative mt-2 text-lg font-bold">{f.title}</h3>
              <ul className="relative mt-4 flex flex-col gap-2.5">
                {f.items.map((it) => (
                  <li key={it} className="flex gap-2.5 items-start text-sm" style={{ color: "var(--ink-soft)" }}>
                    <CheckCircle2 size={16} className="flex-none mt-0.5" style={{ color: f.accent }} />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Path map + Octo */}
      <section className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center rounded-[24px] p-8 md:p-10" style={{ background: "linear-gradient(135deg, var(--violet-soft), var(--teal-soft))" }}>
        <div>
          <OctoMascot size={200} />
          <div className="mt-5 flex items-center gap-3.5 p-4 rounded-2xl border" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
            <Sparkles size={20} style={{ color: "var(--violet)" }} className="flex-none" />
            <div>
              <h3 className="m-0 text-base font-bold">Окто рядом с тобой</h3>
              <p className="m-0 text-sm" style={{ color: "var(--ink-soft)" }}>«Ещё один урок — и получим +20 XP!»</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--violet)" }}>
            Маршрут уроков
          </span>
          {PATH.map((node) => (
            <div
              key={node.title}
              className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-transform hover:translate-x-1.5", node.status === "locked" && "opacity-60")}
              style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}
            >
              <span
                className="w-[43px] h-[43px] grid place-items-center rounded-[13px] flex-none"
                style={{
                  background: node.status === "done" ? "var(--teal-soft)" : "var(--violet-soft)",
                  color: node.status === "done" ? "var(--teal)" : "var(--violet)",
                }}
              >
                {node.status === "done" ? <CheckCircle2 size={20} /> : node.status === "locked" ? <Lock size={18} /> : <Zap size={20} />}
              </span>
              <div className="flex-1">
                <h3 className="m-0 text-sm font-bold">{node.title}</h3>
                <p className="m-0 text-[0.84rem]" style={{ color: "var(--ink-soft)" }}>{node.meta}</p>
              </div>
              <span className="font-mono text-xs font-bold" style={{ color: "var(--violet)" }}>{node.xp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
