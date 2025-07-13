import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { ArrowRight, Check, Phone, MessageCircle, Shield, Users, Target, DollarSign } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';
import { GlowingEffect } from '../components/ui/glowing-effect';

function QuantumPage() {
  const handleBookCall = () => {
    window.open('https://cal.com/quantedgeb/quantumdiscovery', '_blank');
  };

  const whyQuantumFeatures = [
    "Everything in Alpha — elevated",
    "Personalized capital deployment strategy",
    "Elite precision in every allocation",
    "Learn enough to stay calm and in control"
  ];

  const strategyFeatures = [
    {
      icon: <Check className="h-5 w-5" />,
      text: "Custom Strategy & Allocation"
    },
    {
      icon: <Target className="h-5 w-5" />,
      text: "ROI Threshold for Risk-Protected Profits"
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Strategy Call With Our Core Team"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      text: "Fair Play Model: We Earn Only When You Do"
    }
  ];

  const supportFeatures = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      text: "Direct access to the team via Telegram/WhatsApp"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Choose your report frequency: weekly, bi-weekly, monthly"
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Private Telegram Channel for Quantum members only"
    }
  ];

  const requirements = [
    {
      title: "One-Time Setup Fee:",
      value: "1,000€",
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Minimum Capital to Deploy:",
      value: "50,000€",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "ROI Threshold:",
      value: "Defined in 1:1 Call",
      icon: <Phone className="h-5 w-5" />
    }
  ];

  return (
    <main className="py-32 px-4 relative">
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 min-h-[60vh] flex flex-col justify-center"
        >
          <GradientText
            colors={["#ffffff", "#f8f9fa", "#ffffff"]}
            animationSpeed={8}
            className="text-8xl md:text-8xl font-bold mb-8"
          >
            Introducing: Quantum
          </GradientText>
          <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A hands-free wealth protocol for elite capital
          </h2>
        </motion.div>

        {/* Why Quantum Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/40 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <img
                    src="https://res.cloudinary.com/dq4flimtm/image/upload/v1751186459/QuantEdgeB_Crypto_Trading_1o1_Mentorship.png"
                    alt="Quantum Management"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                More Than Just Management — Mastery
              </h2>
              <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                Quantum includes all perks from Alpha — and elevates them.
                Your capital is deployed with elite precision, under a personalized strategy made for your goals.
                You'll also learn just enough to remain aware, calm, and in control — even when the markets go wild.
              </p>
              <ul className="space-y-4">
                {whyQuantumFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <span className="w-2 h-2 bg-white rounded-full mr-4 mt-3 flex-shrink-0"></span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Personalized Strategy Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              A Plan As Unique As Your Objectives
            </h2>
            <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Book a strategy call. We design your custom allocation and ROI target.
              Only if we exceed your threshold do we take 10% of the ROI — otherwise, your profits are all yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative h-full rounded-2xl border-[0.75px] border-white/20 p-0.5"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                  variant="white"
                />
                <div className="relative h-full flex items-center bg-black/80 backdrop-blur-sm rounded-[10px] p-6 border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <span className="text-white text-lg font-medium">{feature.text}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Elite Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/40 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <img
                    src="https://res.cloudinary.com/dq4flimtm/image/upload/v1750959396/QuantEdgeB_Crypto_Trading_System_Detailed.webp"
                    alt="Elite Support"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Support That Scales With You
              </h2>
              <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                We stay in touch the way it matters most:
                Direct phone, Telegram, and personalized reporting.
              </p>
              <ul className="space-y-6">
                {supportFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="flex-1">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Private Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 text-center"
        >
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
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-[10px] p-12 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Not Just a Client — A Legacy
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed max-w-4xl mx-auto">
                Quantum gives you access to a curated network of high-level individuals.<br/>
                From idea sharing to potential joint ventures — this is more than trading.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing & Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Entry Requirements
            </h2>
          </div>

          <div className="relative h-full rounded-2xl border-[0.75px] border-white/20 p-0.5 max-w-4xl mx-auto">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
              variant="white"
            />
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-[10px] p-8 md:p-12 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {requirements.map((req, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {req.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{req.title}</h3>
                    <p className="text-2xl font-bold text-white">{req.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full flex justify-center">
                  <Button
                    variant="white"
                    size="lg"
                    className="text-white border border-white/30 hover:border-white/50 rounded-md px-8"
                    onClick={handleBookCall}
                  >
                    <div className="flex items-center justify-center">
                      Book Your Private Call
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Is Quantum Right for You?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
            You'll schedule a private call, choose your objective, and gain access to a financial architecture built to scale your wealth.
          </p>
          <Button
            variant="white"
            size="lg"
            className="text-white border border-white/30 hover:border-white/50 rounded-md"
            onClick={handleBookCall}
          >
            <div className="flex items-center justify-center">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}

export default QuantumPage;