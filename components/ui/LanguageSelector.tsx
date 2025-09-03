'use client';

import { useState } from 'react';
import { useTranslation, LOCALES, LOCALE_NAMES, LOCALE_FLAGS, Locale } from '../lib/useTranslation';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons' | 'compact';
  className?: string;
}

export function LanguageSelector({ variant = 'dropdown', className = '' }: LanguageSelectorProps) {
  const { locale, switchLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'compact') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {LOCALES.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            style={{
              fontSize: '24px',
              transition: 'all 0.2s',
              transform: lang === locale ? 'scale(1.1)' : 'scale(1)',
              opacity: lang === locale ? 1 : 0.6,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '4px'
            }}
            onMouseEnter={(e) => {
              if (lang !== locale) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (lang !== locale) {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            title={LOCALE_NAMES[lang]}
          >
            {LOCALE_FLAGS[lang]}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {LOCALES.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: lang === locale ? '#2563eb' : '#f1f5f9',
              color: lang === locale ? 'white' : '#374151',
              border: 'none',
              cursor: 'pointer',
              boxShadow: lang === locale ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (lang !== locale) {
                e.currentTarget.style.background = '#e2e8f0';
              }
            }}
            onMouseLeave={(e) => {
              if (lang !== locale) {
                e.currentTarget.style.background = '#f1f5f9';
              }
            }}
          >
            <span>{LOCALE_FLAGS[lang]}</span>
            <span>{LOCALE_NAMES[lang]}</span>
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          background: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.15s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f9fafb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span style={{ marginRight: '8px', fontSize: '18px' }}>{LOCALE_FLAGS[locale]}</span>
        {LOCALE_NAMES[locale]}
        <svg
          style={{ 
            marginLeft: '8px', 
            width: '20px', 
            height: '20px',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s'
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div style={{
            position: 'absolute',
            right: 0,
            zIndex: 20,
            marginTop: '8px',
            width: '192px',
            background: 'white',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ padding: '4px' }}>
              {LOCALES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    switchLanguage(lang);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: '14px',
                    background: lang === locale ? '#eff6ff' : 'transparent',
                    color: lang === locale ? '#1d4ed8' : '#374151',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    if (lang !== locale) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang !== locale) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>{LOCALE_FLAGS[lang]}</span>
                  {LOCALE_NAMES[lang]}
                  {lang === locale && (
                    <svg
                      style={{ marginLeft: 'auto', width: '20px', height: '20px', color: '#2563eb' }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Overlay para fechar quando clicar fora */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}

// Componente para mostrar idioma atual
export function CurrentLanguage({ className = '' }: { className?: string }) {
  const { locale, t } = useTranslation();
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: '9999px',
      background: '#dbeafe',
      color: '#1e40af',
      fontSize: '14px',
      fontWeight: '500'
    }} className={className}>
      <span style={{ marginRight: '4px' }}>{LOCALE_FLAGS[locale]}</span>
      {t('common.currentLanguage')}: {LOCALE_NAMES[locale]}
    </div>
  );
}