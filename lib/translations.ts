// Sistema de tradução definitivo - não precisará refazer
const translations = {
  pt: () => import('../locales/pt/common.json'),
  es: () => import('../locales/es/common.json'), 
  en: () => import('../locales/en/common.json'),
  de: () => import('../locales/de/common.json')
};

export async function loadTranslations(locale: string = 'pt') {
  try {
    const translation = await translations[locale as keyof typeof translations]();
    return translation.default;
  } catch (error) {
    console.warn(`Translation not found for ${locale}, falling back to pt`);
    const fallback = await translations.pt();
    return fallback.default;
  }
}

export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((curr, key) => curr?.[key], obj) || path;
}

// Cache para evitar recarregamentos desnecessários
const translationCache = new Map<string, any>();

export async function getCachedTranslations(locale: string) {
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }
  
  const translations = await loadTranslations(locale);
  translationCache.set(locale, translations);
  return translations;
}

// Utilitário para limpar cache (útil em desenvolvimento)
export function clearTranslationCache() {
  translationCache.clear();
}