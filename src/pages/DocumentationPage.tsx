import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, X, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/neon-button';
import { GradientText } from '../components/ui/gradient-text';
import { GlowingEffect } from '../components/ui/glowing-effect';
import confetti from 'canvas-confetti';
 
interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  category: 'guide' | 'tool' | 'indicator' | '???';
}

function DocumentationPage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const resources: Resource[] = [
    {
      id: 'crypto-trading-guide',
      title: '🔍 Discovery Pack',
      description: <>
      <b>Still on the fence? Let the tools speak.</b><br/><br/>
Try out these <b>free indicators</b> and get a taste of the QuantEdgeB expertise.<br/>
        We will be waiting for you on the other side.
        </>,
      image: 'https://res.cloudinary.com/dq4flimtm/image/upload/v1749058955/QuantEdgeB_Crypto_Trading_Basic_1.png',
      downloadUrl: 'https://tradinglibrary.carrd.co',
      category: 'indicator'
    },
    {
      id: 'risk-management-calculator',
      title: '👾 Private Discord Server',
      description: <>
      <b>Unsure of what you can expect? Say no more.</b><br/><br/>
Access our <em>private Discord Server</em> for <b>FREE</b> and meet the QuantEdgeB community.<br/>
Daily analyses, direct access to the team, info sharing... all await you there!
        </>,
      image: 'https://res.cloudinary.com/dx3mzzjgk/image/upload/v1756487019/QEB_Discord_Server_jyaw8j.avif',
      downloadUrl: 'https://whop.com/quant-edge-bdiscord',
      category: 'tool'
    },
    {
      id: 'psychology-checklist',
      title: '🚧 Coming Soon...',
      description: <>
      More free resources are on the way — but let’s be real:<br/>
<b>The real edge lives inside the full system.</b><br/>
You already know <i>where</i> the good stuff 
        </>,
      image: 'https://res.cloudinary.com/dq4flimtm/image/upload/v1750859159/QuantEdgeB_Crypto_Trading_AboutQuantEdgeB_4.png',
      downloadUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: '???'
    }
  ];

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setFormData({ email: '', fullName: '' });
    setSubmitStatus('idle');
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
    setFormData({ email: '', fullName: '' });
    setSubmitStatus('idle');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource || !formData.email || !formData.fullName) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/send-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
          title: selectedResource.title,
          downloadUrl: selectedResource.downloadUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      
      setSubmitStatus('success');
      triggerConfetti();
      
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'guide':
        return '📚';
      case 'tool':
        return '🛠️';
      case 'indicator':
        return '📊';
      default:
        return '🚧';
    }
  };

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
            colors={["#ffaa40", "#40aaff", "#ffaa40"]}
            animationSpeed={8}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Documentation
          </GradientText>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Access our best free resources — designed to guide your journey, no strings attached.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative h-full rounded-2xl border-[0.75px] border-gray-800 p-0.5 group cursor-pointer"
              onClick={() => handleResourceClick(resource)}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative h-full flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-[10px] overflow-hidden group-hover:bg-gray-900/80 transition-all duration-300">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-300">
                  {getCategoryIcon(resource.category)} {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                    {resource.description}
                  </p>
                  
                  <Button
                    variant="default"
                    size="default"
                    className="w-full text-white group-hover:bg-none transition-colors"
                  >
                    <div className="flex items-center justify-center w-full">
                      <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-nowrap">Download For Free</span>
                    </div>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email Capture Modal */}
        {selectedResource && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {submitStatus === 'success' ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Success! Check Your Email
                  </h3>
                  <p className="text-gray-300 mb-6">
                    We've sent <strong>{selectedResource.title}</strong> to your email address. Check your inbox <i>(and spam folder)</i> for the download link.
                  </p>
                  <div className="space-y-3 flex flex-col items-center">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full text-white flex items-center justify-center"
                      onClick={() => window.open(selectedResource.downloadUrl, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                      Access Resource Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Get Your Free Resource
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Enter your details to receive <strong>{selectedResource.title}</strong>
                    </p>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                        <p className="text-red-400 text-sm">
                          There was an error processing your request. Please try again or contact support.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                                 transition-all duration-300 text-white placeholder-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                                 transition-all duration-300 text-white placeholder-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full text-white"
                      disabled={isSubmitting || !formData.email || !formData.fullName}
                    >
                      <div className="flex items-center justify-center w-full">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {isSubmitting ? 'Sending...' : 'Get Free Resource'}
                        </span>
                      </div>
                    </Button>
                  </form>

                  <p className="text-gray-500 text-xs mt-4 text-center">
                    We respect your privacy. No spam, just valuable content.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}

export default DocumentationPage;