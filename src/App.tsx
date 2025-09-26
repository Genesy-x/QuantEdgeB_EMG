import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { BackToTop } from './components/BackToTop';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
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
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { DashboardPage } from './pages/DashboardPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { WhopVerificationPage } from './pages/WhopVerificationPage';
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
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
          <InteractiveNeuralVortex />
          <div className="relative z-10">
            {/* AI Chatbot Container - TEMPORARILY HIDDEN */}
            <div style={{ width: 0, height: 0 }} id="VG_OVERLAY_CONTAINER">
              {/* Here is where CONVOCORE renders the widget. */}
            </div>
            
            <Routes>
              {/* Authentication Routes */}
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/verify-whop" element={
                <ProtectedRoute>
                  <WhopVerificationPage />
                </ProtectedRoute>
              } />
              
              {/* Public Routes with Navigation */}
              <Route path="/*" element={
                <div>
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
                    
                    {/* Premium Content - Protected */}
                    <Route path="/premium-content" element={
                      <ProtectedRoute requirePremium={true}>
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold text-white mb-4">Premium Content</h1>
                            <p className="text-gray-400">Welcome to exclusive QuantEdgeB content!</p>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />
                  </Routes>
                  <Footer />
                  <BackToTop />
                </div>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;