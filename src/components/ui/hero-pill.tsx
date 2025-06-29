import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface HeroPillProps {
  href: string
  label: string
  announcement?: string
  className?: string
  isExternal?: boolean
}

export function HeroPill({ 
  href, 
  label, 
  announcement = "📣 Announcement",
  className,
  isExternal = false,
}: HeroPillProps) {
  const Component = isExternal ? motion.a : motion(Link);
  const linkProps = isExternal 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  return (
    <Component
      {...linkProps}
      className={cn(
        "flex w-auto items-center space-x-2 rounded-full cursor-pointer",
        "bg-primary/20 ring-1 ring-accent",
        "px-2 py-1 whitespace-pre",
        "hover:bg-primary/30 hover:ring-accent/50",
        "hover:scale-105 active:scale-95",
        "relative z-10",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn(
        "w-fit rounded-full bg-accent px-2 py-0.5",
        "text-xs font-medium text-primary sm:text-sm",
        "text-center transition-colors duration-300"
      )}>
        {announcement}
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm transition-colors duration-300">
        {label}
      </p>
      <motion.svg
        width="12"
        height="12"
        className="ml-1"
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