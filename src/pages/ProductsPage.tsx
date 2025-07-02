import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';

function ProductsPage() {
  const products = [
    {
      title: "Major Rotation",
      description: <> 
      <strong><em>MajorRotation</em></strong> tracks capital flow, relative strength, and macro shifts in real time — rotating you into outperforming assets <strong>before anyone</strong>. <br/>Built for traders who want their capital working where momentum is strongest.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751445621/BTCUSD_2025-07-02_10-39-07_8ba42_wbhmoq.webp",
      features: [
        "Auto-identifies top-performing sectors/assets",
        "Moves capital out of weakness, into strength",
        "Designed for macro-cycle and sector rotation traders",
        "Keeps your positioning optimized without manual guesswork"
      ]
    },
    {
      title: "Long-Term Valuation",
      description: <>
      A hybrid model blending macro fundamentals, sentiment data, and technical filters — built to identify <strong>deep value zones</strong> and <strong>early accumulation</strong> ranges. <br/>
        Whether you're DCA'ing or building core positions, this model helps you buy <strong>conviction</strong>, not <em>hype</em>.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751445780/BTCUSD_2025-07-02_10-42-25_c7943_oy3xes.webp",
      features: [
        "Highlights undervalued zones for long-term setups",
        "Merges sentiment, valuation, and technical timing",
        "Perfect for portfolio builders and DCA strategies",
        "Signals early-stage accumulation with data-backed clarity"
      ]
    },
    {
      title: "Value Suite",
      description: <>
      The Value Suite gives you a multi-layered view of asset health — highlighting <strong>true value zones</strong> while flagging overheated or extended conditions. Designed to <em>cut emotion</em>, <strong>add discipline</strong>, and adapt to market regime shifts.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751445904/ETHUSD_2025-07-02_08-38-55_fbb0c_gqezi9.webp",
      features: [
        "Differentiates value vs. overextension",
        "Reduces emotion-driven decisions",
        "Identifies clear entry/exit based on structure and regime",
        "Flexible across asset classes with adjustable logic"
      ]
    },
    {
      title: "Portfolio Pro",
      description: <>
      Portfolio Pro is your portfolio's autopilot — dynamically balancing exposure, correlations, and volatility across positions. <br/>
        Whether you're <em>passive</em> or <em>active</em>, this system keeps your risk distribution <strong>efficient</strong> and <strong>responsive</strong>.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Portfolio_Pro.webp",
      features: [
        "Allocates and redistributes risk across trades",
        "Tracks correlation shifts and volatility in real time",
        "Maintains portfolio balance without over-management",
        "Built for serious risk control in multi-asset portfolios"
      ]
    },
    {
      title: "Trading Suite",
      description: <>
      This <strong>all-in-one suite</strong> is the core technical engine behind our <strong><em>Premium+</em></strong> tier. It integrates advanced momentum, trend, volatility, and reversal detection into one seamless interface — giving you tactical clarity across any trade.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Trading_Suite.webp",
      features: [
        "Integrated system covering trend, volatility & momentum",
        "Ideal for short to mid-term trading setups",
        "Fully adaptable within your TradingView workspace",
        "Designed for traders who demand fast, decisive entries"
      ]
    },
    {
      title: "Altcoin Edge",
      description: <>
      <strong><em>Altcoin Edge</em></strong> was made for the chaos of low-liquidity, high-velocity <em>alt markets</em>. It detects early bursts of strength, filters out false moves, and rotates you into the <strong>highest-momentum asset</strong> — <em>before the crowd notices</em>.
         </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751446054/BTCUSD_2025-07-02_10-46-37_99e9d_qk16gq.webp",
      features: [
        "Detects early momentum surges in altcoins",
        "Auto-rotates into strongest performers",
        "Filters chop in low-liquidity environments",
        "Gives you speed and clarity where others get wrecked"
      ]
    }
  ];

  return (
    <main className="py-32 px-4 relative">
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <GradientText
            colors={["#9c40ff", "#ffaa40", "#9c40ff"]}
            animationSpeed={6}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Products
          </GradientText>
          <p className="text-gray-100 max-w-2xl mx-auto text-lg">
            Professional-grade trading tools designed to give you a decisive edge in every market condition.
          </p>
        </motion.div>

        <div className="space-y-32">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {product.title}
                </h2>
                <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                  {product.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-base md:text-lg leading-relaxed">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/plans/premium">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="text-white group rounded-md inline-flex items-center"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  I Want This
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
               </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;