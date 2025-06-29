import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { ArrowRight } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';

function PremiumPlanPage() {
  const premiumSections = [
    {
      title: "Full-Cycle Market Systems",
      description: 
        <>
        Built to track macro-to-micro dynamics and help you act with clarity—not emotion.
</>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749058278/QuantEdgeB_Crypto_Trading_SDCA.png",
      features: [
        <>
        Includes everything in&nbsp; <em> <strong> Fundamental Tier </strong> </em>
</>,
        <>
Universal Trend Models —&nbsp; <em> follow strength, filter chop</em>
</>,
        <>
Valuation Engines —&nbsp; <em> trade smarter entries, skip hype tops</em>
</>,
        <>
Advanced Signal Systems —&nbsp; <em> convergence-based entries that hit</em>
</>,
        <>
Long-Term Cycle Tools —&nbsp; <em> stop reacting, start anticipating</em>
</>
      ]
    }
  ];

  const tradingSuiteSections = [
    {
      title: "Precision Tools for Fast, Focused Traders",
      description: 
        <>
        Built for traders who need <strong>tactical precision</strong> and real-time execution clarity.
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749072173/QuantEdgeB_Crypto_Trading_Premium_Standard.png",
      features: [
        <>
        Everything in Premium —&nbsp; <em> full foundation + advanced systems</em>
        </>,
        <>
        Adaptive Pulsar Momentum —&nbsp; <em> catch acceleration before the crowd</em>
        </>,
        <>
        MA Thrust Engineer —&nbsp; <em> time breakouts with surgical precision</em>
        </>,
        <>
        Regime Reper —&nbsp; <em> know when the game changes</em>
        </>,
        <>
        TempoV & Volume Momentum —&nbsp; <em> read the market's heartbeat</em>
        </>
      ]
    },
    {
  title: "Engines Built for Execution Under Pressure",
  description: 
    <>
    These aren’t just indicators — they’re <strong>execution-grade systems</strong> crafted for fast, focused trading. Each engine is designed to cut delay, reduce hesitation, and give you the clarity to act when it matters most.
    <br/><br/>
    Built for volatility. Optimized for speed. Trusted when timing is everything.
    </>,
  image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Portfolio_Pro.webp",
  features: [
    "Lock in on early acceleration with layered confirmation",
    "Target breakout energy with dynamic moving average thrust logic",
    "Detect environment shifts and adapt instantly",
    "Measure trend speed and acceleration in real time",
    "Uncover hidden pressure behind price movement"
  ]
}

  ];

  const majorRotationSections = [
    {
      title: "Strategic Asset Rotation Tools",
      description: 
        <>
        Powered by <strong> alpha mapping, RS flow, and cycle timing. </strong>
        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749630079/QuantEdgeB_Crypto_Trading_Major_Rotation.webp",
      features: [
        <>
        Includes everything in&nbsp; <strong> <em> Premium </em> </strong>
        </>,
        <>
        RS Dashboards & Strength Engines —&nbsp; <em> know what's working <strong> before </strong> CT catches on</em>
        </>,
        <>
        Cross-Timeframe Allocation —&nbsp; <em> position with alignment, not lag </em>
        </>,
        <>
        Altcoin/Meme Screeners —&nbsp; <em> turn narrative into opportunity </em>
        </>,
        <>
        MajorSync Protocol —&nbsp; <em> one view to map the whole board </em>
        </>
      ]
    },
    {
  title: "Rotation Intelligence for Aggressive Allocators",
  description: 
    <>
    These systems are built for traders who want to <strong>lead the rotation, not follow it</strong>. By combining deep strength analysis, capital flow filters, and macro alignment tools, you’ll know exactly <strong>where to be — and when to move.</strong>
    <br/><br/>
    Outperformers rise fast. This suite helps you catch them before they peak — and exit before they fade.
    </>,
  image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1749059061/QuantEdgeB_Crypto_Trading_Major_Sync.png",
  features: [
    "Rank strength with heat-mapped intensity and cycle context",
    "Track outliers early in emerging momentum waves",
    "Synchronize views across timeframes for total clarity",
    "Universal strength logic across any asset or sector",
    "Capitalize on narrative-driven breakouts with signal filtering"
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
            colors={["#9c40ff", "#40aaff", "#9c40ff"]}
            animationSpeed={6}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Premium Tier
          </GradientText>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-100">
            Your System for Strategy, Timing & Long-Term Edge
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          <span className = "font-semibold italic"> You've got the basics down. Now it's time to start thinking like a pro. </span> 
            <br/><br/>
The Premium Tier gives you <span className = "font-bold"> cycle-level </span> vision and <span className = "font-bold"> tactical-level </span> control. 
            <br/>
See when to enter, exit, rotate, and why — across any asset, any timeframe.
            <br/><br/>
<span className = "font-bold">Less second-guessing. More systems, more certainty. </span>

          </p>
        </motion.div>

        {/* Premium Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Premium
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
              Your Tactical Shift, From Understanding to Systemizing
            </h3>
            <p className="text-gray-300 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
              Time to level up — <strong> embrace the systematic framework.</strong>
<br/><br/>

              The Premium Tier gives you a modular strategy framework that bridges macro clarity and market timing.<br/>
Get the tools to track cycles, time entries, rotate assets, and build dynamic positioning.
              <br/><br/>
            <strong> All with logic, nothing with guesswork. </strong>
            </p>
          </motion.div>

          <div className="space-y-32">
            {premiumSections.map((section, index) => (
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
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {section.title}
                  </h3>
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
        </div>

        {/* Premium+ | TradingSuite Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Premium+ | TradingSuite
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
              Full-Spectrum Technical Strategy Engine 
            </h3>
            <p className="text-gray-300 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
              This one's for the <strong> technician at heart. </strong> <br/><br/>
The TradingSuite unlocks a custom-built strategy engine for <strong> active day and swing traders </strong>, with tools that help you catch fast moves, adjust mid-cycle, and execute with serious confidence.
            </p>
          </motion.div>

          <div className="space-y-32">
            {tradingSuiteSections.map((section, index) => (
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
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-900 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-base md:text-lg leading-relaxed">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
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
        </div>

        {/* Premium+ | MajorRotation Suite Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Premium+ | MultiEdgeSuite
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
              Trade Like Strength Always Wins <em> (Because It Does) </em>
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              This one's for the <strong> allocation masters and cycle readers. </strong> <br/><br/>
The MajorRotation Suite helps you stay in the winners and rotate out of the weak — <em>fast.</em> <br/><br/>
<strong>Follow flows. Spot leaders. Allocate with logic.</strong>
            </p>
          </motion.div>

          <div className="space-y-32">
            {majorRotationSections.map((section, index) => (
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
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-900 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-base md:text-lg leading-relaxed">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
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
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32"
        >
          <div className="bg-black-900/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
                Premium vs. Premium+
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-center py-4 px-6 text-lg md:text-xl font-bold text-white">Tier</th>
                      <th className="text-center py-4 px-6 text-lg md:text-xl font-bold text-white">Best For</th>
                      <th className="text-center py-4 px-6 text-lg md:text-xl font-bold text-white">What It Adds</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-6 px-6 text-base md:text-lg font-semibold text-blue-400">Premium</td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Serious traders who want macro/micro clarity and confidence</td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Universal systems for timing, value, and strategy</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-6 px-6 text-base md:text-lg font-semibold text-green-400">TradingSuite</td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Day & swing traders who want <strong>precision execution tools</strong></td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Tactical models for momentum, volatility, and regime shifts</td>
                    </tr>
                    <tr>
                      <td className="py-6 px-6 text-base md:text-lg font-semibold text-purple-400">MultiEdgeSuite</td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Portfolio builders optimizing for <strong>strength-based allocation</strong></td>
                      <td className="py-6 px-6 text-gray-200 text-sm md:text-base">Full asset rotation & alpha mapping ecosystem</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default PremiumPlanPage;