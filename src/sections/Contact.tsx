import React, { useState } from 'react';
import { Send, MessageCircle, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/neon-button';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [schedulingFormState, setSchedulingFormState] = useState({
    firstName: '',
    email: '',
    appointmentType: '',
    objective: '',
    xProfile: ''
  });
  
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const [schedulingFocused, setSchedulingFocused] = useState({
    firstName: false,
    email: false,
    appointmentType: false,
    objective: false,
    xProfile: false
  });

  const [result, setResult] = useState("");
  const [schedulingResult, setSchedulingResult] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSchedulingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSchedulingFormState(prev => ({
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
  
  const handleSchedulingFocus = (field: string) => {
    setSchedulingFocused(prev => ({
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

  const handleSchedulingBlur = (field: string) => {
    if (!schedulingFormState[field as keyof typeof schedulingFormState]) {
      setSchedulingFocused(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
    });
  };
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "b4b6fe3a-054e-4624-bcde-da6e1bb58d60");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        // Reset form state manually instead of using event.currentTarget.reset()
        setFormState({
          name: '',
          email: '',
          message: ''
        });
        
        setFocused({
          name: false,
          email: false,
          message: false
        });

        // Trigger confetti celebration
        triggerConfetti();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResult('There was an error sending your message. Please try again.');
    }
  };
  
  const onSchedulingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSchedulingResult("Sending....");
    const formData = new FormData(event.currentTarget);

    // Add scheduling-specific subject line with tags
    const appointmentType = schedulingFormState.appointmentType;
    const subjectTag = appointmentType === 'business' ? '[BUSINESS]' : '[CUSTOMER]';
    formData.append("subject", `${subjectTag} New Scheduling Request from ${schedulingFormState.firstName}`);
    
    // TODO: Replace with your Web3Forms access key
    formData.append("access_key", "2e477eb2-ab99-4b70-93bd-a63e2d17a6ad");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSchedulingResult("Redirecting to calendar...");
        
        // Reset form state manually
        setSchedulingFormState({
          firstName: '',
          email: '',
          appointmentType: '',
          objective: '',
          xProfile: ''
        });
        
        setSchedulingFocused({
          firstName: false,
          email: false,
          appointmentType: false,
          objective: false,
          xProfile: false
        });

        // Trigger confetti celebration
        triggerConfetti();
        
        // Redirect to appropriate Cal.com link based on appointment type
        setTimeout(() => {
          if (appointmentType === 'business') {
            // TODO: Replace with your business Cal.com link
            window.open('https://cal.com/genesy.x/15min?utm_source=form-scheduler', '_blank');
          } else {
            // TODO: Replace with your customer Cal.com link  
            window.open('https://cal.com/genesy.x/30min?utm_source=form-scheduler', '_blank');
          }
        }, 1000);
        
      } else {
        console.log("Error", data);
        setSchedulingResult(data.message);
      }
    } catch (error) {
      console.error('Scheduling form submission error:', error);
      setSchedulingResult('There was an error processing your request. Please try again.');
    }
  };

  // Check if scheduling form is valid
  const isSchedulingFormValid = () => {
    const { firstName, email, appointmentType, objective } = schedulingFormState;
    return firstName.trim() && email.trim() && appointmentType && objective.trim();
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
            
            {result && (
              <div className={`mb-6 p-4 rounded-lg ${
                result === "Form Submitted Successfully" 
                  ? "bg-green-900/20 border border-green-700" 
                  : result === "Sending...." 
                    ? "bg-blue-900/20 border border-blue-700"
                    : "bg-red-900/20 border border-red-700"
              }`}>
                <p className={
                  result === "Form Submitted Successfully" 
                    ? "text-green-400" 
                    : result === "Sending...." 
                      ? "text-blue-400"
                      : "text-red-400"
                }>
                  {result}
                </p>
              </div>
            )}
            
            <form onSubmit={onSubmit} className="space-y-6">
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
                  disabled={result === "Sending...."}
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
                  disabled={result === "Sending...."}
                />
              </div>
              
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  placeholder="Your message"
                  rows={5}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                           transition-all duration-300 text-white placeholder-gray-400 resize-none"
                  required
                  disabled={result === "Sending...."}
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full text-white"
                disabled={result === "Sending...."}
              >
                <div className="flex items-center justify-center">
                  <Send className="h-5 w-5 mr-2" />
                  {result === "Sending...." ? 'Sending...' : 'Send Message'}
                </div>
              </Button>
            </form>
            
            <span className="block mt-4 text-center text-sm text-gray-500">
              {result && result !== "Sending...." && result !== "Form Submitted Successfully" && (
                "Please try again or contact us directly on X."
              )}
            </span>
          </div>

        {/* Scheduling Form Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200">
              Schedule a Call
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to take the next step? Book a personalized call to discuss your trading goals and how we can help you achieve them.
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            {schedulingResult && (
              <div className={`mb-6 p-4 rounded-lg ${
                schedulingResult === "Redirecting to calendar..." 
                  ? "bg-green-900/20 border border-green-700" 
                  : schedulingResult === "Sending...." 
                    ? "bg-blue-900/20 border border-blue-700"
                    : "bg-red-900/20 border border-red-700"
              }`}>
                <p className={
                  schedulingResult === "Redirecting to calendar..." 
                    ? "text-green-400" 
                    : schedulingResult === "Sending...." 
                      ? "text-blue-400"
                      : "text-red-400"
                }>
                  {schedulingResult}
                </p>
              </div>
            )}
            
            <form onSubmit={onSchedulingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={schedulingFormState.firstName}
                    onChange={handleSchedulingChange}
                    onFocus={() => handleSchedulingFocus('firstName')}
                    onBlur={() => handleSchedulingBlur('firstName')}
                    placeholder="First Name"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                             transition-all duration-300 text-white placeholder-gray-400"
                    required
                    disabled={schedulingResult === "Sending...."}
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    id="schedulingEmail"
                    name="email"
                    value={schedulingFormState.email}
                    onChange={handleSchedulingChange}
                    onFocus={() => handleSchedulingFocus('email')}
                    onBlur={() => handleSchedulingBlur('email')}
                    placeholder="Email Address"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                             transition-all duration-300 text-white placeholder-gray-400"
                    required
                    disabled={schedulingResult === "Sending...."}
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="relative">
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={schedulingFormState.appointmentType}
                    onChange={handleSchedulingChange}
                    onFocus={() => handleSchedulingFocus('appointmentType')}
                    onBlur={() => handleSchedulingBlur('appointmentType')}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                             transition-all duration-300 text-white appearance-none cursor-pointer"
                    required
                    disabled={schedulingResult === "Sending...."}
                  >
                    <option value="" disabled className="text-gray-400">Select Appointment Type</option>
                    <option value="business" className="text-white bg-gray-800">I'm booking for my business</option>
                    <option value="personal" className="text-white bg-gray-800">I'm booking for myself</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Conditional X Profile Field - Only show for business */}
              {schedulingFormState.appointmentType === 'business' && (
                <div className="relative transition-all duration-300 ease-in-out">
                  <input
                    type="text"
                    id="xProfile"
                    name="xProfile"
                    value={schedulingFormState.xProfile}
                    onChange={handleSchedulingChange}
                    onFocus={() => handleSchedulingFocus('xProfile')}
                    onBlur={() => handleSchedulingBlur('xProfile')}
                    placeholder="X (Twitter) Profile (Optional)"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                             transition-all duration-300 text-white placeholder-gray-400"
                    disabled={schedulingResult === "Sending...."}
                  />
                </div>
              )}
              
              <div className="relative">
                <textarea
                  id="objective"
                  name="objective"
                  value={schedulingFormState.objective}
                  onChange={handleSchedulingChange}
                  onFocus={() => handleSchedulingFocus('objective')}
                  onBlur={() => handleSchedulingBlur('objective')}
                  placeholder="Objective of the Call"
                  rows={4}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                           transition-all duration-300 text-white placeholder-gray-400 resize-none"
                  required
                  disabled={schedulingResult === "Sending...."}
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                className={`w-full text-white transition-all duration-300 ${
                  isSchedulingFormValid() && schedulingResult !== "Sending...." 
                    ? 'opacity-100 shadow-lg hover:shadow-blue-500/25' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isSchedulingFormValid() || schedulingResult === "Sending...."}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {schedulingResult === "Sending...." ? 'Processing...' : 'Schedule Call'}
                </div>
              </Button>
            </form>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              After submitting, you'll be redirected to our calendar to choose your preferred time slot.
            </p>
          </div>
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