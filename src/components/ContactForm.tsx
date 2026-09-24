"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
] as const;

const STEPS = [
  { id: 1, label: "Your Information" },
  { id: 2, label: "Select Date & Time" },
  { id: 3, label: "Confirmation" },
] as const;

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-0";

const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  challenge: string;
};

type SelectedDate = { year: number; month: number; day: number };

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDateLabel(date: SelectedDate) {
  return new Date(date.year, date.month, date.day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatIsoDate(date: SelectedDate) {
  return `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function sameDate(a: SelectedDate | null, b: SelectedDate) {
  return Boolean(a && a.year === b.year && a.month === b.month && a.day === b.day);
}

function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <nav className="mb-8" aria-label="Form progress">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const isComplete = currentStep > step.id;
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.id} className={`flex items-center ${isLast ? "" : "min-w-0 flex-1"}`}>
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                      : isComplete
                        ? "bg-emerald-500 text-white"
                        : "border border-slate-300 bg-transparent text-slate-400 dark:border-slate-700 dark:text-slate-400"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isComplete ? <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} /> : step.id}
                </span>
                <span
                  className={`hidden text-center text-[11px] font-medium sm:block ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`mx-3 mb-6 hidden h-px flex-1 sm:block ${
                    isComplete ? "bg-emerald-500/70" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function ContactForm() {
  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
  }, []);

  const yearOptions = useMemo(() => {
    const start = today.year - 10;
    const end = today.year + 30;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [today.year]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    challenge: "",
  });
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [validationError, setValidationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [consentNonMarketing, setConsentNonMarketing] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const calendarCells = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const totalDays = daysInMonth(viewYear, viewMonth);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let day = 1; day <= totalDays; day++) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const selectDate = (candidate: SelectedDate) => {
    setSelectedDate(candidate);
    setSelectedTime("");
    setValidationError("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
    if (validationError && (name === "fullName" || name === "email")) {
      setValidationError("");
    }
  };

  const validateContact = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setValidationError("Please complete your contact details first.");
      return false;
    }
    if (!agreedToTerms) {
      setValidationError("Please agree to the Privacy Policy and Terms and Conditions.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const validateSchedule = () => {
    if (!selectedDate) {
      setValidationError("Please select a date.");
      return false;
    }
    if (!selectedTime.trim()) {
      setValidationError("Please select a time slot.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const buildPayload = () => ({
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    company: formData.company.trim(),
    location: formData.location.trim(),
    challenge: formData.challenge.trim(),
    consentNonMarketing,
    consentMarketing,
    agreedToTerms,
    discoveryCall:
      selectedDate && selectedTime.trim()
        ? {
            date: formatIsoDate(selectedDate),
            time: selectedTime.trim(),
            display: formatDateLabel(selectedDate),
          }
        : null,
  });

  const resetForm = () => {
    const now = new Date();
    const fresh = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    };
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      challenge: "",
    });
    setConsentNonMarketing(false);
    setConsentMarketing(false);
    setAgreedToTerms(false);
    setViewYear(fresh.year);
    setViewMonth(fresh.month);
    setSelectedDate(fresh);
    setSelectedTime("");
    setValidationError("");
    setSubmitError("");
    setStep(1);
  };

  const finishSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = buildPayload();
      const endpoint =
        process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || "/api/audit-request";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Failed to send your audit request. Please try again.");
      }

      setSubmittedName(payload.fullName);
      resetForm();
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send your audit request. Please try again.";
      setSubmitError(message);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setStep(2);
  };

  const goToStep3 = () => {
    if (!validateSchedule()) return;
    setStep(3);
  };

  const handleConfirm = async () => {
    if (!validateContact()) {
      setStep(1);
      return;
    }
    if (!validateSchedule()) {
      setStep(2);
      return;
    }
    await finishSubmit();
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden bg-slate-100/70 py-16 text-slate-900 sm:py-20 dark:bg-slate-950 dark:text-slate-100"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full space-y-4"
        >
          <div className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            ARSY CONSULTING
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
            Book Your Consultation
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
            Let&apos;s discuss how we can support your goals and find the best solution for your
            business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-black/40"
        >
          {isSubmitted ? (
            <div
              className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10"
              role="status"
            >
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Thank you! Your consultation request has been sent.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {submittedName ? `Thanks, ${submittedName}. ` : ""}
                We&apos;ll review your details and follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedName("");
                  resetForm();
                }}
                className="text-xs font-semibold text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <StepProgress currentStep={step} />

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step-1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={goToStep2}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-4">
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
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          autoComplete="tel"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
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

                    {validationError && (
                      <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                        {validationError}
                      </p>
                    )}

                    <div className="space-y-3">
                      <label className="flex cursor-pointer items-start gap-2.5 text-left text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={consentNonMarketing}
                          onChange={(e) => setConsentNonMarketing(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-950"
                        />
                        <span>
                          I consent to receive non-marketing text messages from Arsy Consulting
                          regarding operational consulting inquiries. Message frequency varies,
                          message &amp; data rates may apply. Reply HELP for assistance, reply STOP
                          to opt out.
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-start gap-2.5 text-left text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={consentMarketing}
                          onChange={(e) => setConsentMarketing(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-950"
                        />
                        <span>
                          I consent to receive marketing text messages from Arsy Consulting regarding
                          promotional updates and insights. Message frequency varies, message &amp;
                          data rates may apply. Reply HELP for assistance, reply STOP to opt out.
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-start gap-2.5 text-left text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked);
                            if (e.target.checked && validationError) setValidationError("");
                          }}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-950"
                        />
                        <span>
                          I agree to the{" "}
                          <a
                            href="/privacy-policy"
                            className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                          >
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a
                            href="/terms"
                            className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                          >
                            Terms and Conditions
                          </a>
                          .
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40"
                    >
                      Continue to Date &amp; Time
                    </button>

                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                      <a
                        href="/privacy-policy"
                        className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                      >
                        Privacy Policy
                      </a>
                      {" | "}
                      <a
                        href="/terms"
                        className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                      >
                        Terms and Conditions
                      </a>
                    </p>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        Select Date &amp; Time
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Choose a day, then pick an available time slot.
                      </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                      {/* Calendar */}
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800/80 dark:bg-slate-950/40">
                        <div className="mb-4 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => shiftMonth(-1)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200/80 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>

                          <div className="flex items-center gap-2">
                            <select
                              value={viewMonth}
                              onChange={(e) => setViewMonth(Number(e.target.value))}
                              className="appearance-none rounded-lg bg-transparent px-1 py-1 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/30 dark:text-slate-100"
                              aria-label="Month"
                            >
                              {MONTH_NAMES.map((name, index) => (
                                <option key={name} value={index} className="bg-slate-900 text-slate-100">
                                  {name}
                                </option>
                              ))}
                            </select>
                            <select
                              value={viewYear}
                              onChange={(e) => setViewYear(Number(e.target.value))}
                              className="appearance-none rounded-lg bg-transparent px-1 py-1 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/30 dark:text-slate-100"
                              aria-label="Year"
                            >
                              {yearOptions.map((year) => (
                                <option key={year} value={year} className="bg-slate-900 text-slate-100">
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => shiftMonth(1)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200/80 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                            aria-label="Next month"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-slate-400">
                          {DAY_HEADERS.map((d) => (
                            <span key={d} className="py-1">
                              {d}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1.5">
                          {calendarCells.map((day, index) => {
                            if (!day) {
                              return <div key={`empty-${index}`} className="aspect-square" />;
                            }

                            const candidate = { year: viewYear, month: viewMonth, day };
                            const isSelected = sameDate(selectedDate, candidate);
                            const isToday = sameDate(today, candidate);

                            return (
                              <button
                                key={`${viewYear}-${viewMonth}-${day}`}
                                type="button"
                                onClick={() => selectDate(candidate)}
                                className={`flex aspect-square items-center justify-center rounded-full text-sm font-medium tabular-nums transition-all duration-200 ${
                                  isSelected
                                    ? "bg-emerald-500 font-semibold text-white shadow-md shadow-emerald-500/25"
                                    : isToday
                                      ? "bg-emerald-500/15 font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/40 dark:text-emerald-400"
                                      : "text-slate-700 hover:bg-slate-200/80 dark:text-slate-200 dark:hover:bg-slate-800"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div className="flex min-h-[280px] flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800/80 dark:bg-slate-950/40">
                        <div className="mb-4 flex items-start gap-2">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Available times
                            </p>
                            <p className="text-xs text-slate-400">
                              {selectedDate
                                ? formatDateLabel(selectedDate)
                                : "Select a date to view times"}
                            </p>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {selectedDate ? (
                            <motion.div
                              key={formatIsoDate(selectedDate)}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="scrollbar-hide grid max-h-[320px] grid-cols-2 content-start gap-2.5 overflow-y-auto pr-1"
                            >
                              {TIME_SLOTS.map((slot) => {
                                const active = selectedTime === slot;
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTime(slot);
                                      setValidationError("");
                                    }}
                                    className={`rounded-lg px-3 py-2 text-sm tabular-nums transition-all duration-200 ${
                                      active
                                        ? "border border-emerald-400 bg-emerald-500 font-semibold text-slate-950 shadow-sm shadow-emerald-500/20"
                                        : "border border-slate-200 bg-slate-100/80 font-medium text-slate-700 hover:bg-slate-200/80 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/80"
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="no-date"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400 dark:border-slate-700"
                            >
                              Pick a date on the calendar to see available time slots.
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {validationError && (
                      <p
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                        role="alert"
                      >
                        {validationError}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setValidationError("");
                          setStep(1);
                        }}
                        className="flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={goToStep3}
                        className="w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 sm:w-auto sm:min-w-[220px]"
                      >
                        Continue to Confirmation
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                          Confirm your consultation
                        </h3>
                        <p className="mt-0.5 text-sm text-slate-400">
                          Review your details before submitting.
                        </p>
                      </div>
                    </div>

                    <dl className="divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white dark:divide-slate-800 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900/80">
                      <div className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                        <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                          Name
                        </dt>
                        <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                          {formData.fullName.trim() || "—"}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                        <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                          Email
                        </dt>
                        <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                          {formData.email.trim() || "—"}
                        </dd>
                      </div>
                      {formData.phone.trim() && (
                        <div className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                            Phone
                          </dt>
                          <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formData.phone.trim()}
                          </dd>
                        </div>
                      )}
                      {formData.company.trim() && (
                        <div className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                            Company
                          </dt>
                          <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formData.company.trim()}
                          </dd>
                        </div>
                      )}
                      {formData.location.trim() && (
                        <div className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                            Location
                          </dt>
                          <dd className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formData.location.trim()}
                          </dd>
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5 bg-emerald-500/5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                        <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                          Discovery call
                        </dt>
                        <dd className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {selectedDate && selectedTime.trim()
                            ? `${formatDateLabel(selectedDate)} · ${selectedTime}`
                            : "—"}
                        </dd>
                      </div>
                    </dl>

                    {formData.challenge.trim() && (
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                        <p className={labelClass}>Challenge</p>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {formData.challenge.trim()}
                        </p>
                      </div>
                    )}

                    {submitError && (
                      <p
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                        role="alert"
                      >
                        {submitError}
                      </p>
                    )}

                    {validationError && (
                      <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                        {validationError}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setValidationError("");
                          setSubmitError("");
                          setStep(2);
                        }}
                        className="flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className="w-full flex-1 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? "Confirming…" : "Confirm Consultation"}
                      </button>
                    </div>

                    <p className="text-center text-[11px] font-medium text-slate-500">
                      *Your call is hosted securely within the Arsy platform.*
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
