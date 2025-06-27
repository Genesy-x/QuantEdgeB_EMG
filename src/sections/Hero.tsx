import React, { useEffect, useRef } from 'react';
import { RainbowButton } from '../components/ui/rainbow-button';
import { BlurIn } from '../components/ui/blur-in';
import { TextShimmer } from '../components/ui/text-shimmer';

export const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const titleElement = titleRef.current;
    if (titleElement) {
      observer.observe(titleElement);
    }
    
    return () => {
      if (titleElement) {
        observer.unobserve(titleElement);
      }
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div 
        ref={titleRef}
        className="text-center max-w-5xl mx-auto opacity-100 translate-y-0 transition-all duration-1000 ease-out"
      >
        
<div className="mb-16">
  <BlurIn
    word="QuantEdgeB"
    className="metallic-text text-7xl md:text-9xl pb-4 font-bold tracking-tight"
    duration={1.0}
  />
  
  <p className="text-3xl md:text-4xl mt-8 whitespace-nowrap flex justify-center">
    <span className="text-gray-300">Trading Made</span>
    
    <TextShimmer
      as="span"
      duration={3.5}
      spread={2}
      className="ml-2 italic font-bold text-transparent bg-clip-text 
                 bg-gradient-to-r from-blue-400 to-blue-800 
                 dark:from-blue-500 dark:to-blue-300 
                 text-3xl md:text-4xl"
    >
      Easy
    </TextShimmer>
  </p>
</div>

        
        <div className="flex flex-col sm:flex-row gap-10 justify-center">
          <RainbowButton 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Services
          </RainbowButton>
          <RainbowButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </RainbowButton>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <svg 
          className="w-6 h-6 text-gray-500" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};