"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Mode = "signup" | "login";
type Step = "form" | "otp";

const STRENGTH_RULES = [
  { key: "len", label: "8+ символов", test: (v: string) => v.length >= 8 },
  { key: "upper", label: "Заглавная буква", test: (v: string) => /[A-ZА-Я]/.test(v) },
  { key: "digit", label: "Цифра", test: (v: string) => /\d/.test(v) },
  { key: "special", label: "Спецсимвол", test: (v: string) => /[^A-Za-zА-Яа-я0-9]/.test(v) },
];

const STRENGTH_LABELS = ["Слабый", "Слабый", "Средний", "Надёжный", "Надёжный"];
const STRENGTH_COLORS = ["var(--rose)", "var(--rose)", "#f5b942", "var(--teal)", "var(--teal)"];

function PasswordStrengthMeter({ value }: { value: string }) {
  const passed = STRENGTH_RULES.filter((r) => r.test(value)).length;
  const score = value.length === 0 ? 0 : passed;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-colors duration-300"
            style={{ background: i < score ? STRENGTH_COLORS[score] : "var(--line)" }}
          />
        ))}
      </div>
      {value.length > 0 && (
        <span className="text-xs font-semibold" style={{ color: STRENGTH_COLORS[score] }}>
          {STRENGTH_LABELS[score]}
        </span>
      )}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {STRENGTH_RULES.map((r) => {
          const ok = r.test(value);
          return (
            <li key={r.key} className={cn("flex items-center gap-1.5 text-xs", ok ? "text-[var(--teal)]" : "text-[var(--ink-soft)]")}>
              {ok ? <Check size={12} /> : <X size={12} className="opacity-40" />}
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function OtpInput({ length = 6, onComplete }: { length?: number; onComplete: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(i: number, val: string) {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) onComplete(next.join(""));
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!text) return;
    e.preventDefault();
    const next = Array(length).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
    if (text.length === length) onComplete(next.join(""));
  }

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((d, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          animate={d ? { scale: [1.15, 1] } : {}}
          transition={{ duration: 0.18 }}
          inputMode="numeric"
          maxLength={1}
          autoFocus={i === 0}
          className="h-13 w-11 rounded-xl border text-center text-lg font-bold text-[var(--ink)] outline-none transition-colors focus:border-[var(--violet)]"
          style={{ background: "var(--paper-2)", borderColor: d ? "var(--violet)" : "var(--line)" }}
        />
      ))}
    </div>
  );
}

export function AuthCard({
  onAuthenticated,
}: {
  onAuthenticated?: (user: { name: string; email: string }) => void;
}) {
  const [mode, setMode] = useState<Mode>("signup");
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Введи корректный email");
    if (password.length < 8) return setError("Пароль должен быть не короче 8 символов");
    setError(null);
    if (mode === "signup") {
      setStep("otp");
    } else {
      onAuthenticated?.({ name: email.split("@")[0], email });
    }
  }

  function verifyOtp() {
    onAuthenticated?.({ name: name || email.split("@")[0], email });
  }

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div className="glass mb-6 flex w-full rounded-full p-1.5">
        {(["signup", "login"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setStep("form");
              setError(null);
            }}
            className={cn(
              "relative flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors",
              mode === m ? "text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
            )}
          >
            {mode === m && (
              <motion.span
                layoutId="auth-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {m === "signup" ? "Регистрация" : "Вход"}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl p-7">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? -16 : 16 }}
              transition={{ duration: 0.2 }}
              onSubmit={submit}
              className="flex flex-col gap-4"
            >
              {mode === "signup" && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="auth-name">Имя</Label>
                  <input
                    id="auth-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border px-3.5 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
                    style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-email">Email</Label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border px-3.5 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
                  style={{ background: "var(--paper-2)", borderColor: error?.includes("email") ? "var(--rose)" : "var(--line)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-password">Пароль</Label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border px-3.5 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
                  style={{ background: "var(--paper-2)", borderColor: error?.includes("Пароль") ? "var(--rose)" : "var(--line)" }}
                />
                {mode === "signup" && <PasswordStrengthMeter value={password} />}
              </div>

              {error && <p className="text-xs text-[var(--rose)]">{error}</p>}

              <Button type="submit" className="mt-1">
                <Mail size={16} /> {mode === "login" ? "Войти" : "Отправить код на почту"}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <h3 className="text-lg font-bold text-[var(--ink)]">Подтверди почту</h3>
              <p className="max-w-[32ch] text-sm text-[var(--ink-soft)]">
                Мы отправили 6-значный код на {email || "твою почту"}
              </p>
              <OtpInput onComplete={verifyOtp} />
              <button type="button" onClick={() => setStep("form")} className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)]">
                Изменить email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
