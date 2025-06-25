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
import InteractiveNeuralVortex from './components/ui/interactive-neural-vortex-background';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
        <InteractiveNeuralVortex />
        <div className="relative z-10">
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
          </Routes>
          <Footer />
          <BackToTop />
        </div>
      </div>
    </Router>
  );
}

export default App;