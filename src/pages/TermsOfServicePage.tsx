import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/ui/gradient-text';

function TermsOfServicePage() {
  return (
    <main className="py-32 px-4 relative text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientText
            colors={["#ffaa40", "#40ffaa", "#ffaa40"]}
            animationSpeed={6}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Terms of Service
          </GradientText>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Last updated: June 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <p className="text-xl md:text-2xl text-white mb-4">
              Welcome to <strong>QuantEdgeB</strong> (
              <a href="https://quantedgeb.com" target="_blank" rel="noopener noreferrer">
                quantedgeb.com
              </a>
              ). By accessing or using our website and services, you agree to the following Terms of Service ("Terms").
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">1. General Information</p>
            <p className="text-gray-300 mb-4">
              QuantEdgeB provides access to proprietary crypto trading indicators and strategies delivered via TradingView as
              invitation-only scripts. By subscribing, you enter into a binding agreement with us.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">2. Eligibility</p>
            <ul className="text-gray-300 mb-4">
              <li>You must be at least 18 years old.</li>
              <li>You must be legally allowed to use our services in your jurisdiction.</li>
              <li>You may not use our services from restricted or sanctioned territories.</li>
            </ul>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">3. Subscriptions and Payments</p>
            <ul className="text-gray-300 mb-4">
              <li>Services are billed monthly or annually via subscription.</li>
              <li>All purchases are <strong>final</strong>. <strong>No refunds</strong> will be issued.</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
            </ul>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">4. Delivery of Services</p>
            <p className="text-gray-300 mb-4">
              After payment, access is granted to TradingView scripts within 24–48 hours via invitation. A valid TradingView username is required.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">5. Support and Communication</p>
            <ul className="text-gray-300 mb-4">
              <li>Support is available through Discord, X (formerly Twitter), and personal mentorship (for premium plans).</li>
              <li>Email may be used for account-related updates or service notifications.</li>
            </ul>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">6. Intellectual Property</p>
            <p className="text-gray-300 mb-4">
              All content and strategies are the exclusive intellectual property of QuantEdgeB. Reproduction, distribution, or reverse
              engineering is strictly prohibited without permission.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">7. User Conduct</p>
            <ul className="text-gray-300 mb-4">
              <li>Do not share or resell TradingView access.</li>
              <li>Do not attempt to replicate or reverse-engineer our indicators.</li>
              <li>Do not use the service for illegal or malicious purposes.</li>
            </ul>
            <p className="text-gray-300 mb-4">Violations may result in termination.</p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">8. No Financial Advice</p>
            <p className="text-gray-300 mb-4">
              QuantEdgeB does not offer financial advice. All strategies are educational tools. Trading cryptocurrencies involves
              significant risk, and all decisions are your responsibility.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">9. Limitation of Liability</p>
            <ul className="text-gray-300 mb-4">
              <li>We are not liable for trading losses or performance outcomes.</li>
              <li>We are not responsible for third-party issues (e.g., TradingView outages).</li>
              <li>No liability for indirect or consequential damages.</li>
            </ul>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">10. Privacy Policy</p>
            <p className="text-gray-300 mb-4">
              We only collect your email for service communications. We do not sell or share personal data. Refer to our full{' '}
              <a href="/privacy-policy">Privacy Policy</a> for more details.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">11. Termination</p>
            <p className="text-gray-300 mb-4">We reserve the right to terminate your access without notice in case of breach or misuse.</p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">12. Changes to Terms</p>
            <p className="text-gray-300 mb-4">We may revise these Terms at any time. Changes will be communicated via email or posted on our site.</p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">13. Governing Law</p>
            <p className="text-gray-300 mb-4">
              These Terms are governed by the laws of <strong>Switzerland</strong>, without regard to conflict of law rules.
            </p>

            <p className="text-xl md:text-2xl font-bold text-white mb-3">14. Contact</p>
            <p className="text-gray-300 mb-4">
              For any questions, contact us at:{' '}
              <a href="mailto:support@quantedgeb.com">support@quantedgeb.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default TermsOfServicePage;