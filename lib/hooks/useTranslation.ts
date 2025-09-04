'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Locale = 'pt' | 'en' | 'es' | 'de';

export const LOCALES: Locale[] = ['pt', 'en', 'es', 'de'];

export const LOCALE_NAMES = {
  pt: 'Português',
  en: 'English', 
  es: 'Español',
  de: 'Deutsch'
} as const;

export const LOCALE_FLAGS = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸', 
  de: '🇩🇪'
} as const;

// Traduções básicas
const translations: Record<Locale, Record<string, string>> = {
  pt: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Carregando...',
    'common.currentLanguage': 'Idioma atual',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato'
  },
  en: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Loading...',
    'common.currentLanguage': 'Current Language',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact'
  },
  es: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Cargando...',
    'common.currentLanguage': 'Idioma actual',
    'nav.home': 'Inicio',
    'nav.about': 'Acerca',
    'nav.contact': 'Contacto'
  },
  de: {
    'brand.name': 'Villa Sunshine',
    'common.loading': 'Laden...',
    'common.currentLanguage': 'Aktuelle Sprache',
    'nav.home': 'Startseite',
    'nav.about': 'Über',
    'nav.contact': 'Kontakt'
  }
};

interface ContextType {
  locale: Locale;
  t: (key: string) => string;
  switchLanguage: (locale: Locale) => void;
  isLoading: boolean;
}

const TranslationContext = createContext<ContextType>({
  locale: 'pt',
  t: (key: string) => key,
  switchLanguage: () => {},
  isLoading: false
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt');

  const t = (key: string): string => {
    return translations[locale]?.[key] || key;
  };

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const contextValue = {
    locale,
    t,
    switchLanguage,
    isLoading: false
  };

  return React.createElement(
    TranslationContext.Provider,
    { value: contextValue },
    children
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  return context;
}