import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { ArrowRight } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';

function FundamentalPlanPage() {
  const sections = [
    {
      title: "Market Dashboards | See What Others Don't",
      description: 
      <>
        Track capital flows, spot regime shifts, and get a <strong> macro-level read</strong> on the entire crypto space.
  </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751444123/BTCUSD_2025-07-02_08-41-53_e819b_r4nfb3.webp",
      features: [
     <>
      Breadth & Momentum Indexes —&nbsp; <em> know when the tide's turning </em>
  </>,
     <>
      BTC/ETH Valuation Models —&nbsp; <em> avoid tops, buy smarter dips </em>
  </>,
     <>
      Altseason Radar & Speculation Index —&nbsp; <em> time rotations with clarity</em>
  </>,
     <>
      MVRV, NUPL, Stablecoin Supply —&nbsp; <em> see where capital really is</em>
  </>,
     <>
      Beta, Correlation & Regime Filters —&nbsp; <em> align with the trend, not against it</em>
  </>
]
    },
    {
      title: "Technical Tools | Learn + Earn",
      description: 
      <>
        Easy-to-use, powerful indicators designed to help you <strong> build confidence </strong> and spot real entries.
      </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749058955/QuantEdgeB_Crypto_Trading_Basic_1.png",
      features: [
      <>   
        Trend tools like DEMA, Z-SMMA, PRC-EPMA —&nbsp; <em> smooth, directional clarity</em>
  </>,
      <>
        Volatility & Momentum overlays —&nbsp; <em> catch explosive setups early</em>
  </>,
      <> 
        RSI/Deviation Signals —&nbsp; <em> avoid emotional exits</em>
  </>,
      <>
        Gaussian & For-Loop systems —&nbsp; <em> advanced logic, simplified</em>
  </>
      ]
    },
    {
      title: "Backtest + Risk Management Suite",
      description: 
       <> 
        Know your edge before you trade. Smart tools to help you <strong> test, tweak, and trust </strong> your setups.
    </>,
      
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751443990/BTCUSD_2025-07-02_09-52-06_bede4_ftoqlq.webp",
      features: [
       <> 
        Backtesting Templates —&nbsp; <em> see what works (and what doesn't)</em>
  </>,
       <> 
        Position Sizing Models —&nbsp; <em> protect your stack with logic</em>
  </>,
       <>
        Stop Loss Tool —&nbsp; <em> automate downside defense</em>
  </>
      ]
    },
    {
      title: "Education + Daily Fuel",
      description: 
        
        <>
        You're not just buying tools. You're joining a system that <strong> keeps you sharp and synced with the market.</strong>
   </>,
      
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751443862/Education_kov1ec.webp",
      features: [
        <>
      Daily&thinsp;/&thinsp;Weekly Market Reports —&nbsp; <em> skip noise, get real context</em>
</>,
        <>
      Mindset Lessons —&nbsp; <em> kill doubt, sharpen conviction</em>
 </>,
        <>
      Private Discord Access —&nbsp; <em> ask, share, learn alongside other focused traders</em>
 </>
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
            colors={["#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={12}
            className="text-5xl md:text-5xl font-bold mb-6"
          >
            Fundamental Tier
          </GradientText>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-100">
            Your Core System for Smarter Crypto Moves
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
      <span className="font-semibold italic">This is where serious traders start.</span>
      <br /><br />
    The Fundamental Tier gives you a clear framework to understand the market, manage risk, and start trading with 
      <span className="font-bold italic"> confidence</span> — not chaos.
      <br /><br />
    Built for <span className="font-semibold">hustlers</span> who want <span className="italic">structure</span>, not noise.
      <br />
      <span className="font-bold">No hype. No mess.</span> Just tools, data, and logic that actually move the needle.
  </p>
        </motion.div>

        <div className="space-y-32">
          {sections.map((section, index) => (
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
                      src={section.image}
                      alt={section.title}
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {section.title}
                </h2>
                <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                  {section.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-base md:text-lg leading-relaxed">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="text-white group rounded-md inline-flex items-center"
                  onClick={() => window.open('https://whop.com/quantedgeb/?a=quantedge17', '_blank')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 text-center bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Who Is This For?
          </h3>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            If you're building your first real structure, want to grow your edge with smart, risk-aware tools, and are done relying on X vibes —<span className="font-bold italic"> this is your basecamp.</span>

          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default FundamentalPlanPage;