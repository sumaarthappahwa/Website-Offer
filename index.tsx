
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
  message: string;
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
    badgeText: "🔥 Only for the First 10 Businesses!",
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
    features: ["Full SEO Setup", "GBP Optimization", "Catalog (20 items)", "Advanced Forms", "Priority Support", "₹ 8,000 Renewal"],
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
    features: ["Everything in Growth", "$50 Meta Ads", "$50 LinkedIn Ads", "Multilingual Support", "WhatsApp Integration", "₹ 8,000 Renewal"],
    scope: [
      { title: "Ads Launch", description: "Configuration and management of $100 total ad credit." },
      { title: "Global Reach", description: "International SEO architecture and multilingual capabilities." }
    ],
    razorpayLink: "https://rzp.io/rzp/OcOeP4sU"
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
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Website Inquiry - ExportLaunch";
    const body = `New Enquiry Details:
----------------------------------
Business: ${formData.businessName}
Contact: ${formData.contactPerson}
Email: ${formData.email}
Phone: ${formData.phone}
Package: ${formData.selectedPackage}
Message: ${formData.message}
----------------------------------`;
    window.location.href = `mailto:samar@bloggingstudio.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tighter">EXPORT<span className="text-slate-800">LAUNCH</span></div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#process" className="hover:text-blue-600 transition">Process</a>
          <a href="#contact" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-black rounded-full uppercase tracking-widest">Digital Powerhouse</span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Fueling Your <br />
              <span className="text-blue-600">Global Sales</span> Engine.
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Professional web development for exporters and manufacturers. One-year free domain/hosting. Fixed renewals. No hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a href="#services" className="px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1">
                View Launch Offers
              </a>
              <a href="#contact" className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 font-bold text-lg rounded-2xl hover:bg-slate-50 transition-all">
                Contact Sales
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
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
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Unbeatable Launch Packages</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Exclusive offers for Manufacturers & SMEs looking to digitize their legacy operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => {
              const isEssential = plan.id === PackageType.BASIC;
              const parts = plan.description.split(' | ');
              return (
                <div key={plan.id} className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col ${
                  plan.highlight 
                    ? 'border-blue-600 bg-white ring-8 ring-blue-50' 
                    : isEssential 
                      ? 'border-amber-400 bg-amber-50/30' 
                      : 'border-slate-100 bg-white'
                } hover:shadow-2xl`}>
                  <div className="flex-grow space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                      {plan.badgeText && (
                        <div className={`inline-block px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-tighter ${isEssential ? 'bg-amber-500 text-white' : 'bg-blue-100 text-blue-700'}`}>
                          {plan.badgeText}
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate-400">₹</span>
                      <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price.toLocaleString()}</span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 font-medium">{parts[0]}</p>
                      <div className={`p-4 rounded-xl border-2 ${isEssential ? 'bg-amber-100 border-amber-200' : 'bg-blue-50 border-blue-100'}`}>
                        <p className={`text-sm font-black ${isEssential ? 'text-amber-900' : 'text-blue-700'}`}>
                          {parts[1]}
                        </p>
                      </div>
                      <p className="text-xs italic text-slate-500 leading-relaxed">{parts[2]}</p>
                    </div>

                    <ul className="space-y-4 pt-6 border-t border-slate-100">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href={plan.razorpayLink} target="_blank" className={`mt-8 w-full py-4 rounded-xl text-center font-black transition-all ${
                    plan.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100' 
                      : isEssential 
                        ? 'bg-amber-500 text-white hover:bg-amber-600' 
                        : 'bg-slate-900 text-white hover:bg-black'
                  }`}>
                    Order Now
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
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">📞</div>
                    <span className="font-bold">+91 721 787 3028</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">✉️</div>
                    <span className="font-bold">samar@bloggingstudio.in</span>
                  </div>
                </div>
              </div>
              <div className="pt-10 text-xs font-bold opacity-50 uppercase tracking-widest">Available Mon-Sat</div>
            </div>
            <form onSubmit={handleSubmit} className="lg:col-span-3 p-12 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input required name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm" placeholder="Business Name" />
                <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm" placeholder="Contact Person" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm" placeholder="Work Email" />
                <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm" placeholder="Phone Number" />
              </div>
              <select name="selectedPackage" value={formData.selectedPackage} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm appearance-none">
                {PLANS.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>)}
              </select>
              <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm" placeholder="Industry details or specific requirements..."></textarea>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                Send Inquiry <span>🚀</span>
              </button>
              {formSubmitted && <p className="text-center text-green-600 font-bold text-sm">Thank you! We'll be in touch soon.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black text-blue-600">EXPORT<span className="text-slate-800">LAUNCH</span></div>
          <p className="text-slate-400 text-sm">© 2024 ExportLaunch Digital. Managed by bloggingstudio.in</p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- RENDER ---
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
