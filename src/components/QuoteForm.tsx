"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { insuranceTypes } from "@/lib/insurance";

type Errors = Record<string, string>;

const bestTimes = ["Any time", "Morning", "Afternoon", "Evening"];

export function QuoteForm({ initialType = "" }: { initialType?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({
    insuranceType: initialType,
    fullName: "",
    phone: "",
    email: "",
    zip: "",
    bestTime: "Any time",
    details: "",
    consent: false,
    company: "", // honeypot
  });

  const totalSteps = 3;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep(current: number): boolean {
    const e: Errors = {};
    if (current === 0 && !form.insuranceType) {
      e.insuranceType = "Please choose what you'd like to insure.";
    }
    if (current === 1) {
      if (form.fullName.trim().length < 2) e.fullName = "Please enter your name.";
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 10) e.phone = "Please enter a valid phone number.";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Please enter a valid email address.";
    }
    if (current === 2 && !form.consent) {
      e.consent = "Please check the box so a licensed agent can contact you.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, totalSteps - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(
          data.error || "Something went wrong. Please try again or call us."
        );
        setSubmitting(false);
        return;
      }
      router.push("/thank-you");
    } catch {
      setServerError(
        "We couldn't submit right now. Please try again or call us."
      );
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="card mx-auto max-w-2xl !p-6 sm:!p-8"
      noValidate
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>
            Step {step + 1} of {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Honeypot (hidden from humans) */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="text-2xl font-extrabold text-slate-900">
            What would you like to insure?
          </legend>
          <p className="mt-2 text-slate-600">
            Pick one to get started — you can mention others later.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {insuranceTypes.map((t) => {
              const selected = form.insuranceType === t.slug;
              return (
                <button
                  type="button"
                  key={t.slug}
                  onClick={() => update("insuranceType", t.slug)}
                  aria-pressed={selected}
                  className={`flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
                    selected
                      ? "border-brand-600 bg-brand-50 text-brand-800 shadow-soft"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {t.icon}
                  </span>
                  <span className="text-sm font-semibold">{t.shortName}</span>
                </button>
              );
            })}
          </div>
          {errors.insuranceType && (
            <p className="mt-3 font-medium text-red-600">
              {errors.insuranceType}
            </p>
          )}
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="text-2xl font-extrabold text-slate-900">
            How can a licensed agent reach you?
          </legend>
          <p className="mt-2 text-slate-600">
            We&apos;ll use this only to send you your free quote.
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label htmlFor="fullName" className="field-label">
                Full name
              </label>
              <input
                id="fullName"
                className="field-input"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Jane Smith"
              />
              {errors.fullName && (
                <p className="mt-1 font-medium text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="field-label">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                className="field-input"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(412) 555-0123"
              />
              {errors.phone && (
                <p className="mt-1 font-medium text-red-600">{errors.phone}</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="field-label">
                  Email <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  className="field-input"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                />
                {errors.email && (
                  <p className="mt-1 font-medium text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="zip" className="field-label">
                  ZIP code{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="zip"
                  inputMode="numeric"
                  className="field-input"
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  placeholder="15222"
                />
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="text-2xl font-extrabold text-slate-900">
            Almost done!
          </legend>
          <p className="mt-2 text-slate-600">
            Anything else we should know? Then confirm and we&apos;ll get to
            work.
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label htmlFor="bestTime" className="field-label">
                Best time to reach you
              </label>
              <select
                id="bestTime"
                className="field-input"
                value={form.bestTime}
                onChange={(e) => update("bestTime", e.target.value)}
              >
                {bestTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="details" className="field-label">
                Details{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="details"
                className="field-input min-h-[110px]"
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="e.g. I'd like to bundle home and auto, or I'm turning 65 in March."
              />
            </div>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${
                errors.consent ? "border-red-300 bg-red-50" : "border-slate-200"
              }`}
            >
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 flex-none accent-brand-600"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span className="text-sm text-slate-600">
                I agree to be contacted by a licensed agent by phone, text, or
                email about my insurance quote. I understand this is free with no
                obligation, and my information is kept private and secure.
              </span>
            </label>
            {errors.consent && (
              <p className="-mt-2 font-medium text-red-600">{errors.consent}</p>
            )}
          </div>
        </fieldset>
      )}

      {serverError && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 p-3 font-medium text-red-700"
        >
          {serverError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-ghost">
            ← Back
          </button>
        ) : (
          <span />
        )}

        {step < totalSteps - 1 ? (
          <button type="button" onClick={next} className="btn-primary">
            Continue →
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-gold">
            {submitting ? "Sending…" : "Get My Free Quote"}
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        🔒 Secure &amp; encrypted · Free · No obligation
      </p>
    </form>
  );
}
