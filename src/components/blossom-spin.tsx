"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Blossom } from "./blossom";

type BlossomSpinProps = {
  className?: string;
};

export function BlossomSpin({ className = "" }: BlossomSpinProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Blossom className={className} />;
  }

  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 90, ease: "linear", repeat: Infinity }}
    >
      <Blossom className="size-full" />
    </motion.div>
  );
}
