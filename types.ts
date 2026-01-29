
export enum PackageType {
  BASIC = 'BASIC',
  GROWTH = 'GROWTH',
  PREMIUM = 'PREMIUM'
}

export interface ServiceScope {
  title: string;
  description: string;
}

export interface PricingPlan {
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

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FormData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  selectedPackage: PackageType;
  domainPref: string;
  message: string;
}
