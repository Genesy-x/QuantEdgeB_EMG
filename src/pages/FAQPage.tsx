import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/ui/gradient-text';

function FAQPage() {
  const faqs = [
    {
      question: "What's your refund policy?",
      answer: "We don't offer refunds — but you can try everything free for 3 days by subscribing to a monthly plan, and 7 days if you take the annual one. Use the trial to test the tools, explore the systems, and see if it fits your style before any payment is processed."
    },
    {
      question: "Do the indicators and strategies work on all assets?",
      answer: "They're optimized for crypto — but with the right settings, you can absolutely adapt them to stocks, indices, or other assets. Many traders do."
    },
    {
      question: "Are your tools beginner-friendly?",
      answer: <>Yes — 100%.<br/>
Every indicator is designed to be clear, intuitive, and flexible. Whether you're just starting or already experienced, you'll get signals you can trust and options to tweak as you grow
        </>,
    },
    {
      question: "Is support included with the subscription?",
      answer: <>Absolutely.<br/>
Subscribers get direct access to me for guidance, feedback, and help setting up or customizing any tool. You're never trading alone.
        </>,
    },
    {
      question: "Once subscribed, how do I access to the indicators/strategies on TradingView?",
      answer: <>
        Right after subscribing via Whop:<br/>

 1. Go to the <b>"Integrations"</b> section<br/>

 2. Click <b>"TradingView" → "Claim Access"</b><br/>

 3. Your invite-only tools will activate instantly on your account<br/>
        </>,
    },
    {
      question: "Where can I find all the resources and scripts?",
      answer: <>
        Once subscribed, you'll receive a welcome message from Whop with a link to our private Discord.<br/>
        Inside the server, head to the <b>#resources</b> channel — everything's there:<br/>
<i>Private scripts, tool guides, educational breakdowns, and more.</i>
        </>,
    } 
  ];

  return (
    <main className="py-32 px-4 relative">
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientText
            colors={["#40aaff", "#ff40aa", "#40aaff"]}
            animationSpeed={6}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked Questions
          </GradientText>
          <p className="text-bold text-gray-300 max-w-2xl mx-auto text-lg ">
            <b>Find answers to common questions about our services and platform.</b>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <div className="prose prose-invert max-w-none">
            <div className="min-h-[400px] text-gray-300 leading-relaxed space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <p className="text-xl md:text-2xl font-bold text-white mb-3">{faq.question}</p>
                  <p className="text-gray-300 mb-4">{faq.answer}</p>
                  {index < faqs.length - 1 && <br />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default FAQPage;