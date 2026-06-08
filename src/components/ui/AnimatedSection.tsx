import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedSection({
  children,
  delay = 0,
  className = "",
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & Omit<HTMLMotionProps<"section">, "children">) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
