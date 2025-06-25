import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';

export const WhyChoosingQuantEdgeB: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const reasons = [
    {
      title: "Unique Tools That Deliver Real Results",
      testimonial: "\"The indicators and strategies are super useful and unique… just go for it and thank yourself later.\"",
      author: "Flying_N3k0",
      body: "Our systems aren't recycled templates—they're uniquely engineered to give you a real edge, every time you trade.",
      glowColor: 'blue' as const
    },
    {
      title: "Daily Analysis That Adds Real Value",
      testimonial: "\"Great ongoing analysis and top-level trading tools.\"",
      author: "James Chterev",
      body: "Stay ahead with consistent market updates, insights, and tactical recommendations—all built into your membership.",
      glowColor: 'purple' as const
    },
    {
      title: "Trusted by Beginners and Pros Alike",
      testimonial: "\"Perfect confluence with my systems… I decided to purchase a lifetime subscription.\"",
      author: "ZarefTheMystogan",
      body: "Whether you're just starting or trading full-time, QuantEdgeB integrates easily with your style and scales with your strategy.",
      glowColor: 'green' as const
    },
    {
      title: "Drastically Improves Trading Confidence",
      testimonial: "\"These tools help me personally on a day-to-day basis when analysing the market.\"",
      author: "ZERO444",
      body: "Our users report better decision-making, increased confidence, and faster clarity in every market condition.",
      glowColor: 'blue' as const
    },
    {
      title: "Exceptional Support and Constant Innovation",
      testimonial: "\"Very communicative… includes updates, activity, and powerful diversification tools.\"",
      author: "Joao Coelho",
      body: "You're not just buying tools—you're joining a responsive, constantly evolving ecosystem designed for your success.",
      glowColor: 'purple' as const
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reasons.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reasons.length - 1 : prevIndex - 1
    );
  };
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 9000);
    
    return () => {
      resetTimeout();
    };
  }, [currentIndex]);
  
  return (
    <section id="why-choosing" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200">
            Why Choosing QuantEdgeB
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Discover what makes our community choose us and see the real impact on their trading success.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                layout
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full min-h-[350px] md:min-h-[400px]"
              >
                <div className="relative h-full rounded-2xl border-[0.75px] border-gray-800 p-0.5">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative h-full flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-[10px] p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {reasons[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 text-lg md:text-xl italic mb-6 leading-relaxed">
                      {reasons[currentIndex].testimonial}
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                      – {reasons[currentIndex].author}
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {reasons[currentIndex].body}
                    </p>
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex gap-2">
                        {reasons.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                              index === currentIndex 
                                ? 'bg-gradient-to-r from-blue-400 to-blue-700 w-6' 
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 rounded-full 
                     bg-gray-900/80 hover:bg-gray-800/80 backdrop-blur-sm transition-colors
                     border border-gray-700 hover:border-gray-600 group"
            aria-label="Previous reason"
          >
            <ChevronLeft className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full 
                     bg-gray-900/80 hover:bg-gray-800/80 backdrop-blur-sm transition-colors
                     border border-gray-700 hover:border-gray-600 group"
            aria-label="Next reason"
          >
            <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};