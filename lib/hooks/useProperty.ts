'use client';

import { useState, useEffect } from 'react';
import type { 
  PropertyConfig, 
  PropertyContent, 
  PropertySEO, 
  Locale, 
  ContactLinks, 
  Amenity,
  FormattedSpecs
} from '../types/property';
import { 
  formatPrice, 
  formatArea, 
  formatSpecs, 
  generateAmenities, 
  formatContactLinks, 
  formatMapLink,
  calculatePricePerSqm
} from '../utils/formatters';

// === HOOK PRINCIPAL ===
export function useProperty(locale: Locale = 'pt') {
  const [config, setConfig] = useState<PropertyConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Importa a configuração dinâmica
        const configModule = await import('../../config/property.config.ts');
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

  // === FUNÇÕES DE CONTEÚDO LOCALIZADO ===
  
  const getContent = (): PropertyContent | null => {
    if (!config) return null;
    return config.content[locale] || config.content['pt'] || null;
  };

  const getSEO = (): PropertySEO | null => {
    if (!config) return null;
    return config.seo[locale] || config.seo['pt'] || null;
  };

  // === FUNÇÕES DE FORMATAÇÃO ===
  
  const formatPropertyPrice = (price: number): string => {
    if (!config) return '';
    return formatPrice(price, config.property.pricing.currency, locale);
  };

  const formatPropertyArea = (area: number): string => {
    return formatArea(area, locale);
  };

  const getFormattedSpecs = (): FormattedSpecs | null => {
    if (!config) return null;
    return formatSpecs(config.property.specs, locale);
  };

  const getAmenities = (): Amenity[] => {
    if (!config) return [];
    return generateAmenities(config.property.specs, locale);
  };

  // === INFORMAÇÕES DE CONTATO ===
  
  const getContactInfo = (): ContactLinks | null => {
    if (!config) return null;
    
    const { contact } = config.website;
    
    return {
      agent: {
        ...contact.agent,
        ...formatContactLinks(contact.agent.phone, contact.agent.email, contact.agent.whatsapp)
      },
      office: {
        ...contact.office,
        ...formatContactLinks(contact.office.phone, contact.office.email)
      }
    };
  };

  // === INFORMAÇÕES DE LOCALIZAÇÃO ===
  
  const getMapLink = (): string | null => {
    if (!config?.property.location.coordinates) return null;
    
    const { lat, lng } = config.property.location.coordinates;
    return formatMapLink(lat, lng, config.property.location.address);
  };

  // === FUNCIONALIDADES ===
  
  const hasFeature = (featureName: keyof PropertyConfig['features']): boolean => {
    if (!config) return false;
    return config.features[featureName] || false;
  };

  // === CÁLCULOS FINANCEIROS ===
  
  const getPricePerSqm = (): number | null => {
    if (!config?.property.pricing.salePrice || !config?.property.specs.area) return null;
    return calculatePricePerSqm(config.property.pricing.salePrice, config.property.specs.area);
  };

  const getFormattedPricePerSqm = (): string | null => {
    const pricePerSqm = getPricePerSqm();
    if (!pricePerSqm || !config) return null;
    return formatPrice(pricePerSqm, config.property.pricing.currency, locale);
  };

  // === SEO E METADATA ===
  
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
      "yearBuilt": property.specs.buildYear,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.location.address,
        "addressLocality": property.location.city,
        "addressRegion": property.location.region,
        "postalCode": property.location.zipCode,
        "addressCountry": property.location.country
      },
      "geo": property.location.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": property.location.coordinates.lat,
        "longitude": property.location.coordinates.lng
      } : undefined
    };
  };

  // === INFORMAÇÕES DE STATUS ===
  
  const isForSale = (): boolean => {
    return config?.property.status === 'for-sale' || false;
  };

  const isForRent = (): boolean => {
    return config?.property.status === 'for-rent' || false;
  };

  const isFeatured = (): boolean => {
    return config?.property.featured || false;
  };

  return {
    // Dados principais
    config,
    isLoading,
    error,
    
    // Conteúdo localizado
    content: getContent(),
    seo: getSEO(),
    
    // Funções de formatação
    formatPrice: formatPropertyPrice,
    formatArea: formatPropertyArea,
    getFormattedSpecs,
    getAmenities,
    getContactInfo,
    getMapLink,
    getPricePerSqm,
    getFormattedPricePerSqm,
    
    // Funcionalidades
    hasFeature,
    getStructuredData,
    
    // Status
    isForSale,
    isForRent,
    isFeatured,
    
    // Dados diretos para facilitar acesso
    property: config?.property || null,
    media: config?.media || null,
    website: config?.website || null,
    features: config?.features || null
  };
}

// === HOOK PARA GALERIA DE IMAGENS ===
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
    currentImageData: filteredImages[currentImage] || null,
    filter,
    setFilter,
    nextImage,
    prevImage,
    goToImage,
    hasImages: filteredImages.length > 0,
    totalImages: filteredImages.length
  };
}

// === HOOK PARA CALCULADORA DE FINANCIAMENTO ===
export function useMortgageCalculator() {
  const { property } = useProperty();
  const [principal, setPrincipal] = useState(property?.pricing.salePrice || 0);
  const [downPayment, setDownPayment] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(3.5); // 3.5%
  const [loanTerm, setLoanTerm] = useState(30); // 30 anos

  useEffect(() => {
    if (property?.pricing.salePrice) {
      setPrincipal(property.pricing.salePrice);
    }
  }, [property?.pricing.salePrice]);

  const calculateMortgage = () => {
    const loanAmount = principal * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / numberOfPayments;
      return {
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: 0,
        totalAmount: Math.round(loanAmount),
        loanAmount: Math.round(loanAmount),
        downPaymentAmount: Math.round(principal * downPayment / 100)
      };
    }
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(monthlyPayment * numberOfPayments),
      loanAmount: Math.round(loanAmount),
      downPaymentAmount: Math.round(principal * downPayment / 100)
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
    calculateMortgage,
    currency: property?.pricing.currency || 'EUR'
  };
}