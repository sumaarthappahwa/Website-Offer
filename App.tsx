
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { PLANS, PROCESS_STEPS } from './constants';
import { PackageType, FormData } from './types';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = "New Website Enquiry";
    const body = `New Website Enquiry Details:
----------------------------------
Business Name: ${formData.businessName}
Contact Person: ${formData.contactPerson}
Email: ${formData.email}
Phone: ${formData.phone}
Selected Package: ${formData.selectedPackage}
Industry Context/Message: ${formData.message}
----------------------------------`;

    const mailtoUrl = `mailto:samar@bloggingstudio.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setFormSubmitted(true);
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">EXPORT<span className="text-slate-800">LAUNCH</span></div>
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#process" className="hover:text-blue-600 transition">Our Process</a>
          <a href="#contact" className="hover:text-blue-600 transition underline underline-offset-4 decoration-blue-500">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              Digital Growth for Industry
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Scale Your <span className="text-blue-600 underline decoration-4 underline-offset-8">Manufacturing</span> Business Globally.
            </h1>
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              This offer won’t last — professional sites for exporters with transparent pricing and guaranteed renewal rate.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="https://ai.studio/#services" 
                className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-rose-600 text-lg rounded-xl hover:from-red-700 hover:to-rose-700 shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:shadow-[0_20px_50px_rgba(225,29,72,0.5)] transform hover:-translate-y-2 hover:rotate-[-2deg] active:scale-95 active:rotate-0 focus:outline-none ring-4 ring-red-50"
              >
                <span>Claim My Spot Now</span>
                <svg className="w-6 h-6 ml-3 transition-transform duration-200 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
            <div className="flex items-center space-x-6 pt-4 text-sm font-medium text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=M${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by 500+ Industrial Partners</p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-400 font-mono">www.your-industry.com</div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-24 bg-blue-50 rounded-xl"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-slate-50 rounded-lg"></div>
                  <div className="h-16 bg-slate-50 rounded-lg"></div>
                  <div className="h-16 bg-slate-50 rounded-lg"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown Section */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Only a Few Spots Left to Go Digital Before Competitors Do!
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full my-6"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-700">Our Services & Scope</h3>
            <p className="text-slate-700 text-xl font-medium">Limited‑time packages crafted for manufacturers ready to dominate digital.</p>
            <p className="text-slate-500 max-w-3xl mx-auto text-lg italic mt-4">
              Dominate EU, USA, Australia, New Zealand, Africa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {PLANS.map((plan) => {
              const isEssential = plan.id === PackageType.BASIC;
              const descParts = plan.description.split(' | ');
              
              return (
                <div 
                  id={`plan-${plan.id}`} 
                  key={plan.id} 
                  className={`p-8 rounded-3xl border flex flex-col h-full transition group relative ${
                    plan.highlight 
                      ? 'border-blue-600 ring-4 ring-blue-50 bg-white' 
                      : isEssential 
                        ? 'border-orange-400 shadow-xl scale-105 z-10' 
                        : 'border-slate-100 bg-white'
                  } hover:shadow-2xl transform transition-transform duration-300`}
                  style={isEssential ? { backgroundColor: '#FFF7ED' } : {}}
                >
                  <div className="space-y-6 flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className={`text-2xl font-bold ${isEssential ? 'text-orange-900' : 'text-slate-900'}`}>{plan.name}</h3>
                        {plan.badgeText && (
                          <div className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${isEssential ? 'bg-orange-600 text-white animate-pulse' : 'bg-orange-100 text-orange-700'}`}>
                            {plan.badgeText}
                          </div>
                        )}
                      </div>
                      {plan.highlight && <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Recommended</span>}
                    </div>
                    <div className="text-4xl font-extrabold text-slate-900">₹ {plan.price.toLocaleString()}</div>
                    
                    {/* Multi-part Description Rendering */}
                    <div className="space-y-4">
                      <p className={`text-sm leading-relaxed ${isEssential ? 'text-orange-800 font-semibold' : 'text-slate-600'}`}>
                        {descParts[0]}
                      </p>
                      {descParts[1] && (
                        <div className={`p-4 rounded-xl border-2 ${isEssential ? 'bg-orange-200/50 border-orange-300' : 'bg-blue-50/50 border-blue-100'}`}>
                          <p className={`text-sm font-black ${isEssential ? 'text-orange-900' : 'text-blue-700'}`}>
                            {descParts[1]}
                          </p>
                        </div>
                      )}
                      {descParts[2] && (
                        <p className={`text-xs italic leading-relaxed ${isEssential ? 'text-orange-700' : 'text-slate-500'}`}>
                          {descParts[2]}
                        </p>
                      )}
                    </div>
                    
                    <div className={`pt-6 border-t space-y-6 ${isEssential ? 'border-orange-200' : 'border-slate-100'}`}>
                      <h4 className={`text-xs font-bold uppercase tracking-widest ${isEssential ? 'text-orange-900' : 'text-blue-600'}`}>Scope Breakdown</h4>
                      {plan.scope.map((s, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className={`text-sm font-bold ${isEssential ? 'text-slate-900' : 'text-slate-800'}`}>{s.title}</div>
                          <p className={`text-xs leading-normal ${isEssential ? 'text-slate-800' : 'text-slate-500'}`}>{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <a href={plan.razorpayLink} target="_blank" rel="noopener noreferrer" className={`block w-full py-4 text-center font-bold rounded-xl transition ${
                      plan.highlight 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                        : isEssential 
                          ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200' 
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}>
                      Order {plan.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-6 md:px-12 bg-slate-900 text-white rounded-t-[4rem] md:rounded-t-[8rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center mb-16">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">How We Build Your Digital Factory</h2>
              <p className="text-slate-400 text-lg max-w-2xl">
                Our step-by-step process ensures transparency and quality at every milestone. We don't just build websites; we build marketing engines.
              </p>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="p-8 bg-blue-600 rounded-2xl rotate-3 shadow-2xl">
                <p className="font-bold text-xl uppercase tracking-tighter">7-14 Day Delivery</p>
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

      {/* Offer Highlights Section */}
      <section className="py-24 px-6 md:px-12 bg-blue-50">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-blue-100 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Unbeatable Standard Offer</h2>
            <p className="text-slate-600 leading-relaxed">
              Every project comes with premium infrastructure to ensure your website stays fast and secure 24/7.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              <li className="flex items-center space-x-3 text-slate-700 font-medium">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Free 1-Year Domain</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 font-medium">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Free 1-Year Hosting</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 font-medium">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Same Renewal: ₹ 8,000</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 font-medium">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>SSL Security Layer</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-600 p-8 rounded-3xl text-white text-center min-w-[200px]">
            <div className="text-4xl font-black mb-1">ZERO</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-80">Setup Costs</div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
            <div className="md:col-span-2 bg-blue-600 p-10 text-white space-y-8">
              <h2 className="text-3xl font-bold">Get a Call Back</h2>
              <p className="opacity-80 leading-relaxed">Fill out your details, choose a package, and our team will contact you with a blueprint for your project.</p>
              <div className="space-y-4 pt-10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <span className="font-semibold">+91 721 787 3028</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <span className="font-semibold">samar@bloggingstudio.in</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Business Name</label>
                  <input required name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="XYZ Manufacturing" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Person</label>
                  <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="John Doe" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="john@xyz.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="+91 ..." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Package</label>
                <select name="selectedPackage" value={formData.selectedPackage} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none">
                  {PLANS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price.toLocaleString()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message / Domain Preference</label>
                <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Tell us about your industry..."></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center space-x-2">
                <span>Submit Inquiry</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>

              {formSubmitted && (
                <div className="p-4 bg-green-50 border border-green-100 text-green-700 text-sm font-medium rounded-lg animate-fade-in text-center">
                  Thank you! Your inquiry has been directed to samar@bloggingstudio.in. Please choose your package below.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-extrabold text-blue-600 tracking-tight">EXPORT<span className="text-slate-800">LAUNCH</span></div>
          <p className="text-slate-500 text-sm">© 2024 ExportLaunch Digital. Managed by samar@bloggingstudio.in</p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition underline">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition underline">Terms of Service</a>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default App;
