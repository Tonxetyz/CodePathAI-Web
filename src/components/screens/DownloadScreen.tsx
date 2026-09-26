"use client";

import { Apple, Laptop, MonitorSmartphone, Smartphone, Terminal, Zap } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

const DESKTOP_TARGETS = ["Windows .exe", "macOS (Apple Silicon / Intel)", "Linux AppImage"];
const DESKTOP_FEATURES = ["Встроенный терминал", "Песочница для запуска кода", "Связка с локальным VS Code"];

const MOBILE_TARGETS = ["iOS App Store", "Android APK / Google Play"];
const MOBILE_FEATURES = ["Микро-квизы на 5 минут", "Тренажёр промптов в дороге", "Уведомления о серии дней"];

export function DownloadScreen() {
  const toast = useToast();

  function download(target: string) {
    toast(`Скачивание «${target}» начнётся после регистрации`, "info");
  }

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="text-center max-w-[60ch] mx-auto">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--violet)" }}>
          Скачать
        </span>
        <h2 className="mt-2 font-extrabold text-[clamp(1.7rem,2.8vw,2.35rem)] leading-tight tracking-tight">
          Одна учёба — на всех устройствах
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-[22px] border p-8" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
          <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5" style={{ background: "var(--violet-soft)" }}>
            <Laptop size={26} style={{ color: "var(--violet)" }} />
          </div>
          <h3 className="text-xl font-bold">Desktop</h3>
          <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>Полноценная разработка за компьютером.</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {DESKTOP_FEATURES.map((f, i) => (
              <li key={f} className="flex gap-2.5 items-start text-sm" style={{ color: "var(--ink-soft)" }}>
                {i === 0 ? <Terminal size={16} className="flex-none mt-0.5" style={{ color: "var(--violet)" }} /> : <Zap size={16} className="flex-none mt-0.5" style={{ color: "var(--violet)" }} />}
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5">
            {DESKTOP_TARGETS.map((t) => (
              <button
                key={t}
                onClick={() => download(t)}
                className="flex items-center justify-between rounded-[10px] border px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--violet)]"
                style={{ borderColor: "var(--line)" }}
              >
                {t}
                <MonitorSmartphone size={16} style={{ color: "var(--ink-soft)" }} />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border p-8" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
          <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5" style={{ background: "var(--teal-soft)" }}>
            <Smartphone size={26} style={{ color: "var(--teal)" }} />
          </div>
          <h3 className="text-xl font-bold">Mobile</h3>
          <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>Тренажёр в кармане — 5 минут в день.</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {MOBILE_FEATURES.map((f) => (
              <li key={f} className="flex gap-2.5 items-start text-sm" style={{ color: "var(--ink-soft)" }}>
                <Zap size={16} className="flex-none mt-0.5" style={{ color: "var(--teal)" }} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5">
            {MOBILE_TARGETS.map((t) => (
              <button
                key={t}
                onClick={() => download(t)}
                className="flex items-center justify-between rounded-[10px] border px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--teal)]"
                style={{ borderColor: "var(--line)" }}
              >
                {t}
                <Apple size={16} style={{ color: "var(--ink-soft)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col sm:flex-row items-center gap-5 rounded-[20px] border p-6 max-w-[520px]" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=https://codepathai.app/get-mobile"
          alt="QR-код для открытия мобильной версии CodePath AI"
          width={140}
          height={140}
          className="rounded-[12px] border flex-none"
          style={{ borderColor: "var(--line)" }}
        />
        <div>
          <h3 className="text-base font-bold">Открыть на телефоне прямо сейчас</h3>
          <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
            Наведи камеру телефона на QR-код — попадёшь на страницу установки мобильной версии CodePath AI.
          </p>
        </div>
      </div>
    </div>
  );
}
