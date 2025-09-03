import type { Locale, PropertySpecs, PropertyPricing, Amenity } from '../types/property';

// === FORMATAÇÃO DE PREÇOS ===
export function formatPrice(price: number, currency: string, locale: Locale = 'pt'): string {
  const localeMap = {
    pt: 'pt-PT',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };
  
  const formatter = new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(price);
}

// === FORMATAÇÃO DE ÁREA ===
export function formatArea(area: number, locale: Locale = 'pt'): string {
  const formattedArea = area.toLocaleString(locale === 'pt' ? 'pt-PT' : locale);
  return `${formattedArea} m²`;
}

// === FORMATAÇÃO DE ESPECIFICAÇÕES ===
export function formatSpecs(specs: PropertySpecs, locale: Locale = 'pt'): {
  bedrooms: string;
  bathrooms: string;
  area: string;
  plotSize: string | null;
  buildYear: string;
  parking: string | null;
} {
  const translations = {
    pt: {
      bedroom: 'quarto',
      bedrooms: 'quartos',
      bathroom: 'casa de banho',
      bathrooms: 'casas de banho',
      parking_space: 'vaga',
      parking_spaces: 'vagas'
    },
    en: {
      bedroom: 'bedroom',
      bedrooms: 'bedrooms',
      bathroom: 'bathroom',
      bathrooms: 'bathrooms',
      parking_space: 'parking space',
      parking_spaces: 'parking spaces'
    },
    es: {
      bedroom: 'dormitorio',
      bedrooms: 'dormitorios',
      bathroom: 'baño',
      bathrooms: 'baños',
      parking_space: 'plaza',
      parking_spaces: 'plazas'
    },
    de: {
      bedroom: 'Schlafzimmer',
      bedrooms: 'Schlafzimmer',
      bathroom: 'Badezimmer',
      bathrooms: 'Badezimmer',
      parking_space: 'Parkplatz',
      parking_spaces: 'Parkplätze'
    }
  };

  const t = translations[locale];

  return {
    bedrooms: `${specs.bedrooms} ${specs.bedrooms === 1 ? t.bedroom : t.bedrooms}`,
    bathrooms: `${specs.bathrooms} ${specs.bathrooms === 1 ? t.bathroom : t.bathrooms}`,
    area: formatArea(specs.area, locale),
    plotSize: specs.plotSize ? formatArea(specs.plotSize, locale) : null,
    buildYear: specs.buildYear.toString(),
    parking: specs.parking ? `${specs.parking} ${specs.parking === 1 ? t.parking_space : t.parking_spaces}` : null
  };
}

// === FORMATAÇÃO DE DATAS ===
export function formatDate(dateString: string, locale: Locale = 'pt'): string {
  const date = new Date(dateString);
  const localeMap = {
    pt: 'pt-PT',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };

  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// === GERAÇÃO DE AMENIDADES ===
export function generateAmenities(specs: PropertySpecs, locale: Locale = 'pt'): Amenity[] {
  const translations = {
    pt: {
      pool: 'Piscina',
      garden: 'Jardim',
      balcony: 'Varanda',
      terrace: 'Terraço',
      elevator: 'Elevador',
      parking: 'Garagem'
    },
    en: {
      pool: 'Swimming Pool',
      garden: 'Garden',
      balcony: 'Balcony',
      terrace: 'Terrace',
      elevator: 'Elevator',
      parking: 'Parking'
    },
    es: {
      pool: 'Piscina',
      garden: 'Jardín',
      balcony: 'Balcón',
      terrace: 'Terraza',
      elevator: 'Ascensor',
      parking: 'Garaje'
    },
    de: {
      pool: 'Schwimmbad',
      garden: 'Garten',
      balcony: 'Balkon',
      terrace: 'Terrasse',
      elevator: 'Aufzug',
      parking: 'Parkplatz'
    }
  };

  const t = translations[locale];
  const amenities: Amenity[] = [];
  
  if (specs.pool) amenities.push({ key: 'pool', icon: '🏊‍♀️', label: t.pool });
  if (specs.garden) amenities.push({ key: 'garden', icon: '🌳', label: t.garden });
  if (specs.balcony) amenities.push({ key: 'balcony', icon: '🏡', label: t.balcony });
  if (specs.terrace) amenities.push({ key: 'terrace', icon: '🏖️', label: t.terrace });
  if (specs.elevator) amenities.push({ key: 'elevator', icon: '🛗', label: t.elevator });
  if (specs.parking && specs.parking > 0) {
    amenities.push({ 
      key: 'parking', 
      icon: '🚗', 
      label: `${t.parking} (${specs.parking})`
    });
  }
  
  return amenities;
}

// === FORMATAÇÃO DE LINKS DE CONTATO ===
export function formatContactLinks(phone: string, email: string, whatsapp?: string) {
  return {
    phoneLink: `tel:${phone.replace(/[^+0-9]/g, '')}`,
    emailLink: `mailto:${email}`,
    whatsappLink: whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}` : undefined
  };
}

// === FORMATAÇÃO DE COORDENADAS PARA MAPAS ===
export function formatMapLink(lat: number, lng: number, address?: string): string {
  const query = address ? encodeURIComponent(address) : `${lat},${lng}`;
  return `https://www.google.com/maps?q=${query}`;
}

// === FORMATAÇÃO DE PREÇO POR M² ===
export function calculatePricePerSqm(price: number, area: number): number {
  return Math.round(price / area);
}

// === FORMATAÇÃO DE NÚMEROS COMPACTOS ===
export function formatCompactNumber(num: number, locale: Locale = 'pt'): string {
  const localeMap = {
    pt: 'pt-PT',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };

  return new Intl.NumberFormat(localeMap[locale], {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
}

// === FORMATAÇÃO DE PORCENTAGENS ===
export function formatPercentage(value: number, locale: Locale = 'pt'): string {
  const localeMap = {
    pt: 'pt-PT',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value / 100);
}

// === VALIDAÇÃO DE DADOS ===
export function validatePropertyData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.property?.name) errors.push('Nome da propriedade é obrigatório');
  if (!data.property?.location?.city) errors.push('Cidade é obrigatória');
  if (!data.property?.specs?.bedrooms || data.property.specs.bedrooms < 0) {
    errors.push('Número de quartos deve ser maior que 0');
  }
  if (!data.property?.specs?.area || data.property.specs.area < 1) {
    errors.push('Área deve ser maior que 1m²');
  }
  if (!data.property?.pricing?.currency) errors.push('Moeda é obrigatória');

  return {
    isValid: errors.length === 0,
    errors
  };
}

// === SLUGIFY PARA URLs ===
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}