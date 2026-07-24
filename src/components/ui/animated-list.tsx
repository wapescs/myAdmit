"use client";

import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function AnimatedList({
  children,
  className,
  itemDelay = 0.1,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  itemDelay?: number;
  y?: number;
}) {
  const items = Children.toArray(children);

  return (
    <div className={cn(className)}>
      {items.map((child, i) => (
        <motion.div
          key={isValidElement(child) && child.key != null ? child.key : i}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * itemDelay }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
