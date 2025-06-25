import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlareCard } from '../components/ui/glare-card';
import { Link } from 'react-router-dom';


const services = [
  {
    title: "Major Rotation",
    description: "Optimize Exposure, Eliminate Regret",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Major_Rotation.webp"
  },
  {
    title: "Long-Term Valuation",
    description: "Low Entries. Long Horizons. High Conviction.",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Long_Term_Valuation.webp"
  },
  {
    title: "Value Suite",
    description: "Decode Market Regimes · Define Opportunity Zones",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Value_Suite.webp"
  },
  {
    title: "Portfolio Pro",
    description: "Risk Management Made Easy",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Portfolio_Pro.webp"
  },
  {
    title: "Trading Suite",
    description: "Navigate. Analyze. Conquer",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Trading_Suite.webp"
  },
  {
    title: "Altcoin Edge",
    description: "Rotate Smart. Ride Momentum. Exit Weakness.",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Altcoin_Edge.webp"
  }
];


export const Services: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200">
            Our Edge, Your Advantage
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trade smarter with strategies built to minimize risk, maximize gains, and eliminate guesswork.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {services.map((service, index) => (
                <div key={index} className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] md:flex-[0_0_30%]">
                  <Link to="/products">
  <GlareCard className="relative group cursor-pointer h-[240px] md:h-[320px]">
    <img
      src={service.image}
      alt={service.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-300 text-sm">
        {service.description}
      </p>
    </div>
  </GlareCard>
</Link>

                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};