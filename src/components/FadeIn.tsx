"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition">;

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
