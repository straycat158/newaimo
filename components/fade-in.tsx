'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function FadeIn({ children, delay = 0, y = 24, className }: FadeInProps) {
  const hidden = { opacity: 0, y };
  const visible = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.3 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
