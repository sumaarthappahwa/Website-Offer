
import { PackageType, PricingPlan, ProcessStep } from './types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your manufacturing niche or export markets to identify key competitors and target audience demographics."
  },
  {
    number: "02",
    title: "Architecture & UI Design",
    description: "Creating a sitemap that guides visitors through your capabilities, followed by a professional design that builds industrial trust."
  },
  {
    number: "03",
    title: "Agile Development",
    description: "Building a lightning-fast, mobile-responsive website using clean code that's easy for search engines to index."
  },
  {
    number: "04",
    title: "Content & Cataloging",
    description: "Integrating your product specifications, technical sheets, and business history with high-quality imagery."
  },
  {
    number: "05",
    title: "Marketing Setup",
    description: "Configuration of SEO, Google Business Profile, and Ad campaigns (for Growth/Premium) to ensure you are found by global buyers."
  },
  {
    number: "06",
    title: "Deployment & Training",
    description: "Final quality checks, domain/hosting launch, and a handover session to show you how to manage your new digital assets."
  }
];

export const PLANS: PricingPlan[] = [
  {
    id: PackageType.BASIC,
    name: "Essentials Plan",
    price: 7999,
    badgeText: "🔥 Only for the First 10 Businesses!",
    description: "A professional digital start tailored for SMEs wanting an immediate global identity. | Worth 10,000/- hosting and domain free for one year | 🔥 Act Fast — Limited launch offer for early sign‑ups only!",
    features: [
      "5-Page Website",
      "Free 1-Year Domain",
      "Free 1-Year Hosting",
      "SSL Certificate",
      "Mobile Responsive",
      "₹ 8,000 Flat Renewal"
    ],
    scope: [
      { title: "Design", description: "Clean, industrial-themed template customized with your logo and colors." },
      { title: "Development", description: "Single-fold architecture with optimized landing sections." },
      { title: "Pages", description: "Home, About, Services, Gallery, and Contact with Form integration." }
    ],
    razorpayLink: "https://rzp.io/rzp/hC0PBNjQ"
  },
  {
    id: PackageType.GROWTH,
    name: "Growth Pro",
    price: 18000,
    highlight: true,
    description: "For Manufacturers ready to lead the national market with advanced search visibility. | Worth 10,000/- hosting and domain free for one year | Includes full Google Business Profile (GBP) optimization and SEO.",
    features: [
      "Advanced Dynamic Website",
      "Everything in Essentials",
      "FREE SEO Services",
      "GBP Optimization",
      "Product Catalog (20 items)",
      "Priority Support",
      "₹ 8,000 Flat Renewal"
    ],
    scope: [
      { title: "SEO Integration", description: "On-page keyword optimization focused on your manufacturing niche." },
      { title: "Local Visibility", description: "Full setup and optimization of your Google Business Profile for local map ranking." },
      { title: "Product Catalog", description: "Dynamic product display with technical specifications and inquiry buttons per product." }
    ],
    razorpayLink: "https://rzp.io/rzp/URxLuVU"
  },
  {
    id: PackageType.PREMIUM,
    name: "Global Leader",
    price: 36000,
    description: "Tailored for high-scale Exporters looking to dominate international territories. | Worth 10,000/- hosting and domain free for one year | Includes premium ad credits for LinkedIn and Meta to jumpstart leads.",
    features: [
      "Advanced Dynamic Website",
      "Everything in Growth Pro",
      "Advanced SEO & Analytics",
      "$50 Meta Ads Credit",
      "$50 LinkedIn Ads Credit",
      "Multilingual Ready",
      "WhatsApp API Integration"
    ],
    scope: [
      { title: "Global SEO", description: "Technical SEO targeting international search intents and export keywords." },
      { title: "Paid Ads Launch", description: "We manage and set up your initial $100 ad spend across Meta and LinkedIn to jumpstart leads." },
      { title: "Export Features", description: "Multilingual content support and direct WhatsApp API for instant global inquiries." }
    ],
    razorpayLink: "https://rzp.io/rzp/CmTw7mZR"
  }
];
