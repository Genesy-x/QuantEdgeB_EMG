import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackToTop } from './components/BackToTop';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FAQPage from './pages/FAQPage';
import FundamentalPlanPage from './pages/FundamentalPlanPage';
import PremiumPlanPage from './pages/PremiumPlanPage';
import AlphaPlanPage from './pages/AlphaPlanPage';
import DocumentationPage from './pages/DocumentationPage';
import QuantumPage from './pages/QuantumPage';
import InteractiveNeuralVortex from './components/ui/interactive-neural-vortex-background';

// AI Chatbot Integration
declare global {
  interface Window {
    VG_CONFIG: any;
  }
}

function App() {
  React.useEffect(() => {
    // Initialize AI Chatbot
    window.VG_CONFIG = {
      ID: "BXtm6InemByRV438C9r0",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };

    const VG_SCRIPT = document.createElement("script");
    VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    VG_SCRIPT.defer = true;
    document.body.appendChild(VG_SCRIPT);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
        <InteractiveNeuralVortex />
        <div className="relative z-10">
          {/* AI Chatbot Container */}
          <div style={{ width: 0, height: 0 }} id="VG_OVERLAY_CONTAINER">
            {/* Here is where CONVOCORE renders the widget. */}
          </div>
          
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/plans/fundamental" element={<FundamentalPlanPage />} />
            <Route path="/plans/premium" element={<PremiumPlanPage />} />
            <Route path="/plans/alpha" element={<AlphaPlanPage />} />
            <Route path="/quantum" element={<QuantumPage />} />
          </Routes>
          <Footer />
          <BackToTop />
        </div>
      </div>
    </Router>
  );
}

export default App;