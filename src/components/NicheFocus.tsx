"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Maximize, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { IndustryTicker } from "@/components/IndustryTicker";

interface ImprovementCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  focusAreas: string[];
  video: string;
}

/**
 * Shared plant footage until each category has its own file.
 * Replace any `video` value with that category's file, for example
 * "/videos/operational-excellence.mp4".
 */
const sharedManufacturingFootage =
  "/video/WhatsApp%20Video%202026-09-28%20at%2011.45.11%20PM.mp4";
const showcaseSoundtrack = "/sound/vaitsez-vlog-vlog-music-607182.mp3";

const AUDIO_FADE_MS = 650;
const SOUND_PREFERENCE_KEY = "arsy-showcase-sound-enabled";

type FadeState = {
  frame: number | null;
  cancel: (() => void) | null;
};

type FullscreenHost = HTMLElement & {
  webkitRequestFullscreen?: () => void;
};

function isFrameFullscreen(frame: HTMLElement | null) {
  if (!frame) return false;
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return document.fullscreenElement === frame || doc.webkitFullscreenElement === frame;
}

function setVolume(media: HTMLMediaElement, value: number) {
  const next = Math.min(1, Math.max(0, value));
  try {
    media.volume = next;
  } catch {
    // Some browsers reject out-of-range values mid-fade. Keep the last safe level.
  }
}

function fadeVolume(
  media: HTMLMediaElement,
  target: number,
  duration: number,
  state: FadeState,
): Promise<void> {
  state.cancel?.();
  state.cancel = null;
  if (state.frame != null) {
    cancelAnimationFrame(state.frame);
    state.frame = null;
  }

  const clamped = Math.min(1, Math.max(0, target));
  const from = media.muted ? 0 : media.volume;
  if (clamped > 0) {
    media.muted = false;
    setVolume(media, from);
  }

  if (duration <= 0 || Math.abs(from - clamped) < 0.01) {
    setVolume(media, clamped);
    media.muted = clamped === 0;
    return Promise.resolve();
  }

  const start = performance.now();
  return new Promise((resolve, reject) => {
    state.cancel = () => {
      state.cancel = null;
      if (state.frame != null) cancelAnimationFrame(state.frame);
      state.frame = null;
      reject(new Error("fade-cancelled"));
    };

    const step = () => {
      const progress = Math.min(1, Math.max(0, (performance.now() - start) / duration));
      const eased = 1 - (1 - progress) * (1 - progress);
      setVolume(media, from + (clamped - from) * eased);
      if (progress < 1) {
        state.frame = requestAnimationFrame(step);
        return;
      }
      state.frame = null;
      state.cancel = null;
      setVolume(media, clamped);
      media.muted = clamped === 0;
      resolve();
    };

    state.frame = requestAnimationFrame(step);
  });
}

const improvementCategories: ImprovementCategory[] = [
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    badge: "Operational Discipline",
    description:
      "Streamline workflows, strengthen standard operating procedures, and create more efficient day-to-day operations.",
    focusAreas: [
      "Workflow Optimization",
      "Standard Operating Procedures (SOPs)",
      "Daily Management Systems",
      "Operational Efficiency",
    ],
    video: sharedManufacturingFootage,
  },
  {
    id: "cost-reduction",
    title: "Cost Reduction",
    badge: "Margin & Profitability",
    description:
      "Identify unnecessary costs, production losses, and inefficiencies that impact your margins.",
    focusAreas: [
      "Cost Optimization",
      "Production Loss Elimination",
      "Yield Improvement",
      "Margin Protection",
    ],
    video: sharedManufacturingFootage,
  },
  {
    id: "process-improvement",
    title: "Process Improvement",
    badge: "Throughput & Flow",
    description:
      "Find bottlenecks and improve the way work moves through your facility—from production to delivery.",
    focusAreas: [
      "Bottleneck Removal",
      "Lead Time Reduction",
      "Shop-Floor Flow",
      "Process Mapping",
    ],
    video: sharedManufacturingFootage,
  },
  {
    id: "quality-consistency",
    title: "Quality & Consistency",
    badge: "Zero Defects & Standards",
    description:
      "Build processes that produce more consistent results and reduce defects, rework, and waste.",
    focusAreas: [
      "Defect Reduction",
      "Rework Minimization",
      "Standardized Quality Controls",
      "Scrap Reduction",
    ],
    video: sharedManufacturingFootage,
  },
  {
    id: "productivity-improvement",
    title: "Productivity Improvement",
    badge: "Capacity & Utilization",
    description:
      "Help your people and equipment perform more effectively without simply adding more resources.",
    focusAreas: [
      "OEE Improvement",
      "Labor Productivity",
      "Asset Utilization",
      "Capacity Maximization",
    ],
    video: sharedManufacturingFootage,
  },
  {
    id: "sustainable-improvements",
    title: "Sustainable Improvements",
    badge: "Continuous Improvement",
    description:
      "Put practical systems in place so improvements continue long after the consulting engagement ends.",
    focusAreas: [
      "Continuous Improvement Systems",
      "Kaizen & Lean Culture",
      "Sustained Performance",
      "Operational Governance",
    ],
    video: sharedManufacturingFootage,
  },
];

const mediaControlClass =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const soundControlClass =
  "inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 text-white transition duration-200 hover:scale-[1.02] hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function NicheFocus() {
  const [activeId, setActiveId] = useState(improvementCategories[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audible, setAudible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const soundPrefRef = useRef(false);
  const audibleRef = useRef(false);
  const inViewRef = useRef(false);
  const playbackTokenRef = useRef(0);
  const reduceMotionRef = useRef(false);
  const fadeStateRef = useRef<FadeState>({ frame: null, cancel: null });

  const active =
    improvementCategories.find((item) => item.id === activeId) ?? improvementCategories[0];
  const activeTabId = `improvement-tab-${active.id}`;

  const fadeMs = () => (reduceMotionRef.current ? 0 : AUDIO_FADE_MS);

  const setSoundAudible = (next: boolean) => {
    audibleRef.current = next;
    setAudible(next);
  };

  const saveSoundPreference = (enabled: boolean) => {
    try {
      window.localStorage.setItem(SOUND_PREFERENCE_KEY, String(enabled));
    } catch {
      // Storage can be unavailable in private browsing or restricted environments.
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduceMotionRef.current = media.matches;
      setReduceMotion(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    try {
      soundPrefRef.current =
        window.localStorage.getItem(SOUND_PREFERENCE_KEY) === "true";
    } catch {
      soundPrefRef.current = false;
    }
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const fadeState = fadeStateRef.current;
    if (!frame) return;

    const playInView = async () => {
      const video = videoRef.current;
      const audio = audioRef.current;
      if (!video || !audio || isFrameFullscreen(frame)) return;
      const token = ++playbackTokenRef.current;
      if (video.paused) {
        video.muted = true;
        try {
          await video.play();
        } catch {
          if (token === playbackTokenRef.current) setIsPlaying(false);
          return;
        }
      }
      if (token !== playbackTokenRef.current) return;
      setIsPlaying(true);
      audio.muted = true;
      audio.volume = 0;
      void audio.play().catch(() => {});
      if (!soundPrefRef.current) {
        setSoundAudible(false);
        return;
      }
      try {
        await audio.play();
        await fadeVolume(audio, 1, fadeMs(), fadeStateRef.current);
      } catch {
        return;
      }
      if (token === playbackTokenRef.current) setSoundAudible(true);
    };

    const pauseOutOfView = async () => {
      const video = videoRef.current;
      const audio = audioRef.current;
      if (!video || !audio || isFrameFullscreen(frame)) return;
      if (video.paused && audio.paused) {
        setIsPlaying(false);
        setSoundAudible(false);
        return;
      }
      const token = ++playbackTokenRef.current;
      try {
        await fadeVolume(audio, 0, fadeMs(), fadeStateRef.current);
      } catch {
        return;
      }
      if (token !== playbackTokenRef.current) return;
      video.pause();
      audio.pause();
      setIsPlaying(false);
      setSoundAudible(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        inViewRef.current = visible;
        if (visible) void playInView();
        else void pauseOutOfView();
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(frame);
    return () => {
      observer.disconnect();
      fadeState.cancel?.();
    };
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      const frame = frameRef.current;
      const video = videoRef.current;
      const audio = audioRef.current;
      const activeFullscreen = isFrameFullscreen(frame);
      setIsFullscreen(activeFullscreen);
      if (!video || !audio) return;

      if (activeFullscreen) {
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            audio.muted = true;
            audio.volume = 0;
            return audio.play();
          })
          .then(() => {
            if (!soundPrefRef.current) return;
            return fadeVolume(audio, 1, fadeMs(), fadeStateRef.current);
          })
          .then(() => setSoundAudible(soundPrefRef.current))
          .catch((error: unknown) => {
            if (error instanceof Error && error.message === "fade-cancelled") return;
            setIsPlaying(false);
          });
        return;
      }

      const preferSound = soundPrefRef.current;
      setSoundAudible(preferSound);
      void fadeVolume(audio, preferSound ? 1 : 0, fadeMs(), fadeStateRef.current).catch(() => {});
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio || !inViewRef.current || isFrameFullscreen(frameRef.current)) return;
    let cancelled = false;
    video.muted = true;
    video
      .play()
      .then(() => {
        if (cancelled) return;
        setIsPlaying(true);
        audio.muted = true;
        audio.volume = 0;
        void audio.play().catch(() => {});
        if (!soundPrefRef.current) return;
        return audio.play().then(() => fadeVolume(audio, 1, fadeMs(), fadeStateRef.current));
      })
      .then(() => {
        if (!cancelled && soundPrefRef.current) setSoundAudible(true);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.message === "fade-cancelled") return;
        if (!cancelled) setIsPlaying(false);
      });
    return () => {
      cancelled = true;
    };
  }, [active.video]);

  const togglePlayback = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    const token = ++playbackTokenRef.current;
    if (video.paused) {
      video.muted = true;
      video
        .play()
        .then(() => {
          if (token !== playbackTokenRef.current) return;
          setIsPlaying(true);
          audio.muted = true;
          audio.volume = 0;
          void audio.play().catch(() => {});
          if (soundPrefRef.current) {
            return audio.play().then(() => fadeVolume(audio, 1, fadeMs(), fadeStateRef.current));
          }
          setSoundAudible(false);
        })
        .then(() => {
          if (token !== playbackTokenRef.current) return;
          if (soundPrefRef.current) setSoundAudible(true);
        })
        .catch((error: unknown) => {
          if (error instanceof Error && error.message === "fade-cancelled") return;
          if (token === playbackTokenRef.current) setIsPlaying(false);
        });
      return;
    }

    fadeVolume(audio, 0, fadeMs(), fadeStateRef.current)
      .then(() => {
        if (token !== playbackTokenRef.current) return;
        video.pause();
        audio.pause();
        setIsPlaying(false);
        setSoundAudible(false);
      })
      .catch(() => {});
  };

  const toggleSound = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    const next = !audibleRef.current;
    soundPrefRef.current = next;
    saveSoundPreference(next);
    setSoundAudible(next);
    const token = ++playbackTokenRef.current;

    if (next && video.paused) {
      video.muted = true;
      video
        .play()
        .then(() => {
          audio.muted = true;
          audio.volume = 0;
          return audio.play();
        })
        .then(() => fadeVolume(audio, 1, fadeMs(), fadeStateRef.current))
        .then(() => {
          if (token === playbackTokenRef.current) setIsPlaying(true);
        })
        .catch((error: unknown) => {
          if (error instanceof Error && error.message === "fade-cancelled") return;
          if (token !== playbackTokenRef.current) return;
          soundPrefRef.current = false;
          saveSoundPreference(false);
          setSoundAudible(false);
          setIsPlaying(false);
        });
      return;
    }

    if (next && audio.paused) {
      audio.muted = true;
      audio.volume = 0;
      void audio
        .play()
        .then(() => fadeVolume(audio, 1, fadeMs(), fadeStateRef.current))
        .catch(() => {
          soundPrefRef.current = false;
          saveSoundPreference(false);
          setSoundAudible(false);
        });
      return;
    }

    void fadeVolume(audio, next ? 1 : 0, fadeMs(), fadeStateRef.current).catch(() => {});
  };

  const toggleFullscreen = async () => {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      if (isFrameFullscreen(frame)) {
        const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
        if (document.exitFullscreen) await document.exitFullscreen();
        else await doc.webkitExitFullscreen?.();
        return;
      }
      const host = frame as FullscreenHost;
      if (frame.requestFullscreen) await frame.requestFullscreen();
      else host.webkitRequestFullscreen?.();
    } catch {
      setIsFullscreen(isFrameFullscreen(frame));
    }
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = improvementCategories.length - 1;
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index === last ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index === 0 ? last : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    const next = improvementCategories[nextIndex];
    setActiveId(next.id);
    document.getElementById(`improvement-tab-${next.id}`)?.focus();
  };

  return (
    <section
      id="industries"
      className="scroll-mt-28 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeIn className="mb-8 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            What We Help You Improve
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            We don&apos;t just identify problems—we work with your team to turn them into measurable
            improvements.
          </p>
        </FadeIn>

        <FadeIn className="mb-8">
          <IndustryTicker />
        </FadeIn>

        <div
          id="improvement-showcase"
          role="tabpanel"
          aria-labelledby={activeTabId}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div
            ref={frameRef}
            className="relative aspect-video bg-slate-950 [&:fullscreen]:aspect-auto [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none [&:fullscreen]:bg-black [&:-webkit-full-screen]:aspect-auto [&:-webkit-full-screen]:h-screen [&:-webkit-full-screen]:w-screen [&:-webkit-full-screen]:bg-black"
          >
            <AnimatePresence initial={false}>
              <motion.video
                key={active.video}
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={active.video}
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-label={`${active.title} manufacturing footage`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                onPlay={(event) => {
                  if (event.currentTarget === videoRef.current) setIsPlaying(true);
                }}
                onPause={(event) => {
                  if (event.currentTarget === videoRef.current) setIsPlaying(false);
                }}
              />
              <audio ref={audioRef} src={showcaseSoundtrack} loop preload="metadata" muted />
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-slate-950/10"
              aria-hidden
            />

            <div className="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-200 hover:bg-white/15 sm:right-4 sm:bottom-4">
              <button
                type="button"
                onClick={togglePlayback}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                title={isPlaying ? "Pause video" : "Play video"}
                className={mediaControlClass}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" aria-hidden />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={audible}
                aria-label={audible ? "Turn soundtrack off" : "Turn soundtrack on"}
                title={audible ? "Turn soundtrack off" : "Turn soundtrack on"}
                className={soundControlClass}
              >
                {audible ? (
                  <Volume2 className="h-4 w-4 shrink-0" aria-hidden />
                ) : (
                  <VolumeX className="h-4 w-4 shrink-0" aria-hidden />
                )}
                <span className="hidden text-xs font-semibold sm:inline">
                  {audible ? "Sound on" : "Sound off"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                aria-pressed={isFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className={mediaControlClass}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" aria-hidden />
                ) : (
                  <Maximize className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>

            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pr-32 sm:p-6 sm:pr-48 lg:p-8 lg:pr-52"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              >
                <p className="text-[11px] font-bold tracking-[0.16em] text-emerald-300 uppercase">
                  {active.badge}
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  {active.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className="border-t border-slate-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-slate-800"
          >
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {active.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {active.focusAreas.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 sm:text-sm dark:text-slate-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Music by Vaitsez, via Pixabay.
            </p>
          </motion.div>
        </div>

        <div
          role="tablist"
          aria-label="Improvement categories"
          className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {improvementCategories.map((category, index) => {
            const isActive = category.id === active.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`improvement-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls="improvement-showcase"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`relative flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-center text-sm leading-snug transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isActive
                    ? "border-emerald-700 bg-emerald-600 font-bold text-white shadow-md shadow-emerald-900/15"
                    : "border-slate-200 bg-white font-semibold text-slate-800 shadow-sm hover:border-emerald-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800"
                }`}
              >
                {isActive && (
                  <Check
                    className="absolute left-3 h-4 w-4 shrink-0"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                )}
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
