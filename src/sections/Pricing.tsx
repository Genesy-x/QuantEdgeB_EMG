import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/neon-button';
import { GlowCard } from '../components/ui/spotlight-card';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { CounterDisplay } from '../components/ui/counter';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [showQuantum, setShowQuantum] = useState(false);
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  const switchRef = useRef<HTMLButtonElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<'trading' | 'multi'>('trading');
  const [quantumFormData, setQuantumFormData] = useState({
    firstName: '',
    email: '',
    capitalAmount: '',
    objective: ''
  });
  const [quantumFormResult, setQuantumFormResult] = useState('');

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(price));
  };

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const handleQuantumFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuantumFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantumFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuantumFormResult("Processing...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "b4b6fe3a-054e-4624-bcde-da6e1bb58d60",
          subject: "[QUANTUM] New Whale Prospect",
          firstName: quantumFormData.firstName,
          email: quantumFormData.email,
          capitalAmount: quantumFormData.capitalAmount,
          objective: quantumFormData.objective,
          plan: "quantum",
          segment: "whale"
        }),
      });

      const data = await response.json();

      if (data.success) {
        setQuantumFormResult("Redirecting to calendar...");
        
        // Reset form
        setQuantumFormData({
          firstName: '',
          email: '',
          capitalAmount: '',
          objective: ''
        });

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280'],
        });
        
        // Redirect to Cal.com with quantum parameters
        setTimeout(() => {
          window.open('https://cal.com/quantedgeb-quantum/60min?utm_source=quantum-form&plan=quantum&segment=whale', '_blank');
        }, 1000);

        // Clear message after 3 seconds
        setTimeout(() => {
          setQuantumFormResult('');
        }, 3000);
        
      } else {
        setQuantumFormResult("Error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Quantum form submission error:', error);
      setQuantumFormResult('There was an error. Please try again.');
    }
  };

  // Get the appropriate href for Premium+ based on selected variant
  const getPremiumPlusHref = () => {
    return selectedVariant === 'trading' 
      ? 'https://whop.com/quantedgeb-tradingsuite/?a=quantedge17'
      : 'https://whop.com/quantedgeb-multiedgesuite/?a=quantedge17';
  };

  const plans = [
    {
      name: "FUNDAMENTAL",
      price: "29",
      yearlyPrice: "23",
      period: "per month",
      features: [
        "Access To Discord Server",
        "Basic QuantEdgeB Indicators ",
        "Fundamental, On-Chain & Crypto Tools",
        "Daily/Weekly Analysis Reports",
        "Market/Psychology Lessons",
        "Backtest & Trading Tools",
        "1 Personal Call & Constant Chat Support"
      ],
      description: "For traders building their foundation | Structure, insight, and direction without the noise",
      buttonText: "Start Free Trial",
      href: "https://whop.com/quantedgeb-fundamental/?a=quantedge17",
      learnMoreHref: "/plans/fundamental",
      isPopular: false,
      glowColor: 'blue' as const
    },
    {
      name: "PREMIUM",
      price: "39",
      yearlyPrice: "31",
      period: "per month",
      features: [
        "Everything in Fundamental",
        "Universal Trend Following Models",
        "Universal Valuation Models",
        "Advanced Signals",
        "Exclusive Access To QuantEdgeB Portfolio"
      ],
      description: "For those ready to trade with confidence | Full-cycle systems for smarter entries, exits, and rotations",
      buttonText: "Start Free Trial",
      href: "https://whop.com/quantedgeb-premium/?a=quantedge17",
      learnMoreHref: "/plans/premium",
      isPopular: true,
      glowColor: 'purple' as const
    },
    {
      name: "PREMIUM +",
      price: "49",
      yearlyPrice: "39",
      period: "per month",
      variants: {
        trading: {
          name: "TradingSuite",
          features: [
            "Everything in Premium",
            "Advanced Trading Systems",
            "Asset Based Strategies",
            "Priority Support"
          ]
        },
        multi: {
          name: "MajorRotation Suite",
          features: [
            "Everything in Premium",
            "Advanced Relative Strength Systems",
            "Asset Rotation Strategies",            
            "Priority Support"
          ]
        }
      },
      description: "For Active Traders demanding precision | Tactical engines for timing, rotation, and execution",
      buttonText: "Start Free Trial",
      href: getPremiumPlusHref(), // Dynamic href based on selected variant
      learnMoreHref: "/plans/premium",
      isPopular: false,
      glowColor: 'green' as const
    },
    {
      name: "ALPHA",
      price: "69",
      yearlyPrice: "55",
      period: "per month",
      features: [
        "Everything in Premium+",
        "TradingSuite package",
        "MultiEdgeSuite package ",
        "Personalised System Requests",
        "System Deep Dive Lessons",
        "1-on-1 Mentorship"
      ],
      description: "For Elites Only | Every tool, every system, every edge. Backed by mentorship, built for mastery",
      buttonText: "Start Free Trial",
      href: "https://whop.com/quantedgeb/?a=quantedge17",
      learnMoreHref: "/plans/alpha",
      isPopular: false,
      glowColor: 'orange' as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 relative">
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      
      <div className="max-w-[90rem] mx-auto relative">
        <div className="text-center mb-16">
          {!showQuantum ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200">
                    Go Beyond Efficiency
                  </h2>
                </div>
                <button
                  onClick={() => setShowQuantum(true)}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium 
                           hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] px-3 py-1 rounded-md
                           border border-gray-700 hover:border-gray-500"
                >
                  Wants more? →
                </button>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select the plan that best suits your trading needs and goals.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    For Visionaries Who Want Capital Without the Work
                  </h2>
                </div>
                <button
                  onClick={() => setShowQuantum(false)}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium 
                           hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] px-3 py-1 rounded-md
                           border border-gray-700 hover:border-gray-500 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Plans
                </button>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Fully managed, ROI-focused, hands-free growth for serious capital.
              </p>
            </>
          )}
        </div>

        {!showQuantum && (
          <div className="flex justify-center items-center gap-4 mb-16">
            <span className="text-gray-400 font-medium">Monthly</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <Switch
                ref={switchRef as any}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="bg-white-800 data-[state=checked]:bg-primary h-7 w-14"
              />
            </div>
            <span className="text-gray-300 font-medium">Annual <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">(Save 20%)</span></span>
          </div>
        )}

        <motion.div
          key={showQuantum ? 'quantum' : 'regular'}
          initial={{ opacity: 0, x: showQuantum ? 100 : -100, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: showQuantum ? -100 : 100, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {!showQuantum ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 1 }}
                  whileInView={
                    isDesktop
                      ? {
                          y: plan.isPopular ? -20 : 0,
                          opacity: 1,
                          scale: plan.isPopular ? 1.05 : 1,
                        }
                      : {}
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    delay: index * 0.1,
                    opacity: { duration: 0.5 },
                  }}
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
                    <div className="relative h-full flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-[10px] p-6">
                      {plan.isPopular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                          <Star className="text-white h-4 w-4 fill-current" />
                          <span className="text-white ml-1 font-sans font-semibold">
                            Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex-1 flex flex-col">
                        <p className="text-base font-semibold text-gray-400">
                          {plan.name}
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-x-2">
                          <div className="flex items-center">
                            <span className="text-5xl font-bold tracking-tight text-white mr-1">€</span>
                            <CounterDisplay
                              value={Number(isMonthly ? plan.price : plan.yearlyPrice)}
                              fontSize={48}
                              places={Number(isMonthly ? plan.price : plan.yearlyPrice) >= 10 ? [10, 1] : [1]}
                              gap={1}
                              textColor="white"
                              fontWeight="bold"
                            />
                          </div>
                          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-400">
                            / {plan.period}
                          </span>
                        </div>

                        <p className="text-xs leading-5 text-gray-400">
                          {isMonthly ? "billed monthly" : "billed annually"}
                        </p>

                        {plan.name === "PREMIUM +" ? (
                          <div className="mt-8 mb-6 flex-grow">
                            <div className="flex gap-2 mb-4">
                              <button
                                onClick={() => setSelectedVariant('trading')}
                                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  selectedVariant === 'trading'
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                              > 
                                TradingSuite
                              </button>
                              <button
                                onClick={() => setSelectedVariant('multi')}
                                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  selectedVariant === 'multi'
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                              >
                                MultiEdgeSuite
                              </button>
                            </div>
                            <ul className="space-y-3">
                              {plan.variants[selectedVariant].features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="text-left text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <ul className="mt-8 space-y-3 mb-6 flex-grow">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-left text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Learn More button positioned above the line */}
                        <Link to={plan.learnMoreHref}>
                          <Button
                            variant="ghost"
                            size="default"
                            className="w-full mt-6 text-gray-300 border border-blue-700 hover:border-blue-600/70 hover:bg-black-800/50 rounded-md"
                          >
                            Learn More
                          </Button>
                        </Link> 

                        <hr className="w-full my-4 border-gray-800" />

                        <Button
                          variant="default"
                          size="default"
                          className="w-full text-white rounded-md"
                          onClick={() => window.open(plan.name === "PREMIUM +" ? getPremiumPlusHref() : plan.href, '_blank')} 
                        >
                          {plan.buttonText}
                        </Button>
                        
                        <p className="mt-6 text-xs leading-5 text-gray-500 rounded-md">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Quantum Plan Section */
            <div className="max-w-4xl mx-auto">
              <div className="relative h-full rounded-2xl border-[0.75px] border-white/20 p-0.5">
               <GlowingEffect
                 spread={40}
                 glow={true}
                 disabled={false}
                 proximity={64}
                 inactiveZone={0.01}
                 borderWidth={2}
                 variant="white"
               />
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/20 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative h-full flex flex-col bg-black/80 backdrop-blur-sm rounded-[10px] p-8 md:p-12 border border-white/10">
                  {/* Quantum Badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-white to-gray-300 text-black py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                    <span className="text-black font-bold text-sm">QUANTUM</span>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Quantum
                    </h3>
                    <p className="text-xl text-gray-300 mb-8">
                      Fully Managed. ROI-Focused. Hands-Free Growth.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
  {/* Left Column - Features */}
  <div>
    <h4 className="text-xl font-semibold text-white mb-6">What's Included:</h4>
    <ul className="space-y-4">
      {[
        "✅ All Alpha Perks Included",
        "🧠 Personal Strategy Design & Setup", 
        "📈 Capital Growth Without Labor",
        "📊 ROI-Based Performance Fees Only",
        "🛠️ Private Dashboard Access",
        "💬 Direct Line to Your Strategist"
      ].map((feature, idx) => (
        <li key={idx} className="text-gray-300 text-lg">
          {feature}
        </li>
      ))}
    </ul>
  </div>
  {/* Right Column - Requirements */}
  <div>
    <h4 className="text-xl font-semibold text-white mb-6">Requirements:</h4>
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <p className="text-white font-semibold">🪙 One-Time Setup Fee:</p>
        <p className="text-2xl font-bold text-white">1,000€</p>
      </div>
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <p className="text-white font-semibold">💼 Minimum Capital:</p>
        <p className="text-2xl font-bold text-white">50,000€</p>
      </div>
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <p className="text-white font-semibold">📞 Strategy Discussion:</p>
        <p className="text-gray-300">ROI Threshold, Strategy & Goals discussed on scheduled call</p>
      </div>
    </div>
  </div>
</div>

                   

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link to="/quantum">
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full text-white border border-white/30 hover:border-white/50  rounded-md"
                      >
                        Learn More
                      </Button> 
                    </Link> 
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full bg-black text-white rounded-md font-semibold"
                      onClick={() => document.getElementById('quantum-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Book a Call
                    </Button>
                  </div>
                    </div>
                  </div>
                </div>
            
          )}
        </motion.div>
      </div>
    </section>
  );
};