
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * GOOGLE APPS SCRIPT CODE (Paste this in Extensions > Apps Script of your Google Sheet):
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(), 
 *     data.businessName, 
 *     data.contactPerson, 
 *     data.email, 
 *     data.phone, 
 *     data.industry, 
 *     data.selectedPackage, 
 *     data.domainPref, 
 *     data.message
 *   ]);
 *   return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */

// REPLACE THIS with your deployed Web App URL from Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_placeholder/exec';

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

const PLANS: PricingPlan[] = [
  {
    id: PackageType.BASIC,
    name: "Essentials Plan",
    price: 7999,
    badgeText: "🔥 ONLY FOR THE FIRST 10 BUSINESSES!",
    description: "A professional digital start tailored for SMEs wanting an immediate global identity. | Worth 10,000/- hosting and domain free for one year | 🔥 Act Fast — Limited launch offer for early sign‑ups only!",
    features: ["5-Page Website", "Free Domain (1yr)", "Free Hosting (1yr)", "SSL Secure", "Mobile Responsive", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/GDcsLwH"
  },
  {
    id: PackageType.GROWTH,
    name: "Growth Pro",
    price: 18000,
    highlight: true,
    description: "For Manufacturers ready to lead the national market with advanced search visibility. | Worth 10,000/- hosting and domain free for one year | Includes full Google Business Profile (GBP) optimization and SEO.",
    features: ["Advanced Dynamic Website", "Full SEO Setup", "GBP Optimization", "Catalog (20 items)", "Advanced Forms", "Priority Support", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/dhV3ctX"
  },
  {
    id: PackageType.PREMIUM,
    name: "Global Leader",
    price: 36000,
    description: "Tailored for high-scale Exporters looking to dominate international territories. | Worth 10,000/- hosting and domain free for one year | Includes premium ad credits for LinkedIn and Meta to jumpstart leads.",
    features: ["Advanced Dynamic Website", "Everything in Growth", "$50 Meta Ads", "$50 LinkedIn Ads", "Multilingual Support", "WhatsApp Integration", "₹ 8,000 Renewal"],
    razorpayLink: "https://rzp.io/rzp/OcOeP4sU"
  }
];

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    selectedPackage: PackageType.GROWTH,
    domainPref: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send data to Google Sheets via Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script often requires no-cors for simple deployments
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Also open mailto as a fallback if the user wants to be 100% sure
      const subject = `New Website Inquiry - ${formData.businessName}`;
      const body = `New Enquiry Details:\nBusiness: ${formData.businessName}\nContact: ${formData.contactPerson}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPackage: ${formData.selectedPackage}\nMessage: ${formData.message}`;
      const mailtoUrl = `mailto:samar@bloggingstudio.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.click();

      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 pb-20 md:pb-0 font-['Inter']">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tighter uppercase">EXPORT<span className="text-slate-800">LAUNCH</span></div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#contact" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-gradient-to-b from-blue-50/50 to-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-black rounded-full uppercase tracking-widest">Digital Powerhouse</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Fueling Your <br />
              <span className="text-blue-600">Global Sales</span> Engine.
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto leading-relaxed">
              Professional web development for exporters and manufacturers. One-year free domain/hosting. Fixed renewals. No hidden costs.
            </p>
            <div className="pt-8">
              <a 
                href="#contact" 
                className="px-16 py-8 bg-red-600 text-white font-black text-2xl rounded-[2.5rem] hover:bg-red-700 shadow-[0_25px_60px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 transform active:scale-95 text-center ring-4 ring-red-100/30"
              >
                Claim My Exclusive Offer
              </a>
            </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="services" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Unbeatable Launch Packages</h2>
            <p className="text-slate-500 text-lg">Transparent pricing for industrial excellence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`p-8 rounded-3xl border-4 ${plan.highlight ? 'border-blue-500 ring-8 ring-blue-50' : 'border-slate-100'} flex flex-col h-full bg-white`}>
                <div className="flex-grow space-y-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-4xl font-black">₹{plan.price.toLocaleString()}</div>
                  <ul className="space-y-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#contact" className="mt-8 w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-center hover:bg-black transition">Select {plan.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Contact Form */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-600 p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-4">Start Your Project</h3>
                <p className="opacity-80 text-sm leading-relaxed mb-10">Your details will be sent directly to our team and logged in our system for immediate action.</p>
                <div className="space-y-6 font-bold">
                    <p>📞 +91 721 787 3028</p>
                    <p>✉️ samar@bloggingstudio.in</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl">✓</div>
                  <h3 className="text-2xl font-black">Message Received!</h3>
                  <p className="text-slate-500">We have logged your inquiry into our Google Sheet and our team will call you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold underline">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Business Name" />
                    <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Your Name" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Work Email" />
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Phone Number" />
                  </div>
                  <select name="selectedPackage" value={formData.selectedPackage} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold">
                    {PLANS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Briefly describe your products..."></textarea>
                  
                  <button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Connecting...
                      </>
                    ) : (
                      'Submit Inquiry 🚀'
                    )}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-xs font-bold text-center">Something went wrong. Please try again or call us directly.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t text-center text-slate-400 text-sm font-medium">
        © 2024 ExportLaunch | Managed by bloggingstudio.in
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
