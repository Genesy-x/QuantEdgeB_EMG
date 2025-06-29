import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/ui/gradient-text';

function PrivacyPolicyPage() {
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
            colors={["#40ffaa", "#ff40aa", "#40ffaa"]}
            animationSpeed={6}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Privacy Policy
          </GradientText>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Last updated: June 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <div className="prose prose-invert max-w-none">
            <div className="min-h-[900px] text-white leading-relaxed space-y-6">
              <p>
                Welcome to <strong>QuantEdgeB</strong>. This Privacy Policy explains how we collect, use, and protect your personal information.
              </p>
 
              <p className="text-xl md:text-2xl font-bold text-white mb-3">1. Information We Collect</p>
              <ul className="text-gray-300 mb-4">
                <li>Email address (for communication and service access)</li>
                <li>TradingView username (to grant script access)</li>
              </ul>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">2. How We Use Your Information</p>
              <ul className="text-gray-300 mb-4">
                <li>To provide access to our TradingView indicators</li>
                <li>To communicate important updates or support</li>
              </ul>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">3. Data Sharing</p>
              <p className="text-gray-300 mb-4">We do not sell or share your personal data with third parties. Your email and TradingView username are only used internally to deliver our services.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">4. Security</p>
              <p className="text-gray-300 mb-4">We implement standard security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute safety.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">5. Third-Party Services</p>
              <p className="text-gray-300 mb-4">Our services rely on third-party platforms like TradingView. Their respective privacy policies apply when you interact with them.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">6. Cookies and Tracking</p>
              <p className="text-gray-300 mb-4">We may use cookies or analytics tools to understand site usage. You can disable cookies in your browser settings if desired.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">7. Data Retention</p>
              <p className="text-gray-300 mb-4">We retain your email and username for the duration of your subscription. You can request deletion by contacting us.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">8. Your Rights</p>
              <ul className="text-gray-300 mb-4">
                <li>You can request access, correction, or deletion of your data.</li>
                <li>You can unsubscribe or cancel your account anytime.</li>
              </ul>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">9. Changes to This Policy</p>
              <p className="text-gray-300 mb-4">We may update this policy as needed. Changes will be posted on this page with a new "last updated" date.</p>

              <p className="text-xl md:text-2xl font-bold text-white mb-3">10. Contact</p>
              <p className="text-gray-300 mb-4">If you have any questions, contact us at <a href="mailto:support@quantedgeb.com">support@quantedgeb.com</a>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;