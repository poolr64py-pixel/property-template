// lib/translations.ts
export type Locale = 'pt' | 'en' | 'es' | 'de';

// Traduções básicas embutidas no código - sem necessidade de arquivos JSON
const translations: Record<Locale, Record<string, string>> = {
  pt: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Carregando...',
    'common.currentLanguage': 'Idioma atual',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'hero.title': 'Villa Exclusiva para Aluguel',
    'hero.subtitle': 'Experimente o luxo em Florianópolis',
    'features.bedrooms': 'Quartos',
    'features.bathrooms': 'Banheiros',
    'features.guests': 'Hóspedes',
    'features.area': 'Área',
    'amenities.title': 'Comodidades',
    'location.title': 'Localização',
    'booking.title': 'Reserve Agora',
    'booking.button': 'Fazer Reserva'
  },
  en: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Loading...',
    'common.currentLanguage': 'Current Language',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Exclusive Villa for Rent',
    'hero.subtitle': 'Experience luxury in Florianópolis',
    'features.bedrooms': 'Bedrooms',
    'features.bathrooms': 'Bathrooms', 
    'features.guests': 'Guests',
    'features.area': 'Area',
    'amenities.title': 'Amenities',
    'location.title': 'Location',
    'booking.title': 'Book Now',
    'booking.button': 'Make Reservation'
  },
  es: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Cargando...',
    'common.currentLanguage': 'Idioma actual',
    'nav.home': 'Inicio',
    'nav.about': 'Acerca',
    'nav.contact': 'Contacto',
    'hero.title': 'Villa Exclusiva en Alquiler',
    'hero.subtitle': 'Experimenta el lujo en Florianópolis',
    'features.bedrooms': 'Habitaciones',
    'features.bathrooms': 'Baños',
    'features.guests': 'Huéspedes',
    'features.area': 'Área',
    'amenities.title': 'Comodidades',
    'location.title': 'Ubicación',
    'booking.title': 'Reservar Ahora',
    'booking.button': 'Hacer Reserva'
  },
  de: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Laden...',
    'common.currentLanguage': 'Aktuelle Sprache',
    'nav.home': 'Startseite',
    'nav.about': 'Über',
    'nav.contact': 'Kontakt',
    'hero.title': 'Exklusive Villa zur Miete',
    'hero.subtitle': 'Erleben Sie Luxus in Florianópolis',
    'features.bedrooms': 'Schlafzimmer',
    'features.bathrooms': 'Badezimmer',
    'features.guests': 'Gäste',
    'features.area': 'Fläche',
    'amenities.title': 'Ausstattung',
    'location.title': 'Lage',
    'booking.title': 'Jetzt Buchen',
    'booking.button': 'Reservierung Machen'
  }
};

export const getTranslations = (locale: Locale): Record<string, string> => {
  return translations[locale] || translations.pt;
};

export const getTranslation = (locale: Locale, key: string): string => {
  const localeTranslations = getTranslations(locale);
  return localeTranslations[key] || key;
};

export const LOCALES: Locale[] = ['pt', 'en', 'es', 'de'];

export const LOCALE_NAMES: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español', 
  de: 'Deutsch'
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
  de: '🇩🇪'
};