"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface HeroPillProps {
  href: string
  label: string
  announcement?: string
  className?: string
  isExternal?: boolean
  animated?: boolean
}

export function HeroPill({ 
  href, 
  label, 
  announcement = "📣 Announcement",
  className,
  isExternal = false,
  animated = false,
}: HeroPillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const announcements = [
    { badge: "🎁 Free", text: "Get Free Indicators" },
    { badge: "⚡ Alert", text: "Prices increase in 1 week! Get your plans locked-in for life today" }
  ];

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [animated, announcements.length]);

  const Component = isExternal ? motion.a : motion(Link);
  const linkProps = isExternal 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  const currentAnnouncement = animated ? announcements[currentIndex] : { badge: announcement, text: label };

  return (
    <Component
      {...linkProps}
      className={cn(
        "flex w-auto items-center space-x-2 rounded-full cursor-pointer",
        "bg-primary/20 ring-1 ring-accent",
        "px-2 py-1 whitespace-pre",
        "hover:bg-primary/30 hover:ring-accent/50",
        "hover:scale-105 active:scale-95",
        "relative z-10 overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn(
        "w-fit rounded-full bg-accent px-2 py-0.5",
        "text-xs font-medium text-primary sm:text-sm",
        "text-center transition-colors duration-300 flex-shrink-0"
      )}>
        <AnimatePresence mode="wait">
          <motion.span
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, filter: "blur(4px)", x: -10 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", x: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentAnnouncement.badge}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div className="flex-1 min-w-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={`text-${currentIndex}`}
            className="text-xs font-medium text-primary sm:text-sm transition-colors duration-300 truncate"
            initial={{ opacity: 0, filter: "blur(4px)", x: -15 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", x: 15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentAnnouncement.text}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <motion.svg
        width="12"
        height="12"
        className="ml-1 flex-shrink-0"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="currentColor"
          className="text-primary"
        />
      </motion.svg>
    </Component>
  )
}