import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/neon-button';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    comment: ''
  });
  
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    comment: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFocus = (field: string) => {
    setFocused(prev => ({
      ...prev,
      [field]: true
    }));
  };
  
  const handleBlur = (field: string) => {
    if (!formState[field as keyof typeof formState]) {
      setFocused(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.io/send/quantedgeb@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        comment: ''
      });
      
      setFocused({
        name: false,
        email: false,
        comment: false
      });
      
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200">
            Let's Build Your Edge
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or ready to get started? Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
            
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400">There was an error sending your message. Please try again.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  placeholder="Your name"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                           transition-all duration-300 text-white placeholder-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  placeholder="Your email"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                           transition-all duration-300 text-white placeholder-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="relative">
                <textarea
                  id="comment"
                  name="comment"
                  value={formState.comment}
                  onChange={handleChange}
                  onFocus={() => handleFocus('comment')}
                  onBlur={() => handleBlur('comment')}
                  placeholder="Your message"
                  rows={5}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                           transition-all duration-300 text-white placeholder-gray-400 resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Honeypot field to prevent spam */}
              <input 
                name="_formsubmit_id" 
                type="text" 
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full text-white"
                disabled={isSubmitting}
              >
                <div className="flex items-center justify-center">
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </div>
              </Button>
            </form>
          </div>

          {/* Right Column - X (Twitter) Contact */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 flex flex-col justify-center">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Prefer direct messaging?
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  DM us on X anytime.<br/>
                  Got a quick question? Want to talk strategy? <br/>
                  We're always down to connect with serious traders.
                </p>
              </div>
              
              <Button
                variant="default"
                size="lg"
                className="w-full text-white"
                onClick={() => window.open('https://twitter.com/quantedgeb', '_blank')}
              >
                <div className="flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message Us on X
                </div>
              </Button>
              
              <p className="text-gray-500 text-sm mt-4">
                Usually respond within a few hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};