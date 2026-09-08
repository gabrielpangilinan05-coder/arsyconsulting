import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  /** Circular white badge — for dark headers */
  circular?: boolean;
  title?: string;
  priority?: boolean;
}

/**
 * Official Arsy Consulting logo (`/logo.png`).
 * Never uses brightness/invert (that turns white-bg PNGs into a solid white box).
 */
export default function Logo({
  width = 160,
  height = 48,
  className = "h-9 w-auto object-contain",
  circular = false,
  title = "Arsy Consulting",
  priority = false,
}: LogoProps) {
  if (circular) {
    return (
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-white/20">
        <Image
          src="/logo.png"
          alt={title}
          width={44}
          height={44}
          priority={priority}
          className="h-[78%] w-[78%] object-contain"
        />
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt={title}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
