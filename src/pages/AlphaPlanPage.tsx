import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { ArrowRight } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';

function AlphaPlanPage() {
  const sections = [
    {
      title: "Everything in Fundamental",
      description: "Macro dashboards. On-chain cycles. Sentiment regimes. Education, frameworks, and structure to build your analytical foundation the right way.",
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751475157/Alpha_Fundamrnta_tzcycc.webp",
      features: [
        "On-Chain & Macro Dashboards",
        "Breadth & Regime Filters",
        "Valuation Models",
        "Technical Signal Suite",
        "Education & Reports"
      ]
    },
    {
      title: "Everything in Premium+",
      description: "Full-spectrum active trading systems coupled with advanced relative strength and capital flow tools. Outperformance becomes the bare minimum.",
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751475158/Alpha_Premium_wd8eik.webp",
      features: [
        "TradingSuite",
        "Advanced Relative Strength Systems",
        "Asset Rotation Strategies",
        "Tactical Strategies",
        "Rotation Logic",
        "Priority Support"
      ]
    },
    {
      title: "System Deep Dive Lessons",
      description: 
        <>
        Get access to <strong> private educational modules </strong> that break down the core of every system.
Learn the <em> "why" </em> behind every signal—not just how to use it, but how it <em> thinks </em>."
          </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1750959396/QuantEdgeB_Crypto_Trading_System_Detailed.webp",
      features: [
        "Model logic & trade intent",
        "Design philosophy & structure",
        "Cross-signal relationships",
        "Success/failure case studies",
        "Tactical examples in real trades",
        "Weekly Live Analysis"
      ]
    },
    {
      title: "1-on-1 Mentorship",
      description: 
     <>
        Because mastery should never be one-size-fits-all.<br/>
Get <strong>direct sessions</strong> with the creator — to tweak, refine, adapt and accelerate.
</>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1751186459/QuantEdgeB_Crypto_Trading_1o1_Mentorship.png",
      features: [
        "Personal onboarding call",
        "Custom toolkit configuration",
        "Strategy reviews + trade feedback",
        "Real-time support and idea shaping",
        <>
        Bespoke planning for&nbsp;<em>your</em>&nbsp;assets, timeframe & vision
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
            colors={["#ff6b35", "#f7931e", "#ff6b35"]}
            animationSpeed={12}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Alpha Tier
          </GradientText>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
            Mastery, Tailored<br/> 
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Alpha is where the noise stops. <strong> More power, more control, more clarity.</strong><br/><br/>

From long-term cycle vision to real-time trade execution, this is the <strong> <em>full QuantEdgeB arsenal</em></strong>:<br/>
<strong> Private systems, deep-dive education, 1-on-1 mentorship, <em> and many more. </em> </strong> 
  <br/><br/>

See the market like an <strong>architect</strong> — and act like a <strong>pro</strong>.
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
                      className={`w-full object-cover rounded-xl shadow-2xl ${
                        index === 0 || index === 1 
                          ? 'h-[200px] md:h-[400px]' 
                          : 'h-[300px] md:h-[400px]'
                      }`}
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
            Who Is Alpha For?
          </h3>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            You're serious about <strong> mastering </strong>the game.<br/><br/>
Not just <em> using </em> tools, but <strong>understanding</strong> systems, <strong>designing</strong> strategies, and <strong> executing </strong> with conviction.<br/><br/>
You want the <strong>full picture </strong>: <em>fundamentals, flow, execution, structure, and support.</em><br/><br/>
If you're ready to stop improvising and start mastering,<strong> <em>Alpha is your level.</em> </strong>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default AlphaPlanPage;