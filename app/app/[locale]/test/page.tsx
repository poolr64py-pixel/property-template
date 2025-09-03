'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
}

// Hook simplificado para App Router
function useTranslationAppRouter(locale: string) {
  const router = useRouter();
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        
        let translationModule;
        switch(locale) {
          case 'en':
            translationModule = await import('../../../locales/en/common.json');
            break;
          case 'es':
            translationModule = await import('../../../locales/es/common.json');
            break;
          case 'de':
            translationModule = await import('../../../locales/de/common.json');
            break;
          default:
            translationModule = await import('../../../locales/pt/common.json');
        }
        
        if (isMounted) {
          setTranslations(translationModule.default);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro carregando traduções:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadTranslations();
    
    return () => {
      isMounted = false;
    };
  }, [locale]);
  
  const t = (key: string): string => {
    if (isLoading) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };
  
  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}/test`);
  };
  
  return { t, locale, switchLanguage, isLoading };
}

export default function TestPage({ params }: PageProps) {
  const { locale } = params;
  const { t, switchLanguage, isLoading } = useTranslationAppRouter(locale);

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Carregando traduções...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🌍 Teste do Sistema de Tradução</h1>
      
      <div style={{ 
        background: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '2px solid #4CAF50'
      }}>
        <strong>✅ Sistema funcionando!</strong>
        <br />
        <strong>Idioma atual: {locale?.toUpperCase()}</strong>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Textos traduzidos:</h2>
        <ul>
          <li><strong>home.title:</strong> {t('home.title')}</li>
          <li><strong>home.subtitle:</strong> {t('home.subtitle')}</li>
          <li><strong>common.currentLanguage:</strong> {t('common.currentLanguage')}</li>
          <li><strong>nav.home:</strong> {t('nav.home')}</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Trocar Idioma:</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => switchLanguage('pt')}
            style={{ 
              padding: '10px 15px', 
              fontSize: '16px',
              background: locale === 'pt' ? '#4CAF50' : '#f1f1f1',
              color: locale === 'pt' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🇧🇷 Português
          </button>
          
          <button 
            onClick={() => switchLanguage('en')}
            style={{ 
              padding: '10px 15px', 
              fontSize: '16px',
              background: locale === 'en' ? '#4CAF50' : '#f1f1f1',
              color: locale === 'en' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🇺🇸 English
          </button>
          
          <button 
            onClick={() => switchLanguage('es')}
            style={{ 
              padding: '10px 15px', 
              fontSize: '16px',
              background: locale === 'es' ? '#4CAF50' : '#f1f1f1',
              color: locale === 'es' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🇪🇸 Español
          </button>
          
          <button 
            onClick={() => switchLanguage('de')}
            style={{ 
              padding: '10px 15px', 
              fontSize: '16px',
              background: locale === 'de' ? '#4CAF50' : '#f1f1f1',
              color: locale === 'de' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🇩🇪 Deutsch
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#fffacd', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h3>🔗 URLs funcionais:</h3>
        <ul>
          <li><a href="/pt/test">localhost:3000/pt/test</a> (Português)</li>
          <li><a href="/en/test">localhost:3000/en/test</a> (English)</li>
          <li><a href="/es/test">localhost:3000/es/test</a> (Español)</li>
          <li><a href="/de/test">localhost:3000/de/test</a> (Deutsch)</li>
        </ul>
      </div>
    </div>
  );
}