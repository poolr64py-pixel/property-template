'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos
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

interface TranslationContextType {
  locale: Locale;
  t: (key: string) => string;
  switchLanguage: (locale: Locale) => void;
  isLoading: boolean;
  translations: any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Cache global para traduções
const translationCache = new Map<Locale, any>();

// Função para carregar traduções
async function loadTranslations(locale: Locale): Promise<any> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }

  try {
    let translationModule;
    
    switch (locale) {
      case 'en':
        translationModule = await import('../locales/en/common.json');
        break;
      case 'es':
        translationModule = await import('../locales/es/common.json');
        break;
      case 'de':
        translationModule = await import('../locales/de/common.json');
        break;
      default:
        translationModule = await import('../locales/pt/common.json');
    }
    
    const translations = translationModule.default;
    translationCache.set(locale, translations);
    return translations;
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}, falling back to pt`);
    
    if (locale !== 'pt') {
      return loadTranslations('pt');
    }
    
    throw error;
  }
}

// Função para obter valor aninhado
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((curr, key) => curr?.[key], obj) || path;
}

// Provider de contexto
export function TranslationProvider(props: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(props.initialLocale || 'pt');
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        const data = await loadTranslations(locale);
        
        if (isMounted) {
          setTranslations(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const t = (key: string): string => {
    if (isLoading) return key;
    return getNestedValue(translations, key);
  };

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const contextValue: TranslationContextType = {
    locale: locale,
    t: t,
    switchLanguage: switchLanguage,
    isLoading: isLoading,
    translations: translations
  };

  return TranslationContext.Provider({ value: contextValue, children: props.children });
}

// Hook principal
export function useTranslation() {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
}

// Utilitários
export function clearTranslationCache() {
  translationCache.clear();
}