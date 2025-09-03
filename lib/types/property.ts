// === TIPOS BÁSICOS ===
export type Locale = 'pt' | 'en' | 'es' | 'de';
export type PropertyType = 'villa' | 'apartment' | 'house' | 'commercial' | 'land';
export type PropertyStatus = 'for-sale' | 'for-rent' | 'sold' | 'rented';
export type FurnishedLevel = 'full' | 'semi' | 'unfurnished';
export type PropertyCondition = 'new' | 'excellent' | 'good' | 'renovation-needed';
export type ImageCategory = 'exterior' | 'interior' | 'outdoor';

// === LOCALIZAÇÃO ===
export interface PropertyLocation {
  country: string;
  region: string;
  city: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
  zipCode?: string;
}

// === ESPECIFICAÇÕES ===
export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  plotSize?: number; // m²
  buildYear: number;
  floors?: number;
  parking?: number;
  pool?: boolean;
  garden?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  elevator?: boolean;
  furnished?: FurnishedLevel;
  condition?: PropertyCondition;
  energyRating?: string; // A+, A, B, C, D, E, F
}

// === PREÇOS E TAXAS ===
export interface PropertyPricing {
  salePrice?: number;
  rentPrice?: number;
  currency: string;
  pricePerSqm?: number;
  deposits?: {
    booking?: number;
    security?: number;
  };
  fees?: {
    agency?: number; // porcentagem
    notary?: number;
    registration?: number;
    legal?: number;
  };
  mortgageInfo?: {
    monthlyPayment?: number;
    interestRate?: number;
    loanTerm?: number; // anos
  };
}

// === CONTEÚDO LOCALIZADO ===
export interface PropertyContent {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  rooms: {
    livingRoom?: string;
    kitchen?: string;
    masterBedroom?: string;
    bedrooms?: string;
    bathrooms?: string;
    outdoor?: string;
    garage?: string;
    basement?: string;
    attic?: string;
  };
  location: {
    description: string;
    nearbyAttractions: string[];
    transportation?: string[];
  };
  legalInfo?: {
    ownership: string;
    taxes: string;
    permits: string;
  };
}

// === MÍDIA E ASSETS ===
export interface PropertyImage {
  src: string;
  alt: string;
  category: ImageCategory;
  featured?: boolean;
  order?: number;
}

export interface PropertyMedia {
  hero: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  gallery: PropertyImage[];
  floorPlan?: string;
  virtualTour?: string;
  video?: string;
  brochure?: string;
}

// === SEO E METADATA ===
export interface PropertySEO {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// === INFORMAÇÕES DE CONTATO ===
export interface AgentInfo {
  name: string;
  phone: string;
  email: string;
  whatsapp?: string;
  photo?: string;
  license?: string;
  languages?: Locale[];
}

export interface OfficeInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
}

export interface ContactInfo {
  agent: AgentInfo;
  office: OfficeInfo;
}

// === CONFIGURAÇÃO DO SITE ===
export interface WebsiteConfig {
  brand: {
    name: string;
    logo?: string;
    favicon?: string;
  };
  contact: ContactInfo;
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
    gtmId?: string;
  };
}

// === FUNCIONALIDADES DO SITE ===
export interface SiteFeatures {
  showVirtualTour: boolean;
  showMortgageCalculator: boolean;
  showContactForm: boolean;
  showSimilarProperties: boolean;
  showNeighborhoodInfo: boolean;
  enableScheduleVisit: boolean;
  enablePriceAlerts: boolean;
  showEnergyRating: boolean;
  showFloorPlan: boolean;
  enableShare: boolean;
  enablePrint: boolean;
  showPropertyHistory: boolean;
}

// === DADOS PRINCIPAIS DA PROPRIEDADE ===
export interface PropertyData {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  dateAdded: string;
  dateUpdated?: string;
  location: PropertyLocation;
  specs: PropertySpecs;
  pricing: PropertyPricing;
}

// === CONFIGURAÇÃO COMPLETA ===
export interface PropertyConfig {
  property: PropertyData;
  content: Record<Locale, PropertyContent>;
  media: PropertyMedia;
  seo: Record<Locale, PropertySEO>;
  website: WebsiteConfig;
  features: SiteFeatures;
}

// === TIPOS UTILITÁRIOS ===
export interface FormattedSpecs {
  bedrooms: string;
  bathrooms: string;
  area: string;
  plotSize: string | null;
  buildYear: string;
  parking: string | null;
}

export interface Amenity {
  key: string;
  icon: string;
  label: string;
}

export interface ContactLinks {
  agent: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
    photo?: string;
    whatsappLink?: string;
    phoneLink: string;
    emailLink: string;
  };
  office: {
    name: string;
    address: string;
    phone: string;
    email: string;
    phoneLink: string;
    emailLink: string;
  };
}

// === FILTROS E BUSCAS ===
export interface PropertyFilters {
  priceRange?: {
    min: number;
    max: number;
  };
  areaRange?: {
    min: number;
    max: number;
  };
  bedrooms?: number[];
  type?: PropertyType[];
  status?: PropertyStatus[];
  features?: string[];
  location?: string;
}

// === COMPARAÇÃO DE PROPRIEDADES ===
export interface PropertyComparison {
  properties: PropertyData[];
  criteria: string[];
}

// === HISTÓRICO DE PREÇOS ===
export interface PriceHistory {
  date: string;
  price: number;
  change?: number;
  reason?: string;
}