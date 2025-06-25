"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageBlurInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const PageBlurIn = ({ 
  children, 
  className, 
  duration = 1., 
  delay = 0 
}: PageBlurInProps) => {
  const variants = {
    hidden: { 
      filter: "blur(10px)", 
      opacity: 0,
      y: 20
    },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1,
      y: 0
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ 
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export { PageBlurIn };