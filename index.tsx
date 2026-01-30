
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
enum PackageType {
  BASIC = 'BASIC',
  GROWTH = 'GROWTH',
  PREMIUM = 'PREMIUM'
}

interface ServiceScope {
  title: string;
  description: string;
}

interface PricingPlan {
  id: PackageType;
  name: string;
  price: number;
  description: string;
  features: string[];
  scope: ServiceScope[];
  highlight?: boolean;
  badgeText?: string;
  razorpayLink: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface FormData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  selectedPackage: PackageType;
  domainPref: string;
  message: string;
}

interface FAQItem {
  question: string;
  answer: string;
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
    title: "Design & UX",
    description: "Creating a professional interface that builds instant credibility with international clients."
  },
  {
    number: "03",
    title: "Development",
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
    scope: [
      { title: "Design", description: "Standard Industrial Template customized with your branding." },
      { title: "Pages", description: "Home, About, Services, Gallery, and Contact." }
    ],
    razorpayLink: "https://rzp.io/rzp/GDcsLwH"
  },
  {
    id: PackageType.GROWTH,
    name: "Growth Pro",
    price: 18000,
    highlight: true,
    description: "For Manufacturers ready to lead the national market with advanced search visibility. | Worth 10,000/- hosting and domain free for one year | Includes full Google Business Profile (GBP) optimization and SEO.",
    features: ["Advanced Dynamic Website", "Full SEO Setup", "GBP Optimization", "Catalog (20 items)", "Advanced Forms", "Priority Support", "₹ 8,000 Renewal"],
    scope: [
      { title: "SEO", description: "Comprehensive on-page keyword targeting for your industry." },
      { title: "Local Maps", description: "Optimization for Google Maps to capture nearby industrial leads." }
    ],
    razorpayLink: "https://rzp.io/rzp/dhV3ctX"
  },
  {
    id: PackageType.PREMIUM,
    name: "Global Leader",
    price: 36000,
    description: "Tailored for high-scale Exporters looking to dominate international territories. | Worth 10,000/- hosting and domain free for one year | Includes premium ad credits for LinkedIn and Meta to jumpstart leads.",
    features: ["Advanced Dynamic Website", "Everything in Growth", "$50 Meta Ads", "$50 LinkedIn Ads", "Multilingual Support", "WhatsApp Integration", "₹ 8,000 Renewal"],
    scope: [
      { title: "Ads Launch", description: "Configuration and management of $100 total ad credit." },
      { title: "Global Reach", description: "International SEO architecture and multilingual capabilities." }
    ],
    razorpayLink: "https://rzp.io/rzp/OcOeP4sU"
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
  },
  {
    question: "Do you provide technical support after the site goes live?",
    answer: "Yes, we provide priority support for all our clients. We also offer a training session for your team to ensure you can manage inquiries and minor updates independently."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes, our systems are built to scale. You can start with the Essentials plan and upgrade to Growth or Global Leader as your international operations expand."
  }
];

// --- COMPONENTS ---
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Manufacturer',
    selectedPackage: PackageType.GROWTH,
    domainPref: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getEmailBody = () => {
    return `New Enquiry Details:
----------------------------------
Business: ${formData.businessName}
Industry: ${formData.industry}
Contact: ${formData.contactPerson}
Email: ${formData.email}
Phone: ${formData.phone}
Package: ${formData.selectedPackage}
Domain Preference: ${formData.domainPref || 'Not specified'}
Message: ${formData.message}
----------------------------------`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website Inquiry - ${formData.businessName}`;
    const body = getEmailBody();
    
    // Attempting to open mail client via hidden anchor to avoid popup blockers
    const mailtoUrl = `mailto:samar@bloggingstudio.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();
    
    setFormSubmitted(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const body = getEmailBody();
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

      {/* Services/Pricing */}
      <section id="services" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Unbeatable Launch Packages</h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto">Dominate the EU, UK, New Zealand, Australia, and Africa before every big company starts replacing you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => {
              const isEssential = plan.id === PackageType.BASIC;
              const isGrowth = plan.id === PackageType.GROWTH;
              const parts = plan.description.split(' | ');
              
              return (
                <div key={plan.id} className={`p-10 rounded-[2.5rem] border-4 transition-all flex flex-col ${
                  isGrowth 
                    ? 'border-blue-500 bg-white ring-8 ring-blue-50' 
                    : isEssential 
                      ? 'border-[#FFC107] bg-white' 
                      : 'border-slate-100 bg-white'
                } hover:shadow-2xl`}>
                  <div className="flex-grow space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-900">{plan.name}</h3>
                      {isEssential && plan.badgeText && (
                        <div className="w-full py-2.5 bg-[#F59E0B] text-white text-[11px] font-black rounded-lg text-center tracking-tighter">
                          {plan.badgeText}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-bold text-slate-400">₹</span>
                      <span className="text-6xl font-black text-slate-900 tracking-tighter">{plan.price.toLocaleString()}</span>
                    </div>

                    <div className="space-y-6">
                      <p className="text-[15px] text-slate-600 font-semibold leading-relaxed">{parts[0]}</p>
                      <div className={`p-5 rounded-xl border-2 ${isEssential ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'}`}>
                        <p className={`text-[15px] font-black ${isEssential ? 'text-amber-900' : 'text-blue-700'}`}>
                          {parts[1]}
                        </p>
                      </div>
                      <p className="text-xs italic text-slate-400 leading-relaxed font-medium">{parts[2]}</p>
                    </div>

                    <ul className="space-y-4 pt-8 border-t border-slate-100">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-3.5 text-sm font-bold text-slate-700">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href={plan.razorpayLink} target="_blank" className={`mt-10 w-full py-5 rounded-2xl text-center font-black transition-all text-lg ${
                    plan.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100' 
                      : isEssential 
                        ? 'bg-[#F59E0B] text-white hover:bg-amber-600 shadow-xl shadow-amber-100' 
                        : 'bg-slate-900 text-white hover:bg-black'
                  }`}>
                    Order {plan.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 px-6 md:px-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Workflow</h2>
            <p className="text-slate-400 text-lg">Systematic engineering of your digital presence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {PROCESS_STEPS.map(step => (
              <div key={step.number} className="group">
                <div className="text-6xl font-black text-white/5 mb-4 group-hover:text-blue-600/20 transition-colors">{step.number}</div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Common Questions</h2>
            <p className="text-slate-500 text-lg">Everything you need to know about our industrial web services.</p>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden transition-all hover:border-blue-100">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-bold text-slate-900">{item.question}</span>
                  <span className={`text-2xl transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`}>
                    {openFaqIndex === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaqIndex === idx && (
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-600 p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-4">Start Your Project</h3>
                <p className="opacity-80 text-sm leading-relaxed mb-10">Connect with our specialists to blueprint your new website. No pressure, just strategy.</p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">📞</div>
                    <span className="font-bold">+91 721 787 3028</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">✉️</div>
                    <span className="font-bold">samar@bloggingstudio.in</span>
                  </div>
                </div>
              </div>
              <div className="pt-10 text-xs font-bold opacity-50 uppercase tracking-widest">Available Mon-Sat</div>
            </div>
            
            <div className="lg:col-span-3 p-12 space-y-6">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Business Name</label>
                      <input required name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="e.g. Acme Manufacturing" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Contact Person</label>
                      <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Industry Type</label>
                      <input name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="e.g. Textiles, Solar, Steel" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="+91 ..." />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Work Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="email@company.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Plan Selected</label>
                      <select name="selectedPackage" value={formData.selectedPackage} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold appearance-none cursor-pointer">
                        {PLANS.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price.toLocaleString()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Domain Preference</label>
                      <input name="domainPref" value={formData.domainPref} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="e.g. acme-export.com" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Requirements / Message</label>
                    <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-sm font-semibold" placeholder="Any specific requirements..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transform active:scale-95 duration-200">
                    Send Inquiry <span className="text-xl">🚀</span>
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl">✓</div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Inquiry Link Triggered!</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Your email client should have opened. If it didn't, please click the button below to copy the details and send them manually to <span className="text-blue-600 font-bold">samar@bloggingstudio.in</span>.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <button 
                      onClick={copyToClipboard}
                      className={`w-full py-4 rounded-xl font-black transition-all border-2 flex items-center justify-center gap-2 ${
                        copied ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {copied ? 'Copied to Clipboard! ✓' : 'Copy Details to Clipboard 📋'}
                    </button>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-slate-400 text-sm font-bold hover:text-slate-600 transition underline underline-offset-4"
                    >
                      Wait, I need to change something
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-white border-t border-slate-100 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black text-blue-600 uppercase">EXPORT<span className="text-slate-800">LAUNCH</span></div>
          <p className="text-slate-400 text-sm font-medium">© 2024 ExportLaunch Digital. Managed by bloggingstudio.in</p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-blue-600 transition underline underline-offset-4">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition underline underline-offset-4">Terms</a>
          </div>
        </div>
      </footer>

      {/* Fixed Mobile Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:hidden z-[60] bg-white/10 backdrop-blur-sm">
        <a href="#services" className="block w-full py-5 bg-red-600 text-white font-black text-lg rounded-2xl text-center shadow-[0_10px_30px_rgba(220,38,38,0.4)] active:scale-95 transition-all">
          Claim My Exclusive Offer
        </a>
      </div>
    </div>
  );
};

// --- RENDER ---
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
