'use client';

import { useState, useEffect } from 'react';

// === TIPOS TYPESCRIPT ===
export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  area: number;
  plotSize?: number;
  buildYear: number;
  floors?: number;
  parking?: number;
  pool?: boolean;
  garden?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  elevator?: boolean;
  furnished?: 'full' | 'semi' | 'unfurnished';
  condition?: 'new' | 'excellent' | 'good' | 'renovation-needed';
}

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
    agency?: number;
    notary?: number;
    registration?: number;
  };
}

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
    outdoor?: string;
  };
  location: {
    description: string;
    nearbyAttractions: string[];
  };
}

export interface PropertyMedia {
  hero: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  gallery: Array<{
    src: string;
    alt: string;
    category: 'exterior' | 'interior' | 'outdoor';
  }>;
  floorPlan?: string;
  virtualTour?: string;
}

export interface PropertyConfig {
  property: {
    id: string;
    name: string;
    type: string;
    status: string;
    featured: boolean;
    location: PropertyLocation;
    specs: PropertySpecs;
    pricing: PropertyPricing;
  };
  content: Record<string, PropertyContent>;
  media: PropertyMedia;
  seo: Record<string, any>;
  website: {
    brand: any;
    contact: any;
    social: any;
    analytics: any;
  };
  features: Record<string, boolean>;
}

// === HOOK PRINCIPAL ===
export function useProperty(locale: string = 'pt') {
  const [config, setConfig] = useState<PropertyConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Importa a configuração dinâmica
        const configModule = await import('../config/property.config.js');
        const propertyConfig = configModule.default || configModule;
        
        setConfig(propertyConfig);
      } catch (err) {
        console.error('Erro ao carregar configuração da propriedade:', err);
        setError('Erro ao carregar dados da propriedade');
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // === FUNÇÕES UTILITÁRIAS ===
  
  // Obter conteúdo no idioma atual
  const getContent = (): PropertyContent | null => {
    if (!config) return null;
    return config.content[locale] || config.content['pt'] || null;
  };

  // Obter SEO no idioma atual
  const getSEO = () => {
    if (!config) return null;
    return config.seo[locale] || config.seo['pt'] || null;
  };

  // Formatação de preço
  const formatPrice = (price: number): string => {
    if (!config) return '';
    
    const { currency } = config.property.pricing;
    
    const formatter = new Intl.NumberFormat(locale === 'pt' ? 'pt-PT' : locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return formatter.format(price);
  };

  // Formatação de área
  const formatArea = (area: number): string => {
    return `${area.toLocaleString(locale)} m²`;
  };

  // Obter especificações formatadas
  const getFormattedSpecs = () => {
    if (!config) return null;
    
    const { specs } = config.property;
    const content = getContent();
    
    return {
      bedrooms: `${specs.bedrooms} ${specs.bedrooms === 1 ? 'quarto' : 'quartos'}`,
      bathrooms: `${specs.bathrooms} ${specs.bathrooms === 1 ? 'casa de banho' : 'casas de banho'}`,
      area: formatArea(specs.area),
      plotSize: specs.plotSize ? formatArea(specs.plotSize) : null,
      buildYear: specs.buildYear.toString(),
      parking: specs.parking ? `${specs.parking} ${specs.parking === 1 ? 'vaga' : 'vagas'}` : null
    };
  };

  // Obter amenidades
  const getAmenities = () => {
    if (!config) return [];
    
    const { specs } = config.property;
    const amenities = [];
    
    if (specs.pool) amenities.push({ key: 'pool', icon: '🏊‍♀️', label: 'Piscina' });
    if (specs.garden) amenities.push({ key: 'garden', icon: '🌳', label: 'Jardim' });
    if (specs.balcony) amenities.push({ key: 'balcony', icon: '🏡', label: 'Varanda' });
    if (specs.terrace) amenities.push({ key: 'terrace', icon: '🏖️', label: 'Terraço' });
    if (specs.elevator) amenities.push({ key: 'elevator', icon: '🛗', label: 'Elevador' });
    if (specs.parking && specs.parking > 0) {
      amenities.push({ key: 'parking', icon: '🚗', label: `Garagem (${specs.parking})` });
    }
    
    return amenities;
  };

  // Obter informações de contato formatadas
  const getContactInfo = () => {
    if (!config) return null;
    
    const { contact } = config.website;
    
    return {
      agent: {
        ...contact.agent,
        whatsappLink: `https://wa.me/${contact.agent.whatsapp.replace(/[^0-9]/g, '')}`,
        phoneLink: `tel:${contact.agent.phone}`,
        emailLink: `mailto:${contact.agent.email}`
      },
      office: {
        ...contact.office,
        phoneLink: `tel:${contact.office.phone}`,
        emailLink: `mailto:${contact.office.email}`
      }
    };
  };

  // Obter link do mapa
  const getMapLink = () => {
    if (!config?.property.location.coordinates) return null;
    
    const { lat, lng } = config.property.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  // Verificar se tem funcionalidade habilitada
  const hasFeature = (featureName: string): boolean => {
    if (!config) return false;
    return config.features[featureName] || false;
  };

  // Obter dados estruturados para SEO (Schema.org)
  const getStructuredData = () => {
    if (!config) return null;
    
    const content = getContent();
    const seo = getSEO();
    const { property } = config;
    
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": content?.title,
      "description": content?.description,
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "image": config.media.hero.desktop,
      "offers": {
        "@type": "Offer",
        "price": property.pricing.salePrice,
        "priceCurrency": property.pricing.currency,
        "availability": property.status === 'for-sale' ? 'InStock' : 'OutOfStock'
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.specs.area,
        "unitText": "m²"
      },
      "numberOfRooms": property.specs.bedrooms,
      "numberOfBathroomsTotal": property.specs.bathrooms,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.location.address,
        "addressLocality": property.location.city,
        "addressRegion": property.location.region,
        "postalCode": property.location.zipCode,
        "addressCountry": property.location.country
      }
    };
  };

  return {
    // Dados principais
    config,
    isLoading,
    error,
    
    // Conteúdo localizado
    content: getContent(),
    seo: getSEO(),
    
    // Funções utilitárias
    formatPrice,
    formatArea,
    getFormattedSpecs,
    getAmenities,
    getContactInfo,
    getMapLink,
    hasFeature,
    getStructuredData,
    
    // Dados diretos para facilitar acesso
    property: config?.property || null,
    media: config?.media || null,
    website: config?.website || null
  };
}

// === HOOKS ESPECÍFICOS ===

// Hook para galeria de imagens
export function usePropertyGallery() {
  const { media } = useProperty();
  const [currentImage, setCurrentImage] = useState(0);
  const [filter, setFilter] = useState<'all' | 'exterior' | 'interior' | 'outdoor'>('all');

  const filteredImages = media?.gallery.filter(img => 
    filter === 'all' || img.category === filter
  ) || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  return {
    images: filteredImages,
    currentImage,
    filter,
    setFilter,
    nextImage,
    prevImage,
    goToImage,
    hasImages: filteredImages.length > 0
  };
}

// Hook para calculadora de financiamento
export function useMortgageCalculator() {
  const { property } = useProperty();
  const [principal, setPrincipal] = useState(property?.pricing.salePrice || 0);
  const [downPayment, setDownPayment] = useState(0.2); // 20%
  const [interestRate, setInterestRate] = useState(0.035); // 3.5%
  const [loanTerm, setLoanTerm] = useState(30); // 30 anos

  const calculateMortgage = () => {
    const loanAmount = principal * (1 - downPayment);
    const monthlyRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(monthlyPayment * numberOfPayments),
      loanAmount: Math.round(loanAmount),
      downPaymentAmount: Math.round(principal * downPayment)
    };
  };

  return {
    principal,
    setPrincipal,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    calculateMortgage
  };
}