"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"] as const;
const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const AVAILABLE_DATES = new Set([9, 10, 11, 14, 15]);

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-0";

const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";

type FormData = {
  fullName: string;
  email: string;
  company: string;
  location: string;
  challenge: string;
};

function weekdayLabel(day: number) {
  return new Date(2026, 8, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ContactForm() {
  const modalTitleId = useId();
  const { resolvedTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    location: "",
    challenge: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(11);
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM");
  const [validationError, setValidationError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const isDark = themeReady && resolvedTheme === "dark";
  const hasContactDetails = Boolean(formData.fullName.trim() && formData.email.trim());

  const calendarCells = useMemo(() => {
    const firstDow = new Date(2026, 8, 1).getDay();
    const daysInMonth = 30;
    const cells: ({ day: number; available: boolean } | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ day, available: AVAILABLE_DATES.has(day) });
    }
    return cells;
  }, []);

  useEffect(() => setThemeReady(true), []);

  useEffect(() => {
    if (!isModalOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError && (name === "fullName" || name === "email")) {
      setValidationError("");
    }
  };

  const validateContact = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setValidationError("Please complete your contact details first.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleOpenModal = () => {
    if (!validateContact()) {
      // Still open so the modal can show the warning banner
    }
    setIsModalOpen(true);
  };

  const submitPayload = () => ({
    ...formData,
    discoveryCall:
      selectedDate && selectedTime
        ? {
            date: `2026-09-${String(selectedDate).padStart(2, "0")}`,
            time: selectedTime,
            display: weekdayLabel(selectedDate),
          }
        : null,
  });

  const finishSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      console.info("Lead capture / booking request:", submitPayload());
      setIsSubmitted(true);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    await finishSubmit();
  };

  const handleConfirmCall = async () => {
    if (!validateContact()) return;
    if (!selectedDate) {
      setValidationError("Please select an available date.");
      return;
    }
    if (!selectedTime) {
      setValidationError("Please select a time slot.");
      return;
    }
    await finishSubmit();
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden bg-slate-100/70 py-16 text-slate-900 sm:py-20 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-5 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full space-y-4"
          >
            <div className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Lead Capture
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Request an operational audit
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Tell us where the plant is underperforming. We respond with a structured assessment
              plan — scope, timeline, and expected impact areas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            {isSubmitted ? (
              <div className="space-y-4 py-12 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 animate-bounce text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Thank you{formData.fullName ? `, ${formData.fullName}` : ""}. Our team will review
                  your details
                  {selectedDate && selectedTime
                    ? ` and your discovery call on ${weekdayLabel(selectedDate)} at ${selectedTime}`
                    : ""}{" "}
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedTime("");
                    setValidationError("");
                  }}
                  className="text-xs font-semibold text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Chen"
                      required
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Business Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Acme Foods Ltd."
                      autoComplete="organization"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Plant / Facility Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Main Operational Challenge</label>
                  <textarea
                    name="challenge"
                    rows={3}
                    value={formData.challenge}
                    onChange={handleInputChange}
                    placeholder="e.g. OEE below target on packaging lines; rising labor cost per unit..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {validationError && !isModalOpen && (
                  <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    {validationError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-emerald-950/50"
                >
                  {isSubmitting ? "Sending…" : "Submit Audit Request"}
                </button>

                <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800/80 dark:text-slate-400">
                  <span>Prefer to book a call directly instead?</span>
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex items-center gap-1 font-semibold text-emerald-600 transition-colors hover:underline dark:text-emerald-400"
                  >
                    Schedule Discovery Call →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 backdrop-blur-md ${
              isDark ? "bg-slate-950/80" : "bg-slate-900/40"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close dialog"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-md space-y-5 overflow-hidden rounded-3xl border p-6 text-left shadow-2xl ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-5 right-5 transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-8">
                <h3
                  id={modalTitleId}
                  className={`flex items-center gap-2 text-xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  <Calendar className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  Schedule Discovery Call
                </h3>
                <p className={`mt-1 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Select an available date and time slot for your call.
                </p>
              </div>

              {!hasContactDetails && (
                <div
                  className={`rounded-xl border p-3 text-xs font-medium ${
                    isDark
                      ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                  role="status"
                >
                  Please complete your contact details first.
                </div>
              )}

              <div
                className={`space-y-3 rounded-2xl border p-4 ${
                  isDark
                    ? "border-slate-800 bg-slate-950/80"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div
                  className={`flex items-center justify-between text-sm font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  <button type="button" className="cursor-not-allowed text-slate-400" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span>September 2026</span>
                  <button type="button" className="cursor-not-allowed text-slate-400" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-slate-500">
                  {DAY_HEADERS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {calendarCells.map((cell, index) => {
                    if (!cell) return <span key={`empty-${index}`} className="py-1.5" />;

                    const isSelected = selectedDate === cell.day;
                    return (
                      <button
                        key={cell.day}
                        type="button"
                        disabled={!cell.available}
                        onClick={() => {
                          setSelectedDate(cell.day);
                          setValidationError("");
                        }}
                        className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-emerald-500 font-bold text-white shadow-md"
                            : cell.available
                              ? isDark
                                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                              : "cursor-not-allowed text-slate-400 opacity-40"
                        }`}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  className={`mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  Select Time
                  {selectedDate ? ` · ${weekdayLabel(selectedDate)}` : ""}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const active = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setSelectedTime(time);
                          setValidationError("");
                        }}
                        className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                          active
                            ? isDark
                              ? "border-emerald-500 bg-emerald-500/20 font-bold text-emerald-300"
                              : "border-emerald-500 bg-emerald-500/15 font-bold text-emerald-700"
                            : isDark
                              ? "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {validationError && (
                <div
                  className={`rounded-xl border p-3 text-xs font-medium ${
                    isDark
                      ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                  role="alert"
                >
                  {validationError}
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmCall}
                disabled={isSubmitting}
                className={`w-full rounded-xl py-3.5 text-sm font-bold shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
                  isDark
                    ? "bg-white text-slate-950 hover:bg-slate-100"
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                }`}
              >
                {isSubmitting ? "Confirming…" : "Confirm Your Call"}
              </button>

              <p
                className={`text-center text-[11px] font-medium ${
                  isDark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                *Your call is hosted securely within the Arsy platform.*
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
