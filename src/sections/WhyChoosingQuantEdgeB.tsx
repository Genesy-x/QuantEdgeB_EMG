import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';
import { Button } from '../components/ui/button';

export const WhyChoosingQuantEdgeB: React.FC = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  
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
          <Carousel
            setApi={setCarouselApi}
            opts={{
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {reasons.map((reason, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                          {reason.title}
                        </h3>
                        <p className="text-gray-200 text-lg md:text-xl italic mb-6 leading-relaxed">
                          {reason.testimonial}
                        </p>
                        <p className="text-gray-400 text-sm mb-6">
                          – {reason.author}
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {reason.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Navigation arrows positioned at middle bottom */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full bg-gray-900/80 hover:bg-gray-800/80 backdrop-blur-sm transition-colors border border-gray-700 hover:border-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-700 w-6' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => carouselApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full bg-gray-900/80 hover:bg-gray-800/80 backdrop-blur-sm transition-colors border border-gray-700 hover:border-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};