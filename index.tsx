
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
enum PackageType {
  BASIC = 'BASIC',
  GROWTH = 'GROWTH',
  PREMIUM = 'PREMIUM'
}

interface PricingPlan {
  id: PackageType;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlight?: boolean;
  badgeText?: string;
  razorpayLink: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// --- CONSTANTS ---
const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We analyze your industrial niche to identify global buyer personas and competitor gaps."
  },
  {
    number: "02",
    title: "Architecture & UI",
    description: "Creating a professional interface that builds instant credibility with international clients."
  },
  {
    number: "03",
    title: "Agile Development",
    description: "Building a high-performance, mobile-first platform optimized for speed and conversion."
  },
  {
    number: "04",
    title: "Content & Catalog",
    description: "Structuring your product technical sheets and business profile for clarity."
  },
  {
    number: "05",
    title: "SEO & Growth",
    description: "Optimizing for search engines and setting up visibility channels (GBP/Ads)."
  },
  {
    number: "06",
    title: "Launch & Training",
    description: "Final deployment on premium hosting with a training session for your team."
  }
];

const PLANS: PricingPlan[] = [
  {
    id: PackageType.BASIC,
    name: "Essentials Plan",
    price: 7999,
    badgeText: "🔥 ONLY FOR THE FIRST 10 BUSINESSES!",
    description: "A professional digital start tailored for SMEs wanting an immediate global identity. | Worth 10,000/- hosting and domain free for one year | 🔥 Act Fast — Limited launch offer for early sign‑ups only!",
    features: ["5-Page Website", "Free Domain (1yr)", "Free Hosting (1yr)", "SSL Secure", "Mobile Responsive", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/hC0PBNjQ"
  },
  {
    id: PackageType.GROWTH,
    name: "Growth Pro",
    price: 18000,
    highlight: true,
    description: "For Manufacturers ready to lead the national market with advanced search visibility. | Worth 10,000/- hosting and domain free for one year | Includes full Google Business Profile (GBP) optimization and SEO.",
    features: ["Advanced Dynamic Website", "Full SEO Setup", "GBP Optimization", "Catalog (20 items)", "Advanced Forms", "Priority Support", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/URxLuVU"
  },
  {
    id: PackageType.PREMIUM,
    name: "Global Leader",
    price: 36000,
    description: "Tailored for high-scale Exporters looking to dominate international territories. | Worth 10,000/- hosting and domain free for one year | Includes premium ad credits for LinkedIn and Meta to jumpstart leads.",
    features: ["Advanced Dynamic Website", "Everything in Growth", "$50 Meta Ads", "$50 LinkedIn Ads", "Multilingual Support", "WhatsApp Integration", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/CmTw7mZR"
  }
];

const FAQ_DATA: FAQItem[] = [
  {
    question: "Does the price include domain and hosting?",
    answer: "Yes, all our plans include a premium domain and industrial-grade hosting for the first year (worth ₹10,000/-) at no extra cost to you."
  },
  {
    question: "What are the renewal costs after the first year?",
    answer: "We believe in complete transparency. Your renewal cost is fixed at ₹8,000/- per year, which covers your premium domain, high-speed hosting, and SSL security certificate."
  },
  {
    question: "How long does it take to launch my website?",
    answer: "Our standard turnaround time is 7 to 14 business days, depending on how quickly we receive your product technical sheets and business content."
  },
  {
    question: "Is the website optimized for mobile and tablets?",
    answer: "Absolutely. Every website we build is mobile-first and fully responsive, ensuring your global buyers can view your catalog perfectly on any device."
  }
];

// --- COMPONENTS ---
const App: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 pb-20 md:pb-0 font-['Inter']">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tighter uppercase">EXPORT<span className="text-slate-800">LAUNCH</span></div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#process" className="hover:text-blue-600 transition">Process</a>
          <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          <a href="#contact" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-gradient-to-b from-blue-50/50 to-white text-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-black rounded-full uppercase tracking-widest">Digital Powerhouse</span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Fueling Your <br />
              <span className="text-blue-600">Global Sales</span> Engine.
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto leading-relaxed">
              Professional web development for exporters and manufacturers. One-year free domain/hosting. Fixed renewals. No hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 w-full">
              <a 
                href="#services" 
                className="px-16 py-8 bg-red-600 text-white font-black text-2xl rounded-[2.5rem] hover:bg-red-700 shadow-[0_25px_60px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 transform active:scale-95 text-center ring-4 ring-red-100/30"
              >
                Claim My Exclusive Offer
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block text-left">
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl -rotate-3"></div>
            <div className="relative z-10 p-10 bg-white rounded-3xl border border-slate-100 shadow-2xl">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-32 bg-blue-50 rounded-xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-slate-50 rounded-lg"></div>
                  <div className="h-20 bg-slate-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="services" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-20 tracking-tight">Unbeatable Launch Packages</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan) => {
              const isEssential = plan.id === PackageType.BASIC;
              const isGrowth = plan.highlight;
              
              return (
                <div key={plan.id} className={`p-8 rounded-[2.5rem] border-4 transition-all flex flex-col relative ${
                  isEssential 
                    ? 'border-orange-400 bg-orange-50/30 scale-105 z-10 shadow-xl' 
                    : isGrowth 
                      ? 'border-blue-500 bg-white ring-8 ring-blue-50' 
                      : 'border-slate-100 bg-white'
                } hover:shadow-2xl transform transition-transform duration-300`}>
                  
                  {isGrowth && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Recommended</span>
                  )}
                  
                  <div className="flex-grow space-y-6">
                    <div className="space-y-2">
                      <h3 className={`text-3xl font-black ${isEssential ? 'text-orange-900' : 'text-slate-900'}`}>{plan.name}</h3>
                      {plan.badgeText && (
                        <div className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg inline-block ${isEssential ? 'bg-orange-600 text-white animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                          {plan.badgeText}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-5xl font-black text-slate-900">₹{plan.price.toLocaleString()}</div>
                    
                    <div className="space-y-4">
                      <p className={`text-sm leading-relaxed text-left ${isEssential ? 'text-orange-800 font-semibold' : 'text-slate-600'}`}>
                        {plan.description.split(' | ')[0]}
                      </p>
                    </div>

                    <ul className="space-y-3 text-left pt-6 border-t border-slate-100">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <span className={isEssential ? 'text-orange-500' : 'text-green-500'}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href={plan.razorpayLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`mt-10 w-full py-5 rounded-2xl text-center font-black transition-all text-lg shadow-lg ${
                      isEssential 
                        ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100' 
                        : isGrowth 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                          : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                  >
                    Order {plan.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 md:px-12 bg-slate-900 text-white rounded-t-[4rem] md:rounded-t-[8rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center mb-16">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white">Our Workflow</h2>
              <p className="text-slate-400 text-lg max-w-2xl">
                Systematic engineering of your digital presence. We don't just build websites; we build marketing engines for industrial growth.
              </p>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="p-8 bg-blue-600 rounded-2xl rotate-3 shadow-2xl">
                <p className="font-black text-xl uppercase tracking-tighter">7-14 Day Delivery</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="relative group">
                <div className="text-6xl font-black text-white/5 absolute -top-8 -left-4 group-hover:text-blue-500/20 transition duration-500">{step.number}</div>
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-1 bg-blue-600 mb-4 rounded-full"></div>
                  <h4 className="text-xl font-bold">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-slate-50 font-bold text-lg text-slate-900"
                >
                  {item.question}
                  <span className="text-blue-600">{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Responsive Iframe */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-600 p-12 text-white flex flex-col justify-start">
              <div className="space-y-12">
                <h3 className="text-4xl font-black tracking-tight">Start Your Project</h3>
                <div className="space-y-10 font-bold">
                    <div className="flex flex-col gap-2">
                      <span className="text-4xl">📞</span>
                      <span className="text-2xl tracking-tight">+91 721 787 3028</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-4xl">✉️</span>
                      <span className="text-2xl tracking-tight">samar@bloggingstudio.in</span>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-0 sm:p-4 flex justify-center items-center bg-white">
              <div className="w-full h-full min-h-[500px] flex items-center justify-center">
                <iframe 
                  src="https://automateforms.ai/form/36093e18-3273-4fd5-9ba5-c5bcf48e97d8?embedded=true" 
                  className="w-full h-full min-h-[500px] sm:min-h-[488px] border-0"
                  style={{ width: '100%', height: '550px', border: 'none' }}
                  title="Contact Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white border-t text-center text-slate-400 text-sm">
        © 2024 ExportLaunch | Managed by bloggingstudio.in
      </footer>
    </div>
  );
};

// --- RENDER ---
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
