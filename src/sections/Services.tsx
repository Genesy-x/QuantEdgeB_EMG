import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlareCard } from '../components/ui/glare-card';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';
import { Button } from '../components/ui/button';

const services = [
  {
    title: "Major Rotation",
    description: "Optimize Exposure, Eliminate Regret",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751445621/BTCUSD_2025-07-02_10-39-07_8ba42_wbhmoq.webp"
  },
  {
    title: "Long-Term Valuation",
    description: "Low Entries. Long Horizons. High Conviction.",
    image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751445780/BTCUSD_2025-07-02_10-42-25_c7943_oy3xes.webp"
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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
          <Carousel
            setApi={setCarouselApi}
            opts={{
              loop: true,
              align: 'start',
              dragFree: true,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] md:flex-[0_0_30%]">
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
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {services.map((_, index) => (
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
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};