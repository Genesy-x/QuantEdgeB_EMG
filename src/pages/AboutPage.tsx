import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/neon-button';
import { Link } from "react-router-dom";
import { ArrowRight, Send, MessageCircle } from 'lucide-react';
import { GradientText } from '../components/ui/gradient-text';
import { Timeline } from '../components/ui/timeline';

function AboutPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const [result, setResult] = useState("");
  
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
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.currentTarget.reset();
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
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResult('There was an error sending your message. Please try again.');
    }
  };

  const sections = [
    {
      title: <>
        Markets speak in math. <em>We translate.</em>
      </>,
      description: 
        <>
        At QuantEdgeB, we're a precision team of quantitative minds — <em>mathematicians, system engineers, and crypto-native strategists</em> — united by one principle: <strong> markets are systems, and systems can be decoded. </strong> <br/><br/>

We don't <em>guess</em>. We don't <em>gamble</em>.<br/>
Every model we build is grounded in <strong>pure mathematics</strong>, battle-tested through <strong>real-world data</strong>, and refined with one goal:<br/><strong> - Give traders reliable, repeatable edge — not noise.</strong><br/><br/>

From Bayesian frameworks to signal fusion engines, everything we design serves one mission: 
&thinsp;<strong>Turn raw volatility into structured opportunity.</strong>
</>,
          
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1750190547/QuantEdgeB_Crypto_Trading_AboutQuantEdgeB_1.webp",
      features: []
    },
    {
      title: "Our Vision",
      description: <>
For too long, elite trading tools were <em>locked</em> behind institutional doors.<br/>
We're here to <strong>break</strong> that gate.
<br/><br/>
At QuantEdgeB, our vision is simple:<br/>
<strong><em>Put advanced quantitative systems into the hands of serious traders.</em></strong><br/><br/>
No matter your background or capital — if you're ready to level up, you <strong>deserve</strong> the same quality insights as the pros.
<br/><br/>
This isn't about <em>shortcuts</em>.<br/>
It's about <strong>access</strong>.<br/>
And building a new generation of traders who win with <strong>data</strong>, not <em>guesses</em>.

        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1750860868/QuantEdgeB_Crypto_Trading_AboutQuantEdgeB_2.png",
      features: []
    },
    {
      title: "What Drives Us",
      description: <>
        We've seen what happens when traders stop <em>guessing</em> and start thinking <strong>systematically</strong> — portfolios <strong>change</strong>, confidence <strong>builds</strong>, performance <strong>compounds</strong>.
<br/><br/>
That's <em>why</em> we do what we do.
<br/><br/>
Every model we create, every signal we refine, is driven by a single obsession:<br/>
- Solve <strong>hard problems</strong> that move the needle for <strong>real traders</strong>.
<br/><br/>
We're not here for <em>hype</em>. We're here for <strong>impact</strong>.<br/>
And the daily challenge of outsmarting a market that <em>never sleeps</em>.

        </>,
      image: "https://res.cloudinary.com/dq4flimtm/image/upload/v1750763321/QuantEdgeB_Crypto_Trading_AboutQuantEdgeB_3.png",
      features: []
    }
  ];

  const timelineData = [
    {
      title: "Mathematical Rigor",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            Every tool is built from <strong>quantitative theory:</strong> <br/> Probability, stochastic modeling, fractals, entropy, and beyond.
          </p>
        </div>
      ),
    },
    {
      title: "Data-First Architecture",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            We process <strong>millions</strong> of ticks, <strong>normalize</strong> across regimes, and <strong>stress-test</strong> signals under chaos.
            So you're prepared for <em><strong>anything</strong></em>.
          </p>
        </div>
      ),
    },
    {
      title: "Statistical Validation",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            <em>Backtests. Walk-forwards. Monte Carlo.</em>
            <br/> Every signal earns its place with <strong>hard stats</strong> and <strong>no shortcuts</strong>.
          </p>
        </div>
      ),
    },
    {
      title: "Algorithmic Velocity",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            New models drop <strong>monthly</strong>. <br/>
            We adapt faster than the market changes — <em>and so will <strong>you</strong>.</em>
          </p>
        </div>
      ),
    },
    {
      title: "Trader-Driven Evolution",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            You're not just a <em>user</em>. Your feedback <strong>shapes</strong> our roadmap. 
            <br/> <strong>Real-world performance</strong> drives what we build next.
          </p>
        </div>
      ),
    },
    {
      title: "Transparent Logic",
      content: (
        <div>
          <p className="text-gray-200 text-base md:text-2xl font-normal mb-4 leading-relaxed">
            No black boxes. We break down the <em>"why"</em> and <em>"how"</em> behind every signal — so you can think like a <strong>system creator</strong>, not just a user.
          </p>
        </div>
      ),
    },
  ];

  
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
            colors={["#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={12}
            className="text-5xl md:text-5xl font-bold mb-6"
          >
            About QuantEdgeB
          </GradientText> 
          <p className="text-gray-100 max-w-3xl mx-auto text-lg">
            <em><strong>Empowering Traders. Going Beyond the Edge.</strong></em>
          </p>
        </motion.div>

        <div className="space-y-32">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {section.title}
                </h2>
                <p className="text-gray-200 mb-6 text-base md:text-lg leading-relaxed">
                  {section.description}
                </p>
                {section.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-base md:text-lg">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <Link to="/plans/premium">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="text-white group inline-flex items-center rounded-md"
                >
                  Check Our Plans
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
               </Link>
              </div>
            </motion.div>
          ))}

          {/* Our Core Pillars Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >

            <Timeline data={timelineData} />
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32"
        >
          <section className="py-20 px-4 relative">
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
        </motion.div>
      </div>
    </main>
  );
}

export default AboutPage;