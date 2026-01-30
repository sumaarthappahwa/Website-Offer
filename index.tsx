
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * GOOGLE APPS SCRIPT SETUP (Mandatory for the form to work):
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1YcHBDwZ6cYFmiyeejkH-l6NNtUmubP-yiNkDNr-ZyfU/edit
 * 2. Go to Extensions > Apps Script.
 * 3. Delete existing code and paste this:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   
 *   // Save to Sheet
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
 *   
 *   // Send Email
 *   var recipient = "findtarunph@gmail.com";
 *   var subject = "New Website Inquiry from " + data.businessName;
 *   var body = "You have a new inquiry:\n\n" +
 *              "Business: " + data.businessName + "\n" +
 *              "Contact: " + data.contactPerson + "\n" +
 *              "Email: " + data.email + "\n" +
 *              "Phone: " + data.phone + "\n" +
 *              "Industry: " + data.industry + "\n" +
 *              "Package: " + data.selectedPackage + "\n" +
 *              "Domain Pref: " + data.domainPref + "\n" +
 *              "Message: " + data.message;
 *   
 *   MailApp.sendEmail(recipient, subject, body);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me'.
 * 7. Set 'Who has access' to 'Anyone'.
 * 8. Deploy and copy the Web App URL into the SCRIPT_URL variable below.
 */

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzL5z7k5xH0-placeholder/exec'; // Replace with your actual URL after deployment

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Since we use no-cors, we can't check the response body, 
      // but if the fetch doesn't throw, we assume success or the request was sent.
      setStatus('success');
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: '',
        selectedPackage: PackageType.GROWTH,
        domainPref: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 pb-20 md:pb-0 font-['Inter']">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tighter uppercase">EXPORT<span className="text-slate-800">LAUNCH</span></div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
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
                href="#contact" 
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

      {/* Pricing */}
      <section id="services" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-20 tracking-tight">Unbeatable Launch Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`p-8 rounded-[2.5rem] border-4 transition-all flex flex-col ${plan.highlight ? 'border-blue-500 bg-white ring-8 ring-blue-50' : 'border-slate-100 bg-white'} hover:shadow-2xl`}>
                <div className="flex-grow space-y-6">
                  <h3 className="text-3xl font-black">{plan.name}</h3>
                  <div className="text-5xl font-black text-slate-900">₹{plan.price.toLocaleString()}</div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#contact" className="mt-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition">Select {plan.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-slate-50 font-bold text-lg"
                >
                  {item.question}
                  <span>{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                {openFaqIndex === idx && <div className="px-8 pb-8 text-slate-500 font-medium">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Contact Form */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-600 p-12 text-white flex flex-col justify-between">
              <div className="space-y-8">
                <h3 className="text-3xl font-black">Start Your Project</h3>
                <p className="opacity-80">Your details will be automatically logged in our tracking system and sent to findtarunph@gmail.com for immediate action.</p>
                <div className="space-y-4 font-bold">
                    <p>📞 +91 721 787 3028</p>
                    <p>✉️ samar@bloggingstudio.in</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in scale-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl">✓</div>
                  <h3 className="text-2xl font-black">Success!</h3>
                  <p className="text-slate-500 font-medium">Your inquiry has been sent to our team. We'll be in touch within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold underline">Submit another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Business Name" />
                    <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Your Name" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Email" />
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Phone" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Industry (e.g. Textiles)" />
                    <select name="selectedPackage" value={formData.selectedPackage} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold">
                      {PLANS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <input name="domainPref" value={formData.domainPref} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Domain Preference (optional)" />
                  <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" placeholder="Requirements..."></textarea>
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Inquiry 🚀'}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-center font-bold text-xs">Error sending inquiry. Please check your connection.</p>}
                </form>
              )}
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
